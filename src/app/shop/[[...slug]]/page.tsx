import BreadcrumbNav from '@/components/shop/BreadcrumbNav';
import FilterBar from '@/components/shop/FilterBar';
import ActiveFilters from '@/components/shop/ActiveFilters';
import ProductGrid from '@/components/shop/ProductGrid';
import StoreCarousel from '@/components/shop/StoreCarousel';
import { getProducts } from '@/lib/products';

export default async function ShopPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  const products = await getProducts();
  
  const sport = slug[0];
  const category = slug[1];

  // Construct breadcrumbs
  const breadcrumbs = [];
  if (sport) {
    breadcrumbs.push({ label: sport.charAt(0).toUpperCase() + sport.slice(1), href: `/shop/${sport}` });
  }
  if (category) {
    breadcrumbs.push({ label: category.charAt(0).toUpperCase() + category.slice(1) });
  }
  if (breadcrumbs.length === 0) {
    breadcrumbs.push({ label: 'All Sports' });
  }

  return (
    <div className="w-full">
      {/* Optional Store Carousel for root /shop */}
      {!sport && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 mb-6">
          <div className="container mx-auto px-4 py-8 max-w-[1400px]">
             <StoreCarousel />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-[1400px]">
        
        <BreadcrumbNav items={breadcrumbs} />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-4 md:mb-0 uppercase">
            {category || sport || 'All Gear'}
          </h1>
        </div>

        {/* Main Content Area - White Card */}
        <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
          <FilterBar />
          
          <ActiveFilters />

          <div className="mt-8">
            <ProductGrid initialProducts={products} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
