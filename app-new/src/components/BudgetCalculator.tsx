import { useState } from 'react';
import { Wallet, Hotel, Plane, Utensils, ShoppingBag, Ticket, MoreHorizontal, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTripStore } from '@/store/tripStore';
import { toast } from 'sonner';

export function BudgetCalculator() {
  const { budget, updateBudget, calculateTotalBudget, selectedAttractions, selectedHotels } = useTripStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const categories = [
    { key: 'accommodation', label: 'Alloggio', icon: Hotel, color: '#4ECDC4', description: 'Hotel, ryokan, hostel' },
    { key: 'transport', label: 'Trasporti', icon: Plane, color: '#FFCA28', description: 'Treni, bus, voli' },
    { key: 'food', label: 'Cibo', icon: Utensils, color: '#FF4B4B', description: 'Ristoranti, street food' },
    { key: 'attractions', label: 'Attrazioni', icon: Ticket, color: '#9C27B0', description: 'Biglietti musei, templi' },
    { key: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#2196F3', description: 'Souvenir, regali' },
    { key: 'other', label: 'Altro', icon: MoreHorizontal, color: '#666666', description: 'Spese varie' },
  ];

  const handleUpdateCategory = (category: string) => {
    const value = parseInt(tempValue) || 0;
    updateBudget({ [category]: value });
    setEditingCategory(null);
    setTempValue('');
    toast.success('Budget aggiornato!');
  };

  const handleQuickAdd = (category: string, amount: number) => {
    const currentValue = budget[category as keyof typeof budget] as number || 0;
    updateBudget({ [category]: currentValue + amount });
    toast.success(`Aggiunti ¥${amount.toLocaleString()}`);
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  // Calculate auto from selected items
  const autoCalculated = {
    accommodation: selectedHotels.reduce((sum, h) => sum + h.pricePerNight, 0),
    attractions: selectedAttractions.reduce((sum, a) => {
      const price = a.price && a.price !== 'Gratis' 
        ? parseInt(a.price.replace(/[^0-9]/g, '')) || 0 
        : 0;
      return sum + price;
    }, 0),
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet size={18} className="text-[#4ECDC4]" />
          <span className="hidden sm:inline">Budget</span>
          <span className="font-bold">{formatCurrency(calculateTotalBudget())}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator size={24} className="text-[#4ECDC4]" />
            Budget Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Total */}
          <div className="bg-gradient-to-r from-[#FF4B4B] to-[#FF6B6B] rounded-2xl p-6 text-white">
            <p className="text-white/80 text-sm mb-1">Budget Totale Stimato</p>
            <p className="text-4xl font-bold">{formatCurrency(calculateTotalBudget())}</p>
            <p className="text-white/70 text-xs mt-2">
              ¥{(calculateTotalBudget() / 7).toFixed(0).toLocaleString()} / giorno (7 giorni)
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const value = budget[cat.key as keyof typeof budget] as number || 0;
              const autoValue = autoCalculated[cat.key as keyof typeof autoCalculated] || 0;
              const percentage = calculateTotalBudget() > 0 
                ? Math.round((value / calculateTotalBudget()) * 100) 
                : 0;

              return (
                <div key={cat.key} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        <Icon size={18} style={{ color: cat.color }} />
                      </div>
                      <div>
                        <p className="font-medium">{cat.label}</p>
                        <p className="text-xs text-gray-500">{cat.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {editingCategory === cat.key ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="w-24 h-8 text-sm"
                            placeholder={value.toString()}
                            autoFocus
                          />
                          <Button 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => handleUpdateCategory(cat.key)}
                          >
                            OK
                          </Button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingCategory(cat.key);
                            setTempValue(value.toString());
                          }}
                          className="text-right"
                        >
                          <p className="font-bold">{formatCurrency(value)}</p>
                          {autoValue > 0 && (
                            <p className="text-xs text-green-600">
                              Auto: {formatCurrency(autoValue)}
                            </p>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{percentage}% del totale</p>

                  {/* Quick add buttons */}
                  <div className="flex gap-2 mt-3">
                    {[1000, 5000, 10000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleQuickAdd(cat.key, amount)}
                        className="px-2 py-1 bg-white rounded text-xs hover:bg-gray-100 transition-colors border"
                      >
                        +{formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-medium text-blue-800 mb-2">💡 Suggerimenti</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• JR Pass 7 giorni: ¥29,650 (conviene per 3+ treni Shinkansen)</li>
              <li>• Pasto medio: ¥1,000-2,000 (street food), ¥3,000-5,000 (ristorante)</li>
              <li>• Hotel capsule: ¥3,000-5,000/notte</li>
              <li>• Ryokan tradizionale: ¥15,000-30,000/notte con cena</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
