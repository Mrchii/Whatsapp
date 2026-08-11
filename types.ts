export interface MemoryItem {
  id: string;
  category: 'Preference' | 'Rule' | 'Personal Info' | 'General';
  text: string;
  createdAt: number;
}

export interface PersonProfile {
  id: string;
  name: string;
  phone: string;
  relationship: 'Family' | 'Partner' | 'Boss' | 'Friend' | 'Other';
  preferredLanguage: string; // English, Swahili, Mixed
  tone: string; // Polite, Casual, Formal, Direct
  instructions: string;
  autoReplyPermission: boolean;
}

export interface ChiiSettings {
  ownerName: string;
  preferredLanguage: string;
  personality: string;
  autoReplyEnabled: boolean;
  emergencyStop: boolean;
  androidSmsEnabled: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'chii';
  text: string;
  mode: string;
  timestamp: number;
  error?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  type: 'sms' | 'chat' | 'memory' | 'people' | 'image' | 'system';
  timestamp: number;
}

export interface SmsWebhookResponse {
  action: 'SEND_SMS' | 'DO_NOT_SEND';
  recipientNumber: string;
  replyText: string;
  status: 'SENT_VIA_AI' | 'EMERGENCY_STOPPED' | 'DISABLED' | 'REJECTED' | 'ERROR';
  reason: string;
}
