import { categories } from '@/data/mockData';
import Link from 'next/link';

export default function CategorySection() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-2xl font-bold text-dark mb-8">Shop by categories</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Static Info Block */}
        <div className="flex flex-col justify-center items-start space-y-4 p-6 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 border-2 border-dark rounded-lg flex items-center justify-center mb-2">
             <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          </div>
          <div>
            <span className="block text-xl font-bold text-dark">200+</span>
            <span className="text-gray-500 text-sm">Unique products</span>
          </div>
        </div>

        {/* Dynamic Categories */}
      
        {categories.map((cat, index) => (
          <Link href="/shop" key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center text-center group border border-gray-100 cursor-pointer">
            <div className="h-32 w-full flex items-center justify-center mb-4 overflow-hidden">
              <img src={cat.image} alt={cat.name} className="h-full object-contain group-hover:scale-110 transition duration-300" />
            </div>
            <h3 className="text-sm font-medium text-gray-700 group-hover:text-primary">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}