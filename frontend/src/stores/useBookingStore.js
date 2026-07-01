import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useBookingStore = create(
  devtools(
    (set, get) => ({
      // State
      bookings: [],
      selectedBooking: null,
      filters: {
        status: 'all', // all, pending, confirmed, completed, cancelled
        dateRange: null,
        searchQuery: '',
      },
      loading: false,
      error: null,

      // Actions
      setBookings: (bookings) => set({ bookings }),
      
      setSelectedBooking: (booking) => set({ selectedBooking: booking }),
      
      addBooking: (booking) => set((state) => ({
        bookings: [booking, ...state.bookings],
      })),
      
      updateBooking: (bookingId, updates) => set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? { ...b, ...updates } : b
        ),
        selectedBooking:
          state.selectedBooking?.id === bookingId
            ? { ...state.selectedBooking, ...updates }
            : state.selectedBooking,
      })),
      
      deleteBooking: (bookingId) => set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== bookingId),
        selectedBooking:
          state.selectedBooking?.id === bookingId ? null : state.selectedBooking,
      })),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters },
      })),
      
      clearFilters: () => set({
        filters: {
          status: 'all',
          dateRange: null,
          searchQuery: '',
        },
      }),
      
      // Computed/Derived data
      getFilteredBookings: () => {
        const { bookings, filters } = get();
        return bookings.filter((booking) => {
          // Filter by status
          if (filters.status !== 'all' && booking.status !== filters.status) {
            return false;
          }
          
          // Filter by search query
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            return (
              booking.customer_name?.toLowerCase().includes(query) ||
              booking.service_name?.toLowerCase().includes(query)
            );
          }
          
          return true;
        });
      },
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      reset: () => set({
        bookings: [],
        selectedBooking: null,
        filters: {
          status: 'all',
          dateRange: null,
          searchQuery: '',
        },
        loading: false,
        error: null,
      }),
    }),
    { name: 'BookingStore' }
  )
);

export default useBookingStore;
