import { Check, ShieldCheck } from "lucide-react";
import { ServiceDetailPanelProps } from "./service-detail-panel.types";
import { Text, Heading } from "@/components/ui/typography";

export function ServiceDetailPanel({ service }: ServiceDetailPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <Heading level={3} className="text-2xl font-bold text-primary">
        {service.title}
      </Heading>
      <Text className="mt-2">{service.description}</Text>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Livrables
          </Text>
          <ul className="mt-3 space-y-2">
            {service.deliverables.map((item: string, idx: number) => (
              <li
                key={`${item}-${idx}`}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Points de contrôle
          </Text>
          <ul className="mt-3 space-y-2">
            {service.highlights.map((item: string, idx: number) => (
              <li
                key={`${item}-${idx}`}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-destructive"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {service.projects.length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
          <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Réalisations associées
          </Text>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.projects.map((project) => (
              <span
                key={project.title}
                className="rounded-md bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
              >
                {project.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
