import nextPkg from "next/package.json";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  PROJECT_IMAGES_BUCKET,
  PROJECT_IMAGES_PREFIX,
} from "@/lib/supabase/storage";

/** Taille totale de la base de données PostgreSQL (en octets). */
export async function getDatabaseSizeBytes(): Promise<number> {
  const rows = await prisma.$queryRaw<Array<{ size: bigint }>>`
    SELECT pg_database_size(current_database()) AS size
  `;
  return Number(rows[0]?.size ?? 0);
}

export interface TableCounts {
  projets: number;
  utilisateurs: number;
  formulaires: number;
  factures: number;
  messages: number;
  commentaires: number;
  placements: number;
}

/** Nombre de lignes des tables métier clés. */
export async function getTableCounts(): Promise<TableCounts> {
  const [
    projets,
    utilisateurs,
    formulaires,
    factures,
    messages,
    commentaires,
    placements,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.user.count(),
    prisma.formRequest.count(),
    prisma.invoice.count(),
    prisma.message.count(),
    prisma.projectComment.count(),
    prisma.projectPlacement.count(),
  ]);

  return {
    projets,
    utilisateurs,
    formulaires,
    factures,
    messages,
    commentaires,
    placements,
  };
}

export interface StorageUsage {
  fileCount: number;
  totalBytes: number;
  /** true si le bucket est inaccessible (ex: pas encore créé). */
  unavailable?: boolean;
}

/**
 * Usage d'un bucket Supabase Storage : nombre de fichiers et taille totale.
 * Parcourt récursivement les dossiers via le client service-role.
 */
export async function getStorageUsage(
  bucket: string = PROJECT_IMAGES_BUCKET,
): Promise<StorageUsage> {
  let supabase: ReturnType<typeof createAdminClient>;
  try {
    supabase = createAdminClient();
  } catch {
    return { fileCount: 0, totalBytes: 0, unavailable: true };
  }

  let fileCount = 0;
  let totalBytes = 0;

  async function walk(prefix: string): Promise<boolean> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix, { limit: 1000, sortBy: { column: "name", order: "asc" } });

    if (error) return false;
    if (!data) return true;

    for (const entry of data) {
      // Un "dossier" n'a pas de métadonnées de taille (id null).
      const isFolder = entry.id === null;
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (isFolder) {
        await walk(path);
      } else {
        fileCount += 1;
        const size = (entry.metadata as { size?: number } | null)?.size;
        if (typeof size === "number") totalBytes += size;
      }
    }
    return true;
  }

  const ok = await walk(PROJECT_IMAGES_PREFIX);
  if (!ok) return { fileCount: 0, totalBytes: 0, unavailable: true };

  return { fileCount, totalBytes };
}

export interface SystemInfoItem {
  label: string;
  value: string;
}

/** Extrait l'hôte d'une URL Postgres sans exposer les identifiants. */
function parseDbHost(url: string | undefined): string {
  if (!url) return "—";
  try {
    const u = new URL(url);
    return u.port ? `${u.hostname}:${u.port}` : u.hostname;
  } catch {
    return "—";
  }
}

/** Informations système honnêtes dérivées de l'environnement (aucun secret). */
export function getSystemInfo(): SystemInfoItem[] {
  const env =
    process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
  const region = process.env.VERCEL_REGION ?? "—";
  return [
    { label: "Environnement", value: env },
    { label: "Version Next.js", value: nextPkg.version },
    { label: "Runtime Node", value: process.version },
    { label: "Région", value: region },
    { label: "Hôte base de données", value: parseDbHost(process.env.DATABASE_URL) },
  ];
}

export interface ExternalServiceStatus {
  id: string;
  name: string;
  description: string;
  configured: boolean;
}

/** Statut des services externes dérivé de la présence des variables d'env. */
export function getExternalServices(): ExternalServiceStatus[] {
  const has = (...keys: string[]) => keys.every((k) => Boolean(process.env[k]));
  return [
    {
      id: "supabase",
      name: "Supabase",
      description: "PostgreSQL, Auth & Storage",
      configured: has("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"),
    },
    {
      id: "upstash",
      name: "Upstash Redis",
      description: "Cache & rate limiting",
      configured: has("UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"),
    },
    {
      id: "github",
      name: "GitHub OAuth",
      description: "Connexion tierce",
      configured: has("GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"),
    },
    {
      id: "google",
      name: "Google OAuth",
      description: "Connexion tierce",
      configured: has("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"),
    },
  ];
}

export type ActivityType = "projet" | "formulaire";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: Date;
}

/**
 * Activité récente réelle : derniers projets modifiés et derniers formulaires
 * reçus, fusionnés et triés par date décroissante.
 */
export async function getRecentActivity(limit = 6): Promise<ActivityItem[]> {
  const [projets, formulaires] = await Promise.all([
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: { id: true, titre: true, isPublished: true, updatedAt: true },
    }),
    prisma.formRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, type: true, nom: true, createdAt: true },
    }),
  ]);

  const items: ActivityItem[] = [
    ...projets.map((p) => ({
      id: `projet-${p.id}`,
      type: "projet" as const,
      title: p.titre,
      description: p.isPublished ? "Projet publié" : "Brouillon mis à jour",
      date: p.updatedAt,
    })),
    ...formulaires.map((f) => ({
      id: `form-${f.id}`,
      type: "formulaire" as const,
      title: `Formulaire ${f.type.toLowerCase()}`,
      description: `Reçu de ${f.nom}`,
      date: f.createdAt,
    })),
  ];

  return items
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}

/** Formate un nombre d'octets en unité lisible (Ko / Mo / Go). */
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 o";
  const units = ["o", "Ko", "Mo", "Go", "To"];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024)),
  );
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
