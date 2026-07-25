import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/features/container";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MarketingService } from "../../marketing.types";
import { SectionHeading } from "./section-heading";

interface ServicePackagesProps {
  service: MarketingService;
}

/**
 * §9 — Nos formules : trois formules dérivées des sous-services, sans prix
 * (chaque mission est chiffrée sur devis). La 2e est mise en avant.
 */
export function ServicePackages({ service }: ServicePackagesProps) {
  const packages = service.solutions.slice(0, 3);

  if (packages.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="formules-heading"
      className="bg-zinc-50 py-20 sm:py-24"
    >
      <Container size="8xl">
        <SectionHeading
          id="formules-heading"
          eyebrow="Nos formules"
          title={
            <>
              Un cadrage clair,{" "}
              <span className="text-primary">un devis transparent</span>
            </>
          }
          lead="Chaque mission est chiffrée selon son périmètre réel. Pas de forfait qui ne correspond à rien."
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => {
            const featured = index === 1;

            return (
              <Card
                key={pkg.name}
                className={cn(
                  "relative flex h-full flex-col",
                  featured && "ring-2 ring-primary",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Le plus demandé
                  </span>
                )}
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    {pkg.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-tight text-primary">
                      Sur devis
                    </span>
                    <span className="text-xs text-muted-foreground">
                      selon le périmètre
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                    {pkg.items.map((item) => (
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

                  <Link
                    href="#contact"
                    className={buttonVariants({
                      variant: featured ? "default" : "outline",
                      className: "mt-6 w-full",
                    })}
                  >
                    Demander un devis
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
