export interface StravaAthlete {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  profile: string;
  city: string;
  state: string;
  country: string;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  kudos_count: number;
  map?: {
    summary_polyline?: string;
    polyline?: string;
  };
  start_latlng?: [number, number];
  end_latlng?: [number, number];
}

export interface StravaStats {
  totalActivities: number;
  totalDistance: number;
  totalTime: number;
  totalElevation: number;
  averageSpeed: number;
}

export interface TokenResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: StravaAthlete;
}
