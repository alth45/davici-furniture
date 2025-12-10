'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';



export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="bg-white min-h-screen font-sans text-dark">
      <Navbar />
      
      <div className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">My Wishlist ❤️</h1>
          <p className="text-gray-500">{wishlistItems.length} items saved for later</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              // Kita reuse ProductCard, tapi karena data di wishlist mungkin gak lengkap (cuma id, name, price, image),
              // pastikan ProductCard handling data yg minimal atau pass data lengkap dari awal.
              // Untuk amannya, kita pass item apa adanya.
              <ProductCard key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-4xl">
                💔
            </div>
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Seems like you don't like anything yet.</p>
            <Link href="/shop" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                Start Shopping
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}