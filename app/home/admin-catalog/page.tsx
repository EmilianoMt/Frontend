import { CarFront, Tags, Upload, ShieldCheck } from "lucide-react";

export default function AdminCatalogPage() {
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

            <form className="space-y-5">
              <label className="block">
                <span className="text-sm font-semibold text-brand-dark">
                  Nombre de la marca
                </span>
                <input
                  type="text"
                  placeholder="Ej: Toyota"
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
                  className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                />
              </label>

              <button
                type="button"
                className="w-full rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors"
              >
                Guardar marca
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

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold text-brand-dark">
                    Modelo
                  </span>
                  <input
                    type="text"
                    placeholder="Ej: Corolla"
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
                    className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-sm font-semibold text-brand-dark">
                    Marca
                  </span>
                  <select className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/25 px-4 py-3 text-brand-dark outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition">
                    <option value="">Seleccionar marca</option>
                    <option value="toyota">Toyota</option>
                    <option value="honda">Honda</option>
                    <option value="nissan">Nissan</option>
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
                      className="mt-4 block w-full text-sm text-brand-dark/80 file:mr-3 file:rounded-xl file:border-0 file:bg-brand-primary file:px-3 file:py-2 file:font-semibold file:text-white hover:file:bg-brand-accent"
                    />
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="w-full rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors"
              >
                Guardar vehículo
              </button>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}
