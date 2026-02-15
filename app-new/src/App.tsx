import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/sections/Hero';
import { MapLeaflet } from '@/components/MapLeaflet';
import { ItineraryBuilder } from '@/sections/ItineraryBuilder';
import { SavedTrips } from '@/sections/SavedTrips';
import { Footer } from '@/sections/Footer';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.9, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#F5F5F5]">
      <Navigation />
      <main>
        <Hero />
        <MapLeaflet />
        <ItineraryBuilder />
        <SavedTrips />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
