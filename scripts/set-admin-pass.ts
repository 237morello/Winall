/**
 * Pose ou remplace le pass d'accès admin Winall (stocké haché dans AdminPreference).
 *
 *   npx tsx scripts/set-admin-pass.ts "<nouveau-pass>"
 *
 * Sert à l'initialisation ET à la rotation ultérieure du pass. Aucune donnée
 * n'est relue en clair : seule la valeur hachée est écrite en base.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSecret } from "../src/lib/password";

const ACCESS_PASS_KEY = "admin_access_pass";

/** Charge .env sans dépendance (dotenv absent), sans écraser l'existant. */
function loadEnv(): void {
  try {
    const content = readFileSync(resolve(process.cwd(), ".env"), "utf8");
    for (const rawLine of content.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env absent : on se rabat sur l'environnement courant.
  }
}

async function main(): Promise<void> {
  const pass = process.argv[2];
  if (!pass || pass.length < 6) {
    console.error(
      'Usage : npx tsx scripts/set-admin-pass.ts "<pass>" (6 caractères minimum)',
    );
    process.exit(1);
  }

  loadEnv();
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DIRECT_URL / DATABASE_URL introuvable dans l'environnement.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    const hashed = await hashSecret(pass);
    await prisma.adminPreference.upsert({
      where: { key: ACCESS_PASS_KEY },
      create: { key: ACCESS_PASS_KEY, value: hashed },
      update: { value: hashed },
    });
    console.log(`Pass d'accès admin mis à jour (clé « ${ACCESS_PASS_KEY} »).`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
