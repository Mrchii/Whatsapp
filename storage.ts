import { MemoryItem, PersonProfile, ChiiSettings, ActivityItem } from '../types';

const SETTINGS_KEY = 'chii_settings_v1';
const MEMORIES_KEY = 'chii_memories_v1';
const PEOPLE_KEY = 'chii_people_v1';
const ACTIVITIES_KEY = 'chii_activities_v1';

export const defaultSettings: ChiiSettings = {
  ownerName: '',
  preferredLanguage: 'Kiswahili cha Tanzania & English',
  personality: 'Friendly, respectful Tanzanian personal assistant, fluent in natural Kiswahili cha Tanzania (no Sheng, no Kenyan slang)',
  autoReplyEnabled: true,
  emergencyStop: false,
  androidSmsEnabled: true,
};

export const defaultMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    category: 'Personal Info',
    text: 'I live in Dar es Salaam, Tanzania.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'mem-2',
    category: 'Preference',
    text: 'I prefer natural Tanzanian Swahili (Kiswahili cha Tanzania) for casual conversations and English for formal inquiries.',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'mem-3',
    category: 'Rule',
    text: 'Always answer my Boss politely and reassure them that tasks are being handled.',
    createdAt: Date.now() - 3600000 * 5,
  },
];

export const defaultPeople: PersonProfile[] = [
  {
    id: 'person-1',
    name: 'David (Boss)',
    phone: '+255712345678',
    relationship: 'Boss',
    preferredLanguage: 'English',
    tone: 'Formal & Professional',
    instructions: 'Reassure that projects are on schedule. Never commit to deadlines without asking me.',
    autoReplyPermission: true,
  },
  {
    id: 'person-2',
    name: 'Amina (Partner)',
    phone: '+255798765432',
    relationship: 'Partner',
    preferredLanguage: 'Kiswahili cha Tanzania',
    tone: 'Warm & Loving',
    instructions: 'Reply affectionately in natural Tanzanian Swahili. Tell her I will call soon.',
    autoReplyPermission: true,
  },
  {
    id: 'person-3',
    name: 'Spam Marketing',
    phone: '+255700000000',
    relationship: 'Other',
    preferredLanguage: 'English',
    tone: 'Direct',
    instructions: 'Do not respond.',
    autoReplyPermission: false,
  },
];

export const defaultActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Chii AI Initialized',
    description: 'System booted successfully. Package: com.chii.ai',
    type: 'system',
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    id: 'act-2',
    title: 'SMS Rule Configured',
    description: 'Added contact rules for David (Boss) and Amina (Partner).',
    type: 'people',
    timestamp: Date.now() - 3600000 * 1,
  },
];

export function loadSettings(): ChiiSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) return defaultSettings;
    const parsed = JSON.parse(data);
    if (parsed.ownerName === 'Alex') {
      parsed.ownerName = '';
    }
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: ChiiSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadMemories(): MemoryItem[] {
  try {
    const data = localStorage.getItem(MEMORIES_KEY);
    return data ? JSON.parse(data) : defaultMemories;
  } catch {
    return defaultMemories;
  }
}

export function saveMemories(memories: MemoryItem[]) {
  localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
}

export function loadPeople(): PersonProfile[] {
  try {
    const data = localStorage.getItem(PEOPLE_KEY);
    return data ? JSON.parse(data) : defaultPeople;
  } catch {
    return defaultPeople;
  }
}

export function savePeople(people: PersonProfile[]) {
  localStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
}

export function loadActivities(): ActivityItem[] {
  try {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    return data ? JSON.parse(data) : defaultActivities;
  } catch {
    return defaultActivities;
  }
}

export function saveActivities(activities: ActivityItem[]) {
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
}
