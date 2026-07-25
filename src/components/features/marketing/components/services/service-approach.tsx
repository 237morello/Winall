import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import { Container } from "@/components/features/container";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import { MARKETING_CONTACT } from "../../marketing.constants";
import type { MarketingService } from "../../marketing.types";

interface ServiceApproachProps {
  service: MarketingService;
}

/**
 * §2 — Notre approche : argumentaire + CTA + bande de chiffres clés à gauche,
 * carte « approche » appariant highlights (titre) et deliverables (sous-titre).
 */
export function ServiceApproach({ service }: ServiceApproachProps) {
  const Icon = service.icon;
  const approachRows = service.highlights.slice(0, 3).map((title, index) => ({
    title,
    detail: service.deliverables[index] ?? service.deliverables.at(-1) ?? "",
  }));

  return (
    <section
      id="livrables"
      aria-labelledby="approche-heading"
      className="py-20 sm:py-24"
    >
      <Container
        size="8xl"
        className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.85fr] lg:gap-16"
      >
        <div>
          <Eyebrow>Notre réponse</Eyebrow>
          <Heading id="approche-heading" level={2} className="mt-3">
            {service.solutionTitle}
          </Heading>
          <Lead className="mt-5">{service.solutionDescription}</Lead>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className={buttonVariants({ className: "w-fit" })}>
              Démarrer ce projet
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={MARKETING_CONTACT.phoneHref}
              className={buttonVariants({
                variant: "outline",
                className: "w-fit",
              })}
            >
              <Phone className="size-4" aria-hidden="true" />
              {MARKETING_CONTACT.phone}
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {service.keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-background p-4 text-center"
              >
                <dd className="text-2xl font-semibold tabular-nums tracking-tight text-primary">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs leading-tight text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <aside className="rounded-3xl border border-primary/20 bg-gradient-to-br from-accent to-background p-6 sm:p-8">
          <div className="flex items-center gap-3.5">
            <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground ring-1 ring-primary/15">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-foreground">Notre approche</p>
              <p className="text-sm text-muted-foreground">
                Le résultat d’abord, la méthode ensuite
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-4">
            {approachRows.map((row) => (
              <li key={row.title} className="flex gap-3">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {row.title}
                  </p>
                  {row.detail && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {row.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-primary/15 pt-5">
            <Link
              href="#realisations"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Voir nos réalisations
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </Container>
    </section>
  );
}
