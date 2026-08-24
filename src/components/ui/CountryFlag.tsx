import React from 'react';
import { Currency } from '@/stores/useCurrencyStore';

export default function CountryFlag({ currency, className = 'w-5 h-5' }: { currency: Currency; className?: string }) {
  switch (currency) {
    case 'AED':
      // United Arab Emirates Flag
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs border border-gray-100`}>
          <path fill="#00732f" d="M0 0h640v160H0z" />
          <path fill="#ffffff" d="M0 160h640v160H0z" />
          <path fill="#000000" d="M0 320h640v160H0z" />
          <path fill="#ff0000" d="M0 0h220v480H0z" />
        </svg>
      );
    case 'USD':
      // United States Flag
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs border border-gray-100`}>
          <g fillRule="evenodd">
            <path fill="#bd3d44" d="M0 0h640v480H0z" />
            <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640" />
            <path fill="#192f5d" d="M0 0h280v260H0z" />
            <g fill="#fff">
              <circle cx="40" cy="35" r="8" />
              <circle cx="100" cy="35" r="8" />
              <circle cx="160" cy="35" r="8" />
              <circle cx="220" cy="35" r="8" />
              <circle cx="70" cy="75" r="8" />
              <circle cx="130" cy="75" r="8" />
              <circle cx="190" cy="75" r="8" />
              <circle cx="40" cy="115" r="8" />
              <circle cx="100" cy="115" r="8" />
              <circle cx="160" cy="115" r="8" />
              <circle cx="220" cy="115" r="8" />
              <circle cx="70" cy="155" r="8" />
              <circle cx="130" cy="155" r="8" />
              <circle cx="190" cy="155" r="8" />
              <circle cx="40" cy="195" r="8" />
              <circle cx="100" cy="195" r="8" />
              <circle cx="160" cy="195" r="8" />
              <circle cx="220" cy="195" r="8" />
            </g>
          </g>
        </svg>
      );
    case 'EUR':
      // European Union Flag
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs border border-gray-100`}>
          <path fill="#003399" d="M0 0h640v480H0z" />
          <g fill="#ffcc00">
            <circle cx="320" cy="90" r="14" />
            <circle cx="410" cy="120" r="14" />
            <circle cx="460" cy="200" r="14" />
            <circle cx="460" cy="280" r="14" />
            <circle cx="410" cy="360" r="14" />
            <circle cx="320" cy="390" r="14" />
            <circle cx="230" cy="360" r="14" />
            <circle cx="180" cy="280" r="14" />
            <circle cx="180" cy="200" r="14" />
            <circle cx="230" cy="120" r="14" />
          </g>
        </svg>
      );
    case 'GBP':
      // United Kingdom Union Jack Flag
      return (
        <svg viewBox="0 0 640 480" className={`${className} rounded-full overflow-hidden shrink-0 shadow-xs border border-gray-100`}>
          <clipPath id="uk-clip"><path d="M0 0h640v480H0z" /></clipPath>
          <g clipPath="url(#uk-clip)">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path stroke="#fff" strokeWidth="60" d="m0 0 640 480m0-480L0 480" />
            <path stroke="#c8102e" strokeWidth="40" d="m0 0 640 480m0-480L0 480" />
            <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
            <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}
