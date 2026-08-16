'use client';

import { useKitBuilderStore } from '@/stores/useKitBuilderStore';
import { ArrowRight, Check } from 'lucide-react';

export default function KitConfigurator() {
  const { step, setStep, sport, setSport, items, setItem, customization, setCustomization } = useKitBuilderStore();

  const sports = [
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'running', name: 'Running', icon: '🏃' },
  ];

  const mockJerseys = [
    { id: 'j1', name: 'Elite Match Jersey', price: 299, imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=300&auto=format&fit=crop' },
    { id: 'j2', name: 'Pro Training Top', price: 199, imageUrl: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=300&auto=format&fit=crop' }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-50">
      
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center">
            <div 
              onClick={() => { if (step > s) setStep(s); }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step > s ? 'cursor-pointer hover:bg-green-600' : ''} ${
              step === s ? 'bg-blue-600 text-white' : step > s ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && <div className={`w-16 md:w-32 h-1 mx-2 ${step > s ? 'bg-green-500' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Sport Selection */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold font-serif">Select your sport</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sports.map(s => (
              <button
                key={s.id}
                onClick={() => setSport(s.id)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  sport === s.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="font-bold text-gray-900">{s.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Component Selection */}
      {step === 2 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold font-serif">Build your {sport} kit</h2>
          
          <div>
            <h3 className="font-bold text-sm text-gray-500 uppercase mb-4">Select Jersey</h3>
            <div className="grid grid-cols-2 gap-4">
              {mockJerseys.map(j => (
                <div 
                  key={j.id} 
                  onClick={() => setItem('jersey', j)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    items.jersey?.id === j.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <img src={j.imageUrl} alt={j.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                  <div className="font-bold text-sm text-gray-900">{j.name}</div>
                  <div className="text-sm text-gray-500">AED {j.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              disabled={!items.jersey}
              className="flex-[2] bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
            >
              Continue to Customization <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Customization */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h2 className="text-2xl font-bold font-serif">Personalize it</h2>
          <p className="text-gray-500 text-sm">Add your name and number (+ AED 50)</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Name on Back</label>
              <input 
                type="text" 
                maxLength={12}
                value={customization.name}
                onChange={(e) => setCustomization('name', e.target.value.toUpperCase())}
                placeholder="e.g. RONALDO"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Number</label>
              <input 
                type="text" 
                maxLength={2}
                value={customization.number}
                onChange={(e) => setCustomization('number', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 7"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => setStep(2)}
              className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
            <button 
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Review Kit
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
