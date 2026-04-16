import { CatalogGrid } from "../components/CatalogGrid";
import { Hero } from "../components/Hero";
import { PromoSection } from "../components/PromoSection";
import { Team } from "../components/Team";


export default function Home() {
  return (
    <>
      <Hero/>
      <CatalogGrid/>
      <PromoSection/>
      <Team/>
    </>
  );
}
