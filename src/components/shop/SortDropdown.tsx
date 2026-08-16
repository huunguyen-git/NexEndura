'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useFilterStore } from '@/stores/useFilterStore';

const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'newest', label: 'New Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { sortBy, setSortBy } = useFilterStore();

  const selected = sortOptions.find(o => o.id === sortBy) || sortOptions[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sort by: {selected.label} <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
          {sortOptions.map(option => (
            <button
              key={option.id}
              onClick={() => {
                setSortBy(option.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
            >
              {option.label}
              {selected.id === option.id && <Check className="h-4 w-4 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
