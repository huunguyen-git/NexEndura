'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Product } from '@/data/products';
import { useGalleryStore } from '@/stores/useGalleryStore';

export default function ProductDetailsAccordion({ product }: { product: Product }) {
  const [openSection, setOpenSection] = useState<string>('description');
  const { setActiveImage } = useGalleryStore();

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const sections = [
    {
      id: 'description',
      title: 'Product Description',
      content: `The ${product.name} is engineered for peak performance. Featuring premium materials and state-of-the-art technology, it delivers unmatched comfort, durability, and style. Whether you are training for a marathon or hitting the streets, this gear adapts to your movement. Built for athletes who demand the best.`
    },
    {
      id: 'specs',
      title: 'Specifications',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li 
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setActiveImage(product.imageUrl.replace('w=600', 'w=601'))}
          ><strong>Brand:</strong> {product.brand}</li>
          <li 
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setActiveImage(product.imageUrl.replace('w=600', 'w=602'))}
          ><strong>Category:</strong> {product.category.toUpperCase()}</li>
          <li 
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setActiveImage(product.imageUrl)}
          ><strong>Material:</strong> Breathable Tech-Mesh & Carbon Fiber</li>
          <li 
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setActiveImage(product.imageUrl.replace('q=80', 'q=79'))}
          ><strong>Weight:</strong> Ultra-lightweight (approx. 280g)</li>
          <li><strong>Care:</strong> Machine wash cold. Do not tumble dry.</li>
        </ul>
      )
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: 'Free standard shipping on orders over 500 AED. Next-day delivery available in Dubai and Abu Dhabi. We accept returns within 30 days of purchase for a full refund, provided the item is in original condition with tags attached.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-card border border-gray-50 overflow-hidden">
      {sections.map((section, index) => (
        <div 
          key={section.id} 
          className={`border-b border-gray-100 last:border-0 ${openSection === section.id ? 'bg-gray-50/50' : 'bg-white'}`}
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <span className={`font-bold text-lg ${openSection === section.id ? 'text-blue-600' : 'text-gray-900'}`}>
              {section.title}
            </span>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openSection === section.id ? 'rotate-180 text-blue-600' : ''}`} />
          </button>
          
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openSection === section.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-6 pt-0 text-gray-600 leading-relaxed text-sm">
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
