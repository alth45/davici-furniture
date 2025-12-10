'use client'; // <--- Wajib Client Component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar'; // Opsional: Kalau mau tanpa Navbar, hapus baris ini
import { useAuth } from '@/context/AuthContext'; // <--- Import
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: '',
};

export default function LoginPage() {
    const { login } = useAuth(); // <--- Ambil fungsi login
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Biar gak reload halaman
        // Di sini nanti bisa tambah logic cek password ke API
        login(); // Panggil fungsi login (simulasi sukses)
      };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar /> {/* Opsional: Hapus kalau mau tampilan full screen tanpa menu */}

      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* KOLOM KIRI: Gambar Estetik (Hidden di HP) */}
        <div className="hidden md:block w-1/2 relative bg-gray-100">
           <Image 
             src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
             alt="Login Visual"
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-white text-center p-8">
                 <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                 <p className="text-lg opacity-90">Manage your orders and wishlist directly.</p>
              </div>
           </div>
        </div>

        {/* KOLOM KANAN: Form Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
           <div className="w-full max-w-md space-y-8">
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-dark mb-2">Sign In</h1>
                <p className="text-gray-500">
                  Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up for free</Link>
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                 {/* Email */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                   <input 
                     type="email" 
                     placeholder="you@example.com"
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                   />
                 </div>

                 {/* Password */}
                 <div>
                   <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-medium text-gray-700">Password</label>
                     <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                   </div>
                   <input 
                     type="password" 
                     placeholder="••••••••"
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                   />
                 </div>

                 {/* Tombol Login */}
                 <button type='submit' className="w-full bg-dark text-white font-bold py-3 rounded-lg hover:bg-black transition shadow-lg shadow-gray-200">
                    Sign In
                 </button>

                 {/* Divider */}
                 <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                 </div>

                 {/* Social Login Dummy */}
                 <button type="button" className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                 </button>

              </form>
           </div>
        </div>
      </div>
    </div>
  );
}