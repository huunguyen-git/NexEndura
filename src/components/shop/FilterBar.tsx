'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { filterOptions } from '@/data/categories';
import { useFilterStore } from '@/stores/useFilterStore';

const filters = [
  { name: 'Category', options: ['Football', 'Basketball', 'Running', 'Tennis'] },
  { name: 'Rating', options: filterOptions.ratings },
  { name: 'Gender', options: filterOptions.genders },
  { name: 'Price', options: ['Under 100 AED', '100 - 300 AED', 'Over 300 AED'] },
  { name: 'Order by', options: ['Recommended', 'Newest', 'Price: Low to High', 'Price: High to Low'] }
];

export default function FilterBar() {
  const { activeFilters, setFilter } = useFilterStore();
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const selectOption = (filterName: string, option: string) => {
    setFilter(filterName, option);
    setOpenFilter(null);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 mb-4">
      {filters.map((filter) => {
        const isActive = activeFilters[filter.name];
        return (
          <div key={filter.name} className="relative">
            <button 
              onClick={() => toggleFilter(filter.name)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-transparent'
              }`}
            >
              {filter.name} {isActive && `: ${isActive}`}
              <ChevronDown className={`h-4 w-4 transition-transform ${openFilter === filter.name ? 'rotate-180' : ''}`} />
            </button>
            
            {openFilter === filter.name && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                {filter.options.map(option => (
                  <button
                    key={option}
                    onClick={() => selectOption(filter.name, option)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                  >
                    {option}
                    {activeFilters[filter.name] === option && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
