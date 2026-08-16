import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { syncWishlistAction, toggleWishlistAction } from '@/app/actions/wishlist';

interface WishlistState {
  itemIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  syncWithDb: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      itemIds: [],
      toggleWishlist: (productId: string) => {
        set((state) => {
          const exists = state.itemIds.includes(productId);
          toggleWishlistAction(productId, !exists).catch(console.error);
          
          if (exists) {
            return { itemIds: state.itemIds.filter((id) => id !== productId) };
          } else {
            return { itemIds: [...state.itemIds, productId] };
          }
        });
      },
      isInWishlist: (productId: string) => get().itemIds.includes(productId),
      syncWithDb: async () => {
        const currentItems = get().itemIds;
        const result = await syncWishlistAction(currentItems);
        if (Array.isArray(result)) {
          set({ itemIds: result });
        }
      },
    }),
    {
      name: 'nexendura-wishlist-storage',
    }
  )
);
