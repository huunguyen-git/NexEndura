'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Radio, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartStore } from '@/stores/useCartStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

interface FeaturedReelProps {
  products: Product[];
}

export default function FeaturedReel({ products }: FeaturedReelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const convertPrice = useCurrencyStore((state) => state.convertPrice);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      product.colors?.[0] || 'Default',
      'Standard',
      1
    );
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Combine special promo cards with products for the slider
  const totalSlides = 2 + (products?.length || 0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, totalSlides - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, totalSlides - 2)) % Math.max(1, totalSlides - 2));
  };

  return (
    <section className="w-full py-8">
      <div className="bg-white rounded-[2.5rem] p-7 md:p-12 shadow-card border border-slate-100/80 overflow-hidden">
        
        {/* Top Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-gray-800 transition-colors cursor-pointer">
              🏆 Virtual Challenges
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-gray-800 transition-colors cursor-pointer">
              👥 Community Tournaments
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            The Program
          </div>
        </div>

        {/* Title & Subtitle Split */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.1] max-w-2xl">
            Elevate your <span className="inline-block">🏀</span> experience with handpicked featured.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xs font-medium">
            Your sports journey starts right here with us and the elite athlete crew.
          </p>
        </div>

        {/* Counter & Slider Control Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-base font-bold text-gray-400">
              / {String(Math.min(8, totalSlides)).padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold text-gray-500 ml-2 uppercase tracking-wider hidden sm:inline">
              Upcoming Gear & Drops
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-gray-900 transition-all shadow-sm"
              aria-label="Previous featured items"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#ff5a22] hover:bg-[#ff4500] active:scale-95 flex items-center justify-center text-white transition-all shadow-md shadow-[#ff5a22]/30"
              aria-label="Next featured items"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Reel Track */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            animate={{ x: `-${currentIndex * 320}px` }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="flex gap-6 select-none"
          >
            
            {/* Card 1: Obsidian Coach / Sportainment Card */}
            <div className="min-w-[290px] sm:min-w-[320px] max-w-[320px] rounded-[2rem] bg-black text-white p-6 flex flex-col justify-between aspect-[3/4] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                {/* Avatar Stack */}
                <div className="flex items-center -space-x-2">
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-black object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                    alt="Coach 1"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-black object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                    alt="Coach 2"
                  />
                  <img
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-black object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                    alt="Coach 3"
                  />
                </div>

                <p className="mt-6 text-xl font-bold leading-snug tracking-tight text-white/95">
                  The gear experts and simple software for better sportainment.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/90">
                  <Radio className="w-3.5 h-3.5 text-[#ff5a22] animate-pulse" />
                  Live
                </div>
                <span className="text-xs text-white/50 font-mono">nexendura.com</span>
              </div>
            </div>

            {/* Card 2: Vibrant Green Chemistry Partner Card */}
            <div className="min-w-[290px] sm:min-w-[320px] max-w-[320px] rounded-[2rem] bg-gradient-to-br from-emerald-800 to-teal-950 text-white p-6 flex flex-col justify-between aspect-[3/4] shadow-xl relative overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop')`,
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Sport Center
                </span>
                <span className="text-xs font-bold bg-white/15 px-2.5 py-1 rounded-full">
                  2.88k Members
                </span>
              </div>

              <div className="relative z-10">
                <p className="text-2xl font-black text-white tracking-tight leading-tight">
                  Chemistry <br />
                  Sports Partner
                </p>
                <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mt-2">
                  GLOBAL LAB, DUBAI & NYC
                </p>
              </div>
            </div>

            {/* Real Product Cards */}
            {products.slice(0, 6).map((product) => {
              const priceInfo = convertPrice(product.price);

              return (
                <div
                  key={product.id}
                  className="min-w-[290px] sm:min-w-[320px] max-w-[320px] rounded-[2rem] bg-slate-50 border border-slate-200/80 p-5 flex flex-col justify-between aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Product Image Box */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-white p-4 flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.isNew && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#ff5a22] text-white text-[10px] font-black uppercase tracking-wider">
                        New
                      </span>
                    )}
                    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 shadow-sm text-[11px] font-bold text-gray-800">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Info & Price */}
                  <div className="mt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      {product.brand} • {product.category}
                    </p>
                    <Link href={`/product/${product.id}`} className="block group-hover:text-[#ff5a22] transition-colors">
                      <h3 className="text-base font-bold text-gray-900 line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-gray-900">
                        {priceInfo.currency} {priceInfo.valueFormatted}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                        addedId === product.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-black hover:bg-[#ff5a22] text-white'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}

          </motion.div>
        </div>

      </div>
    </section>
  );
}
