import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { StravaActivity } from '../types/strava';

interface ActivityChartProps {
  activities: StravaActivity[];
  isDarkMode: boolean;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({ activities, isDarkMode }) => {
  const chartData = activities
    .slice(0, 20)
    .reverse()
    .map((activity) => ({
      date: new Date(activity.start_date).toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
      }),
      distance: (activity.distance / 1000).toFixed(2),
      speed: (activity.average_speed * 3.6).toFixed(2),
      elevation: activity.total_elevation_gain,
    }));

  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';
  const axisColor = isDarkMode ? '#94a3b8' : '#64748b';
  const tooltipBg = isDarkMode ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDarkMode ? '#334155' : '#e2e8f0';

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 transition-colors">距離の推移</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FC4C02" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FC4C02" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="distance"
              stroke="#FC4C02"
              fillOpacity={1}
              fill="url(#colorDistance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 transition-colors">速度と獲得標高</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={axisColor} />
            <YAxis yAxisId="left" stroke={axisColor} />
            <YAxis yAxisId="right" orientation="right" stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="speed"
              stroke="#3b82f6"
              strokeWidth={2}
              name="速度 (km/h)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="elevation"
              stroke="#10b981"
              strokeWidth={2}
              name="獲得標高 (m)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
