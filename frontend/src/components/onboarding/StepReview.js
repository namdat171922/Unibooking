import React from 'react';
import { Eye, MapPin, Clock, Scissors, Users, FileText, Check } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StepReview = ({ data, onPublish }) => {
  const { isDark } = useDarkMode();
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Eye className="w-8 h-8 text-green-600" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Review & Publish
        </h2>
        <p className="text-text-secondary">Review your information before publishing</p>
      </div>

      <div className="space-y-4">
        {/* Business Info */}
        <div className="p-6 bg-white border-2 border-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Business Information</h3>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-600">Name</dt>
              <dd className="font-semibold">{data.businessName || 'Not set'}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Category</dt>
              <dd className="font-semibold capitalize">{data.category?.replace('_', ' ') || 'Not set'}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Email</dt>
              <dd className="font-semibold">{data.email || 'Not set'}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Phone</dt>
              <dd className="font-semibold">{data.phone || 'Not set'}</dd>
            </div>
          </dl>
        </div>

        {/* Location */}
        <div className="p-6 bg-white border-2 border-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Location</h3>
          </div>
          <p className="text-sm">{data.address || 'Not set'}</p>
          <p className="text-sm text-gray-600">
            {data.district && `${data.district}, `}
            {data.province || 'Province not set'}
          </p>
        </div>

        {/* Services */}
        <div className="p-6 bg-white border-2 border-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Services</h3>
          </div>
          {data.services?.length > 0 ? (
            <div className="space-y-2">
              {data.services.map((service, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span className="font-semibold">${service.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No services added</p>
          )}
        </div>

        {/* Staff */}
        <div className="p-6 bg-white border-2 border-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Staff</h3>
          </div>
          {data.staff?.length > 0 ? (
            <div className="space-y-2">
              {data.staff.map((member, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-semibold">{member.name}</span>
                  {member.position && <span className="text-gray-600"> - {member.position}</span>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No staff added yet</p>
          )}
        </div>

        {/* Opening Hours */}
        <div className="p-6 bg-white border-2 border-gray-100 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Opening Hours</h3>
          </div>
          {data.openingHours?.filter(h => h.isOpen).length > 0 ? (
            <p className="text-sm text-gray-600">
              {data.openingHours.filter(h => h.isOpen).length} days configured
            </p>
          ) : (
            <p className="text-sm text-gray-500">Not configured</p>
          )}
        </div>
      </div>

      <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
        <h4 className="font-semibold text-green-900 mb-2">Ready to publish?</h4>
        <p className="text-sm text-green-700 mb-4">
          Your business profile will be published and visible to customers. You can always edit it later from your dashboard.
        </p>
        <button
          onClick={onPublish}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Publish My Business
        </button>
      </div>
    </div>
  );
};

export default StepReview;
