import { notFound } from 'next/navigation';
import { stores } from '@/data/stores';
import ProductGrid from '@/components/shop/ProductGrid';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { getProducts } from '@/lib/products';

export default async function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const store = stores.find(s => s.id === resolvedParams.id);

  if (!store) {
    notFound();
  }
  
  const products = await getProducts();

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img 
          src={store.bannerUrl} 
          alt={`${store.name} banner`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        {/* Floating Centered Card */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-[800px] z-10">
          <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 border border-gray-50">
            
            {/* Logo */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md bg-white">
              <img 
                src={store.logoUrl} 
                alt={`${store.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Info */}
            <div className="flex-1 text-center md:text-left md:mt-2">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">{store.name}</h1>
              <p className="text-lg text-gray-600 font-medium mb-3">{store.motto}</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-bold text-gray-900">{store.rating}</span>
                </div>
                <span className="text-gray-500">({(store.reviews / 1000).toFixed(1)}k reviews)</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* spacer for the floated card */}
      <div className="h-48 md:h-32"></div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-[1400px]">
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About {store.name}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {store.description}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shop Latest Items</h2>
          </div>
          
          <ProductGrid storeBrand={store.name} initialProducts={products} />
        </div>
      </div>
    </div>
  );
}
