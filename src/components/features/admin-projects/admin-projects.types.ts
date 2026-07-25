import { PlacementZone, ProjectDomaine, ProjectStatut } from "@prisma/client";

export interface ProjectPlacementSummary {
  zone: PlacementZone;
  subServiceSlug: string | null;
}

export interface ProjectSummary {
  id: string;
  titre: string;
  domaine: ProjectDomaine;
  statut: ProjectStatut;
  isPublished: boolean;
  publishedAt: Date | null;
  localisation: string | null;
  imageUrl: string | null;
  updatedAt: Date;
  placements: ProjectPlacementSummary[];
}
