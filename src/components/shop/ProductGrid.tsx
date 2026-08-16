'use client';

import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/stores/useFilterStore';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';

export default function ProductGrid({ storeBrand, initialProducts = [] }: { storeBrand?: string, initialProducts?: Product[] }) {
  const { activeFilters } = useFilterStore();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchQuery, storeBrand]);
  
  // Filter products based on active filters
  let filteredProducts = initialProducts.filter(product => {
    // Check Search Query
    if (searchQuery) {
      if (!product.name.toLowerCase().includes(searchQuery) && 
          !product.brand.toLowerCase().includes(searchQuery) &&
          !product.category.toLowerCase().includes(searchQuery)) {
        return false;
      }
    }
    // Check Category
    if (activeFilters['Category'] && product.category !== activeFilters['Category'].toLowerCase()) {
      return false;
    }
    // Check Brand
    if (storeBrand) {
      if (product.brand.toLowerCase() !== storeBrand.toLowerCase()) {
        return false;
      }
    } else if (activeFilters['Brand']) {
      if (product.brand.toLowerCase() !== activeFilters['Brand'].toLowerCase()) {
        return false;
      }
    }
    // Check Price
    if (activeFilters['Price']) {
      const priceFilter = activeFilters['Price'];
      if (priceFilter === 'Under 100 AED' && product.price >= 100) return false;
      if (priceFilter === '100 - 300 AED' && (product.price < 100 || product.price > 300)) return false;
      if (priceFilter === 'Over 300 AED' && product.price <= 300) return false;
    }
    // Check Gender, Rating, Color, Size etc. (Mock simple matching for now)
    
    return true;
  });

  // Apply sorting
  const order = activeFilters['Order by'] || 'Recommended';
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (order) {
      case 'Price: Low to High': return a.price - b.price;
      case 'Price: High to Low': return b.price - a.price;
      case 'Newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'Recommended':
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Result ({filteredProducts.length})</h2>
        <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No products found matching your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </>
      )}
    </section>
  );
}
