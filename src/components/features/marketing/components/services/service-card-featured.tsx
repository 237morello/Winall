import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { MarketingService } from "../../marketing.types";

interface ServiceCardFeaturedProps {
  service: MarketingService;
}

/**
 * Carte large pour les pôles phares en tête de la grille /services :
 * visuel, tagline et livrables visibles. Voir aussi ServiceCard (compacte).
 */
export function ServiceCardFeatured({ service }: ServiceCardFeaturedProps) {
  const Icon = service.icon;

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:flex-row">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted sm:aspect-auto sm:w-2/5">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={service.image.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
          <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-md bg-background/90 text-primary shadow-sm backdrop-blur">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-medium tracking-tight text-foreground">
            {service.title}
          </h3>
          <Text className="mt-2">{service.tagline}</Text>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {service.deliverables.slice(0, 4).map((deliverable) => (
              <li key={deliverable} className="flex items-start gap-1.5">
                <Check
                  className="mt-0.5 size-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm leading-5 text-muted-foreground">
                  {deliverable}
                </span>
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary transition-colors group-hover:text-primary-hover">
            Voir le service
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}
