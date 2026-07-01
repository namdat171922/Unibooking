import React, { useState } from 'react';
import { Users, Plus, Trash2, User } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StepStaff = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [staff, setStaff] = useState(data.staff || []);
  const [showForm, setShowForm] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({
    name: '',
    position: '',
    bio: '',
    experience: '',
  });

  const addStaff = () => {
    if (currentStaff.name) {
      setStaff([...staff, { ...currentStaff, id: Date.now() }]);
      setCurrentStaff({ name: '', position: '', bio: '', experience: '' });
      setShowForm(false);
    }
  };

  const removeStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleSkip = () => {
    updateData({ staff: [] });
    onNext();
  };

  const handleSubmit = () => {
    updateData({ staff });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Staff Members
        </h2>
        <p className="text-text-secondary">Add your team (you can skip this for now)</p>
      </div>

      {/* Staff List */}
      <div className="space-y-3">
        {staff.map((member) => (
          <div key={member.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.position}</p>
              {member.experience && (
                <p className="text-xs text-gray-500 mt-1">{member.experience} years experience</p>
              )}
            </div>
            <button
              onClick={() => removeStaff(member.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Staff Form */}
      {showForm ? (
        <div className="p-6 bg-gray-50 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={currentStaff.name}
            onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <input
            type="text"
            placeholder="Position (e.g. Senior Stylist)"
            value={currentStaff.position}
            onChange={(e) => setCurrentStaff({ ...currentStaff, position: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <input
            type="text"
            placeholder="Years of experience"
            value={currentStaff.experience}
            onChange={(e) => setCurrentStaff({ ...currentStaff, experience: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <textarea
            placeholder="Bio / Specialties"
            value={currentStaff.bio}
            onChange={(e) => setCurrentStaff({ ...currentStaff, bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <div className="flex gap-3">
            <button
              onClick={addStaff}
              className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all"
            >
              Add Staff
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-primary"
        >
          <Plus className="w-5 h-5" />
          Add Staff Member
        </button>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-medium"
        >
          Skip for Now
        </button>
        {staff.length > 0 && (
          <button
            onClick={handleSubmit}
            className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default StepStaff;
