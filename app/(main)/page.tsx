import { SectionHero } from "@/components/features/accueil/Hero/Hero";
import { Services } from "@/components/features/accueil/Services/Services";
import { Projets } from "@/components/features/accueil/Projets/Projets";
import { PartnersScroll } from "@/components/features/accueil/PartnersScroll";
import { TestimonialsSection } from "@/components/features/accueil/TestimonialsSection";
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


      {/* 5. Nos Services (Existant mais à vérifier) */}
      <Services />

      {/* 6. Nos Projets (Existant) */}
      <Projets />

      {/* 7. Nos Partenaires Technologiques (Nouveau) */}
      <PartnersScroll />

      {/* 8. Avis Clients (Nouveau) */}
      <TestimonialsSection />


    </main>
  );
}
