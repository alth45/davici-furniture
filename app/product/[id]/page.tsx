import React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/mockData';
import Navbar from '@/components/Navbar';
import ProductDetailClient from '@/components/ProductDetailClient'; // Import component interaktif tadi
import { Metadata } from 'next'; // <--- 1. Import Metadata

interface PageProps {
  params: Promise<{ id: string }>;
}


// 2. Tambahkan Fungsi generateMetadata (di luar komponen utama)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  
  // Cari produk (di real app ini fetch ke API/Database)
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name, // Judul Tab jadi Nama Produk
    description: `Buy ${product.name} only for ${product.price}. Limited stock!`,
    openGraph: {
      images: [product.image], // Biar gambar produk muncul pas di-share link-nya
    },
  };
}


export default async function ProductDetailPage({ params }: PageProps) {
  // 1. Ambil ID dari URL (Server Side)
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);
  const product = products.find((p) => p.id === productId);

  // 2. Cek eksistensi produk
  if (!product) {
    return notFound();
  }

  // 3. Siapkan data related products
  const relatedProducts = products.filter((p) => p.id !== productId).slice(0, 4);

  return (
    <>
      {/* Navbar tetap di Server Component biar cepat */}
      <Navbar /> 
      
      {/* Panggil Client Component untuk isi body yang interaktif */}
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}