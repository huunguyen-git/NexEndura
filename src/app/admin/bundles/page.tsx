'use client';

import { useAdminStore } from '@/stores/useAdminStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function BundlesManager() {
  const { bundles, toggleBundleActive } = useAdminStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Bundle Builder</h1>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Create Bundle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bundles.map((bundle) => (
          <div key={bundle.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 aspect-video sm:aspect-square relative bg-gray-50 shrink-0">
              <img src={bundle.imageUrl} alt={bundle.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-lg">{bundle.name}</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={bundle.isActive} 
                    onChange={() => toggleBundleActive(bundle.id)} 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                </label>
              </div>
              <p className="text-sm text-gray-500 mb-4 flex-1">{bundle.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="text-sm">
                  <span className="font-bold text-gray-900">{bundle.items.length} Items</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-green-600 font-medium">
                    {bundle.discountType === 'percentage' ? `${bundle.discountValue}% OFF` : `$${bundle.discountValue} OFF`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
