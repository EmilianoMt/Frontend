"use client";

import { CarFront, Tags, Upload, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BrandItem = {
  id?: number | string;
  name: string;
  countryOrigin?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function AdminCatalogPage() {
  const router = useRouter();
  
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  
  const [brandName, setBrandName] = useState("");
  const [brandCountry, setBrandCountry] = useState("");
  const [loadingBrandSubmit, setLoadingBrandSubmit] = useState(false);
  const [brandError, setBrandError] = useState("");
  
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [file, setFile] = useState<File | null>(null);
  const [loadingVehicleSubmit, setLoadingVehicleSubmit] = useState(false);
  const [vehicleError, setVehicleError] = useState("");

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

  const handleBrandSubmit = async () => {
    if (!brandName.trim() || !brandCountry.trim()) {
      setBrandError("Por favor completa todos los campos");
      return;
    }

    setLoadingBrandSubmit(true);
    setBrandError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No autorizado");
      }

      const response = await fetch(API_URL + "/brands/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: brandName.trim(),
          countryOrigin: brandCountry.trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Error al registrar marca");
      }

      router.push("/home");
    } catch (err) {
      setBrandError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoadingBrandSubmit(false);
    }
  };

  const handleVehicleSubmit = async () => {
    if (!model.trim() || !year || !price || !brandId) {
      setVehicleError("Por favor completa todos los campos");
      return;
    }

    if (!file) {
      setVehicleError("La imagen del vehículo es obligatoria");
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
      setVehicleError("Año, precio y marca deben ser valores numéricos válidos");
      return;
    }

    setLoadingVehicleSubmit(true);
    setVehicleError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No autorizado");
      }

      const response = await fetch(API_URL + "/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: model.trim(),
          year: yearNumber,
          price: priceNumber,
          brandId: brandIdNumber,
          imageUrl: "pending-upload",
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Error al crear vehículo");
      }

      const createdVehicle = (await response.json()) as { id?: string };
      if (!createdVehicle.id) {
        throw new Error("No se recibió el ID del vehículo creado");
      }

      const imageFormData = new FormData();
      imageFormData.append("file", file);

      const uploadResponse = await fetch(API_URL + `/vehicles/upload/${createdVehicle.id}`, {
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

      router.push("/home");
    } catch (err) {
      setVehicleError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoadingVehicleSubmit(false);
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
              <h1 className="text-3xl md:text-4xl font-black leading-tight">
                Registro de Marcas y Vehículos
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <article className="rounded-3xl border border-brand-bg/30 bg-white p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-brand-primary/10 p-2 text-brand-primary">
                <Tags size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-dark">
                  Registrar Marca
                </h2>
              </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleBrandSubmit(); }}>
              {brandError ? (
                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-5">
                  {brandError}
                </p>
              ) : null}
              
              <label className="block">
                <span className="text-sm font-semibold text-brand-dark">
                  Nombre de la marca
                </span>
                <input
                  type="text"
                  placeholder="Ej: Toyota"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-brand-dark">
                  País de origen
                </span>
                <input
                  type="text"
                  placeholder="Ej: Japan"
                  value={brandCountry}
                  onChange={(e) => setBrandCountry(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                />
              </label>

              <button
                type="submit"
                disabled={loadingBrandSubmit}
                className="w-full rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingBrandSubmit ? "Guardando..." : "Guardar marca"}
              </button>
            </form>
          </article>

          <article className="rounded-3xl border border-brand-bg/30 bg-white p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-brand-primary/10 p-2 text-brand-primary">
                <CarFront size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-dark">
                  Registrar Vehículo
                </h2>
              </div>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleVehicleSubmit(); }}>
              {vehicleError ? (
                <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-5">
                  {vehicleError}
                </p>
              ) : null}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold text-brand-dark">
                    Modelo
                  </span>
                  <input
                    type="text"
                    placeholder="Ej: Corolla"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-brand-dark">
                    Año
                  </span>
                  <input
                    type="number"
                    placeholder="2026"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-brand-dark">
                    Precio
                  </span>
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
                  <span className="text-sm font-semibold text-brand-dark">
                    Marca
                  </span>
                  <select 
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition">
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
                    className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition">
                    <option value="true">Disponible</option>
                    <option value="false">No disponible</option>
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold text-brand-dark">
                    Imagen del vehículo
                  </span>
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
                disabled={loadingVehicleSubmit}
                className="w-full rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingVehicleSubmit ? "Guardando..." : "Guardar vehículo"}
              </button>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}
