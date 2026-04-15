import { Menu } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-brand-dark text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Kyber <span className="text-brand-accent">Cars</span>
        </Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-brand-light transition-colors">
            Inicio
          </Link>
          <Link href="/" className="hover:text-brand-light transition-colors">
            Catálogo
          </Link>
          <Link href="/" className="hover:text-brand-light transition-colors">
            Nosotros
          </Link>
          <Link
            href="/"
            className="bg-brand-primary px-4 py-2 rounded-md hover:bg-brand-accent transition-all"
          >
            Iniciar Sesión
          </Link>
        </div>

        <div className="md:hidden text-brand-accent">
          <Menu size={24} />
        </div>
      </div>
    </nav>
  );
};
