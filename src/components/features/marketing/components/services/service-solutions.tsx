import { Check, type LucideIcon } from "lucide-react";
import { Container } from "@/components/features/container";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { MarketingService } from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServiceSolutionsProps {
  service: MarketingService;
  /** Icônes cyclées par carte (les sous-services n'en portent pas en données). */
  icons: LucideIcon[];
}

/**
 * §4 — Nos prestations : cartes à liste ✓, section la plus caractéristique
 * de la maquette de référence. Une carte par sous-service (`solutions`).
 */
export function ServiceSolutions({ service, icons }: ServiceSolutionsProps) {
  return (
    <section
      aria-labelledby="prestations-heading"
      className="py-20 sm:py-24"
    >
      <Container size="8xl">
        <SectionHeading
          id="prestations-heading"
          eyebrow="Nos prestations"
          title={
            <>
              Nos <span className="text-primary">services</span> {service.shortTitle.toLowerCase()}
            </>
          }
          lead="Une gamme complète de prestations pour couvrir votre besoin de bout en bout."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {service.solutions.map((solution, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Card key={solution.name} className="flex h-full flex-col">
                <CardContent className="flex h-full flex-col p-6">
                  <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground ring-1 ring-primary/15">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground">
                    {solution.name}
                  </h3>
                  <Text className="mt-2">{solution.description}</Text>
                  <p className="mt-3 text-sm font-medium text-destructive">
                    {solution.benefits}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                    {solution.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-6 text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
