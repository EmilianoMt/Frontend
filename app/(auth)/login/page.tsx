"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type LoginResponse = {
  token: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!API_URL) {
      setError("Falta configurar NEXT_PUBLIC_API_URL en el archivo .env.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciales inválidas.");
        }
        if (response.status === 400) {
          throw new Error("Revisa el correo y la contraseña.");
        }
        throw new Error("No se pudo iniciar sesión. Intenta nuevamente.");
      }

      const data = (await response.json()) as LoginResponse;
      localStorage.setItem("token", data.token);

      router.push("/home");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Ocurrió un error inesperado.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(31,191,146,0.18),transparent_35%),linear-gradient(180deg,#112E40_0%,#0b1f2b_100%)] text-white flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-5xl grid lg:grid-cols-2 rounded-4xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur">
        <div className="p-10 lg:p-14 flex flex-col justify-between gap-10 bg-brand-dark/90">
          <div>
            <p className="text-brand-light font-semibold tracking-[0.3em] uppercase text-xs mb-4">Kyber Cars</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Bienvenido de vuelta a tu catálogo automotriz
            </h1>
          </div>
        </div>

        <div className="bg-white text-brand-dark p-10 lg:p-14 flex items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
            <div>
              <h2 className="text-3xl font-black">Iniciar sesión</h2>
              <p className="text-brand-dark/70 mt-2">Ingresa tus credenciales para acceder.</p>
            </div>

            <label className="block">
              <span className="text-sm font-semibold">Correo electrónico</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/30 px-4 py-3 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                placeholder="tu@email.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Contraseña</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-brand-bg bg-brand-bg/30 px-4 py-3 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30 transition"
                placeholder="••••••••"
                required
              />
            </label>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-3 font-bold text-white hover:bg-brand-accent transition-colors disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Entrar"}
              <ArrowRight size={18} />
            </button>

            <p className="text-sm text-center text-brand-dark/70">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="font-bold text-brand-primary hover:text-brand-accent transition-colors">
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}