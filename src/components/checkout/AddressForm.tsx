'use client';

export default function AddressForm({ onNext }: { onNext: (details: any) => void }) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card border border-gray-50">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Shipping Address</h2>
      
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        const fd = new FormData(e.currentTarget);
        const details = {
          firstName: fd.get('firstName'),
          lastName: fd.get('lastName'),
          addressLine1: fd.get('addressLine1'),
          city: fd.get('city'),
          postalCode: fd.get('postalCode')
        };
        onNext(details); 
      }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">First Name</label>
            <input name="firstName" required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="John" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Last Name</label>
            <input name="lastName" required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="Doe" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Address Line 1</label>
          <input name="addressLine1" required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="123 Main St" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">City</label>
            <input name="city" required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="Dubai" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Postal Code</label>
            <input name="postalCode" required type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-0 transition-colors" placeholder="00000" />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}
