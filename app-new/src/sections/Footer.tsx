import { MapPin, Train, Calendar, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Esplora',
      links: [
        { label: 'Mappa', href: '#map' },
        { label: 'Itinerario', href: '#itinerary' },
        { label: 'Viaggi Salvati', href: '#saved' },
      ],
    },
    {
      title: 'Destinazioni',
      links: [
        { label: 'Tokyo', href: '#' },
        { label: 'Kyoto', href: '#' },
        { label: 'Osaka', href: '#' },
        { label: 'Nara', href: '#' },
      ],
    },
    {
      title: 'Risorse',
      links: [
        { label: 'JR Pass', href: '#' },
        { label: 'Guida ai Treni', href: '#' },
        { label: 'Consigli di Viaggio', href: '#' },
      ],
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#2D2D2D] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#FF4B4B] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">JP</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl">Japan Planner</h3>
                <p className="text-gray-400 text-sm">Il tuo viaggio, perfettamente orchestrato</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Pianifica ogni dettaglio del tuo viaggio in Giappone. Dalle
              attrazioni iconiche ai ristoranti nascosti, dagli orari dei treni
              agli hotel perfetti.
            </p>
            <div className="flex gap-4">
              <a
                href="#map"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#map');
                }}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF4B4B] transition-colors"
              >
                <MapPin size={18} />
              </a>
              <a
                href="#itinerary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#itinerary');
                }}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF4B4B] transition-colors"
              >
                <Calendar size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#FF4B4B] transition-colors"
              >
                <Train size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FF4B4B] transition-all group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Japan Travel Planner. Tutti i diritti riservati.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Fatto con <Heart size={14} className="text-[#FF4B4B] fill-[#FF4B4B]" /> per il Giappone
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Termini
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contatti
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
