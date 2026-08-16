import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="bg-brand-primary text-white text-xs font-medium py-2 text-center w-full">
      Free shipping on all orders over 300 AED | <Link href="/shop" className="underline hover:text-gray-300">Shop New Arrivals</Link>
    </div>
  );
}
