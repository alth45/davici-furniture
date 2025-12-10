import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductSection from '@/components/ProductSection';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <CategorySection />
      
      {/* Promotional Banners (Hardcoded for simplicity in this file, or move to component) */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
            <Image src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
              fill
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Living Room" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-white/80 p-6 md:p-10 text-center bg-white/10 backdrop-blur-sm">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Living Room</h3>
                  <button className="bg-primary text-white px-6 py-2 rounded text-sm font-medium hover:bg-orange-600 transition">Shop now</button>
                </div>
              </div>
           </div>
           {/* Banner 2 (Similar code...) */}
           <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Dining Room"/>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-white/80 p-6 md:p-10 text-center bg-white/10 backdrop-blur-sm">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Dining Room</h3>
                  <button className="bg-primary text-white px-6 py-2 rounded text-sm font-medium hover:bg-orange-600 transition">Shop now</button>
                </div>
              </div>
           </div>
        </div>
      </section>

      <ProductSection />
    </main>
  );
}