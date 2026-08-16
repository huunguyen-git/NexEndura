export const currentUser = {
  id: 'usr_123',
  name: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  phone: '+1 (555) 123-4567',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  sizeProfile: {
    height: '180cm',
    weight: '75kg',
    shoeSize: '43 EU',
    shirtSize: 'M',
  },
  sportInterests: ['Running', 'Tennis', 'Gym & Fitness'],
};

export const mockOrders = [
  {
    id: 'ord_987',
    orderNumber: 'NE-2026-987A',
    date: '2026-07-28T14:30:00Z',
    status: 'delivered',
    total: 310.00,
    itemCount: 2,
    items: [
      { name: 'Pro-Grip Official Game Basketball', quantity: 1, price: 249.00 },
      { name: 'Court Control Tennis Balls (3-Pack)', quantity: 2, price: 30.50 }
    ],
    trackingLink: '#',
  },
  {
    id: 'ord_988',
    orderNumber: 'NE-2026-988B',
    date: '2026-08-04T09:15:00Z',
    status: 'processing',
    total: 180.00,
    itemCount: 1,
    items: [
      { name: 'Compression Training Top', quantity: 1, price: 180.00 }
    ],
    trackingLink: '#',
  }
];

export const mockNotifications = [
  {
    id: 'notif_1',
    type: 'restock',
    title: 'Back in Stock: AeroGlide Ultra',
    message: 'The AeroGlide Ultra Running Shoes in Size 43 are back in stock. Grab them before they sell out!',
    date: '2026-08-05T10:00:00Z',
    isRead: false,
    link: '/product/aeroglide-ultra-running-shoes'
  },
  {
    id: 'notif_2',
    type: 'order_update',
    title: 'Order NE-2026-987A Delivered',
    message: 'Your package has been delivered to your front porch.',
    date: '2026-07-30T16:45:00Z',
    isRead: true,
    link: '/account/orders'
  },
  {
    id: 'notif_3',
    type: 'promo',
    title: 'Early Access: Fall Collection',
    message: 'As a VIP member, you get 24-hour early access to the new Fall Collection. Use code FALLVIP at checkout.',
    date: '2026-07-15T08:00:00Z',
    isRead: true,
    link: '/shop'
  }
];
