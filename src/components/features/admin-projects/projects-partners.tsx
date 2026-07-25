import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProjectsPartners() {
  const PARTNERS = [
    { name: "Cisco Systems", role: "Réseaux", projects: 12 },
    { name: "Hikvision", role: "Vidéosurveillance", projects: 8 },
    { name: "Schneider Electric", role: "BTP & Énergie", projects: 5 },
    { name: "Ubiquiti", role: "WiFi & IT", projects: 4 },
    { name: "Dahua", role: "Sécurité", projects: 3 },
  ];

  return (
    <div className="my-8">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Partenaires technologiques</CardTitle>
          <p className="text-sm text-muted-foreground">
            Technologies et fournisseurs utilisés pour la réalisation de nos projets
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 pr-6"
              >
                <div className="flex size-10 items-center justify-center rounded-md bg-background shadow-sm">
                  <span className="text-sm font-bold text-primary">{partner.name[0]}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium leading-none">{partner.name}</h4>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{partner.role}</span>
                    <Badge variant="secondary" className="px-1 py-0 text-[10px]">
                      {partner.projects} projets
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
