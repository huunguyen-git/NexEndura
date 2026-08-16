'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Heart, Bell, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Profile', href: '/account/profile', icon: User },
  { name: 'Orders', href: '/account/orders', icon: Package },
  { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { name: 'Notifications', href: '/account/notifications', icon: Bell },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Nav */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 font-serif">My Account</h2>
              
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-gray-900 text-white font-medium shadow-md' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-gray-300' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <form action={async () => {
                  const { useCartStore } = await import('@/stores/useCartStore');
                  const { useWishlistStore } = await import('@/stores/useWishlistStore');
                  
                  // Reset local Zustand stores BEFORE logging out so another user doesn't inherit them
                  useCartStore.setState({ items: [] });
                  useWishlistStore.setState({ itemIds: [] });
                  
                  const { logoutAction } = await import('@/app/actions/auth');
                  await logoutAction();
                }}>
                  <button type="submit" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 w-full rounded-xl transition-all font-medium text-left">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 min-h-[500px]">
              {children}
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}
