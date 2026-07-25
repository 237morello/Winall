import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Pattern Singleton robuste pour Next.js (Hot Reload) avec Driver Adapter
const prismaClientSingleton = () => {
  const connectionString = `${process.env.DATABASE_URL}`;
  
  // Instancier le pool pg
  const pool = new Pool({ connectionString });
  
  // Créer l'adapter pour Prisma
  const adapter = new PrismaPg(pool);

  // Instancier Prisma avec l'adapter
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prismaGlobal: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prisma;
}

export default prisma;
