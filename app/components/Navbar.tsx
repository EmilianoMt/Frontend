"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-brand-dark text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-xl font-bold tracking-tight">
          KYBER <span className="text-brand-accent">CARS</span>
        </Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          <Link href="/home" className="hover:text-brand-light transition-colors">
            Inicio
          </Link>
          <Link href="/home#catalogo" className="hover:text-brand-light transition-colors">
            Catálogo
          </Link>
          <Link href="/home#nosotros" className="hover:text-brand-light transition-colors">
            Nosotros
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-brand-primary px-4 py-2 rounded-md hover:bg-brand-accent transition-all"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="md:hidden text-brand-accent">
          <Menu size={24} />
        </div>
      </div>
    </nav>
  );
};
