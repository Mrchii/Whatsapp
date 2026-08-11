import { DEFAULT_SERVER_URL } from '../types';

export function getApiUrl(endpoint: string, serverUrl?: string): string {
  if (typeof window !== 'undefined' && (window.location.protocol === 'file:' || !window.location.origin.startsWith('http'))) {
    const base = (serverUrl && serverUrl.trim()) ? serverUrl.trim() : DEFAULT_SERVER_URL;
    const cleanBase = base.replace(/\/$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${cleanBase}${cleanEndpoint}`;
  }
  return endpoint;
}
