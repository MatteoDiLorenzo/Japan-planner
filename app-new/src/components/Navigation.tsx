import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BudgetCalculator } from './BudgetCalculator';
import { WeatherWidget } from './WeatherWidget';
import { ShareItinerary } from './ShareItinerary';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'map', label: 'Mappa' },
    { id: 'itinerary', label: 'Itinerario' },
    { id: 'saved', label: 'Salvati' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-[#FF4B4B] rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-lg">JP</span>
              </div>
              <span
                className={`font-serif font-bold text-xl transition-colors ${
                  isScrolled ? 'text-[#2D2D2D]' : 'text-white'
                }`}
              >
                Japan Planner
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-white/10 ${
                    isScrolled
                      ? 'text-[#2D2D2D] hover:bg-gray-100'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              <WeatherWidget />
              <BudgetCalculator />
              <ShareItinerary />
              <Button
                onClick={() => scrollToSection('map')}
                className="btn-primary ml-2"
              >
                Inizia
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-[#2D2D2D] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#2D2D2D] hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex justify-center">
                <WeatherWidget />
              </div>
              <div className="flex justify-center">
                <BudgetCalculator />
              </div>
              <div className="flex justify-center">
                <ShareItinerary />
              </div>
              <Button
                onClick={() => scrollToSection('map')}
                className="w-full btn-primary mt-4"
              >
                Inizia il Viaggio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
