"use client";

import { CarFront, Upload, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type BrandItem = {
  id?: number | string;
  name: string;
  countryOrigin?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function AdminCatalogUpdatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const editVehicle = useMemo(
    () => ({
      id: searchParams.get("id") ?? "",
      model: searchParams.get("model") ?? "",
      year: searchParams.get("year") ?? "",
      price: searchParams.get("price") ?? "",
      isAvailable: searchParams.get("isAvailable") ?? "true",
      brandId: searchParams.get("brandId") ?? "",
    }),
    [searchParams],
  );

  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  useEffect(() => {
    setModel(editVehicle.model);
    setYear(editVehicle.year);
    setPrice(editVehicle.price);
    setBrandId(editVehicle.brandId);
    setIsAvailable(editVehicle.isAvailable);
  }, [editVehicle]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (!API_URL) {
        setLoadingBrands(false);
        return;
      }

      try {
        const response = await fetch(API_URL + "/brands/findAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar las marcas.");
        }

        const data = (await response.json()) as unknown;
        const list = Array.isArray(data)
          ? data
          : typeof data === "object" && data !== null && "data" in data
            ? (data as { data: BrandItem[] }).data
            : [];

        setBrands(Array.isArray(list) ? list : []);
      } catch {
        setBrands([]);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, []);

  const handleSubmit = async () => {
    if (!editVehicle.id) {
      setError("No se encontró el ID del vehículo");
      return;
    }

    if (!model.trim() || !year || !price || !brandId) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    const yearNumber = Number(year);
    const priceNumber = Number(price);
    const brandIdNumber = Number(brandId);

    if (
      Number.isNaN(yearNumber) ||
      Number.isNaN(priceNumber) ||
      Number.isNaN(brandIdNumber)
    ) {
      setError("Año, precio y marca deben ser valores numéricos válidos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No autorizado");
      }

      const response = await fetch(API_URL + `/vehicles/${editVehicle.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: model.trim(),
          year: yearNumber,
          price: priceNumber,
          brandId: brandIdNumber,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Error al actualizar vehículo");
      }

      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);

        const uploadResponse = await fetch(API_URL + `/vehicles/upload/${editVehicle.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        });

        if (!uploadResponse.ok) {
          const uploadData = (await uploadResponse.json()) as { message?: string };
          throw new Error(uploadData.message || "Error al subir imagen del vehículo");
        }
      }

      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(31,191,146,0.14),transparent_35%),linear-gradient(180deg,#112E40_0%,#0f2938_100%)] px-6 py-10">
      <section className="container mx-auto">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 text-white shadow-2xl backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-brand-accent/20 p-3 text-brand-light">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-brand-light font-semibold tracking-[0.28em] uppercase text-xs mb-2">
                Panel de gestión
              </p>
              <h1 className="text-3xl md:text-4xl font-black leading-tight">Actualizar Vehículo</h1>
            </div>
          </div>
        </div>

        <article className="rounded-3xl border border-brand-bg/30 bg-white p-6 md:p-8 shadow-xl max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-brand-primary/10 p-2 text-brand-primary">
              <CarFront size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-brand-dark">Formulario de actualización</h2>
            </div>
          </div>

          {editVehicle.id ? (
            <p className="text-xs font-semibold text-brand-primary bg-brand-light/20 border border-brand-light/40 rounded-lg px-3 py-2 mb-5">
              Editando vehículo ID: {editVehicle.id}
            </p>
          ) : null}

          {error ? (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-5">
              {error}
            </p>
          ) : null}

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-brand-dark">Modelo</span>
                <input
                  type="text"
                  placeholder="Ej: Corolla"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-brand-dark">Año</span>
                <input
                  type="number"
                  placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-brand-dark">Precio</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="25999.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-brand-dark">Marca</span>
                <select
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                >
                  <option value="">Seleccionar marca</option>
                  {loadingBrands ? <option value="">Cargando marcas...</option> : null}
                  {!loadingBrands
                    ? brands.map((brand) => (
                        <option key={brand.id ?? brand.name} value={brand.id}>
                          {brand.name}
                        </option>
                      ))
                    : null}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-brand-dark">Disponibilidad</span>
                <select
                  value={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                >
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-semibold text-brand-dark">Imagen del vehículo</span>
                <div className="mt-2 rounded-2xl border-2 border-dashed border-brand-primary/40 bg-brand-bg/15 px-4 py-6">
                  <div className="flex items-center gap-2 text-brand-primary font-semibold">
                    <Upload size={16} />
                    Seleccionar archivo
                  </div>

                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="mt-4 block w-full text-sm text-brand-dark/80 file:mr-3 file:rounded-xl file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:font-semibold file:text-white hover:file:bg-brand-accent"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Actualizando..." : "Actualizar vehículo"}
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
