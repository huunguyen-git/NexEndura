import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ClientPriceDisplay from '../ClientPriceDisplay';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

describe('ClientPriceDisplay Component', () => {
  beforeEach(() => {
    useCurrencyStore.setState({ activeCurrency: 'AED' });
  });

  it('renders correctly with default currency AED', () => {
    render(<ClientPriceDisplay amount={450} />);
    
    expect(screen.getByText(/450.00/i)).toBeInTheDocument();
    expect(screen.getByText(/AED/i)).toBeInTheDocument();
  });

  it('reacts dynamically to currency changes', () => {
    const { rerender } = render(<ClientPriceDisplay amount={100} />);
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/AED/i)).toBeInTheDocument();

    // Switch store to USD (0.27 rate)
    act(() => {
      useCurrencyStore.setState({ activeCurrency: 'USD' });
    });
    rerender(<ClientPriceDisplay amount={100} />);

    expect(screen.getByText(/27.00/i)).toBeInTheDocument();
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const { container } = render(<ClientPriceDisplay amount={100} className="custom-test-class font-bold" />);
    const span = container.querySelector('span');
    expect(span).toHaveClass('custom-test-class');
  });
});
