import React from 'react';
import { Currency } from '@/stores/useCurrencyStore';

const FLAG_CODES: Record<Currency, string> = {
  AED: 'ae',
  USD: 'us',
  EUR: 'eu',
  GBP: 'gb',
};

export default function CountryFlag({ currency, className = 'w-4 h-4' }: { currency: Currency; className?: string }) {
  const code = FLAG_CODES[currency] || 'ae';
  
  return (
    <img 
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={`${currency} Flag`}
      className={`${className} rounded-full object-cover shrink-0 shadow-xs border border-gray-100`}
      loading="lazy"
    />
  );
}
