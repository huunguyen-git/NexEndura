import { create } from 'zustand';

interface KitState {
  step: number;
  sport: string;
  items: {
    jersey?: { id: string, name: string, price: number, imageUrl: string };
    shorts?: { id: string, name: string, price: number, imageUrl: string };
    socks?: { id: string, name: string, price: number, imageUrl: string };
  };
  customization: {
    name: string;
    number: string;
  };
  setStep: (step: number) => void;
  setSport: (sport: string) => void;
  setItem: (type: 'jersey' | 'shorts' | 'socks', item: any) => void;
  setCustomization: (key: 'name' | 'number', value: string) => void;
  getTotalPrice: () => number;
}

export const useKitBuilderStore = create<KitState>((set, get) => ({
  step: 1,
  sport: '',
  items: {},
  customization: { name: '', number: '' },
  setStep: (step) => set({ step }),
  setSport: (sport) => set({ sport, step: 2 }),
  setItem: (type, item) => set((state) => ({ items: { ...state.items, [type]: item } })),
  setCustomization: (key, value) => set((state) => ({ customization: { ...state.customization, [key]: value } })),
  getTotalPrice: () => {
    const { items, customization } = get();
    let total = 0;
    if (items.jersey) total += items.jersey.price;
    if (items.shorts) total += items.shorts.price;
    if (items.socks) total += items.socks.price;
    if (customization.name || customization.number) total += 50; // AED 50 for custom print
    return total;
  }
}));
