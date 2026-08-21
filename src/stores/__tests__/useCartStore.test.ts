import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock server actions called by useCartStore
vi.mock('@/app/actions/cart', () => ({
  syncCartAction: vi.fn().mockResolvedValue([]),
  clearCartAction: vi.fn().mockResolvedValue(true),
  updateCartItemQuantityAction: vi.fn().mockResolvedValue(true),
}));

import { useCartStore } from '../useCartStore';
import { Product } from '@/data/products';

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Carbon Fiber Exo-Frame',
  brand: 'NexEndura',
  price: 250,
  currency: 'AED',
  category: 'football',
  rating: 4.8,
  reviews: 120,
  isFavorite: false,
  imageUrl: 'https://example.com/img1.jpg',
  colors: ['#000000'],
};

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isB2BMode: false });
    vi.clearAllMocks();
  });

  it('starts with an empty cart and B2B mode disabled', () => {
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.isB2BMode).toBe(false);
    expect(state.getTotalItems()).toBe(0);
    expect(state.getSubtotal()).toBe(0);
  });

  it('adds a new product to cart correctly', () => {
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 2);
    
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('prod-1');
    expect(state.items[0].selectedColor).toBe('#000000');
    expect(state.items[0].selectedSize).toBe('L');
    expect(state.items[0].quantity).toBe(2);
    expect(state.getTotalItems()).toBe(2);
    expect(state.getSubtotal()).toBe(500); // 250 * 2
  });

  it('increments quantity if the same item and variant is added again', () => {
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 1);
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 3);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(4);
    expect(state.getTotalItems()).toBe(4);
    expect(state.getSubtotal()).toBe(1000); // 250 * 4
  });

  it('updates item quantity and removes item if quantity set to 0', () => {
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 2);
    useCartStore.getState().updateQuantity('prod-1', '#000000', 'L', 5);

    expect(useCartStore.getState().items[0].quantity).toBe(5);

    useCartStore.getState().updateQuantity('prod-1', '#000000', 'L', 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('removes an item explicitly', () => {
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 2);
    expect(useCartStore.getState().items).toHaveLength(1);

    useCartStore.getState().removeFromCart('prod-1', '#000000', 'L');
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('calculates B2B discount (10%) when B2B mode is toggled', () => {
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 2); // 500 subtotal
    expect(useCartStore.getState().getSubtotal()).toBe(500);

    useCartStore.getState().toggleB2BMode();
    expect(useCartStore.getState().isB2BMode).toBe(true);
    expect(useCartStore.getState().getSubtotal()).toBe(450); // 500 * 0.9
  });

  it('clears all items in the cart', () => {
    useCartStore.getState().addToCart(mockProduct, '#000000', 'L', 2);
    expect(useCartStore.getState().items).toHaveLength(1);

    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
