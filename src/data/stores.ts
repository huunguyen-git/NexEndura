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
    name: 'Deux par Deux', 
    rating: 4.8, 
    reviews: 2600, 
    logoUrl: '/logos/deux-par-deux.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
    motto: 'Elegance in Every Stitch',
    description: 'Deux par Deux brings Parisian chic to the modern athlete. We blend high-fashion aesthetics with technical fabrics, ensuring you look as good as you perform.'
  },
  { 
    id: '2', 
    name: 'Paisley & Gray', 
    rating: 4.5, 
    reviews: 2600, 
    logoUrl: '/logos/paisley-gray.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
    motto: 'Refined Heritage',
    description: 'Rooted in classic tailoring, Paisley & Gray offers premium activewear that transitions seamlessly from the tennis court to the clubhouse.'
  },
  { 
    id: '3', 
    name: 'Ally Fashion', 
    rating: 4.9, 
    reviews: 2600, 
    logoUrl: '/logos/ally-fashion.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    motto: 'Unleash Your Inner Athlete',
    description: 'Empowering women through bold, vibrant, and highly functional fitness wear. Designed for movement, engineered for confidence.'
  },
  { 
    id: '4', 
    name: 'Nike', 
    rating: 4.7, 
    reviews: 2600, 
    logoUrl: '/logos/nike.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop',
    motto: 'Just Do It',
    description: 'Nike delivers innovative products, experiences and services to inspire athletes. Our mission is to bring inspiration and innovation to every athlete in the world.'
  },
  { 
    id: '5', 
    name: 'Adidas', 
    rating: 4.8, 
    reviews: 3100, 
    logoUrl: '/logos/adidas.svg', 
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
    logoUrl: '/logos/puma.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1617317376997-8748e6862c01?q=80&w=1200&auto=format&fit=crop',
    motto: 'Forever Faster',
    description: 'PUMA is one of the world’s leading sports brands, designing, developing, selling and marketing footwear, apparel and accessories.'
  },
  { 
    id: '8', 
    name: 'Under Armour', 
    rating: 4.7, 
    reviews: 2100, 
    logoUrl: '/logos/under-armour.svg', 
    bannerUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    motto: 'Protect This House',
    description: 'Under Armour empowers athletes with innovative sports apparel, shoes, and accessories designed to make you better.'
  },
  { 
    id: '9', 
    name: 'New Balance', 
    rating: 4.8, 
    reviews: 1500, 
    logoUrl: '/logos/new-balance.svg', 
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
