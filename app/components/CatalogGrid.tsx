import { VehicleCard } from "./VehicleCard";

export const CatalogGrid = () => {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-2">Nuestro Inventario</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-brand-dark">Vehículos Disponibles</p>
        </div>
        <button className="text-brand-primary font-bold border-b-2 border-brand-primary pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">
          Ver todos los modelos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <VehicleCard key={item} />
        ))}
      </div>
    </section>
  );
};