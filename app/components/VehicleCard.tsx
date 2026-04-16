import { Pencil, Trash2 } from "lucide-react";

export type VehicleItem = {
  id?: number | string;
  model: string;
  year?: number;
  price?: number;
  isAvailable?: boolean;
  imageUrl?: string;
  description?: string;
  brandId?: number | string;
};

type VehicleCardProps = {
  vehicle: VehicleItem;
  isAdmin?: boolean;
  onEdit?: (vehicle: VehicleItem) => void;
  onDelete?: (vehicle: VehicleItem) => void;
};

const formatPrice = (price?: number): string => {
  if (price === undefined || price === null) {
    return "Precio no disponible";
  }

  return new Intl.NumberFormat("ES-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(price);
};

export const VehicleCard = ({
  vehicle,
  isAdmin = false,
  onEdit,
  onDelete,
}: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-bg hover:shadow-2xl transition-all group">
      {vehicle.imageUrl ? (
        <img
          src={vehicle.imageUrl}
          alt={vehicle.model}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="bg-brand-dark h-48 w-full flex items-center justify-center text-brand-muted">
          <span className="group-hover:scale-110 transition-transform">Imagen no disponible</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-brand-dark">{vehicle.model}</h3>
          <span className="bg-brand-light/20 text-brand-primary text-xs font-bold px-2 py-1 rounded">
            {vehicle.year ?? "N/A"}
          </span>
        </div>

        <p className="text-brand-muted text-sm mb-4 line-clamp-2">
          {vehicle.description ??
            (vehicle.isAvailable
              ? "Vehículo disponible para compra inmediata."
              : "Vehículo no disponible actualmente.")}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-brand-bg gap-2">
          <span className="text-2xl font-black text-brand-primary">{formatPrice(vehicle.price)}</span>
          <div className="flex items-center gap-2">
            <span
              className={
                "text-xs font-bold px-2 py-1 rounded " +
                (vehicle.isAvailable
                  ? "bg-brand-light/30 text-brand-primary"
                  : "bg-red-100 text-red-700")
              }
            >
              {vehicle.isAvailable ? "Disponible" : "No disponible"}
            </span>

            {isAdmin ? (
              <>
                <button
                  type="button"
                  onClick={() => onEdit?.(vehicle)}
                  className="inline-flex items-center justify-center rounded-md p-1.5 text-brand-primary hover:bg-brand-primary/10 transition-colors"
                  aria-label="Editar vehículo"
                  title="Editar vehículo"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(vehicle)}
                  className="inline-flex items-center justify-center rounded-md p-1.5 text-red-700 hover:bg-red-100 transition-colors"
                  aria-label="Eliminar vehículo"
                  title="Eliminar vehículo"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};