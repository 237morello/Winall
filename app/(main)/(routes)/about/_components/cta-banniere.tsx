/**
 * @file cta-banniere.tsx
 * @description Bannière CTA finale — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → cta-banniere.types.ts + cta-banniere.constants.ts
 * - View   → Ce fichier
 * - Controller → Classe CTABanniereLogique
 *
 * SOLID : SRP, OCP, DIP.
 * Design conforme à la maquette : fond vert foncé (#004d4d), coins très arrondis,
 *         deux boutons ("Demander un devis gratuit" + "Nos réalisations").
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { DONNEES_CTA } from "./cta-banniere.constants";
import type { BoutonCTA, ProprietesCTABanniere } from "./cta-banniere.types";

/**
 * @class CTABanniereLogique
 * @description Contrôleur — Gère les classes CSS des boutons CTA selon leur variante.
 */
class CTABanniereLogique {
  /**
   * Retourne les classes CSS du bouton CTA.
   * @param variante - "principal" (fond vert vif) ou "secondaire" (outline).
   */
  static obtenirClassesBouton(variante: BoutonCTA["variante"]): string {
    const base = "rounded-full px-8 font-bold text-base h-14 transition-all duration-300";

    if (variante === "principal") {
      return `${base} bg-p text-white hover:bg-p/90 shadow-lg shadow-p/20`;
    }
    return `${base} border-2 border-white/30 text-white hover:bg-white/10 bg-transparent`;
  }
}

/**
 * @component CTABanniere
 * @description Vue — Bannière d'appel à l'action en pied de page.
 *              Fond teal/vert foncé, coins arrondis, effet de glow subtil.
 */
export const CTABanniere = ({ className }: ProprietesCTABanniere) => (
  <section className={`w-full py-16 px-6 ${className ?? ""}`}>
    <div className="mx-auto max-w-5xl rounded-[3rem] bg-[#004d40] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
      {/* ── Effets de glow ── */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 h-56 w-56 rounded-full bg-p/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-56 w-56 rounded-full bg-black/20 blur-3xl pointer-events-none" />

      {/* ── Contenu ── */}
      <div className="relative z-10 space-y-8">
        <Typography
          variant="h2"
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
        >
          {DONNEES_CTA.titre}
        </Typography>
        <Typography className="text-white/70 text-lg max-w-2xl mx-auto">
          {DONNEES_CTA.sousTitre}
        </Typography>

        {/* ── Boutons CTA ── */}
        <div className="flex flex-wrap justify-center gap-4">
          {DONNEES_CTA.boutons.map((bouton) => (
            <Button
              key={bouton.id}
              asChild
              className={CTABanniereLogique.obtenirClassesBouton(bouton.variante)}
            >
              <Link href={bouton.lien}>{bouton.texte}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  </section>
);
