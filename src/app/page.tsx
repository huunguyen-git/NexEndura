import HeroSection from '@/components/home/HeroSection';
import BenefitBento from '@/components/home/BenefitBento';
import FeaturedReel from '@/components/home/FeaturedReel';
import PerformanceTracker from '@/components/home/PerformanceTracker';
import InteractiveSportList from '@/components/home/InteractiveSportList';
import AthleteTestimonials from '@/components/home/AthleteTestimonials';
import PreFooterManifesto from '@/components/home/PreFooterManifesto';
import { getProducts } from '@/lib/products';
import { Product, products as fallbackProducts } from '@/data/products';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: Product[] = [];
  try {
    const fetched = await getProducts();
    if (fetched && fetched.length > 0) {
      products = fetched;
    }
  } catch (err) {
    console.error('Error loading products for homepage:', err);
  }

  if (!products || products.length === 0) {
    products = fallbackProducts;
  }

  return (
    <div className="w-full bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px] space-y-4 md:space-y-6">
        <HeroSection />
        <BenefitBento />
        <FeaturedReel products={products} />
        <PerformanceTracker />
        <InteractiveSportList />
        <AthleteTestimonials />
        <PreFooterManifesto />
      </div>
    </div>
  );
}
