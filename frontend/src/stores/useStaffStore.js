import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStaffStore = create(
  devtools(
    (set, get) => ({
      // State
      staff: [],
      selectedStaff: null,
      filters: {
        role: 'all', // all, stylist, barber, therapist, etc.
        availability: 'all', // all, available, busy
        searchQuery: '',
      },
      loading: false,
      error: null,

      // Actions
      setStaff: (staff) => set({ staff }),
      
      setSelectedStaff: (staffMember) => set({ selectedStaff: staffMember }),
      
      addStaff: (staffMember) => set((state) => ({
        staff: [...state.staff, staffMember],
      })),
      
      updateStaff: (staffId, updates) => set((state) => ({
        staff: state.staff.map((s) =>
          s.id === staffId ? { ...s, ...updates } : s
        ),
        selectedStaff:
          state.selectedStaff?.id === staffId
            ? { ...state.selectedStaff, ...updates }
            : state.selectedStaff,
      })),
      
      deleteStaff: (staffId) => set((state) => ({
        staff: state.staff.filter((s) => s.id !== staffId),
        selectedStaff:
          state.selectedStaff?.id === staffId ? null : state.selectedStaff,
      })),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters },
      })),
      
      clearFilters: () => set({
        filters: {
          role: 'all',
          availability: 'all',
          searchQuery: '',
        },
      }),
      
      // Computed/Derived data
      getFilteredStaff: () => {
        const { staff, filters } = get();
        return staff.filter((member) => {
          // Filter by role
          if (filters.role !== 'all' && member.role !== filters.role) {
            return false;
          }
          
          // Filter by availability
          if (filters.availability !== 'all') {
            const isAvailable = member.is_available || false;
            if (filters.availability === 'available' && !isAvailable) return false;
            if (filters.availability === 'busy' && isAvailable) return false;
          }
          
          // Filter by search query
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            return (
              member.name?.toLowerCase().includes(query) ||
              member.email?.toLowerCase().includes(query) ||
              member.specialization?.toLowerCase().includes(query)
            );
          }
          
          return true;
        });
      },
      
      getAvailableStaff: () => {
        const { staff } = get();
        return staff.filter((s) => s.is_available === true);
      },
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      reset: () => set({
        staff: [],
        selectedStaff: null,
        filters: {
          role: 'all',
          availability: 'all',
          searchQuery: '',
        },
        loading: false,
        error: null,
      }),
    }),
    { name: 'StaffStore' }
  )
);

export default useStaffStore;
