import React, { useState } from 'react';
import { Scissors, Plus, Trash2, DollarSign, Clock } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const StepServices = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [services, setServices] = useState(data.services || []);
  const [showForm, setShowForm] = useState(false);
  const [currentService, setCurrentService] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: '',
  });

  const addService = () => {
    if (currentService.name && currentService.price > 0) {
      setServices([...services, { ...currentService, id: Date.now() }]);
      setCurrentService({ name: '', description: '', duration: 60, price: 0, category: '' });
      setShowForm(false);
    }
  };

  const removeService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleSubmit = () => {
    if (services.length > 0) {
      updateData({ services });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <Scissors className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Services
        </h2>
        <p className="text-text-secondary">Add the services you offer</p>
      </div>

      {/* Service List */}
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <h4 className="font-semibold">{service.name}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ${service.price}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeService(service.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Service Form */}
      {showForm ? (
        <div className="p-6 bg-gray-50 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Service name (e.g. Men's Haircut)"
            value={currentService.name}
            onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <textarea
            placeholder="Description"
            value={currentService.description}
            onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Duration (minutes)</label>
              <input
                type="number"
                value={currentService.duration}
                onChange={(e) => setCurrentService({ ...currentService, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Price ($)</label>
              <input
                type="number"
                value={currentService.price}
                onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addService}
              className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-all"
            >
              Add Service
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
          Add Service
        </button>
      )}

      {services.length > 0 && (
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default StepServices;
