"use client";

/**
 * @file Services.tsx
 * @description Section "Nos Services" avec grille de cartes interactives.
 */

import { FancyCard } from "@/components/features/card-hover-light";
import { CoverflowMobile } from "@/components/features/coverflow-mobile";
import { Typography } from "@/components/ui/typography";
import { LISTE_SERVICES } from "./Services.constants";
import { ServicesProps, ServiceWinall, DetailService } from "./Services.types";

/**
 * @class ServicesLogique
 * @description Gère la transformation des données pour l'affichage des services.
 */
class ServicesLogique {
  /** Récupère les services à afficher */
  static obtenirServices(props?: ServiceWinall[]): ServiceWinall[] {
    return props || LISTE_SERVICES;
  }
}

/**
 * @component DetailServiceVue
 * @description Composant interne pour afficher les détails d'un service dans le dialogue.
 */
const DetailServiceVue = ({ details }: { details?: DetailService[] }) => {
  if (!details) return null;

  return (
    <div className="space-y-6 py-4">
      {details.map((detail) => (
        <div key={detail.id} className="space-y-4">
          <div className="relative border-l-4 border-primary pl-4">
            <Typography variant="h5" className="font-bold">
              {detail.accroche}
            </Typography>
          </div>
          <Typography className="text-muted-foreground">
            {detail.explication}
          </Typography>
          <div className="grid grid-cols-2 gap-2">
            {detail.competences.map((comp, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-primary">✦</span> {comp}
              </div>
            ))}
          </div>
          <Typography variant="p" className="text-sm italic font-medium">
            {detail.noteFinale}
          </Typography>
        </div>
      ))}
    </div>
  );
};

/**
 * @component Services
 * @description Affiche la grille des services experts Winall.
 */
export const Services = ({ services }: ServicesProps) => {
  const listeAffiche = ServicesLogique.obtenirServices(services);

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background moderne avec gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/5 via-transparent to-o/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,121,33,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(15,23,42,0.05),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14 text-center space-y-4">
          <Typography
            variant="h2"
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Nos Services Experts
          </Typography>
          <Typography
            variant="p"
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Des solutions technologiques de pointe conçues pour sécuriser et
            optimiser vos infrastructures.
          </Typography>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <CoverflowMobile
            items={listeAffiche.map((s) => ({
              title: s.titre,
              description: s.description,
              logo: s.icone,
              dialogContent: <DetailServiceVue details={s.details} />,
            }))}
          />
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {listeAffiche.map((s, index) => (
            <FancyCard
              key={index}
              title={s.titre}
              description={s.description}
              logo={s.icone}
              dialogContent={<DetailServiceVue details={s.details} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
