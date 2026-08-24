'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Store, Menu } from 'lucide-react';
import Link from 'next/link';
import { useFilterStore } from '@/stores/useFilterStore';
import { useCartStore } from '@/stores/useCartStore';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useCurrencyStore, Currency } from '@/stores/useCurrencyStore';
import MobileNav from './MobileNav';

import CountryFlag from '@/components/ui/CountryFlag';

export default function MainNav({ user }: { user?: any }) {
  const { openSearchModal } = useFilterStore();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const syncCartDb = useCartStore((state) => state.syncWithDb);
  const syncWishlistDb = useWishlistStore((state) => state.syncWithDb);
  const { activeCurrency, setCurrency } = useCurrencyStore();
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const CURRENCIES: Currency[] = ['AED', 'USD', 'EUR', 'GBP'];

  useEffect(() => {
    setMounted(true);
    if (user?.id) {
      syncCartDb();
      syncWishlistDb();
    }
  }, [user, syncCartDb, syncWishlistDb]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <div className="flex h-20 items-center justify-between gap-4 md:gap-8">
          
          <div className="flex items-center gap-4 lg:gap-8">
            <MobileNav user={user} />
            
            <Link href="/" className="flex items-center gap-2 group">
              <div className="text-2xl font-bold tracking-tighter text-brand-primary">NexEndura</div>
            </Link>
          </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-700">
          <Link href="/shop" className="hover:text-brand-primary transition-colors">Shop All</Link>
          <Link href="/brands" className="text-gray-700 hover:text-brand-primary transition-colors flex items-center gap-1.5"><Store className="w-4 h-4" /> Brands</Link>
        </nav>

        {/* Search Bar */}
        <div 
          className="hidden md:block flex-1 max-w-xl relative group cursor-text"
          onClick={openSearchModal}
        >
          <div className="w-full pl-6 pr-12 py-2.5 rounded-full border border-gray-200 bg-gray-50 group-hover:bg-white group-hover:ring-2 group-hover:ring-blue-100 transition-all text-sm font-medium shadow-inner text-gray-500 flex items-center">
            Search for gear, brands, or sports...
          </div>
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
             <button className="p-1.5 rounded-full group-hover:bg-gray-100 text-gray-500">
                <Search className="h-4 w-4" />
             </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6 text-sm font-medium text-brand-primary">

          {mounted && (
            <div className="relative">
              <button 
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 hover:bg-gray-100 hover:border-gray-300 transition-all font-bold text-gray-800 shadow-xs"
              >
                <CountryFlag currency={activeCurrency} className="w-4 h-4 shadow-xs" />
                <span className="text-xs font-black tracking-wide text-gray-900">{activeCurrency}</span> 
                <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-0.5" />
              </button>
              
              {isCountryOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {CURRENCIES.map((c) => (
                    <button 
                      key={c}
                      onClick={() => { setCurrency(c); setIsCountryOpen(false); }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 hover:bg-blue-50/60 transition-colors ${activeCurrency === c ? 'font-black text-blue-600 bg-blue-50/40' : 'font-semibold text-gray-700'}`}
                    >
                      <CountryFlag currency={c} className="w-4 h-4 shadow-xs" />
                      <span className="tracking-wide">{c}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <Link href="/cart" id="cart-icon" className="flex items-center gap-2 hover:text-blue-600 transition-colors relative">
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
          {user?.id ? (
            <div className="relative group cursor-pointer">
              <Link href="/account" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border-2 border-blue-200 group-hover:border-blue-600 group-hover:scale-110 shadow-sm transition-all">
                  {user.user_metadata?.full_name?.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
                </div>
              </Link>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 hover:text-blue-600 transition-colors bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <User className="h-4 w-4 text-gray-600" />
              <span className="hidden lg:inline font-bold">Sign In</span>
            </Link>
          )}
        </div>

        </div>
      </div>
    </header>
  );
}
