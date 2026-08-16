import { stores } from '@/data/stores';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Brands | NexEndura',
  description: 'Explore all premium sports brands available on NexEndura.',
};

export default function BrandsPage() {
  return (
    <div className="w-full bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12 max-w-[1400px]">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">All Brands</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Explore our collection of premium sports and athletic brands.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Link href={`/store/${store.id}`} key={store.id}>
              <div className="flex flex-col bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                {/* Banner */}
                <div className="h-32 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img src={store.bannerUrl} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                {/* Content */}
                <div className="p-6 relative pt-12 flex-1 flex flex-col">
                  {/* Logo */}
                  <div className="absolute -top-10 left-6 w-20 h-20 bg-white rounded-full p-1 shadow-md border border-gray-50 z-20">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src={store.logoUrl} alt={`${store.name} logo`} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{store.name}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">{store.motto}</p>
                  <p className="text-gray-600 text-sm flex-1">{store.description}</p>
                  
                  <div className="mt-6 flex items-center gap-1 text-sm text-yellow-500">
                    {'★'.repeat(5)} <span className="text-gray-500 text-xs ml-1 font-medium">({(store.reviews / 1000).toFixed(1)}k reviews)</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
