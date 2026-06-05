/*
  Warnings:

  - The `emailVerified` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[providerId,accountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "ProjectDomaine" AS ENUM ('BTP', 'RESEAU', 'VIDEOSURVEILLANCE', 'CONTROLE_ACCES', 'SECURITE_INCENDIE', 'TELEPHONIE_IP', 'IT');

-- CreateEnum
CREATE TYPE "ProjectStatut" AS ENUM ('BROUILLON', 'EN_COURS', 'TERMINE', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('DEVIS', 'INTERVENTION', 'CONTACT');

-- CreateEnum
CREATE TYPE "FormStatut" AS ENUM ('NON_LU', 'EN_TRAITEMENT', 'CLOS');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROJET_DEBUT', 'PROJET_TERMINE', 'NOUVEAU_MESSAGE', 'NOUVEAU_COMMENTAIRE', 'NOUVEAU_FORMULAIRE', 'REPONSE_FORMULAIRE');

-- DropIndex
DROP INDEX "verification_identifier_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT',
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "verification" ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "domaine" "ProjectDomaine" NOT NULL,
    "statut" "ProjectStatut" NOT NULL DEFAULT 'BROUILLON',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" VARCHAR(500),
    "images" TEXT[],
    "localisation" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_comment" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "lu" BOOLEAN NOT NULL DEFAULT false,
    "senderUserId" TEXT NOT NULL,
    "receiverUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_request" (
    "id" TEXT NOT NULL,
    "type" "FormType" NOT NULL,
    "statut" "FormStatut" NOT NULL DEFAULT 'NON_LU',
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "donnees" JSONB NOT NULL,
    "reponseAdmin" TEXT,
    "reponduLe" TIMESTAMP(3),
    "userId" TEXT,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "lu" BOOLEAN NOT NULL DEFAULT false,
    "lienUrl" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal_audit_auth" (
    "id" TEXT NOT NULL,
    "typeEvenement" TEXT NOT NULL,
    "emailHash" VARCHAR(64),
    "utilisateurId" TEXT,
    "adresseIp" TEXT,
    "agentUtilisateur" TEXT,
    "succes" BOOLEAN NOT NULL DEFAULT false,
    "details" JSONB,
    "creeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journal_audit_auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "project_statut_idx" ON "project"("statut");

-- CreateIndex
CREATE INDEX "project_domaine_idx" ON "project"("domaine");

-- CreateIndex
CREATE INDEX "project_isPublic_idx" ON "project"("isPublic");

-- CreateIndex
CREATE INDEX "project_userId_idx" ON "project"("userId");

-- CreateIndex
CREATE INDEX "project_comment_projectId_idx" ON "project_comment"("projectId");

-- CreateIndex
CREATE INDEX "project_comment_userId_idx" ON "project_comment"("userId");

-- CreateIndex
CREATE INDEX "message_senderUserId_idx" ON "message"("senderUserId");

-- CreateIndex
CREATE INDEX "message_receiverUserId_idx" ON "message"("receiverUserId");

-- CreateIndex
CREATE INDEX "message_createdAt_idx" ON "message"("createdAt");

-- CreateIndex
CREATE INDEX "form_request_type_idx" ON "form_request"("type");

-- CreateIndex
CREATE INDEX "form_request_statut_idx" ON "form_request"("statut");

-- CreateIndex
CREATE INDEX "form_request_userId_idx" ON "form_request"("userId");

-- CreateIndex
CREATE INDEX "form_request_createdAt_idx" ON "form_request"("createdAt");

-- CreateIndex
CREATE INDEX "notification_userId_idx" ON "notification"("userId");

-- CreateIndex
CREATE INDEX "notification_lu_idx" ON "notification"("lu");

-- CreateIndex
CREATE INDEX "notification_createdAt_idx" ON "notification"("createdAt");

-- CreateIndex
CREATE INDEX "journal_audit_auth_emailHash_idx" ON "journal_audit_auth"("emailHash");

-- CreateIndex
CREATE INDEX "journal_audit_auth_utilisateurId_idx" ON "journal_audit_auth"("utilisateurId");

-- CreateIndex
CREATE INDEX "journal_audit_auth_creeLe_idx" ON "journal_audit_auth"("creeLe");

-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_accountId_key" ON "account"("providerId", "accountId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_comment" ADD CONSTRAINT "project_comment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_comment" ADD CONSTRAINT "project_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_request" ADD CONSTRAINT "form_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_request" ADD CONSTRAINT "form_request_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
