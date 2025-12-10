'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/mockData';
import RecentlyViewed from '@/components/RecentlyViewed'; // 





export default function ShopPage() {
  // --- STATE UNTUK FILTER ---
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(500); // Max harga awal $500
  const [sortBy, setSortBy] = useState('default'); // default, low-high, high-low
  const [filteredProducts, setFilteredProducts] = useState(products);

  

  // --- LOGIC FILTERING ---
  useEffect(() => {
    let result = products;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      // Kita asumsikan nama produk mengandung nama kategori (karena data dummy simpel)
      // Di real app, nanti pake property product.category
      result = result.filter(p => 
        p.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Sofas' && p.name.includes('Seater')) // Logika manual buat data dummy
      );
    }

    // 2. Filter by Price (Simple parsing karena harga string '$80.00')
    result = result.filter(p => {
      const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
      return price <= priceRange;
    });

    // 3. Sorting
    if (sortBy === 'low-high') {
      result.sort((a, b) => parseFloat(a.price.replace('$','')) - parseFloat(b.price.replace('$','')));
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => parseFloat(b.price.replace('$','')) - parseFloat(a.price.replace('$','')));
    }

    setFilteredProducts(result);
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="bg-white min-h-screen text-dark font-sans">
      <Navbar />

      {/* Header Banner Simpel */}
      <div className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Shop All Products</h1>
          <p className="text-gray-500">Find the best furniture for your home</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        
        {/* --- SIDEBAR FILTER (Kiri) --- */}
        <aside className="w-full md:w-1/4 space-y-8">
          
          {/* Filter Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b pb-2 border-gray-100">Categories</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`block w-full text-left px-2 py-1 rounded transition ${selectedCategory === 'All' ? 'text-primary font-bold bg-orange-50' : 'text-gray-500 hover:text-dark'}`}
              >
                All Categories
              </button>
              {categories.map((cat, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`block w-full text-left px-2 py-1 rounded transition ${selectedCategory === cat.name ? 'text-primary font-bold bg-orange-50' : 'text-gray-500 hover:text-dark'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Price Range */}
          <div>
             <h3 className="font-bold text-lg mb-4 border-b pb-2 border-gray-100">Max Price: <span className="text-primary">${priceRange}</span></h3>
             <input 
               type="range" 
               min="0" 
               max="500" 
               value={priceRange} 
               onChange={(e) => setPriceRange(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
             />
             <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$0</span>
                <span>$500+</span>
             </div>
          </div>

          {/* Promotional Banner Kecil di Sidebar */}
          <div className="relative h-64 rounded-xl overflow-hidden group hidden md:block">
            <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" fill className="object-cover" alt="Promo"/>
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
               <span className="text-white font-bold text-xl mb-2">Summer Sale</span>
               <span className="text-white/80 text-sm mb-4">Up to 50% Off</span>
               <button className="bg-primary text-white text-xs px-4 py-2 rounded">Shop Now</button>
            </div>
          </div>

        </aside>

        {/* --- GRID PRODUK (Kanan) --- */}
        <section className="w-full md:w-3/4">
          
          {/* Toolbar Atas (Sorting & Count) */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
             <p className="text-gray-500 text-sm">Showing <span className="font-bold text-dark">{filteredProducts.length}</span> results</p>
             
             <div className="flex items-center gap-2">
               <label className="text-sm text-gray-500">Sort by:</label>
               <select 
                 value={sortBy} 
                 onChange={(e) => setSortBy(e.target.value)}
                 className="border border-gray-200 rounded px-3 py-1.5 text-sm outline-none focus:border-primary"
               >
                 <option value="default">Default</option>
                 <option value="low-high">Price: Low to High</option>
                 <option value="high-low">Price: High to Low</option>
               </select>
             </div>
          </div>

          {/* The Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          ) : (
            // State kalau hasil filter kosong
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
               <p className="text-gray-400 mb-2">No products match your filter.</p>
               <button 
                  onClick={() => { setSelectedCategory('All'); setPriceRange(500); }}
                  className="text-primary font-medium hover:underline"
               >
                 Reset Filters
               </button>
            </div>
          )}

        </section>
      </main>
      
      <div className="container mx-auto px-4 pb-12">
         <RecentlyViewed /> 
      </div>
    </div>
  );
}