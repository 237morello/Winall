# Deploiement GitHub vers Vercel

Cette application Next.js utilise des API routes, Prisma, Better Auth et une base PostgreSQL. Elle ne doit pas etre hebergee avec GitHub Pages. Le depot GitHub sert a declencher le deploiement vers Vercel.

## 1. Creer le projet Vercel

1. Importer le depot GitHub `237morello/Winall` dans Vercel.
2. Selectionner le framework `Next.js`.
3. Renseigner les variables d'environnement de production dans Vercel.

Variables principales:

```env
DATABASE_URL=
DIRECT_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=https://votre-domaine.com
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NEXT_PUBLIC_CLARITY_PROJECT_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## 2. Ajouter les secrets GitHub Actions

Dans GitHub: `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`.

Secrets requis par `.github/workflows/deploy-vercel.yml`:

```env
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
DATABASE_URL=
DIRECT_URL=
```

`VERCEL_TOKEN` se cree dans Vercel: `Account Settings` -> `Tokens`.

`VERCEL_ORG_ID` et `VERCEL_PROJECT_ID` sont disponibles apres liaison Vercel, dans `.vercel/project.json` en local ou dans les parametres du projet Vercel.

## 3. Deployer

Le workflow deploye automatiquement en production sur chaque push vers `main` ou `master`.

Il peut aussi etre lance manuellement depuis GitHub Actions avec `workflow_dispatch`.

## 4. Avant le premier deploiement

La branche doit passer le build Next.js. Si `pnpm exec tsc --noEmit` ou `next build` echoue, Vercel refusera le deploiement.

La migration analytics ajoute la table `analytics_event`; le workflow execute:

```bash
pnpm exec prisma migrate deploy
```
