import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter text-brand-primary">NexEndura</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Engineering human potential with premium sports equipment. Built for the modern athlete.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shop by Sport</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/shop/football" className="hover:text-blue-600 transition-colors">Football</Link></li>
              <li><Link href="/shop/basketball" className="hover:text-blue-600 transition-colors">Basketball</Link></li>
              <li><Link href="/shop/running" className="hover:text-blue-600 transition-colors">Running</Link></li>
              <li><Link href="/shop/tennis" className="hover:text-blue-600 transition-colors">Tennis</Link></li>
              <li><Link href="/shop/gym-fitness" className="hover:text-blue-600 transition-colors">Gym & Fitness</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/account/orders" className="hover:text-blue-600 transition-colors">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-blue-600 transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Stay in the Game</h4>
            <p className="text-sm text-gray-500 mb-4">Subscribe for exclusive releases and early access to drops.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
              />
              <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Join
              </button>
            </form>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} NexEndura. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
