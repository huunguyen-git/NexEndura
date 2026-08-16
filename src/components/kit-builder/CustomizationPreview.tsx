'use client';

import { useKitBuilderStore } from '@/stores/useKitBuilderStore';

export default function CustomizationPreview() {
  const { items, customization, step } = useKitBuilderStore();

  return (
    <div className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] relative border border-gray-100">
      <h3 className="absolute top-6 left-6 font-bold text-sm text-gray-500 uppercase">Live Preview</h3>
      
      {step === 1 ? (
        <div className="text-gray-400 text-center">
          <div className="text-6xl mb-4">👕</div>
          <p className="font-medium">Select a sport to begin</p>
        </div>
      ) : !items.jersey ? (
        <div className="text-gray-400 text-center animate-pulse">
          <div className="w-48 h-64 border-4 border-dashed border-gray-200 rounded-2xl flex items-center justify-center">
            Select a jersey
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-sm animate-in zoom-in-95 duration-500">
          <img 
            src={items.jersey.imageUrl} 
            alt={items.jersey.name} 
            className="w-full rounded-2xl shadow-lg"
          />
          
          {/* Customization Overlay */}
          {(customization.name || customization.number) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md">
              <div className="text-2xl sm:text-4xl font-black tracking-widest mt-12 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                {customization.name}
              </div>
              <div className="text-6xl sm:text-8xl font-black mt-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                {customization.number}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
