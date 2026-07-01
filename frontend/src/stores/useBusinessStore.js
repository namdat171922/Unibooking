import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useBusinessStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        businesses: [],
        currentBusiness: null,
        loading: false,
        error: null,

        // Actions
        setBusinesses: (businesses) => set({ businesses }),
        
        setCurrentBusiness: (business) => set({ currentBusiness: business }),
        
        addBusiness: (business) => set((state) => ({
          businesses: [...state.businesses, business],
        })),
        
        updateBusiness: (businessId, updates) => set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === businessId ? { ...b, ...updates } : b
          ),
          currentBusiness:
            state.currentBusiness?.id === businessId
              ? { ...state.currentBusiness, ...updates }
              : state.currentBusiness,
        })),
        
        deleteBusiness: (businessId) => set((state) => ({
          businesses: state.businesses.filter((b) => b.id !== businessId),
          currentBusiness:
            state.currentBusiness?.id === businessId ? null : state.currentBusiness,
        })),
        
        setLoading: (loading) => set({ loading }),
        
        setError: (error) => set({ error }),
        
        clearError: () => set({ error: null }),
        
        reset: () => set({
          businesses: [],
          currentBusiness: null,
          loading: false,
          error: null,
        }),
      }),
      {
        name: 'business-storage',
        partialize: (state) => ({
          currentBusiness: state.currentBusiness,
        }),
      }
    ),
    { name: 'BusinessStore' }
  )
);

export default useBusinessStore;
