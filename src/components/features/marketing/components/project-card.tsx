import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import type { MarketingProjectWithService } from "../marketing.types";

interface ProjectCardProps {
  project: MarketingProjectWithService;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-4/3 bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
          unoptimized={project.image.startsWith("http")}
        />
      </div>
      <CardContent className="p-5">
        <Badge variant="outline">{project.serviceTitle}</Badge>
        <h3 className="mt-4 text-lg font-medium tracking-tight text-foreground">
          {project.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {project.location}
        </div>
        <Text className="mt-3">{project.description}</Text>
        <Link
          href={`/services/${project.serviceSlug}`}
          className="mt-4 inline-flex text-sm font-medium text-primary hover:text-primary-hover"
        >
          Voir le service
        </Link>
      </CardContent>
    </Card>
  );
}
