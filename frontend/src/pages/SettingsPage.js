import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import Navbar from '../components/Navbar';
import { Bell, Lock, Globe, Moon, Mail, Eye } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user } = useAuth();
  const { isDark, toggle } = useDarkMode();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    bookingReminders: true,
    promotions: false,
    language: 'vi',
    privateProfile: false,
    showEmail: false,
    twoFactorAuth: false,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success('Setting updated');
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value,
    }));
    localStorage.setItem('language', e.target.value);
    toast.success('Language changed');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />

      <div className={`container max-w-2xl py-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            Settings
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Manage your preferences and security</p>
        </div>

        {/* Notification Settings */}
        <div className={`p-6 mb-6 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h2>

          <div className="space-y-4">
            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Email Notifications</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Receive email updates about your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="w-5 h-5 cursor-pointer"
              />
            </label>

            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Booking Reminders</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Get reminded about your upcoming appointments</p>
              </div>
              <input
                type="checkbox"
                checked={settings.bookingReminders}
                onChange={() => handleToggle('bookingReminders')}
                className="w-5 h-5 cursor-pointer"
              />
            </label>

            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Promotional Emails</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Receive special offers and promotions</p>
              </div>
              <input
                type="checkbox"
                checked={settings.promotions}
                onChange={() => handleToggle('promotions')}
                className="w-5 h-5 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className={`p-6 mb-6 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Eye className="w-5 h-5 text-primary" />
            Privacy
          </h2>

          <div className="space-y-4">
            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Private Profile</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Hide your profile from public search</p>
              </div>
              <input
                type="checkbox"
                checked={settings.privateProfile}
                onChange={() => handleToggle('privateProfile')}
                className="w-5 h-5 cursor-pointer"
              />
            </label>

            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Show Email Address</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Allow businesses to see your email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showEmail}
                onChange={() => handleToggle('showEmail')}
                className="w-5 h-5 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className={`p-6 mb-6 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Lock className="w-5 h-5 text-primary" />
            Security
          </h2>

          <div className="space-y-4">
            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Add an extra layer of security</p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
                className="w-5 h-5 cursor-pointer"
              />
            </label>

            <button className={`w-full p-4 rounded-lg transition-colors text-left font-semibold ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
            }`}>
              Change Password
            </button>
          </div>
        </div>

        {/* Display Settings */}
        <div className={`p-6 mb-6 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Moon className="w-5 h-5 text-primary" />
            Display
          </h2>

          <div className="space-y-4">
            <label className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-gray-700/50 hover:bg-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Easy on the eyes in low light</p>
              </div>
              <input
                type="checkbox"
                checked={isDark}
                onChange={toggle}
                className="w-5 h-5 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Language Settings */}
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Globe className="w-5 h-5 text-primary" />
            Language
          </h2>

          <select
            value={settings.language}
            onChange={handleLanguageChange}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${
              isDark
                ? 'bg-gray-700/50 text-white border-gray-600 focus:border-primary'
                : 'bg-white text-gray-900 border-gray-200 focus:border-primary'
            }`}
          >
            <option value="en">English</option>
            <option value="vi">Tiếng Việt (Vietnamese)</option>
            <option value="ru">Русский (Russian)</option>
            <option value="it">Italiano (Italian)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
