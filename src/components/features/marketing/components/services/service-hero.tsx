import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import type { MarketingService } from "../../marketing.types";
import { splitAccentTitle } from "./section-heading";

interface ServiceHeroProps {
  service: MarketingService;
}

/**
 * §1 — Hero éditorial clair. Titre bicolore (fin de phrase en primaire),
 * promesse (ogTitle), sous-titre (heroSubtitle), chips et visuel latéral.
 */
export function ServiceHero({ service }: ServiceHeroProps) {
  const [titleHead, titleTail] = splitAccentTitle(service.heroTitle);

  return (
    <section
      id="service"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border bg-white"
    >
      <Container
        size="8xl"
        className="relative  grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.6] [background-image:linear-gradient(rgba(223, 10, 10, 0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(233, 114, 114, 0.05)_1px,transparent_1px)] [background-size:2.75rem_2.75rem] [mask-image:radial-gradient(ellipse_at_20%_15%,#000_8%,transparent_70%)]"
        />
        <div>
          <Eyebrow>{service.shortTitle}</Eyebrow>

          <Heading id="hero-heading" level={1} className="mt-2">
            {titleTail ? (
              <>
                {titleHead} <span className="text-primary">{titleTail}</span>
              </>
            ) : (
              service.heroTitle
            )}
          </Heading>

          <p className="mt-6 max-w-xl text-lg font-semibold leading-snug text-foreground sm:text-xl">
            {service.ogTitle}
          </p>

          <Lead className="mt-4 max-w-xl">{service.heroSubtitle}</Lead>

          {service.highlights.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.highlights.slice(0, 4).map((highlight) => (
                <li
                  key={highlight}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                >
                  <CircleCheck
                    className="size-3.5 text-primary"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contact"
              className={buttonVariants({ size: "lg", className: "w-fit" })}
            >
              Démarrer ce projet
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="#realisations"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-fit",
              })}
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -bottom-4 -right-4 -z-10 hidden size-full rounded-3xl bg-accent lg:block"
            aria-hidden="true"
          />
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
              unoptimized={service.image.startsWith("http")}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
