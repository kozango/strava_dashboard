'use client';

import { getAuthorizationUrl } from '@/lib/strava';

export default function Home() {
  const handleLogin = () => {
    window.location.href = getAuthorizationUrl();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '60px 40px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center',
          maxWidth: '500px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #fc4c02 0%, #d63a00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Strava Dashboard
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
          あなたのアクティビティデータを可視化
        </p>

        <button
          onClick={handleLogin}
          style={{
            background: '#fc4c02',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            fontSize: '18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(252, 76, 2, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(252, 76, 2, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(252, 76, 2, 0.3)';
          }}
        >
          Connect with Strava
        </button>

        <div style={{ marginTop: '40px', fontSize: '14px', color: '#999' }}>
          <p>このアプリでできること:</p>
          <ul style={{ textAlign: 'left', marginTop: '10px', lineHeight: '1.8' }}>
            <li>アクティビティデータの一覧表示</li>
            <li>距離・時間の推移グラフ</li>
            <li>統計情報の可視化</li>
            <li>アクティビティタイプ別の分析</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
