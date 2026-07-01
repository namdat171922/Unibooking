import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Scissors, Plus, Edit, Trash2, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ServicesPage = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Hair Cut',
      description: 'Professional hair cut with styling',
      duration_minutes: 30,
      price: 45,
      category: 'hair',
      image: '✂️',
      is_active: true,
    },
    {
      id: 2,
      name: 'Hair Coloring',
      description: 'Full hair coloring service',
      duration_minutes: 60,
      price: 85,
      category: 'hair',
      image: '🎨',
      is_active: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_minutes: 30,
    price: 0,
    category: 'hair',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duration_minutes' || name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleAddService = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...s, ...formData } : s));
      toast.success('Service updated!');
      setEditingId(null);
    } else {
      setServices([...services, {
        id: Date.now(),
        ...formData,
        image: '✂️',
        is_active: true,
      }]);
      toast.success('Service added!');
    }

    setFormData({ name: '', description: '', duration_minutes: 30, price: 0, category: 'hair' });
    setShowForm(false);
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      duration_minutes: service.duration_minutes,
      price: service.price,
      category: service.category,
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id));
    toast.success('Service deleted!');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', duration_minutes: 30, price: 0, category: 'hair' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Services
            </h1>
            <p className="text-text-secondary">Manage your business services and pricing</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>

        {/* Add/Edit Service Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Service' : 'Add New Service'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Service Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Hair Cut, Massage"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this service..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                >
                  <option value="hair">Hair</option>
                  <option value="nails">Nails</option>
                  <option value="facial">Facial</option>
                  <option value="massage">Massage</option>
                  <option value="spa">Spa</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={formData.duration_minutes}
                  onChange={handleChange}
                  min="15"
                  step="15"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold mb-2">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddService}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                {editingId ? 'Update Service' : 'Add Service'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length === 0 ? (
            <div className="col-span-2 text-center py-12 card">
              <Scissors className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary">No services yet. Add your first service!</p>
            </div>
          ) : (
            services.map(service => (
              <div key={service.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{service.image}</span>
                    <div>
                      <h3 className="font-bold text-lg">{service.name}</h3>
                      <p className="text-sm text-text-secondary">{service.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-text-secondary text-sm mb-4">{service.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{service.duration_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span>${service.price}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
