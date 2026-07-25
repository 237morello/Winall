-- Réaligne l'enum ProjectDomaine sur les ServiceSlug du site public
-- et introduit le placement des projets (ProjectPlacement / PlacementZone).

-- 1. Nouvel enum ProjectDomaine (remplace l'ancien via swap de type)
ALTER TYPE "ProjectDomaine" RENAME TO "ProjectDomaine_old";

CREATE TYPE "ProjectDomaine" AS ENUM (
  'ELECTRONIQUE',
  'GENIE_CIVIL',
  'BTP',
  'MAINTENANCE',
  'INFOGRAPHIE',
  'SECURITE_INCENDIE',
  'RESEAUX',
  'AUTRES'
);

-- Conversion des valeurs existantes (couvre toutes les anciennes valeurs)
ALTER TABLE "project"
  ALTER COLUMN "domaine" TYPE "ProjectDomaine"
  USING (
    CASE "domaine"::text
      WHEN 'BTP'               THEN 'BTP'
      WHEN 'RESEAU'            THEN 'RESEAUX'
      WHEN 'SECURITE_INCENDIE' THEN 'SECURITE_INCENDIE'
      WHEN 'VIDEOSURVEILLANCE' THEN 'ELECTRONIQUE'
      WHEN 'CONTROLE_ACCES'    THEN 'ELECTRONIQUE'
      WHEN 'TELEPHONIE_IP'     THEN 'RESEAUX'
      WHEN 'IT'                THEN 'AUTRES'
      ELSE 'AUTRES'
    END
  )::"ProjectDomaine";

DROP TYPE "ProjectDomaine_old";

-- 2. Enum PlacementZone
CREATE TYPE "PlacementZone" AS ENUM ('HERO', 'PROJETS_GLOBAL', 'SOUS_SERVICE');

-- 3. Table project_placement
CREATE TABLE "project_placement" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "zone" "PlacementZone" NOT NULL,
    "subServiceSlug" TEXT,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_placement_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "project_placement_projectId_zone_subServiceSlug_key"
  ON "project_placement"("projectId", "zone", "subServiceSlug");

CREATE INDEX "project_placement_zone_ordre_idx"
  ON "project_placement"("zone", "ordre");

ALTER TABLE "project_placement"
  ADD CONSTRAINT "project_placement_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "project"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
