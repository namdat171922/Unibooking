import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useServicesStore = create(
  devtools(
    (set, get) => ({
      services: [],
      selectedService: null,
      loading: false,
      error: null,

      setServices: (services) => set({ services }),

      setSelectedService: (service) => set({ selectedService: service }),

      addService: (service) => set((state) => ({
        services: [...state.services, service],
      })),

      updateService: (serviceId, updates) => set((state) => ({
        services: state.services.map((s) =>
          s.id === serviceId ? { ...s, ...updates } : s
        ),
        selectedService:
          state.selectedService?.id === serviceId
            ? { ...state.selectedService, ...updates }
            : state.selectedService,
      })),

      deleteService: (serviceId) => set((state) => ({
        services: state.services.filter((s) => s.id !== serviceId),
        selectedService:
          state.selectedService?.id === serviceId ? null : state.selectedService,
      })),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      reset: () => set({
        services: [],
        selectedService: null,
        loading: false,
        error: null,
      }),
    }),
    { name: 'ServicesStore' }
  )
);

export default useServicesStore;
