import { getExpertSkills } from "./data";
import { SkillGrid } from "./skill-grid";

/**
 * @component SkillSection
 * @description Server Component gérant la récupération des compétences expertes.
 */
export const SkillSection = () => {
  const skills = getExpertSkills();

  return (
    <section className="container mx-auto p-8 mt-14">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
        Nos Compétences Expertises
      </h2>

      <SkillGrid skills={skills} />
    </section>
  );
};
