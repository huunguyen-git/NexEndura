'use server';

import { createClient } from '@/lib/supabase/server';
import { CartItem } from '@/stores/useCartStore';

export async function createOrderAction(cartItems: CartItem[], shippingDetails: any, billingDetails: any, paymentMethod: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  // Validate cart items structure
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { error: 'Cart cannot be empty' };
  }

  const isValidStructure = cartItems.every(
    (item) =>
      typeof item.id === 'string' &&
      item.id.trim().length > 0 &&
      typeof item.quantity === 'number' &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 100 &&
      typeof item.name === 'string' &&
      item.name.trim().length > 0 &&
      typeof item.selectedSize === 'string' &&
      typeof item.selectedColor === 'string'
  );

  if (!isValidStructure) {
    return { error: 'Invalid items in cart' };
  }

  // Validate shipping details
  if (!shippingDetails || typeof shippingDetails !== 'object' || !shippingDetails.address || !shippingDetails.city) {
    return { error: 'Incomplete shipping details' };
  }

  // SECURITY: Re-fetch prices from the database — NEVER trust client-supplied prices.
  // A user could manipulate Zustand state in DevTools to set item.price = 0.001.
  // We verify the canonical price from the DB for every item before computing totals.
  const verifiedItems: Array<CartItem & { verifiedPrice: number }> = [];

  for (const item of cartItems) {
    const { data: productData } = await supabase
      .from('products')
      .select('price, name')
      .eq('slug', item.id)
      .single();

    if (!productData) {
      // Product not found — skip silently (could have been removed from catalogue)
      continue;
    }

    verifiedItems.push({ ...item, verifiedPrice: productData.price });
  }

  if (verifiedItems.length === 0) {
    return { error: 'None of the cart items could be verified. Please refresh and try again.' };
  }

  const subtotal = verifiedItems.reduce((acc, item) => acc + item.verifiedPrice * item.quantity, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const orderNumber = `NE-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      order_number: orderNumber,
      status: 'pending',
      subtotal,
      tax,
      shipping_cost: shipping,
      total,
      shipping_address: shippingDetails,
      billing_address: billingDetails,
      payment_method: paymentMethod
    })
    .select()
    .single();

  if (orderError || !orderData) {
    // Log internally — do not expose DB error details to the client
    console.error('Error creating order:', orderError);
    return { error: 'Unable to place your order. Please try again.' };
  }

  // Insert order items using verified (server-fetched) prices
  for (const item of verifiedItems) {
    let variantId = null;
    const { data: productData } = await supabase.from('products').select('id').eq('slug', item.id).single();
    if (productData) {
      const { data: variantData } = await supabase.from('product_variants').select('id').eq('product_id', productData.id).eq('color_hex', item.selectedColor).single();
      if (variantData) variantId = variantData.id;
    }

    await supabase
      .from('order_items')
      .insert({
        order_id: orderData.id,
        variant_id: variantId,
        product_name: item.name,
        variant_label: `Size ${item.selectedSize} / ${item.selectedColor}`,
        quantity: item.quantity,
        unit_price: item.verifiedPrice  // always the DB-verified price
      });
  }

  // Send order confirmation notification
  await supabase
    .from('inbox_messages')
    .insert({
      user_id: user.id,
      type: 'order_update',
      title: `Order ${orderNumber} Confirmed`,
      message: 'Your order has been received and is currently being processed.',
      link_url: '/account/orders'
    });

  // Clear cart in DB
  await supabase.from('cart_items').delete().eq('user_id', user.id);

  return { success: true, orderId: orderData.id, orderNumber };
}

export async function getOrdersAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      order_number,
      status,
      total,
      created_at,
      order_items (
        product_name,
        quantity,
        unit_price
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    // Log internally — do not expose DB error details to the client
    console.error('Error fetching orders:', error);
    return [];
  }

  return data.map((d: any) => ({
    id: d.id,
    orderNumber: d.order_number,
    date: d.created_at,
    status: d.status,
    total: d.total,
    itemCount: d.order_items.reduce((acc: number, item: any) => acc + item.quantity, 0),
    items: d.order_items.map((i: any) => ({
      name: i.product_name,
      quantity: i.quantity,
      price: i.unit_price
    })),
    trackingLink: '#'
  }));
}

