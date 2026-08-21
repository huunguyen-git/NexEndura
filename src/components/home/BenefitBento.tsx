'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Zap, ShieldCheck, Shirt, Trophy } from 'lucide-react';

export default function BenefitBento() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('connections');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Bento Card - The Benefit & Accordions */}
        <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-7 md:p-10 shadow-card border border-slate-100/80 flex flex-col justify-between">
          <div>
            {/* Top Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              The Benefit
            </div>

            {/* Headline with emoji accent */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mt-4 leading-[1.1]">
              Explore <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">🥑</span> our <br className="hidden sm:inline" />
              flexible of activity.
            </h2>

            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-700">
                <Trophy className="w-3.5 h-3.5 text-[#ff5a22]" />
                Post-Match Recovery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-700">
                <Shirt className="w-3.5 h-3.5 text-blue-600" />
                Pro Game Jersey
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-gray-700">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Carbon Plate Speed
              </span>
            </div>
          </div>

          {/* Collapsible Accordion Group */}
          <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
            
            {/* Accordion 1 */}
            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion('connections')}
                className="w-full flex items-center justify-between text-left py-2 font-bold text-gray-900 hover:text-[#ff5a22] transition-colors"
              >
                <span className="text-lg">Connections</span>
                <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-gray-700">
                  {openAccordion === 'connections' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {openAccordion === 'connections' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed pt-2 pb-2">
                      Built to connect — with people, purpose, and the momentum that moves you forward. Our gear bridges athlete performance with high-density data telemetry.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2 */}
            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion('packages')}
                className="w-full flex items-center justify-between text-left py-2 font-bold text-gray-900 hover:text-[#ff5a22] transition-colors"
              >
                <span className="text-lg">Sport Package & Bundles</span>
                <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-gray-700">
                  {openAccordion === 'packages' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {openAccordion === 'packages' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed pt-2 pb-2">
                      Curated match-ready bundles for clubs and individuals. Auto-calculated tier discounts and synchronized gear bags ready for competition.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3 */}
            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion('propulsion')}
                className="w-full flex items-center justify-between text-left py-2 font-bold text-gray-900 hover:text-[#ff5a22] transition-colors"
              >
                <span className="text-lg">Propulsion Lab Materials</span>
                <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-gray-700">
                  {openAccordion === 'propulsion' ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {openAccordion === 'propulsion' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed pt-2 pb-2">
                      Aerospace graphite weave, thermo-adaptive moisture knit, and shock-dispersion elastomers calibrated for continuous high-impact training.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Right Bento Card - Visionary Precision Play + Tennis Drop Graphic */}
        <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-7 md:p-10 shadow-card border border-slate-100/80 flex flex-col justify-between">
          <div>
            {/* Top Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#ff5a22]" />
              EST — 2024
            </div>

            {/* Descriptor */}
            <p className="text-base text-gray-600 mt-3 max-w-md font-medium leading-relaxed">
              Smart features designed to move with you — fast, flexible, and built for everyday action and high-stakes performance.
            </p>
          </div>

          {/* Visual Showcase Split */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            
            {/* Left Col: Visionary Title & CTA */}
            <div className="sm:col-span-6 flex flex-col justify-end space-y-5 pb-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                  Visionary <br />
                  Precision Play
                </h3>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-black hover:bg-gray-800 text-white font-bold text-sm tracking-wide group transition-all duration-200"
              >
                <span>Join Now!</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Col: Graphic Card (Tennis Court / Sale Card) */}
            <div className="sm:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-700 to-red-800 p-5 text-white aspect-[4/5] flex flex-col justify-between group">
                
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-end">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase text-white border border-white/20">
                    ⚡ Season Drop
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 text-gray-900 shadow-lg">
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mb-1">
                    <span>Tennis & Court</span>
                    <span className="text-[#ff5a22] font-bold">Pro Member</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-gray-900">86%</span>
                      <span className="text-xs text-gray-500 ml-1">Speed Rating</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#ff5a22] px-2.5 py-1 rounded-lg">
                      <Zap className="w-3 h-3" /> Boost
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
