/**
 * @file history-timeline.tsx
 * @description Section Frise Chronologique — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → history-timeline.types.ts + history-timeline.constants.ts
 * - View   → Ce fichier
 * - Controller → Classe TimelineLogique
 *
 * SOLID : SRP (présentation seule), OCP (ajout d'étape via constants), LSP (chaque étape EtapeTimeline).
 */

import { ETAPES_TIMELINE } from "./history-timeline.constants";
import type { ProprietesTimeline } from "./history-timeline.types";

/**
 * @class TimelineLogique
 * @description Contrôleur — Gère les classes CSS dynamiques des badges de la timeline.
 */
class TimelineLogique {
  /**
   * Retourne les classes CSS du badge selon qu'il est actif ou non.
   * @param estActif - Si true, le badge utilise le style orange plein.
   */
  static obtenirClassesBadge(estActif: boolean): string {
    const base =
      "px-5 py-2.5 rounded-xl text-sm md:text-base font-bold transition-all duration-300 whitespace-nowrap";

    if (estActif) {
      return `${base} bg-o text-white shadow-lg shadow-o/30 scale-110`;
    }
    return `${base} bg-p/10 text-p border border-p/20 hover:bg-p/20`;
  }
}

/**
 * @component HistoryTimeline
 * @description Vue — Affiche la frise chronologique horizontale de Winall.
 *              Les badges sont verts (par défaut) ou orange (étape courante).
 *              Reproduit le design horizontal avec ligne pointillée de la maquette.
 */
export const HistoryTimeline = ({ className }: ProprietesTimeline) => (
  <section className={`py-16 overflow-x-auto ${className ?? ""}`}>
    <div className="max-w-5xl mx-auto px-6">
      <div className="relative flex items-center justify-between min-w-[500px]">
        {/* ── Ligne pointillée de fond ── */}
        <div className="absolute top-1/2 left-4 right-4 h-0 border-t-2 border-dashed border-p/20 -translate-y-1/2 z-0" />

        {/* ── Badges des étapes ── */}
        {ETAPES_TIMELINE.map((etape) => (
          <div key={etape.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={TimelineLogique.obtenirClassesBadge(etape.actif ?? false)}>
              {etape.annee}
            </div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {etape.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
