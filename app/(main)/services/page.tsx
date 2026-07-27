import type { Metadata } from "next";
import { Container } from "@/components/features/container";
import {
  MARKETING_SERVICES,
  getFeaturedProjects,
} from "@/components/features/marketing/marketing.constants";
import type {
  ServiceBusinessBenefit,
  ServiceKeyStat,
} from "@/components/features/marketing/marketing.types";
import { getPublishedProjectsByZone } from "@/lib/public-projects";
import { ContactCta } from "@/components/features/marketing/components/contact-cta";
import { ProjectsShowcase } from "@/components/features/marketing/components/projects-showcase";
import { ServiceCard } from "@/components/features/marketing/components/service-card";
import {
  ServiceCardFeatured,
  ServiceWhy,
} from "@/components/features/marketing/components/services";
import { PageHeroBand } from "@/components/features/marketing/components/page-hero-band";
import { ImageMosaic } from "@/components/features/marketing/components/image-mosaic";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const SERVICES_TITLE = "Nos services";
const SERVICES_OG_TITLE = "Nos services techniques | Winall Tech Sarl";
const SERVICES_DESCRIPTION =
  "Découvrez les services Winall Tech Sarl à Douala : électronique, génie civil, BTP, maintenance, infographie, sécurité incendie, réseaux et autres prestations.";

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  keywords: [
    "services Winall Tech",
    "électronique Douala",
    "génie civil Cameroun",
    "BTP Douala",
    "maintenance industrielle Douala",
    "sécurité incendie Douala",
    "réseaux vidéosurveillance Cameroun",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: SERVICES_OG_TITLE,
    description: SERVICES_DESCRIPTION,
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_OG_TITLE,
    description: SERVICES_DESCRIPTION,
  },
};

// Argumentaire global (le catalogue n'est pas rattaché à un service unique).
const GLOBAL_STATS: ServiceKeyStat[] = [
  { value: "8", label: "pôles d'expertise" },
  { value: "200+", label: "projets réalisés" },
  { value: "10+", label: "ans d'expérience" },
  { value: "48h", label: "délai de réponse" },
];
const GLOBAL_BENEFITS: ServiceBusinessBenefit[] = [
  {
    category: "Un seul interlocuteur",
    description:
      "Huit pôles techniques coordonnés par une même équipe, du cadrage à la mise en service.",
  },
  {
    category: "Réalisations vérifiables",
    description:
      "Plus de 200 projets livrés sur le terrain, reliés à chaque service pour situer notre savoir-faire.",
  },
  {
    category: "Réactivité",
    description:
      "Une réponse sous 48h et un cadrage clair avant tout engagement.",
  },
  {
    category: "Ancrage local",
    description:
      "Une décennie d'expérience à Douala et une connaissance fine du terrain camerounais.",
  },
];

export default async function ServicesPage() {
  const placed = await getPublishedProjectsByZone("PROJETS_GLOBAL", 16);
  const projects = placed.length > 0 ? placed : getFeaturedProjects(16);
  const mosaic = MARKETING_SERVICES.slice(0, 4).map((service) => service.image);

  const featuredServices = MARKETING_SERVICES.slice(0, 2);
  const compactServices = MARKETING_SERVICES.slice(2);

  return (
    <main className="min-h-screen bg-background">
      <PageHeroBand
        eyebrow="Services"
        title={
          <>
            Toutes vos prestations techniques,{" "}
            <span className="text-primary">un seul interlocuteur.</span>
          </>
        }
        lead="Chaque page service détaille les livrables, les points de contrôle et les réalisations associées afin de cadrer rapidement votre besoin — de l'étude à la mise en service."
        actions={[
          { label: "Demander un devis", href: "/#contact" },
          {
            label: "Voir les réalisations",
            href: "/projets",
            variant: "outline",
          },
        ]}
        stats={[
          { value: "8", label: "Pôles d'expertise" },
          { value: "200+", label: "Projets réalisés" },
          { value: "10+", label: "Ans d'expérience" },
        ]}
        media={<ImageMosaic images={mosaic} />}
      />

      <section id="catalogue" className="py-20 sm:py-24">
        <Container size="8xl">
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredServices.map((service) => (
              <ServiceCardFeatured key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {compactServices.map((service, index) => (
              <div
                key={service.slug}
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceWhy
        stats={GLOBAL_STATS}
        benefits={GLOBAL_BENEFITS}
        eyebrow="Pourquoi nous"
        title={
          <>
            Pourquoi confier vos projets à{" "}
            <span className="text-primary">Winall Tech</span> ?
          </>
        }
        lead="Un partenaire technique unique pour l'ensemble de vos besoins, du diagnostic à la livraison."
        tint
      />

      <ProjectsShowcase
        id="realisations"
        eyebrow="Réalisations"
        title="Projets réalisés et exemples d’intervention."
        description="Les réalisations ci-dessous sont reliées aux services pour faciliter votre navigation entre besoin, expertise et livrables."
        projects={projects}
      />

      <ContactCta />
    </main>
  );
}
