import { describe, it, expect, beforeEach } from 'vitest';
import { useFilterStore } from '../useFilterStore';

describe('useFilterStore', () => {
  beforeEach(() => {
    useFilterStore.setState({
      searchQuery: '',
      isSearchModalOpen: false,
      activeFilters: {},
      sortBy: 'relevance',
    });
  });

  it('initializes with default filter parameters', () => {
    const state = useFilterStore.getState();
    expect(state.searchQuery).toBe('');
    expect(state.isSearchModalOpen).toBe(false);
    expect(state.activeFilters).toEqual({});
    expect(state.sortBy).toBe('relevance');
  });

  it('updates search query', () => {
    useFilterStore.getState().setSearchQuery('aerogel');
    expect(useFilterStore.getState().searchQuery).toBe('aerogel');
  });

  it('opens and closes search modal', () => {
    useFilterStore.getState().openSearchModal();
    expect(useFilterStore.getState().isSearchModalOpen).toBe(true);

    useFilterStore.getState().closeSearchModal();
    expect(useFilterStore.getState().isSearchModalOpen).toBe(false);
  });

  it('sets and toggles category filter', () => {
    useFilterStore.getState().setFilter('category', 'Components');
    expect(useFilterStore.getState().activeFilters).toEqual({ category: 'Components' });

    // Setting same filter toggles it off
    useFilterStore.getState().setFilter('category', 'Components');
    expect(useFilterStore.getState().activeFilters).toEqual({});
  });

  it('clears all active filters', () => {
    useFilterStore.getState().setFilter('category', 'Footwear');
    useFilterStore.getState().setFilter('size', 'M');
    expect(Object.keys(useFilterStore.getState().activeFilters).length).toBe(2);

    useFilterStore.getState().clearFilters();
    expect(useFilterStore.getState().activeFilters).toEqual({});
  });

  it('updates sort criteria', () => {
    useFilterStore.getState().setSortBy('price_asc');
    expect(useFilterStore.getState().sortBy).toBe('price_asc');
  });
});
