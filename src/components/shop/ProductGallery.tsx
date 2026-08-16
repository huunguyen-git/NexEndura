'use client';

import { useState, useEffect } from 'react';
import { useGalleryStore } from '@/stores/useGalleryStore';

interface ProductGalleryProps {
  mainImage: string;
}

export default function ProductGallery({ mainImage }: ProductGalleryProps) {
  const { activeImage: globalActiveImage, setActiveImage: setGlobalActiveImage } = useGalleryStore();
  const [activeImage, setActiveImage] = useState(mainImage);

  useEffect(() => {
    if (globalActiveImage) {
      setActiveImage(globalActiveImage);
    }
  }, [globalActiveImage]);

  
  // Create mock gallery images based on the main image to simulate a gallery
  const gallery = [
    mainImage,
    mainImage.replace('q=80', 'q=79'), // tiny URL change just to simulate different keys if needed, but we'll just display it.
    mainImage.replace('w=600', 'w=601'),
    mainImage.replace('w=600', 'w=602'),
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible w-full md:w-20 shrink-0">
        {gallery.map((img, i) => (
          <button 
            key={i}
            onClick={() => {
              setActiveImage(img);
              setGlobalActiveImage(img);
            }}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              activeImage === img ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${i+1}`} className="object-cover w-full h-full" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-[4/5] md:aspect-square w-full bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
        <img 
          src={activeImage} 
          alt="Product main view" 
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" 
        />
      </div>
    </div>
  );
}
