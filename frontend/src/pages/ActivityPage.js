import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Calendar, MapPin, Clock, User } from 'lucide-react';

const ActivityPage = () => {
  const { user } = useAuth();
  const [activities] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Hair Cut Appointment',
      business: 'Modern Hair Salon',
      date: '2024-06-25',
      time: '10:00 AM',
      status: 'confirmed',
      icon: '✂️',
    },
    {
      id: 2,
      type: 'review',
      title: 'Left a review',
      business: 'Premium Spa Center',
      date: '2024-06-20',
      time: '3:45 PM',
      status: 'completed',
      icon: '⭐',
    },
    {
      id: 3,
      type: 'favorite',
      title: 'Added to favorites',
      business: 'Elite Barbershop',
      date: '2024-06-18',
      time: '2:30 PM',
      status: 'completed',
      icon: '❤️',
    },
    {
      id: 4,
      type: 'booking',
      title: 'Massage Session',
      business: 'Wellness Spa',
      date: '2024-06-15',
      time: '6:00 PM',
      status: 'completed',
      icon: '💆',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Activity History
          </h1>
          <p className="text-text-secondary">Your recent bookings and interactions</p>
        </div>

        <div className="card p-8">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0">
                <div className="text-3xl">{activity.icon}</div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <MapPin className="w-4 h-4" />
                      {activity.business}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Calendar className="w-4 h-4" />
                      {activity.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                  </div>

                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.status)}`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
