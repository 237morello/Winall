# Plan D'Execution

## Objectif

Construire une page d'authentification frontend propre, preparer le raccord backend avec Supabase + Prisma, et documenter ce qui a ete mis en place.

## Todo

- [x] Auditer la structure actuelle du projet.
- [x] Ajouter un provider de theme global avec `next-themes`.
- [x] Ajouter un toggle `light/dark` sur la page principale.
- [x] Isoler les composants d'authentification dans `app/(auth)/_components`.
- [x] Refaire `log-in` et `sign-up` avec `shadcn/ui`, `motion`, `react-hook-form` et `zod`.
- [x] Ajouter la route `app/api/auth/[...all]/route.ts` pour Better Auth.
- [x] Brancher Better Auth sur Prisma avec cookies Next.js.
- [x] Preparer la validation d'authentification contre Supabase Postgres via `DATABASE_URL`.
- [x] Ecrire une documentation frontend.
- [x] Ecrire une documentation backend.
- [ ] Verifier completement le flux runtime avec une vraie base accessible.

## Stack Utilisee

- `next@15`
- `react@19`
- `tailwindcss@4`
- `shadcn/ui`
- `motion`
- `react-hook-form`
- `zod`
- `better-auth`
- `prisma`
- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`
- `next-themes`
- `supabase` pour l'environnement Postgres distant

## Commandes Pnpm Utiles

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm prisma generate
pnpm prisma migrate dev
```

## Notes Runtime

- Pour valider l'authentification reelle, `DATABASE_URL` et `DIRECT_URL` doivent contenir un mot de passe Supabase valide.
- `BETTER_AUTH_SECRET` doit etre defini hors valeur de developpement.
- `NEXT_PUBLIC_APP_URL` ou `BETTER_AUTH_URL` est recommande pour fixer l'URL publique de l'auth.
