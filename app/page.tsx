import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <>
      <Hero/>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Configuracion Inicial!</h1>
      </div>
    </>
  );
}
