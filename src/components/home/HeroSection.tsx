'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ChevronRight, Zap } from 'lucide-react';

const sports = [
  { name: 'Football', icon: '⚽', slug: 'football', count: '14 Items' },
  { name: 'Basketball', icon: '🏀', slug: 'basketball', count: '10 Items' },
  { name: 'Running', icon: '🏃', slug: 'running', count: '12 Items' },
  { name: 'Tennis', icon: '🎾', slug: 'tennis', count: '8 Items' },
  { name: 'Gym & Fitness', icon: '🏋️', slug: 'gym-fitness', count: '16 Items' },
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-2 pb-6">
      {/* Main Curved Hero Banner Container */}
      <div className="relative w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#0c2438] via-[#0e3b5e] to-[#12588b] text-white shadow-2xl min-h-[560px] md:min-h-[640px] flex flex-col justify-between p-6 sm:p-8 md:p-14">
        
        {/* Background Visual Elements */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />

        {/* Ambient Glows & Court Markings Accent */}
        <div className="absolute -right-20 -top-20 w-[450px] h-[450px] bg-[#ff5a22]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-[#00d2ff]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Tennis/Basketball Court Orange Accent Line */}
        <div className="absolute bottom-0 right-0 w-3/4 h-[380px] border-l-4 border-t-4 border-[#ff6b35]/60 rounded-tl-[120px] pointer-events-none transform translate-x-12 translate-y-12 rotate-[-6deg] opacity-60" />

        {/* 3D-Like Basketball/Sports Ball Floating Accent */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-20px] md:right-12 top-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] pointer-events-none select-none z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop"
            alt="NexEndura Performance Ball"
            className="w-full h-full object-cover rounded-full shadow-2xl ring-4 ring-white/10"
          />
        </motion.div>

        {/* Top Header Row in Banner */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#ff5a22] animate-pulse" />
            Custom Performance & Gear
          </div>

          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-white/80 hover:text-white transition-colors group"
          >
            Explore Catalog
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Center Content & Headlines */}
        <div className="relative z-20 max-w-2xl my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              A new species <br />
              of sportainment.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 flex items-center gap-3 flex-wrap"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-xs sm:text-sm font-medium text-white/90">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a22]" />
              Improve your health — performance well
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ff5a22] hover:bg-[#ff4500] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#ff5a22]/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/kit-builder"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-[#ff5a22]" />
              <span>Custom Kit Builder</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Giant Brand Watermark Bleed */}
        <div className="relative z-10 w-full overflow-hidden select-none pointer-events-none pt-4">
          <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-white/10 leading-none whitespace-nowrap">
            NexEndura
          </div>
        </div>
      </div>

      {/* Quick Sport Selector Strip Below Hero */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {sports.map((sport) => (
          <Link
            key={sport.slug}
            href={`/shop/${sport.slug}`}
            className="group flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-900 border border-slate-100 hover:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl group-hover:scale-110 transition-transform">
                {sport.icon}
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-white transition-colors">
                  {sport.name}
                </p>
                <p className="text-[10px] text-gray-500 group-hover:text-gray-400">
                  {sport.count}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#ff5a22] group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}
