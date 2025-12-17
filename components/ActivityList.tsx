'use client';

import { StravaActivity } from '@/types/strava';
import { formatDistance, formatTime, formatPace } from '@/lib/strava';

interface ActivityListProps {
  activities: StravaActivity[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>日付</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>アクティビティ名</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>タイプ</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>距離</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>時間</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>ペース/速度</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr
              key={activity.id}
              style={{ borderBottom: '1px solid #eee' }}
            >
              <td style={{ padding: '12px' }}>
                {new Date(activity.start_date_local).toLocaleDateString('ja-JP')}
              </td>
              <td style={{ padding: '12px' }}>{activity.name}</td>
              <td style={{ padding: '12px' }}>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: activity.type === 'Run' ? '#fc4c02' : '#0a66c2',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  {activity.type}
                </span>
              </td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                {formatDistance(activity.distance)}
              </td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                {formatTime(activity.moving_time)}
              </td>
              <td style={{ padding: '12px', textAlign: 'right' }}>
                {formatPace(activity.average_speed, activity.type)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
