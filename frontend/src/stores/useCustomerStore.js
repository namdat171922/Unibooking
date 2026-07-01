import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useCustomerStore = create(
  devtools(
    (set, get) => ({
      // State
      customers: [],
      selectedCustomer: null,
      searchQuery: '',
      sortBy: 'name', // name, recent, bookings
      loading: false,
      error: null,

      // Actions
      setCustomers: (customers) => set({ customers }),
      
      setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
      
      addCustomer: (customer) => set((state) => ({
        customers: [...state.customers, customer],
      })),
      
      updateCustomer: (customerId, updates) => set((state) => ({
        customers: state.customers.map((c) =>
          c.id === customerId ? { ...c, ...updates } : c
        ),
        selectedCustomer:
          state.selectedCustomer?.id === customerId
            ? { ...state.selectedCustomer, ...updates }
            : state.selectedCustomer,
      })),
      
      deleteCustomer: (customerId) => set((state) => ({
        customers: state.customers.filter((c) => c.id !== customerId),
        selectedCustomer:
          state.selectedCustomer?.id === customerId ? null : state.selectedCustomer,
      })),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSortBy: (sortBy) => set({ sortBy }),
      
      // Computed/Derived data
      getFilteredCustomers: () => {
        const { customers, searchQuery, sortBy } = get();
        
        let filtered = customers;
        
        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = customers.filter(
            (c) =>
              c.name?.toLowerCase().includes(query) ||
              c.email?.toLowerCase().includes(query) ||
              c.phone?.includes(query)
          );
        }
        
        // Sort
        const sorted = [...filtered].sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return (a.name || '').localeCompare(b.name || '');
            case 'recent':
              return new Date(b.last_visit || 0) - new Date(a.last_visit || 0);
            case 'bookings':
              return (b.total_bookings || 0) - (a.total_bookings || 0);
            default:
              return 0;
          }
        });
        
        return sorted;
      },
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      reset: () => set({
        customers: [],
        selectedCustomer: null,
        searchQuery: '',
        sortBy: 'name',
        loading: false,
        error: null,
      }),
    }),
    { name: 'CustomerStore' }
  )
);

export default useCustomerStore;
