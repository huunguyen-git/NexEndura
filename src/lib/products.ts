'use server';

import { createClient } from '@/lib/supabase/server';
import { Product } from '@/data/products';

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(slug),
      variants:product_variants(color_hex)
    `);

  if (error || !dbProducts) {
    console.error('Failed to fetch products', error ? JSON.stringify(error) : 'dbProducts is null');
    return [];
  }

  return dbProducts.map((p: any) => {
    let images = p.images;
    if (typeof images === 'string') {
      try {
        images = JSON.parse(images);
      } catch (e) {
        images = [];
      }
    }
    
    const imageUrl = images && images.length > 0 ? images[0].url : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop';
    
    const colors = p.variants ? Array.from(new Set(p.variants.map((v: any) => v.color_hex))) : [];

    return {
      id: p.slug, // We map slug to ID so existing UI links (like /product/[id]) continue to work
      name: p.name,
      brand: p.brand,
      price: p.price,
      currency: 'AED',
      rating: 4.5 + (Math.random() * 0.5), // Mock rating
      reviews: Math.floor(Math.random() * 300) + 20, // Mock reviews
      imageUrl: imageUrl,
      category: p.category?.slug || 'other',
      isFavorite: false,
      colors: colors as string[],
      isNew: Math.random() > 0.7,
    };
  });
}
