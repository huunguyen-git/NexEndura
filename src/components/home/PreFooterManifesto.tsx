'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function PreFooterManifesto() {
  return (
    <section className="w-full pt-8 pb-12 overflow-hidden">
      <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-7 md:p-14 shadow-card border border-slate-100/80 relative overflow-hidden">
        
        {/* Top Grid: Promo Card + Headline & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Explore More Mini Card */}
          <div className="lg:col-span-3">
            <Link
              href="/shop"
              className="group block relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-orange-600 to-amber-700 p-5 text-white shadow-lg"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=600&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white border border-white/20 w-fit">
                  <Sparkles className="w-3 h-3 text-[#ff5a22]" /> New Experience
                </span>

                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Explore <br /> More
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Big Headline, Feature Badges & Direct Links */}
          <div className="lg:col-span-9 flex flex-col justify-between space-y-8">
            
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.08] max-w-2xl">
                We're doing everything for future healthiness & performance.
              </h2>

              {/* Feature Chips */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-gray-800">
                  <Zap className="w-3.5 h-3.5 text-[#ff5a22]" />
                  Trainer & Coach Access
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-gray-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Priority Event Drops
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-gray-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Certified Athlete Badges
                </span>
              </div>
            </div>

            {/* Middle Nav & Social Split */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-800">
                <Link href="/shop" className="hover:text-[#ff5a22] transition-colors">Shop Catalog</Link>
                <Link href="/kit-builder" className="hover:text-[#ff5a22] transition-colors">Kit Builder</Link>
                <Link href="/account" className="hover:text-[#ff5a22] transition-colors">Athlete Hub</Link>
                <Link href="/shop/football" className="hover:text-[#ff5a22] transition-colors">Match Gear</Link>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/shop"
                  className="w-14 h-14 rounded-full bg-[#ff5a22] hover:bg-[#ff4500] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#ff5a22]/30 transition-all group"
                  aria-label="Start Shopping"
                >
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* City Locations & Contact Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-500 pt-4">
              <p>Dubai — UAE &nbsp;•&nbsp; London — UK &nbsp;•&nbsp; New York — USA</p>
              <p className="font-mono text-gray-700">hello@nexendura.com &nbsp;•&nbsp; © 2026 NexEndura</p>
            </div>

          </div>

        </div>

        {/* Bottom Giant Brand Watermark Bleed */}
        <div className="w-full overflow-hidden select-none pointer-events-none pt-12 -mb-8">
          <div className="text-7xl sm:text-9xl md:text-[13rem] font-black tracking-tighter text-slate-100 leading-none whitespace-nowrap text-center">
            NexEndura
          </div>
        </div>

      </div>
    </section>
  );
}
