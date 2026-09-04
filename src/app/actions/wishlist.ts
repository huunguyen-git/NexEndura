'use server';

import { createClient } from '@/lib/supabase/server';

async function getProductId(supabase: any, productSlug: string): Promise<string | null> {
  const { data: productData } = await supabase
    .from('products')
    .select('id')
    .eq('slug', productSlug)
    .single();

  return productData ? productData.id : null;
}

export async function syncWishlistAction(localItemIds: string[]): Promise<string[] | { error: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  // Fetch remote wishlist
  const { data: remoteWishlist, error: fetchError } = await supabase
    .from('wishlists')
    .select(`
      id,
      product:products (
        slug
      )
    `)
    .eq('user_id', user.id);

  if (fetchError) {
    console.error('Error fetching remote wishlist:', fetchError);
    return { error: 'Unable to load wishlist. Please try again.' };
  }

  const remoteItemIds = (remoteWishlist || []).map((dbItem: any) => dbItem.product.slug);

  // Merge local and remote
  for (const localId of localItemIds) {
    if (!remoteItemIds.includes(localId)) {
      const productId = await getProductId(supabase, localId);
      if (!productId) continue;

      await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: productId
        });
        
      remoteItemIds.push(localId);
    }
  }

  return remoteItemIds;
}

export async function toggleWishlistAction(productSlug: string, isAdding: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const productId = await getProductId(supabase, productSlug);
  if (!productId) return;

  if (isAdding) {
    // We can just try to insert, it has a UNIQUE constraint on (user_id, product_id)
    const { error } = await supabase
      .from('wishlists')
      .insert({ user_id: user.id, product_id: productId });
      
    // Ignore duplicate key errors if already exists
    if (error && error.code !== '23505') {
        console.error('Error adding to wishlist', error);
    }
  } else {
    await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);
  }
}
