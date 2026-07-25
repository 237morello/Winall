-- Ajoute le hash de mot de passe pour l'authentification admin custom.
ALTER TABLE "user" ADD COLUMN "passwordHash" TEXT;
