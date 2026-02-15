import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import type { 
  Attraction, 
  Hotel, 
  TransportRoute, 
  Restaurant,  // Aggiungi questo tipo
  ItineraryItem, 
  TripPlan,
  TripBudget,
  TimeSlot 
} from '@/types';

interface TripState {
  // Current trip
  currentTrip: TripPlan | null;
  selectedAttractions: Attraction[];
  selectedHotels: Hotel[];
  selectedTransports: TransportRoute[];
  selectedRestaurants: Restaurant[];  // AGGIUNTO
  itinerary: ItineraryItem[];
  
  // Saved trips
  savedTrips: TripPlan[];
  
  // UI State
  selectedDate: string;
  selectedTimeSlot: TimeSlot | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  selectedAttraction: Attraction | null;
  selectedCity: string | null;
  showRoute: boolean;
  
  // Budget
  budget: TripBudget;
  
  // Actions
  setCurrentTrip: (trip: TripPlan | null) => void;
  addAttraction: (attraction: Attraction) => void;
  removeAttraction: (id: string) => void;
  addHotel: (hotel: Hotel) => void;
  removeHotel: (id: string) => void;
  addTransport: (transport: TransportRoute) => void;
  removeTransport: (id: string) => void;
  addRestaurant: (restaurant: Restaurant) => void;  // AGGIUNTO
  removeRestaurant: (id: string) => void;  // AGGIUNTO
  addToItinerary: (item: Omit<ItineraryItem, 'id' | 'order'>) => void;
  removeFromItinerary: (id: string) => void;
  reorderItinerary: (items: ItineraryItem[]) => void;
  saveTrip: (name: string) => void;
  loadTrip: (id: string) => void;
  deleteTrip: (id: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  setMapCenter: (center: { lat: number; lng: number }) => void;
  setMapZoom: (zoom: number) => void;
  setSelectedAttraction: (attraction: Attraction | null) => void;
  setSelectedCity: (city: string | null) => void;
  setShowRoute: (show: boolean) => void;
  updateBudget: (budget: Partial<TripBudget>) => void;
  calculateTotalBudget: () => number;
  clearCurrentTrip: () => void;
  
  // Share
  generateShareLink: () => string;
  exportItinerary: () => string;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultBudget: TripBudget = {
  accommodation: 0,
  transport: 0,
  food: 0,
  attractions: 0,
  shopping: 0,
  other: 0,
  total: 0,
};

// Helper sicuro per estrarre prezzi
const extractPrice = (price: string | number | undefined): number => {
  if (!price) return 0;
  if (typeof price === 'number') return price;
  if (price === 'Gratis' || price === 'Free') return 0;
  const match = price.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, '')) || 0 : 0;
};

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTrip: null,
      selectedAttractions: [],
      selectedHotels: [],
      selectedTransports: [],
      selectedRestaurants: [],  // AGGIUNTO
      itinerary: [],
      savedTrips: [],
      selectedDate: new Date().toISOString().split('T')[0],
      selectedTimeSlot: null,
      mapCenter: { lat: 35.6762, lng: 139.6503 },
      mapZoom: 12,
      selectedAttraction: null,
      selectedCity: null,
      showRoute: false,
      budget: { ...defaultBudget },

      // Actions
      setCurrentTrip: (trip) => set({ currentTrip: trip }),

      addAttraction: (attraction) => {
        const { selectedAttractions, budget } = get();
        if (!selectedAttractions.find(a => a.id === attraction.id)) {
          const price = extractPrice(attraction.price);
          set({ 
            selectedAttractions: [...selectedAttractions, attraction],
            budget: {
              ...budget,
              attractions: budget.attractions + price,
            }
          });
        }
      },

      removeAttraction: (id) => {
        const { selectedAttractions, budget, itinerary } = get();
        const attraction = selectedAttractions.find(a => a.id === id);
        const price = extractPrice(attraction?.price);
        
        set({ 
          selectedAttractions: selectedAttractions.filter(a => a.id !== id),
          // FIX: Corretto il filtro - controlla item.id invece di item.item.id
          itinerary: itinerary.filter(item => {
            if (item.type !== 'attraction') return true;
            const itemId = (item.item as Attraction).id;
            return itemId !== id;
          }),
          budget: {
            ...budget,
            attractions: Math.max(0, budget.attractions - price),
          }
        });
      },

      addHotel: (hotel) => {
        const { selectedHotels, budget } = get();
        if (!selectedHotels.find(h => h.id === hotel.id)) {
          set({ 
            selectedHotels: [...selectedHotels, hotel],
            budget: {
              ...budget,
              accommodation: budget.accommodation + (hotel.pricePerNight || 0),
            }
          });
        }
      },

      removeHotel: (id) => {
        const { selectedHotels, budget, itinerary } = get();
        const hotel = selectedHotels.find(h => h.id === id);
        
        set({ 
          selectedHotels: selectedHotels.filter(h => h.id !== id),
          itinerary: itinerary.filter(item => {
            if (item.type !== 'hotel') return true;
            const itemId = (item.item as Hotel).id;
            return itemId !== id;
          }),
          budget: {
            ...budget,
            accommodation: Math.max(0, budget.accommodation - (hotel?.pricePerNight || 0)),
          }
        });
      },

      addTransport: (transport) => {
        const { selectedTransports, budget } = get();
        if (!selectedTransports.find(t => t.id === transport.id)) {
          set({ 
            selectedTransports: [...selectedTransports, transport],
            budget: {
              ...budget,
              transport: budget.transport + (transport.price || 0),
            }
          });
        }
      },

      removeTransport: (id) => {
        const { selectedTransports, budget, itinerary } = get();
        const transport = selectedTransports.find(t => t.id === id);
        
        set({ 
          selectedTransports: selectedTransports.filter(t => t.id !== id),
          itinerary: itinerary.filter(item => {
            if (item.type !== 'transport') return true;
            const itemId = (item.item as TransportRoute).id;
            return itemId !== id;
          }),
          budget: {
            ...budget,
            transport: Math.max(0, budget.transport - (transport?.price || 0)),
          }
        });
      },

      // AGGIUNTO: Gestione ristoranti
      addRestaurant: (restaurant) => {
        const { selectedRestaurants, budget } = get();
        if (!selectedRestaurants.find(r => r.id === restaurant.id)) {
          const price = extractPrice(restaurant.price);
          set({ 
            selectedRestaurants: [...selectedRestaurants, restaurant],
            budget: {
              ...budget,
              food: budget.food + price,
            }
          });
        }
      },

      removeRestaurant: (id) => {
        const { selectedRestaurants, budget, itinerary } = get();
        const restaurant = selectedRestaurants.find(r => r.id === id);
        const price = extractPrice(restaurant?.price);
        
        set({ 
          selectedRestaurants: selectedRestaurants.filter(r => r.id !== id),
          itinerary: itinerary.filter(item => {
            if (item.type !== 'restaurant') return true;
            const itemId = (item.item as Restaurant).id;
            return itemId !== id;
          }),
          budget: {
            ...budget,
            food: Math.max(0, budget.food - price),
          }
        });
      },

      addToItinerary: (item) => {
        const { itinerary } = get();
        const newItem: ItineraryItem = {
          ...item,
          id: generateId(),
          order: itinerary.length,
        };
        set({ itinerary: [...itinerary, newItem] });
      },

      removeFromItinerary: (id) => {
        set({ 
          itinerary: get().itinerary
            .filter(item => item.id !== id)
            .map((item, index) => ({ ...item, order: index }))
        });
      },

      reorderItinerary: (items) => {
        set({ 
          itinerary: items.map((item, index) => ({ ...item, order: index }))
        });
      },

      saveTrip: (name) => {
        const { itinerary, savedTrips, budget, selectedAttractions, selectedHotels, selectedTransports, selectedRestaurants } = get();
        const newTrip: TripPlan = {
          id: generateId(),
          name,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          items: itinerary,
          selectedAttractions,
          selectedHotels,
          selectedTransports,
          selectedRestaurants,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          budget,
        };
        set({ savedTrips: [...savedTrips, newTrip] });
      },

      loadTrip: (id) => {
        const trip = get().savedTrips.find(t => t.id === id);
        if (trip) {
          set({ 
            currentTrip: trip,
            itinerary: trip.items,
            selectedAttractions: trip.selectedAttractions || [],
            selectedHotels: trip.selectedHotels || [],
            selectedTransports: trip.selectedTransports || [],
            selectedRestaurants: trip.selectedRestaurants || [],
            budget: trip.budget || { ...defaultBudget },
          });
        }
      },

      deleteTrip: (id) => {
        set({ savedTrips: get().savedTrips.filter(t => t.id !== id) });
      },

      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
      setMapCenter: (center) => set({ mapCenter: center }),
      setMapZoom: (zoom) => set({ mapZoom: zoom }),
      setSelectedAttraction: (attraction) => set({ selectedAttraction: attraction }),
      setSelectedCity: (city) => set({ selectedCity: city }),
      setShowRoute: (show) => set({ showRoute: show }),

      updateBudget: (newBudget) => {
        const { budget } = get();
        const updated = { ...budget, ...newBudget };
        updated.total = updated.accommodation + updated.transport + updated.food + 
                       updated.attractions + updated.shopping + updated.other;
        set({ budget: updated });
      },

      calculateTotalBudget: () => {
        const { budget } = get();
        return budget.accommodation + budget.transport + budget.food + 
               budget.attractions + budget.shopping + budget.other;
      },

      generateShareLink: () => {
        const { itinerary, budget } = get();
        try {
          // Use Unicode-safe encoding
          const jsonString = JSON.stringify({ itinerary, budget });
          const data = encodeURIComponent(btoa(encodeURIComponent(jsonString)));
          return `${window.location.origin}?share=${data}`;
        } catch (error) {
          console.error('Error generating share link:', error);
          toast.error('Errore nella generazione del link di condivisione');
          return '';
        }
      },

      exportItinerary: () => {
        const { itinerary, budget, selectedDate } = get();
        const exportData = {
          date: selectedDate,
          items: itinerary.map(item => ({
            time: item.timeSlot,
            type: item.type,
            name: (item.item as any).name || 'Unknown',
            details: item.item,
          })),
          budget,
        };
        return JSON.stringify(exportData, null, 2);
      },

      clearCurrentTrip: () => set({
        currentTrip: null,
        selectedAttractions: [],
        selectedHotels: [],
        selectedTransports: [],
        selectedRestaurants: [],
        itinerary: [],
        selectedAttraction: null,
        selectedCity: null,
        budget: { ...defaultBudget },
      }),
    }),
    {
      name: 'japan-trip-planner',
      partialize: (state) => ({
        savedTrips: state.savedTrips,
        currentTrip: state.currentTrip,
        selectedAttractions: state.selectedAttractions,
        selectedHotels: state.selectedHotels,
        selectedTransports: state.selectedTransports,
        selectedRestaurants: state.selectedRestaurants,
        itinerary: state.itinerary,
        budget: state.budget,
      }),
    }
  )
);