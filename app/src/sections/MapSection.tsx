import { useState } from 'react';
import { Map, Train, Filter, Search, Compass, Hotel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapView } from '@/components/MapView';
import { attractions, cityNames } from '@/data/attractions';
import type { Attraction } from '@/types';
import { useTrip } from '@/hooks/useTrip';

const cities = ['all', 'tokyo', 'kyoto', 'osaka', 'nara'] as const;
const categories = [
  { id: 'all', label: 'Tutte', icon: '🌟' },
  { id: 'temple', label: 'Tempio', icon: '⛩️' },
  { id: 'nature', label: 'Natura', icon: '🌿' },
  { id: 'food', label: 'Gastronomia', icon: '🍜' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'culture', label: 'Cultura', icon: '🏛️' },
  { id: 'park', label: 'Parco', icon: '🌸' },
  { id: 'museum', label: 'Museo', icon: '🎨' },
  { id: 'entertainment', label: 'Divertimento', icon: '🎢' },
];

export function MapSection() {
  const [selectedCity, setSelectedCity] = useState<string>('tokyo');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMetro, setShowMetro] = useState(true);
  const [showHotels, setShowHotels] = useState(true);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedAttractions, selectedHotels } = useTrip();

  const filteredAttractions = attractions.filter(a => {
    const matchesCity = selectedCity === 'all' || a.city === selectedCity;
    const matchesCategory = selectedCategory === 'all' || a.type === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.nameJp.includes(searchQuery);
    return matchesCity && matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Esplora il Giappone</h2>
              <p className="text-white/60">Seleziona una città e scopri le attrazioni</p>
            </div>
          </div>
        </div>

        {/* City Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCity === city
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {city === 'all' ? 'Tutte' : cityNames[city]?.name}
              {city !== 'all' && (
                <span className="ml-1 text-xs opacity-70">{cityNames[city]?.nameJp}</span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Filters & List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Cerca attrazioni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            {/* Category Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-sm">Categorie</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metro Toggle */}
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Train className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Mappa Metro</p>
                  <p className="text-white/60 text-sm">Linee e stazioni</p>
                </div>
              </div>
              <button
                onClick={() => setShowMetro(!showMetro)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  showMetro ? 'bg-blue-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                    showMetro ? 'left-6' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Hotels Toggle */}
            <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Hotel</p>
                  <p className="text-white/60 text-sm">{selectedHotels.length} selezionati</p>
                </div>
              </div>
              <button
                onClick={() => setShowHotels(!showHotels)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  showHotels ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                    showHotels ? 'left-6' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Selected Attractions Summary */}
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">Il tuo viaggio</span>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                  {selectedAttractions.length}
                </Badge>
              </div>
              {selectedAttractions.length === 0 ? (
                <p className="text-white/50 text-sm">Nessuna attrazione selezionata</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedAttractions.map((attr) => (
                    <div key={attr.id} className="flex items-center justify-between text-sm">
                      <span className="text-white/80">{attr.name}</span>
                      <span className="text-white/50">{attr.duration}</span>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-white/40 text-xs mt-3">Clicca sui marker sulla mappa</p>
            </div>

            {/* Attractions List with Images */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-sm">Attrazioni ({filteredAttractions.length})</span>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredAttractions.map((attraction) => (
                  <button
                    key={attraction.id}
                    onClick={() => setSelectedAttraction(attraction)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedAttraction?.id === attraction.id
                        ? 'bg-red-500/20 border border-red-500/50'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex gap-3">
                      {attraction.image && (
                        <img 
                          src={attraction.image} 
                          alt={attraction.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{attraction.name}</p>
                        <p className="text-white/50 text-xs">{attraction.nameJp}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white/40 text-xs">{attraction.duration}</span>
                          <span className="text-white/40 text-xs">
                            {attraction.price > 0 ? `¥${attraction.price}` : 'Gratis'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <div className="h-[700px] rounded-2xl overflow-hidden border border-white/10">
              <MapView
                selectedCity={selectedCity}
                showMetro={showMetro}
                showHotels={showHotels}
                selectedAttraction={selectedAttraction}
                onAttractionSelect={setSelectedAttraction}
                attractions={filteredAttractions}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
