import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Boxes,
  Building2,
  ClipboardCheck,
  Factory,
  Globe,
  Landmark,
  Layers,
  Settings,
  ShieldCheck,
  Store,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Heading, Lead, Text } from "@/components/ui/typography";
import {
  MARKETING_SERVICES,
  getServiceBySlug,
} from "@/components/features/marketing/marketing.constants";
import { getPublishedProjectsBySubService } from "@/lib/public-projects";
import { buildSubServiceSlug } from "@/lib/sub-service";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { ContactCta } from "@/components/features/marketing/components/contact-cta";
import { ProjectsShowcase } from "@/components/features/marketing/components/projects-showcase";
import {
  ServiceApproach,
  ServiceDomains,
  ServiceFaq,
  ServiceHero,
  ServiceMethod,
  ServicePackages,
  ServiceSolutions,
  ServiceStakes,
  ServiceTools,
  ServiceWhy,
} from "@/components/features/marketing/components/services";

interface ServicePageParams {
  serviceSlug: string;
}

interface ServicePageProps {
  params: Promise<ServicePageParams>;
}

// Jeux d'icônes cyclés : les sous-services et cas d'usage n'en portent pas.
const SOLUTION_ICONS: LucideIcon[] = [
  ClipboardCheck,
  Settings,
  Layers,
  ShieldCheck,
  Wrench,
  Boxes,
];
const DOMAIN_ICONS: LucideIcon[] = [
  Building2,
  Factory,
  Store,
  Landmark,
  Users,
  Globe,
];

export function generateStaticParams(): ServicePageParams[] {
  return MARKETING_SERVICES.map((service) => ({
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: { absolute: `Service introuvable | ${SITE_NAME}` },
    };
  }

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: service.ogTitle,
      description: service.ogDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.ogTitle,
      description: service.ogDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  // Projets placés dynamiquement sous l'un des sous-services de ce service.
  const subSlugs = service.solutions.map((solution) =>
    buildSubServiceSlug(service.slug, solution.name),
  );
  const dynamicLists = await Promise.all(
    subSlugs.map((slug) => getPublishedProjectsBySubService(slug)),
  );
  const dynamicSeen = new Set<string>();
  const dynamicProjects = dynamicLists.flat().filter((project) => {
    const key = `${project.serviceSlug}-${project.title}`;
    if (dynamicSeen.has(key)) return false;
    dynamicSeen.add(key);
    return true;
  });

  // Fallback vers les projets statiques du service si aucun placement dynamique.
  const serviceProjects =
    dynamicProjects.length > 0
      ? dynamicProjects
      : service.projects.map((project) => ({
          ...project,
          serviceTitle: service.title,
          serviceSlug: service.slug,
        }));

  const relatedServices = MARKETING_SERVICES.filter(
    (candidate) => candidate.slug !== service.slug,
  ).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <ServiceHero service={service} />
      <ServiceApproach service={service} />
      <ServiceStakes service={service} />
      <ServiceSolutions service={service} icons={SOLUTION_ICONS} />
      <ServiceDomains service={service} icons={DOMAIN_ICONS} />
      <ServiceWhy stats={service.keyStats} benefits={service.businessBenefits} />
      <ServiceMethod service={service} />
      <ServiceTools service={service} />
      <ServicePackages service={service} />

      <ProjectsShowcase
        id="realisations"
        eyebrow="Projets liés"
        title={`Réalisations associées au service ${service.title}.`}
        description="Ces projets illustrent notre façon de cadrer, exécuter et livrer ce type d'intervention sur le terrain."
        projects={serviceProjects}
      />

      <ServiceFaq service={service} />

      {/* CTA final */}
      <section
        id="cta-final"
        aria-labelledby="cta-heading"
        className="border-y border-border bg-primary/[0.03] py-20 sm:py-24"
      >
        <Container className="text-center" size="8xl">
          <Eyebrow className="mx-auto">Passez à l&apos;action</Eyebrow>
          <Heading id="cta-heading" level={2} className="mx-auto mt-3 max-w-3xl">
            {service.ctaTitle}
          </Heading>
          <Lead className="mx-auto mt-5 max-w-2xl">{service.ctaSubtitle}</Lead>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="#contact" className={buttonVariants({ size: "lg" })}>
              Démarrer ce projet
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Voir tous nos services
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {service.ctaReassurance}
          </p>
        </Container>
      </section>

      {/* Services liés */}
      <section
        id="explorer"
        aria-labelledby="explorer-heading"
        className="bg-zinc-50 py-20 sm:py-24"
      >
        <Container size="8xl">
          <Eyebrow>Explorer</Eyebrow>
          <Heading id="explorer-heading" level={2} className="mt-3 max-w-3xl">
            Autres services Winall Tech Sarl.
          </Heading>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedServices.map((relatedService) => {
              const RelatedIcon = relatedService.icon;

              return (
                <Link
                  key={relatedService.slug}
                  href={`/services/${relatedService.slug}`}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
                >
                  <span className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <RelatedIcon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                    {relatedService.title}
                  </h3>
                  <Text className="mt-3">{relatedService.tagline}</Text>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <ContactCta />
    </main>
  );
}
