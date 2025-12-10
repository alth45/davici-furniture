'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 1. Cek LocalStorage pas loading pertama kali (Biar di-refresh gak logout sendiri)
  useEffect(() => {
    const userStatus = localStorage.getItem('davici_is_logged_in');
    if (userStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // 2. Fungsi Login
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('davici_is_logged_in', 'true');
    toast.success('Welcome back!', { icon: '👋' });
    router.push('/account'); // Lempar ke dashboard
  };

  // 3. Fungsi Logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('davici_is_logged_in');
    toast.success('Logged out successfully');
    router.push('/login'); // Lempar balik ke login
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}