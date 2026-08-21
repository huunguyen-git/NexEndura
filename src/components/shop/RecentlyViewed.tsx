'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/data/products';
import { getProducts } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

export default function RecentlyViewed({ currentProductId }: { currentProductId?: string }) {
  const [viewed, setViewed] = useState<Product[]>([]);
  const { convertPrice } = useCurrencyStore();

  useEffect(() => {
    async function loadRecentlyViewed() {
      let stored = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      if (currentProductId) {
        stored = [currentProductId, ...stored.filter((id: string) => id !== currentProductId)].slice(0, 5);
        localStorage.setItem('recentlyViewed', JSON.stringify(stored));
      }

      // Fetch from Supabase via server action
      const allProducts = await getProducts();
      const items = stored
        .map((id: string) => allProducts.find(p => p.id === id))
        .filter((p: any) => p && p.id !== currentProductId) as Product[];
      
      setViewed(items);
    }
    loadRecentlyViewed();
  }, [currentProductId]);

  if (viewed.length === 0) return null;

  return (
    <div className="mt-24 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 font-serif mb-8">Recently Viewed</h3>
      <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory hide-scrollbar">
        {viewed.map(product => (
          <Link key={product.id} href={`/product/${product.id}`} className="snap-start shrink-0 w-64 group">
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-square relative bg-gray-50 overflow-hidden">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  sizes="256px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-bold text-gray-500 mb-1">{product.brand}</div>
                <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-1">{product.name}</h4>
                <div className="font-black text-gray-900">{convertPrice(product.price).valueFormatted} <span className="text-xs text-gray-500 font-normal uppercase">{convertPrice(product.price).currency}</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
