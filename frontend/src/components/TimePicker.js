import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export const TimePicker = ({ value = '', onChange, label, disabled = false, className = '' }) => {
  const { isDark } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState('09');
  const [minutes, setMinutes] = useState('00');
  const dropdownRef = useRef(null);

  // Initialize from value
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHours(h || '09');
      setMinutes(m || '00');
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const incrementHour = () => {
    const newHour = String((parseInt(hours) + 1) % 24).padStart(2, '0');
    setHours(newHour);
    onChange(`${newHour}:${minutes}`);
  };

  const decrementHour = () => {
    const newHour = String((parseInt(hours) - 1 + 24) % 24).padStart(2, '0');
    setHours(newHour);
    onChange(`${newHour}:${minutes}`);
  };

  const incrementMinute = () => {
    const newMinute = String((parseInt(minutes) + 1) % 60).padStart(2, '0');
    setMinutes(newMinute);
    onChange(`${hours}:${newMinute}`);
  };

  const decrementMinute = () => {
    const newMinute = String((parseInt(minutes) - 1 + 60) % 60).padStart(2, '0');
    setMinutes(newMinute);
    onChange(`${hours}:${newMinute}`);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  const handleHourChange = (e) => {
    const h = e.target.value.padStart(2, '0');
    if (h >= 0 && h < 24) {
      setHours(h);
      onChange(`${h}:${minutes}`);
    }
  };

  const handleMinuteChange = (e) => {
    const m = e.target.value.padStart(2, '0');
    if (m >= 0 && m < 60) {
      setMinutes(m);
      onChange(`${hours}:${m}`);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className={`text-xs font-bold mb-1 block ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
          {label}
        </label>
      )}
      
      <div ref={dropdownRef} className="relative">
        {/* Main Input Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg border-2 font-bold text-lg transition-all flex items-center justify-between ${
            isDark
              ? 'bg-gray-600 border-blue-400/50 text-white hover:border-blue-400 focus:border-blue-400'
              : 'bg-white border-blue-200 text-gray-900 hover:border-blue-400 focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-300/50 shadow-sm disabled:opacity-50`}
        >
          <span>{value || '--:--'}</span>
          <div className="flex items-center gap-1">
            {value && (
              <X
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className={`cursor-pointer ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
              />
            )}
            <ChevronDown
              size={20}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Modern Spinner Picker */}
        {isOpen && (
          <div
            className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border z-50 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className={`px-6 py-6 flex items-center justify-center gap-4`}>
              {/* Hours Spinner */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={incrementHour}
                  className={`p-2 rounded-lg transition-all ${
                    isDark ? 'bg-blue-600/30 hover:bg-blue-600/50 text-blue-300' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                  }`}
                >
                  <ChevronUp size={24} />
                </button>
                
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={handleHourChange}
                  className={`w-16 text-center px-3 py-2 rounded-lg border-2 font-bold text-2xl transition-all ${
                    isDark
                      ? 'bg-gray-700 border-blue-400/50 text-white'
                      : 'bg-blue-50 border-blue-300 text-blue-600'
                  } focus:outline-none focus:ring-2 focus:ring-blue-300/50`}
                />
                
                <button
                  onClick={decrementHour}
                  className={`p-2 rounded-lg transition-all ${
                    isDark ? 'bg-blue-600/30 hover:bg-blue-600/50 text-blue-300' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                  }`}
                >
                  <ChevronDown size={24} />
                </button>
              </div>

              {/* Colon Separator */}
              <div className={`text-3xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                :
              </div>

              {/* Minutes Spinner */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={incrementMinute}
                  className={`p-2 rounded-lg transition-all ${
                    isDark ? 'bg-purple-600/30 hover:bg-purple-600/50 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-600'
                  }`}
                >
                  <ChevronUp size={24} />
                </button>
                
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={handleMinuteChange}
                  className={`w-16 text-center px-3 py-2 rounded-lg border-2 font-bold text-2xl transition-all ${
                    isDark
                      ? 'bg-gray-700 border-purple-400/50 text-white'
                      : 'bg-purple-50 border-purple-300 text-purple-600'
                  } focus:outline-none focus:ring-2 focus:ring-purple-300/50`}
                />
                
                <button
                  onClick={decrementMinute}
                  className={`p-2 rounded-lg transition-all ${
                    isDark ? 'bg-purple-600/30 hover:bg-purple-600/50 text-purple-300' : 'bg-purple-100 hover:bg-purple-200 text-purple-600'
                  }`}
                >
                  <ChevronDown size={24} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div
              className={`px-6 py-3 border-t flex items-center justify-center gap-3 ${
                isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'
              }`}
            >
              <button
                onClick={() => setIsOpen(false)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;
