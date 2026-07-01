import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const VIETNAM_PROVINCES = [
  'Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho',
  'Bien Hoa', 'Vung Tau', 'Nha Trang', 'Hue', 'Da Lat'
];

const StepLocation = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [formData, setFormData] = useState({
    country: data.country || 'Vietnam',
    province: data.province || '',
    district: data.district || '',
    ward: data.ward || '',
    address: data.address || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.province) newErrors.province = 'Province/City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateData(formData);
      onNext();
    }
  };

  const inputClassName = (hasError) => `w-full px-4 py-3 rounded-xl border-2 transition-all ${
    isDark
      ? `bg-gray-700/50 text-white placeholder-gray-400 ${
          hasError ? 'border-red-500' : 'border-gray-600 focus:border-primary'
        }`
      : `bg-white text-gray-900 placeholder-gray-400 ${
          hasError ? 'border-red-500' : 'border-gray-200 focus:border-primary'
        }`
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isDark ? 'bg-primary/20' : 'bg-primary/10'
        }`}>
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Business Location
        </h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Where can customers find you?</p>
      </div>

      {/* Map Placeholder */}
      <div className={`w-full h-64 rounded-xl flex items-center justify-center border-2 border-dashed ${
        isDark
          ? 'bg-gray-700/30 border-gray-600'
          : 'bg-gray-100 border-gray-300'
      }`}>
        <div className="text-center">
          <MapPin className={`w-12 h-12 mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Map will be displayed here</p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Google Maps integration</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
            className={`w-full px-4 py-3 rounded-xl border-2 ${
              isDark
                ? 'bg-gray-600/50 text-gray-300 border-gray-600'
                : 'bg-gray-50 text-gray-700 border-gray-200'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Province/City *</label>
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className={inputClassName(!!errors.province)}
          >
            <option value="">Select province/city</option>
            {VIETNAM_PROVINCES.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter district"
            className={inputClassName(false)}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Ward</label>
          <input
            type="text"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            placeholder="Enter ward"
            className={inputClassName(false)}
          />
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Street Address *</label>
          <div className="relative">
            <Search className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Le Loi Street, Ward 1"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all ${
                isDark
                  ? `bg-gray-700/50 text-white placeholder-gray-400 ${
                      errors.address ? 'border-red-500' : 'border-gray-600 focus:border-primary'
                    }`
                  : `bg-white text-gray-900 placeholder-gray-400 ${
                      errors.address ? 'border-red-500' : 'border-gray-200 focus:border-primary'
                    }`
              }`}
            />
          </div>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
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

export default StepLocation;
