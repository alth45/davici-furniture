import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "@/context/CartContext"; // <--- 1. Import ini// <--- 1. Import ini
import { WishlistProvider } from "@/context/WishlistContext"; // <--- 1. Import
import Footer from "@/components/Footer"; // <--- 1. Import Footer
import { QuickViewProvider } from "@/context/QuickViewContext"; // <--- 1. Import
import QuickViewModal from "@/components/QuickViewModal";
import { AuthProvider } from "@/context/AuthContext"; // <--- Import
import NewsletterPopup from "@/components/NewsletterPopup"; // <--- 1. Import
import "./globals.css";
import NextTopLoader from 'nextjs-toploader'; // <--- 1. Import ini
import ChatWidget from "@/components/ChatWidget"; // <-- GANTI INI
import { CompareProvider } from "@/context/CompareContext"; // <--- Import
import CompareFloatingBar from "@/components/CompareFloatingBar"; //1. IMPORT INI

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update bagian ini:
export const metadata: Metadata = {
  title: {
    template: '%s | Davici Furniture', // %s bakal diganti sama judul per halaman
    default: 'Davici Furniture - Best Modern Interior', // Judul default kalau gak ada spesifik
  },
  description: "Discover the best furniture for your modern home. High quality, affordable prices, and fast shipping.",
  keywords: ['Furniture', 'Sofa', 'Chair', 'Interior', 'Davici'],
  openGraph: {
    title: 'Davici Furniture',
    description: 'Best Modern Interior Store',
    type: 'website',
    locale: 'en_US',
    url: 'https://davici-store.vercel.app', // Ganti domain asli nanti
    siteName: 'Davici',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <CartProvider>
          {/* 2. Taruh komponen Toaster di sini (paling atas atau bawah body) */}
          <WishlistProvider>
              <QuickViewProvider>
                <CompareProvider>
                <Toaster 
                  position="bottom-right" 
                  toastOptions={{
                    style: {
                      background: '#333',
                      color: '#fff',
                    },
                    success: {
                      iconTheme: {
                        primary: '#FF8C4B',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                {/* 2. Pasang di sini. Warnanya kita set warna Primary (Orange) */}
                    <NextTopLoader 
                      color="#FF8C4B"
                      initialPosition={0.08}
                      crawlSpeed={200}
                      height={3}
                      crawl={true}
                      showSpinner={false}
                      easing="ease"
                      speed={200}
                      shadow="0 0 10px #FF8C4B,0 0 5px #FF8C4B"
                />
                  <ChatWidget />
                  <CompareFloatingBar/>
                <NewsletterPopup/>
                <QuickViewModal/>
            {children}
                  <Footer />
                  </CompareProvider>
            </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
