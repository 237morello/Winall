/**
 * @file leaders-section.tsx
 * @description Section Équipe Dirigeante — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → leaders-section.types.ts + leaders-section.constants.ts
 * - View   → Ce fichier
 * - Controller → Classe LeadersLogique
 *
 * SOLID : SRP, OCP (ajout de membre via constants), DIP.
 */

import Image from "next/image";
import { User } from "lucide-react";
import { MEMBRES_DIRIGEANTS } from "./leaders-section.constants";
import type { ProprietesLeaders, MembreDirigeant } from "./leaders-section.types";

/**
 * @class LeadersLogique
 * @description Contrôleur — Gère la logique d'affichage des cartes dirigeants.
 */
class LeadersLogique {
  /**
   * Détermine si le membre a une image ou doit afficher un placeholder.
   * @param membre - Le membre dirigeant à tester.
   */
  static possedImage(membre: MembreDirigeant): boolean {
    return !!membre.imageUrl;
  }
}

/**
 * @component LeadersSection
 * @description Vue — Affiche les cartes des dirigeants en grille 2 colonnes.
 *              Utilise un placeholder gris arrondi (conforme à la maquette)
 *              lorsqu'aucune photo n'est disponible.
 */
export const LeadersSection = ({ className }: ProprietesLeaders) => (
  <section className={`py-16 ${className ?? ""}`}>
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MEMBRES_DIRIGEANTS.map((membre) => (
          <article
            key={membre.id}
            className="group relative rounded-[2rem] overflow-hidden bg-muted/40 border border-border/20 transition-all duration-300 hover:shadow-xl hover:shadow-p/5 hover:-translate-y-1"
          >
            {/* Image ou placeholder gris */}
            <div className="relative h-[280px] md:h-[320px] w-full bg-muted/60 flex items-center justify-center">
              {LeadersLogique.possedImage(membre) ? (
                <Image
                  src={membre.imageUrl!}
                  alt={`Photo de ${membre.nom}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                /* Placeholder gris avec icône (conforme aux rectangles gris de la maquette) */
                <User className="h-16 w-16 text-muted-foreground/30" />
              )}
            </div>

            {/* Info du dirigeant */}
            <div className="p-5">
              <h4 className="text-lg font-bold text-foreground">{membre.nom}</h4>
              <p className="text-sm text-muted-foreground mt-1">{membre.poste}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
