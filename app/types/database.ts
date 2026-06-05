/**
 * Types TypeScript pour le Portail Client Winall Tech Sarl
 * Ces types sont générés à partir du schéma Prisma et étendus
 * pour les besoins spécifiques de l'interface utilisateur.
 */

import type {
  Project,
  ProjectComment,
  Message,
  FormRequest,
  Notification,
  User,
  ProjectDomaine,
  ProjectStatut,
  FormType,
  FormStatut,
  NotificationType,
  Role,
} from "@/lib/generated/prisma";

// ============================================================
// RE-EXPORT DES ENUMS (pour éviter d'importer depuis Prisma partout)
// ============================================================
export type { ProjectDomaine, ProjectStatut, FormType, FormStatut, NotificationType, Role };

// ============================================================
// TYPES COMPOSÉS (avec relations incluses)
// ============================================================

/** Projet avec son propriétaire (client) */
export type ProjectAvecClient = Project & {
  user: Pick<User, "id" | "name" | "email" | "image"> | null;
  _count?: { comments: number };
};

/** Commentaire avec les infos de l'auteur */
export type CommentaireAvecAuteur = ProjectComment & {
  user: Pick<User, "id" | "name" | "image">;
};

/** Message avec les infos de l'expéditeur */
export type MessageAvecExpediteur = Message & {
  senderUser: Pick<User, "id" | "name" | "image">;
};

/** Formulaire avec les infos du soumetteur et du projet lié */
export type FormulaireComplet = FormRequest & {
  user: Pick<User, "id" | "name" | "email"> | null;
  project: Pick<Project, "id" | "titre" | "domaine"> | null;
};

// ============================================================
// TYPES POUR LA DONNÉE JSON DES FORMULAIRES
// (Ce qui est stocké dans le champ "donnees" de FormRequest)
// ============================================================

/** Données spécifiques à un formulaire de demande de Devis */
export type DonneesDevis = {
  domaineInteret: ProjectDomaine;
  budgetEstimatif?: string;       // Ex: "500 000 - 1 000 000 FCFA"
  descriptionBesoin: string;
  localisation: string;           // Ville du projet
};

/** Données spécifiques à une demande d'Intervention / SAV */
export type DonneesIntervention = {
  projectId: string;              // L'ID du projet concerné
  niveauUrgence: "FAIBLE" | "MOYEN" | "CRITIQUE";
  descriptionProbleme: string;
};

/** Données spécifiques à un formulaire de Contact général */
export type DonneesContact = {
  sujet: string;
  messageContenu: string;
};

// ============================================================
// TYPES D'INPUT POUR LES SERVER ACTIONS (validés par Zod)
// ============================================================

/** Input pour créer/modifier un projet (utilisé par l'Admin) */
export type ProjectInput = {
  titre: string;
  description: string;
  domaine: ProjectDomaine;
  statut: ProjectStatut;
  isPublic: boolean;
  localisation?: string;
  imageUrl?: string;
  images?: string[];
  userId?: string;
};

/** Input commun à tous les formulaires */
type FormInputBase = {
  nom: string;
  email: string;
  telephone?: string;
};

/** Input pour soumettre une demande de Devis */
export type FormDevisInput = FormInputBase & {
  type: "DEVIS";
  donnees: DonneesDevis;
};

/** Input pour soumettre une demande d'Intervention */
export type FormInterventionInput = FormInputBase & {
  type: "INTERVENTION";
  projectId: string;
  donnees: DonneesIntervention;
};

/** Input pour soumettre un Contact général */
export type FormContactInput = FormInputBase & {
  type: "CONTACT";
  donnees: DonneesContact;
};

/** Union type de tous les formulaires (pour la soumission) */
export type FormSubmitInput = FormDevisInput | FormInterventionInput | FormContactInput;

// ============================================================
// TYPES POUR L'INTERFACE UTILISATEUR (Data Transfer Objects)
// ============================================================

/** Ce que le tableau de bord Admin voit en résumé */
export type AdminDashboardStats = {
  totalProjects: number;
  projectsEnCours: number;
  formulairesNonLus: number;
  messagesNonLus: number;
};

/** Ce qu'un Client voit sur son tableau de bord */
export type ClientDashboardData = {
  mesProjets: ProjectAvecClient[];
  mesNotifications: Notification[];
  mesFormulaires: FormRequest[];
};
