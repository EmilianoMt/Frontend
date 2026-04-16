"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CatalogGrid } from "../components/CatalogGrid";
import { Hero } from "../components/Hero";
import { PromoSection } from "../components/PromoSection";
import { Team } from "../components/Team";


export default function HomePage() {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setCanRender(true);
  }, [router]);

  if (!canRender) {
    return null;
  }

  return (
    <>
      <section id="inicio">
        <Hero />
      </section>
      <section id="catalogo">
        <CatalogGrid />
      </section>
      <PromoSection />
      <section id="nosotros">
        <Team />
      </section>
    </>
  );
}
