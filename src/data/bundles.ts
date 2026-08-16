export interface BundleItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  items: BundleItem[];
  isActive: boolean;
}

export const bundles: Bundle[] = [
  {
    id: 'b1',
    name: 'Pro Football Starter Kit',
    slug: 'pro-football-starter-kit',
    description: 'Everything you need to dominate the pitch. Includes Elite Boots and Goalkeeper Gloves.',
    imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop',
    discountType: 'percentage',
    discountValue: 15,
    items: [
      { productId: 'p1', variantId: 'v1', quantity: 1 },
      { productId: 'p6', variantId: 'v8', quantity: 1 } // v8 is mock for gloves
    ],
    isActive: true,
  },
  {
    id: 'b2',
    name: 'Home Gym Essentials',
    slug: 'home-gym-essentials',
    description: 'Start your fitness journey with our premium yoga mat and compression top.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    discountType: 'fixed',
    discountValue: 50,
    items: [
      { productId: 'p8', variantId: 'v9', quantity: 1 },
      { productId: 'p5', variantId: 'v7', quantity: 1 }
    ],
    isActive: true,
  }
];
