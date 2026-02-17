import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import { X, Layers, Plus, Check, ExternalLink, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  tokyoMetroStations, 
  tokyoMetroLines, 
  kyotoMetroStations, 
  kyotoMetroLines,
  osakaMetroStations,
  osakaMetroLines,
  naraStations,
  naraLines,
  sampleHotels,
  findNearestStation
} from '@/data/attractions';
import { useTrip } from '@/hooks/useTrip';
import type { Attraction, MetroStation, Hotel } from '@/types';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icons
const createAttractionIcon = (type: string, isSelected: boolean) => {
  const colors: Record<string, string> = {
    temple: '#8B5CF6',
    nature: '#10B981',
    food: '#F59E0B',
    shopping: '#EC4899',
    culture: '#3B82F6',
    park: '#22C55E',
    museum: '#6366F1',
    entertainment: '#F97316',
  };
  const color = isSelected ? '#EF4444' : (colors[type] || '#6B7280');
  
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        cursor: pointer;
      ">📍</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const createMetroIcon = (lineColor: string) => {
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: ${lineColor};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const createHotelIcon = () => {
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #3B82F6;
        border: 3px solid white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      ">🏨</div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

interface MapViewProps {
  selectedCity: string;
  showMetro: boolean;
  showHotels: boolean;
  selectedAttraction: Attraction | null;
  onAttractionSelect: (attraction: Attraction | null) => void;
  attractions: Attraction[];
}

// Map controller component
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Geocoding function using Nominatim
async function geocodeAddress(address: string): Promise<[number, number] | null> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export function MapView({ 
  selectedCity, 
  showMetro, 
  showHotels,
  selectedAttraction, 
  onAttractionSelect,
  attractions: attractionsList
}: MapViewProps) {
  const { addAttraction, removeAttraction, isAttractionSelected, addHotel, selectedHotels, removeHotel } = useTrip();
  const [selectedStation, setSelectedStation] = useState<MetroStation | null>(null);
  const [showAddHotelDialog, setShowAddHotelDialog] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: '',
    address: '',
    bookingUrl: '',
    price: '',
  });
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [customHotels, setCustomHotels] = useState<Hotel[]>([]);

  // Get city center coordinates
  const cityCenter: [number, number] = useMemo(() => {
    const centers: Record<string, [number, number]> = {
      tokyo: [35.6762, 139.6503],
      kyoto: [35.0116, 135.7681],
      osaka: [34.6937, 135.5023],
      nara: [34.6851, 135.8048],
      all: [35.6762, 139.6503],
    };
    return centers[selectedCity] || centers.tokyo;
  }, [selectedCity]);
  
  // Get metro stations and lines for selected city
  const cityMetroStations = useMemo(() => {
    if (!showMetro) return [];
    switch (selectedCity) {
      case 'tokyo': return tokyoMetroStations;
      case 'kyoto': return kyotoMetroStations;
      case 'osaka': return osakaMetroStations;
      case 'nara': return naraStations;
      case 'all': return tokyoMetroStations;
      default: return [];
    }
  }, [showMetro, selectedCity]);

  const cityMetroLines = useMemo(() => {
    if (!showMetro) return [];
    switch (selectedCity) {
      case 'tokyo': return tokyoMetroLines;
      case 'kyoto': return kyotoMetroLines;
      case 'osaka': return osakaMetroLines;
      case 'nara': return naraLines;
      case 'all': return tokyoMetroLines;
      default: return [];
    }
  }, [showMetro, selectedCity]);

  // Get hotels for selected city
  const cityHotels = useMemo(() => {
    if (!showHotels) return [];
    const allHotels = [...sampleHotels, ...customHotels];
    if (selectedCity === 'all') return allHotels;
    return allHotels.filter(h => h.city === selectedCity);
  }, [showHotels, selectedCity, customHotels]);

  const toggleAttraction = (attraction: Attraction, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAttractionSelected(attraction.id)) {
      removeAttraction(attraction.id);
    } else {
      addAttraction(attraction);
    }
  };

  const toggleHotel = (hotel: Hotel, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSelected = selectedHotels.some(h => h.id === hotel.id);
    if (isSelected) {
      removeHotel(hotel.id);
    } else {
      addHotel(hotel);
    }
  };

  const isHotelSelected = (hotelId: string) => {
    return selectedHotels.some(h => h.id === hotelId);
  };

  const handleAddHotel = async () => {
    if (!newHotel.name || !newHotel.address || !newHotel.bookingUrl) return;
    
    setIsGeocoding(true);
    const coordinates = await geocodeAddress(newHotel.address);
    setIsGeocoding(false);
    
    if (coordinates) {
      const hotel: Hotel = {
        id: `custom-hotel-${Date.now()}`,
        name: newHotel.name,
        nameJp: newHotel.name,
        city: selectedCity === 'all' ? 'tokyo' : selectedCity,
        coordinates,
        address: newHotel.address,
        price: parseInt(newHotel.price) || 15000,
        rating: 4.0,
        bookingUrl: newHotel.bookingUrl,
      };
      
      setCustomHotels(prev => [...prev, hotel]);
      setNewHotel({ name: '', address: '', bookingUrl: '', price: '' });
      setShowAddHotelDialog(false);
    } else {
      alert('Impossibile trovare le coordinate per questo indirizzo. Riprova con un indirizzo più specifico.');
    }
  };

  return (
    <div className="relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden">
      <MapContainer
        center={cityCenter}
        zoom={12}
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      >
        <MapController center={cityCenter} zoom={selectedCity === 'all' ? 6 : 12} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Metro Lines */}
        {showMetro && cityMetroLines.map((line) => {
          const stations = line.stations
            .map(sId => cityMetroStations.find(s => s.id === sId))
            .filter(Boolean) as MetroStation[];
          
          if (stations.length < 2) return null;
          
          const positions = stations.map(s => s.coordinates);
          
          return (
            <Polyline
              key={line.id}
              positions={positions}
              color={line.color}
              weight={4}
              opacity={0.8}
            />
          );
        })}

        {/* Metro Stations */}
        {cityMetroStations.map((station) => (
          <Marker
            key={station.id}
            position={station.coordinates}
            icon={createMetroIcon(station.lineColor)}
            eventHandlers={{
              click: () => setSelectedStation(station),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: station.lineColor }}
                  />
                  <h4 className="font-semibold">{station.name}</h4>
                </div>
                <p className="text-sm text-gray-500">{station.nameJp}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Linea: {cityMetroLines.find(l => l.id === station.line)?.name}
                </p>
                {station.connections.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Connessioni:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {station.connections.map(conn => (
                        <span key={conn} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {conn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Attractions */}
        {attractionsList.map((attraction) => {
          const isSelected = isAttractionSelected(attraction.id);
          return (
            <Marker
              key={attraction.id}
              position={attraction.coordinates}
              icon={createAttractionIcon(attraction.type, isSelected)}
              eventHandlers={{
                click: () => onAttractionSelect(attraction),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[220px]">
                  {attraction.image && (
                    <img 
                      src={attraction.image} 
                      alt={attraction.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{attraction.name}</h4>
                      <p className="text-sm text-gray-500">{attraction.nameJp}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {attraction.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                  
                  {/* Nearest Station */}
                  {(() => {
                    const nearest = findNearestStation(attraction.coordinates, attraction.city);
                    if (nearest) {
                      return (
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Train className="w-3 h-3" />
                          <span>Stazione più vicina: {nearest.name}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {attraction.price > 0 ? `¥${attraction.price}` : 'Gratis'}
                    </span>
                    <Button
                      size="sm"
                      variant={isSelected ? "destructive" : "default"}
                      onClick={(e) => toggleAttraction(attraction, e)}
                    >
                      {isSelected ? 'Rimuovi' : 'Aggiungi'}
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Hotels */}
        {cityHotels.map((hotel) => {
          const isSelected = isHotelSelected(hotel.id);
          return (
            <Marker
              key={hotel.id}
              position={hotel.coordinates}
              icon={createHotelIcon()}
            >
              <Popup>
                <div className="p-2 min-w-[220px]">
                  {hotel.image && (
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{hotel.name}</h4>
                      <p className="text-sm text-gray-500">{hotel.nameJp}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{hotel.address}</p>
                  
                  {/* Nearest Station */}
                  {(() => {
                    const nearest = findNearestStation(hotel.coordinates, hotel.city);
                    if (nearest) {
                      return (
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Train className="w-3 h-3" />
                          <span>Stazione più vicina: {nearest.name}</span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">¥{hotel.price.toLocaleString()}/notte</span>
                    <span className="text-sm text-yellow-500">★ {hotel.rating}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={isSelected ? "destructive" : "default"}
                      className="flex-1"
                      onClick={(e) => toggleHotel(hotel, e)}
                    >
                      {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      {isSelected ? 'Selezionato' : 'Aggiungi'}
                    </Button>
                    <a 
                      href={hotel.bookingUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Booking
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Add Hotel Button */}
      {showHotels && (
        <div className="absolute top-4 left-4 z-[1]">
          <Dialog open={showAddHotelDialog} onOpenChange={setShowAddHotelDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi Hotel
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-white/10 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Aggiungi Hotel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Nome Hotel</label>
                  <Input
                    placeholder="Es. Hotel Granvia"
                    value={newHotel.name}
                    onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Indirizzo Completo</label>
                  <Input
                    placeholder="Es. 1-1-1 Shibuya, Tokyo, Japan"
                    value={newHotel.address}
                    onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <p className="text-white/40 text-xs mt-1">Inserisci l'indirizzo completo per calcolare le coordinate</p>
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Link Booking.com</label>
                  <Input
                    placeholder="https://www.booking.com/hotel/..."
                    value={newHotel.bookingUrl}
                    onChange={(e) => setNewHotel({ ...newHotel, bookingUrl: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Prezzo per notte (¥)</label>
                  <Input
                    type="number"
                    placeholder="15000"
                    value={newHotel.price}
                    onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                <Button 
                  onClick={handleAddHotel} 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isGeocoding}
                >
                  {isGeocoding ? 'Calcolo coordinate...' : 'Aggiungi Hotel'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-white/10 z-[1]">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-white/70" />
          <span className="text-white text-sm font-medium">Legenda</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-white/70 text-xs">Tempio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-white/70 text-xs">Natura</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-white/70 text-xs">Gastronomia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500" />
            <span className="text-white/70 text-xs">Shopping</span>
          </div>
          {showMetro && (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-white/70 text-xs">Metro</span>
            </div>
          )}
          {showHotels && (
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-white/70 text-xs">Hotel</span>
            </div>
          )}
        </div>
      </div>

      {/* Selected Station Panel */}
      {selectedStation && (
        <div className="absolute top-4 right-4 w-72 bg-black/90 backdrop-blur-md rounded-xl p-4 border border-white/10 z-[1]">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-white">{selectedStation.name}</h3>
              <p className="text-sm text-white/60">{selectedStation.nameJp}</p>
            </div>
            <button 
              onClick={() => setSelectedStation(null)}
              className="text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div 
            className="w-full h-1 rounded-full mb-3" 
            style={{ backgroundColor: selectedStation.lineColor }}
          />
          <p className="text-white/70 text-sm mb-2">
            Linea: {cityMetroLines.find(l => l.id === selectedStation.line)?.name}
          </p>
          {selectedStation.connections.length > 0 && (
            <div>
              <p className="text-white/50 text-sm mb-1">Connessioni:</p>
              <div className="flex flex-wrap gap-1">
                {selectedStation.connections.map(conn => (
                  <Badge key={conn} variant="secondary" className="bg-white/10">
                    {conn}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selected Attraction Panel */}
      {selectedAttraction && (
        <div className="absolute top-4 right-4 w-80 bg-black/90 backdrop-blur-md rounded-xl p-4 border border-white/10 z-[1]">
          {selectedAttraction.image && (
            <img 
              src={selectedAttraction.image} 
              alt={selectedAttraction.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
          )}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-white">{selectedAttraction.name}</h3>
              <p className="text-sm text-white/60">{selectedAttraction.nameJp}</p>
            </div>
            <button 
              onClick={() => onAttractionSelect(null)}
              className="text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-white/70 mb-3">{selectedAttraction.description}</p>
          
          {/* Nearest Station */}
          {(() => {
            const nearest = findNearestStation(selectedAttraction.coordinates, selectedAttraction.city);
            if (nearest) {
              return (
                <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                  <Train className="w-4 h-4 text-blue-400" />
                  <span>Stazione più vicina: <span className="text-white">{nearest.name}</span></span>
                </div>
              );
            }
            return null;
          })()}
          
          <div className="flex items-center gap-4 mb-3 text-sm">
            <span className="text-white/60">⏱ {selectedAttraction.duration}</span>
            <span className="text-white/60">
              {selectedAttraction.price > 0 ? `¥${selectedAttraction.price}` : 'Gratis'}
            </span>
          </div>
          <Button
            className="w-full"
            variant={isAttractionSelected(selectedAttraction.id) ? "destructive" : "default"}
            onClick={(e) => toggleAttraction(selectedAttraction, e)}
          >
            {isAttractionSelected(selectedAttraction.id) ? 'Rimuovi dal viaggio' : 'Aggiungi al viaggio'}
          </Button>
        </div>
      )}
    </div>
  );
}
