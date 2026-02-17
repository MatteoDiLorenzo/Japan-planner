import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Attraction, BudgetItem, DayPlan, DayActivity, Hotel } from '@/types';
import { attractions as allAttractions } from '@/data/attractions';

interface TripContextType {
  selectedAttractions: Attraction[];
  selectedHotels: Hotel[];
  dayPlans: DayPlan[];
  budgetItems: BudgetItem[];
  totalBudget: number;
  currentDayId: string | null;
  addAttraction: (attraction: Attraction) => void;
  removeAttraction: (attractionId: string) => void;
  isAttractionSelected: (attractionId: string) => boolean;
  addHotel: (hotel: Hotel) => void;
  removeHotel: (hotelId: string) => void;
  addToDay: (attractionId: string, dayId: string, startTime: string) => void;
  removeFromDay: (activityId: string, dayId: string) => void;
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  removeBudgetItem: (itemId: string) => void;
  getTotalSpent: () => number;
  getRemainingBudget: () => number;
  createDay: () => string;
  deleteDay: (dayId: string) => void;
  getAttractionDistance: (attraction1Id: string, attraction2Id: string) => number;
  getEstimatedTravelTime: (attraction1Id: string, attraction2Id: string) => number;
  getDistanceToHotel: (attractionId: string, hotelId: string) => number;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// Calcola distanza in km tra due coordinate usando la formula di Haversine
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const R = 6371; // Raggio della Terra in km
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Stima tempo di viaggio in minuti (considerando metro/treno in città)
function estimateTravelTime(distanceKm: number): number {
  // In media: 5 min a piedi per stazione + 3 min per km in metro + 5 min di attesa
  if (distanceKm < 1.5) {
    return Math.round(distanceKm * 12); // A piedi: 12 min/km
  }
  return Math.round(10 + distanceKm * 3 + 5); // Metro
}

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [totalBudget] = useState<number>(200000); // Default 200,000 JPY (~€1300)

  const addAttraction = useCallback((attraction: Attraction) => {
    setSelectedAttractions(prev => {
      if (prev.find(a => a.id === attraction.id)) return prev;
      return [...prev, attraction];
    });
    // Aggiungi automaticamente al budget
    if (attraction.price > 0) {
      addBudgetItem({
        category: 'attraction',
        description: `${attraction.name} (${attraction.nameJp})`,
        amount: attraction.price,
      });
    }
  }, []);

  const removeAttraction = useCallback((attractionId: string) => {
    setSelectedAttractions(prev => prev.filter(a => a.id !== attractionId));
    // Rimuovi anche dal budget
    setBudgetItems(prev => prev.filter(item => !item.description.includes(attractionId)));
  }, []);

  const isAttractionSelected = useCallback((attractionId: string) => {
    return selectedAttractions.some(a => a.id === attractionId);
  }, [selectedAttractions]);

  const addHotel = useCallback((hotel: Hotel) => {
    setSelectedHotels(prev => {
      if (prev.find(h => h.id === hotel.id)) return prev;
      return [...prev, hotel];
    });
    // Aggiungi automaticamente al budget (una notte)
    addBudgetItem({
      category: 'accommodation',
      description: `${hotel.name} - 1 notte`,
      amount: hotel.price,
    });
  }, []);

  const removeHotel = useCallback((hotelId: string) => {
    setSelectedHotels(prev => prev.filter(h => h.id !== hotelId));
    // Rimuovi dal budget
    setBudgetItems(prev => prev.filter(item => !item.description.includes(hotelId)));
  }, []);

  const createDay = useCallback(() => {
    const newDay: DayPlan = {
      id: `day-${Date.now()}`,
      activities: [],
    };
    setDayPlans(prev => [...prev, newDay]);
    return newDay.id;
  }, []);

  const deleteDay = useCallback((dayId: string) => {
    setDayPlans(prev => prev.filter(d => d.id !== dayId));
  }, []);

