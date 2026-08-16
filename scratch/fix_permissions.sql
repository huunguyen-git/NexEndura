-- Run this script in your Supabase SQL Editor to fix the "Failed to fetch products" error

-- 1. Grant basic read permissions to the anonymous and authenticated users
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.product_variants TO anon, authenticated;

-- (Optional) If Row Level Security (RLS) is enabled, create policies to allow public reads:
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to active products" ON public.products FOR SELECT USING (status = 'active');

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);

ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to variants" ON public.product_variants FOR SELECT USING (true);
