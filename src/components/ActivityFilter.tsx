import React from 'react';

interface ActivityFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  activityCounts: Record<string, number>;
}

const SPORT_TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  all: { label: 'すべて', icon: '🏃' },
  Ride: { label: '自転車', icon: '🚴' },
  Run: { label: 'ランニング', icon: '🏃' },
  TrailRun: { label: 'トレイルランニング', icon: '⛰️' },
  Hike: { label: '登山・ハイキング', icon: '🥾' },
  Walk: { label: 'ウォーキング', icon: '🚶' },
  Swim: { label: '水泳', icon: '🏊' },
  VirtualRide: { label: 'バーチャルライド', icon: '🖥️' },
  VirtualRun: { label: 'バーチャルラン', icon: '🎮' },
  AlpineSki: { label: 'スキー', icon: '⛷️' },
  BackcountrySki: { label: 'バックカントリー', icon: '🎿' },
  Snowboard: { label: 'スノーボード', icon: '🏂' },
};

export const ActivityFilter: React.FC<ActivityFilterProps> = ({
  selectedType,
  onTypeChange,
  activityCounts,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
      <h2 className="text-xl font-semibold mb-4">アクティビティタイプ</h2>
      <div className="flex flex-wrap gap-2">
        {Object.entries(activityCounts).map(([type, count]) => {
          const typeInfo = SPORT_TYPE_LABELS[type] || {
            label: type,
            icon: '📍'
          };
          const isSelected = selectedType === type;

          return (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${isSelected
                  ? 'bg-strava text-white shadow-lg scale-105'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                }
              `}
            >
              <span className="mr-2">{typeInfo.icon}</span>
              {typeInfo.label}
              <span className="ml-2 text-sm opacity-75">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
