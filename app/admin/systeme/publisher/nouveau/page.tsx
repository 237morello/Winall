import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/features/admin-projects/project-form";
import { ProjectStepper } from "@/components/features/admin-projects/project-stepper";
import { creerProjet } from "@/components/features/admin-projects/project-actions";

export const metadata: Metadata = {
  title: "Nouveau projet - Winall Admin",
};

export default function NouveauProjetPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-4">
        <Link
          href="/admin/systeme/publisher"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour au catalogue
        </Link>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Nouveau projet</h1>
          <p className="text-sm text-muted-foreground">
            Créez un projet. Vous pourrez ensuite le publier et le placer sur le
            site.
          </p>
        </div>
        <ProjectStepper mode="create" current="info" />
      </div>

      <ProjectForm action={creerProjet} submitLabel="Créer le projet" />
    </div>
  );
}
