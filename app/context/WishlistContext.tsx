'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type WishlistContextType = {
  wishlistItems: Product[];
  toggleWishlist: (product: any) => void;
  isInWishlist: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  // 1. LOAD DATA
  useEffect(() => {
    setIsClient(true);
    const savedWishlist = localStorage.getItem('davici_wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // 2. SAVE DATA
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('davici_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isClient]);

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      toast.error('Removed from Wishlist', { icon: '💔', style: { fontSize: '12px' } });
    } else {
      setWishlistItems((prev) => [...prev, {
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image 
      }]);
      toast.success('Added to Wishlist', { icon: '❤️', style: { fontSize: '12px' } });
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
}