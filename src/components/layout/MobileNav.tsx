'use client';

import { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MobileNav({ user }: { user?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-blue-600"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white z-[110] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-xl font-bold tracking-tighter text-brand-primary">Menu</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-gray-900">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <Link href="/shop" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg">
            All Sports <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
          <Link href="/kit-builder" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 text-blue-600 font-bold hover:bg-blue-50 rounded-lg">
            Kit Builder <ChevronRight className="h-4 w-4 text-blue-400" />
          </Link>
          <div className="h-px bg-gray-100 my-2" />
          <Link href="/shop/football" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg">
            Football <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
          <Link href="/shop/basketball" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg">
            Basketball <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
          <Link href="/shop/running" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg">
            Running <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
          <Link href="/shop/tennis" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-3 text-gray-800 font-medium hover:bg-gray-50 rounded-lg">
            Tennis <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {user?.id ? (
            <Link href="/account" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 text-center bg-gray-900 text-white rounded-lg font-medium">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {user.user_metadata?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              My Account
            </Link>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full py-3 text-center bg-brand-primary text-white rounded-lg font-medium">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
