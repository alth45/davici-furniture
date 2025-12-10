import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Register page',
//   description: '',
// };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row-reverse"> 
        {/* Note: md:flex-row-reverse biar gambarnya pindah ke KANAN kalau di register */}
        
        {/* KOLOM KANAN (Visual) */}
        <div className="hidden md:block w-1/2 relative bg-gray-100">
           <Image 
             src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800"
             alt="Register Visual"
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-white text-center p-8">
                 <h2 className="text-4xl font-bold mb-4">Join Davici</h2>
                 <p className="text-lg opacity-90">Unlock exclusive deals and faster checkout.</p>
              </div>
           </div>
        </div>

        {/* KOLOM KIRI (Form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
           <div className="w-full max-w-md space-y-8">
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-dark mb-2">Create Account</h1>
                <p className="text-gray-500">
                  Already a member? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
                </p>
              </div>

              <form className="space-y-6">
                 {/* Full Name */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                   <input 
                     type="text" 
                     placeholder="John Doe"
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                   />
                 </div>

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
                   <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                   <input 
                     type="password" 
                     placeholder="Create a strong password"
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                   />
                   <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters.</p>
                 </div>

                 {/* Terms */}
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="accent-primary w-4 h-4"/>
                    <label htmlFor="terms" className="text-sm text-gray-500">I agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.</label>
                 </div>

                 <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                    Create Account
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}