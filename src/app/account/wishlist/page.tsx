'use client';

import { getProducts } from '@/lib/products';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { HeartCrack, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WishlistPage() {
  const { itemIds } = useWishlistStore();
  const { convertPrice } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // Fetch products client-side to avoid mixing async server logic with client hooks
  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const savedProducts = products.filter(p => itemIds.includes(p.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">My Wishlist</h1>
      
      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block">
              <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/5] relative bg-gray-50 overflow-hidden">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.comparePrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                      Sale
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="text-sm font-bold text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold text-gray-900 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-gray-900">{convertPrice(product.price).valueFormatted} <span className="text-sm font-normal text-gray-500 uppercase">{convertPrice(product.price).currency}</span></span>
                      {product.comparePrice && (
                        <span className="text-sm font-medium text-gray-400 line-through">
                          {convertPrice(product.comparePrice).valueFormatted} <span className="text-xs uppercase">{convertPrice(product.comparePrice).currency}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartCrack className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Explore our collections and save your favorite items.</p>
          <Link 
            href="/shop"
            className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