  const addToDay = useCallback((attractionId: string, dayId: string, startTime: string) => {
    const attraction = allAttractions.find(a => a.id === attractionId);
    if (!attraction) return;

    setDayPlans(prev => prev.map(day => {
      if (day.id !== dayId) return day;
      
      // Calcola endTime basato sulla durata
      const [hours, minutes] = startTime.split(':').map(Number);
      let durationHours = 1;
      if (attraction.duration.includes('30 min')) durationHours = 0.5;
      else if (attraction.duration.includes('1-2')) durationHours = 1.5;
      else if (attraction.duration.includes('2-3')) durationHours = 2.5;
      else if (attraction.duration.includes('3-4')) durationHours = 3.5;
      else if (attraction.duration.includes('2 ore')) durationHours = 2;
      else if (attraction.duration.includes('1 ora')) durationHours = 1;
      
      const endHours = Math.floor(hours + durationHours);
      const endMinutes = minutes + (durationHours % 1) * 60;
      const endTime = `${endHours.toString().padStart(2, '0')}:${Math.round(endMinutes).toString().padStart(2, '0')}`;
      
      const newActivity: DayActivity = {
        id: `activity-${Date.now()}`,
        attractionId,
        startTime,
        endTime,
        order: day.activities.length,
      };
      
      return {
        ...day,
        activities: [...day.activities, newActivity].sort((a, b) => a.startTime.localeCompare(b.startTime)),
      };
    }));
  }, []);

  const removeFromDay = useCallback((activityId: string, dayId: string) => {
    setDayPlans(prev => prev.map(day => {
      if (day.id !== dayId) return day;
      return {
        ...day,
        activities: day.activities.filter(a => a.id !== activityId),
      };
    }));
  }, []);

  const addBudgetItem = useCallback((item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: `budget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setBudgetItems(prev => [...prev, newItem]);
  }, []);

  const removeBudgetItem = useCallback((itemId: string) => {
    setBudgetItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const getTotalSpent = useCallback(() => {
    return budgetItems.reduce((sum, item) => sum + item.amount, 0);
  }, [budgetItems]);

  const getRemainingBudget = useCallback(() => {
    return totalBudget - getTotalSpent();
  }, [totalBudget, getTotalSpent]);

  const getAttractionDistance = useCallback((attraction1Id: string, attraction2Id: string): number => {
    const attr1 = allAttractions.find(a => a.id === attraction1Id);
    const attr2 = allAttractions.find(a => a.id === attraction2Id);
    if (!attr1 || !attr2) return 0;
    return calculateDistance(attr1.coordinates, attr2.coordinates);
  }, []);

  const getEstimatedTravelTime = useCallback((attraction1Id: string, attraction2Id: string): number => {
    const distance = getAttractionDistance(attraction1Id, attraction2Id);
    return estimateTravelTime(distance);
  }, [getAttractionDistance]);

  const getDistanceToHotel = useCallback((attractionId: string, hotelId: string): number => {
    const attraction = allAttractions.find(a => a.id === attractionId);
    const hotel = selectedHotels.find(h => h.id === hotelId);
    if (!attraction || !hotel) return 0;
    return calculateDistance(attraction.coordinates, hotel.coordinates);
  }, [selectedHotels]);

  const value = useMemo(() => ({
    selectedAttractions,
    selectedHotels,
    dayPlans,
    budgetItems,
    totalBudget,
    currentDayId: dayPlans.length > 0 ? dayPlans[0].id : null,
    addAttraction,
    removeAttraction,
    isAttractionSelected,
    addHotel,
    removeHotel,
    addToDay,
    removeFromDay,
    addBudgetItem,
    removeBudgetItem,
    getTotalSpent,
    getRemainingBudget,
    createDay,
    deleteDay,
    getAttractionDistance,
    getEstimatedTravelTime,
    getDistanceToHotel,
  }), [
    selectedAttractions,
    selectedHotels,
    dayPlans,
    budgetItems,
    totalBudget,
    addAttraction,
    removeAttraction,
    isAttractionSelected,
    addHotel,
    removeHotel,
    addToDay,
    removeFromDay,
    addBudgetItem,
    removeBudgetItem,
    getTotalSpent,
    getRemainingBudget,
    createDay,
    deleteDay,
    getAttractionDistance,
    getEstimatedTravelTime,
    getDistanceToHotel,
  ]);

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
