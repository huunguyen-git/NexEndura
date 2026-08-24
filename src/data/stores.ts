export interface Store {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  logoUrl: string;
  bannerUrl: string;
  motto: string;
  description: string;
}

export const stores: Store[] = [
  { 
    id: '1', 
    name: 'The North Face', 
    rating: 4.8, 
    reviews: 2600, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/thenorthface.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop',
    motto: 'Never Stop Exploring',
    description: 'The North Face delivers an extensive line of performance apparel, equipment, and footwear for athletes and outdoor explorers worldwide.'
  },
  { 
    id: '2', 
    name: 'Reebok', 
    rating: 4.5, 
    reviews: 2600, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/reebok.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    motto: 'Life is Not a Spectator Sport',
    description: 'Reebok is an American-inspired global brand with a deep fitness heritage and a clear mission: To be the best fitness brand in the world.'
  },
  { 
    id: '3', 
    name: 'Fila', 
    rating: 4.9, 
    reviews: 2600, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/fila.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
    motto: 'Power and Grace',
    description: 'Fila combines Italian heritage with modern athletic craftsmanship, delivering iconic sportswear and court footwear for top performers.'
  },
  { 
    id: '4', 
    name: 'Nike', 
    rating: 4.7, 
    reviews: 2600, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nike.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
    motto: 'Just Do It',
    description: 'Nike delivers innovative products, experiences and services to inspire athletes. Our mission is to bring inspiration and innovation to every athlete in the world.'
  },
  { 
    id: '5', 
    name: 'Adidas', 
    rating: 4.8, 
    reviews: 3100, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/adidas.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1555274175-75f4056dfd05?q=80&w=1200&auto=format&fit=crop',
    motto: 'Impossible is Nothing',
    description: 'Adidas designs and builds the best sports products in the world, combining cutting-edge technology with iconic street style.'
  },
  { 
    id: '6', 
    name: 'Jordan', 
    rating: 4.9, 
    reviews: 4200, 
    logoUrl: '/logos/jordan.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop',
    motto: 'Defy Gravity',
    description: 'The Jordan brand represents a culture of flight. We build the highest-performing basketball shoes on the planet, inspired by the greatest of all time.'
  },
  { 
    id: '7', 
    name: 'Puma', 
    rating: 4.6, 
    reviews: 1800, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/puma.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=1200&auto=format&fit=crop',
    motto: 'Forever Faster',
    description: 'PUMA is one of the world’s leading sports brands, designing, developing, selling and marketing footwear, apparel and accessories.'
  },
  { 
    id: '8', 
    name: 'Under Armour', 
    rating: 4.7, 
    reviews: 2100, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/underarmour.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    motto: 'Protect This House',
    description: 'Under Armour empowers athletes with innovative sports apparel, shoes, and accessories designed to make you better.'
  },
  { 
    id: '9', 
    name: 'New Balance', 
    rating: 4.8, 
    reviews: 1500, 
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/newbalance.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
    motto: 'Fearlessly Independent',
    description: 'New Balance is dedicated to helping athletes achieve their goals with premium footwear and apparel that blends performance with everyday style.'
  },
  { 
    id: '10', 
    name: 'ASICS', 
    rating: 4.9, 
    reviews: 2800, 
    logoUrl: '/logos/asics.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
    motto: 'Sound Mind, Sound Body',
    description: 'ASICS develops sports shoes and apparel designed to bring harmony to both body and soul, supporting runners and athletes worldwide.'
  }
];
