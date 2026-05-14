/**
 * @file contact-action.tsx
 * @description Section Contact Action — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → contact-action.types.ts + contact-action.constants.ts
 * - View   → Ce fichier
 * - Controller → Classe ContactActionLogique
 *
 * SOLID : SRP (rendu seul), OCP (ajout de bouton via constants), DIP (dépend des abstractions).
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";
import { DONNEES_CONTACT_ACTION } from "./contact-action.constants";
import type { BoutonActionRapide, ProprietesContactAction } from "./contact-action.types";

/**
 * @class ContactActionLogique
 * @description Contrôleur — Gère les classes CSS et l'icône selon la variante du bouton.
 */
class ContactActionLogique {
  /**
   * Retourne les classes CSS du bouton selon sa variante.
   * @param variante - "vert" ou "orange"
   */
  static obtenirClassesBouton(variante: BoutonActionRapide["variante"]): string {
    const base =
      "font-bold px-8 py-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 text-white text-base";

    if (variante === "vert") {
      return `${base} bg-p hover:bg-p/90 shadow-p/20`;
    }
    return `${base} bg-o hover:bg-o/90 shadow-o/20`;
  }

  /**
   * Retourne l'icône correspondante à la variante.
   * @param variante - "vert" (Mail) ou "orange" (FileText)
   */
  static obtenirIcone(variante: BoutonActionRapide["variante"]) {
    if (variante === "vert") {
      return <Mail className="mr-2 h-5 w-5" />;
    }
    return <FileText className="mr-2 h-5 w-5" />;
  }
}

/**
 * @component ContactAction
 * @description Vue — Section avec l'image de la technicienne et les boutons flottants
 *              (mail + devis) superposés. Reproduit le design arrondi de la maquette.
 */
export const ContactAction = ({ className }: ProprietesContactAction) => (
  <section className={`py-16 ${className ?? ""}`}>
    <div className="max-w-4xl mx-auto px-6">
      <div className="relative rounded-[2.5rem] overflow-hidden group">
        {/* ── Image de la technicienne ── */}
        <div className="relative h-[400px] md:h-[550px] w-full bg-muted/30">
          <Image
            src={DONNEES_CONTACT_ACTION.imageTechnicienne}
            alt="Technicienne Winall Tech en intervention"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay gradient pour lisibilité des boutons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* ── Boutons d'action rapide flottants ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          {DONNEES_CONTACT_ACTION.boutons.map((bouton) => (
            <Button
              key={bouton.id}
              asChild
              className={ContactActionLogique.obtenirClassesBouton(bouton.variante)}
            >
              <Link href={bouton.lien}>
                {ContactActionLogique.obtenirIcone(bouton.variante)}
                {bouton.texte}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  </section>
);
