'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'; // <--- Tambah useEffect

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // State untuk menandai kalau client sudah siap (menghindari error Hydration Next.js)
  const [isClient, setIsClient] = useState(false);

  // 1. LOAD DATA saat pertama kali buka (Hanya di Client)
  useEffect(() => {
    setIsClient(true); // Tandai sudah di client
    const savedCart = localStorage.getItem('davici_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. SAVE DATA setiap kali cartItems berubah
  useEffect(() => {
    if (isClient) { // Cuma simpan kalau sudah di client
      localStorage.setItem('davici_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const addToCart = (product: any, qty: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [...prevItems, { 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            image: product.image, 
            quantity: qty 
        }];
      }
    });
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}