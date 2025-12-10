'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type QuickViewContextType = {
  selectedProduct: any | null;
  openQuickView: (product: any) => void;
  closeQuickView: () => void;
};

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const openQuickView = (product: any) => {
    setSelectedProduct(product);
    // Opsional: Matikan scroll body pas modal muncul biar gak gerak2 belakangnya
    document.body.style.overflow = 'hidden'; 
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <QuickViewContext.Provider value={{ selectedProduct, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) throw new Error('useQuickView must be used within a QuickViewProvider');
  return context;
}