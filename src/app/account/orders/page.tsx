import { Package, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getOrdersAction } from '@/app/actions/orders';
import ClientPriceDisplay from '@/components/shop/ClientPriceDisplay';

export default async function OrdersPage() {
  const orders = await getOrdersAction();

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't made any purchases.</p>
          <Link href="/shop" className="inline-block bg-brand-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
          <div key={order.id} className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{order.orderNumber}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <ClientPriceDisplay amount={order.total} className="font-bold text-gray-900" />
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <ClientPriceDisplay amount={item.price} className="font-medium text-gray-900" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <Link 
                href={order.trackingLink}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Track Package
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
