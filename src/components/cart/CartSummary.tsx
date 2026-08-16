'use client';

import { useCartStore } from '@/stores/useCartStore';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartSummary() {
  const { items, getSubtotal, isB2BMode, toggleB2BMode } = useCartStore();

  if (items.length === 0) return null;

  const subtotal = getSubtotal();
  const tax = subtotal * 0.05; // 5% mock VAT
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-50 flex flex-col h-fit sticky top-28">
      <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 text-sm mb-6">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">{subtotal.toFixed(2)} AED</span>
        </div>
        
        {isB2BMode && (
          <div className="flex justify-between items-center text-green-600 font-medium">
            <span>B2B Discount (10%)</span>
            <span>Applied</span>
          </div>
        )}

        <div className="flex justify-between items-center text-gray-600">
          <span>Estimated Tax (5%)</span>
          <span className="font-bold text-gray-900">{tax.toFixed(2)} AED</span>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Shipping</span>
          <span className="font-bold text-gray-900">
            {shipping === 0 ? <span className="text-green-600">Free</span> : `${shipping.toFixed(2)} AED`}
          </span>
        </div>
      </div>

      <hr className="border-gray-100 mb-6" />

      <div className="flex justify-between items-end mb-8">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <div className="text-right">
          <div className="text-3xl font-black text-brand-primary leading-none mb-1">{total.toFixed(2)}</div>
          <div className="text-xs font-bold text-gray-400 uppercase">AED</div>
        </div>
      </div>

      <Link 
        href="/checkout"
        className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 mb-4"
      >
        Proceed to Checkout <ArrowRight className="w-5 h-5" />
      </Link>

      <button 
        onClick={toggleB2BMode}
        className="w-full py-3 rounded-xl border-2 border-gray-100 text-sm font-bold text-gray-600 hover:border-gray-300 transition-colors mb-6"
      >
        {isB2BMode ? 'Disable Bulk Mode' : 'Switch to Bulk Ordering (B2B)'}
      </button>

      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
        <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 leading-relaxed">
          Secure checkout. We employ industry-standard encryption to protect your personal and payment information.
        </p>
      </div>
    </div>
  );
}
