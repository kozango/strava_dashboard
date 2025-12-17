import React from 'react';
import { useStravaAuth } from './hooks/useStravaAuth';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  const { accessToken, athlete, isLoading, isAuthenticated, login, logout } =
    useStravaAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">認証中...</div>
      </div>
    );
  }

  if (!isAuthenticated || !accessToken) {
    return <Login onLogin={login} />;
  }

  return (
    <Dashboard
      accessToken={accessToken}
      athleteName={athlete?.firstname || 'アスリート'}
      onLogout={logout}
    />
  );
}

export default App;
