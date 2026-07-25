import { type LucideIcon } from "lucide-react";
import { Container } from "@/components/features/container";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { MarketingService } from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServiceDomainsProps {
  service: MarketingService;
  /** Icônes cyclées par domaine (les cas d'usage n'en portent pas en données). */
  icons: LucideIcon[];
}

/**
 * §5 — Domaines d'application : cartes centrées depuis `useCases`.
 * La deuxième carte est mise en avant, à l'image de la maquette.
 */
export function ServiceDomains({ service, icons }: ServiceDomainsProps) {
  return (
    <section
      aria-labelledby="domaines-heading"
      className="bg-zinc-50 py-20 sm:py-24"
    >
      <Container size="8xl">
        <SectionHeading
          id="domaines-heading"
          eyebrow="Domaines d’application"
          title={
            <>
              Une intervention adaptée à{" "}
              <span className="text-primary">chaque contexte</span>
            </>
          }
          lead="Nos prestations s’ajustent à votre secteur, votre cible et vos contraintes de terrain."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.useCases.map((useCase, index) => {
            const Icon = icons[index % icons.length];
            const featured = index === 1;

            return (
              <Card
                key={useCase.target}
                className={cn(
                  "flex flex-col items-center gap-3.5 p-6 text-center",
                  featured && "border-primary ring-1 ring-primary/15",
                )}
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground ring-1 ring-primary/15">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-medium tracking-tight text-foreground">
                  {useCase.target}
                </h3>
                <Text>{useCase.description}</Text>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
