import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from '../CartSummary';
import { useCartStore, CartItem } from '@/stores/useCartStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

vi.mock('@/app/actions/cart', () => ({
  syncCartAction: vi.fn().mockResolvedValue([]),
  clearCartAction: vi.fn().mockResolvedValue(true),
  updateCartItemQuantityAction: vi.fn().mockResolvedValue(true),
}));

const sampleCartItem: CartItem = {
  id: 'prod-item-1',
  name: 'Quantum Kinetic Vest',
  brand: 'NexEndura',
  price: 200,
  currency: 'AED',
  category: 'fitness',
  rating: 5,
  reviews: 40,
  isFavorite: false,
  imageUrl: 'https://example.com/vest.jpg',
  colors: ['#101010'],
  selectedColor: '#101010',
  selectedSize: 'M',
  quantity: 2,
};

describe('CartSummary Component', () => {
  beforeEach(() => {
    useCurrencyStore.setState({ activeCurrency: 'AED' });
    useCartStore.setState({ items: [], isB2BMode: false });
  });

  it('renders nothing when cart is empty', () => {
    const { container } = render(<CartSummary />);
    expect(container.firstChild).toBeNull();
  });

  it('renders order summary with correct subtotal, tax, and shipping when items exist', () => {
    // 2 items @ 200 each = 400 subtotal. Tax (5%) = 20. Shipping = 50 (since <= 500). Total = 470.
    useCartStore.setState({ items: [sampleCartItem] });
    render(<CartSummary />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText(/400.00/i)).toBeInTheDocument(); // subtotal
    expect(screen.getByText(/20.00/i)).toBeInTheDocument(); // tax
    expect(screen.getByText(/470.00/i)).toBeInTheDocument(); // total
  });

  it('provides free shipping when subtotal exceeds 500', () => {
    // 3 items @ 200 each = 600 subtotal (>500 -> free shipping)
    useCartStore.setState({ items: [{ ...sampleCartItem, quantity: 3 }] });
    render(<CartSummary />);

    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('toggles B2B bulk mode on button click', () => {
    useCartStore.setState({ items: [sampleCartItem] });
    render(<CartSummary />);

    const toggleButton = screen.getByRole('button', { name: /Switch to Bulk Ordering \(B2B\)/i });
    fireEvent.click(toggleButton);

    expect(screen.getByText(/B2B Discount \(10%\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Disable Bulk Mode/i })).toBeInTheDocument();
  });
});
