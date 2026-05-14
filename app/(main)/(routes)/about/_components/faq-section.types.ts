/**
 * @file faq-section.types.ts
 * @description Types pour la section FAQ.
 * Principe SOLID : ISP — interface dédiée à la FAQ.
 */

/** Une question/réponse de la FAQ */
export interface QuestionFAQ {
  readonly id: string;
  readonly question: string;
  readonly reponse: string;
}

/** Props publiques du composant FaqSection */
export interface ProprietesFAQ {
  readonly className?: string;
}
