'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function QuickViewModal() {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  // Kalau tidak ada produk yang dipilih, jangan tampilkan apa-apa (Hidden)
  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, qty);
    toast.success(`Added ${selectedProduct.name} to cart!`, {
        icon: '🛒',
        style: { border: '1px solid #FF8C4B', color: '#333' }
    });
    closeQuickView(); // Tutup modal habis add to cart
    setQty(1); // Reset qty
  };

  return (
    // Overlay Hitam Transparan (Klik luar buat close)
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn"
        onClick={(e) => {
            if (e.target === e.currentTarget) closeQuickView();
        }}
    >
      {/* Kotak Modal Putih */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] md:h-auto animate-scaleIn">
        
        {/* Tombol Close X */}
        <button 
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition"
        >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Kiri: Gambar */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative min-h-[300px]">
           <div className="relative w-full h-full aspect-square">
                <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    fill 
                    className="object-contain mix-blend-multiply" 
                />
           </div>
           {selectedProduct.discount && <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{selectedProduct.discount}</span>}
        </div>

        {/* Kanan: Info */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto">
           <h2 className="text-2xl font-bold text-dark mb-2">{selectedProduct.name}</h2>
           
           <div className="flex items-center gap-4 mb-4">
              <span className="text-xl font-bold text-primary">{selectedProduct.price}</span>
              {selectedProduct.oldPrice && <span className="text-gray-400 line-through text-sm">{selectedProduct.oldPrice}</span>}
           </div>

           <p className="text-gray-500 text-sm mb-6 leading-relaxed">
             This is a premium quality furniture designed to elevate your living space. 
             Minimalist design meets maximum comfort. (Description is generated).
           </p>

           <div className="space-y-4">
              {/* Qty Selector */}
              <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-dark">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                      <button onClick={() => setQty(q => q > 1 ? q - 1 : 1)} className="px-3 py-1 text-gray-500 hover:text-dark">-</button>
                      <input type="text" value={qty} readOnly className="w-8 text-center text-sm font-bold bg-transparent outline-none" />
                      <button onClick={() => setQty(q => q + 1)} className="px-3 py-1 text-gray-500 hover:text-dark">+</button>
                  </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-dark text-white py-3 rounded-xl font-bold hover:bg-black transition shadow-lg shadow-gray-200"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    href={`/product/${selectedProduct.id}`} 
                    onClick={closeQuickView} // Tutup modal kalau mau lihat full detail
                    className="px-4 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition"
                  >
                    View Details
                  </Link>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}