import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MapPin, Train, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // Title animation - letter by letter
      if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text
          .split('')
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        gsap.fromTo(
          titleRef.current.querySelectorAll('span'),
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            delay: 0.4,
            ease: 'power3.out',
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'power2.out',
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 1,
          ease: 'back.out(1.7)',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToMap = () => {
    const mapSection = document.getElementById('map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1920&q=80"
          alt="Torii gate in Japan"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <MapPin size={16} className="text-[#FF4B4B]" />
            <span className="text-white/90 text-sm font-medium">
              Esplora il Giappone
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight overflow-hidden"
          >
            Il tuo viaggio in Giappone, perfettamente orchestrato.
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
          >
            Dalla prenotazione del treno alla scoperta del ramen nascosto, 
            organizza ogni istante del tuo viaggio nei dettagli.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <span className="text-sm">Mappa Interattiva</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Train size={16} />
              </div>
              <span className="text-sm">Orari Treni</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Calendar size={16} />
              </div>
              <span className="text-sm">Pianificazione</span>
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Button
              onClick={scrollToMap}
              className="btn-primary text-lg px-8 py-6 flex items-center gap-2"
            >
              Inizia la tua avventura
              <ArrowRight size={20} />
            </Button>
            <Button
              onClick={scrollToMap}
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white px-8 py-6"
            >
              Esplora la mappa
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
        <div className="glass rounded-2xl p-4 animate-float">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF4B4B] rounded-xl flex items-center justify-center">
              <Train size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Prossimo treno</p>
              <p className="font-bold text-[#2D2D2D]">Tokyo → Kyoto</p>
              <p className="text-xs text-[#FF4B4B]">10:15 - 2h 15m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F5] to-transparent z-10" />
    </section>
  );
}
