import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catálogo Automotriz",
  description: "Plataforma de exhibición automotriz - Evaluación Técnica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="grow">
          {children}
        </main>

       
      </body>
    </html>
  );
}