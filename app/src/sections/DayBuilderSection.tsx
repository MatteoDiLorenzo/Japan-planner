import { useState } from 'react';
import { Clock, MapPin, Footprints, Train, Trash2, Plus, Calendar, ChevronDown, ChevronUp, Navigation, Hotel, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTrip } from '@/hooks/useTrip';
import { attractions, findMetroRoute } from '@/data/attractions';
import type { Attraction } from '@/types';

const timeSlots = [
  { id: 'morning', label: 'Mattina', timeRange: '09:00 - 12:00', icon: '🌅' },
  { id: 'afternoon', label: 'Pomeriggio', timeRange: '12:00 - 15:00', icon: '☀️' },
  { id: 'evening', label: 'Sera', timeRange: '15:00 - 18:00', icon: '🌇' },
  { id: 'night', label: 'Notte', timeRange: '18:00 - 21:00', icon: '🌙' },
];

interface TransportInfoProps {
  fromId: string;
  toId: string;
  city: string;
}

function TransportInfo({ fromId, toId, city }: TransportInfoProps) {
  const { getAttractionDistance } = useTrip();
  
  const fromAttraction = attractions.find(a => a.id === fromId);
  const toAttraction = attractions.find(a => a.id === toId);
  
  if (!fromAttraction || !toAttraction) return null;
  
  const distance = getAttractionDistance(fromId, toId);
  const travelTime = distance < 1.5 ? Math.round(distance * 12) : Math.round(10 + distance * 3 + 5);
  const isWalking = distance < 1.5;
  
  // Find metro route
  const metroRoute = findMetroRoute(fromAttraction.coordinates, toAttraction.coordinates, city);
  
  return (
    <div className="flex items-center gap-3 py-2 px-3 bg-white/5 rounded-lg my-2">
      <div className="flex items-center gap-1.5 text-white/60">
        {isWalking ? (
          <Footprints className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Train className="w-3.5 h-3.5 text-blue-400" />
        )}
        <span className="text-xs">
          {isWalking ? 'A piedi' : 'Metro'}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-white/50">
        <span>{distance.toFixed(1)} km</span>
        <span>~{travelTime} min</span>
      </div>
      
      {/* Metro Line Info */}
      {metroRoute && (
        <div className="flex items-center gap-2 ml-auto">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: metroRoute.fromStation.lineColor }}
          />
          <span className="text-xs text-white/70">{metroRoute.line}</span>
        </div>
      )}
      
      <div className="flex-1 h-px bg-white/10 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Navigation className="w-3 h-3 text-white/30 rotate-90" />
        </div>
      </div>
    </div>
  );
}

