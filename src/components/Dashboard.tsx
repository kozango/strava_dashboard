import React, { useEffect, useState } from 'react';
import { stravaApi } from '../services/stravaApi';
import { StravaActivity, StravaStats } from '../types/strava';
import { ActivityChart } from './ActivityChart';
import { StatsCard } from './StatsCard';
import { DarkModeToggle } from './DarkModeToggle';

interface DashboardProps {
  accessToken: string;
  athleteName: string;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  accessToken,
  athleteName,
  onLogout,
  isDarkMode,
  onToggleTheme,
}) => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [stats, setStats] = useState<StravaStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const data = await stravaApi.getActivities(accessToken, 1, 50);
        setActivities(data);

        const calculatedStats: StravaStats = {
          totalActivities: data.length,
          totalDistance: data.reduce((sum, act) => sum + act.distance, 0),
          totalTime: data.reduce((sum, act) => sum + act.moving_time, 0),
          totalElevation: data.reduce((sum, act) => sum + act.total_elevation_gain, 0),
          averageSpeed: data.length > 0
            ? data.reduce((sum, act) => sum + act.average_speed, 0) / data.length
            : 0,
        };
        setStats(calculatedStats);
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [accessToken]);

  const formatDistance = (meters: number) => (meters / 1000).toFixed(2);
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  const formatSpeed = (metersPerSecond: number) => ((metersPerSecond * 3.6).toFixed(2));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center transition-colors">
        <div className="text-gray-800 dark:text-white text-xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center transition-colors">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-white transition-colors">
      <nav className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Strava Dashboard</h1>
              <span className="ml-4 text-gray-600 dark:text-gray-400 transition-colors">こんにちは、{athleteName}さん</span>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-lg transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="総アクティビティ数"
                value={stats.totalActivities.toString()}
                icon="📊"
              />
              <StatsCard
                title="総距離"
                value={`${formatDistance(stats.totalDistance)} km`}
                icon="🏃"
              />
              <StatsCard
                title="総時間"
                value={formatTime(stats.totalTime)}
                icon="⏱️"
              />
              <StatsCard
                title="平均速度"
                value={`${formatSpeed(stats.averageSpeed)} km/h`}
                icon="⚡"
              />
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-slate-700 mb-8 transition-colors">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors">アクティビティの推移</h2>
              <ActivityChart activities={activities} isDarkMode={isDarkMode} />
            </div>
          </>
        )}

        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-slate-700 transition-colors">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors">最近のアクティビティ</h2>
          <div className="space-y-3">
            {activities.slice(0, 10).map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-100/50 dark:bg-slate-700/50 rounded-lg p-4 hover:bg-gray-200/50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white transition-colors">{activity.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">
                      {activity.sport_type} • {new Date(activity.start_date).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-strava">
                      {formatDistance(activity.distance)} km
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                      {formatTime(activity.moving_time)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  <span>⬆️ {activity.total_elevation_gain.toFixed(0)}m</span>
                  <span>⚡ {formatSpeed(activity.average_speed)} km/h</span>
                  {activity.average_heartrate && (
                    <span>❤️ {activity.average_heartrate.toFixed(0)} bpm</span>
                  )}
                  <span>👍 {activity.kudos_count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
