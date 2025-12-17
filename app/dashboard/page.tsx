'use client';

import { useEffect, useState } from 'react';
import { StravaActivity } from '@/types/strava';
import ActivityChart from '@/components/ActivityChart';
import ActivityList from '@/components/ActivityList';
import StatsCards from '@/components/StatsCards';

export default function Dashboard() {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/strava/activities');
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid #fc4c02',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ marginTop: '20px', color: '#666' }}>データを読み込んでいます...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#e53e3e', marginBottom: '10px' }}>エラーが発生しました</h2>
          <p style={{ color: '#666' }}>{error}</p>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#fc4c02',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header
        style={{
          background: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '20px',
          marginBottom: '30px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '32px',
              background: 'linear-gradient(135deg, #fc4c02 0%, #d63a00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Strava Dashboard
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <StatsCards activities={activities} />

        <div
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '30px',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            アクティビティの推移
          </h2>
          <ActivityChart activities={activities} />
        </div>

        <div
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            最近のアクティビティ
          </h2>
          <ActivityList activities={activities} />
        </div>
      </main>
    </div>
  );
}
