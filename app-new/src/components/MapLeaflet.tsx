import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, X, Navigation, Star, Plus, Train, Bus, Moon, Footprints } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { allAttractions, getTransportOptions, calculateDistance } from '@/data/attractions';
import { useTripStore } from '@/store/tripStore';
import type { Attraction, TransportRoute } from '@/types';
import { toast } from 'sonner';

const categoryColors: Record<string, string> = {
  temple: '#FF4B4B',
  nature: '#4ECDC4',
  food: '#FFCA28',
  shopping: '#9C27B0',
  culture: '#2196F3',
  park: '#4CAF50',
  museum: '#E91E63',
  entertainment: '#FF5722',
};

const categoryLabels: Record<string, string> = {
  temple: 'Tempio',
  nature: 'Natura',
  food: 'Gastronomia',
  shopping: 'Shopping',
  culture: 'Cultura',
  park: 'Parco',
  museum: 'Museo',
  entertainment: 'Divertimento',
};

// Custom marker icon
const createCustomIcon = (category: string, isSelected: boolean) => {
  const color = categoryColors[category] || '#666';
  const size = isSelected ? 44 : 36;
  const borderWidth = isSelected ? 3 : 2;
  
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: ${borderWidth}px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: ${isSelected ? 12 : 8}px;
          height: ${isSelected ? 12 : 8}px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Map bounds component
function MapBounds({ attractions }: { attractions: Attraction[] }) {
  const map = useMap();
  
  useMemo(() => {
    if (attractions.length > 0) {
      const bounds = attractions.map(a => [a.position.lat, a.position.lng] as [number, number]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [attractions, map]);
  
  return null;
}

export function MapLeaflet() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [selectedPair, setSelectedPair] = useState<{ from: Attraction | null; to: Attraction | null }>({ from: null, to: null });
  const [transportOptions, setTransportOptions] = useState<TransportRoute[]>([]);

  const {
    selectedAttractions,
    addAttraction,
    removeAttraction,
    setSelectedCity,
  } = useTripStore();

  // Filter attractions by city and category
  const filteredAttractions = useMemo(() => {
    let filtered = allAttractions;
    
    if (activeCity) {
      filtered = filtered.filter(a => a.city === activeCity);
    }
    
    if (activeFilters.length > 0) {
      filtered = filtered.filter(a => activeFilters.includes(a.category));
    }
    
    return filtered;
  }, [activeCity, activeFilters]);

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleCitySelect = (city: string | null) => {
    setActiveCity(city);
    setSelectedCity(city);
  };

  const handleAddToTrip = (attraction: Attraction) => {
    if (selectedAttractions.find((a) => a.id === attraction.id)) {
      removeAttraction(attraction.id);
      toast.info(`${attraction.name} rimosso dal viaggio`);
    } else {
      addAttraction(attraction);
      toast.success(`${attraction.name} aggiunto al viaggio!`);
    }
  };

  const handleSelectForRoute = (attraction: Attraction, type: 'from' | 'to') => {
    setSelectedPair(prev => ({ ...prev, [type]: attraction }));
    if (type === 'from') {
      toast.info(`Selezionato punto di partenza: ${attraction.name}`);
    } else {
      toast.info(`Selezionato destinazione: ${attraction.name}`);
    }
  };

  const calculateRoute = () => {
    if (selectedPair.from && selectedPair.to) {
      const distance = calculateDistance(
        selectedPair.from.position.lat,
        selectedPair.from.position.lng,
        selectedPair.to.position.lat,
        selectedPair.to.position.lng
      );
      
      const transports = getTransportOptions(selectedPair.from, selectedPair.to);
      setTransportOptions(transports);
      
      setRoutePath([
        [selectedPair.from.position.lat, selectedPair.from.position.lng],
        [selectedPair.to.position.lat, selectedPair.to.position.lng],
      ]);
      setShowRoute(true);
      
      toast.success(`Distanza: ${distance} km - Trovate ${transports.length} opzioni di trasporto`);
    }
  };

  const clearRoute = () => {
    setShowRoute(false);
    setRoutePath([]);
    setSelectedPair({ from: null, to: null });
    setTransportOptions([]);
  };

  const cities = [
    { id: 'tokyo', name: 'Tokyo', nameJp: '東京' },
    { id: 'kyoto', name: 'Kyoto', nameJp: '京都' },
    { id: 'osaka', name: 'Osaka', nameJp: '大阪' },
    { id: 'nara', name: 'Nara', nameJp: '奈良' },
    { id: 'hiroshima', name: 'Hiroshima', nameJp: '広島' },
    { id: 'kanazawa', name: 'Kanazawa', nameJp: '金沢' },
    { id: 'hakone', name: 'Hakone', nameJp: '箱根' },
    { id: 'nikko', name: 'Nikko', nameJp: '日光' },
  ];

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

  return (
    <section id="map" className="section min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FF4B4B] rounded-xl flex items-center justify-center">
              <MapPin size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D2D2D]">
                Esplora il Giappone
              </h2>
              <p className="text-gray-500">
                Seleziona una città e scopri le attrazioni
              </p>
            </div>
          </div>

          {/* City Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleCitySelect(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCity === null
                  ? 'bg-[#FF4B4B] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tutte
            </button>
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCity === city.id
                    ? 'bg-[#FF4B4B] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {city.name} <span className="text-xs opacity-70">{city.nameJp}</span>
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilters.includes(key)
                    ? 'text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeFilters.includes(key)
                    ? categoryColors[key]
                    : undefined,
                }}
              >
                {label}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:bg-gray-100 flex items-center gap-1"
              >
                <X size={12} />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <MapContainer
                center={[35.6762, 139.6503]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapBounds attractions={filteredAttractions} />
                
                {/* Attraction Markers */}
                {filteredAttractions.map((attraction) => (
                  <Marker
                    key={attraction.id}
                    position={[attraction.position.lat, attraction.position.lng]}
                    icon={createCustomIcon(
                      attraction.category,
                      selectedAttractions.some(a => a.id === attraction.id)
                    )}
                  >
                    <Popup>
                      <div className="p-2 max-w-xs">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-24 object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-bold text-sm">{attraction.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{attraction.nameJp}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={12} className="text-[#FFCA28] fill-[#FFCA28]" />
                          <span className="text-xs">{attraction.rating}</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          <Button
                            size="sm"
                            onClick={() => handleAddToTrip(attraction)}
                            className={`text-xs py-1 px-2 h-auto ${
                              selectedAttractions.find((a) => a.id === attraction.id)
                                ? 'bg-gray-500'
                                : 'btn-primary'
                            }`}
                          >
                            {selectedAttractions.find((a) => a.id === attraction.id)
                              ? 'Rimuovi'
                              : 'Aggiungi'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSelectForRoute(attraction, 'from')}
                            className="text-xs py-1 px-2 h-auto"
                          >
                            Da
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSelectForRoute(attraction, 'to')}
                            className="text-xs py-1 px-2 h-auto"
                          >
                            A
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Route Line */}
                {showRoute && routePath.length > 0 && (
                  <Polyline
                    positions={routePath}
                    color="#FF4B4B"
                    weight={4}
                    opacity={0.8}
                    dashArray="10, 10"
                  />
                )}
              </MapContainer>

              {/* Route Info Overlay */}
              {showRoute && (
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 max-h-48 overflow-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Navigation size={18} className="text-[#FF4B4B]" />
                      <span className="font-bold text-sm">Percorso calcolato</span>
                    </div>
                    <button onClick={clearRoute} className="text-gray-400 hover:text-[#FF4B4B]">
                      <X size={16} />
                    </button>
                  </div>
                  
                  {selectedPair.from && selectedPair.to && (
                    <div className="text-xs text-gray-600 mb-2">
                      {selectedPair.from.name} → {selectedPair.to.name}
                      <span className="ml-2 text-[#FF4B4B]">
                        ({calculateDistance(
                          selectedPair.from.position.lat,
                          selectedPair.from.position.lng,
                          selectedPair.to.position.lat,
                          selectedPair.to.position.lng
                        )} km)
                      </span>
                    </div>
                  )}

                  <div className="space-y-1">
                    {transportOptions.map((transport) => (
                      <div
                        key={transport.id}
                        className="flex items-center justify-between bg-white/50 rounded-lg p-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {getTransportIcon(transport.type)}
                          <div>
                            <div className="font-medium">{transport.line}</div>
                            <div className="text-gray-500">
                              {transport.duration} • ¥{transport.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs"
                          onClick={() => {
                            toast.success(`${transport.line} aggiunto!`);
                          }}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Route Actions */}
            {selectedPair.from && selectedPair.to && !showRoute && (
              <div className="mt-4 flex gap-3">
                <Button onClick={calculateRoute} className="btn-primary flex items-center gap-2">
                  <Navigation size={18} />
                  Calcola Percorso
                </Button>
                <Button variant="outline" onClick={clearRoute}>
                  Cancella
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 h-full max-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Il tuo viaggio</h3>
                <Badge variant="secondary" className="bg-[#FF4B4B]/10 text-[#FF4B4B]">
                  {selectedAttractions.length}
                </Badge>
              </div>

              <ScrollArea className="flex-1 -mx-2 px-2">
                {selectedAttractions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <MapPin size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Nessuna attrazione selezionata</p>
                    <p className="text-sm mt-1">Clicca sui marker sulla mappa</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedAttractions.map((attraction, index) => (
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
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-xs text-gray-400">#{index + 1}</p>
                                <h4 className="font-medium text-sm truncate">
                                  {attraction.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {categoryLabels[attraction.category]}
                                </p>
                              </div>
                              <button
                                onClick={() => removeAttraction(attraction.id)}
                                className="text-gray-400 hover:text-[#FF4B4B] transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
