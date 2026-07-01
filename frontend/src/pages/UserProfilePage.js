import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import Navbar from '../components/Navbar';
import { User, Mail, Phone, MapPin, Camera, Save, Edit2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const VIETNAM_PROVINCES = [
  'Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho',
  'Bien Hoa', 'Vung Tau', 'Nha Trang', 'Hue', 'Da Lat', 'Ha Long',
  'Dong Hoi', 'Vinh', 'Thanh Hoa', 'Hai Duong', 'Bac Ninh', 'Bac Giang'
];

const WARDS_BY_CITY = {
  'Ho Chi Minh City': ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6', 'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10', 'Ward 11', 'Ward 12', 'Ward 13', 'Ward 14'],
  'Hanoi': ['Ba Dinh Ward', 'Hai Ba Trung Ward', 'Hoan Kiem Ward', 'Dong Da Ward', 'Tay Ho Ward', 'Long Bien Ward', 'Nam Tu Liem Ward', 'Bac Tu Liem Ward'],
  'Da Nang': ['Hai Chau Ward', 'Thanh Khe Ward', 'Son Tra Ward', 'Ngu Hanh Son Ward', 'Lien Chieu Ward'],
  'Hai Phong': ['Hong Bang Ward', 'Ngo Quyen Ward', 'Hai An Ward', 'Kien An Ward'],
  'Can Tho': ['Ninh Kieu Ward', 'Binh Thuy Ward', 'Cai Rang Ward', 'Thot Not Ward'],
  'Bien Hoa': ['Bien Hoa Ward', 'Tam Hiep Ward', 'Long Binh Ward'],
  'Vung Tau': ['Thang Tam Ward', 'Nhan Duc Ward', 'Phuong Sai Gon Ward'],
};

const UserProfilePage = () => {
  const { user } = useAuth();
  const { isDark } = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 'not_specified',
    date_of_birth: user?.date_of_birth || '',
    street_address: user?.street_address || '',
    city: user?.city || '',
    ward: user?.ward || '',
    country: 'Vietnam',
    avatar_url: user?.avatar_url || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      if (!formData.full_name || !formData.phone) {
        toast.error('Please fill in required fields');
        return;
      }
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const inputClassName = `w-full px-4 py-3 rounded-lg border-2 transition-all ${
    isDark
      ? 'bg-gray-700/50 text-white placeholder-gray-400 border-gray-600 focus:border-primary disabled:bg-gray-600/50 disabled:text-gray-400'
      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-primary disabled:bg-gray-50 disabled:text-gray-600'
  }`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />

      <div className="container max-w-3xl py-12 px-4 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            My Profile
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Edit and manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden border backdrop-blur-xl ${isDark ? 'bg-gray-800/80 border-white/10' : 'bg-white/80 border-white/50'}`}>
          {/* Avatar Section */}
          <div className={`py-12 px-6 text-center ${isDark ? 'bg-gray-700/50' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
            <div className="relative inline-block">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                {formData.avatar_url ? (
                  <img src={formData.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-14 h-14" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className={`text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.full_name || 'Your Name'}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.email}</p>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <div className="flex justify-end p-6 border-b border-gray-200/50">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          )}

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClassName}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClassName}
                    placeholder="+84 xxx xxx xxx"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email (Locked)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      isDark
                        ? 'bg-gray-600/50 text-gray-400 border-gray-600 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClassName}
                  >
                    <option value="not_specified">Not Specified</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="pt-4 border-t border-gray-200/50">
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Street Address with District */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Street Address (with District & Ward)</label>
                  <input
                    type="text"
                    name="street_address"
                    value={formData.street_address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClassName}
                    placeholder="e.g., 123 Nguyen Hue St, District 1, Ward 1"
                  />
                </div>

                {/* City/Province */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>City / Province</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={inputClassName}
                  >
                    <option value="">Select city / province</option>
                    {VIETNAM_PROVINCES.map(province => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                {/* Ward/Commune */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Ward / Commune</label>
                  <select
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    disabled={!isEditing || !formData.city}
                    className={inputClassName}
                  >
                    <option value="">Select ward / commune</option>
                    {formData.city && WARDS_BY_CITY[formData.city] ? (
                      WARDS_BY_CITY[formData.city].map(ward => (
                        <option key={ward} value={ward}>{ward}</option>
                      ))
                    ) : null}
                  </select>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="pt-4 border-t border-gray-200/50">
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>About You</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all resize-none ${
                  isDark
                    ? 'bg-gray-700/50 text-white placeholder-gray-400 border-gray-600 focus:border-primary disabled:bg-gray-600/50 disabled:text-gray-400'
                    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-primary disabled:bg-gray-50 disabled:text-gray-600'
                }`}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className={`flex gap-3 p-8 border-t ${isDark ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
