import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';
import { syncCartAction, clearCartAction, updateCartItemQuantityAction } from '@/app/actions/cart';

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isB2BMode: boolean;
  addToCart: (product: Product, selectedColor: string, selectedSize: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColor: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedColor: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  toggleB2BMode: () => void;
  syncWithDb: () => Promise<void>;
  // Getters
  getSubtotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isB2BMode: false,

      addToCart: (product, selectedColor, selectedSize, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
          );

          if (existingItemIndex !== -1) {
            // Item exists, update quantity
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            updateCartItemQuantityAction(product.id, selectedColor, selectedSize, newItems[existingItemIndex].quantity).catch(console.error);
            return { items: newItems };
          }

          // Item doesn't exist, add it
          const newItem = { ...product, selectedColor, selectedSize, quantity };
          syncCartAction([newItem]).catch(console.error);
          
          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeFromCart: (productId, selectedColor, selectedSize) => {
        updateCartItemQuantityAction(productId, selectedColor, selectedSize, 0).catch(console.error);
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.id === productId &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              )
          ),
        }));
      },

      updateQuantity: (productId, selectedColor, selectedSize, quantity) => {
        updateCartItemQuantityAction(productId, selectedColor, selectedSize, quantity).catch(console.error);
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.id === productId &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
                  )
              ),
            };
          }

          return {
            items: state.items.map((item) => {
              if (
                item.id === productId &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              ) {
                return { ...item, quantity };
              }
              return item;
            }),
          };
        });
      },

      clearCart: () => {
        clearCartAction().catch(console.error);
        set({ items: [] });
      },
      
      toggleB2BMode: () => set((state) => ({ isB2BMode: !state.isB2BMode })),

      syncWithDb: async () => {
        const currentItems = get().items;
        const result = await syncCartAction(currentItems);
        if (Array.isArray(result)) {
          set({ items: result });
        }
      },

      getSubtotal: () => {
        const { items, isB2BMode } = get();
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return isB2BMode ? subtotal * 0.9 : subtotal; // 10% B2B discount mock
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'nexendura-cart-storage',
    }
  )
);
