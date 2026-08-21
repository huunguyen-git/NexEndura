import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP';

interface CurrencyState {
  activeCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInAED: number) => { value: number; valueFormatted: string; currency: Currency };
}

const EXCHANGE_RATES: Record<Currency, number> = {
  AED: 1,
  USD: 0.27,
  EUR: 0.25,
  GBP: 0.21,
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      activeCurrency: 'AED',
      setCurrency: (currency) => set({ activeCurrency: currency }),
      convertPrice: (priceInAED: number) => {
        const { activeCurrency } = get();
        const rate = EXCHANGE_RATES[activeCurrency] || 1;
        const convertedValue = priceInAED * rate;
        
        return {
          value: convertedValue,
          valueFormatted: convertedValue.toFixed(2),
          currency: activeCurrency
        };
      },
    }),
    {
      name: 'nexendura-currency-storage',
    }
  )
);
