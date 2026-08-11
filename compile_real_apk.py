import os
import sys
import shutil
import subprocess
import hashlib
import glob
import zipfile

def run_cmd(cmd, cwd=None):
    print(f"RUNNING: {cmd}")
    res = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"ERROR ({res.returncode}): {res.stderr}")
        print(f"STDOUT: {res.stdout}")
        sys.exit(res.returncode)
    return res.stdout

def build():
    print("=== STEP 1: Build Web App & Sync to Assets ===")
    run_cmd("npm run build")
    assets_dir = "android/app/src/main/assets/www"
    if os.path.exists(assets_dir):
        shutil.rmtree(assets_dir)
    os.makedirs(assets_dir, exist_ok=True)
    run_cmd(f"cp -r dist/* {assets_dir}/")

    print("=== STEP 2: Prepare Build Directories ===")
    for d in ["gen", "obj", "bin"]:
        if os.path.exists(d):
            shutil.rmtree(d)
        os.makedirs(d, exist_ok=True)

    android_jar = "libs/android-30.jar"
    manifest = "android/app/src/main/AndroidManifest.xml"
    res_dir = "android/app/src/main/res"
    assets_parent = "android/app/src/main/assets"

    print("=== STEP 3: Generate R.java with AAPT ===")
    run_cmd(f"aapt package -f -m -J gen -M {manifest} -S {res_dir} -I {android_jar}")

    print("=== STEP 4: Compile Kotlin & Java Sources ===")
    sources = []
    for root, dirs, files in os.walk("android/app/src/main/java"):
        for f in files:
            if f.endswith(".kt") or f.endswith(".java"):
                sources.append(os.path.join(root, f))
    for root, dirs, files in os.walk("gen"):
        for f in files:
            if f.endswith(".java"):
                sources.append(os.path.join(root, f))

    sources_str = " ".join(sources)
    
    # Classpath with all libs
    lib_jars = glob.glob("libs/*.jar")
    cp = ":".join(lib_jars)
    
    # Clean bad files from jars before compilation/dexing
    for j in lib_jars:
        try:
            with zipfile.ZipFile(j, 'r') as z:
                names = z.namelist()
                bad = [n for n in names if 'module-info.class' in n or n.startswith('META-INF/versions/')]
            if bad:
                temp_j = j + '.tmp'
                with zipfile.ZipFile(j, 'r') as zin, zipfile.ZipFile(temp_j, 'w') as zout:
                    for item in zin.infolist():
                        if item.filename not in bad:
                            zout.writestr(item, zin.read(item.filename))
                os.replace(temp_j, j)
        except Exception as e:
            print(f"Warning cleaning jar {j}: {e}")

    # Run kotlinc 1.9.23
    run_cmd(f"./kotlinc/bin/kotlinc -cp {cp} {sources_str} -d obj")

    print("=== STEP 5: Dexing Class Files into classes.dex ===")
    # Exclude android-30.jar from dx input, include all other libs
    dx_inputs = ["obj"] + [j for j in lib_jars if "android-30.jar" not in j]
    dx_inputs_str = " ".join(dx_inputs)
    
    dx_cmd = f"java -jar /usr/share/java/com.android.dx.jar --dex --min-sdk-version=26 --output=obj/classes.dex {dx_inputs_str}"
    run_cmd(dx_cmd)

    print("=== STEP 6: Package Base APK with AAPT ===")
    run_cmd(f"aapt package -f -M {manifest} -S {res_dir} -I {android_jar} -A {assets_parent} -F bin/app-unsigned-raw.apk")

    print("=== STEP 7: Add classes.dex into APK ===")
    with zipfile.ZipFile("bin/app-unsigned-raw.apk", "a", zipfile.ZIP_DEFLATED) as z:
        z.write("obj/classes.dex", "classes.dex")

    print("=== STEP 8: ZipAlign APK ===")
    run_cmd("zipalign -f -v 4 bin/app-unsigned-raw.apk bin/app-aligned.apk")

    print("=== STEP 9: Sign APK with Debug Keystore ===")
    keystore = "debug.keystore"
    if not os.path.exists(keystore):
        run_cmd('keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"')

    out_apk_dir = "android/app/build/outputs/apk/debug"
    os.makedirs(out_apk_dir, exist_ok=True)
    out_apk = os.path.join(out_apk_dir, "app-debug.apk")

    run_cmd(f"apksigner sign --ks {keystore} --ks-pass pass:android --key-pass pass:android --out {out_apk} bin/app-aligned.apk")

    print("=== STEP 10: Verify APK with APKSIGNER ===")
    verify_output = run_cmd(f"apksigner verify -v {out_apk}")
    print(verify_output)

    print("=== STEP 11: Copy to Public and Dist for Downloads ===")
    shutil.copy(out_apk, "public/app-debug.apk")
    shutil.copy(out_apk, "dist/app-debug.apk")

    size = os.path.getsize(out_apk)
    with open(out_apk, "rb") as f:
        sha256 = hashlib.sha256(f.read()).hexdigest()

    print("\n==========================================")
    print("SUCCESSFULLY BUILT AND SIGNED REAL ANDROID APK!")
    print(f"Path: {out_apk}")
    print(f"Size: {size} bytes ({size / 1024:.2f} KB)")
    print(f"SHA-256: {sha256}")
    print("==========================================")

if __name__ == "__main__":
    build()
