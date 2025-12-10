'use client'

import React from 'react';
import Image from 'next/image';
import { useCountdown } from '@/hooks/useCountdown';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext'; // <--- Import
import { useQuickView } from '@/context/QuickViewContext'; // <--- 1. Import
import { useCompare } from '@/context/CompareContext'; // <--- Import

// Tipe data props (optional jika pakai TS)
interface ProductProps {
  data: {
    id: number;
    name: string;
    image: string;
    price: string;
    oldPrice?: string;
    reviews: number;
    discount?: string;
    isHot?: boolean;
    timer?: string;
  }
}

// Helper kecil buat nambah angka 0 di depan (misal: 5 jadi 05)
const pad = (num: number) => num.toString().padStart(2, '0');

// Komponen kecil khusus Timer biar rapi
const TimerBadge = ({ targetDate }: { targetDate: string }) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    // Kalau waktunya udah lewat, bisa di-return null (ilang) atau teks "Expired"
    if (days + hours + minutes + seconds <= 0) return null;

    return (
        
        <div className="mx-4 -mt-3 relative z-10 bg-white border border-orange-100 shadow-sm rounded py-1 px-2 text-center">
        <p className="text-[10px] text-gray-500">
            End in: <span className="font-bold text-dark" suppressHydrationWarning>
            {/* Tampilkan format: 20d : 12h : 05m : 30s */}
            {days}d : {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
            </span>
        </p>
        </div>
    );
};

export default function ProductCard({ data }: { data: any }) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLoved = isInWishlist(data.id);
    const { openQuickView } = useQuickView(); // <--- 2. Ambil fungsi open
    const { addToCompare, isInCompare } = useCompare(); // <--- Ambil fungsi
    const isComparing = isInCompare(data.id);


    return (
        <Link href={`/product/${data.id}`} className="block">
            <div className="bg-white group rounded-lg border border-gray-100 hover:shadow-lg transition duration-300 overflow-hidden relative">
            {/* Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                {data.discount && <span className="bg-[#E74C3C] text-white text-[10px] font-bold px-2 py-1 rounded">{data.discount}</span>}
                {data.isHot && <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">HOT</span>}
            </div>

            {/* Image & Hover Icons */}
            <div className="h-64 w-full bg-gray-50 flex items-center justify-center p-4 relative">
                    <Image src={data.image} alt={data.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500"
                        fill
                    />
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                        {/* Tombol-tombol icon disederhanakan */}
                        {/* TOMBOL WISHLIST (Tombol Pertama) */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault(); // Biar gak pindah halaman pas klik tombol ini
                                toggleWishlist(data);
                            }}
                            className={`w-8 h-8 rounded-full shadow flex items-center justify-center transition 
                                ${isLoved ? 'bg-primary text-white' : 'bg-white hover:bg-primary hover:text-white text-gray-600'}`}
                        >
                            {/* Icon Hati */}
                            <svg className="w-4 h-4" fill={isLoved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </button>

                        {/* TOMBOL QUICK VIEW (ICON MATA / Tengah) */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault(); // Jangan pindah halaman
                                openQuickView(data); // Buka Modal!
                            }}
                            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-white transition text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                        <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCompare(data);
                                }}
                                className={`w-8 h-8 rounded-full shadow flex items-center justify-center transition 
                                ${isComparing ? 'bg-primary text-white' : 'bg-white hover:bg-primary hover:text-white text-gray-600'}`}
                                title="Compare"
                            >
                                {/* Icon Timbangan / Panah Bolak Balik */}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                        </button>

                    <button className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-primary hover:text-white transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </button>
                </div>
            </div>

            {/* Timer */}
                {data.timer && <TimerBadge targetDate={data.timer} />}

            {/* Details */}
            <div className="p-4">
                <h3 className="text-sm font-medium text-dark mb-1 truncate">{data.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                {data.oldPrice && <span className="text-gray-400 line-through text-xs">{data.oldPrice}</span>}
                <span className="font-bold text-primary">{data.price}</span>
                </div>
            </div>
            </div>
        </Link>
  );
}