export function DayBuilderSection() {
  const { 
    selectedAttractions, 
    selectedHotels,
    dayPlans, 
    createDay, 
    addToDay, 
    removeFromDay,
    getTotalSpent,
    totalBudget,
  } = useTrip();
  
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [expandedSlots, setExpandedSlots] = useState<string[]>(['morning']);

  const toggleSlot = (slotId: string) => {
    setExpandedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleCreateDay = () => {
    const newDayId = createDay();
    setSelectedDay(newDayId);
  };

  const handleAddToSlot = (attraction: Attraction, slotId: string) => {
    const dayId = selectedDay || dayPlans[0]?.id;
    if (!dayId) {
      const newDayId = createDay();
      const startTime = timeSlots.find(s => s.id === slotId)?.timeRange.split(' - ')[0] || '09:00';
      addToDay(attraction.id, newDayId, startTime);
      setSelectedDay(newDayId);
    } else {
      const startTime = timeSlots.find(s => s.id === slotId)?.timeRange.split(' - ')[0] || '09:00';
      addToDay(attraction.id, dayId, startTime);
    }
  };

  const getAttractionsForSlot = (dayId: string, slotId: string) => {
    const day = dayPlans.find(d => d.id === dayId);
    if (!day) return [];
    
    const slot = timeSlots.find(s => s.id === slotId);
    if (!slot) return [];
    
    const [startHour] = slot.timeRange.split(' - ')[0].split(':').map(Number);
    const [endHour] = slot.timeRange.split(' - ')[1].split(':').map(Number);
    
    return day.activities
      .filter(a => {
        const [activityHour] = a.startTime.split(':').map(Number);
        return activityHour >= startHour && activityHour < endHour;
      })
      .map(a => ({
        activity: a,
        attraction: attractions.find(attr => attr.id === a.attractionId),
      }))
      .filter(item => item.attraction);
  };

  const currentDay = dayPlans.find(d => d.id === selectedDay) || dayPlans[0];
  
  // Calculate total cost for the day
  const calculateDayCost = (dayId: string) => {
    const day = dayPlans.find(d => d.id === dayId);
    if (!day) return 0;
    
    return day.activities.reduce((total, activity) => {
      const attraction = attractions.find(a => a.id === activity.attractionId);
      return total + (attraction?.price || 0);
    }, 0);
  };

  // Save trip function
  const handleSaveTrip = () => {
    const tripData = {
      attractions: selectedAttractions,
      hotels: selectedHotels,
      days: dayPlans,
      budget: { total: totalBudget, spent: getTotalSpent() },
      savedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(tripData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `japan-trip-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="min-h-screen bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Costruisci il tuo giorno</h2>
            <p className="text-white/60">Organizza il tuo itinerario con distanze e linee metro</p>
          </div>
          <div className="flex items-center gap-3">
            {dayPlans.length > 0 && (
              <select
                value={selectedDay || dayPlans[0]?.id}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
              >
                {dayPlans.map((day, index) => (
                  <option key={day.id} value={day.id} className="bg-gray-900">
                    Giorno {index + 1}
                  </option>
                ))}
              </select>
            )}
            <Button onClick={handleCreateDay} className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Nuovo Giorno
            </Button>
            <Button 
              onClick={handleSaveTrip} 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Salva
            </Button>
          </div>
        </div>

        {/* Selected Hotels */}
        {selectedHotels.length > 0 && (
          <Card className="bg-white/5 border-white/10 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Hotel className="w-4 h-4 text-purple-400" />
              <span className="text-white font-medium">Hotel Selezionati</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center gap-2 bg-purple-500/20 rounded-lg px-3 py-2">
                  <span className="text-white text-sm">{hotel.name}</span>
                  <span className="text-white/50 text-xs">¥{hotel.price.toLocaleString()}/notte</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {dayPlans.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-white/50" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nessun giorno creato</h3>
            <p className="text-white/60 mb-6">Inizia creando il tuo primo giorno di viaggio</p>
            <Button onClick={handleCreateDay} className="bg-red-500 hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Crea Giorno
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Time Slots */}
            <div className="lg:col-span-2 space-y-4">
              {/* Day Summary */}
              {currentDay && (
                <Card className="bg-white/5 border-white/10 p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Costo attrazioni giorno</p>
                      <p className="text-white text-xl font-bold">¥{calculateDayCost(currentDay.id).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Attività totali</p>
                      <p className="text-white text-xl font-bold">{currentDay.activities.length}</p>
                    </div>
                  </div>
                </Card>
              )}
              
              {timeSlots.map((slot) => {
                const slotAttractions = currentDay ? getAttractionsForSlot(currentDay.id, slot.id) : [];
                const isExpanded = expandedSlots.includes(slot.id);
                
                return (
                  <Card key={slot.id} className="bg-white/5 border-white/10 overflow-hidden">
                    <button
                      onClick={() => toggleSlot(slot.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{slot.icon}</span>
                        <div className="text-left">
                          <h3 className="font-semibold text-white">{slot.label}</h3>
                          <p className="text-white/50 text-sm">{slot.timeRange}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-white/10 text-white/70">
                          {slotAttractions.length} attività
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-white/50" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/50" />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4">
                        {slotAttractions.length === 0 ? (
                          <div className="text-center py-6 border-2 border-dashed border-white/10 rounded-lg">
                            <p className="text-white/40 text-sm">Aggiungi un'attività a questo slot</p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="mt-2 text-red-400">
                                  <Plus className="w-4 h-4 mr-1" />
                                  Aggiungi
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-900 border-white/10 max-w-md max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-white">Aggiungi attrazione</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2 mt-4">
                                  {selectedAttractions.length === 0 ? (
                                    <p className="text-white/50 text-center py-4">
                                      Nessuna attrazione selezionata. Vai alla mappa per aggiungerne!
                                    </p>
                                  ) : (
                                    selectedAttractions.map((attr) => (
                                      <button
                                        key={attr.id}
                                        onClick={() => handleAddToSlot(attr, slot.id)}
                                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                      >
                                        <div className="flex gap-3">
                                          {attr.image && (
                                            <img src={attr.image} alt={attr.name} className="w-16 h-16 object-cover rounded-lg" />
                                          )}
                                          <div>
                                            <p className="text-white font-medium">{attr.name}</p>
                                            <p className="text-white/50 text-sm">{attr.duration}</p>
                                          </div>
                                        </div>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {slotAttractions.map((item, index) => {
                              const prevItem = index > 0 ? slotAttractions[index - 1] : null;
                              
                              return (
                                <div key={item.activity.id}>
                                  {/* Transport Info */}
                                  {prevItem && (
                                    <TransportInfo 
                                      fromId={prevItem.attraction!.id} 
                                      toId={item.attraction!.id}
                                      city={item.attraction!.city}
                                    />
                                  )}
                                  
                                  {/* Activity Card */}
                                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                                    {item.attraction!.image && (
                                      <img 
                                        src={item.attraction!.image} 
                                        alt={item.attraction!.name}
                                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                      />
                                    )}
                                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <MapPin className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-white font-medium truncate">{item.attraction!.name}</p>
                                      <div className="flex items-center gap-3 text-sm text-white/50">
                                        <span className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {item.activity.startTime} - {item.activity.endTime}
                                        </span>
                                        <span>{item.attraction!.duration}</span>
                                        {item.attraction!.price > 0 && (
                                          <span>¥{item.attraction!.price}</span>
                                        )}
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-white/50 hover:text-red-400"
                                      onClick={() => removeFromDay(item.activity.id, currentDay!.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                            
                            {/* Add more button */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" className="w-full text-white/50 hover:text-white">
                                  <Plus className="w-4 h-4 mr-2" />
                                  Aggiungi attività
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-900 border-white/10 max-w-md max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-white">Aggiungi attrazione</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2 mt-4">
                                  {selectedAttractions.length === 0 ? (
                                    <p className="text-white/50 text-center py-4">
                                      Nessuna attrazione selezionata. Vai alla mappa per aggiungerne!
                                    </p>
                                  ) : (
                                    selectedAttractions.map((attr) => (
                                      <button
                                        key={attr.id}
                                        onClick={() => handleAddToSlot(attr, slot.id)}
                                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                      >
                                        <div className="flex gap-3">
                                          {attr.image && (
                                            <img src={attr.image} alt={attr.name} className="w-16 h-16 object-cover rounded-lg" />
                                          )}
                                          <div>
                                            <p className="text-white font-medium">{attr.name}</p>
                                            <p className="text-white/50 text-sm">{attr.duration}</p>
                                          </div>
                                        </div>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Sidebar - Available Attractions */}
            <div className="lg:col-span-1">
              <Card className="bg-white/5 border-white/10 p-4 sticky top-24">
                <h3 className="font-semibold text-white mb-4">Le tue attrazioni</h3>
                {selectedAttractions.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-white/50 text-sm mb-4">Nessuna attrazione selezionata</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedAttractions.map((attr) => (
                      <div key={attr.id} className="p-3 bg-white/5 rounded-lg flex gap-3">
                        {attr.image && (
                          <img src={attr.image} alt={attr.name} className="w-12 h-12 object-cover rounded-lg" />
                        )}
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{attr.name}</p>
                          <p className="text-white/50 text-xs">{attr.city}</p>
                          {attr.price > 0 && (
                            <p className="text-white/40 text-xs">¥{attr.price}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
