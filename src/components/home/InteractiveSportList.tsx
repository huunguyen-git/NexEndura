'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Shield, Cpu, Zap } from 'lucide-react';

interface DisciplineItem {
  id: string;
  title: string;
  sportSlug: string;
  tags: string[];
  imageUrl: string;
  tagline: string;
}

const disciplines: DisciplineItem[] = [
  {
    id: 'football',
    title: 'Pro Football Cleats & Matchwear',
    sportSlug: 'football',
    tags: ['Carbon-Fiber Plate', 'GripLock Outsole', 'Anti-Clog Studs'],
    imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop',
    tagline: 'Engineered for explosive acceleration and high-torque agility on all pitches.',
  },
  {
    id: 'basketball',
    title: 'High-Tension Basketball Performance',
    sportSlug: 'basketball',
    tags: ['Zoom Air Cells', 'Ankle Lock Stabilizer', 'High-Traction Grip'],
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop',
    tagline: 'Maximum rebound return and lateral containment for rapid transitions.',
  },
  {
    id: 'running',
    title: 'Ultralight Carbon Running Systems',
    sportSlug: 'running',
    tags: ['185g Featherweight', 'Propulsion Wave', 'Adaptive Foam'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    tagline: 'Continuous energy return scientifically calibrated for distance runners.',
  },
  {
    id: 'tennis',
    title: 'Precision Engineered Court Rackets',
    sportSlug: 'tennis',
    tags: ['High-Modulus Graphite', 'Spin Vector Tech', 'Shock Dampener'],
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop',
    tagline: 'Surgical accuracy and aerodynamic swing velocity on clay and hard courts.',
  },
  {
    id: 'gym-fitness',
    title: 'High-Intensity Training & Compression',
    sportSlug: 'gym-fitness',
    tags: ['4-Way HyperStretch', 'Moisture-Vent Knit', 'Reinforced Seams'],
    imageUrl: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop',
    tagline: 'Thermal regulation and zero-abrasion fit for heavy lifting and endurance.',
  },
];

export default function InteractiveSportList() {
  const [activeId, setActiveId] = useState<string>('football');

  return (
    <section className="w-full py-8">
      <div className="bg-black text-white rounded-[2.5rem] p-7 md:p-14 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5a22]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Tag */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#ff5a22] animate-pulse" />
          Current Disciplines & Innovations
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white mt-4 max-w-3xl leading-[1.1]">
          To win over <span className="inline-block">🎾</span> sports-minded athletes with products of our own technology and excellence.
        </h2>

        {/* Interactive List Container */}
        <div className="mt-12 space-y-3">
          {disciplines.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                className="transition-all duration-300"
              >
                {isActive ? (
                  /* Active Expanded Orange Pill Card */
                  <motion.div
                    layoutId="activeDisciplineCard"
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="w-full bg-[#ff5a22] text-white rounded-3xl p-5 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden"
                  >
                    {/* Left: Title, Tagline & Specs */}
                    <div className="max-w-xl space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/90 font-medium mt-1.5">
                          {item.tagline}
                        </p>
                      </div>

                      {/* Tag Badges */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide"
                          >
                            <Sparkles className="w-3 h-3 text-white/80" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Floating Product Image + Action Button */}
                    <div className="flex items-center gap-4 self-end md:self-center">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-2 shadow-inner border border-white/20">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      <Link
                        href={`/shop/${item.sportSlug}`}
                        className="w-14 h-14 rounded-full bg-white text-gray-900 hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-transform"
                        aria-label={`View ${item.title}`}
                      >
                        <ArrowUpRight className="w-6 h-6 text-gray-900" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  /* Inactive Collapsed Row */
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className="w-full flex items-center justify-between px-6 py-5 rounded-2xl hover:bg-white/5 border-b border-white/10 text-left transition-colors group cursor-pointer"
                  >
                    <span className="text-lg sm:text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
