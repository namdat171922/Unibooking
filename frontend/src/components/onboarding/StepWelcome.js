import React from 'react';
import { Sparkles, ArrowRight, Zap, Smartphone, TrendingUp } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StepWelcome = ({ onNext }) => {
  const { isDark } = useDarkMode();

  return (
    <div className="text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
        <Sparkles className="w-10 h-10 text-white" />
      </div>

      <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
        Welcome to StyleMatch Business
      </h1>

      <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Let's set up your beauty business in just a few minutes. We'll guide you through every step.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-blue-900/30 border-blue-700 hover:bg-blue-900/50' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500 text-white mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Setup</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Complete setup in under 10 minutes</p>
        </div>
        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-purple-900/30 border-purple-700 hover:bg-purple-900/50' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500 text-white mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Mobile Ready</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage bookings from anywhere</p>
        </div>
        <div className={`p-6 rounded-2xl border transition-all ${isDark ? 'bg-green-900/30 border-green-700 hover:bg-green-900/50' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500 text-white mb-3">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Grow Revenue</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Reduce no-shows and increase bookings</p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:shadow-xl transition-all mt-8"
        data-testid="welcome-start-button"
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default StepWelcome;
