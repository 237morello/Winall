import { ReactNode } from "react";

/**
 * @interface DetailService
 * @description Détails approfondis affichés dans une vue étendue (dialogue).
 */
export interface DetailService {
  id: number;
  accroche: string;
  explication: string;
  competences: string[];
  noteFinale: string;
}

/**
 * @interface ServiceWinall
 * @description Représente une prestation proposée par Winall.
 */
export interface ServiceWinall {
  titre: string;
  description: string;
  icone: ReactNode;
  details?: DetailService[];
}

/**
 * @interface ServicesProps
 * @description Propriétés pour le composant Services.
 */
export interface ServicesProps {
  services?: ServiceWinall[];
}
