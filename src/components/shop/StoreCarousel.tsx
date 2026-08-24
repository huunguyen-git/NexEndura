'use client';

import { stores } from '@/data/stores';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useFilterStore } from '@/stores/useFilterStore';
import { useRouter } from 'next/navigation';

export default function StoreCarousel() {
  const router = useRouter();

  const handleStoreClick = (storeId: string) => {
    router.push(`/store/${storeId}`);
  };

  // Select the top 6 premium brands to display
  const topBrandNames = ['Nike', 'Adidas', 'Jordan', 'Under Armour', 'Puma', 'ASICS'];
  const topStores = stores.filter(store => topBrandNames.includes(store.name));

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Top Brands</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {topStores.map((store) => (
          <div 
            key={store.id} 
            onClick={() => handleStoreClick(store.id)}
            className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border border-gray-100 overflow-hidden shrink-0 shadow-sm relative group-hover:scale-105 transition-transform p-2.5">
                <img src={store.logoUrl} alt={store.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{store.name}</h3>
              <div className="flex items-center gap-1 text-sm text-yellow-500">
                {'★'.repeat(5)} <span className="text-gray-500 text-xs ml-1 font-medium">({(store.reviews / 1000).toFixed(1)}k reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={() => router.push('/brands')}
          className="px-6 py-2.5 rounded-full border-2 border-gray-200 text-gray-700 font-bold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2"
        >
          View All Brands <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
