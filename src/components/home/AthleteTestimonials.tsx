'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Star, Award, Shirt } from 'lucide-react';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

const testimonials = [
  {
    id: 1,
    quote: "The NexEndura carbon footwear and kit builder gave our track club a decisive edge this season. The lightweight responsiveness is unmatched.",
    name: "Marcus Vance",
    role: "Semi-Pro Track & Field Athlete",
    rating: 4.9,
    discipline: "Running & Sprinting",
  },
  {
    id: 2,
    quote: "Precision grip on wet turf and zero blisters straight out of the box. NexEndura sets a new benchmark for match-day engineering.",
    name: "Elena Rostova",
    role: "National League Midfielder",
    rating: 5.0,
    discipline: "Football",
  },
  {
    id: 3,
    quote: "The telemetry tracking and compression top combination kept my shoulder stable through 5 tournament rounds. Pure technical excellence.",
    name: "David Chen",
    role: "Regional Tennis Champion",
    rating: 4.8,
    discipline: "Tennis",
  },
];

export default function AthleteTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const convertPrice = useCurrencyStore((state) => state.convertPrice);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];
  const kitPrice = convertPrice(349);

  return (
    <section className="w-full py-8">
      <div className="space-y-6">
        
        {/* Top Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Testimonial & Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mt-2 leading-[1.1]">
              What <span className="inline-block hover:scale-110 transition-transform cursor-pointer">🥑</span> people are honestly saying right now
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <span>👥</span> Customer & Athlete Voices
          </div>
        </div>

        {/* 2-Column Split: Testimonial Card + Gear Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Card: Dynamic Review Carousel Card */}
          <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-7 md:p-12 shadow-card border border-slate-100/80 flex flex-col justify-between aspect-[4/3] sm:aspect-auto">
            
            <div>
              {/* Counter Index */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-[#ff5a22]" />
                  {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-gray-700">
                  {current.discipline}
                </span>
              </div>

              {/* Animated Quote */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 sm:mt-8"
                >
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed tracking-tight">
                    "{current.quote}"
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 mt-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(current.rating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-gray-200 fill-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-black text-gray-800 ml-1">
                      {current.rating.toFixed(1)}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Author & Next Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-base font-black text-gray-900">{current.name}</p>
                <p className="text-xs text-gray-500 font-medium">{current.role}</p>
              </div>

              <button
                type="button"
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-[#ff5a22] hover:bg-[#ff4500] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#ff5a22]/30 transition-all"
                aria-label="Next review"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Right Card: Performance Training / Match-Ready Pack Card */}
          <div className="lg:col-span-6 relative rounded-[2.5rem] overflow-hidden shadow-card aspect-[4/3] sm:aspect-auto min-h-[380px] p-7 md:p-10 flex flex-col justify-between text-white group">
            
            {/* Background High-Res Sport Visual */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1000&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            {/* Top Floating Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Pro Performance
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                  <Shirt className="w-3.5 h-3.5 text-cyan-400" />
                  Official Gear
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-white/80">
                2026 EDITION
              </span>
            </div>

            {/* Center / Bottom Info */}
            <div className="relative z-10 text-center py-4">
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Single Pro Kit
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                Individualized Precision Gear & Uniform Calibration
              </p>
              <div className="mt-4">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {kitPrice.currency} {kitPrice.valueFormatted}
                </span>
                <span className="text-xs text-white/70 ml-1 font-semibold">/ Full Set</span>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Full Competition Ready</span>
              </div>

              <Link
                href="/kit-builder"
                className="w-12 h-12 rounded-full bg-white hover:bg-slate-100 text-gray-900 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                aria-label="Build Kit"
              >
                <ArrowUpRight className="w-5 h-5 text-gray-900" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
