'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';

export default function CompareFloatingBar() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-[80] animate-slideUp">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-6">
          <h3 className="font-bold text-dark hidden sm:block">Compare Products ({compareItems.length})</h3>
          
          <div className="flex gap-4">
            {compareItems.map((item) => (
              <div key={item.id} className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                 <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                 {/* Tombol Hapus Kecil */}
                 <button 
                    onClick={() => removeFromCompare(item.id)}
                    className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white"
                 >
                    ✕
                 </button>
              </div>
            ))}
            {/* Slot Kosong (Placeholder) */}
            {[...Array(3 - compareItems.length)].map((_, i) => (
               <div key={i} className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-300 text-xs">
                  +
               </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
           <button onClick={clearCompare} className="text-sm text-gray-500 hover:text-red-500 px-4">
             Clear All
           </button>
           <Link 
             href="/compare" 
             className="flex-1 sm:flex-none bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200 text-center"
           >
             Compare Now
           </Link>
        </div>

      </div>
    </div>
  );
}