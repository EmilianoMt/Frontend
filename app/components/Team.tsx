export const Team = () => {
  const teamMembers = [
    { name: 'Asesor Experto', role: 'Ventas Especializadas' },
    { name: 'Soporte Técnico', role: 'Mantenimiento Certificado' },
    { name: 'Atención al Cliente', role: 'Post-Venta y Garantías' },
  ];

  return (
    <section className="py-24 bg-brand-bg/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-4">Nuestro Equipo</h2>
          <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 bg-brand-dark rounded-full mb-6 border-4 border-brand-accent shadow-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                <div className="text-brand-light opacity-50 font-bold text-xs uppercase">Foto</div>
              </div>
              
              <h4 className="text-xl font-bold text-brand-dark">{member.name}</h4>
              <p className="text-brand-primary font-medium text-sm mb-2">{member.role}</p>
              
              <div className="w-12 h-0.5 bg-brand-muted/40 mb-1"></div>
              <div className="w-8 h-0.5 bg-brand-muted/40"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};