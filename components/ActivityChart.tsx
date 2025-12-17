'use client';

import { StravaActivity } from '@/types/strava';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ActivityChartProps {
  activities: StravaActivity[];
}

export default function ActivityChart({ activities }: ActivityChartProps) {
  // データを日付順にソートして、距離データを集計
  const chartData = activities
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .map((activity) => ({
      date: new Date(activity.start_date_local).toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
      }),
      距離: (activity.distance / 1000).toFixed(2),
      時間: (activity.moving_time / 60).toFixed(0),
    }));

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="距離"
            stroke="#fc4c02"
            strokeWidth={2}
            name="距離 (km)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="時間"
            stroke="#8884d8"
            strokeWidth={2}
            name="時間 (分)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
