'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ImageMagnifier({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Hitung posisi kursor dalam persen (0-100%)
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    
    setPosition({ x, y });
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-white rounded-2xl cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image 
        src={src}
        alt={alt}
        fill // Pakai fill biar menuhin container parent
        className="object-contain transition-transform duration-100 ease-linear" // Animasi halus
        style={{
          // Kuncinya di sini: Titik zoom ngikutin posisi mouse
          transformOrigin: `${position.x}% ${position.y}%`,
          // Kalau zoom true, perbesar 2.5x lipat
          transform: zoom ? 'scale(2.5)' : 'scale(1)',
        }}
        priority
      />
      
      {/* Badge Hint (Hilang pas di-zoom) */}
      {!zoom && (
        <div className="absolute bottom-4 right-4 bg-gray-900/10 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-600 font-medium pointer-events-none">
           Hover to zoom
        </div>
      )}
    </div>
  );
}