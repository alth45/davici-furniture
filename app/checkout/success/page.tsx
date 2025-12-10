'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

// Animasi Confetti (Pakai library canvas-confetti kalau mau ribet, tapi CSS aja cukup)
export default function SuccessPage() {
  const { clearCart } = useCart();
  
  // Generate Order ID Random
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    // Kosongkan keranjang pas halaman ini dibuka
    clearCart();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        
        {/* Checkmark Animation */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-dark">Payment Successful!</h1>
        <p className="text-gray-500 mb-8 max-w-md">
            Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* Order Details Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md mb-8">
            <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                <span className="text-gray-500">Order ID</span>
                <span className="font-bold text-dark">{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                <span className="text-gray-500">Date</span>
                <span className="font-bold text-dark">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-bold text-dark">Credit Card</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">Paid</span>
            </div>
        </div>

        <div className="flex gap-4">
            <Link href="/" className="px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-100 transition">
                Back to Home
            </Link>
            <Link href="/shop" className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                Continue Shopping
            </Link>
        </div>

      </main>
    </div>
  );
}