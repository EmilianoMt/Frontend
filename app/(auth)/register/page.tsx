import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(31,191,146,0.18),transparent_35%),linear-gradient(180deg,#112E40_0%,#0b1f2b_100%)] text-white flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-5xl grid lg:grid-cols-2 rounded-4xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur">
        <div className="p-10 lg:p-14 flex flex-col justify-between gap-10 bg-brand-dark/90">
          <div>
            <p className="text-brand-light font-semibold tracking-[0.3em] uppercase text-xs mb-4">Kyber Cars</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Te damos la bienvenida a tu catálogo automotriz personal.
            </h1>
          </div>
        </div>

        <div className="bg-white text-brand-dark p-10 lg:p-14 flex items-center">
          <form className="w-full max-w-md mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-black">Registrarse</h2>
              <p className="text-brand-dark/70 mt-2">Crea tu cuenta para acceder.</p>
            </div>

            <label className="block">
              <span className="text-sm font-semibold">Correo electrónico</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/30 px-4 py-3 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                placeholder="tu@email.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Contraseña</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/30 px-4 py-3 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors"
            >
              Registrarse
              <ArrowRight size={18} />
            </button>

            <p className="text-sm text-center text-brand-dark/70">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-bold text-brand-primary hover:text-brand-accent transition-colors">
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}