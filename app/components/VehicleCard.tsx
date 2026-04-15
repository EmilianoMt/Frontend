export const VehicleCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-bg hover:shadow-2xl transition-all group">
      <div className="bg-brand-dark h-48 w-full flex items-center justify-center text-brand-muted">
        <span className="group-hover:scale-110 transition-transform">Imagen del Vehículo</span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-brand-dark">Modelo del Auto</h3>
          <span className="bg-brand-light/20 text-brand-primary text-xs font-bold px-2 py-1 rounded">2026</span>
        </div>
        
        <p className="text-brand-muted text-sm mb-4 line-clamp-2">
          Descripción breve del vehículo con sus características principales y rendimiento.
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-brand-bg">
          <span className="text-2xl font-black text-brand-primary">$450,000</span>
        </div>
      </div>
    </div>
  );
};