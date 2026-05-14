/**
 * Mission : Page de visualisation des projets et de l'état d'avancement des chantiers pour l'utilisateur.
 */
import { Typography } from "@/components/ui/typography";

const ProjectPage = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Typography variant="h1">Projets</Typography>
      <Typography variant="p" className="text-muted-foreground">
        Retrouvez ici l&apos;état d&apos;avancement de vos chantiers en cours.
      </Typography>
    </div>
  );
};

export default ProjectPage;
