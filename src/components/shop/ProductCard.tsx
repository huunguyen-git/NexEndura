import { Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useWishlistStore } from '@/stores/useWishlistStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { convertPrice } = useCurrencyStore();
  const isWished = isInWishlist(product.id);
  const priceObj = convertPrice(product.price);

  return (
    <div className="group cursor-pointer relative">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] mb-4 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-blue-600">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <div className="font-bold text-lg text-gray-900">
          {priceObj.valueFormatted} <span className="text-xs font-normal text-gray-500 uppercase">{priceObj.currency}</span>
        </div>
      </Link>
      
      {/* Heart button must be absolute outside the Link or use e.preventDefault() so it doesn't navigate */}
      <button 
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-white/50 hover:bg-white transition-colors shadow-sm z-10 ${isWished ? 'text-red-500' : 'text-gray-400'}`}
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
      >
        <Heart className="h-5 w-5" fill={isWished ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
