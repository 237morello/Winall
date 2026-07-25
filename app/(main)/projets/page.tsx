import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import { getFeaturedProjects } from "@/components/features/marketing/marketing.constants";
import {
  getPublishedProjectsByZone,
  groupProjectsByService,
} from "@/lib/public-projects";
import { ContactCta } from "@/components/features/marketing/components/contact-cta";
import { ProjectsByService } from "@/components/features/marketing/components/projects-by-service";

export const metadata: Metadata = {
  title: "Projets réalisés | Winall Tech Sarl",
  description:
    "Découvrez les projets réalisés par Winall Tech Sarl, classés par service : réseaux, BTP, maintenance, sécurité incendie, infographie et autres prestations.",
};

export default async function ProjectsPage() {
  const placed = await getPublishedProjectsByZone("PROJETS_GLOBAL", 64);
  const projects = placed.length > 0 ? placed : getFeaturedProjects(64);
  const groups = groupProjectsByService(projects);
  const heroImage = projects[0]?.image;

  return (
    <main className="min-h-screen bg-background">
      {/* ────────────────────────────────────────────────────────
          HERO — image unique, hauteur alignée sur le bloc texte
      ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background">
        <Container
          size="8xl"
          className="grid items-stretch gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"
        >
          <div className="flex max-w-2xl flex-col justify-center">
            <Eyebrow>Projets</Eyebrow>
            <Heading level={1} className="mt-4">
              Des réalisations concrètes,{" "}
              <span className="text-destructive">livrées sur le terrain.</span>
            </Heading>
            <Lead className="mt-6">
              Explorez les interventions menées par Winall Tech Sarl pour
              identifier le service, la méthode et le type d’accompagnement
              adaptés à votre besoin.
            </Lead>

            <div className="mt-8">
              <Link
                href="/services"
                className={buttonVariants({ size: "lg", className: "w-fit" })}
              >
                Voir les services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <dt className="order-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Réalisations
                </dt>
                <dd className="order-1 text-2xl font-semibold text-primary">
                  {projects.length}
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="order-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Domaines couverts
                </dt>
                <dd className="order-1 text-2xl font-semibold text-primary">
                  {groups.length}
                </dd>
              </div>
            </dl>
          </div>

          {heroImage && (
            <div className="relative hidden min-h-88 overflow-hidden rounded-3xl ring-1 ring-border shadow-sm lg:block">
              <Image
                src={heroImage}
                alt=""
                fill
                sizes="45vw"
                className="object-cover"
                priority
                unoptimized={heroImage.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
          )}
        </Container>
      </section>

      {/* ────────────────────────────────────────────────────────
          PROJETS — une ligne par service, carrousel horizontal
      ──────────────────────────────────────────────────────── */}
      <ProjectsByService
        id="projets"
        eyebrow="Portfolio"
        title="Projets réalisés par domaine d’expertise."
        description="Chaque ligne regroupe les projets d’un même service pour faciliter votre lecture des prestations terrain."
        groups={groups}
      />

      <ContactCta />
    </main>
  );
}
