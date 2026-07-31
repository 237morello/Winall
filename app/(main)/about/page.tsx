import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Award, BadgeCheck, CheckCircle2, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/features/container";
import { Eyebrow, Heading, Lead, Text } from "@/components/ui/typography";
import { ContactCta } from "@/components/features/marketing/components/contact-cta";
import { HeroVideo } from "@/components/features/marketing/components/hero-video";
import { FaqAbout } from "@/components/features/marketing/components/abouts/faqAbout";
import {
  ABOUT_LEADERS,
  ABOUT_METHOD,
  ABOUT_METRICS,
  ABOUT_PILLARS,
  ABOUT_TIMELINE,
  ABOUT_VALUES,
} from "@/components/features/about/about.constant";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const ABOUT_TITLE = "À propos";
const ABOUT_OG_TITLE = "À propos de Winall Tech Sarl";
const ABOUT_DESCRIPTION =
  "Découvrez Winall Tech Sarl, son origine Firex Global Engineering, sa vision, ses valeurs et son approche des projets techniques et digitaux à Douala.";

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  keywords: [
    "Winall Tech Sarl",
    "à propos Winall",
    "entreprise technique Douala",
    "Firex Global Engineering",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: ABOUT_OG_TITLE,
    description: ABOUT_DESCRIPTION,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/images/here about.jpeg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_OG_TITLE,
    description: ABOUT_DESCRIPTION,
    images: ["/images/here about.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroVideo />

      <section id="presentation" className="py-20 sm:py-24">
        <Container size="8xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="max-w-2xl lg:pl-2">
              <Eyebrow>Qui sommes-nous</Eyebrow>
              <Heading level={1} className="mt-4">
                Winall Tech, partenaire technique et digital.
              </Heading>
              <Lead className="mt-6">
                Societe camerounaise basee a Douala, Winall Tech accompagne les organisations
                dans la securisation, la maintenance et la modernisation de leurs environnements
                techniques. Nous combinons intervention terrain, reseaux, supports visuels et
                solutions digitales pour rendre les operations plus fiables et plus lisibles.
              </Lead>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {[
                  "Expertise terrain",
                  "Solutions digitales utiles",
                  "Accompagnement durable",
                ].map((proof) => (
                  <div
                    key={proof}
                    className="flex min-w-0 items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#204222]/10 text-[#204222]">
                      <CheckCircle2 className="size-5" aria-hidden="true" />
                    </span>
                    <p className="font-semibold text-zinc-900">{proof}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm sm:aspect-square">
              <Image
                src="/images/about-available.jpg"
                alt="Visuel Winall Tech indiquant la disponibilite des services"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ABOUT_PILLARS.map((pillar) => (
              <Card key={pillar.title} className="rounded-lg border-zinc-200 bg-zinc-50/70">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    width={128}
                    height={96}
                    className="h-24 w-auto object-contain"
                  />
                  <Heading level={3} className="mt-5 text-xl">
                    {pillar.title}
                  </Heading>
                  <Text className="mt-3 text-base">{pillar.description}</Text>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_METRICS.map((metric, index) => (
              <Card
                key={metric.label}
                className="rounded-lg border-zinc-200 bg-white p-6 shadow-sm"
              >
                <p
                  className={
                    index % 2 === 0
                      ? "text-4xl font-semibold text-[#204222]"
                      : "text-4xl font-semibold text-[#DF0A17]"
                  }
                >
                  {metric.value}
                </p>
                <Text className="mt-2 font-medium uppercase tracking-wide text-zinc-500">
                  {metric.label}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="directeur" className="bg-zinc-950 py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex size-14 items-center justify-center rounded-lg bg-[#DF0A17]">
                <Quote className="size-7" aria-hidden="true" />
              </div>
              <blockquote className="mt-8 text-2xl font-medium leading-10 sm:text-3xl">
                Notre ambition n&apos;est pas seulement d&apos;installer des solutions. Elle est de
                construire la confiance technique qui permet aux entreprises d&apos;avancer.
              </blockquote>
              <div className="mt-8 border-l-2 border-[#DF0A17] pl-5">
                <p className="font-semibold">Direction Generale</p>
                <p className="mt-1 text-sm text-zinc-300">Winall Tech Sarl</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] min-h-72 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] sm:aspect-[16/10] lg:aspect-auto lg:h-full">
              <Image
                src="/images/projets/IMG_4212.jpg"
                alt="Direction Generale de Winall Tech Sarl"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="histoire" className="bg-zinc-50 py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Naissance et evolution</Eyebrow>
            <Heading level={2} className="mt-3">
              De Firex Global Engineering a Winall Tech.
            </Heading>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {ABOUT_TIMELINE.map((item, index) => (
              <Card key={item.title} className="relative rounded-lg border-zinc-200 bg-white p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#204222] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#DF0A17]">
                  {item.period}
                </p>
                <Heading level={3} className="mt-2 text-xl">
                  {item.title}
                </Heading>
                <Text className="mt-3 text-base">{item.description}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="valeurs" className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <Eyebrow>Valeurs et mission</Eyebrow>
              <Heading level={2} className="mt-3">
                Des principes simples pour des projets solides.
              </Heading>
              <Lead className="mt-5">
                Notre mission est d&apos;aider les clients a securiser, maintenir et moderniser
                leurs environnements techniques avec des solutions adaptees, documentees et
                exploitables.
              </Lead>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {ABOUT_VALUES.map((value) => {
                const Icon = value.icon;

                return (
                  <Card key={value.title} className="rounded-lg border-zinc-200 bg-white">
                    <CardContent className="p-6">
                      <Icon className="size-7 text-[#204222]" aria-hidden="true" />
                      <Heading level={3} className="mt-4 text-xl">
                        {value.title}
                      </Heading>
                      <Text className="mt-3 text-base">{value.description}</Text>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="methode" className="bg-zinc-950 py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Eyebrow className="text-[#DF0A17]">Methode de travail</Eyebrow>
              <Heading level={2} className="mt-3 text-white">
                Une execution terrain renforcee par des outils de suivi digitaux.
              </Heading>
              <Lead className="mt-5 text-zinc-300">
                Nous connectons les etapes du projet, les documents, les indicateurs et les
                decisions pour que le client garde une vision claire de l&apos;avancement et de la
                maintenance future.
              </Lead>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {ABOUT_METHOD.map((step, index) => (
                  <div key={step.title} className="rounded-lg border border-white/10 p-5">
                    <p className="text-sm font-semibold text-[#DF0A17]">Etape {index + 1}</p>
                    <p className="mt-2 text-lg font-medium">{step.title}</p>
                    <Text className="mt-2 text-zinc-300">{step.description}</Text>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <Image
                src="/images/maquette methode de travail.png"
                alt="Interface de suivi digital Winall Tech"
                width={960}
                height={640}
                className="h-auto w-full rounded-md object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="leaders" className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <Eyebrow>Nos leaders</Eyebrow>
              <Heading level={2} className="mt-3">
                Une equipe pilotee par la vision, l&apos;execution et la qualite technique.
              </Heading>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#204222]">
              Organigramme evolutif
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch">
            {ABOUT_LEADERS.map((leader, index) => {
              const featured = index === 0;

              return (
                <Card
                  key={leader.role}
                  className={
                    featured
                      ? "relative rounded-lg border-zinc-200 bg-white ring-2 ring-[#204222]"
                      : "rounded-lg border-zinc-200 bg-zinc-50/70"
                  }
                >
                  {featured && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#204222] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      <Award className="size-3.5" aria-hidden="true" />
                      Responsable principal
                    </span>
                  )}
                  <CardContent className="flex h-full flex-col items-center p-6 text-center">
                    {leader.image ? (
                      <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-[#204222]/20">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          sizes="80px"
                          className="object-cover object-[center_25%]"
                        />
                      </div>
                    ) : (
                      <div className="flex size-20 items-center justify-center rounded-full bg-[#204222] text-xl font-semibold text-white">
                        {leader.initials}
                      </div>
                    )}

                    <Heading level={3} className="mt-4 text-lg">
                      {leader.name}
                    </Heading>
                    <span className="mt-2 inline-flex items-center rounded-full bg-[#DF0A17]/10 px-3 py-1 text-xs font-semibold text-[#DF0A17]">
                      {leader.role}
                    </span>

                    <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
                      <BadgeCheck
                        className="size-4 shrink-0 text-[#204222]"
                        aria-hidden="true"
                      />
                      {leader.specialty}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="faq" className="bg-zinc-50 py-20 sm:py-24">
        <Container>
          <FaqAbout />
        </Container>
      </section>

      <ContactCta />
    </main>
  );
}
