export const PromoSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary mb-3">
            Diferenciadores
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark">
            Porque somos mejores
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-75 md:h-100">
          <div className="bg-brand-primary rounded-3xl flex flex-col justify-end p-8 text-white hover:scale-[1.02] transition-transform cursor-pointer">
            <h4 className="text-2xl font-bold">Selección curada</h4>
            <p className="text-sm opacity-80">Solo vehículos con calidad verificada y respaldo real.</p>
          </div>

          <div className="bg-brand-accent rounded-3xl flex flex-col justify-end p-8 text-brand-dark hover:scale-[1.02] transition-transform cursor-pointer">
            <h4 className="text-2xl font-bold">Asesoría especializada</h4>
            <p className="text-sm opacity-80">Te guiamos con atención clara para elegir mejor.</p>
          </div>

          <div 
            className="rounded-3xl hover:scale-[1.02] transition-transform cursor-pointer"
            style={{
              backgroundColor: '#1fbf92',
              backgroundImage: 'linear-gradient(45deg, #112e40 25%, transparent 25%, transparent 50%, #112e40 50%, #112e40 75%, transparent 75%, transparent)',
              backgroundSize: '40px 40px',
              opacity: 0.8
            }}
          >
            <div className="h-full flex flex-col justify-end p-8 text-white">
              <h4 className="text-2xl font-bold">Transparencia total</h4>
              <p className="text-sm opacity-80">Información, precio y disponibilidad sin sorpresas.</p>
            </div>
          </div>

          <div 
            className="rounded-3xl hover:scale-[1.02] transition-transform cursor-pointer border-4 border-brand-primary"
            style={{
              backgroundColor: 'transparent',
              backgroundImage: 'linear-gradient(-45deg, #025949 25%, transparent 25%, transparent 50%, #025949 50%, #025949 75%, transparent 75%, transparent)',
              backgroundSize: '30px 30px',
            }}
          >
            <div className="h-full flex flex-col justify-end p-8 text-brand-dark bg-white/70">
              <h4 className="text-2xl font-bold">Acompañamiento total</h4>
              <p className="text-sm opacity-80">Soporte antes, durante y después de la compra.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};