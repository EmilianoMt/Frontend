import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative">
      
      <div className="bg-brand-dark text-white pt-20 pb-40 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Encuentra el auto de tus <br /> 
            <span className="text-brand-accent">sueños hoy mismo</span>
          </h1>
          
          <p className="text-brand-muted max-w-2xl mx-auto mb-10 text-lg">
            Explora nuestro catálogo exclusivo de vehículos con la mejor 
            tecnología y respaldo del mercado. Calidad garantizada en cada kilómetro.
          </p>

          <Link
            href="/home#catalogo"
            className="inline-block bg-brand-primary hover:bg-brand-accent text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>

      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20">
          <div className="bg-brand-accent h-40 rounded-xl shadow-xl flex items-center justify-center p-6 transform hover:-translate-y-2 transition-transform">
            <div className="text-brand-dark text-center">
              <div className="font-bold text-xl uppercase tracking-wider">Garantía</div>
              <div className="text-sm opacity-80">Total por 2 años</div>
            </div>
          </div>
          
          <div className="bg-brand-accent h-40 rounded-xl shadow-xl flex items-center justify-center p-6 transform hover:-translate-y-2 transition-transform">
            <div className="text-brand-dark text-center">
              <div className="font-bold text-xl uppercase tracking-wider">Financiamiento</div>
              <div className="text-sm opacity-80">Planes a tu medida</div>
            </div>
          </div>

          <div className="bg-brand-accent h-40 rounded-xl shadow-xl flex items-center justify-center p-6 transform hover:-translate-y-2 transition-transform">
            <div className="text-brand-dark text-center">
              <div className="font-bold text-xl uppercase tracking-wider">Seguridad</div>
              <div className="text-sm opacity-80">Máxima tecnología</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};