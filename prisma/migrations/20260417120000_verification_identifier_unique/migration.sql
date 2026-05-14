-- Keep one row per identifier to allow a unique index
DELETE FROM "verification" AS older
USING "verification" AS newer
WHERE older."identifier" = newer."identifier"
  AND (
    older."createdAt" < newer."createdAt"
    OR (older."createdAt" = newer."createdAt" AND older."id" < newer."id")
  );

DROP INDEX IF EXISTS "verification_identifier_idx";

CREATE UNIQUE INDEX "verification_identifier_key" ON "verification"("identifier");
