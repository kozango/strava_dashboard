import React from 'react';
import { useStravaAuth } from './hooks/useStravaAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

function App() {
  const { accessToken, athlete, isLoading, isAuthenticated, login, logout } =
    useStravaAuth();
  const { isDarkMode, toggleTheme } = useDarkMode();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-gray-800 dark:text-white text-xl">認証中...</div>
      </div>
    );
  }

  if (!isAuthenticated || !accessToken) {
    return <Login onLogin={login} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />;
  }

  return (
    <Dashboard
      accessToken={accessToken}
      athleteName={athlete?.firstname || 'アスリート'}
      onLogout={logout}
      isDarkMode={isDarkMode}
      onToggleTheme={toggleTheme}
    />
  );
}

export default App;
