import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Info, Rocket, Star, Target, Gem, Plus, Zap } from "lucide-react";
import { Container } from "@/components/features/container";
import { Eyebrow, Heading, Lead, Text } from "@/components/ui/typography";
import {
  MARKETING_CONTACT,
  MARKETING_PROCESS,
  MARKETING_SERVICES,
  getFeaturedProjects,
} from "@/components/features/marketing/marketing.constants";
import { getPublishedProjectsByZone } from "@/lib/public-projects";
import { ContactCta } from "@/components/features/marketing/components/contact-cta";
import { HeroVideo } from "@/components/features/marketing/components/hero-video";
import { ProjectsShowcase } from "@/components/features/marketing/components/projects-showcase";
import { ServiceCard } from "@/components/features/marketing/components/service-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const HOME_TITLE =
  "Winall Tech Sarl | Électronique, génie civil, BTP, maintenance, réseaux à Douala";
const HOME_DESCRIPTION =
  "Winall Tech Sarl à Douala : électronique, génie civil, BTP, maintenance, sécurité incendie et réseaux. Plus de 200 projets réalisés, devis gratuit sous 48h.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  keywords: [
    "Winall",
    "Winall Tech",
    "Winall Tech Sarl Douala",
    "entreprise technique Douala",
    "électronique génie civil BTP Cameroun",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/images/63966.jpg",
        width: 667,
        height: 652,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/63966.jpg"],
  },
};

// TODO: compléter avec les coordonnées GPS précises (geo.latitude / geo.longitude),
// les horaires d'ouverture (openingHoursSpecification) et les liens réseaux sociaux (sameAs)
// dès qu'ils seront communiqués.
const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  description: HOME_DESCRIPTION,
  url: SITE_URL,
  telephone: MARKETING_CONTACT.phone,
  email: MARKETING_CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: MARKETING_CONTACT.address,
    addressLocality: "Douala",
    addressCountry: "CM",
  },
  areaServed: {
    "@type": "City",
    name: "Douala",
  },
};

const WORK_METHOD_STEPS = [
  {
    title: "Appel découverte",
    description:
      "30 minutes gratuites pour comprendre vos enjeux business et valider la faisabilité technique.",
    icon: Zap,
  },
  {
    title: "Proposition & Budget",
    description:
      "Sous 48h : étude de site, architecture proposée et tarif transparent sans surprise.",
    icon: Info,
  },
  {
    title: "Exécution des Travaux",
    description:
      "Réalisation par des équipes qualifiées avec points de contrôle à chaque phase.",
    icon: Rocket,
  },
  {
    title: "Suivi & Communication",
    description:
      "Suivi régulier et échanges constants pour garantir l'avancement et la qualité.",
    icon: Target,
  },
  {
    title: "Vérification & Livraison",
    description:
      "Contrôle final avant mise en service pour une remise en main sereine.",
    icon: BadgeCheck,
  },
];

