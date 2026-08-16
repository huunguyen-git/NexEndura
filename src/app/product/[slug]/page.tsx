import ProductGallery from '@/components/shop/ProductGallery';
import ProductInfo from '@/components/shop/ProductInfo';
import Product3DViewer from '@/components/shop/Product3DViewer';
import ProductDetailsAccordion from '@/components/shop/ProductDetailsAccordion';
import { getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import BreadcrumbNav from '@/components/shop/BreadcrumbNav';
import RecentlyViewed from '@/components/shop/RecentlyViewed';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const products = await getProducts();
  const product = products.find(p => p.id === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/shop/${product.category}` },
    { label: product.name }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1400px]">
      <BreadcrumbNav items={breadcrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Media */}
        <div className="space-y-6">
          <ProductGallery mainImage={product.imageUrl} />
          <Product3DViewer />
        </div>

        {/* Right Column: Info & Actions */}
        <div className="space-y-8">
          <ProductInfo product={product} />
          <ProductDetailsAccordion product={product} />
        </div>
      </div>

      <RecentlyViewed currentProductId={product.id} />
    </div>
  );
}
