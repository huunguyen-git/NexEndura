export interface Notification {
  id: string;
  type: 'restock' | 'preorder' | 'price_drop' | 'seasonal_drop';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'restock',
    title: 'Back in Stock!',
    message: 'Phantom Elite FG Football Boots are now back in stock in your size.',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    type: 'price_drop',
    title: 'Price Drop Alert',
    message: 'AeroGlide Ultra Running Shoes are now 20% off.',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];
