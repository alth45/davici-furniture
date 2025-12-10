'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; // <--- Import Toast

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  // --- STATE BARU BUAT KUPON ---
  const [couponInput, setCouponInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0); // 0 = 0%, 0.1 = 10%
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // 1. Hitung Subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, '')); 
    return total + (priceNumber * item.quantity);
  }, 0);

  // 2. Hitung Potongan Diskon
  const discountAmount = subtotal * discountPercent;

  // 3. Hitung Pajak & Total Akhir
  const tax = (subtotal - discountAmount) * 0.1; // Pajak 10% dari harga setelah diskon
  const finalTotal = (subtotal - discountAmount) + tax;

  // --- LOGIC CEK KUPON ---
  const handleApplyCoupon = () => {
    if (isCouponApplied) {
        toast.error('Coupon already applied!');
        return;
    }

    // Database Kupon Sederhana (Hardcoded)
    if (couponInput.toUpperCase() === 'DAVICI') {
        setDiscountPercent(0.20); // Diskon 20%
        setIsCouponApplied(true);
        toast.success('Coupon "DAVICI" applied! 20% OFF', { icon: '🎉' });
    } else if (couponInput.toUpperCase() === 'HEMAT10') {
        setDiscountPercent(0.10); // Diskon 10%
        setIsCouponApplied(true);
        toast.success('Coupon "HEMAT10" applied! 10% OFF', { icon: '🔥' });
    } else {
        toast.error('Invalid coupon code', { icon: '❌' });
    }
  };

  const handleRemoveCoupon = () => {
      setDiscountPercent(0);
      setIsCouponApplied(false);
      setCouponInput('');
      toast('Coupon removed', { icon: '🗑️' });
  }

  const handlePayment = () => {
    // Simulasi loading
    const loadingToast = toast.loading('Processing payment...');
    
    setTimeout(() => {
        toast.dismiss(loadingToast);
        router.push('/checkout/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-[#333333]">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">Davici.</Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">Secure Checkout</span>
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* KOLOM KIRI: Form Input */}
          <div className="lg:col-span-7 space-y-8">
             {/* ... (Bagian Form Contact & Shipping biarkan sama seperti sebelumnya) ... */}
             <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary transition" />
                </div>
              </div>
            </section>

             <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">2</span>
                Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary transition" />
                  <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary transition" />
                  <input type="text" placeholder="Address" className="w-full md:col-span-2 px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary transition" />
              </div>
            </section>
          </div>

          {/* KOLOM KANAN: Order Summary (DINAMIS) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-200/50 sticky top-24 border border-gray-100">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>
              
              {/* Product List */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <p>Your cart is empty.</p>
                        <Link href="/" className="text-primary text-sm font-bold hover:underline mt-2 inline-block">Start Shopping</Link>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0 border border-gray-100">
                            <Image src={item.image} alt={item.name} width={64} height={64} className="object-contain w-full h-full mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                <span className="text-sm font-bold text-gray-800">{item.price}</span>
                            </div>
                        </div>
                        </div>
                    ))
                )}
              </div>

              {/* Coupon Code Input */}
              <div className="mb-6">
                 {isCouponApplied ? (
                     <div className="flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-lg text-sm text-green-700">
                        <span className="font-bold flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                            {couponInput.toUpperCase()} Applied
                        </span>
                        <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-700 font-bold text-xs">Remove</button>
                     </div>
                 ) : (
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Promo code (Try: DAVICI)" 
                            className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary outline-none uppercase" 
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                        />
                        <button 
                            onClick={handleApplyCoupon}
                            disabled={!couponInput || cartItems.length === 0}
                            className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Apply
                        </button>
                    </div>
                 )}
              </div>

              {/* Calculations Realtime */}
              <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {/* Tampilkan baris Diskon kalau ada */}
                {isCouponApplied && (
                    <div className="flex justify-between text-green-600 font-medium animate-fadeIn">
                        <span>Discount ({discountPercent * 100}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}

                <div className="flex justify-between text-gray-500">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100 mt-4">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button 
                onClick={handlePayment}
                disabled={cartItems.length === 0}
                className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Pay ${finalTotal.toFixed(2)}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}