"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  LayoutGrid,
  MapPin,
  MessageSquare,
  FileText,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageTall } from "@/components/features/long-image";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/images/63966.jpg";

export type ProjectDetailData = {
  id: string;
  titre: string;
  description: string;
  domaine: string;
  statut: string;
  imageUrl: string | null;
  images: string[];
  localisation: string | null;
  progression: number;
  createdAt: string;
  updatedAt: string;
  clientName: string | null;
  commentsCount: number;
  requests: Array<{
    id: string;
    type: string;
    statut: string;
    createdAt: string;
  }>;
};

export type RelatedProjectData = {
  id: string;
  titre: string;
  description: string;
  domaine: string;
  imageUrl: string | null;
};

interface ProjectDetailProps {
  project: ProjectDetailData;
  relatedProjects: RelatedProjectData[];
}

function getProjectImages(project: ProjectDetailData) {
  const images = [project.imageUrl, ...project.images].filter(
    (image): image is string => Boolean(image),
  );

  return images.length > 0 ? images : [FALLBACK_IMAGE];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function ProjectImage({
  src,
  alt,
  priority,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const [imageSource, setImageSource] = React.useState(src || FALLBACK_IMAGE);

  React.useEffect(() => {
    setImageSource(src || FALLBACK_IMAGE);
  }, [src]);

  return (
    <Image
      src={imageSource}
      alt={alt}
      fill
      priority={priority}
      unoptimized={imageSource.includes("/storage/v1/object/public/")}
      className={cn("object-cover", className)}
      onError={() => setImageSource(FALLBACK_IMAGE)}
    />
  );
}

export function ProjectDetail({ project, relatedProjects }: ProjectDetailProps) {
  const router = useRouter();
  const images = React.useMemo(() => getProjectImages(project), [project]);
  const [selectedImage, setSelectedImage] = React.useState(images[0]);
  const [liked, setLiked] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="space-y-12 pb-20">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <div className="space-y-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-fit px-0 text-muted-foreground hover:bg-transparent"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>

          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted shadow-sm">
            <ProjectImage
              src={selectedImage}
              alt={project.titre}
              priority
              className="transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-white/20 bg-white/15 text-white hover:bg-white/20">
                  {project.domaine}
                </Badge>
                <Badge variant="secondary" className="bg-background/90">
                  {project.statut.replaceAll("_", " ")}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={cn(
                  "relative aspect-video overflow-hidden rounded-lg border bg-muted transition-all hover:opacity-90",
                  selectedImage === image ? "border-primary ring-2 ring-primary/20" : "border-border",
                )}
                onClick={() => setSelectedImage(image)}
              >
                <ProjectImage src={image} alt={`${project.titre} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-6 lg:pt-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary hover:bg-primary/15">
                Étude de cas
              </Badge>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
                <span className="ml-2 text-xs font-semibold text-muted-foreground">
                  {project.commentsCount} avis
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                {project.titre}
              </h1>
              <p className="text-base leading-7 text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard icon={MapPin} label="Localisation" value={project.localisation || "Non renseignée"} />
            <MetricCard icon={CalendarDays} label="Mise à jour" value={formatDate(project.updatedAt)} />
          </div>

          <Card className="space-y-4 rounded-lg border-border/70 p-5 shadow-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Progression</p>
                <p className="text-2xl font-black">{project.progression}%</p>
              </div>
              <p className="max-w-40 text-right text-sm text-muted-foreground">
                {project.clientName ? `Projet client : ${project.clientName}` : "Réalisation vitrine Winall"}
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${project.progression}%` }}
              />
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className={cn("rounded-full gap-2", liked === true && "border-primary text-primary")}
              onClick={() => setLiked(liked === true ? null : true)}
            >
              <ThumbsUp className={cn("size-4", liked === true && "fill-current")} />
              Utile
            </Button>
            <Button
              type="button"
              variant="outline"
              className={cn("rounded-full gap-2", liked === false && "border-destructive text-destructive")}
              onClick={() => setLiked(liked === false ? null : false)}
            >
              <ThumbsDown className={cn("size-4", liked === false && "fill-current")} />
              À améliorer
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Heart className="size-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Share2 className="size-5" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild className="h-12 rounded-lg gap-2 font-bold">
              <Link href={`/dashboard/support?type=INTERVENTION&projectId=${project.id}`}>
                <Wrench className="size-4" />
                Demander une intervention
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-lg gap-2 font-bold">
              <Link href={`/dashboard/support?type=DEVIS&projectId=${project.id}`}>
                <FileText className="size-4" />
                Demander un devis complémentaire
              </Link>
            </Button>
          </div>

          <div id="reviews" className="rounded-lg border bg-muted/20 p-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="size-5" />
              </div>
              <div className="space-y-1">
                <h2 className="font-bold">Avis et suivi client</h2>
                <p className="text-sm text-muted-foreground">
                  Les retours liés au projet restent centralisés pour garder l’historique lisible.
                </p>
              </div>
            </div>
          </div>

          {project.requests.length > 0 ? (
            <div className="rounded-lg border bg-card p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-bold">Demandes liées</h2>
                <Badge variant="outline" className="rounded-lg">
                  {project.requests.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {project.requests.slice(0, 4).map((request) => (
                  <div key={request.id} className="flex items-center justify-between gap-4 rounded-lg bg-muted/40 p-3 text-sm">
                    <div>
                      <p className="font-semibold">{request.type === "DEVIS" ? "Devis complémentaire" : "Intervention"}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</p>
                    </div>
                    <Badge variant={request.statut === "NON_LU" ? "destructive" : "secondary"} className="rounded-lg text-[10px]">
                      {request.statut.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="space-y-6 border-t pt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LayoutGrid className="size-5" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Autres projets du même domaine</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Des réalisations proches pour comparer les approches et livrables Winall.
            </p>
          </div>
        </div>

        {relatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProjects.map((relatedProject) => (
              <ImageTall
                key={relatedProject.id}
                id={relatedProject.id}
                image={relatedProject.imageUrl || FALLBACK_IMAGE}
                text={relatedProject.titre}
                description={relatedProject.description}
                categorie={relatedProject.domaine}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            Aucun autre projet du même domaine n’est disponible pour le moment.
          </div>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-lg border-border/70 p-5 shadow-none">
      <div className="mb-3 flex items-center gap-2 text-primary">
        <Icon className="size-4" />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-base font-bold">{value}</p>
    </Card>
  );
}
