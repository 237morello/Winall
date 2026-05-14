import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma";

/**
 * Utilise l'adaptateur PostgreSQL recommandé pour les déploiements serverless.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adaptateur = new PrismaPg(pool);

const globalPourPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalPourPrisma.prisma ||
  new PrismaClient({
    adapter: adaptateur,
  });

if (process.env.NODE_ENV !== "production") {
  globalPourPrisma.prisma = prisma;
}

export default prisma;
