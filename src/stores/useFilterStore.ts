import { create } from 'zustand';

interface FilterState {
  searchQuery: string;
  isSearchModalOpen: boolean;
  activeFilters: Record<string, string>;
  sortBy: string;
  setSearchQuery: (query: string) => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  setSortBy: (sort: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  isSearchModalOpen: false,
  activeFilters: {},
  sortBy: 'relevance',
  setSearchQuery: (query) => set({ searchQuery: query }),
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
  setFilter: (key, value) => set((state) => {
    const newFilters = { ...state.activeFilters };
    if (newFilters[key] === value) {
      delete newFilters[key]; // toggle off
    } else {
      newFilters[key] = value; // set
    }
    return { activeFilters: newFilters };
  }),
  clearFilters: () => set({ activeFilters: {} }),
  setSortBy: (sort) => set({ sortBy: sort }),
}));
