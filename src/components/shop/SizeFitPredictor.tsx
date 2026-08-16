'use client';

import { useState } from 'react';
import { Ruler, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SizeFitPredictor() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ height: '', weight: '', brand: '' });
  
  const handleCalculate = () => {
    setStep(3); // skip to result
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl transition-colors w-full justify-center mt-4"
      >
        <Ruler className="w-4 h-4" />
        Size Fit Predictor
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden relative z-10"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-serif font-bold text-lg text-gray-900">Find Your Perfect Fit</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                      <input 
                        type="number" 
                        value={data.height}
                        onChange={e => setData({...data, height: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 outline-none" 
                        placeholder="e.g. 180"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                      <input 
                        type="number" 
                        value={data.weight}
                        onChange={e => setData({...data, weight: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-gray-200 outline-none" 
                        placeholder="e.g. 75"
                      />
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!data.height || !data.weight}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 mt-6"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Which brand usually fits you best?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Nike', 'Adidas', 'Puma', 'Under Armour'].map(brand => (
                        <button 
                          key={brand}
                          onClick={() => setData({...data, brand})}
                          className={`px-4 py-3 rounded-xl border font-medium transition-all ${data.brand === brand ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-50'}`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={handleCalculate}
                      disabled={!data.brand}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 mt-6"
                    >
                      Predict Size
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-gray-500 font-medium mb-2">Recommended Size</h4>
                    <div className="text-5xl font-black text-gray-900 mb-4">
                      US 10
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 inline-block text-sm font-medium text-gray-700">
                      92% Confidence Match
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="w-full mt-8 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                      Apply Size
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
