export interface Attraction {
  id: string;
  name: string;
  nameJp: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
  category: 'temple' | 'nature' | 'food' | 'shopping' | 'culture' | 'park' | 'museum' | 'entertainment';
  image: string;
  address: string;
  openingHours?: string;
  price?: string;
  rating: number;
  reviews: number;
  city: 'tokyo' | 'kyoto' | 'osaka' | 'nara' | 'hiroshima' | 'kanazawa' | 'hakone' | 'nikko' | 'kobe' | 'fukuoka' | 'sapporo' | 'okinawa';
  duration?: string; // tempo stimato di visita
}

export interface Hotel {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  pricePerNight: number;
  rating: number;
  image: string;
  amenities: string[];
  city: string;
  bookingUrl?: string;
}

export type TransportType = 'shinkansen' | 'jr' | 'subway' | 'bus' | 'bus-night' | 'local-train' | 'express' | 'walk';

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  line: string;
  type: TransportType;
  operator?: string;
  frequency?: string; // ogni quanto passa
  notes?: string;
}

export interface DistanceInfo {
  from: Attraction;
  to: Attraction;
  distance: number; // in km
  duration: string;
  walkingTime?: string;
  transportOptions: TransportRoute[];
  recommendedRoute?: TransportRoute;
}

export interface ItineraryItem {
  id: string;
  type: 'attraction' | 'hotel' | 'transport' | 'restaurant';
  item: Attraction | Hotel | TransportRoute | Restaurant;
  date: string;
  timeSlot: 'morning' | 'afternoon' | 'evening' | 'night';
  order: number;
  notes?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  nameJp: string;
  position: {
    lat: number;
    lng: number;
  };
  category: string;
  priceRange: string;
  rating: number;
  image: string;
  address: string;
  city: string;
}

export interface TripPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  items: ItineraryItem[];
  createdAt: string;
  updatedAt: string;
  budget?: TripBudget;
}

export interface TripBudget {
  accommodation: number;
  transport: number;
  food: number;
  attractions: number;
  shopping: number;
  other: number;
  total: number;
}

export interface WeatherInfo {
  city: string;
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
}

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export const TIME_SLOTS: { value: TimeSlot; label: string; time: string }[] = [
  { value: 'morning', label: 'Mattina', time: '09:00 - 12:00' },
  { value: 'afternoon', label: 'Pomeriggio', time: '12:00 - 15:00' },
  { value: 'evening', label: 'Sera', time: '15:00 - 18:00' },
  { value: 'night', label: 'Notte', time: '18:00 - 21:00' },
];

export const CITIES = [
  { id: 'tokyo', name: 'Tokyo', nameJp: '東京', region: 'Kanto' },
  { id: 'kyoto', name: 'Kyoto', nameJp: '京都', region: 'Kansai' },
  { id: 'osaka', name: 'Osaka', nameJp: '大阪', region: 'Kansai' },
  { id: 'nara', name: 'Nara', nameJp: '奈良', region: 'Kansai' },
  { id: 'hiroshima', name: 'Hiroshima', nameJp: '広島', region: 'Chugoku' },
  { id: 'kanazawa', name: 'Kanazawa', nameJp: '金沢', region: 'Chubu' },
  { id: 'hakone', name: 'Hakone', nameJp: '箱根', region: 'Kanto' },
  { id: 'nikko', name: 'Nikko', nameJp: '日光', region: 'Kanto' },
  { id: 'kobe', name: 'Kobe', nameJp: '神戸', region: 'Kansai' },
  { id: 'fukuoka', name: 'Fukuoka', nameJp: '福岡', region: 'Kyushu' },
  { id: 'sapporo', name: 'Sapporo', nameJp: '札幌', region: 'Hokkaido' },
  { id: 'okinawa', name: 'Okinawa', nameJp: '沖縄', region: 'Okinawa' },
] as const;

export const TRANSPORT_TYPES: Record<TransportType, { label: string; color: string; icon: string }> = {
  'shinkansen': { label: 'Shinkansen', color: '#FF4B4B', icon: 'zap' },
  'jr': { label: 'JR Line', color: '#4CAF50', icon: 'train' },
  'subway': { label: 'Metro', color: '#2196F3', icon: 'subway' },
  'bus': { label: 'Bus', color: '#FF9800', icon: 'bus' },
  'bus-night': { label: 'Bus Notturno', color: '#9C27B0', icon: 'moon' },
  'local-train': { label: 'Treno Locale', color: '#795548', icon: 'train-front' },
  'express': { label: 'Espresso', color: '#E91E63', icon: 'fast-forward' },
  'walk': { label: 'A Piedi', color: '#4ECDC4', icon: 'footprints' },
};
