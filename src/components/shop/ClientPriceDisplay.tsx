'use client';

import { useState, useEffect } from 'react';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

export default function ClientPriceDisplay({ amount, className }: { amount: number; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { convertPrice } = useCurrencyStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cPrice = convertPrice(amount);

  if (!mounted) {
    return (
      <span className={className} suppressHydrationWarning>
        {amount.toFixed(2)} <span className="text-[0.75em] uppercase font-normal text-gray-500 ml-1">AED</span>
      </span>
    );
  }

  return (
    <span className={className}>
      {cPrice.valueFormatted} <span className="text-[0.75em] uppercase font-normal text-gray-500 ml-1">{cPrice.currency}</span>
    </span>
  );
}
