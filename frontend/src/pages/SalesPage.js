import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Tag, Plus, Edit, Trash2, Percent, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const SalesPage = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([
    {
      id: 1,
      name: 'Summer Sale',
      description: '20% off all hair services',
      discount_type: 'percentage',
      discount_value: 20,
      start_date: '2024-06-01',
      end_date: '2024-08-31',
      applicable_services: ['Hair Cut', 'Hair Coloring'],
      status: 'active',
      image: '☀️',
    },
    {
      id: 2,
      name: 'New Customer Offer',
      description: '$15 off first booking',
      discount_type: 'fixed',
      discount_value: 15,
      start_date: '2024-06-01',
      end_date: '2024-12-31',
      applicable_services: ['All Services'],
      status: 'active',
      image: '🎉',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 0,
    start_date: '',
    end_date: '',
    applicable_services: 'All Services',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'discount_value' ? parseFloat(value) : value,
    });
  };

  const handleAddSale = () => {
    if (!formData.name || !formData.discount_value || !formData.start_date || !formData.end_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      toast.error('End date must be after start date');
      return;
    }

    if (editingId) {
      setSales(sales.map(s => s.id === editingId ? { ...s, ...formData } : s));
      toast.success('Sale updated!');
      setEditingId(null);
    } else {
      setSales([...sales, {
        id: Date.now(),
        ...formData,
        status: 'active',
        image: '🏷️',
      }]);
      toast.success('Sale created!');
    }

    setFormData({ name: '', description: '', discount_type: 'percentage', discount_value: 0, start_date: '', end_date: '', applicable_services: 'All Services' });
    setShowForm(false);
  };

  const handleEdit = (sale) => {
    setFormData({
      name: sale.name,
      description: sale.description,
      discount_type: sale.discount_type,
      discount_value: sale.discount_value,
      start_date: sale.start_date,
      end_date: sale.end_date,
      applicable_services: sale.applicable_services.join(', '),
    });
    setEditingId(sale.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSales(sales.filter(s => s.id !== id));
    toast.success('Sale deleted!');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', discount_type: 'percentage', discount_value: 0, start_date: '', end_date: '', applicable_services: 'All Services' });
  };

  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) return 'upcoming';
    if (today > end) return 'expired';
    return 'active';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Sales & Promotions
            </h1>
            <p className="text-text-secondary">Create special offers to boost bookings</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Sale
          </button>
        </div>

        {/* Add/Edit Sale Form */}
        {showForm && (
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Sale' : 'Create New Sale'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sale Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Sale Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Summer Sale, Holiday Special"
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
                  placeholder="Describe this promotion..."
                  rows="2"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-sm font-semibold mb-2">Discount Type</label>
                <select
                  name="discount_type"
                  value={formData.discount_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-sm font-semibold mb-2">Discount Value *</label>
                <div className="relative">
                  <input
                    type="number"
                    name="discount_value"
                    value={formData.discount_value}
                    onChange={handleChange}
                    min="0"
                    step={formData.discount_type === 'percentage' ? '1' : '0.01'}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary pr-8"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 font-semibold">
                    {formData.discount_type === 'percentage' ? '%' : '$'}
                  </span>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold mb-2">Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold mb-2">End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Applicable Services */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Applicable Services</label>
                <input
                  type="text"
                  name="applicable_services"
                  value={formData.applicable_services}
                  onChange={handleChange}
                  placeholder="e.g., Hair Cut, Coloring (or 'All Services')"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleAddSale}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                {editingId ? 'Update Sale' : 'Create Sale'}
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

        {/* Sales List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sales.length === 0 ? (
            <div className="col-span-2 text-center py-12 card">
              <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary">No sales yet. Create your first promotion!</p>
            </div>
          ) : (
            sales.map(sale => {
              const status = getStatus(sale.start_date, sale.end_date);
              const statusColor = {
                active: 'bg-green-100 text-green-700',
                upcoming: 'bg-blue-100 text-blue-700',
                expired: 'bg-gray-100 text-gray-700',
              };

              return (
                <div key={sale.id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{sale.image}</span>
                      <div>
                        <h3 className="font-bold text-lg">{sale.name}</h3>
                        <p className="text-sm text-text-secondary">{sale.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(sale)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(sale.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Discount Display */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-primary" />
                      <span className="font-bold text-lg">
                        {sale.discount_type === 'percentage' ? `${sale.discount_value}%` : `$${sale.discount_value.toFixed(2)}`} OFF
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Applies to: {Array.isArray(sale.applicable_services) ? sale.applicable_services.join(', ') : sale.applicable_services}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{sale.start_date} to {sale.end_date}</span>
                  </div>

                  {/* Status */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor[status]}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
