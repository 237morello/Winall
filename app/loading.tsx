/**
 * @component Loading
 * @description Écran de chargement global affichant un "W" stylisé avec animation pulse.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-6">
        {/* Conteneur du logo "W" avec animation pulse */}
        <div className="relative flex items-center justify-center animate-pulse">
          {/* Le "W" stylisé */}
          <span className="text-8xl md:text-9xl font-black tracking-tighter text-primary">
            W
          </span>
          
          {/* Halo de surbrillance subtil */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 -z-10" />
        </div>

        {/* Barre de progression épurée utilisant l'animation définie dans globals.css */}
        <div className="w-24 h-[2px] bg-muted overflow-hidden rounded-full">
          <div className="h-full bg-primary animate-loading" />
        </div>
      </div>
    </div>
  );
}
