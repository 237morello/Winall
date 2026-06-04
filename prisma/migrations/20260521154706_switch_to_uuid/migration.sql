-- CreateEnum
CREATE TYPE "InvoiceStatut" AS ENUM ('BROUILLON', 'ENVOYE', 'PAYE', 'EN_RETARD', 'ANNULE');

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "budget" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "dateDebut" TIMESTAMP(3),
ADD COLUMN     "dateFin" TIMESTAMP(3),
ADD COLUMN     "progression" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "statut" "InvoiceStatut" NOT NULL DEFAULT 'BROUILLON',
    "dateEcheance" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_numero_key" ON "invoice"("numero");

-- CreateIndex
CREATE INDEX "invoice_userId_idx" ON "invoice"("userId");

-- CreateIndex
CREATE INDEX "invoice_projectId_idx" ON "invoice"("projectId");

-- CreateIndex
CREATE INDEX "invoice_statut_idx" ON "invoice"("statut");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
