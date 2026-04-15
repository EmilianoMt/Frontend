export const PromoSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[300px] md:h-[400px]">
          
          <div className="bg-brand-primary rounded-3xl flex flex-col justify-end p-8 text-white hover:scale-[1.02] transition-transform cursor-pointer">
            <h4 className="text-2xl font-bold">Seminuevos</h4>
            <p className="text-sm opacity-80">Calidad garantizada</p>
          </div>

          <div className="bg-brand-accent rounded-3xl flex flex-col justify-end p-8 text-brand-dark hover:scale-[1.02] transition-transform cursor-pointer">
            <h4 className="text-2xl font-bold">Nuevos</h4>
            <p className="text-sm opacity-80">Modelos 2026</p>
          </div>

          <div 
            className="rounded-3xl hover:scale-[1.02] transition-transform cursor-pointer"
            style={{
              backgroundColor: '#1fbf92',
              backgroundImage: 'linear-gradient(45deg, #112e40 25%, transparent 25%, transparent 50%, #112e40 50%, #112e40 75%, transparent 75%, transparent)',
              backgroundSize: '40px 40px',
              opacity: 0.8
            }}
          ></div>

          <div 
            className="rounded-3xl hover:scale-[1.02] transition-transform cursor-pointer border-4 border-brand-primary"
            style={{
              backgroundColor: 'transparent',
              backgroundImage: 'linear-gradient(-45deg, #025949 25%, transparent 25%, transparent 50%, #025949 50%, #025949 75%, transparent 75%, transparent)',
              backgroundSize: '30px 30px',
            }}
          ></div>

        </div>
      </div>
    </section>
  );
};