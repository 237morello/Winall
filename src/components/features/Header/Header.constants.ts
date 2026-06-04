import type {
  ActionHeader,
  LienNavigationHeader,
} from "./Header.types";

/**
 * @description Liste des liens principaux visibles dans la navigation.
 */
export const LIENS_NAVIGATION_HEADER: ReadonlyArray<LienNavigationHeader> = [
  { libelle: "Accueil", href: "/" },
  { libelle: "Services", href: "/services" },
  { libelle: "Projets", href: "/projets" },
  { libelle: "À propos", href: "/about" },
];

/**
 * @description Action commerciale ou espace client mise en avant dans l'en-tête.
 */
export const ACTION_PRINCIPALE_HEADER: ActionHeader[] = [
  {
    id: 0,
    libelle: "Connexion",
    href: "/log-in",
  },
  {
    id: 1,
    libelle: "Nous Rejoindre",
    href: "/sign-up",
  },
];




/**
 * @description Signature de marque visible � c�t� du logo.
 */
export const MARQUE_HEADER = {
  titre: "Winall",
  sousTitre: "Tech Sarl",
  logo: "/images/logo_v2.png",
  altLogo: "Logo Winall Tech Sarl",
};
