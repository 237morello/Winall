import type { Metadata } from "next";
import { ArrowRight, Database, HardDrive, Layers, Server } from "lucide-react";
import { AdminHero } from "@/components/features/admin-layout";
import { SystemResources } from "@/components/features/system-resources";
import {
  formatBytes,
  getDatabaseSizeBytes,
  getExternalServices,
  getRecentActivity,
  getStorageUsage,
  getSystemInfo,
  getTableCounts,
} from "@/lib/system-stats";

export const metadata: Metadata = {
  title: "Systeme et ressources - Winall Admin",
  description: "Vue d'ensemble reelle des ressources systeme et de la base de donnees.",
};

// Données live recalculées à chaque visite.
export const dynamic = "force-dynamic";

export default async function SystemePage() {
  const [dbSize, counts, storage, activity] = await Promise.all([
    getDatabaseSizeBytes(),
    getTableCounts(),
    getStorageUsage(),
    getRecentActivity(),
  ]);
  const systemInfo = getSystemInfo();
  const services = getExternalServices();
  const totalRows = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-[88rem] space-y-6 p-4 sm:p-6 lg:p-8">
      <AdminHero
        titlePrimary="Système & ressources"
        titleSecondary="Données réelles de la base et du stockage"
        icon={Server}
        badges={[
          {
            label: "Opérationnel",
            variant: "outline",
            dotColor: "bg-primary",
            className: "border-primary/20 bg-primary/5 text-primary",
          },
        ]}
        actions={[
          {
            label: "Voir le catalogue",
            href: "/admin/systeme/publisher",
            icon: ArrowRight,
          },
        ]}
        stats={[
          {
            label: "Taille base de données",
            value: formatBytes(dbSize),
            icon: Database,
          },
          {
            label: "Lignes en base",
            value: totalRows.toLocaleString("fr-FR"),
            icon: Layers,
          },
          {
            label: "Fichiers stockés",
            value: storage.unavailable
              ? "—"
              : storage.fileCount.toLocaleString("fr-FR"),
            icon: HardDrive,
          },
          {
            label: "Stockage utilisé",
            value: storage.unavailable ? "—" : formatBytes(storage.totalBytes),
            icon: HardDrive,
          },
        ]}
      />

      <SystemResources
        dbSizeBytes={dbSize}
        counts={counts}
        storage={storage}
        systemInfo={systemInfo}
        services={services}
        activity={activity}
      />
    </div>
  );
}
