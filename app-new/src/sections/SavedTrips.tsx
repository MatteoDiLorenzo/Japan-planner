import { useState } from 'react';
import { Save, Calendar, MapPin, Train, Hotel, Utensils, Trash2, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTripStore } from '@/store/tripStore';
import type { TripPlan } from '@/types';
import { toast } from 'sonner';

export function SavedTrips() {
  const { savedTrips, loadTrip, deleteTrip, clearCurrentTrip } = useTripStore();
  const [selectedTrip, setSelectedTrip] = useState<TripPlan | null>(null);

  const handleLoadTrip = (trip: TripPlan) => {
    loadTrip(trip.id);
    setSelectedTrip(trip);
    toast.success(`Viaggio "${trip.name}" caricato!`);
    
    // Scroll to itinerary section
    const itinerarySection = document.getElementById('itinerary');
    if (itinerarySection) {
      itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteTrip = (id: string, name: string) => {
    deleteTrip(id);
    if (selectedTrip?.id === id) {
      setSelectedTrip(null);
    }
    toast.success(`Viaggio "${name}" eliminato`);
  };

  const getItemCounts = (trip: TripPlan) => {
    return {
      attractions: trip.items.filter((i) => i.type === 'attraction').length,
      hotels: trip.items.filter((i) => i.type === 'hotel').length,
      transports: trip.items.filter((i) => i.type === 'transport').length,
      restaurants: trip.items.filter((i) => i.type === 'restaurant').length,
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const exportTrip = (trip: TripPlan) => {
    const dataStr = JSON.stringify(trip, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${trip.name.replace(/\s+/g, '_')}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Viaggio esportato!');
  };

  return (
    <section id="saved" className="section bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FFCA28] rounded-xl flex items-center justify-center">
              <Save size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D2D2D]">
                I tuoi viaggi
              </h2>
              <p className="text-gray-500">
                {savedTrips.length} {savedTrips.length === 1 ? 'viaggio salvato' : 'viaggi salvati'}
              </p>
            </div>
          </div>

          {savedTrips.length > 0 && (
            <Button
              variant="outline"
              onClick={clearCurrentTrip}
              className="hidden md:flex"
            >
              Nuovo viaggio
            </Button>
          )}
        </div>

        {savedTrips.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Save size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Nessun viaggio salvato
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Inizia a pianificare il tuo viaggio in Giappone e salvalo qui per
              consultarlo in qualsiasi momento.
            </p>
            <Button
              onClick={() => {
                const mapSection = document.getElementById('map');
                mapSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Inizia a pianificare
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => {
              const counts = getItemCounts(trip);

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl p-6 shadow-sm card-hover"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(trip.startDate)} -{' '}
                          {formatDate(trip.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => exportTrip(trip)}
                        className="p-2 text-gray-400 hover:text-[#4ECDC4] transition-colors"
                        title="Esporta"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip.id, trip.name)}
                        className="p-2 text-gray-400 hover:text-[#FF4B4B] transition-colors"
                        title="Elimina"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 bg-[#FF4B4B]/5 rounded-lg">
                      <MapPin size={16} className="mx-auto mb-1 text-[#FF4B4B]" />
                      <p className="text-lg font-bold">{counts.attractions}</p>
                      <p className="text-xs text-gray-500">Attr.</p>
                    </div>
                    <div className="text-center p-2 bg-[#4ECDC4]/5 rounded-lg">
                      <Hotel size={16} className="mx-auto mb-1 text-[#4ECDC4]" />
                      <p className="text-lg font-bold">{counts.hotels}</p>
                      <p className="text-xs text-gray-500">Hotel</p>
                    </div>
                    <div className="text-center p-2 bg-[#FFCA28]/5 rounded-lg">
                      <Train size={16} className="mx-auto mb-1 text-[#FFCA28]" />
                      <p className="text-lg font-bold">{counts.transports}</p>
                      <p className="text-xs text-gray-500">Treni</p>
                    </div>
                    <div className="text-center p-2 bg-[#9C27B0]/5 rounded-lg">
                      <Utensils size={16} className="mx-auto mb-1 text-[#9C27B0]" />
                      <p className="text-lg font-bold">{counts.restaurants}</p>
                      <p className="text-xs text-gray-500">Rist.</p>
                    </div>
                  </div>

                  {/* Preview */}
                  {trip.items.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Prime tappe:</p>
                      <div className="space-y-1">
                        {trip.items.slice(0, 3).map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="text-gray-400 w-4">{index + 1}.</span>
                            <span className="truncate">{(item.item as any).name}</span>
                          </div>
                        ))}
                        {trip.items.length > 3 && (
                          <p className="text-sm text-gray-400 pl-6">
                            +{trip.items.length - 3} altre...
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Budget */}
                  {trip.budget && trip.budget.total > 0 && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Budget stimato:</p>
                      <p className="font-bold text-[#FF4B4B]">
                        ¥{trip.budget.total.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleLoadTrip(trip)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Carica
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          Dettagli
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>{trip.name}</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh]">
                          <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                              </span>
                              <span>•</span>
                              <span>{trip.items.length} attività</span>
                            </div>

                            {trip.budget && trip.budget.total > 0 && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="font-medium mb-2">Budget:</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p>Alloggio: ¥{trip.budget.accommodation.toLocaleString()}</p>
                                  <p>Trasporti: ¥{trip.budget.transport.toLocaleString()}</p>
                                  <p>Cibo: ¥{trip.budget.food.toLocaleString()}</p>
                                  <p>Attrazioni: ¥{trip.budget.attractions.toLocaleString()}</p>
                                  <p className="col-span-2 font-bold text-[#FF4B4B]">
                                    Totale: ¥{trip.budget.total.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="space-y-2">
                              {trip.items.map((item, index) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                                >
                                  <span className="text-gray-400 w-6">{index + 1}</span>
                                  {item.type === 'attraction' && (
                                    <MapPin size={16} className="text-[#FF4B4B]" />
                                  )}
                                  {item.type === 'hotel' && (
                                    <Hotel size={16} className="text-[#4ECDC4]" />
                                  )}
                                  {item.type === 'transport' && (
                                    <Train size={16} className="text-[#FFCA28]" />
                                  )}
                                  {item.type === 'restaurant' && (
                                    <Utensils size={16} className="text-[#9C27B0]" />
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium">
                                      {(item.item as any).name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {item.timeSlot === 'morning' && 'Mattina'}
                                      {item.timeSlot === 'afternoon' && 'Pomeriggio'}
                                      {item.timeSlot === 'evening' && 'Sera'}
                                      {item.timeSlot === 'night' && 'Notte'}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
