'use client'; // <--- WAJIB: Ini penanda kalau file ini boleh pakai State/Interaksi

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext'; // <--- Import hook
import { toast } from 'react-hot-toast';
import RecentlyViewed from '@/components/RecentlyViewed'; // <--- 1. Import ini
import Reviews from '@/components/Reviews'; // <--- 1. Import ini
import ImageMagnifier from '@/components/ImageMagnifier';

// Definisikan tipe data props yang diterima
interface ProductDetailClientProps {
  product: any;          // Data produk utama
  relatedProducts: any[]; // Data produk rekomendasi
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  
  // --- STATE (Variable yang bisa berubah) ---
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
    const [activeColor, setActiveColor] = useState('#333333');
    const { addToCart } = useCart(); // <--- Ambil fungsi addToCart

  // Simulasi gallery (karena di database cuma ada 1 gambar, kita duplikat aja biar fitur thumbnail kelihatan jalan)
  const galleryImages = [
    product.image,
    product.image, // Ceritanya gambar tampak samping
    product.image, // Ceritanya gambar tampak belakang
    product.image  // Ceritanya gambar zoom
  ];

  // --- LOGIC FUNCTIONS ---
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
    // 2. Ganti alert(...) dengan toast
    // 2. Munculin notifikasi Toast
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold">Added to Cart!</span>
        <span className="text-xs text-gray-500">{quantity}x {product.name}</span>
      </div>,
        {
            duration: 3000,
            style: { border: '1px solid #FF8C4B', padding: '12px' },
            iconTheme: { primary: '#FF8C4B', secondary: '#fff' },
        }
        );
    };


  return (
    <div className="bg-white min-h-screen font-sans text-dark">
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-dark">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* --- KOLOM KIRI: GALERI GAMBAR (INTERAKTIF) --- */}
          <div className="w-full lg:w-7/12 space-y-6">
            
            {/* Main Image View */}
            <div className="aspect-square md:aspect-[4/3] w-full bg-[#F9F9F9] rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group border border-gray-100">
               {/* Gambar berubah sesuai state activeImage */}
               <ImageMagnifier 
                    src={activeImage} 
                    alt={product.name}
                />
               <div className="absolute top-6 left-6 flex flex-col gap-2">
                 {product.discount && <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{product.discount} OFF</span>}
               </div>
            </div>

            {/* Thumbnails Selector */}
            <div className="grid grid-cols-4 gap-4">
               {galleryImages.map((img, idx) => (
                 <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)} // <-- KLIK DISINI MENGUBAH GAMBAR UTAMA
                    className={`aspect-square rounded-xl border-2 flex items-center justify-center p-2 bg-[#F9F9F9] transition overflow-hidden relative
                        ${activeImage === img && idx === 0 ? 'border-primary ring-2 ring-orange-100' : 'border-transparent hover:border-gray-200'}
                    `}
                 >
                    <Image 
                      src={img} 
                      alt="Thumbnail" 
                      width={100} 
                      height={100} 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                    {/* Overlay kalau sedang dipilih (opsional visual cue) */}
                    {activeImage === img && idx === 0 && <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>}
                 </button>
               ))}
            </div>
          </div>

          {/* --- KOLOM KANAN: DETAIL INFO & FORM --- */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-24 space-y-8">
              
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-dark leading-tight">{product.name}</h1>
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                   <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-primary">{product.price}</span>
                      {product.oldPrice && <span className="text-lg text-gray-400 line-through mb-1">{product.oldPrice}</span>}
                   </div>
                </div>
              </div>

              {/* Selectors */}
              <div className="space-y-5">
                
                {/* Color Selector (Interaktif) */}
                <div>
                   <span className="block text-sm font-bold text-dark mb-3">Choose Color: <span className="font-normal text-gray-500">{activeColor}</span></span>
                   <div className="flex items-center gap-3">
                      {['#333333', '#FF8C4B', '#A0AEC0', '#1A202C'].map((color, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveColor(color)}
                            className={`w-8 h-8 rounded-full border-2 ring-offset-2 transition ${activeColor === color ? 'ring-2 ring-primary border-transparent scale-110' : 'ring-0 border-gray-200 hover:scale-105'}`} 
                            style={{ backgroundColor: color }}
                        ></button>
                      ))}
                   </div>
                </div>

                {/* Actions Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                   
                   {/* Quantity Input */}
                   <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 sm:w-1/3 justify-between">
                      <button 
                        onClick={handleDecrement}
                        className="text-gray-500 hover:text-primary hover:bg-orange-50 w-8 h-8 rounded-full flex items-center justify-center transition font-bold text-lg"
                      >-</button>
                      
                      <input type="text" value={quantity} readOnly className="w-10 text-center outline-none font-bold text-dark bg-transparent" />
                      
                      <button 
                        onClick={handleIncrement}
                        className="text-gray-500 hover:text-primary hover:bg-orange-50 w-8 h-8 rounded-full flex items-center justify-center transition font-bold text-lg"
                      >+</button>
                   </div>

                   {/* Add To Cart Button */}
                   <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-dark text-white font-bold rounded-xl py-3 hover:bg-black transition shadow-lg shadow-gray-200 active:scale-95 transform duration-100"
                   >
                      Add to Cart
                   </button>
                   
                   <Link href="/checkout" className="flex-1 bg-primary text-white font-bold text-center flex items-center justify-center rounded-xl py-3 hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                      Buy Now
                   </Link>
                </div>
              </div>
                
              {/* Trust Badges tetap sama */}
              <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-100 text-xs font-medium text-gray-600">
                 {/* ... copy icon dari sebelumnya ... */}
                 <div className="flex items-center gap-3">
                    <span className="bg-orange-50 p-2 rounded-full text-primary">✓</span>
                    <span>1 Year Warranty</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="bg-orange-50 p-2 rounded-full text-primary">🚚</span>
                    <span>Free Shipping</span>
                 </div>
              </div>

            </div>
          </div>
              </div>
              
        <Reviews productId={product.id} />
        {/* Related Products */}
        <section className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-dark">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} data={prod} />
            ))}
          </div>
              </section>
              
              <RecentlyViewed currentProduct={product} />

      </main>
    </div>
  );
}