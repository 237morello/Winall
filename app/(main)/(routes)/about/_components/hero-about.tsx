/**
 * @file hero-about.tsx
 * @description Section Héro de la page À Propos — Pattern MVC + SOLID.
 * 
 * Architecture :
 * - Model  → hero-about.types.ts + hero-about.constants.ts
 * - View   → Ce fichier (composant de présentation)
 * - Controller → Classe HeroAboutLogique (logique de transformation)
 * 
 * SOLID appliqués :
 * - SRP : Le composant ne fait que du rendu visuel.
 * - OCP : Extensible via les constantes sans toucher au composant.
 * - ISP : Interfaces distinctes pour chaque structure de données.
 * - DIP : Le composant dépend des abstractions (interfaces), pas des implémentations.
 */

import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { DONNEES_HERO, DONNEES_CARTE_DISPONIBILITE } from "./hero-about.constants";
import type { ProprietesHeroAbout } from "./hero-about.types";

/**
 * @class HeroAboutLogique
 * @description Contrôleur — Gère la logique de calcul/transformation pour le héro About.
 * Centralise toute logique hors du JSX pour respecter le SRP.
 */
class HeroAboutLogique {
  /**
   * Retourne les classes CSS dynamiques pour la bordure décorative gauche.
   * @returns Chaîne de classes Tailwind.
   */
  static obtenirClassesBordureGauche(): string {
    return "absolute left-0 top-6 w-1.5 h-16 bg-p rounded-full";
  }

  /**
   * Retourne les classes CSS pour l'animation de la carte.
   * @returns Chaîne de classes Tailwind avec transitions natives.
   */
  static obtenirClassesCarte(): string {
    return "relative rounded-[2rem] overflow-hidden bg-p shadow-2xl shadow-p/20 transition-transform duration-500 hover:scale-[1.02]";
  }
}

/**
 * @component HeroAbout
 * @description Vue — Affiche la section héro avec le texte à gauche et
 *              la carte "We are available" à droite, conformément à la maquette.
 */
export const HeroAbout = ({ className }: ProprietesHeroAbout) => (
  <section
    className={`relative py-16 md:py-24 px-6 md:px-12 lg:px-20 ${className ?? ""}`}
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
      {/* ── Partie Gauche : Texte introductif avec bordure décorative ── */}
      <div className="relative pl-6">
        {/* Bordure verte décorative (élément visuel de la maquette) */}
        <div className={HeroAboutLogique.obtenirClassesBordureGauche()} />

        <Typography
          variant="p"
          className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-lg"
        >
          {DONNEES_HERO.texteIntroductif}
        </Typography>
      </div>

      {/* ── Partie Droite : Carte "We are available" ── */}
      <div className={HeroAboutLogique.obtenirClassesCarte()}>
        {/* En-tête de la carte */}
        <div className="relative z-10 p-6 pb-0">
          <div className="flex items-center gap-2 mb-2">
            {/* Logo miniature Winall */}
            <Image
              src="/images/logo_v2.png"
              alt="Logo Winall"
              width={28}
              height={28}
              className="rounded-sm"
            />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
              Winall Tech
            </span>
          </div>
          <Typography
            variant="h3"
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
          >
            {DONNEES_CARTE_DISPONIBILITE.titre}
          </Typography>
          {/* Badge de statut */}
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs font-semibold text-white">
              {DONNEES_CARTE_DISPONIBILITE.sousTitre}
            </span>
          </div>
        </div>

        {/* Image du technicien */}
        <div className="relative h-[320px] md:h-[400px] mt-4">
          <Image
            src={DONNEES_CARTE_DISPONIBILITE.imageTechnicien}
            alt="Expert technique Winall"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  </section>
);
