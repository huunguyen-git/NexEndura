'use client';

import { useFilterStore } from '@/stores/useFilterStore';
import { Search, X, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchModal() {
  const { isSearchModalOpen, closeSearchModal, searchQuery, setSearchQuery } = useFilterStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    closeSearchModal();
    router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <form onSubmit={handleSearch} className="relative border-b border-gray-100">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Sparkles className="h-6 w-6 text-blue-500" />
          </div>
          <input 
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for gear, brands, or sports..."
            className="w-full pl-14 pr-16 py-6 text-xl bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
          />
          <button 
            type="button"
            onClick={closeSearchModal}
            className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </form>
        
        <div className="p-6 bg-gray-50/50">
          <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4">Trending Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['Nike Phantom', 'Running Shoes', 'Winter Jackets', 'Tennis Rackets', 'Basketballs'].map((term) => (
              <button 
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  closeSearchModal();
                  router.push(`/shop?q=${encodeURIComponent(term)}`);
                }}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
