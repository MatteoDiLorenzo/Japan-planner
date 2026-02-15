import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Train, 
  Hotel, 
  Utensils, 
  GripVertical,
  X,
  Plus,
  Save,
  ChevronDown,
  ChevronUp,
  Navigation,
  Bus,
  Moon,
  Footprints,
  ExternalLink,
  Search,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTripStore } from '@/store/tripStore';
import { allAttractions, hotels, transportRoutes, restaurants, getTransportOptions, calculateDistance } from '@/data/attractions';
import type { ItineraryItem, TimeSlot, Attraction, TransportRoute } from '@/types';
import { TIME_SLOTS } from '@/types';
import { toast } from 'sonner';

export function ItineraryBuilder() {
  const [draggedItem, setDraggedItem] = useState<ItineraryItem | null>(null);
  const [expandedSlots, setExpandedSlots] = useState<Record<string, boolean>>({
    morning: true,
    afternoon: true,
    evening: true,
    night: true,
  });
  const [tripName, setTripName] = useState('');
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'attractions' | 'hotels' | 'transports' | 'restaurants'>('attractions');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [transportDialog, setTransportDialog] = useState<{ open: boolean; from: Attraction | null; to: Attraction | null; options: TransportRoute[] }>(
    { open: false, from: null, to: null, options: [] }
  );
  const [bookingSearchOpen, setBookingSearchOpen] = useState(false);
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');
  
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const {
    itinerary,
    addToItinerary,
    removeFromItinerary,
    reorderItinerary,
    saveTrip,
    selectedDate,
    setSelectedDate,
    addTransport,
  } = useTripStore();

  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll('.timeline-slot'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const handleDragStart = (item: ItineraryItem) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (timeSlot: TimeSlot) => {
    if (draggedItem) {
      const updatedItems = itinerary.map((item) =>
        item.id === draggedItem.id ? { ...item, timeSlot } : item
      );
      reorderItinerary(updatedItems);
      toast.success(`Spostato in ${TIME_SLOTS.find((t) => t.value === timeSlot)?.label}`);
    }
  };

  const handleAddItem = (type: ItineraryItem['type'], item: any) => {
    addToItinerary({
      type,
      item,
      date: selectedDate,
      timeSlot: 'morning',
    });
    toast.success(`${item.name} aggiunto all'itinerario!`);
  };

  const handleSaveTrip = () => {
    if (tripName.trim()) {
      saveTrip(tripName);
      setTripName('');
      setIsSaveDialogOpen(false);
      toast.success('Viaggio salvato con successo!');
    }
  };

  const getItemsByTimeSlot = (timeSlot: TimeSlot) => {
    return itinerary
      .filter((item) => item.timeSlot === timeSlot)
      .sort((a, b) => a.order - b.order);
  };

  const getItemIcon = (type: ItineraryItem['type']) => {
    switch (type) {
      case 'attraction':
        return <MapPin size={16} className="text-[#FF4B4B]" />;
      case 'hotel':
        return <Hotel size={16} className="text-[#4ECDC4]" />;
      case 'transport':
        return <Train size={16} className="text-[#FFCA28]" />;
      case 'restaurant':
        return <Utensils size={16} className="text-[#9C27B0]" />;
      default:
        return <MapPin size={16} />;
    }
  };

  const toggleSlot = (slot: string) => {
    setExpandedSlots((prev) => ({ ...prev, [slot]: !prev[slot] }));
  };

  // Check for consecutive attractions and suggest transport
  const checkConsecutiveAttractions = () => {
    const attractions = itinerary.filter(i => i.type === 'attraction');
    
    for (let i = 0; i < attractions.length - 1; i++) {
      const current = attractions[i];
      const next = attractions[i + 1];
      
      const from = current.item as Attraction;
      const to = next.item as Attraction;
      
      const distance = calculateDistance(
        from.position.lat, from.position.lng,
        to.position.lat, to.position.lng
      );
      
      // If distance > 2km, suggest transport
      if (distance > 2) {
        const options = getTransportOptions(from, to);
        if (options.length > 0) {
          setTransportDialog({
            open: true,
            from,
            to,
            options,
          });
          break;
        }
      }
    }
  };

  const handleAddTransport = (transport: TransportRoute) => {
    addToItinerary({
      type: 'transport',
      item: transport,
      date: selectedDate,
      timeSlot: 'morning',
    });
    addTransport(transport);
    setTransportDialog({ open: false, from: null, to: null, options: [] });
    toast.success(`${transport.line} aggiunto!`);
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'shinkansen': return <Train size={14} className="text-[#FF4B4B]" />;
      case 'jr': return <Train size={14} className="text-[#4CAF50]" />;
      case 'bus': return <Bus size={14} className="text-[#FF9800]" />;
      case 'bus-night': return <Moon size={14} className="text-[#9C27B0]" />;
      case 'walk': return <Footprints size={14} className="text-[#4ECDC4]" />;
      default: return <Train size={14} />;
    }
  };

  // Filter items by city
  const filteredAttractions = selectedCity 
    ? allAttractions.filter(a => a.city === selectedCity)
    : allAttractions;
  
  const filteredHotels = selectedCity
    ? hotels.filter(h => h.city === selectedCity)
    : hotels;
  
  const filteredRestaurants = selectedCity
    ? restaurants.filter(r => r.city === selectedCity)
    : restaurants;

  const cities = [
    { id: 'tokyo', name: 'Tokyo' },
    { id: 'kyoto', name: 'Kyoto' },
    { id: 'osaka', name: 'Osaka' },
    { id: 'nara', name: 'Nara' },
    { id: 'hiroshima', name: 'Hiroshima' },
    { id: 'kanazawa', name: 'Kanazawa' },
    { id: 'hakone', name: 'Hakone' },
    { id: 'nikko', name: 'Nikko' },
    { id: 'kobe', name: 'Kobe' },
    { id: 'fukuoka', name: 'Fukuoka' },
    { id: 'sapporo', name: 'Sapporo' },
    { id: 'okinawa', name: 'Okinawa' },
  ];

  // Safe getter for item name
  const getItemName = (item: any): string => {
    if (!item) return 'Unknown';
    if (typeof item.name === 'string') return item.name;
    if (item.item && typeof item.item.name === 'string') return item.item.name;
    return 'Unknown';
  };

  // Safe getter for item address
  const getItemAddress = (item: any): string => {
    if (!item) return 'N/A';
    if (typeof item.address === 'string') return item.address.split(',')[0];
    if (item.fromStation && typeof item.fromStation === 'string') return item.fromStation;
    return 'N/A';
  };

  // Calculate distance between two consecutive items
  const getDistanceBetweenItems = (item1: ItineraryItem, item2: ItineraryItem): string | null => {
    if (!item1?.item || !item2?.item) return null;
    
    const pos1 = (item1.item as any).position;
    const pos2 = (item2.item as any).position;
    
    if (!pos1?.lat || !pos1?.lng || !pos2?.lat || !pos2?.lng) return null;
    
    const distance = calculateDistance(pos1.lat, pos1.lng, pos2.lat, pos2.lng);
    return distance.toFixed(1);
  };

  // Get all items sorted by order
  const getAllItemsSorted = () => {
    return [...itinerary].sort((a, b) => a.order - b.order);
  };

  // Open Booking.com search
  const openBookingSearch = () => {
    const city = selectedCity || 'tokyo';
    const query = bookingSearchQuery || city;
    const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}&checkin=&checkout=&group_adults=2&no_rooms=1&group_children=0`;
    window.open(url, '_blank');
    setBookingSearchOpen(false);
    setBookingSearchQuery('');
  };

  return (
    <section id="itinerary" className="section bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D2D2D]">
                Costruisci il tuo giorno
              </h2>
              <p className="text-gray-500">
                Trascina gli elementi per organizzare il tuo itinerario
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <Button 
              variant="outline" 
              onClick={checkConsecutiveAttractions}
              className="flex items-center gap-2"
            >
              <Navigation size={16} />
              Trova Trasporti
            </Button>
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary flex items-center gap-2">
                  <Save size={18} />
                  Salva
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Salva il tuo viaggio</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    placeholder="Nome del viaggio..."
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                  />
                  <Button onClick={handleSaveTrip} className="w-full btn-primary">
                    Salva Viaggio
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2" ref={timelineRef}>
            <div className="bg-[#F5F5F5] rounded-2xl p-6">
              <div className="space-y-4">
                {TIME_SLOTS.map((slot) => {
                  const items = getItemsByTimeSlot(slot.value);
                  const isExpanded = expandedSlots[slot.value];

                  return (
                    <div
                      key={slot.value}
                      className="timeline-slot"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(slot.value)}
                    >
                      <div
                        className={`bg-white rounded-xl overflow-hidden transition-all ${
                          draggedItem ? 'ring-2 ring-[#4ECDC4] ring-opacity-50' : ''
                        }`}
                      >
                        {/* Slot Header */}
                        <button
                          onClick={() => toggleSlot(slot.value)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#4ECDC4]/10 rounded-lg flex items-center justify-center">
                              <Clock size={18} className="text-[#4ECDC4]" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold">{slot.label}</h4>
                              <p className="text-sm text-gray-500">{slot.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">
                              {items.length} attività
                            </span>
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-gray-400" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-400" />
                            )}
                          </div>
                        </button>

                        {/* Slot Content */}
                        {isExpanded && (
                          <div className="px-4 pb-4">
                            {items.length === 0 ? (
                              <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                                <Plus size={24} className="mx-auto mb-2" />
                                <p className="text-sm">
                                  Trascina qui o aggiungi un'attività
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {items.map((item, index) => {
                                  // Get all items sorted to calculate distance
                                  const allItems = getAllItemsSorted();
                                  const currentIndex = allItems.findIndex(i => i.id === item.id);
                                  const nextItem = currentIndex >= 0 && currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;
                                  const distance = nextItem ? getDistanceBetweenItems(item, nextItem) : null;
                                  
                                  return (
                                    <div key={item.id}>
                                      <div
                                        draggable
                                        onDragStart={() => handleDragStart(item)}
                                        onDragEnd={handleDragEnd}
                                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 cursor-move hover:bg-gray-100 transition-colors"
                                      >
                                        <GripVertical size={18} className="text-gray-400" />
                                        <span className="text-sm text-gray-400 w-6">{index + 1}</span>
                                        {getItemIcon(item.type)}
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-sm truncate">
                                            {getItemName(item.item)}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {getItemAddress(item.item)}
                                          </p>
                                        </div>
                                        {item.type === 'transport' && item.item && (
                                          <span className="text-xs text-[#FFCA28] font-medium">
                                            ¥{(item.item as TransportRoute).price?.toLocaleString() || 0}
                                          </span>
                                        )}
                                        <button
                                          onClick={() => removeFromItinerary(item.id)}
                                          className="text-gray-400 hover:text-[#FF4B4B] transition-colors"
                                        >
                                          <X size={16} />
                                        </button>
                                      </div>
                                      {/* Distance indicator */}
                                      {distance && nextItem && (
                                        <div className="flex items-center justify-center py-1">
                                          <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                            <ArrowRight size={10} />
                                            <span>{distance} km</span>
                                            <span className="text-gray-300">|</span>
                                            <span>{Math.round(parseFloat(distance) * 12)} min a piedi</span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            {itinerary.length > 0 && (
              <div className="mt-6 bg-[#FF4B4B]/5 rounded-xl p-4">
                <h4 className="font-bold mb-3">Riepilogo giornata</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FF4B4B]">
                      {itinerary.filter((i) => i.type === 'attraction').length}
                    </p>
                    <p className="text-sm text-gray-500">Attrazioni</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#4ECDC4]">
                      {itinerary.filter((i) => i.type === 'hotel').length}
                    </p>
                    <p className="text-sm text-gray-500">Hotel</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FFCA28]">
                      {itinerary.filter((i) => i.type === 'transport').length}
                    </p>
                    <p className="text-sm text-gray-500">Treni</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#9C27B0]">
                      {itinerary.filter((i) => i.type === 'restaurant').length}
                    </p>
                    <p className="text-sm text-gray-500">Ristoranti</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Available Items */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 h-full">
              {/* City Filter */}
              <div className="mb-4">
                <select
                  value={selectedCity || ''}
                  onChange={(e) => setSelectedCity(e.target.value || null)}
                  className="w-full p-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="">Tutte le città</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {[
                  { key: 'attractions', label: 'Attrazioni', icon: MapPin },
                  { key: 'hotels', label: 'Hotel', icon: Hotel },
                  { key: 'transports', label: 'Treni', icon: Train },
                  { key: 'restaurants', label: 'Ristoranti', icon: Utensils },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.key
                        ? 'bg-[#FF4B4B] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <ScrollArea className="h-[500px] -mx-2 px-2">
                <div className="space-y-3">
                  {activeTab === 'attractions' &&
                    filteredAttractions.map((attraction) => (
                      <div
                        key={attraction.id}
                        className="bg-white rounded-xl p-3 shadow-sm card-hover"
                      >
                        <div className="flex gap-3">
                          <img
                            src={attraction.image}
                            alt={attraction.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{attraction.name}</h4>
                            <p className="text-xs text-gray-500">{attraction.city}</p>
                            <p className="text-xs text-gray-400">{attraction.duration}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAddItem('attraction', attraction)}
                              className="mt-1 h-7 text-xs"
                            >
                              <Plus size={12} className="mr-1" />
                              Aggiungi
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {activeTab === 'hotels' && (
                    <>
                      {/* Booking.com Search Button */}
                      <div className="bg-gradient-to-r from-[#003580] to-[#0055a4] rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Hotel size={20} className="text-white" />
                          <span className="text-white font-medium text-sm">Cerca su Booking.com</span>
                        </div>
                        <p className="text-white/80 text-xs mb-3">
                          Trova più opzioni di alloggio
                        </p>
                        <Button
                          size="sm"
                          onClick={() => setBookingSearchOpen(true)}
                          className="w-full bg-white text-[#003580] hover:bg-white/90 text-xs"
                        >
                          <Search size={14} className="mr-1" />
                          Cerca Hotel
                        </Button>
                      </div>
                      
                      {filteredHotels.map((hotel) => (
                        <div
                          key={hotel.id}
                          className="bg-white rounded-xl p-3 shadow-sm card-hover"
                        >
                          <div className="flex gap-3">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{hotel.name}</h4>
                              <p className="text-xs text-gray-500">
                                ¥{hotel.pricePerNight.toLocaleString()}/notte
                              </p>
                              <div className="flex gap-1 mt-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAddItem('hotel', hotel)}
                                  className="h-7 text-xs"
                                >
                                  <Plus size={12} className="mr-1" />
                                  Aggiungi
                                </Button>
                                {hotel.bookingUrl && (
                                  <a
                                    href={hotel.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-7 px-2 flex items-center text-xs text-blue-500 hover:underline"
                                  >
                                    <ExternalLink size={12} className="mr-1" />
                                    Prenota
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {activeTab === 'transports' &&
                    transportRoutes.map((transport) => (
                      <div
                        key={transport.id}
                        className="bg-white rounded-xl p-3 shadow-sm card-hover"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{transport.from}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-sm">{transport.to}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {getTransportIcon(transport.type)}
                          <span className="text-xs text-gray-500">{transport.line}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                          <span>{transport.departureTime} - {transport.arrivalTime}</span>
                          <span>•</span>
                          <span>{transport.duration}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAddItem('transport', transport)}
                          className="h-7 text-xs w-full"
                        >
                          <Plus size={12} className="mr-1" />
                          Aggiungi (¥{transport.price.toLocaleString()})
                        </Button>
                      </div>
                    ))}

                  {activeTab === 'restaurants' &&
                    filteredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="bg-white rounded-xl p-3 shadow-sm card-hover"
                      >
                        <div className="flex gap-3">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{restaurant.name}</h4>
                            <p className="text-xs text-gray-500">
                              {restaurant.category} • {restaurant.priceRange}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAddItem('restaurant', restaurant)}
                              className="mt-1 h-7 text-xs"
                            >
                              <Plus size={12} className="mr-1" />
                              Aggiungi
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Transport Dialog */}
        <Dialog open={transportDialog.open} onOpenChange={(open) => setTransportDialog({ ...transportDialog, open })}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Opzioni di Trasporto</DialogTitle>
            </DialogHeader>
            {transportDialog.from && transportDialog.to && (
              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Da <strong>{transportDialog.from.name}</strong> a <strong>{transportDialog.to.name}</strong>
                  <span className="ml-2 text-[#FF4B4B]">
                    ({calculateDistance(
                      transportDialog.from.position.lat,
                      transportDialog.from.position.lng,
                      transportDialog.to.position.lat,
                      transportDialog.to.position.lng
                    )} km)
                  </span>
                </p>
                <div className="space-y-2 max-h-64 overflow-auto">
                  {transportDialog.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        {getTransportIcon(option.type)}
                        <div>
                          <p className="font-medium text-sm">{option.line}</p>
                          <p className="text-xs text-gray-500">
                            {option.duration} • {option.type === 'walk' ? 'Gratis' : `¥${option.price.toLocaleString()}`}
                          </p>
                          {option.notes && (
                            <p className="text-xs text-blue-500">{option.notes}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddTransport(option)}
                        className="btn-primary"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Booking.com Search Dialog */}
        <Dialog open={bookingSearchOpen} onOpenChange={setBookingSearchOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Hotel size={20} className="text-[#003580]" />
                Cerca su Booking.com
              </DialogTitle>
            </DialogHeader>
            <div className="pt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Città o nome hotel</label>
                <Input
                  placeholder="Es. Tokyo, Kyoto, Osaka..."
                  value={bookingSearchQuery}
                  onChange={(e) => setBookingSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && openBookingSearch()}
                />
              </div>
              <div className="text-xs text-gray-500">
                Città selezionata: <strong>{selectedCity ? cities.find(c => c.id === selectedCity)?.name || selectedCity : 'Tutte'}</strong>
              </div>
              <Button
                onClick={openBookingSearch}
                className="w-full bg-[#003580] hover:bg-[#002a66] text-white"
              >
                <Search size={16} className="mr-2" />
                Cerca su Booking.com
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Verrai reindirizzato al sito di Booking.com
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
