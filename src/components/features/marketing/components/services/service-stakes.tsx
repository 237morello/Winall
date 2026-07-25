import { CircleCheck, X } from "lucide-react";
import { Container } from "@/components/features/container";
import { Eyebrow, Heading, Lead } from "@/components/ui/typography";
import type { MarketingService } from "../../marketing.types";

interface ServiceStakesProps {
  service: MarketingService;
}

/**
 * §3 — L'enjeu : fusion des problèmes clients et du tableau avant/après en
 * deux colonnes « Aujourd'hui » / « Avec Winall Tech ». Empilé sur mobile.
 */
export function ServiceStakes({ service }: ServiceStakesProps) {
  const before = service.transformations.map((row) => row.before);
  const after = service.transformations.map((row) => row.after);

  return (
    <section
      aria-labelledby="enjeu-heading"
      className="bg-zinc-50 py-20 sm:py-24"
    >
      <Container size="8xl">
        <div className="max-w-3xl">
          <Eyebrow>L’enjeu</Eyebrow>
          <Heading id="enjeu-heading" level={2} className="mt-3">
            Ce que votre situation actuelle vous coûte réellement
          </Heading>
          <Lead className="mt-5">{service.problemIntro}</Lead>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <header className="flex items-center gap-2 border-b border-border px-6 py-4 text-sm font-medium text-muted-foreground">
              <X className="size-4 text-destructive" aria-hidden="true" />
              Aujourd’hui
            </header>
            <ul>
              {before.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 border-b border-border px-6 py-4 last:border-b-0"
                >
                  <X
                    className="mt-0.5 size-4 shrink-0 text-destructive/60"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-muted-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <header className="flex items-center gap-2 border-b border-border bg-primary/[0.04] px-6 py-4 text-sm font-medium text-primary">
              <CircleCheck className="size-4" aria-hidden="true" />
              Avec Winall Tech
            </header>
            <ul>
              {after.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 border-b border-border bg-primary/[0.02] px-6 py-4 last:border-b-0"
                >
                  <CircleCheck
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium leading-6 text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
