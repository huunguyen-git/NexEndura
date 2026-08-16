'use client';

import { X } from 'lucide-react';
import { useFilterStore } from '@/stores/useFilterStore';

export default function ActiveFilters() {
  const { activeFilters, setFilter, clearFilters } = useFilterStore();
  
  const filtersList = Object.entries(activeFilters).map(([key, value]) => ({ key, value }));

  if (filtersList.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-gray-500 mr-2">Active Filters:</span>
      {filtersList.map((filter) => (
        <span 
          key={filter.key} 
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
        >
          {filter.value}
          <button 
            onClick={() => setFilter(filter.key, filter.value)} // toggles it off
            className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button 
        onClick={clearFilters}
        className="text-sm text-gray-500 hover:text-gray-900 underline ml-2 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
