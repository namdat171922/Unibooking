import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Package, Plus, Edit, Trash2, DollarSign, Zap } from 'lucide-react';
import { toast } from 'sonner';

const PackagesPage = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Basic Hair Package',
      description: 'Haircut + Basic Styling',
      services: ['Hair Cut', 'Basic Styling'],
      original_price: 110,
      package_price: 89,
      discount_percentage: 20,
      image: '💇',
      is_active: true,
    },
    {
      id: 2,
      name: 'Premium Spa Package',
      description: 'Facial + Massage + Body Treatment',
      services: ['Facial', 'Massage', 'Body Treatment'],
      original_price: 250,
      package_price: 189,
      discount_percentage: 25,
      image: '🧖',
      is_active: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    services: [],
    original_price: 0,
    package_price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('price') ? parseFloat(value) : value,
    });
  };

  const calculateDiscount = () => {
    if (formData.original_price && formData.package_price) {
      return Math.round(((formData.original_price - formData.package_price) / formData.original_price) * 100);
    }
    return 0;
  };

  const handleAddPackage = () => {
    if (!formData.name || !formData.package_price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const discount = calculateDiscount();

    if (editingId) {
      setPackages(packages.map(p =>
        p.id === editingId ? { ...p, ...formData, discount_percentage: discount } : p
      ));
      toast.success('Package updated!');
      setEditingId(null);
    } else {
      setPackages([...packages, {
        id: Date.now(),
        ...formData,
        discount_percentage: discount,
        image: '💇',
        is_active: true,
      }]);
      toast.success('Package added!');
    }

    setFormData({ name: '', description: '', services: [], original_price: 0, package_price: 0 });
    setShowForm(false);
  };

  const handleEdit = (pkg) => {
    setFormData({
      name: pkg.name,
      description: pkg.description,
      services: pkg.services,
      original_price: pkg.original_price,
      package_price: pkg.package_price,
    });
    setEditingId(pkg.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setPackages(packages.filter(p => p.id !== id));
    toast.success('Package deleted!');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', services: [], original_price: 0, package_price: 0 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Packages & Combos
            </h1>
            <p className="text-text-secondary">Create service packages to offer better value</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Package
          </button>
        </div>

        {/* Add/Edit Package Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Package' : 'Create New Package'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Package Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Package Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Deluxe Hair Package"
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
                  placeholder="Describe what's included in this package..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-sm font-semibold mb-2">Original Total Value ($)</label>
                <input
                  type="number"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Package Price */}
              <div>
                <label className="block text-sm font-semibold mb-2">Package Price ($) *</label>
                <input
                  type="number"
                  name="package_price"
                  value={formData.package_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Services Included */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Services Included</label>
                <input
                  type="text"
                  name="services"
                  placeholder="e.g., Hair Cut, Coloring, Styling (comma separated)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Discount Display */}
              {formData.original_price > 0 && formData.package_price > 0 && (
                <div className="md:col-span-2 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-700">
                    💰 Your customers save {calculateDiscount()}% with this package!
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddPackage}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                {editingId ? 'Update Package' : 'Create Package'}
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

        {/* Packages List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.length === 0 ? (
            <div className="col-span-2 text-center py-12 card">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary">No packages yet. Create your first package!</p>
            </div>
          ) : (
            packages.map(pkg => (
              <div key={pkg.id} className="card p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Discount Badge */}
                {pkg.discount_percentage > 0 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
                    Save {pkg.discount_percentage}%
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pkg.image}</span>
                    <div>
                      <h3 className="font-bold text-lg">{pkg.name}</h3>
                      <p className="text-sm text-text-secondary">{pkg.services.length} services</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-text-secondary text-sm mb-4">{pkg.description}</p>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-text-secondary mb-2">Includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.services.map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary bg-opacity-10 text-primary text-xs rounded-full font-medium">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    {pkg.original_price > 0 && (
                      <p className="text-xs text-gray-400 line-through">
                        ${pkg.original_price.toFixed(2)}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-primary">${pkg.package_price.toFixed(2)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pkg.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {pkg.is_active ? 'Active' : 'Inactive'}
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

export default PackagesPage;
