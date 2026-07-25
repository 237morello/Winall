/*
  Warnings:

  - You are about to drop the column `isPublic` on the `project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "project_isPublic_idx";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "isPublic",
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "event_log" (
    "id" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_preference" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_log_module_idx" ON "event_log"("module");

-- CreateIndex
CREATE INDEX "event_log_level_idx" ON "event_log"("level");

-- CreateIndex
CREATE INDEX "event_log_createdAt_idx" ON "event_log"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_preference_key_key" ON "admin_preference"("key");

-- CreateIndex
CREATE INDEX "project_isPublished_idx" ON "project"("isPublished");

-- CreateIndex
CREATE INDEX "project_publishedAt_idx" ON "project"("publishedAt");
