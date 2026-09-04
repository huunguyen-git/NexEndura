'use client';

import { useCartStore } from '@/stores/useCartStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createOrderAction } from '@/app/actions/orders';

export default function OrderReview({ shippingDetails, paymentMethod, onBack, onComplete, forceSuccess = false }: { shippingDetails?: any, paymentMethod?: string, onBack: () => void, onComplete?: () => void, forceSuccess?: boolean }) {
  const { items, getSubtotal, clearCart, isB2BMode } = useCartStore();
  const { convertPrice } = useCurrencyStore();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(forceSuccess);
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const tax = subtotal * 0.05;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;
  
  const cSubtotal = convertPrice(subtotal);
  const cTax = convertPrice(tax);
  const cShipping = convertPrice(shipping);
  const cTotal = convertPrice(total);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    setErrorMsg(null);
    try {
      const res = await createOrderAction(items, shippingDetails, {}, paymentMethod || 'card');
      if (res.error) {
        setErrorMsg(res.error);
        setIsPlacingOrder(false);
        return;
      }
      clearCart();
      setOrderPlaced(true);
      setIsPlacingOrder(false);
      if (onComplete) onComplete();
    } catch (e: any) {
      // Log internally — never expose raw exception messages to users
      console.error('Unexpected error placing order:', e);
      setErrorMsg('Something went wrong. Please try again.');
      setIsPlacingOrder(false);
    }
  };

  if (orderPlaced || forceSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-50 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8 max-w-md">Your order has been successfully placed. We'll send you a confirmation email with your tracking details shortly.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-50">
      <h2 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">Review Your Order</h2>
      
      <div className="space-y-4 mb-8">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-900 line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity} | Size: {item.selectedSize}</p>
              </div>
            </div>
            <div className="font-bold text-gray-900 whitespace-nowrap">
              {convertPrice(item.price * item.quantity).valueFormatted} {convertPrice(item.price * item.quantity).currency}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">{cSubtotal.valueFormatted} {cSubtotal.currency}</span>
        </div>
        {isB2BMode && (
          <div className="flex justify-between text-sm text-green-600 font-medium">
            <span>B2B Discount</span>
            <span>Applied</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax (5%)</span>
          <span className="font-bold text-gray-900">{cTax.valueFormatted} {cTax.currency}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 pb-3">
          <span>Shipping</span>
          <span className="font-bold text-gray-900">{shipping === 0 ? 'Free' : `${cShipping.valueFormatted} ${cShipping.currency}`}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-black text-brand-primary">{cTotal.valueFormatted} {cTotal.currency}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold">
          {errorMsg}
        </div>
      )}

      <div className="pt-4 flex gap-4">
        <button type="button" onClick={onBack} disabled={isPlacingOrder} className="px-6 py-4 rounded-2xl font-bold text-gray-600 border-2 border-gray-100 hover:bg-gray-50 transition-colors disabled:opacity-50">
          Back
        </button>
        <button 
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isPlacingOrder ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
