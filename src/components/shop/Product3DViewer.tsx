'use client';

import { Cuboid, X } from 'lucide-react';
import { useState } from 'react';

export default function Product3DViewer() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-50 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-white to-white pointer-events-none"></div>
      
      {!isLoaded ? (
        <>
          <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <Cuboid className="h-10 w-10 text-blue-600" />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">Interactive 3D View</h3>
          <p className="text-sm text-gray-500 text-center max-w-[250px]">
            Drag to rotate. Pinch to zoom. See every detail from all angles.
          </p>
          
          <button 
            onClick={() => setIsLoaded(true)}
            className="mt-6 px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition-colors shadow-lg"
          >
            Load 3D Model
          </button>
        </>
      ) : (
        <div className="relative w-full h-[250px] flex flex-col items-center justify-center">
          <button onClick={() => setIsLoaded(false)} className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full z-10">
            <X className="w-4 h-4" />
          </button>
          
          {/* CSS Rotation Fallback */}
          <div className="w-48 h-48 relative animate-[spin_10s_linear_infinite] [transform-style:preserve-3d]">
             <img src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-contain [backface-visibility:hidden]" alt="3D Front" />
             <img src="https://images.unsplash.com/photo-1518605368461-1ee7c155d7f1?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-contain [backface-visibility:hidden] [transform:rotateY(180deg)]" alt="3D Back" />
          </div>
          
          <div className="absolute bottom-0 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
            Simulating 3D View...
          </div>
        </div>
      )}

      {/* Decorative badge */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-xs font-bold text-gray-400">
        AR Ready
      </div>
    </div>
  );
}
