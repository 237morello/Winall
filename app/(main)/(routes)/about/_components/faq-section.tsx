/**
 * @file faq-section.tsx
 * @description Section FAQ — Pattern MVC + SOLID.
 *
 * Architecture :
 * - Model  → faq-section.types.ts + faq-section.constants.ts
 * - View   → Ce fichier
 * - Controller → Classe FaqLogique
 *
 * SOLID : SRP (rendu), OCP (ajout de question via constants), DIP (abstractions).
 *
 * SEO Invisible : Un schéma JSON-LD FAQPage est injecté dans le <head> via le composant
 *                 pour que Google affiche les questions en extraits enrichis (Rich Snippets).
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QUESTIONS_FAQ } from "./faq-section.constants";
import type { ProprietesFAQ, QuestionFAQ } from "./faq-section.types";

/**
 * @class FaqLogique
 * @description Contrôleur — Gère la logique de la FAQ (génération JSON-LD, classes CSS).
 */
class FaqLogique {
  /**
   * Génère le schéma JSON-LD FAQPage pour le SEO.
   * @param questions - Liste des questions FAQ.
   * @returns Objet JSON-LD conforme au standard schema.org.
   */
  static genererSchemaJsonLd(questions: ReadonlyArray<QuestionFAQ>) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.reponse,
        },
      })),
    };
  }

  /**
   * Retourne les classes CSS pour un item FAQ selon s'il est le dernier.
   * @param estDernier - Si true, la dernière question n'a pas de bordure basse.
   */
  static obtenirClassesItem(estDernier: boolean): string {
    return estDernier
      ? "border-none bg-muted/30 rounded-xl px-4"
      : "border-b border-border/20 bg-muted/30 rounded-xl px-4";
  }
}

/**
 * @component FaqSection
 * @description Vue — Affiche les questions/réponses en accordéon avec bordures subtiles
 *              et injection du schéma JSON-LD pour le SEO.
 *              Reproduit les blocs gris empilés de la maquette.
 */
export const FaqSection = ({ className }: ProprietesFAQ) => {
  const schemaJsonLd = FaqLogique.genererSchemaJsonLd(QUESTIONS_FAQ);

  return (
    <section className={`py-20 ${className ?? ""}`}>
      {/* ── SEO : Schéma JSON-LD invisible ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Compteur de questions (élément visuel de la maquette : "↕") */}
        <div className="flex items-center justify-end mb-6">
          <span className="text-sm text-muted-foreground font-medium">
            ↕ {QUESTIONS_FAQ.length}
          </span>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {QUESTIONS_FAQ.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className={FaqLogique.obtenirClassesItem(
                index === QUESTIONS_FAQ.length - 1
              )}
            >
              <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                <span className="flex-1 text-left">{faq.question}</span>
                <span className="text-xs text-muted-foreground ml-3 shrink-0">↕</span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground leading-relaxed">
                {faq.reponse}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
