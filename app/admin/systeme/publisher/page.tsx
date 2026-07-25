import type { Metadata } from "next";
import {
  CheckCircle2,
  FileEdit,
  Globe2,
  LayoutGrid,
  Plus,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHero } from "@/components/features/admin-layout";
import { PublisherDashboard } from "@/components/features/admin-projects/publisher-dashboard";

export const metadata: Metadata = {
  title: "Publisher projets - Winall Admin",
  description: "Gestion des projets publiables et publies depuis l'espace admin.",
};

export const dynamic = "force-dynamic";

export default async function PublisherPage() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      titre: true,
      domaine: true,
      statut: true,
      isPublished: true,
      publishedAt: true,
      localisation: true,
      imageUrl: true,
      updatedAt: true,
      placements: {
        select: { zone: true, subServiceSlug: true },
      },
    },
    orderBy: [{ isPublished: "desc" }, { updatedAt: "desc" }],
  });

  const publishedCount = projects.filter((p) => p.isPublished).length;
  const draftCount = projects.length - publishedCount;
  const placementCount = projects.reduce(
    (acc, p) => acc + p.placements.length,
    0,
  );
  const lastPublished = projects
    .filter((p) => p.publishedAt)
    .sort(
      (a, b) =>
        (b.publishedAt?.getTime() ?? 0) - (a.publishedAt?.getTime() ?? 0),
    )[0]?.publishedAt;

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-[88rem] px-4 pt-4 sm:px-6 lg:px-8">
        <AdminHero
          titlePrimary="Catalogue"
          titleSecondary="Cliquez une ligne pour ouvrir la fiche projet."
          icon={Sparkles}
          actions={[
            {
              label: "Nouveau projet",
              href: "/admin/systeme/publisher/nouveau",
              icon: Plus,
            },
          ]}
          stats={[
            {
              label: "Projets publiés",
              value: publishedCount,
              icon: Globe2,
            },
            {
              label: "Brouillons",
              value: draftCount,
              icon: FileEdit,
            },
            {
              label: "Emplacements actifs",
              value: placementCount,
              icon: LayoutGrid,
            },
            {
              label: "Dernière publication",
              value: lastPublished
                ? lastPublished.toLocaleDateString("fr-FR")
                : "—",
              icon: CheckCircle2,
            },
          ]}
        />
      </div>
      <PublisherDashboard projects={projects} />
    </div>
  );
}
