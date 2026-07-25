import {
  ClipboardList,
  Compass,
  FileCheck2,
  PenTool,
  Rocket,
  Search,
  Send,
  Settings,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/features/container";
import { Text } from "@/components/ui/typography";
import type { MarketingService } from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServiceMethodProps {
  service: MarketingService;
}

// Cyclées par étape : les étapes n'embarquent pas d'icône en données.
const STEP_ICONS: LucideIcon[] = [
  Users,
  Compass,
  ClipboardList,
  PenTool,
  Search,
  Settings,
  Wrench,
  FileCheck2,
  Send,
  Rocket,
];

/**
 * §7 — Notre méthode : les étapes de `processSteps` en grille, chacune avec
 * son livrable en pastille. Winall en compte 5 à 6 selon le service.
 */
export function ServiceMethod({ service }: ServiceMethodProps) {
  const steps = service.processSteps;
  const columns =
    steps.length >= 6
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  return (
    <section
      aria-labelledby="methode-heading"
      className="bg-zinc-50 py-20 sm:py-24"
    >
      <Container size="8xl">
        <SectionHeading
          id="methode-heading"
          eyebrow="Notre méthode"
          title={
            <>
              Une méthode claire,{" "}
              <span className="text-primary">un livrable à chaque étape</span>
            </>
          }
          lead="Vous savez à tout moment où en est votre projet et ce que vous recevez."
        />

        <ol className={`mt-12 grid gap-x-5 gap-y-8 ${columns}`}>
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length];

            return (
              <li key={step.step} className="flex flex-col gap-2.5">
                <span className="flex size-11 items-center justify-center rounded-md bg-accent text-accent-foreground ring-1 ring-primary/15">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-destructive">
                  Étape {step.step}
                </span>
                <h3 className="text-base font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
                <Text>{step.objective}</Text>
                <span className="mt-1 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs leading-snug text-accent-foreground">
                  {step.deliverable}
                </span>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
