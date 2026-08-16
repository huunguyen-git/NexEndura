import CartItemList from '@/components/cart/CartItemList';
import CartSummary from '@/components/cart/CartSummary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | NexEndura',
  description: 'Review your items and proceed to checkout.',
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">Your Cart</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Review your items before proceeding to checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <CartItemList />
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
