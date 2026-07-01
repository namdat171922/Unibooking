import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useBusinessStore, useStaffStore, useServicesStore } from '../stores';
import { Camera, Edit, Settings, Users, Clock, Star, DollarSign, Scissors, Package, Tag, MessageCircle, ChevronDown, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

const MyBusinessPage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const { currentBusiness, updateBusiness } = useBusinessStore();
  const { staff, addStaff } = useStaffStore();
  const { services } = useServicesStore();

  const [businessData, setBusinessData] = useState({
    name: currentBusiness?.name || 'My Salon',
    description: currentBusiness?.description || '',
    category: currentBusiness?.category || 'salon',
    address: currentBusiness?.address || '',
    phone: currentBusiness?.phone || '',
    cover_image_url: currentBusiness?.cover_image_url || null,
  });

  const [openingHours, setOpeningHours] = useState({
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '10:00', close: '17:00', closed: false },
    sunday: { open: '10:00', close: '17:00', closed: true },
  });

  const [dateSpecificHours, setDateSpecificHours] = useState({});

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'stylist',
    specialization: '',
  });

  const handleBusinessChange = (e) => {
    setBusinessData({
      ...businessData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHourChange = (day, field, value) => {
    setOpeningHours({
      ...openingHours,
      [day]: {
        ...openingHours[day],
        [field]: value,
      },
    });
  };

  const handleToggleClosed = (day) => {
    setOpeningHours({
      ...openingHours,
      [day]: {
        ...openingHours[day],
        closed: !openingHours[day].closed,
      },
    });
  };

  const handleSaveHours = () => {
    toast.success('Opening hours updated!');
    setShowHoursModal(false);
  };

  const handleDateSpecificChange = (field, value) => {
    setDateSpecificHours({
      ...dateSpecificHours,
      [selectedDate]: {
        ...(dateSpecificHours[selectedDate] || { open: '09:00', close: '18:00', closed: false }),
        [field]: value,
      },
    });
  };

  const getHoursForDate = (date) => {
    if (dateSpecificHours[date]) {
      return dateSpecificHours[date];
    }
    const dayOfWeek = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'lowercase' });
    return openingHours[dayOfWeek];
  };

  const handleSaveBusiness = async () => {
    try {
      updateBusiness(currentBusiness?.id, businessData);
      toast.success('Business information updated!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update business');
    }
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.error('Name and email are required');
      return;
    }

    addStaff({
      id: Date.now().toString(),
      ...newEmployee,
      is_available: true,
      created_at: new Date().toISOString(),
    });

    toast.success('Employee added successfully!');
    setNewEmployee({ name: '', email: '', phone: '', role: 'stylist', specialization: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            My Business
          </h1>
          <p className="text-text-secondary">Manage your business profile and team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Business Info, Management Links, Services */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-8">
              {/* Cover Image */}
              <div className="relative w-full h-48 bg-gradient-to-r from-primary to-secondary rounded-lg mb-6 overflow-hidden group">
                {businessData.cover_image_url ? (
                  <img
                    src={businessData.cover_image_url}
                    alt="Business"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Camera className="w-12 h-12 opacity-50" />
                  </div>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                  <Camera className="w-5 h-5 text-primary" />
                </button>
              </div>

              {/* Business Info Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Business Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Business Name</label>
                    <input
                      type="text"
                      name="name"
                      value={businessData.name}
                      onChange={handleBusinessChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Category</label>
                    <select
                      name="category"
                      value={businessData.category}
                      onChange={handleBusinessChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50"
                    >
                      <option value="salon">Salon</option>
                      <option value="barber">Barbershop</option>
                      <option value="spa">Spa</option>
                      <option value="massage">Massage</option>
                      <option value="fitness">Fitness</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea
                      name="description"
                      value={businessData.description}
                      onChange={handleBusinessChange}
                      disabled={!isEditing}
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={businessData.address}
                      onChange={handleBusinessChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={businessData.phone}
                      onChange={handleBusinessChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    onClick={handleSaveBusiness}
                    className="w-full mt-6 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Management Links */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Management
              </h3>
              <div className="space-y-2">
                <Link
                  to="/services"
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all cursor-pointer group"
                >
                  <Scissors className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Manage Services</p>
                    <p className="text-xs text-gray-500">Add/edit services</p>
                  </div>
                </Link>

                <Link
                  to="/packages"
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all cursor-pointer group"
                >
                  <Package className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Create Packages</p>
                    <p className="text-xs text-gray-500">Service combos</p>
                  </div>
                </Link>

                <Link
                  to="/sales"
                  className="flex items-center gap-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-all cursor-pointer group"
                >
                  <Tag className="w-5 h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Sales & Promotions</p>
                    <p className="text-xs text-gray-500">Special offers</p>
                  </div>
                </Link>

                <Link
                  to="/reviews"
                  className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 text-yellow-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Reviews</p>
                    <p className="text-xs text-gray-500">Customer feedback</p>
                  </div>
                </Link>

                <Link
                  to="/revenue"
                  className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all cursor-pointer group"
                >
                  <DollarSign className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-sm">Revenue Analytics</p>
                    <p className="text-xs text-gray-500">View detailed analytics</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Services Section */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Services ({services.length})
                </h3>
                <Link
                  to="/services"
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </Link>
              </div>
              {services.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No services added yet</p>
              ) : (
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.duration || '30'} min</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${service.price || '0'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Stats */}
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Team Members</h3>
              </div>
              <p className="text-3xl font-bold">{staff.length}</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">Open Hours</h3>
                </div>
                <button
                  onClick={() => setShowHoursModal(true)}
                  className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors font-medium"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-text-secondary">Click edit to manage hours</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold">Rating</h3>
              </div>
              <p className="text-2xl font-bold">4.8/5</p>
            </div>
          </div>
        </div>

        {/* Employee Management */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Team Management
          </h2>

          {/* Add Employee Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Add New Employee</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200"
              />
              <select
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200"
              >
                <option value="stylist">Stylist</option>
                <option value="barber">Barber</option>
                <option value="therapist">Therapist</option>
                <option value="manager">Manager</option>
              </select>
              <input
                type="text"
                placeholder="Specialization"
                value={newEmployee.specialization}
                onChange={(e) => setNewEmployee({ ...newEmployee, specialization: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-200 md:col-span-2"
              />
            </div>
            <button
              onClick={handleAddEmployee}
              className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Add Employee
            </button>
          </div>

          {/* Employee List */}
          <div className="space-y-3">
            <h3 className="font-semibold mb-4">Current Team ({staff.length})</h3>
            {staff.length === 0 ? (
              <p className="text-text-secondary">No employees added yet</p>
            ) : (
              staff.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold">{employee.name}</p>
                    <p className="text-sm text-text-secondary">{employee.role} • {employee.specialization}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{employee.email}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${employee.is_available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {employee.is_available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Opening Hours Modal */}
        {showHoursModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                <h2 className="text-2xl font-bold">Edit Opening Hours</h2>
                <button
                  onClick={() => setShowHoursModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {dateSpecificHours[selectedDate] ? '📌 Custom hours set for this date' : '📅 Using default weekly hours'}
                  </p>
                </div>

                {/* Hours for Selected Date */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold">Hours for {new Date(selectedDate + 'T00:00:00').toLocaleDateString()}</h3>
                  {(() => {
                    const hours = getHoursForDate(selectedDate);
                    return (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Set Hours</span>
                        <div className="flex items-center gap-4 flex-1 justify-end">
                          {!hours.closed ? (
                            <>
                              <div className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={hours.open}
                                  onChange={(e) => handleDateSpecificChange('open', e.target.value)}
                                  className="px-3 py-2 rounded border border-gray-200"
                                />
                                <span>-</span>
                                <input
                                  type="time"
                                  value={hours.close}
                                  onChange={(e) => handleDateSpecificChange('close', e.target.value)}
                                  className="px-3 py-2 rounded border border-gray-200"
                                />
                              </div>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500 font-semibold">Closed</span>
                          )}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer ml-4">
                          <input
                            type="checkbox"
                            checked={hours.closed}
                            onChange={() => handleDateSpecificChange('closed', !hours.closed)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm text-gray-600">Closed</span>
                        </label>
                      </div>
                    );
                  })()}
                </div>

                {/* Weekly Default Hours */}
                <div>
                  <h3 className="font-semibold mb-3">Default Weekly Hours</h3>
                  <div className="space-y-3">
                    {Object.entries(openingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-semibold capitalize w-20">{day}</span>
                        <div className="flex items-center gap-4 flex-1">
                          {!hours.closed ? (
                            <>
                              <div className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={hours.open}
                                  onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                                  className="px-3 py-2 rounded border border-gray-200"
                                />
                                <span>-</span>
                                <input
                                  type="time"
                                  value={hours.close}
                                  onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                                  className="px-3 py-2 rounded border border-gray-200"
                                />
                              </div>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500 font-semibold">Closed</span>
                          )}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer ml-4">
                          <input
                            type="checkbox"
                            checked={hours.closed}
                            onChange={() => handleToggleClosed(day)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm text-gray-600">Closed</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleSaveHours}
                  className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Save Hours
                </button>
                <button
                  onClick={() => setShowHoursModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
};

export default MyBusinessPage;
