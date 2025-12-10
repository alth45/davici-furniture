'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';

export default function ComparePage() {
  const { compareItems, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareItems.length === 0) {
    return (
      <div className="bg-white min-h-screen text-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">No items to compare</h1>
            <p className="text-gray-500 mb-8">Add some products to the comparison list first.</p>
            <Link href="/shop" className="bg-primary text-white px-6 py-3 rounded-xl font-bold">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-dark font-sans">
      <Navbar />

      <div className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Product Comparison</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 overflow-x-auto">
         
         <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
                <tr>
                    <th className="p-6 border-b border-gray-100 w-1/4 align-top">
                        <span className="text-lg font-bold text-gray-400">Features</span>
                    </th>
                    {compareItems.map((product) => (
                        <th key={product.id} className="p-6 border-b border-gray-100 w-1/4 align-top relative">
                            <button 
                                onClick={() => removeFromCompare(product.id)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
                            >✕</button>
                            <div className="relative h-48 mb-4 bg-gray-50 rounded-xl">
                                <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                            <p className="text-primary font-bold text-xl mb-4">{product.price}</p>
                            <button 
                                onClick={() => addToCart(product, 1)}
                                className="w-full bg-dark text-white py-2 rounded-lg font-medium hover:bg-primary transition text-sm"
                            >
                                Add to Cart
                            </button>
                        </th>
                    ))}
                    {/* Isi kolom kosong biar tabel rapi kalau item < 3 */}
                    {[...Array(3 - compareItems.length)].map((_, i) => (
                         <th key={i} className="p-6 border-b border-gray-100 w-1/4 align-middle text-center bg-gray-50/50">
                             <div className="text-gray-300 font-medium">Add item</div>
                         </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                <tr>
                    <td className="p-6 font-bold text-dark bg-gray-50/50">Rating</td>
                    {compareItems.map((product) => (
                        <td key={product.id} className="p-6">
                            <span className="text-yellow-400">★★★★★</span> 
                            <span className="text-gray-400 ml-2">({product.reviews || 0} reviews)</span>
                        </td>
                    ))}
                    {[...Array(3 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                </tr>
                <tr>
                    <td className="p-6 font-bold text-dark bg-gray-50/50">Material</td>
                    {compareItems.map((product) => (
                        <td key={product.id} className="p-6">Solid Wood, Fabric</td>
                    ))}
                    {[...Array(3 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                </tr>
                <tr>
                    <td className="p-6 font-bold text-dark bg-gray-50/50">Dimensions</td>
                    {compareItems.map((product) => (
                        <td key={product.id} className="p-6">H: 80cm x W: 60cm x D: 50cm</td>
                    ))}
                    {[...Array(3 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                </tr>
                <tr>
                    <td className="p-6 font-bold text-dark bg-gray-50/50">Warranty</td>
                    {compareItems.map((product) => (
                        <td key={product.id} className="p-6">1 Year Official</td>
                    ))}
                    {[...Array(3 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                </tr>
                <tr>
                    <td className="p-6 font-bold text-dark bg-gray-50/50">Availability</td>
                    {compareItems.map((product) => (
                        <td key={product.id} className="p-6"><span className="text-green-600 font-bold">In Stock</span></td>
                    ))}
                    {[...Array(3 - compareItems.length)].map((_, i) => <td key={i}></td>)}
                </tr>
            </tbody>
         </table>

      </main>
    </div>
  );
}