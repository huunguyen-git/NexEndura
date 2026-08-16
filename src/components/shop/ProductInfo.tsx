'use client';

import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import SizeFitPredictor from './SizeFitPredictor';

export default function ProductInfo({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);
  const [flyingItem, setFlyingItem] = useState<{ id: number, x: number, y: number } | null>(null);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const addToCart = useCartStore((state) => state.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  
  const isWished = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    if (isAdding) return;
    setIsAdding(true);
    
    // Start flying animation from button position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setFlyingItem({
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });

    // Actually add to cart right when it visually 'hits' the cart (approx 600ms)
    setTimeout(() => {
      addToCart(product, selectedColor, selectedSize, 1);
    }, 600);

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <>
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-50">
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{product.brand}</h2>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">{product.name}</h1>
        
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-blue-600">
            {product.price.toFixed(2)} <span className="text-lg font-medium text-gray-500 uppercase">{product.currency}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5} />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2 font-medium">{product.rating} ({product.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 my-6" />

      {/* Colors */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Select Color</h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color }}
            >
               {selectedColor === color && (
                 <Check className={`h-5 w-5 ${color === '#ffffff' ? 'text-gray-900' : 'text-white'}`} />
               )}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Select Size</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline">Size Guide</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                selectedSize === size 
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <SizeFitPredictor />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isAdding ? (
            <>
               <Check className="h-6 w-6" /> Added to Cart
            </>
          ) : (
            <>
               <ShoppingBag className="h-6 w-6" /> Add to Cart
            </>
          )}
        </button>
        <button 
          onClick={() => toggleWishlist(product.id)}
          className={`h-[60px] w-[60px] shrink-0 border rounded-2xl flex items-center justify-center transition-all ${
            isWished 
              ? 'bg-red-50 border-red-200 text-red-500' 
              : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50'
          }`}
        >
          <Heart className="h-6 w-6" fill={isWished ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="mt-6 flex items-center gap-2 text-sm text-green-600 font-medium">
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        In Stock - Ships within 24 hours
      </div>
    </div>
    
    {flyingItem && (
      <FlyingImage 
        src={product.imageUrl} 
        startX={flyingItem.x} 
        startY={flyingItem.y} 
        onComplete={() => setFlyingItem(null)} 
      />
    )}
    </>
  );
}

function FlyingImage({ src, startX, startY, onComplete }: { src: string, startX: number, startY: number, onComplete: () => void }) {
  const [position, setPosition] = useState({ x: startX, y: startY, scale: 1, opacity: 1 });

  useEffect(() => {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      const targetRect = cartIcon.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      // Start flight shortly after mount
      const flightTimer = setTimeout(() => {
        setPosition({ x: targetX, y: targetY, scale: 0.1, opacity: 0.3 });
      }, 50);

      // Clean up after flight
      const cleanupTimer = setTimeout(() => {
        onComplete();
      }, 700);

      return () => {
        clearTimeout(flightTimer);
        clearTimeout(cleanupTimer);
      };
    } else {
      onComplete();
    }
  }, [startX, startY, onComplete]);

  return (
    <img 
      src={src} 
      alt="Flying product"
      className="fixed z-[9999] w-24 h-24 object-cover rounded-xl shadow-2xl pointer-events-none transition-all duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: `translate(-50%, -50%) scale(${position.scale})`,
        opacity: position.opacity
      }}
    />
  );
}

