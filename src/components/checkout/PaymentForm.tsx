'use client';

import { useState } from 'react';

export default function PaymentForm({ onNext, onBack }: { onNext: (method: string) => void, onBack: () => void }) {
  const [method, setMethod] = useState('card');

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-50">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Payment Method</h2>
      
      <div className="space-y-4 mb-8">
        <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${method === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
          <input type="radio" name="payment" value="card" checked={method === 'card'} onChange={() => setMethod('card')} className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
          <span className="font-bold text-gray-900">Credit / Debit Card</span>
        </label>
        
        <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${method === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
          <input type="radio" name="payment" value="paypal" checked={method === 'paypal'} onChange={() => setMethod('paypal')} className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
          <span className="font-bold text-gray-900">PayPal</span>
        </label>
      </div>

      {method === 'card' && (
        <form onSubmit={(e) => { e.preventDefault(); onNext(method); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Card Number</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors font-mono" placeholder="0000 0000 0000 0000" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">Expiry Date</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="MM/YY" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700">CVC</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="123" />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onBack} className="px-6 py-4 rounded-2xl font-bold text-gray-600 border-2 border-gray-100 hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button type="submit" className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
              Review Order
            </button>
          </div>
        </form>
      )}

      {method === 'paypal' && (
        <div className="pt-4 flex gap-4">
            <button type="button" onClick={onBack} className="px-6 py-4 rounded-2xl font-bold text-gray-600 border-2 border-gray-100 hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button onClick={() => onNext(method)} className="flex-1 bg-[#FFC439] text-[#003087] py-4 rounded-2xl font-bold text-lg hover:brightness-95 transition-all shadow-lg flex items-center justify-center gap-2">
              Pay with PayPal
            </button>
        </div>
      )}
    </div>
  );
}
