import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import Navbar from '../components/Navbar';
import { TrendingUp, Calendar, Activity, Clock, Scissors, User, MoreVertical } from 'lucide-react';

const RevenueAnalyticsPage = () => {
  const { user } = useAuth();
  const { isDark } = useDarkMode();

  const topServices = [
    { name: 'Hair Cut', thisMonth: 0, lastMonth: 0 },
    { name: 'Haircut', thisMonth: 0, lastMonth: 0 },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />

      <div className={`p-6 md:p-8 max-w-7xl mx-auto`}>
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Sales & Revenue
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Last 7 days
          </p>
        </div>

        {/* Main Grid - 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Sales Card */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent sales</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last 7 days</p>
              </div>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <TrendingUp size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
              </div>
              <h4 className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>No Sales Data</h4>
              <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Make some appointments for sales data to appear
              </p>
            </div>
          </div>

          {/* Upcoming Appointments Card */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Upcoming appointments</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Next 7 days</p>
              </div>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Calendar size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
              </div>
              <h4 className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Your schedule is empty</h4>
              <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Make some appointments for schedule data to appear
              </p>
            </div>
          </div>

          {/* Appointments Activity Card */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Appointments activity</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last 7 days</p>
              </div>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Activity size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
              </div>
              <h4 className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>No recent activity</h4>
              <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Visit the calendar section to add some appointments
              </p>
            </div>
          </div>

          {/* Today's Next Appointments Card */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's next appointments</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Next 7 days</p>
              </div>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
            
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Clock size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
              </div>
              <h4 className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>No Appointments Today</h4>
              <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Visit the calendar section to add some appointments
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Services */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top services</h3>
              </div>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            {/* Table Header */}
            <div className={`grid grid-cols-3 gap-4 px-4 py-3 rounded-lg mb-3 ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <div className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Service</div>
              <div className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>This month</div>
              <div className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Last month</div>
            </div>

            {/* Table Rows */}
            {topServices.map((service, index) => (
              <div
                key={service.name}
                className={`grid grid-cols-3 gap-4 px-4 py-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{service.name}</div>
                <div className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{service.thisMonth}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{service.lastMonth}</div>
              </div>
            ))}
          </div>

          {/* Top Team Member */}
          <div className={`rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top team member</h3>
              </div>
              <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <MoreVertical size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <TrendingUp size={32} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
              </div>
              <h4 className={`font-semibold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>No sales this month</h4>
              <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Create some sales for sales data to appear
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalyticsPage;
