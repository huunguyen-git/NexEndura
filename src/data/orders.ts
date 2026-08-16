export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  isB2B: boolean;
  poNumber?: string;
  customerName: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
  items: OrderItem[];
}

export const orders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    orderNumber: 'NE-2024-00101',
    status: 'delivered',
    subtotal: 999.00,
    tax: 50.00,
    shippingCost: 0,
    discount: 0,
    total: 1049.00,
    isB2B: false,
    customerName: 'Alex Carter',
    shippingAddress: { street: '123 Sport Ave', city: 'Dubai', state: 'Dubai', zip: '00000', country: 'UAE' },
    createdAt: '2024-01-10T14:30:00Z',
    items: [
      { id: 'oi1', productId: 'p1', productName: 'Phantom Elite FG Football Boots', variantId: 'v1', variantLabel: 'US 9 / Black', quantity: 1, unitPrice: 999.00 }
    ]
  },
  {
    id: 'o2',
    userId: 'u2',
    orderNumber: 'NE-2024-00102',
    status: 'processing',
    subtotal: 1300.00,
    tax: 65.00,
    shippingCost: 15.00,
    discount: 100.00,
    total: 1280.00,
    isB2B: false,
    customerName: 'Sarah Jenkins',
    shippingAddress: { street: '45 Fitness Lane', city: 'Abu Dhabi', state: 'Abu Dhabi', zip: '11111', country: 'UAE' },
    createdAt: '2024-01-15T09:15:00Z',
    items: [
      { id: 'oi2', productId: 'p3', productName: 'AeroGlide Ultra Running Shoes', variantId: 'v4', variantLabel: 'US 8 / Black', quantity: 2, unitPrice: 650.00 }
    ]
  },
  {
    id: 'o3',
    userId: 'u3',
    orderNumber: 'NE-2024-00103',
    status: 'pending',
    subtotal: 249.00,
    tax: 12.45,
    shippingCost: 20.00,
    discount: 0,
    total: 281.45,
    isB2B: true,
    poNumber: 'PO-99482',
    customerName: 'DXB Youth Basketball Club',
    shippingAddress: { street: '78 Court Rd', city: 'Sharjah', state: 'Sharjah', zip: '22222', country: 'UAE' },
    createdAt: new Date().toISOString(),
    items: [
      { id: 'oi3', productId: 'p2', productName: 'Pro-Grip Official Game Basketball', variantId: 'v3', variantLabel: 'Standard / Orange', quantity: 1, unitPrice: 249.00 }
    ]
  }
];
