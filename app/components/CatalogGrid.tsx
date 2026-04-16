"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VehicleCard, type VehicleItem } from "./VehicleCard";
import { getRoleFromToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const CatalogGrid = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<VehicleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [yearFilter, setYearFilter] = useState<"all" | "before2020" | "after2020">("all");
  const [vehicleToDelete, setVehicleToDelete] = useState<VehicleItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!API_URL) {
        setError("Falta configurar NEXT_PUBLIC_API_URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL + "/vehicles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar los vehículos.");
        }

        const data = (await response.json()) as unknown;
        const list = Array.isArray(data)
          ? data
          : typeof data === "object" && data !== null && "data" in data
            ? (data as { data: VehicleItem[] }).data
            : [];

        setVehicles(Array.isArray(list) ? list : []);
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : "Error inesperado al cargar el catálogo.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(getRoleFromToken(token) === "ADMIN");
  }, []);

  const handleEdit = (vehicle: VehicleItem) => {
    const params = new URLSearchParams();

    if (vehicle.id !== undefined) {
      params.set("id", String(vehicle.id));
    }

    params.set("model", vehicle.model);
    if (vehicle.year !== undefined) {
      params.set("year", String(vehicle.year));
    }
    if (vehicle.price !== undefined) {
      params.set("price", String(vehicle.price));
    }
    if (vehicle.isAvailable !== undefined) {
      params.set("isAvailable", String(vehicle.isAvailable));
    }
    if (vehicle.brandId !== undefined) {
      params.set("brandId", String(vehicle.brandId));
    }

    router.push("/home/admin-catalog/update?" + params.toString());
  };

  const handleDelete = async () => {
    if (!vehicleToDelete?.id) {
      setDeleteError("No se pudo identificar el vehículo a eliminar.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setDeleteError("Tu sesión expiró. Inicia sesión de nuevo.");
      return;
    }

    setDeleteError("");
    setIsDeleting(true);

    try {
      const response = await fetch(API_URL + "/vehicles/" + vehicleToDelete.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        if (response.status === 403) {
          throw new Error("No tienes permisos para eliminar vehículos.");
        }
        throw new Error("No se pudo eliminar el vehículo.");
      }

      setVehicles((prev) => prev.filter((item) => item.id !== vehicleToDelete.id));
      setVehicleToDelete(null);
    } catch (deleteRequestError) {
      const message =
        deleteRequestError instanceof Error
          ? deleteRequestError.message
          : "Error inesperado al eliminar el vehículo.";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (yearFilter === "all") {
      return true;
    }

    const year = vehicle.year ?? 0;

    if (yearFilter === "before2020") {
      return year < 2020;
    }

    return year >= 2020;
  });

  return (
    <section className="py-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-2">Nuestro Inventario</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-brand-dark">Vehículos Disponibles</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-end">
          <div className="flex items-center rounded-full bg-white border border-brand-bg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setYearFilter("before2020")}
              className={
                "px-4 py-2 text-sm font-bold transition-colors " +
                (yearFilter === "before2020"
                  ? "bg-brand-primary text-white"
                  : "text-brand-dark hover:bg-brand-bg/50")
              }
            >
              Antes del 2020
            </button>
            <button
              type="button"
              onClick={() => setYearFilter("after2020")}
              className={
                "px-4 py-2 text-sm font-bold transition-colors border-l border-brand-bg " +
                (yearFilter === "after2020"
                  ? "bg-brand-primary text-white"
                  : "text-brand-dark hover:bg-brand-bg/50")
              }
            >
              Después del 2020
            </button>
          </div>

          {isAdmin ? (
            <button
              type="button"
              onClick={() => router.push("/home/admin-catalog")}
              className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-accent transition-colors"
            >
              Agregar vehículo
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3 text-sm text-brand-dark/70">
        <button
          type="button"
          onClick={() => setYearFilter("all")}
          className={
            "underline underline-offset-4 transition-colors " +
            (yearFilter === "all" ? "text-brand-primary font-bold" : "hover:text-brand-dark")
          }
        >
          Ver todos
        </button>
        <span>·</span>
        <span>
          {yearFilter === "before2020"
            ? "Mostrando vehículos antes del 2020"
            : yearFilter === "after2020"
              ? "Mostrando vehículos desde 2020 en adelante"
              : "Sin filtro aplicado"}
        </span>
      </div>

      {loading ? (
        <p className="text-brand-dark/70">Cargando vehículos...</p>
      ) : null}

      {error ? <p className="text-red-600 font-medium">{error}</p> : null}

      {!loading && !error && filteredVehicles.length === 0 ? (
        <p className="text-brand-dark/70">No hay vehículos disponibles por el momento.</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id ?? vehicle.model}
            vehicle={vehicle}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={(item) => {
              setDeleteError("");
              setVehicleToDelete(item);
            }}
          />
        ))}
      </div>

      {vehicleToDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-brand-bg">
            <h3 className="text-xl font-black text-brand-dark">Confirmar eliminación</h3>
            <p className="mt-2 text-brand-dark/70">
              ¿Seguro que deseas eliminar el vehículo <strong>{vehicleToDelete.model}</strong>?
            </p>

            {deleteError ? <p className="mt-3 text-sm text-red-600 font-medium">{deleteError}</p> : null}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setVehicleToDelete(null)}
                className="px-4 py-2 rounded-lg border border-brand-bg text-brand-dark hover:bg-brand-bg/30 transition-colors"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-60"
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};