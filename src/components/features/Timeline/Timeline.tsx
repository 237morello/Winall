const ETAPES = [
  { annee: "2015", label: "Fondation" },
  { annee: "2020", label: "Expansion Sécurité" },
  { annee: "2023", label: "Digitalisation" },
  { annee: "Aujourd'hui", label: "Leader Local", active: true },
];

export const Timeline = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-between">
          {/* Ligne pointillée de fond */}
          <div className="absolute top-1/2 left-0 w-full h-0 border-t-2 border-dotted border-orange-200 -translate-y-1/2 z-0" />
          
          {/* Étapes */}
          {ETAPES.map((etape, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div 
                className={`
                  px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300
                  ${etape.active 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110" 
                    : "bg-orange-100 text-orange-600 border border-orange-200"
                  }
                `}
              >
                {etape.annee}
              </div>
              <div className="mt-4 text-sm font-medium text-gray-400 uppercase tracking-widest">
                {etape.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
