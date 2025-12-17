import axios from 'axios';
import { StravaActivity, StravaStats, TokenResponse } from '@/types/strava';

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

export class StravaClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const response = await axios.get(`${STRAVA_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.data;
  }

  async getActivities(page = 1, perPage = 30): Promise<StravaActivity[]> {
    return this.request<StravaActivity[]>(
      `/athlete/activities?page=${page}&per_page=${perPage}`
    );
  }

  async getStats(athleteId: number): Promise<StravaStats> {
    return this.request<StravaStats>(`/athletes/${athleteId}/stats`);
  }
}

export async function exchangeToken(code: string): Promise<TokenResponse> {
  const response = await axios.post('https://www.strava.com/oauth/token', {
    client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  });
  return response.data;
}

export function getAuthorizationUrl(): string {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const scope = 'read,activity:read_all';

  return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
}

export function formatDistance(meters: number): string {
  return (meters / 1000).toFixed(2) + ' km';
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function formatPace(metersPerSecond: number, type: string): string {
  if (type === 'Run') {
    // ランニングは分/km
    const secondsPerKm = 1000 / metersPerSecond;
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = Math.floor(secondsPerKm % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')} /km`;
  } else {
    // サイクリングはkm/h
    const kmPerHour = metersPerSecond * 3.6;
    return `${kmPerHour.toFixed(1)} km/h`;
  }
}
