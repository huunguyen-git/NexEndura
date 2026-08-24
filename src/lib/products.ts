'use server';

import { createClient } from '@/lib/supabase/server';
import { Product } from '@/data/products';

const CATEGORY_PHOTOS: Record<string, string[]> = {
  running: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=800&auto=format&fit=crop',
  ],
  football: [
    'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop',
  ],
  basketball: [
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=800&auto=format&fit=crop',
  ],
  tennis: [
    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1530915365347-e34b1e51b369?q=80&w=800&auto=format&fit=crop',
  ],
  'gym-fitness': [
    'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
  ]
};

function getCategoryFromText(name: string, categorySlug?: string): string {
  const text = `${name} ${categorySlug || ''}`.toLowerCase();
  if (text.includes('football') || text.includes('soccer') || text.includes('phantom') || text.includes('mercurial') || text.includes('predator') || text.includes('cleat')) return 'football';
  if (text.includes('basketball') || text.includes('jordan') || text.includes('lebron') || text.includes('court') || text.includes('dunk')) return 'basketball';
  if (text.includes('tennis') || text.includes('racket') || text.includes('vapor cage') || text.includes('wilson')) return 'tennis';
  if (text.includes('gym') || text.includes('fitness') || text.includes('training') || text.includes('mat') || text.includes('compression')) return 'gym-fitness';
  return 'running';
}

function resolveProductPhoto(rawUrl: string | undefined, name: string, categorySlug?: string, id?: string): string {
  if (rawUrl && !rawUrl.includes('placehold.co') && !rawUrl.includes('placeholder') && !rawUrl.includes('loremflickr')) {
    return rawUrl;
  }
  
  const sport = getCategoryFromText(name, categorySlug);
  const photoList = CATEGORY_PHOTOS[sport] || CATEGORY_PHOTOS['running'];
  
  // Deterministic index from string hash
  const hashKey = `${name}-${id || ''}`;
  let hash = 0;
  for (let i = 0; i < hashKey.length; i++) {
    hash = (hash << 5) - hash + hashKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % photoList.length;
  return photoList[index];
}

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
    
    const rawUrl = images && images.length > 0 ? images[0].url : undefined;
    const categorySlug = p.category?.slug || getCategoryFromText(p.name);
    const imageUrl = resolveProductPhoto(rawUrl, p.name, categorySlug, p.id);
    
    const colors = p.variants ? Array.from(new Set(p.variants.map((v: any) => v.color_hex))) : [];

    return {
      id: p.slug, // We map slug to ID so existing UI links (like /product/[id]) continue to work
      name: p.name,
      brand: p.brand,
      price: p.price,
      currency: 'AED',
      rating: 4.5 + ((p.name.length % 5) * 0.1),
      reviews: 50 + (p.name.length * 11),
      imageUrl: imageUrl,
      category: categorySlug,
      isFavorite: false,
      colors: colors as string[],
      isNew: p.name.length % 3 === 0,
    };
  });
}
