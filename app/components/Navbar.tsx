'use client'; 

import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 
import { useState } from 'react'; 
import Image from 'next/image'; 
import { products } from '@/data/mockData'; 
import { useWishlist } from '@/context/WishlistContext'; 
import { useAuth } from '@/context/AuthContext'; // <--- 1. Import ini

export default function Navbar() {
  const { totalItems } = useCart(); 
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlistItems } = useWishlist(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth(); // <--- 2. Ambil status login

  // Filter produk berdasarkan ketikan user
  const searchResults = searchQuery.length > 0 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="w-full bg-white py-4 border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        
        {/* --- BARIS UTAMA (Flex Container) --- */}
        <div className="flex items-center justify-between gap-4">

            {/* 1. BAGIAN KIRI: Logo & Hamburger (Mobile) */}
            <div className="flex items-center gap-4">
                {/* Tombol Hamburger (Hanya muncul di Mobile / lg:hidden) */}
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-1 text-gray-600 hover:text-primary transition"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    )}
                </button>

                {/* Logo (Selalu muncul) */}
                <Link href="/" className="text-2xl font-bold text-dark">Davici</Link>

                {/* Navigasi Desktop (Hanya muncul di Desktop / hidden lg:flex) */}
                <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600 ml-8">
                    <Link href="/" className="text-primary">Home</Link>
              <Link href="/shop" className="hover:text-primary">Shop</Link>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
                    <Link href="/wishlist" className="hover:text-primary">Wishlist</Link>
                </nav>
            </div>

            {/* 2. BAGIAN TENGAH: Search Bar (Desktop Only) */}
            {/* Di mobile biasanya search bar disembunyikan atau beda layout, di sini kita hide dulu di mobile biar rapi */}
            <div className="hidden lg:block relative w-full max-w-md z-50"> 
                <div className="flex items-center bg-gray-100 rounded-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary/50 transition">
                    <input 
                        type="text" 
                        placeholder="Search furniture..." 
                        className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none text-gray-600 placeholder-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button className="bg-dark text-white px-4 py-3 hover:bg-black transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>

                {/* Dropdown Hasil Search */}
                {searchQuery.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg border border-gray-100 mt-1 max-h-80 overflow-y-auto no-scrollbar">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <Link 
                                    href={`/product/${product.id}`} 
                                    key={product.id}
                                    onClick={() => setSearchQuery('')} 
                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-none"
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 relative overflow-hidden">
                                        <Image 
                                            src={product.image} 
                                            alt={product.name} 
                                            fill 
                                            className="object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-dark truncate">{product.name}</h4>
                                        <p className="text-xs text-primary font-bold">{product.price}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-400">
                                No products found for "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 3. BAGIAN KANAN: User Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
                
                {/* Cart Icon Mobile (Hanya muncul di Mobile / lg:hidden) */}
                <Link href="/checkout" className="lg:hidden relative text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>}
                </Link>

                {/* User Actions Desktop (Hanya muncul di Desktop / hidden lg:flex) */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            {/* Logic Tombol Login vs User */}
            {isLoggedIn ? (
                // KONDISI 1: SUDAH LOGIN (Muncul Icon User -> Dashboard)
                <Link href="/account" className="hover:text-primary relative group flex items-center gap-2">
                    <div className="hidden lg:block text-right">
                        <span className="block text-xs font-bold text-dark">Hi, John</span>
                        <span className="block text-[10px] text-gray-500">Member</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                </Link>
            ) : (
                // KONDISI 2: BELUM LOGIN (Muncul Teks Login)
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary">
                    Login
                </Link>
            )}
                    {/* <Link href="/login" className="hover:text-primary">Login</Link> */}
                    
                    <div className="flex items-center gap-4">
                        {/* Wishlist Icon */}
                        <Link href="/wishlist" className="hover:text-primary relative group">
                            <svg className={`w-5 h-5 ${wishlistItems.length > 0 ? 'text-primary fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>
                        
                        {/* Cart Icon Desktop */}
                        <Link href="/checkout" className="hover:text-primary relative group">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </div>        {/* --- MOBILE MENU DROPDOWN --- */}
{isMobileMenuOpen && (
  <nav className="lg:hidden w-full flex flex-col gap-4 py-4 border-t border-gray-100 bg-gray-50 px-4 rounded-lg mt-4 animate-fadeIn shadow-lg absolute top-16 left-0 right-0 z-50">
    
    {/* 1. Mobile Search Bar */}
    <div className="relative"> {/* Tambah relative biar dropdown hasil search posisinya pas */}
        <div className="flex items-center bg-white rounded-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary/50 transition">
            <input 
                type="text" 
                placeholder="Search furniture..." 
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none text-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {/* Tombol X buat clear search di HP biar gampang */}
            {searchQuery.length > 0 && (
                <button onClick={() => setSearchQuery('')} className="p-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            )}
        </div>

        {/* 2. Logic Hasil Search Mobile (Ini yang tadi kurang) */}
        {searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg border border-gray-100 mt-1 max-h-60 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <Link 
                            href={`/product/${product.id}`} 
                            key={product.id}
                            onClick={() => {
                                setSearchQuery('');       // Reset search
                                setIsMobileMenuOpen(false); // Tutup menu mobile otomatis
                            }} 
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-none"
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 relative overflow-hidden">
                                <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    className="object-contain mix-blend-multiply"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-dark truncate">{product.name}</h4>
                                <p className="text-xs text-primary font-bold">{product.price}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-4 text-center text-sm text-gray-400">
                        No products found
                    </div>
                )}
            </div>
        )}
    </div>
    
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-primary py-2 border-b border-gray-100">Home</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-primary py-2 border-b border-gray-100">Shop</Link>
            <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-primary flex justify-between py-2 border-b border-gray-100">
                Wishlist
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{wishlistItems.length}</span>
            </Link>

            {/* Logic Tombol Login vs User */}
            {isLoggedIn ? (
                // KONDISI 1: SUDAH LOGIN (Muncul Icon User -> Dashboard)
                <Link href="/account" className="hover:text-primary relative group flex items-center gap-2">
                    <div className="hidden lg:block text-right">
                        <span className="block text-xs font-bold text-dark">Hi, John</span>
                        <span className="block text-[10px] text-gray-500">Member</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                </Link>
            ) : (
                // KONDISI 2: BELUM LOGIN (Muncul Teks Login)
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary">
                    Login
                </Link>
            )}
            
            {/* <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary py-2 mt-2">Login / Register</Link> */}
          </nav>
        )}

      </div>
    </header>
  );
}