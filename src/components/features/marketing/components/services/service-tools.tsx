import { Container } from "@/components/features/container";
import type { MarketingService } from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServiceToolsProps {
  service: MarketingService;
}

/**
 * §8 — Outils & équipements : `tools` en pastilles centrées. Section masquée
 * si le service ne déclare aucun outil.
 */
export function ServiceTools({ service }: ServiceToolsProps) {
  if (service.tools.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="outils-heading" className="py-20 sm:py-24">
      <Container size="8xl">
        <SectionHeading
          id="outils-heading"
          eyebrow="Nos moyens"
          title={
            <>
              Les <span className="text-primary">outils</span> que nous mettons en
              œuvre
            </>
          }
          lead="Des moyens standards du métier, pour des livrables fiables et repris sans dépendance."
        />

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {service.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-lg border border-border bg-background px-5 py-3 text-sm text-foreground transition-colors hover:border-primary/40"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
