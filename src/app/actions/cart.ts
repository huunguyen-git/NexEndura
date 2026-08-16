'use server';

import { createClient } from '@/lib/supabase/server';
import { CartItem } from '@/stores/useCartStore';

// We need a helper to find the variant ID from product_slug and color
async function getVariantId(supabase: any, productSlug: string, colorHex: string): Promise<string | null> {
  // First, find the product id from the slug
  const { data: productData } = await supabase
    .from('products')
    .select('id')
    .eq('slug', productSlug)
    .single();

  if (!productData) return null;

  // Then find the variant
  const { data: variantData } = await supabase
    .from('product_variants')
    .select('id')
    .eq('product_id', productData.id)
    .eq('color_hex', colorHex)
    .single();

  return variantData ? variantData.id : null;
}

export async function syncCartAction(localItems: CartItem[]): Promise<CartItem[] | { error: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  // 1. Fetch remote cart items for this user
  const { data: remoteCartItems, error: fetchError } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      customization,
      variant:product_variants (
        id,
        color_hex,
        product:products (
          id,
          name,
          brand,
          price,
          slug,
          images,
          category:categories(slug)
        )
      )
    `)
    .eq('user_id', user.id);

  if (fetchError) {
    console.error('Error fetching remote cart:', fetchError);
    return { error: fetchError.message };
  }

  // 2. Map remote items to CartItem format
  const remoteItemsFormatted: CartItem[] = (remoteCartItems || []).map((dbItem: any) => {
    const p = dbItem.variant.product;
    let images = p.images;
    if (typeof images === 'string') {
      try { images = JSON.parse(images); } catch (e) { images = []; }
    }
    const imageUrl = images && images.length > 0 ? images[0].url : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop';
    
    return {
      id: p.slug,
      name: p.name,
      brand: p.brand,
      price: p.price,
      currency: 'AED',
      rating: 4.5,
      reviews: 100,
      imageUrl: imageUrl,
      category: p.category?.slug || 'other',
      isFavorite: false,
      colors: [dbItem.variant.color_hex],
      selectedColor: dbItem.variant.color_hex,
      selectedSize: dbItem.customization?.size || 'M', // Fallback
      quantity: dbItem.quantity
    };
  });

  // 3. Merge local and remote
  // For simplicity, we will just add local items to remote if they don't exist,
  // or update quantity if they do.
  
  for (const localItem of localItems) {
    const variantId = await getVariantId(supabase, localItem.id, localItem.selectedColor);
    if (!variantId) continue; // Skip if we can't map it

    const existingRemote = remoteCartItems?.find((r: any) => 
      r.variant.id === variantId && 
      (r.customization?.size || 'M') === localItem.selectedSize
    );

    if (existingRemote) {
      // Update quantity if different
      if (existingRemote.quantity !== localItem.quantity) {
        // We'll take the max quantity or just the local one. Let's take local one for now if it's a sync.
        await supabase
          .from('cart_items')
          .update({ quantity: localItem.quantity })
          .eq('id', existingRemote.id);
          
        // Update our formatted array
        const index = remoteItemsFormatted.findIndex(i => i.id === localItem.id && i.selectedColor === localItem.selectedColor && i.selectedSize === localItem.selectedSize);
        if (index !== -1) remoteItemsFormatted[index].quantity = localItem.quantity;
      }
    } else {
      // Insert new
      await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          variant_id: variantId,
          quantity: localItem.quantity,
          customization: { size: localItem.selectedSize }
        });
        
      remoteItemsFormatted.push(localItem);
    }
  }

  return remoteItemsFormatted;
}

export async function clearCartAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase.from('cart_items').delete().eq('user_id', user.id);
  }
}

export async function updateCartItemQuantityAction(productSlug: string, colorHex: string, size: string, quantity: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const variantId = await getVariantId(supabase, productSlug, colorHex);
  if (!variantId) return;

  if (quantity <= 0) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('variant_id', variantId)
      .contains('customization', { size });
  } else {
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('variant_id', variantId)
      .contains('customization', { size });
  }
}
