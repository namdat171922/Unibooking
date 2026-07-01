import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useDashboardStore = create(
  devtools(
    (set, get) => ({
      // State
      stats: {
        totalRevenue: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
        activeCustomers: 0,
        newCustomers: 0,
      },
      revenueData: [], // For charts
      bookingsData: [], // For charts
      upcomingAppointments: [],
      recentActivity: [],
      dateRange: 'week', // week, month, year
      loading: false,
      error: null,

      // Actions
      setStats: (stats) => set({ stats }),
      
      updateStats: (updates) => set((state) => ({
        stats: { ...state.stats, ...updates },
      })),
      
      setRevenueData: (data) => set({ revenueData: data }),
      
      setBookingsData: (data) => set({ bookingsData: data }),
      
      setUpcomingAppointments: (appointments) => set({ upcomingAppointments: appointments }),
      
      setRecentActivity: (activity) => set({ recentActivity: activity }),
      
      setDateRange: (range) => set({ dateRange: range }),
      
      // Computed values
      getRevenueGrowth: () => {
        const { revenueData } = get();
        if (revenueData.length < 2) return 0;
        
        const current = revenueData[revenueData.length - 1]?.value || 0;
        const previous = revenueData[revenueData.length - 2]?.value || 0;
        
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
      },
      
      getBookingsGrowth: () => {
        const { bookingsData } = get();
        if (bookingsData.length < 2) return 0;
        
        const current = bookingsData[bookingsData.length - 1]?.value || 0;
        const previous = bookingsData[bookingsData.length - 2]?.value || 0;
        
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
      },
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      reset: () => set({
        stats: {
          totalRevenue: 0,
          totalBookings: 0,
          pendingBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          activeCustomers: 0,
          newCustomers: 0,
        },
        revenueData: [],
        bookingsData: [],
        upcomingAppointments: [],
        recentActivity: [],
        dateRange: 'week',
        loading: false,
        error: null,
      }),
    }),
    { name: 'DashboardStore' }
  )
);

export default useDashboardStore;
