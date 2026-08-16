'use client';

import { useAdminStore } from '@/stores/useAdminStore';
import { Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function InventoryMatrix() {
  const { inventory, updateStock } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.productId.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'out-of-stock') matchesStatus = item.stockCount === 0;
    else if (statusFilter === 'low-stock') matchesStatus = item.stockCount > 0 && item.stockCount < 5;
    else if (statusFilter === 'in-stock') matchesStatus = item.stockCount >= 5;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Inventory Matrix</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by SKU or Product ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 outline-none"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 font-medium cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Product ID</th>
                <th className="p-4 font-medium">Variant</th>
                <th className="p-4 font-medium">Stock Count</th>
                <th className="p-4 font-medium">Reserved</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{item.sku}</td>
                  <td className="p-4 text-gray-600">{item.productId}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: item.colorHex }} />
                      <span>{item.size}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <input 
                      type="number"
                      value={item.stockCount}
                      onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  </td>
                  <td className="p-4 text-gray-600">{item.reservedCount}</td>
                  <td className="p-4">
                    {item.stockCount === 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Out of Stock
                      </span>
                    ) : item.stockCount < 5 ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
