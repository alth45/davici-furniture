'use client'; // Client Component karena butuh interaksi (State)

import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '@/data/mockData';

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState('LATEST PRODUCTS');
  const tabs = ['LATEST PRODUCTS', 'TOP RATING', 'BEST SELLERS'];

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-dark">Hot Products</h2>
        
        <div className="flex overflow-x-auto no-scrollbar gap-8 text-sm font-medium border-b border-gray-200 md:border-none pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-1 transition-colors ${
                activeTab === tab ? 'text-dark border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </section>
  );
}