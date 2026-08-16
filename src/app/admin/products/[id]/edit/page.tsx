'use client';

import { useAdminStore } from '@/stores/useAdminStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, updateProduct } = useAdminStore();
  const product = products.find(p => p.id === resolvedParams.id);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'football',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price.toString(),
        category: product.category,
        imageUrl: product.imageUrl
      });
    }
  }, [product]);

  if (!product) return <div>Product not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(resolvedParams.id, {
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price) || 0,
      imageUrl: formData.imageUrl,
      category: formData.category
    });
    router.push('/admin/products');
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (AED)</label>
            <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200">
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="running">Running</option>
            <option value="tennis">Tennis</option>
            <option value="gym-fitness">Gym & Fitness</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-200" />
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
