'use client';

import { useCurrencyStore } from '@/stores/useCurrencyStore';

export default function ClientPriceDisplay({ amount, className }: { amount: number; className?: string }) {
  const { convertPrice } = useCurrencyStore();
  const cPrice = convertPrice(amount);

  return (
    <span className={className}>
      {cPrice.valueFormatted} <span className="text-[0.75em] uppercase">{cPrice.currency}</span>
    </span>
  );
}
