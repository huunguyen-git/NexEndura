import { create } from 'zustand';
import { products, Product } from '@/data/products';
import { inventory, InventoryItem } from '@/data/inventory';
import { bundles, Bundle } from '@/data/bundles';
import { orders, Order } from '@/data/orders';

interface AdminState {
  products: Product[];
  inventory: InventoryItem[];
  bundles: Bundle[];
  orders: Order[];
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Order actions
  updateOrderStatus: (id: string, status: Order['status']) => void;
  // Inventory actions
  updateStock: (id: string, newStock: number) => void;
  // Bundle actions
  toggleBundleActive: (id: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  products: [...products],
  inventory: [...inventory],
  bundles: [...bundles],
  orders: [...orders],

  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (id, updates) => set((state) => ({ 
    products: state.products.map(p => p.id === id ? { ...p, ...updates } : p) 
  })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
  updateOrderStatus: (id, status) => set((state) => ({ 
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o) 
  })),
  updateStock: (id, newStock) => set((state) => ({
    inventory: state.inventory.map(i => i.id === id ? { ...i, stockCount: newStock } : i)
  })),
  toggleBundleActive: (id) => set((state) => ({
    bundles: state.bundles.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b)
  })),
}));
