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
  distance: number; // メートル
  moving_time: number; // 秒
  elapsed_time: number; // 秒
  total_elevation_gain: number; // メートル
  type: string; // Run, Ride, Swim, etc.
  start_date: string;
  start_date_local: string;
  timezone: string;
  average_speed: number; // m/s
  max_speed: number; // m/s
  average_heartrate?: number;
  max_heartrate?: number;
  kudos_count: number;
}

export interface StravaStats {
  all_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  all_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  recent_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  recent_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: StravaAthlete;
}
