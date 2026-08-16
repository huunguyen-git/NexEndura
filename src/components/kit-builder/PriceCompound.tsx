'use client';

import { useKitBuilderStore } from '@/stores/useKitBuilderStore';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter } from 'next/navigation';

export default function PriceCompound() {
  const { getTotalPrice, items, customization, step } = useKitBuilderStore();
  const addToCart = useCartStore(state => state.addToCart);
  const router = useRouter();

  const handleAddToCart = () => {
    if (items.jersey) {
      addToCart({
        id: `kit-${Date.now()}`,
        name: `Custom ${customization.name || 'Kit'} Jersey`,
        price: getTotalPrice(),
        brand: 'Antigravity',
        imageUrl: items.jersey.imageUrl,
        category: 'kit',
        rating: 5,
        reviews: 0,
        colors: [],
        currency: 'AED',
        isFavorite: false
      }, '#000', 'M', 1);
      router.push('/cart');
    }
  };

  // Removed step < 2 restriction so it's always visible

  return (
    <div className="bg-white text-gray-900 border border-gray-100 rounded-3xl p-6 shadow-xl sticky top-24">
      <h3 className="font-bold text-lg mb-4 font-serif">Order Summary</h3>
      
      {step < 3 ? (
        <div className="text-sm text-gray-500 mb-6 text-center py-8">
          Pending final selections to calculate price.
        </div>
      ) : (
        <div className="space-y-3 mb-6 text-sm">
          {items.jersey && (
            <div className="flex justify-between">
              <span className="text-gray-500">Jersey</span>
              <span className="font-medium">AED {items.jersey.price.toFixed(2)}</span>
            </div>
          )}
          {(customization.name || customization.number) && (
            <div className="flex justify-between">
              <span className="text-gray-500">Custom Print</span>
              <span className="font-medium">AED 50.00</span>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-end">
        <span className="text-gray-500 font-medium text-sm">Total</span>
        <span className="text-2xl font-black">
          {step < 3 ? '---' : `AED ${getTotalPrice().toFixed(2)}`}
        </span>
      </div>

      <button 
        onClick={handleAddToCart}
        disabled={!items.jersey || step < 3}
        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-gray-900"
      >
        <ShoppingBag className="w-5 h-5" />
        Add Kit to Cart
      </button>
    </div>
  );
}
