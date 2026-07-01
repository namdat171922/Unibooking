import React, { useState } from 'react';
import { Building2, Mail, Phone, Globe, Facebook, Instagram } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StepBusinessInfo = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [formData, setFormData] = useState({
    businessName: data.businessName || '',
    brandName: data.brandName || '',
    description: data.description || '',
    email: data.email || '',
    phone: data.phone || '',
    website: data.website || '',
    facebook: data.facebook || '',
    instagram: data.instagram || '',
    tiktok: data.tiktok || '',
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
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

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

  const inputWithIconClassName = (hasError) => `w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all ${
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
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Business Information
        </h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Tell us about your business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Business Name *</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Beauty Salon Saigon"
            className={inputClassName(!!errors.businessName)}
            data-testid="business-name-input"
          />
          {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Brand Name (Optional)</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            placeholder="Your brand name"
            className={inputClassName(false)}
          />
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your business, services, and what makes you special..."
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all resize-none ${
              isDark
                ? 'bg-gray-700/50 text-white placeholder-gray-400 border-gray-600 focus:border-primary'
                : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-primary'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Email *</label>
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@yourbusiness.com"
              className={inputWithIconClassName(!!errors.email)}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Phone *</label>
          <div className="relative">
            <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+84 xxx xxx xxx"
              className={inputWithIconClassName(!!errors.phone)}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Website</label>
          <div className="relative">
            <Globe className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              className={inputWithIconClassName(false)}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Facebook</label>
          <div className="relative">
            <Facebook className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="facebook.com/yourpage"
              className={inputWithIconClassName(false)}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Instagram</label>
          <div className="relative">
            <Instagram className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourhandle"
              className={inputWithIconClassName(false)}
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>TikTok</label>
          <input
            type="text"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            placeholder="@yourhandle"
            className={inputClassName(false)}
          />
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

export default StepBusinessInfo;
