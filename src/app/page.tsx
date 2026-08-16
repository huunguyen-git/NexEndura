import FilterBar from '@/components/shop/FilterBar';

import ProductGrid from '@/components/shop/ProductGrid';
import { getProducts } from '@/lib/products';

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-6 max-w-[1400px]">
        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
          <FilterBar />
          <ProductGrid initialProducts={products} />
        </div>
      </div>
    </div>
  );
}
