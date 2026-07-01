import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import Navbar from '../components/Navbar';
import { TrendingUp, Calendar, Users, Star, DollarSign, Zap, ChevronRight, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessDashboardPage = () => {
  const { user } = useAuth();
  const { isDark } = useDarkMode();

  // Mock data for dashboard
  const dashboardStats = {
    recentSales: { value: 0, label: 'Last 7 days', trend: 0 },
    upcomingAppointments: { value: 3, label: 'Next 7 days', trend: 2 },
    averageRating: { value: 4.8, label: 'Based on 24 reviews', trend: 0.2 },
    todayAppointments: { value: 2, label: 'Today', trend: 0 },
  };

  const Card = ({ title, children, actions }) => (
    <div className={`rounded-2xl p-6 border transition-all ${isDark ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        {actions && (
          <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <MoreVertical className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );

  const EmptyState = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center ${
        isDark
          ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30'
          : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'
      }`}>
        <Icon className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
      </div>
      <h4 className={`font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{title}</h4>
      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{description}</p>
    </div>
  );

  const StatCard = ({ icon: Icon, label, value, subtext, trend }) => (
    <div className={`rounded-xl p-5 border transition-all ${isDark ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${
          isDark
            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
            : 'bg-gradient-to-br from-purple-100 to-pink-100'
        }`}>
          <Icon className={`w-6 h-6 ${isDark ? 'text-secondary' : 'text-primary'}`} />
        </div>
        {trend > 0 && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            +{trend}
          </div>
        )}
      </div>
      <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{subtext}</p>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Hero Section */}
        <div className={`mb-8 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top duration-700 ${
          isDark
            ? 'bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-700'
            : 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border border-purple-200'
        }`}>
          <div className="px-8 py-12 md:py-16 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Welcome to StyleMatch Business Dashboard
            </h1>
            <p className="text-lg opacity-90 mb-6 max-w-2xl">
              Your beauty business management hub. Track appointments, services, and grow your revenue all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transition-all">
                Manage Services
              </Link>
              <Link to="/my-business" className="px-6 py-3 bg-white bg-opacity-20 text-white font-semibold rounded-lg hover:bg-opacity-30 transition-all border border-white border-opacity-40">
                Business Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-700">
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
            Dashboard Overview
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Here's your business overview at a glance.</p>
        </div>

        {/* Top Stats - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <StatCard icon={DollarSign} label="Recent Sales" value="0" subtext="Last 7 days" trend={0} />
          <StatCard icon={Calendar} label="Upcoming Appointments" value="3" subtext="Next 7 days" trend={2} />
          <StatCard icon={Star} label="Average Rating" value="4.8" subtext="Based on 24 reviews" trend={0.2} />
          <StatCard icon={Users} label="Appointments Today" value="2" subtext="Upcoming today" trend={0} />
        </div>

        {/* Main Content - 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          {/* Left Column - 2 Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Sales */}
            <Card title="Recent Sales" actions>
              <EmptyState
                icon={DollarSign}
                title="No Sales Data"
                description="Make some appointments for sales data to appear"
              />
            </Card>

            {/* Upcoming Appointments */}
            <Card title="Upcoming Appointments" actions>
              <div className="space-y-3">
                {[
                  { client: 'Sarah Johnson', service: 'Hair Cut', time: '2:00 PM Today', duration: '45 min' },
                  { client: 'Mike Smith', service: 'Beard Trim', time: '3:30 PM Today', duration: '30 min' },
                  { client: 'Emma Davis', service: 'Coloring', time: '4:15 PM Today', duration: '90 min' },
                ].map((apt, idx) => (
                  <div key={idx} className={`flex items-start justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.client}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{apt.service}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.time}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{apt.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/my-business" className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${isDark ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Top Services */}
            <Card title="Top Services">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Service</th>
                      <th className={`text-right py-3 px-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>This Month</th>
                      <th className={`text-right py-3 px-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Hair Cut', thisMonth: 12, lastMonth: 8 },
                      { name: 'Beard Trim', thisMonth: 8, lastMonth: 6 },
                    ].map((service, idx) => (
                      <tr key={idx} className={`border-b ${isDark ? 'border-gray-700/50 hover:bg-gray-700/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                        <td className={`py-3 px-3 font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{service.name}</td>
                        <td className={`text-right py-3 px-3 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.thisMonth}</td>
                        <td className={`text-right py-3 px-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.lastMonth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Appointments Activity */}
            <Card title="Appointments Activity">
              <EmptyState
                icon={Calendar}
                title="No Recent Activity"
                description="Your appointment activity will show here"
              />
            </Card>

            {/* Today's Next Appointments */}
            <Card title="Today's Next">
              <div className="space-y-2">
                {[
                  { time: '2:00 PM', name: 'Sarah Johnson' },
                  { time: '3:30 PM', name: 'Mike Smith' },
                ].map((apt, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{apt.time}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{apt.name}</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Team Member */}
            <Card title="Top Team Member">
              <EmptyState
                icon={Users}
                title="No Team Data"
                description="Add team members to track performance"
              />
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Link to="/services" className={`block p-4 rounded-xl border transition-all font-medium ${isDark ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800 text-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}>
                <div className="flex items-center justify-between">
                  Manage Services
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
              <Link to="/my-business" className={`block p-4 rounded-xl border transition-all font-medium ${isDark ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800 text-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-900'}`}>
                <div className="flex items-center justify-between">
                  Business Settings
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardPage;
