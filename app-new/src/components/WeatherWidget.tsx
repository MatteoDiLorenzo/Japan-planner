import { useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, CloudLightning } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    date: string;
    tempMin: number;
    tempMax: number;
    condition: string;
    icon: string;
  }[];
}

// Simulated weather data (in production, this would come from an API)
const mockWeatherData: Record<string, WeatherData> = {
  tokyo: {
    city: 'Tokyo',
    temp: 18,
    condition: 'Parzialmente nuvoloso',
    icon: 'partly-cloudy',
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { date: 'Oggi', tempMin: 15, tempMax: 21, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Domani', tempMin: 14, tempMax: 19, condition: 'Piovoso', icon: 'rain' },
      { date: 'Dopodomani', tempMin: 16, tempMax: 22, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Gio', tempMin: 15, tempMax: 20, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Ven', tempMin: 13, tempMax: 18, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  kyoto: {
    city: 'Kyoto',
    temp: 16,
    condition: 'Soleggiato',
    icon: 'sun',
    humidity: 55,
    windSpeed: 8,
    forecast: [
      { date: 'Oggi', tempMin: 12, tempMax: 19, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Domani', tempMin: 11, tempMax: 18, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Dopodomani', tempMin: 13, tempMax: 20, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Gio', tempMin: 12, tempMax: 17, condition: 'Piovoso', icon: 'rain' },
      { date: 'Ven', tempMin: 10, tempMax: 16, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  osaka: {
    city: 'Osaka',
    temp: 19,
    condition: 'Nuvoloso',
    icon: 'cloud',
    humidity: 70,
    windSpeed: 10,
    forecast: [
      { date: 'Oggi', tempMin: 16, tempMax: 22, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Domani', tempMin: 15, tempMax: 20, condition: 'Piovoso', icon: 'rain' },
      { date: 'Dopodomani', tempMin: 17, tempMax: 23, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Gio', tempMin: 16, tempMax: 21, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Ven', tempMin: 14, tempMax: 19, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  nara: {
    city: 'Nara',
    temp: 17,
    condition: 'Soleggiato',
    icon: 'sun',
    humidity: 60,
    windSpeed: 6,
    forecast: [
      { date: 'Oggi', tempMin: 13, tempMax: 20, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Domani', tempMin: 12, tempMax: 19, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Dopodomani', tempMin: 14, tempMax: 21, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Gio', tempMin: 13, tempMax: 18, condition: 'Piovoso', icon: 'rain' },
      { date: 'Ven', tempMin: 11, tempMax: 17, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  hiroshima: {
    city: 'Hiroshima',
    temp: 20,
    condition: 'Soleggiato',
    icon: 'sun',
    humidity: 58,
    windSpeed: 14,
    forecast: [
      { date: 'Oggi', tempMin: 17, tempMax: 23, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Domani', tempMin: 16, tempMax: 22, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Dopodomani', tempMin: 18, tempMax: 24, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Gio', tempMin: 17, tempMax: 22, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Ven', tempMin: 15, tempMax: 21, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  kanazawa: {
    city: 'Kanazawa',
    temp: 14,
    condition: 'Piovoso',
    icon: 'rain',
    humidity: 80,
    windSpeed: 15,
    forecast: [
      { date: 'Oggi', tempMin: 11, tempMax: 16, condition: 'Piovoso', icon: 'rain' },
      { date: 'Domani', tempMin: 10, tempMax: 15, condition: 'Piovoso', icon: 'rain' },
      { date: 'Dopodomani', tempMin: 12, tempMax: 17, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Gio', tempMin: 11, tempMax: 16, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Ven', tempMin: 9, tempMax: 14, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  hakone: {
    city: 'Hakone',
    temp: 12,
    condition: 'Nuvoloso',
    icon: 'cloud',
    humidity: 75,
    windSpeed: 9,
    forecast: [
      { date: 'Oggi', tempMin: 9, tempMax: 14, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Domani', tempMin: 8, tempMax: 13, condition: 'Piovoso', icon: 'rain' },
      { date: 'Dopodomani', tempMin: 10, tempMax: 15, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Gio', tempMin: 9, tempMax: 14, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Ven', tempMin: 7, tempMax: 12, condition: 'Piovoso', icon: 'rain' },
    ],
  },
  nikko: {
    city: 'Nikko',
    temp: 10,
    condition: 'Soleggiato',
    icon: 'sun',
    humidity: 50,
    windSpeed: 7,
    forecast: [
      { date: 'Oggi', tempMin: 6, tempMax: 13, condition: 'Soleggiato', icon: 'sun' },
      { date: 'Domani', tempMin: 5, tempMax: 12, condition: 'Parzialmente nuvoloso', icon: 'partly-cloudy' },
      { date: 'Dopodomani', tempMin: 7, tempMax: 14, condition: 'Nuvoloso', icon: 'cloud' },
      { date: 'Gio', tempMin: 6, tempMax: 11, condition: 'Piovoso', icon: 'rain' },
      { date: 'Ven', tempMin: 4, tempMax: 10, condition: 'Piovoso', icon: 'rain' },
    ],
  },
};

const getWeatherIcon = (iconType: string, size: number = 24) => {
  switch (iconType) {
    case 'sun':
      return <Sun size={size} className="text-[#FFCA28]" />;
    case 'cloud':
      return <Cloud size={size} className="text-gray-500" />;
    case 'partly-cloudy':
      return <Cloud size={size} className="text-[#FFCA28]" />;
    case 'rain':
      return <CloudRain size={size} className="text-blue-500" />;
    case 'snow':
      return <CloudSnow size={size} className="text-blue-300" />;
    case 'thunder':
      return <CloudLightning size={size} className="text-purple-500" />;
    default:
      return <Sun size={size} className="text-[#FFCA28]" />;
  }
};

export function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState<string>('tokyo');
  const [isOpen, setIsOpen] = useState(false);

  const weather = mockWeatherData[selectedCity];

  const cities = [
    { id: 'tokyo', name: 'Tokyo' },
    { id: 'kyoto', name: 'Kyoto' },
    { id: 'osaka', name: 'Osaka' },
    { id: 'nara', name: 'Nara' },
    { id: 'hiroshima', name: 'Hiroshima' },
    { id: 'kanazawa', name: 'Kanazawa' },
    { id: 'hakone', name: 'Hakone' },
    { id: 'nikko', name: 'Nikko' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
          {getWeatherIcon(weather.icon, 20)}
          <span className="font-medium">{weather.temp}°C</span>
          <span className="text-gray-500 text-sm hidden sm:inline">{weather.city}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Meteo in Giappone</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* City Selector */}
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCity === city.id
                    ? 'bg-[#FF4B4B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold">{weather.temp}°C</p>
                <p className="text-white/80 mt-1">{weather.condition}</p>
                <p className="text-white/60 text-sm">{weather.city}</p>
              </div>
              <div className="text-white/90">
                {getWeatherIcon(weather.icon, 64)}
              </div>
            </div>
            <div className="flex gap-6 mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Droplets size={18} className="text-white/70" />
                <span className="text-sm">{weather.humidity}% umidità</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind size={18} className="text-white/70" />
                <span className="text-sm">{weather.windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div>
            <p className="font-medium mb-3">Previsioni 5 giorni</p>
            <div className="space-y-2">
              {weather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(day.icon, 20)}
                    <span className="font-medium">{day.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">{day.condition}</span>
                    <div className="flex items-center gap-1">
                      <Thermometer size={14} className="text-gray-400" />
                      <span className="text-sm">
                        {day.tempMin}° / {day.tempMax}°
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Tips */}
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="font-medium text-amber-800 mb-2">🌸 Consigli stagionali</p>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Primavera (mar-mag): Temperature miti, sakura in fiore</li>
              <li>• Estate (giu-ago): Caldo umido, porta ombrello</li>
              <li>• Autunno (set-nov): Fogliame colorato, clima ideale</li>
              <li>• Inverno (dic-feb): Freddo secco, neve nelle montagne</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
