import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StepBookingPolicy = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [formData, setFormData] = useState({
    cancellationPolicy: data.cancellationPolicy || 'free_24h',
    depositRequired: data.depositRequired || false,
    depositAmount: data.depositAmount || 20,
    noShowFee: data.noShowFee || 0,
    lateArrivalPolicy: data.lateArrivalPolicy || '15min_grace',
  });

  const handleSubmit = () => {
    updateData(formData);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Booking Policies
        </h2>
        <p className="text-text-secondary">Set your booking rules and policies</p>
      </div>

      <div className="space-y-6">
        {/* Cancellation Policy */}
        <div>
          <label className="block text-sm font-semibold mb-3">Cancellation Policy</label>
          <div className="space-y-2">
            {[
              { value: 'free_24h', label: 'Free cancellation up to 24 hours before' },
              { value: 'free_48h', label: 'Free cancellation up to 48 hours before' },
              { value: 'no_refund', label: 'No refunds after booking' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                <input
                  type="radio"
                  name="cancellationPolicy"
                  value={option.value}
                  checked={formData.cancellationPolicy === option.value}
                  onChange={(e) => setFormData({ ...formData, cancellationPolicy: e.target.value })}
                  className="w-5 h-5 text-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Deposit */}
        <div>
          <label className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              checked={formData.depositRequired}
              onChange={(e) => setFormData({ ...formData, depositRequired: e.target.checked })}
              className="w-5 h-5 text-primary rounded"
            />
            <span className="font-semibold">Require deposit for booking</span>
          </label>
          {formData.depositRequired && (
            <div>
              <label className="block text-sm text-gray-600 mb-2">Deposit amount (%)</label>
              <input
                type="number"
                value={formData.depositAmount}
                onChange={(e) => setFormData({ ...formData, depositAmount: parseInt(e.target.value) })}
                min="0"
                max="100"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
              />
            </div>
          )}
        </div>

        {/* No-show Fee */}
        <div>
          <label className="block text-sm font-semibold mb-2">No-show Fee ($)</label>
          <input
            type="number"
            value={formData.noShowFee}
            onChange={(e) => setFormData({ ...formData, noShowFee: parseInt(e.target.value) })}
            min="0"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <p className="text-sm text-gray-500 mt-2">Charge customers who don't show up</p>
        </div>

        {/* Late Arrival */}
        <div>
          <label className="block text-sm font-semibold mb-3">Late Arrival Policy</label>
          <select
            value={formData.lateArrivalPolicy}
            onChange={(e) => setFormData({ ...formData, lateArrivalPolicy: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          >
            <option value="15min_grace">15 minutes grace period</option>
            <option value="30min_grace">30 minutes grace period</option>
            <option value="auto_cancel">Auto-cancel if late</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
      >
        Continue
      </button>
    </div>
  );
};

export default StepBookingPolicy;
