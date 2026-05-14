import { SectionHero } from "@/components/features/accueil/Hero/Hero";
import { SectionMission } from "@/components/features/Mission/SectionMission";
import { Timeline } from "@/components/features/Timeline/Timeline";
import { ContactAction } from "@/components/features/ContactAction/ContactAction";
import { Services } from "@/components/features/accueil/Services/Services";
import { Projets } from "@/components/features/accueil/Projets/Projets";
import { generateSeo } from "@/components/seo/seo";
import { MotDirecteur } from "@/components/features/accueil/MotDirecteur";
import { SkillSection } from "@/components/features/accueil/skills/skill-section";

export const metadata = generateSeo({
  title: "Winall Tech Sarl | Accueil",
  description:
    "Expert en réseaux informatiques, vidéosurveillance, et électricité au Cameroun.",
  keywords: [
    "Winall",
    "Cameroun",
    "Réseaux",
    "Sécurité",
    "BTP",
    "Informatique",
  ],
});

/**
 * @page Page d'accueil
 * @description Structure complète et épurée de la page d'accueil Winall Tech Sarl conforme au nouveau design.
 */
export default function Home() {
  return (
    <main className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <SectionHero />

      {/* 2. les competence  */}
      <SkillSection />

      {/* 3. Mot du directeur */}
      <MotDirecteur />

      {/* 4. Action Directe Technicienne */}
      <ContactAction />

      {/* 5. Nos Services (Existant mais à vérifier) */}
      <Services />

      {/* 6. Nos Projets (Existant) */}
      <Projets />


    </main>
  );
}
