export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-8 pb-2">
      <div className="container mx-auto px-6 content-end">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold tracking-tighter">
              KYBER <span className="text-brand-accent">CARS</span>
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">
              Líderes en exhibición automotriz digital. Conectando sueños con
              motores.
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center hover:bg-brand-accent transition-colors cursor-pointer"
                >
                  <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
