/**
 * @file mission-values.tsx
 * @description Section Mission, Vision & Valeurs — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → mission-values.types.ts + mission-values.constants.ts
 * - View   → Ce fichier (composant de présentation)
 * - Controller → Classe MissionValeursLogique
 *
 * SOLID appliqués :
 * - SRP : Le composant ne fait que du rendu.
 * - OCP : Ajouter une valeur = ajouter un objet dans les constantes.
 * - LSP : Chaque valeur suit le même contrat ValeurEntreprise.
 * - ISP : Interfaces BlocIdentite ≠ ValeurEntreprise.
 * - DIP : Dépendances inversées via les types abstraits.
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { BLOCS_IDENTITE, VALEURS_ENTREPRISE } from "./mission-values.constants";
import type { ProprietesMissionValues } from "./mission-values.types";

/**
 * @class MissionValeursLogique
 * @description Contrôleur — Gère les classes CSS dynamiques et la logique d'affichage.
 */
class MissionValeursLogique {
  /**
   * Retourne les classes pour la ligne décorative sous chaque titre Mission/Vision.
   * @param index - Index du bloc pour varier les couleurs.
   */
  static obtenirClassesBarre(index: number): string {
    const couleurs = ["bg-p", "bg-o"];
    return `h-1 w-16 rounded-full mt-3 ${couleurs[index % couleurs.length]}`;
  }
}

/**
 * @component MissionValues
 * @description Vue — Affiche Mission & Vision (gauche) + Valeurs en accordion (droite).
 *              Reproduit fidèlement le split 50/50 de la maquette.
 */
export const MissionValues = ({ className }: ProprietesMissionValues) => (
  <section className={`py-20 px-6 md:px-12 lg:px-20 ${className ?? ""}`}>
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
      {/* ── Partie Gauche : Mission & Vision ── */}
      <div className="flex flex-col gap-14">
        {BLOCS_IDENTITE.map((bloc, index) => (
          <div key={bloc.id}>
            <Typography
              variant="h2"
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              {bloc.titre}
            </Typography>
            {/* Barre décorative colorée sous le titre */}
            <div className={MissionValeursLogique.obtenirClassesBarre(index)} />
            <Typography
              variant="p"
              className="text-lg text-muted-foreground leading-relaxed max-w-md mt-5"
            >
              {bloc.description}
            </Typography>
          </div>
        ))}
      </div>

      {/* ── Partie Droite : Valeurs (Accordion) ── */}
      <div>
        <Typography
          variant="h2"
          className="text-4xl md:text-5xl font-bold text-foreground mb-10"
        >
          Valeurs
        </Typography>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="valeur-1"
        >
          {VALEURS_ENTREPRISE.map((valeur) => (
            <AccordionItem
              key={valeur.id}
              value={valeur.id}
              className="border-b-0 border-t border-border/30"
            >
              <AccordionTrigger className="py-5 text-lg md:text-xl font-semibold text-foreground hover:no-underline group">
                <span className="flex-1 text-left">{valeur.titre}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground leading-relaxed">
                {valeur.contenu}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
