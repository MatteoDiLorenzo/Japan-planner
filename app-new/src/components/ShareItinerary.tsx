import { useState } from 'react';
import { Share2, Copy, MessageCircle, Download, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTripStore } from '@/store/tripStore';
import { toast } from 'sonner';

export function ShareItinerary() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const { generateShareLink, exportItinerary, itinerary, selectedDate } = useTripStore();

  const shareLink = generateShareLink();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success('Link copiato!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const data = exportItinerary();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `japan-itinerary-${selectedDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Itinerario scaricato!');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Guarda il mio itinerario in Giappone! ${shareLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    if (!email) {
      toast.error('Inserisci un indirizzo email');
      return;
    }
    const subject = encodeURIComponent('Il mio itinerario in Giappone');
    const body = encodeURIComponent(`Ciao!\n\nEcco il mio itinerario per il Giappone:\n\n${shareLink}\n\nBuon viaggio!`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    toast.success('Email preparata!');
  };

  const generateTextSummary = () => {
    if (itinerary.length === 0) return 'Nessuna attività pianificata';
    
    let summary = `🗾 ITINERARIO GIAPPONE - ${selectedDate}\n\n`;
    
    const timeSlots = ['morning', 'afternoon', 'evening', 'night'] as const;
    const timeLabels = { morning: '🌅 Mattina', afternoon: '☀️ Pomeriggio', evening: '🌆 Sera', night: '🌙 Notte' };
    
    timeSlots.forEach(slot => {
      const items = itinerary.filter(i => i.timeSlot === slot);
      if (items.length > 0) {
        summary += `${timeLabels[slot]}\n`;
        items.forEach((item, idx) => {
          const name = (item.item as any).name;
          const type = item.type === 'attraction' ? '📍' : 
                      item.type === 'hotel' ? '🏨' : 
                      item.type === 'transport' ? '🚆' : '🍽️';
          summary += `  ${idx + 1}. ${type} ${name}\n`;
        });
        summary += '\n';
      }
    });
    
    return summary;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 size={18} />
          <span className="hidden sm:inline">Condividi</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 size={24} className="text-[#4ECDC4]" />
            Condividi Itinerario
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="link" className="pt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-3">
                Copia questo link per condividere il tuo itinerario:
              </p>
              <div className="flex gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  className={copied ? 'bg-green-500' : 'btn-primary'}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                💡 Chi riceve il link potrà vedere il tuo itinerario completo con tutte le attività pianificate.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-3">
                Condividi direttamente su WhatsApp:
              </p>
              <Button
                onClick={handleShareWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Apri WhatsApp
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium mb-2">Anteprima messaggio:</p>
              <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                Guarda il mio itinerario in Giappone! {shareLink.substring(0, 50)}...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-3">
                Invia via email:
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Inserisci l'indirizzo email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={handleShareEmail}
                  className="w-full flex items-center gap-2"
                >
                  <Send size={18} />
                  Invia Email
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-3">
                Scarica il tuo itinerario:
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Download size={18} />
                  Scarica JSON
                </Button>
                
                <Button
                  onClick={() => {
                    const text = generateTextSummary();
                    navigator.clipboard.writeText(text);
                    toast.success('Testo copiato!');
                  }}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Copy size={18} />
                  Copia come testo
                </Button>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-amber-700">
                📱 Puoi anche salvare il file JSON e importarlo in un'altra sessione.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Summary */}
        {itinerary.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm font-medium mb-2">Riepilogo itinerario:</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📍 {itinerary.filter(i => i.type === 'attraction').length} attrazioni</p>
              <p>🏨 {itinerary.filter(i => i.type === 'hotel').length} hotel</p>
              <p>🚆 {itinerary.filter(i => i.type === 'transport').length} trasporti</p>
              <p>🍽️ {itinerary.filter(i => i.type === 'restaurant').length} ristoranti</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
