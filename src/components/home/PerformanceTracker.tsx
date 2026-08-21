'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Flame, Droplets, Shirt, ThumbsUp, Activity, Sparkles, TrendingUp } from 'lucide-react';

export default function PerformanceTracker() {
  return (
    <section className="w-full py-6">
      <div className="bg-white rounded-[2.5rem] p-7 md:p-12 shadow-card border border-slate-100/80">
        
        {/* Top Header Tag */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span className="w-2 h-2 rounded-full bg-[#ff5a22]" />
          Featured Features
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mt-3 leading-[1.1]">
          Stay motivated with activity <span className="inline-block hover:scale-110 transition-transform cursor-pointer">🏃</span> tracking.
        </h2>

        {/* 2-Column Showcase */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Backdrop with Floating Metric Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-6 flex items-center justify-center shadow-xl">
              
              {/* Background Texture / Photo */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop')`,
                }}
              />

              {/* Floating Activity Glass Card */}
              <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
                
                {/* Metric Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5a22] animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Activity Telemetry</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#ff5a22] text-[11px] font-black">
                    ● 87% Peak
                  </span>
                </div>

                {/* Big Number */}
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">2,780</span>
                    <span className="text-sm font-bold text-gray-500">Cal</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    You improved overall output and endurance power
                  </p>
                </div>

                {/* SVG Progress Curve Graphic */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="h-14 w-full flex items-end gap-1.5 pt-2">
                    <div className="w-1/12 bg-orange-100 rounded-t h-[40%]" />
                    <div className="w-1/12 bg-orange-200 rounded-t h-[55%]" />
                    <div className="w-1/12 bg-orange-200 rounded-t h-[45%]" />
                    <div className="w-1/12 bg-orange-300 rounded-t h-[70%]" />
                    <div className="w-1/12 bg-orange-300 rounded-t h-[60%]" />
                    <div className="w-1/12 bg-[#ff5a22] rounded-t h-[95%]" />
                    <div className="w-1/12 bg-orange-400 rounded-t h-[80%]" />
                    <div className="w-1/12 bg-orange-300 rounded-t h-[75%]" />
                    <div className="w-1/12 bg-orange-200 rounded-t h-[60%]" />
                    <div className="w-1/12 bg-orange-100 rounded-t h-[50%]" />
                    <div className="w-1/12 bg-orange-100 rounded-t h-[40%]" />
                    <div className="w-1/12 bg-orange-200 rounded-t h-[65%]" />
                  </div>
                </div>

                {/* Sub-Metric 3 Columns */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Walking</p>
                    <p className="text-sm font-black text-gray-800 mt-0.5">127 <span className="text-[10px] font-normal text-gray-500">Cal</span></p>
                  </div>
                  <div className="p-2 rounded-xl bg-orange-50/70 border border-orange-200/60">
                    <p className="text-[10px] font-bold text-[#ff5a22] uppercase">Running</p>
                    <p className="text-sm font-black text-[#ff5a22] mt-0.5">386 <span className="text-[10px] font-normal text-[#ff5a22]">Cal</span></p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Workout</p>
                    <p className="text-sm font-black text-gray-800 mt-0.5">249 <span className="text-[10px] font-normal text-gray-500">Cal</span></p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Icon Row, Description & CTA button */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:pl-4">
            
            {/* Feature Icon Row */}
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-gray-800 shadow-sm">
                <Droplets className="w-5 h-5 text-blue-500" />
              </span>
              <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-gray-800 shadow-sm">
                <Shirt className="w-5 h-5 text-purple-500" />
              </span>
              <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-gray-800 shadow-sm">
                <ThumbsUp className="w-5 h-5 text-emerald-500" />
              </span>
              <span className="px-3.5 py-2.5 rounded-full bg-[#ff5a22] text-white font-bold text-xs shadow-md">
                8+ Sensors
              </span>
            </div>

            {/* Content & Engine Badge */}
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                Record — activities to boost your performance and precision gear calibration.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#ff5a22] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                POWERED BY NEX-CORE TELEMETRY
              </div>
            </div>

            {/* Split Action: Circular Button & Coming Soon Mini Card */}
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Circular Action */}
              <Link
                href="/shop"
                className="group flex items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-[#ff5a22] group-hover:bg-[#ff4500] flex items-center justify-center text-white shadow-lg shadow-[#ff5a22]/30 group-hover:scale-105 active:scale-95 transition-all">
                  <ArrowUpRight className="w-7 h-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-900">Explore</p>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-900">More</p>
                </div>
              </Link>

              {/* Coming Soon Mini Card */}
              <div className="flex-1 min-w-[200px] relative rounded-2xl overflow-hidden bg-slate-900 text-white p-3.5 flex items-center gap-3.5 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop"
                  alt="Training Boost"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">● 2026 Edition</span>
                  <p className="text-xs font-bold text-white leading-tight mt-0.5">Mood & Output Boost</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
