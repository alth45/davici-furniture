'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'admin';
  time: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // State Pesan (Default ada pesan sapaan)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! 👋 Selamat datang di Davici Furniture. Ada yang bisa kami bantu?",
      sender: 'admin',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Ref buat auto scroll ke bawah
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  // Logic Kirim Pesan
  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true); // Simulasi admin mengetik

    // Simulasi Balasan Bot (Delay 1.5 detik)
    setTimeout(() => {
      const botReply = getBotResponse(newUserMsg.text);
      const newAdminMsg: Message = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'admin',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, newAdminMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // Logic "Otak" Bot Sederhana
  const getBotResponse = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('harga') || lower.includes('mahal') || lower.includes('biaya')) {
      return "Untuk harga, semua sudah tertera di katalog ya kak. Kita lagi ada diskon 20% pakai kode 'DAVICI' lho! 😉";
    } else if (lower.includes('lokasi') || lower.includes('alamat') || lower.includes('toko')) {
      return "Toko kami berlokasi di Jakarta Selatan. Tapi kami melayani pengiriman ke seluruh Indonesia 🚚";
    } else if (lower.includes('stok') || lower.includes('ada')) {
      return "Stok produk di website kami selalu update real-time kak. Kalau bisa di-klik beli, berarti ready! ✅";
    } else if (lower.includes('wa') || lower.includes('whatsapp') || lower.includes('admin')) {
        return "Boleh kak, kalau mau chat personal bisa langsung klik link ini ya: https://wa.me/628123456789";
    } else {
      return "Terima kasih pesannya! Tim support kami akan segera membalas. Mohon tunggu sebentar ya... 😊";
    }
  };

  return (
    <>
      {/* 1. JENDELA CHAT (Muncul kalau isOpen = true) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[90] flex flex-col overflow-hidden animate-scaleIn origin-bottom-right">
          
          {/* Header */}
          <div className="bg-dark p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full p-0.5">
                   <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" width={40} height={40} alt="Admin" className="rounded-full" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-dark rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Customer Support</h3>
                <p className="text-xs text-gray-300">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Body (List Pesan) */}
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                 <div 
                   className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                   ${msg.sender === 'user' 
                     ? 'bg-primary text-white rounded-br-none' 
                     : 'bg-white text-dark border border-gray-100 rounded-bl-none'}`}
                 >
                   {/* Render link kalau ada https */}
                   {msg.text.includes('http') ? (
                       <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="underline font-bold">Klik Disini</a>') }} />
                   ) : (
                       msg.text
                   )}
                 </div>
                 <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
            
            {/* Indikator Typing */}
            {isTyping && (
              <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-2xl rounded-bl-none w-fit border border-gray-100">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer (Input) */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm outline-none focus:ring-1 focus:ring-primary text-dark"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
                type="submit"
                disabled={!inputValue.trim()} 
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>

        </div>
      )}

      {/* 2. TOMBOL TOGGLE (Ganti icon WA lama jadi icon Chat) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[90] group flex items-center justify-center w-14 h-14 bg-dark text-white rounded-full shadow-2xl hover:bg-primary transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        ) : (
            <>
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            </>
        )}
      </button>
    </>
  );
}