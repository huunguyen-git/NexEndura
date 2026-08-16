import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | NexEndura',
  description: 'Secure checkout process.',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">Checkout</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Complete your order securely.</p>
      </div>

      <CheckoutStepper />
    </div>
  );
}
