import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      
      {/* Visual Error */}
      <div className="relative w-64 h-64 mb-8">
        {/* Gambar Kursi Patah / Kosong (Visualisasi Error) */}
        <Image 
          src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&q=80&w=600"
          alt="404 Chair"
          fill
          className="object-contain opacity-50 mix-blend-multiply"
        />
      </div>

      <h1 className="text-9xl font-bold text-gray-200 leading-none">404</h1>
      <h2 className="text-3xl font-bold text-dark mt-4 mb-2">Oops! Chair not found.</h2>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        It seems the page you are looking for has been moved, deleted, or possibly never existed.
      </p>

      {/* Tombol Pulang */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200"
        >
          Back to Home
        </Link>
        <Link 
          href="/shop" 
          className="px-8 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition"
        >
          Browse Shop
        </Link>
      </div>

    </div>
  );
}