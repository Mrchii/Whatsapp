import { Conversation, AppSettings, IntegrationModule } from '../types';

export const initialSettings: AppSettings = {
  autoReplyEnabled: true,
  emergencyStop: false,
  androidSmsEnabled: true,
  androidPermissions: {
    receiveSms: true,
    sendSms: true,
    readSms: true,
    readPhoneState: true,
  },
  ownerName: 'Mr Chii',
  forbiddenTitles: 'Mama, Mummy, Mom, Boss, Sir',
  primaryLanguage: 'swahili',
  personality: 'friendly',
  customPersonality: 'Mimi ni msaidizi binafsi wa Mr Chii AI. Najibu kwa Kiswahili fasaha cha Tanzania kwa ujasiri, urafiki, heshima na ufupi.',
  customStatus: 'Niko kwenye kikao na majukumu ya kazi kwa sasa (Busy in meeting/work)',
  lengthPreference: 'short',
  replyDelaySeconds: 2,
  notifyOnAutoReply: true,
  vipContactsOnly: false,
  signatureTag: false,
  useEmoji: true,
  askClarificationIfUnclear: true,
};

export const sampleConversations: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Mhandisi Juma (Partner)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    relationship: 'Partner / Colleague',
    phone: '+255 712 345 678',
    unreadCount: 1,
    lastUpdated: 'Saa 4:15 Asubuhi',
    customNote: 'Lugha ya heshima, ya kiofisi na yenye kujiamini',
    messages: [
      {
        id: 'm1',
        sender: 'Mhandisi Juma (Partner)',
        role: 'contact',
        text: 'Habari Mr Chii! Utakuwepo ofisini leo asubuhi kupitia hati ya mradi?',
        timestamp: '10:14 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    contactName: 'Baraka (Boss / Kazini)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    relationship: 'Mkubwa wa Kazi / Boss',
    phone: '+255 754 987 654',
    unreadCount: 1,
    lastUpdated: 'Saa 3:45 Asubuhi',
    customNote: 'Lugha rasmi na yenye heshima na nidhamu ya kazi',
    messages: [
      {
        id: 'm2',
        sender: 'Baraka (Boss / Kazini)',
        role: 'contact',
        text: 'Habari, umeweza kukamilisha ile ripoti ya mauzo ya mwezi uliopita?',
        timestamp: '09:45 AM',
      },
    ],
  },
  {
    id: 'conv-3',
    contactName: 'Amina (Rafiki / Friend)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    relationship: 'Rafiki / Friend',
    phone: '+255 688 112 233',
    unreadCount: 1,
    lastUpdated: 'Jana',
    messages: [
      {
        id: 'm3',
        sender: 'Amina (Rafiki / Friend)',
        role: 'contact',
        text: 'Mambo vipi Chii! Unatoka out leo usiku au uko busy?',
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv-4',
    contactName: 'John (Client / English)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    relationship: 'Mteja / Customer',
    phone: '+255 765 000 111',
    unreadCount: 0,
    lastUpdated: '10:30 AM',
    messages: [
      {
        id: 'm4',
        sender: 'John (Client / English)',
        role: 'contact',
        text: 'Hello, I saw your product listing online. Are you available for a delivery in Posta today?',
        timestamp: '10:30 AM',
      },
    ],
  },
];

export const sampleIntegrations: IntegrationModule[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    description: 'Unganisha Mr Chii AI na WhatsApp Meta Cloud API au Webhook kujibu jumbe otomatiki.',
    iconName: 'MessageSquare',
    status: 'Ready for Module',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
    details: [
      'Vyeti vya Meta Cloud API Webhook Integration',
      'Usaidizi wa WhatsApp Business Account (WABA)',
      'Mfumo wa kusoma ujumbe wa wateja na kujibu kwa sekunde 2',
      'Hali ya Auto-Reply On/Off inadhibitiwa moja kwa moja kutoka hapa',
    ],
  },
  {
    id: 'sms',
    name: 'Android SMS Auto Receiver',
    description: 'Moduli ya kusoma na kujibu SMS za kawaida za simu yako ya Android.',
    iconName: 'Smartphone',
    status: 'In Development',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    details: [
      'Inatumia Android Accessibility & SMS Listener Service',
      'Inafanya kazi bila bando la intaneti kupitia SMS Gateway lokal',
      'Imeundwa kulinda faragha ya nambari za simu',
    ],
  },
  {
    id: 'telegram',
    name: 'Telegram Bot Gateway',
    description: 'Auto-reply kwa chat na magroup ya Telegram.',
    iconName: 'Send',
    status: 'Planned',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    details: [
      'Inatumia Telegram Bot Token kuunganisha rasmi',
      'Inasaidia majibu ya haraka ya biashara na marafiki',
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram Direct Messages',
    description: 'Kujibu jumbe za Wateja kwenye Instagram DM kwa Kiswahili na Kiingereza.',
    iconName: 'Instagram',
    status: 'Planned',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    details: [
      'Inatumia Meta Graph API for Instagram Messaging',
      'Bora kwa wafanyabiashara wa nguo, vipodozi na huduma Mtandaoni',
    ],
  },
];
