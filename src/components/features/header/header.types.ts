export interface NavHeaderItems {
  id: number;
  libelle: string;
  href: string;
  itemsLists?: NavHeaderItems[];
}

export type NavHeaderProps = NavHeaderItems[];

export interface RouteInternalNavGroup {
  route: string;
  match: "exact" | "prefix";
  links: NavHeaderProps;
}

export interface LogoHeaderItem {
  path: {
    logo1: string;
    logo2: string;
  };
  alt: string;
}

export type LogoProps = LogoHeaderItem[];
