import axios from 'axios';
import { StravaActivity, StravaAthlete, TokenResponse } from '../types/strava';

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';
const STRAVA_API_URL = 'https://www.strava.com/api/v3';

export class StravaApi {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = import.meta.env.VITE_STRAVA_CLIENT_ID || '';
    this.clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET || '';
    this.redirectUri = import.meta.env.VITE_STRAVA_REDIRECT_URI || 'http://localhost:3000/callback';
  }

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'read,activity:read_all,profile:read_all',
    });
    return `${STRAVA_AUTH_URL}?${params.toString()}`;
  }

  async exchangeToken(code: string): Promise<TokenResponse> {
    const response = await axios.post(STRAVA_TOKEN_URL, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      grant_type: 'authorization_code',
    });
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await axios.post(STRAVA_TOKEN_URL, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });
    return response.data;
  }

  async getAthlete(accessToken: string): Promise<StravaAthlete> {
    const response = await axios.get(`${STRAVA_API_URL}/athlete`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }

  async getActivities(
    accessToken: string,
    page = 1,
    perPage = 30
  ): Promise<StravaActivity[]> {
    const response = await axios.get(`${STRAVA_API_URL}/athlete/activities`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { page, per_page: perPage },
    });
    return response.data;
  }

  async getActivity(accessToken: string, activityId: number): Promise<StravaActivity> {
    const response = await axios.get(`${STRAVA_API_URL}/activities/${activityId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { include_all_efforts: false },
    });
    return response.data;
  }

  async getActivityStream(
    accessToken: string,
    activityId: number,
    keys: string[] = ['latlng']
  ): Promise<any> {
    const response = await axios.get(
      `${STRAVA_API_URL}/activities/${activityId}/streams`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { keys: keys.join(','), key_by_type: true },
      }
    );
    return response.data;
  }
}

export const stravaApi = new StravaApi();
