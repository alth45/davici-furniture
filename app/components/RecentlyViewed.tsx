'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function RecentlyViewed({ currentProduct }: { currentProduct?: any }) {
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    // 1. AMBIL DATA LAMA
    const stored = localStorage.getItem('davici_recent');
    let items = stored ? JSON.parse(stored) : [];

    // 2. JIKA ADA PRODUK BARU (currentProduct), SIMPAN KE MEMORI
    if (currentProduct) {
      // Hapus kalau udah ada (biar gak duplikat & posisinya naik ke paling depan)
      items = items.filter((p: any) => p.id !== currentProduct.id);
      
      // Masukin ke paling depan
      items.unshift({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        oldPrice: currentProduct.oldPrice,
        discount: currentProduct.discount,
        isHot: currentProduct.isHot,
        reviews: currentProduct.reviews
        // Kita simpan data minimal aja biar storage gak penuh
      });

      // Batasi cuma simpan 4 produk terakhir
      if (items.length > 5) items.pop();

      // Simpan balik ke LocalStorage
      localStorage.setItem('davici_recent', JSON.stringify(items));
    }

    // 3. SET STATE (Kecualikan produk yang sedang dilihat sekarang biar gak dobel di layar)
    if (currentProduct) {
        setRecentProducts(items.filter((p: any) => p.id !== currentProduct.id).slice(0, 4));
    } else {
        setRecentProducts(items.slice(0, 4));
    }

  }, [currentProduct]);

  // Kalau gak ada history, jangan render apa-apa
  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-100 pt-12">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1 h-6 bg-primary rounded-full"></span>
        <h2 className="text-xl font-bold text-dark">Recently Viewed</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
}