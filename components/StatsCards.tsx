'use client';

import { StravaActivity } from '@/types/strava';
import { formatDistance, formatTime } from '@/lib/strava';

interface StatsCardsProps {
  activities: StravaActivity[];
}

export default function StatsCards({ activities }: StatsCardsProps) {
  const totalDistance = activities.reduce((sum, act) => sum + act.distance, 0);
  const totalTime = activities.reduce((sum, act) => sum + act.moving_time, 0);
  const totalActivities = activities.length;
  const averageDistance = totalActivities > 0 ? totalDistance / totalActivities : 0;

  const stats = [
    {
      label: '総距離',
      value: formatDistance(totalDistance),
      color: '#fc4c02',
    },
    {
      label: '総時間',
      value: formatTime(totalTime),
      color: '#0a66c2',
    },
    {
      label: 'アクティビティ数',
      value: totalActivities.toString(),
      color: '#10b981',
    },
    {
      label: '平均距離',
      value: formatDistance(averageDistance),
      color: '#8b5cf6',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${stat.color}`,
          }}
        >
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            {stat.label}
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
