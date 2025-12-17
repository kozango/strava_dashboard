import { useState, useEffect } from 'react';
import { stravaApi } from '../services/stravaApi';
import { StravaAthlete } from '../types/strava';

export const useStravaAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('strava_access_token')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('strava_refresh_token')
  );
  const [athlete, setAthlete] = useState<StravaAthlete | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code && !accessToken) {
        setIsLoading(true);
        try {
          const tokenData = await stravaApi.exchangeToken(code);
          setAccessToken(tokenData.access_token);
          setRefreshToken(tokenData.refresh_token);
          setAthlete(tokenData.athlete);

          localStorage.setItem('strava_access_token', tokenData.access_token);
          localStorage.setItem('strava_refresh_token', tokenData.refresh_token);
          localStorage.setItem('strava_athlete', JSON.stringify(tokenData.athlete));

          window.history.replaceState({}, document.title, '/');
        } catch (err) {
          setError('認証に失敗しました');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      } else if (accessToken) {
        const storedAthlete = localStorage.getItem('strava_athlete');
        if (storedAthlete) {
          setAthlete(JSON.parse(storedAthlete));
        }
      }
    };

    initAuth();
  }, []);

  const login = () => {
    const authUrl = stravaApi.getAuthorizationUrl();
    window.location.href = authUrl;
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setAthlete(null);
    localStorage.removeItem('strava_access_token');
    localStorage.removeItem('strava_refresh_token');
    localStorage.removeItem('strava_athlete');
  };

  return {
    accessToken,
    athlete,
    isLoading,
    error,
    isAuthenticated: !!accessToken,
    login,
    logout,
  };
};
