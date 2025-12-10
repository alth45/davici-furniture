import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-4">
        
        {/* Grid Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Kolom 1: Brand & Info */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-dark block">Davici.</Link>
            <p className="text-gray-500 leading-relaxed">
              We create furniture that blends aesthetics with functionality, making your home a better place to live.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Dummy */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                 <span className="font-bold">fb</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                 <span className="font-bold">in</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                 <span className="font-bold">tw</span>
              </a>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-bold text-dark mb-4 text-base">Quick Links</h3>
            <ul className="space-y-3 text-gray-500">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition">Shop All</Link></li>
              <li><Link href="/wishlist" className="hover:text-primary transition">My Wishlist</Link></li>
              <li><Link href="/checkout" className="hover:text-primary transition">Cart</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Customer Service */}
          <div>
            <h3 className="font-bold text-dark mb-4 text-base">Customer Service</h3>
            <ul className="space-y-3 text-gray-500">
                          <li><a href="/contact" className="hover:text-primary transition">FAQ</a></li>
                          <li><Link href="/contact" className="hover:text-primary transition">Help Center</Link></li>
              <li><a href="#" className="hover:text-primary transition">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary transition">Store Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Payment Methods</a></li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter */}
          <div>
            <h3 className="font-bold text-dark mb-4 text-base">Newsletter</h3>
            <p className="text-gray-500 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-primary transition"
              />
              <button className="bg-dark text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary transition">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
           <p>© 2025 Davici Furniture. All rights reserved.</p>
           <div className="flex gap-6">
              <a href="#" className="hover:text-dark">Privacy Policy</a>
              <a href="#" className="hover:text-dark">Terms of Service</a>
           </div>
        </div>

      </div>
    </footer>
  );
}