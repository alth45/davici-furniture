'use client'; // <--- Wajib di sini

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function ContactClient() {
  // State untuk FAQ Accordion
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Data Dummy FAQ
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. We also send tracking updates via email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all furniture items. Products must be in original condition. Shipping fees for returns are covered by the customer unless the item is damaged."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within the United States and Canada. We are working on expanding our shipping to Europe and Asia soon."
    },
    {
      question: "Can I customize the fabric of the sofa?",
      answer: "Yes! Some of our products offer customization options. Look for the 'Customizable' badge on the product page or contact our support team."
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi kirim pesan
    toast.success('Message sent! We will get back to you soon.', { icon: '📬' });
    (e.target as HTMLFormElement).reset();
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-dark">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gray-50 py-16 border-b border-gray-100 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact & Support</h1>
        <p className="text-gray-500 max-w-2xl mx-auto px-4">
          Have a question? We are here to help. Send us a message or check our frequently asked questions below.
        </p>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* KOLOM KIRI: Contact Form */}
          <div className="w-full lg:w-1/2">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </span>
                Send us a message
             </h2>
             <form onSubmit={handleSendMessage} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white">
                        <option>Order Status</option>
                        <option>Return & Refund</option>
                        <option>Product Inquiry</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea required rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"></textarea>
                </div>
                <button className="w-full bg-dark text-white font-bold py-4 rounded-xl hover:bg-black transition shadow-lg shadow-gray-200">
                    Send Message
                </button>
             </form>

             {/* Contact Info Manual */}
             <div className="mt-8 flex flex-col md:flex-row gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                     </div>
                     <div>
                         <p className="font-bold text-dark">Phone</p>
                         <p>+1 (800) 123-4567</p>
                     </div>
                </div>
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                     </div>
                     <div>
                         <p className="font-bold text-dark">Address</p>
                         <p>123 Furniture St, NY</p>
                     </div>
                </div>
             </div>
          </div>

          {/* KOLOM KANAN: FAQ Accordion */}
          <div className="w-full lg:w-1/2">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-10 h-10 bg-orange-100 text-primary rounded-full flex items-center justify-center">?</span>
                Frequently Asked Questions
             </h2>
             
             <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300">
                        <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition"
                        >
                            <span className={`font-bold ${activeFaq === index ? 'text-primary' : 'text-dark'}`}>
                                {faq.question}
                            </span>
                            <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </span>
                        </button>
                        
                        {/* Animasi Buka Tutup manual dengan max-height */}
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
             </div>

             {/* Map Placeholder */}
             <div className="mt-8 h-64 bg-gray-200 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 font-bold group-hover:scale-105 transition duration-700">
                    [ Google Maps Embed Placeholder ]
                </div>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-sm text-xs font-bold">
                    Davici HQ
                </div>
             </div>

          </div>

        </div>
      </main>
    </div>
  );
}