import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { MarketingService } from "../marketing.types";

interface ServiceCardProps {
  service: MarketingService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      {/* Bandeau image + badge icône */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={service.image.startsWith("http")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
        <span className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-md bg-background/90 text-primary shadow-sm backdrop-blur">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>

      {/* Corps */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {service.title}
        </h3>
        <Text className="mt-2 line-clamp-2">{service.tagline}</Text>

        {service.highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {service.highlights.slice(0, 2).map((highlight) => (
              <Badge key={highlight} variant="outline" className="text-[11px]">
                {highlight}
              </Badge>
            ))}
          </div>
        )}

        <Link
          href={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          Voir les projets
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Card>
  );
}
