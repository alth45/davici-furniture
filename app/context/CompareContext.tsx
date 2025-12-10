'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  // Ceritanya kita punya data spesifikasi (di real app ini dari database)
  category?: string;
  rating?: number;
};

type CompareContextType = {
  compareItems: Product[];
  addToCompare: (product: any) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const addToCompare = (product: any) => {
    // Cek apakah sudah ada?
    if (compareItems.some((item) => item.id === product.id)) {
      toast.error('Already added to compare!');
      return;
    }
    // Cek maksimal 3 barang
    if (compareItems.length >= 3) {
      toast.error('You can only compare up to 3 items.');
      return;
    }

    setCompareItems((prev) => [...prev, product]);
    toast.success('Added to comparison list', { icon: '⚖️' });
  };

  const removeFromCompare = (id: number) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCompare = (id: number) => {
    return compareItems.some((item) => item.id === id);
  };
  
  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within a CompareProvider');
  return context;
}