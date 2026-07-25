import type {
  LogoProps,
  NavHeaderProps,
  RouteInternalNavGroup,
} from "./header.types";

export const ROUTE_INTERNAL_NAV_GROUPS: RouteInternalNavGroup[] = [
  {
    route: "/",
    match: "exact",
    links: [
      {
        id: 1,
        libelle: "Accueil",
        href: "/#hero",
      },
      {
        id: 2,
        libelle: "Expertises",
        href: "/#services",
      },
      {
        id: 3,
        libelle: "Méthode",
        href: "/#methode",
      },
      {
        id: 4,
        libelle: "Réalisations",
        href: "/#realisations",
      },
      {
        id: 5,
        libelle: "Contact",
        href: "/#contact",
      },
    ],
  },
  {
    route: "/about",
    match: "exact",
    links: [
      {
        id: 1,
        libelle: "Présentation",
        href: "/about#presentation",
      },
      {
        id: 2,
        libelle: "Rôle",
        href: "/about#role",
      },
      {
        id: 3,
        libelle: "Engagements",
        href: "/about#engagements",
      },
      {
        id: 4,
        libelle: "Méthode",
        href: "/about#methode",
      },
      {
        id: 5,
        libelle: "Contact",
        href: "/about#contact",
      },
    ],
  },
  {
    route: "/services",
    match: "exact",
    links: [
      {
        id: 1,
        libelle: "Présentation",
        href: "/services#presentation",
      },
      {
        id: 2,
        libelle: "Catalogue",
        href: "/services#catalogue",
      },
      {
        id: 3,
        libelle: "Réalisations",
        href: "/services#realisations",
      },
      {
        id: 4,
        libelle: "Contact",
        href: "/services#contact",
      },
    ],
  },
  {
    route: "/services/",
    match: "prefix",
    links: [
      {
        id: 1,
        libelle: "Service",
        href: "#service",
      },
      {
        id: 2,
        libelle: "Livrables",
        href: "#livrables",
      },
      {
        id: 3,
        libelle: "Projets liés",
        href: "#realisations",
      },
      {
        id: 4,
        libelle: "Explorer",
        href: "#explorer",
      },
      {
        id: 5,
        libelle: "Contact",
        href: "#contact",
      },
    ],
  },
  {
    route: "/projets",
    match: "exact",
    links: [
      {
        id: 1,
        libelle: "Projets",
        href: "/projets#projets",
      },
      {
        id: 2,
        libelle: "Contact",
        href: "/projets#contact",
      },
    ],
  },
];

export const PAGE_NAV_HEADERS: NavHeaderProps = [
  {
    id: 1,
    libelle: "Services",
    href: "/services",
    itemsLists: [
      {
        id: 1,
        libelle: "Électronique",
        href: "/services/electronique",
      },
      {
        id: 2,
        libelle: "Génie civil",
        href: "/services/genie-civil",
      },
      {
        id: 3,
        libelle: "BTP",
        href: "/services/btp",
      },
      {
        id: 4,
        libelle: "Maintenance",
        href: "/services/maintenance",
      },
      {
        id: 5,
        libelle: "Infographie",
        href: "/services/infographie",
      },
      {
        id: 6,
        libelle: "Sécurité incendie",
        href: "/services/securite-incendie",
      },
      {
        id: 7,
        libelle: "Réseaux",
        href: "/services/reseaux",
      },
      {
        id: 8,
        libelle: "Autres",
        href: "/services/autres",
      },
    ],
  },
  {
    id: 2,
    libelle: "Projets",
    href: "/projets",
  },
  {
    id: 3,
    libelle: "À propos",
    href: "/about",
  },
];

export const LogoHeader: LogoProps[0] = {
  path: {
    logo1: "/images/iconlogo.png",
    logo2: "/images/logo.png",
  },
  alt: "Logo Winall Tech Sarl",
};
