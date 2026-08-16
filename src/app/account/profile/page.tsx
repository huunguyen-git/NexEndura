'use client';

import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const supabase = createClient();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', height: '', weight: '', shoeSize: '', shirtSize: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
        if (data) {
          setFormData({
            name: data.full_name || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
            height: data.size_profile?.height || '',
            weight: data.size_profile?.weight || '',
            shoeSize: data.size_profile?.shoeSize || '',
            shirtSize: data.size_profile?.shirtSize || '',
          });
        }
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsSaving(true);
    await supabase.from('users').update({
      full_name: formData.name,
      phone: formData.phone,
      size_profile: {
        height: formData.height,
        weight: formData.weight,
        shoeSize: formData.shoeSize,
        shirtSize: formData.shirtSize,
      }
    }).eq('id', userId);
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Profile Details</h1>
      <p className="text-gray-500 mb-8">Update your personal information and physical measurements for better size recommendations.</p>

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Physical Profile */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Physical Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input 
                type="text" 
                name="height"
                value={formData.height} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
              <input 
                type="text" 
                name="weight"
                value={formData.weight} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shoe Size</label>
              <input 
                type="text" 
                name="shoeSize"
                value={formData.shoeSize} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shirt Size</label>
              <input 
                type="text" 
                name="shirtSize"
                value={formData.shirtSize} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:bg-white focus:border-gray-900 focus:ring-0 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
