'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Cek apakah user sudah pernah lihat popup ini?
    const hasSeenPopup = localStorage.getItem('davici_newsletter_seen');

    if (!hasSeenPopup) {
      // 2. Kalau belum, munculkan setelah 3 detik
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Simpan jejak biar gak muncul lagi selamanya (atau bisa diganti session storage biar muncul tiap buka browser baru)
    localStorage.setItem('davici_newsletter_seen', 'true');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVisible(false);
    localStorage.setItem('davici_newsletter_seen', 'true');
    
    // Munculkan Kode Kupon via Toast
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Subscribed Successfully!</span>
        <span className="text-sm">Use code <span className="font-mono bg-yellow-100 px-1 font-bold text-black">DAVICI</span> for 20% OFF</span>
      </div>,
      { duration: 6000, icon: '🎉' }
    );
  };

  if (!isVisible) return null;

  return (
    // Overlay Hitam
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      
      {/* Container Popup */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col md:flex-row animate-scaleIn">
        
        {/* Tombol Close Absolute */}
        <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full text-gray-500 hover:bg-gray-100 hover:text-dark transition"
        >
            ✕
        </button>

        {/* Kiri: Gambar Visual */}
        <div className="hidden md:block w-1/2 relative bg-gray-100 min-h-[400px]">
           <Image 
             src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
             alt="Newsletter"
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
              <div className="text-white">
                  <p className="font-bold text-2xl">Modern Living</p>
                  <p className="text-sm opacity-90">Upgrade your home today.</p>
              </div>
           </div>
        </div>

        {/* Kanan: Form Subscribe */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center">
           <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2">Exclusive Offer</span>
           <h2 className="text-3xl font-bold text-dark mb-4">Get 20% OFF</h2>
           <p className="text-gray-500 mb-8 leading-relaxed">
             Subscribe to our newsletter and get a special discount code for your first purchase. No spam, we promise!
           </p>

           <form onSubmit={handleSubscribe} className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-center"
              />
              <button className="w-full bg-dark text-white font-bold py-3 rounded-lg hover:bg-primary transition shadow-lg shadow-gray-200">
                 Claim Discount
              </button>
           </form>
           
           <button onClick={handleClose} className="mt-4 text-xs text-gray-400 hover:text-dark underline">
              No thanks, I prefer paying full price
           </button>
        </div>

      </div>
    </div>
  );
}