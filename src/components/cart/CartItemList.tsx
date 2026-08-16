'use client';

import { useCartStore } from '@/stores/useCartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartItemList() {
  const { items, updateQuantity, removeFromCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-50 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="h-10 w-10 text-gray-300" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium gear and apparel.</p>
        <Link href="/shop" className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-50">
      <h2 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">Cart Items ({items.length})</h2>
      
      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group relative overflow-hidden">
            
            {/* Image */}
            <div className="w-full sm:w-32 h-32 relative bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
              {/* Fallback styling since we can't reliably load external Unsplash domains without next.config.js setup, using standard img tag for simplicity in UI component rendering without Next Image restrictions */}
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{item.brand}</h3>
                    <Link href={`/product/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-lg font-black text-brand-primary whitespace-nowrap">
                    {(item.price * item.quantity).toFixed(2)} <span className="text-xs text-gray-500 uppercase">{item.currency}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-400">Color:</span>
                    <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: item.selectedColor }}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-400">Size:</span>
                    <span className="font-bold text-gray-800">{item.selectedSize}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-500 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                  className="text-gray-400 hover:text-red-500 flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
