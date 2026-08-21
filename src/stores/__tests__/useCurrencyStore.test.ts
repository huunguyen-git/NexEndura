import { describe, it, expect, beforeEach } from 'vitest';
import { useCurrencyStore } from '../useCurrencyStore';

describe('useCurrencyStore', () => {
  beforeEach(() => {
    useCurrencyStore.setState({ activeCurrency: 'AED' });
  });

  it('initializes with default activeCurrency of AED', () => {
    const state = useCurrencyStore.getState();
    expect(state.activeCurrency).toBe('AED');
  });

  it('updates currency to USD correctly', () => {
    useCurrencyStore.getState().setCurrency('USD');
    expect(useCurrencyStore.getState().activeCurrency).toBe('USD');
  });

  it('converts prices accurately based on exchange rate', () => {
    // AED (1:1)
    const aedConversion = useCurrencyStore.getState().convertPrice(100);
    expect(aedConversion.currency).toBe('AED');
    expect(aedConversion.value).toBe(100);
    expect(aedConversion.valueFormatted).toBe('100.00');

    // USD (0.27)
    useCurrencyStore.getState().setCurrency('USD');
    const usdConversion = useCurrencyStore.getState().convertPrice(100);
    expect(usdConversion.currency).toBe('USD');
    expect(usdConversion.value).toBe(27);
    expect(usdConversion.valueFormatted).toBe('27.00');

    // EUR (0.25)
    useCurrencyStore.getState().setCurrency('EUR');
    const eurConversion = useCurrencyStore.getState().convertPrice(100);
    expect(eurConversion.currency).toBe('EUR');
    expect(eurConversion.value).toBe(25);
    expect(eurConversion.valueFormatted).toBe('25.00');

    // GBP (0.21)
    useCurrencyStore.getState().setCurrency('GBP');
    const gbpConversion = useCurrencyStore.getState().convertPrice(100);
    expect(gbpConversion.currency).toBe('GBP');
    expect(gbpConversion.value).toBe(21);
    expect(gbpConversion.valueFormatted).toBe('21.00');
  });
});