export default async function Home() {
  const placedProjects = await getPublishedProjectsByZone("PROJETS_GLOBAL", 6);
  // Fallback vers les projets statiques tant qu'aucun projet n'est placé.
  const featuredProjects =
    placedProjects.length > 0 ? placedProjects : getFeaturedProjects(6);

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
      />
      <HeroVideo />

      <section id="Apercu" className="space-y-3 py-20 sm:py-24">
        <Container size="8xl">
          <div className="space-y-3">
              <Eyebrow>Qui sommes-nous</Eyebrow>
              <div className="flex items-center gap-3 mt-3">
                <Heading level={1}>Winall Tech</Heading>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="size-7 text-destructive shrink-0 cursor-help" aria-hidden="true" />
                    </TooltipTrigger>
                    <TooltipContent className="w-72 bg-destructive p-4 text-background shadow-lg border-none" side="bottom" align="start" sideOffset={8}>
                      <Text className="text-sm font-semibold text-zinc-100">Winall Tech SARL</Text>
                      <Text className="text-xs text-zinc-100/90 mt-1">Société camerounaise spécialisée en transformation numérique, technologies de l&apos;information et solutions intégrées pour l&apos;Afrique.</Text>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Heading level={2} className="mt-2">
                Acteur stratégique de la transformation digitale africaine
              </Heading>
              <Lead className="mt-5">Société camerounaise spécialisée dans les technologies de l&apos;information et de la communication,
                 fondée avec la vision de contribuer activement
                 à la transformation digitale en Afrique.
              </Lead>
              <Container className=" mt-5">
                <Eyebrow className="mb-6">Notre positionnement</Eyebrow>
                <Card className="grid gap-6 p-4 sm:p-8 md:py-12 bg-zinc-50/85 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <Image src="/images/Group 24.png"
                      alt="Expertise Locale"
                      width={120}
                      height={80}
                      className="sm:w-40 sm:h-24"
                    />
                    <Heading level={3} className="text-lg sm:text-xl">Expertise Locale</Heading>
                    <Text className="text-center text-sm sm:text-base">
                      Connaissance approfondie des marchés africains et des défis spécifiques
                    </Text>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <Image src="/images/Group 25.png"
                      alt="Standards Internationaux"
                      width={100}
                      height={80}
                      className="sm:w-25 "
                    />
                    <Heading level={3} className="text-lg sm:text-xl">Standards Internationaux</Heading>
                    <Text className="text-center text-sm sm:text-base">
                      Méthodologies et technologies conformes aux meilleures pratiques mondiales
                    </Text>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <Image src="/images/Group 26.png"
                      alt="Sécurité clients"
                      width={120}
                      height={80}
                      className="sm:w-25 "
                    />
                    <Heading level={3} className="text-lg sm:text-xl">Sécurité clients</Heading>
                    <Text className="text-center text-sm sm:text-base">
                      Méthodologies et technologies conformes aux meilleures pratiques mondiales
                    </Text>
                  </div>
                </Card>
              </Container>

              <Container className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

  {/* Projets réalisés */}
  <div className="group relative isolate overflow-hidden rounded-lg border border-[#e4e4e7] bg-white p-8 text-center transition-all duration-300 hover:border-[#204222]/40 hover:shadow-lg">
    <div className="pointer-events-none absolute inset-x-0 -top-full h-full bg-gradient-to-b from-transparent via-[#204222]/[0.06] to-transparent transition-all duration-700 ease-out group-hover:top-full" />
    <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#204222] transition-transform duration-500 ease-out group-hover:scale-x-100" />

    <div className="relative flex flex-col items-center justify-center">
      <div className="relative mb-4 size-10">
        <span className="absolute left-1/2 top-[85%] h-3 w-1.5 -translate-x-1/2 rounded-full bg-[#DF0A17] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-60 group-hover:[animation:engine-glow_0.6s_ease-in-out_infinite]" />
        <Rocket
          className="relative size-10 text-[#204222] transition-transform duration-300 group-hover:[animation:rocket-idle_0.5s_ease-in-out_infinite]"
          aria-hidden="true"
        />
      </div>
      <Heading level={3} className="flex items-center gap-1 text-4xl font-bold text-[#204222]">
        <Plus className="size-8 text-zinc-500 transition-colors duration-300 group-hover:text-[#DF0A17]" />
        200
      </Heading>
      <Text className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500 transition-colors duration-300 group-hover:text-[#204222]">
        Projets réalisés
      </Text>
    </div>
  </div>

  {/* Années d'expérience */}
  <div className="group relative isolate overflow-hidden rounded-lg border border-[#e4e4e7] bg-white p-8 text-center transition-all duration-300 hover:border-[#DF0A17]/40 hover:shadow-lg">
    <div className="pointer-events-none absolute inset-x-0 -top-full h-full bg-gradient-to-b from-transparent via-[#DF0A17]/[0.06] to-transparent transition-all duration-700 ease-out group-hover:top-full" />
    <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#DF0A17] transition-transform duration-500 ease-out group-hover:scale-x-100" />

    <div className="relative flex flex-col items-center justify-center">
      <Star
        className="mb-4 size-10 text-[#DF0A17] transition-transform duration-300 group-hover:[animation:star-twinkle_0.7s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <Heading level={3} className="text-4xl font-bold text-[#DF0A17]">10+</Heading>
      <Text className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500 transition-colors duration-300 group-hover:text-[#DF0A17]">
        Années d&apos;expérience
      </Text>
    </div>
  </div>

  {/* Pôles d'expertise */}
  <div className="group relative isolate overflow-hidden rounded-lg border border-[#e4e4e7] bg-white p-8 text-center transition-all duration-300 hover:border-[#204222]/40 hover:shadow-lg">
    <div className="pointer-events-none absolute inset-x-0 -top-full h-full bg-gradient-to-b from-transparent via-[#204222]/[0.06] to-transparent transition-all duration-700 ease-out group-hover:top-full" />
    <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#204222] transition-transform duration-500 ease-out group-hover:scale-x-100" />

    <div className="relative flex flex-col items-center justify-center">
      <div className="relative mb-4 flex size-10 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-[#204222] opacity-0 group-hover:opacity-100 group-hover:[animation:target-ping_1s_ease-out_infinite]" />
        <Target className="relative size-10 text-[#204222]" aria-hidden="true" />
      </div>
      <Heading level={3} className="text-4xl font-bold text-[#204222]">5</Heading>
      <Text className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500 transition-colors duration-300 group-hover:text-[#204222]">
        Pôles d&apos;expertise
      </Text>
    </div>
  </div>

  {/* Satisfaction client */}
  <div className="group relative isolate overflow-hidden rounded-lg border border-[#e4e4e7] bg-white p-8 text-center transition-all duration-300 hover:border-[#DF0A17]/40 hover:shadow-lg">
    <div className="pointer-events-none absolute inset-x-0 -top-full h-full bg-gradient-to-b from-transparent via-[#DF0A17]/[0.06] to-transparent transition-all duration-700 ease-out group-hover:top-full" />
    <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#DF0A17] transition-transform duration-500 ease-out group-hover:scale-x-100" />

    <div className="relative flex flex-col items-center justify-center">
      <div className="relative mb-4 size-10 overflow-hidden">
        <Gem className="size-10 text-[#DF0A17]" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 -translate-x-full -translate-y-full bg-gradient-to-br from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:gem-shine_0.8s_ease-out]" />
      </div>
      <Heading level={3} className="text-4xl font-bold text-[#DF0A17]">100%</Heading>
      <Text className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500 transition-colors duration-300 group-hover:text-[#DF0A17]">
        Satisfaction client
      </Text>
    </div>
  </div>

</div>
              </Container>
          </div>
        </Container>
        
      </section>

      <section
  id="services"
  aria-labelledby="services-heading"
  className="bg-muted py-20 sm:py-24"
>
  <Container size="8xl">
    <div className="max-w-3xl">
      <Eyebrow>Services</Eyebrow>
      <Heading id="services-heading" level={2} className="mt-3">
        Une offre structurée autour des projets réalisés par domaine.
      </Heading>
      <Lead className="mt-5">
        Chaque service présente ses livrables, ses points de contrôle et
        les réalisations associées pour mieux cadrer votre besoin.
      </Lead>
    </div>

    {MARKETING_SERVICES.length > 0 ? (
      <ul className="mt-12 grid list-none gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MARKETING_SERVICES.map((service, index) => (
          <li
            key={service.slug}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
          >
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    ) : (
      <div className="mt-12 rounded-lg border border-dashed border-[#e4e4e7] p-12 text-center">
        <Text className="text-[#a1a1aa]">
          Les services seront bientôt disponibles.
        </Text>
      </div>
    )}
  </Container>
</section>

      {/* CTA Intermédiaire */}
      <section className="bg-background py-16 text-center">
        <Container size="7xl" className="flex flex-col items-center gap-4">
          <Heading level={3} className="text-2xl sm:text-3xl">Prêt à démarrer votre projet ?</Heading>
          <Text className="text-zinc-500 max-w-2xl mx-auto">
            Nos experts sont à votre disposition pour évaluer vos besoins et vous proposer une solution sur mesure.
          </Text>
          <Button asChild size="lg" className="mt-4 bg-[#DF0A17] hover:bg-[#DF0A17]/90 text-white font-semibold">
            <a href="#contact">Demander un devis gratuit</a>
          </Button>
        </Container>
      </section>

      <section id="methode" className="bg-zinc-100 py-20 sm:py-24 border-t border-border/40">
        <Container
          className="grid gap-0 lg:grid-cols-[1fr_0.95fr] lg:items-start"
          size="8xl"
        >
          <div className="space-y-2  md:border-r-4  lg:border-zinc-200 md:pr-7 lg:pr-10">
            <Eyebrow className="text-[#DF0A17]">Methode de travail</Eyebrow>
            <Heading level={3} className="max-w-2xl">
              Du brief au lancement, un process rôdé qui élimine les imprévus.
            </Heading>
            <Lead className="max-w-2xl text-zinc-600">
              Transparence totale, jalons clairs et livraison progressive avec un suivi constant.
            </Lead>

           
              <Image
                src="/images/methodeTAFimage.png"
                alt="Methode de travail"
                width={383}
                height={383}
                className="h-auto w-full object-cover"
              />
            

            <div className="space-y-1">
              <Lead className="text-base font-semibold">Un projet en cours ou à venir ?</Lead>
              <Button asChild size="lg" className="mt-2 bg-[#DF0A17] hover:bg-[#DF0A17]/90 text-white font-semibold">
                <a href="#contact">Demander un devis</a>
              </Button>
            </div>
          </div>

          <div className="divide-y divide-zinc-200">
            {WORK_METHOD_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="py-3 md:ml-10">
                  <div className="flex items-start gap-4">

                    {/* Numéro cercle */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl text-[#DF0A17] font-semibold">
                      {index + 1}
                    </div>

                    <div className="w-full max-w-[450px]">

                      {/* ← justify-between + largeur fixe = icônes alignées en colonne */}
                      <div className="flex items-center justify-between">
                        <Heading level={3} className="max-w-[250px]">
                          {step.title}
                        </Heading>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-zinc-50">
                          <Icon className="size-5 text-[#DF0A17]" aria-hidden="true" />
                        </div>
                      </div>

                      <Text className="mt-3 max-w-[370px] text-sm leading-6 text-zinc-500">
                        {step.description}
                      </Text>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ProjectsShowcase
        id="realisations"
        eyebrow="Réalisations"
        title="Des projets visibles, classés par service."
        description="Consultez les réalisations liées à chaque expertise pour identifier le service le plus adapté à votre chantier."
        projects={featuredProjects}
      />

      <ContactCta />
    </main>
  );
}
