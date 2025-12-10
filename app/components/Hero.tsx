export default function Hero() {
    return (
      <section className="relative bg-[#F5F8FB] overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute bottom-0 left-10 text-[200px] font-bold text-white leading-none opacity-50 select-none pointer-events-none">01</div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full opacity-5 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
  
        <div className="container mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center relative z-10">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <span className="w-0.5 h-4 bg-gray-400"></span>
              <span>Davici furniture 2020</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-dark leading-tight">
              New <br/> Collection
            </h1>
            <button className="bg-primary text-white px-8 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-orange-600 transition shadow-lg shadow-orange-200">
              Shop now
            </button>
          </div>
  
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative h-[400px] lg:h-[500px]">
            <div className="absolute left-0 bottom-0 w-48 lg:w-64 z-10">
               <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600" alt="Plant" className="w-full h-auto object-contain drop-shadow-xl"/>
            </div>
            <div className="absolute right-0 top-10 w-64 lg:w-80">
               <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600" alt="Table" className="w-full h-auto object-contain drop-shadow-2xl rounded-lg"/>
            </div>
          </div>
        </div>
      </section>
    );
  }