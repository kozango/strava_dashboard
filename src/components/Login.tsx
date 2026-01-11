import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';

interface LoginProps {
  onLogin: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, onToggleTheme }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors">
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
      </div>
      <div className="max-w-md w-full space-y-8 p-10 bg-white/80 dark:bg-slate-800/50 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-200 dark:border-slate-700 transition-colors">
        <div>
          <h2 className="mt-6 text-center text-4xl font-bold text-gray-900 dark:text-white transition-colors">
            Strava Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors">
            あなたのStravaデータを美しく可視化
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={onLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-strava hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-strava transition-all duration-200 transform hover:scale-105"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            Stravaで認証
          </button>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-slate-600 transition-colors"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors">
                  Strava APIを使用
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-4 transition-colors">
            Strava APIキーが必要です。<br />
            <a
              href="https://www.strava.com/settings/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-strava hover:text-orange-400 underline"
            >
              こちらから取得できます
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
