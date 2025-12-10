'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // <--- Import

export default function AccountPage() {
  const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const { logout } = useAuth(); // <--- Ambil fungsi logout

  // Dummy Data Order History
  const orders = [
    { id: 'ORD-8821', date: 'Oct 12, 2025', status: 'Delivered', total: '$145.00', items: 3 },
    { id: 'ORD-8822', date: 'Nov 05, 2025', status: 'Processing', total: '$80.00', items: 1 },
    { id: 'ORD-8823', date: 'Dec 01, 2025', status: 'Cancelled', total: '$25.00', items: 1 },
  ];

  const handleLogout = () => {
    logout(); // Panggil fungsi dari Context (ini akan redirect otomatis ke login)
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-dark">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIDEBAR MENU (Kiri) --- */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Profile Mini */}
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" width={50} height={50} alt="Avatar" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">John Doe</h3>
                        <p className="text-xs text-gray-500">john@example.com</p>
                    </div>
                </div>

                {/* Menu Links */}
                <nav className="p-2 space-y-1">
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-orange-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'orders' ? 'bg-orange-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        My Orders
                    </button>
                    <button 
                        onClick={() => setActiveTab('address')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-3 ${activeTab === 'address' ? 'bg-orange-50 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Address
                    </button>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition flex items-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </nav>
            </div>
          </aside>

          {/* --- KONTEN KANAN (Dinamis) --- */}
          <div className="w-full lg:w-3/4">
            
            {/* VIEW 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
                            <p className="text-3xl font-bold text-dark">12</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-gray-500 text-sm mb-2">Pending</h3>
                            <p className="text-3xl font-bold text-orange-500">1</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="text-gray-500 text-sm mb-2">Total Spent</h3>
                            <p className="text-3xl font-bold text-dark">$1,250</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                        <p className="text-gray-500 text-sm">No recent activity to show.</p>
                    </div>
                </div>
            )}

            {/* VIEW 2: ORDERS */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-lg">Order History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Order ID</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Total</th>
                                    <th className="px-6 py-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-dark">#{order.id}</td>
                                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                                  order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                                                  'bg-red-100 text-red-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{order.total}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-primary hover:underline font-medium">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* VIEW 3: ADDRESS */}
            {activeTab === 'address' && (
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm animate-fadeIn">
                    <h3 className="font-bold text-lg mb-6">Shipping Address</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" defaultValue="John" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" defaultValue="Doe" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Street Address</label>
                            <input type="text" defaultValue="123 Main Street, Apartment 4B" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">City</label>
                            <input type="text" defaultValue="New York" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Zip Code</label>
                            <input type="text" defaultValue="10001" className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-primary" />
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button className="bg-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}