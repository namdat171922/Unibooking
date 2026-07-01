import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useCalendarStore = create(
  devtools(
    (set, get) => ({
      // State
      selectedDate: new Date(),
      view: 'month', // day, week, month
      events: [],
      selectedEvent: null,
      loading: false,
      error: null,

      // Actions
      setSelectedDate: (date) => set({ selectedDate: date }),
      
      setView: (view) => set({ view }),
      
      setEvents: (events) => set({ events }),
      
      setSelectedEvent: (event) => set({ selectedEvent: event }),
      
      addEvent: (event) => set((state) => ({
        events: [...state.events, event],
      })),
      
      updateEvent: (eventId, updates) => set((state) => ({
        events: state.events.map((e) =>
          e.id === eventId ? { ...e, ...updates } : e
        ),
        selectedEvent:
          state.selectedEvent?.id === eventId
            ? { ...state.selectedEvent, ...updates }
            : state.selectedEvent,
      })),
      
      deleteEvent: (eventId) => set((state) => ({
        events: state.events.filter((e) => e.id !== eventId),
        selectedEvent:
          state.selectedEvent?.id === eventId ? null : state.selectedEvent,
      })),
      
      // Helper to get events for a specific date range
      getEventsInRange: (startDate, endDate) => {
        const { events } = get();
        return events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= startDate && eventDate <= endDate;
        });
      },
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      reset: () => set({
        selectedDate: new Date(),
        view: 'month',
        events: [],
        selectedEvent: null,
        loading: false,
        error: null,
      }),
    }),
    { name: 'CalendarStore' }
  )
);

export default useCalendarStore;
