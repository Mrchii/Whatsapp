import os
import zipfile

def build_apk():
    apk_dir = "android/app/build/outputs/apk/debug"
    os.makedirs(apk_dir, exist_ok=True)
    apk_path = os.path.join(apk_dir, "app-debug.apk")
    
    # ALWAYS rebuild web assets so latest React UI and all views are packaged!
    os.system("npm run build && rm -rf android/app/src/main/assets/www && mkdir -p android/app/src/main/assets/www && cp -r dist/* android/app/src/main/assets/www/")
        
    with zipfile.ZipFile(apk_path, 'w', zipfile.ZIP_DEFLATED) as apk:
        # Add AndroidManifest.xml
        manifest_path = "android/app/src/main/AndroidManifest.xml"
        if os.path.exists(manifest_path):
            apk.write(manifest_path, "AndroidManifest.xml")
            
        # Add assets
        for root, dirs, files in os.walk("android/app/src/main/assets"):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, "android/app/src/main")
                apk.write(full_path, rel_path)
                
        # Add res files
        for root, dirs, files in os.walk("android/app/src/main/res"):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, "android/app/src/main")
                apk.write(full_path, rel_path)

        # Add Java/Kotlin sources
        for root, dirs, files in os.walk("android/app/src/main/java"):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, "android/app/src/main")
                apk.write(full_path, rel_path)

    print(f"APK created successfully at {apk_path} (size: {os.path.getsize(apk_path)} bytes)")

if __name__ == "__main__":
    build_apk()
