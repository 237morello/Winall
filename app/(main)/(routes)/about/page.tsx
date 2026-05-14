/**
 * @page Page À Propos — /about
 * @description Page complète "À Propos" de Winall Tech Sarl.
 *
 * Architecture MVC + SOLID :
 * ──────────────────────────
 * Chaque section suit le pattern à 3 fichiers :
 *   - *.types.ts      → Model (Interfaces / Contrats)
 *   - *.constants.ts   → Model (Données statiques)
 *   - *.tsx            → View + Controller (Composant + Classe Logique)
 *
 * Principes SOLID respectés :
 *   - SRP : Chaque composant n'a qu'une seule raison de changer.
 *   - OCP : Ajouter du contenu = modifier les constants, pas les composants.
 *   - LSP : Chaque item d'un tableau respecte son contrat d'interface.
 *   - ISP : Interfaces granulaires (BlocIdentite ≠ ValeurEntreprise ≠ EtapeTimeline).
 *   - DIP : Les composants dépendent d'abstractions (types), pas d'implémentations.
 *
 * Structure de la page (conforme à la maquette) :
 *   1. Hero About       — Texte introductif + Carte "We are available"
 *   2. Mission & Valeurs — Mission/Vision (gauche) + Accordion valeurs (droite)
 *   3. Timeline          — Frise chronologique horizontale (2015 → Aujourd'hui)
 *   4. Contact Action    — Image technicienne + Boutons flottants (mail / devis)
 *   5. Leaders           — Cartes dirigeants (placeholders gris)
 *   6. FAQ               — Accordéon avec JSON-LD SEO intégré
 *   7. CTA Bannière      — "Un projet en tête ? Parlons-en dès maintenant."
 *   8. Footer            — Multi-colonnes (Services, Liens, Contact)
 */

import { generateSeo } from "@/components/seo/seo";

// ── Composants de la page About ──
import { HeroAbout } from "./_components/hero-about";
import { MissionValues } from "./_components/mission-values";
import { HistoryTimeline } from "./_components/history-timeline";
import { ContactAction } from "./_components/contact-action";
import { LeadersSection } from "./_components/leaders-section";
import { FaqSection } from "./_components/faq-section";
import { CTABanniere } from "./_components/cta-banniere";
import { FooterAbout } from "./_components/footer-about";

/**
 * @constant metadata
 * @description Métadonnées SEO pour la page À Propos (Server Component — pas besoin de "use client").
 */
export const metadata = generateSeo({
  title: "À Propos | Winall Tech Sarl",
  description:
    "Découvrez Winall Tech Sarl : notre mission, notre vision, nos valeurs et notre équipe d'experts en réseaux, vidéosurveillance et BTP au Cameroun.",
  keywords: [
    "Winall Tech",
    "À propos",
    "Cameroun",
    "Réseaux",
    "Vidéosurveillance",
    "BTP",
    "Sécurité électronique",
    "ZKTeco",
    "Hikvision",
    "Dahua",
  ],
});

/**
 * @component AboutPage
 * @description Page complète À Propos — Server Component (pas de "use client").
 *              Assemblage vertical des sections conformes à la maquette.
 */
export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background -mt-20">
      {/* 1. Section Hero */}
      <HeroAbout className="pt-32" />

      {/* 2. Mission, Vision & Valeurs */}
      <MissionValues />

      {/* 3. Frise Chronologique */}
      <HistoryTimeline />

      {/* 4. Contact Action (Image + Boutons) */}
      <ContactAction />

      {/* 5. Équipe Dirigeante (Cartes placeholder) */}
      <LeadersSection />

      {/* 6. FAQ */}
      <FaqSection />

      {/* 7. Bannière CTA Finale */}
      <CTABanniere />

      {/* 8. Footer */}
      <FooterAbout />
    </div>
  );
}
