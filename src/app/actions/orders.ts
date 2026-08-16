'use server';

import { createClient } from '@/lib/supabase/server';
import { CartItem } from '@/stores/useCartStore';

export async function createOrderAction(cartItems: CartItem[], shippingDetails: any, billingDetails: any, paymentMethod: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
    console.error('Error creating order:', orderError);
    return { error: orderError?.message || 'Failed to create order' };
  }

  // Insert order items
  // Since we don't have variant_id in CartItem directly on the client if it's not synced,
  // we could just fetch it here or save basic info. But `order_items` needs `variant_id`.
  
  for (const item of cartItems) {
    // Attempt to resolve variant_id
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
        variant_id: variantId, // can be null if not found
        product_name: item.name,
        variant_label: `Size ${item.selectedSize} / ${item.selectedColor}`,
        quantity: item.quantity,
        unit_price: item.price
      });
  }

  // After order created, send a notification
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
