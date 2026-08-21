import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { products as fallbackProducts } from '@/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nexendura.com';
  
  let productIds = fallbackProducts.map(p => p.id);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('products').select('id, updated_at');
      if (!error && data && data.length > 0) {
        productIds = data.map(item => item.id);
      }
    } catch {
      // Fallback to static products
    }
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kit-builder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const sports = ['football', 'basketball', 'running', 'tennis', 'gym-fitness'];
  const sportRoutes: MetadataRoute.Sitemap = sports.map((sport) => ({
    url: `${baseUrl}/shop/${sport}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = productIds.map((id) => ({
    url: `${baseUrl}/product/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...sportRoutes, ...productRoutes];
}
