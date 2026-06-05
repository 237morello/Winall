import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import { Plus, Minus } from "lucide-react";

const VALEURS = [
  {
    id: "item-1",
    titre: "L'Excellence Technique",
    contenu: "Nous ne nous contentons pas d'installer du matériel : nous maîtrisons les technologies les plus pointues du marché (Hikvision, ZKTeco, Dahua) pour garantir des systèmes fiables et durables.",
  },
  {
    id: "item-2",
    titre: "L'Intégrité Totale",
    contenu: "La transparence est au cœur de nos relations. Chaque projet est géré avec une rigueur éthique absolue, de la facturation à la mise en œuvre technique.",
  },
  {
    id: "item-3",
    titre: "La Réactivité Critique",
    contenu: "Dans nos métiers (sécurité, réseaux), chaque minute compte. Nos équipes interviennent avec une rapidité exemplaire pour assurer la continuité de vos services.",
  },
  {
    id: "item-4",
    titre: "L'Innovation Humaine",
    contenu: "La technologie est au service de l'homme. Nous formons continuellement nos techniciens pour qu'ils apportent des solutions innovantes adaptées au contexte local.",
  },
];

export const SectionMission = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Partie Gauche : Mission & Vision */}
        <div className="flex flex-col gap-12">
          <div>
            <Typography variant="h2" className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Mission
            </Typography>
            <Typography variant="p" className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Apporter des solutions technologiques robustes et innovantes pour sécuriser et connecter les entreprises camerounaises au monde de demain.
            </Typography>
          </div>
          <div>
            <Typography variant="h2" className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Vision
            </Typography>
            <Typography variant="p" className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Devenir le leader panafricain de la sécurité électronique et de l&apos;infrastructure réseau par l&apos;excellence technique et l&apos;intégrité.
            </Typography>
          </div>
        </div>

        {/* Partie Droite : Valeurs (Accordion) */}
        <div>
          <Typography variant="h2" className="text-4xl md:text-5xl font-bold mb-10 text-black">
            Valeurs
          </Typography>
          <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
            {VALEURS.map((valeur) => (
              <AccordionItem key={valeur.id} value={valeur.id} className="border-none">
                <AccordionTrigger className="flex items-center justify-between py-4 text-xl md:text-2xl font-bold text-black hover:no-underline group border-t border-gray-100">
                  <span className="flex-1 text-left">{valeur.titre}</span>
                  <div className="ml-4 text-orange-500">
                    <Plus className="h-6 w-6 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />
                    <Minus className="h-6 w-6 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-lg text-gray-500 leading-relaxed">
                  {valeur.contenu}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
