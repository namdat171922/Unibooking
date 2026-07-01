import React, { useState } from 'react';
import { Clock, Copy } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const DAYS = [
  { id: 0, name: 'Sunday', nameVi: 'Chủ nhật' },
  { id: 1, name: 'Monday', nameVi: 'Thứ hai' },
  { id: 2, name: 'Tuesday', nameVi: 'Thứ ba' },
  { id: 3, name: 'Wednesday', nameVi: 'Thứ tư' },
  { id: 4, name: 'Thursday', nameVi: 'Thứ năm' },
  { id: 5, name: 'Friday', nameVi: 'Thứ sáu' },
  { id: 6, name: 'Saturday', nameVi: 'Thứ bảy' },
];

const StepOpeningHours = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [schedule, setSchedule] = useState(
    data.openingHours?.length > 0 ? data.openingHours : DAYS.map(day => ({
      day: day.id,
      isOpen: true,
      openTime: '09:00',
      closeTime: '20:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      hasBreak: false,
    }))
  );

  const handleChange = (dayId, field, value) => {
    setSchedule(prev => prev.map(item => 
      item.day === dayId ? { ...item, [field]: value } : item
    ));
  };

  const copyToAll = (dayId) => {
    const source = schedule.find(s => s.day === dayId);
    setSchedule(prev => prev.map(item => ({
      ...item,
      openTime: source.openTime,
      closeTime: source.closeTime,
      breakStart: source.breakStart,
      breakEnd: source.breakEnd,
      hasBreak: source.hasBreak,
    })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ openingHours: schedule });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <Clock className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Opening Hours
        </h2>
        <p className="text-text-secondary">Set your business working hours</p>
      </div>

      <div className="space-y-4">
        {DAYS.map((day, idx) => {
          const daySchedule = schedule.find(s => s.day === day.id);
          
          return (
            <div key={day.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={daySchedule.isOpen}
                    onChange={(e) => handleChange(day.id, 'isOpen', e.target.checked)}
                    className="w-5 h-5 text-primary rounded"
                  />
                  <span className="font-semibold">{day.name}</span>
                  <span className="text-sm text-gray-500">({day.nameVi})</span>
                </div>
                {idx === 0 && (
                  <button
                    type="button"
                    onClick={() => copyToAll(day.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:border-primary transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    Copy to all
                  </button>
                )}
              </div>

              {daySchedule.isOpen && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Open</label>
                    <input
                      type="time"
                      value={daySchedule.openTime}
                      onChange={(e) => handleChange(day.id, 'openTime', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Close</label>
                    <input
                      type="time"
                      value={daySchedule.closeTime}
                      onChange={(e) => handleChange(day.id, 'closeTime', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-primary"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <label className="flex items-center gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={daySchedule.hasBreak}
                        onChange={(e) => handleChange(day.id, 'hasBreak', e.target.checked)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      Break time
                    </label>
                    {daySchedule.hasBreak && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <input
                          type="time"
                          value={daySchedule.breakStart}
                          onChange={(e) => handleChange(day.id, 'breakStart', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-primary"
                        />
                        <input
                          type="time"
                          value={daySchedule.breakEnd}
                          onChange={(e) => handleChange(day.id, 'breakEnd', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
      >
        Continue
      </button>
    </form>
  );
};

export default StepOpeningHours;
