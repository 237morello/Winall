# Documentation Backend Auth

## Ce Qui A Ete Prepare

### Client Better Auth

- `src/lib/auth-client.ts`
- Expose un client frontend Better Auth pour appeler `signIn.email` et `signUp.email`.

### Configuration serveur Better Auth

- `src/lib/auth.ts`
- Branche Better Auth sur Prisma avec `prismaAdapter`.
- Active `emailAndPassword`.
- Active `nextCookies()` pour l'integration Next.js App Router.
- Definis une `baseURL`, une liste d'origines de confiance, et un secret de developpement de secours.

### Route API auth

- `app/api/auth/[...all]/route.ts`
- Expose les handlers `GET`, `POST`, `PATCH`, `PUT`, `DELETE` vers Better Auth.

### Prisma + Supabase

- `src/lib/prisma.ts`
- Utilise `PrismaPg` avec `DATABASE_URL`.
- La base cible est PostgreSQL, ce qui correspond a Supabase.
- Ton schema actuel contient deja les tables auth Better Auth: `User`, `Session`, `Account`, `Verification`.

## Conditions Pour Une Validation Reelle

### Variables d'environnement

Il faut definir correctement:

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
BETTER_AUTH_SECRET=une-valeur-longue-et-secrete
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Migrations / generation

Commandes utiles:

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### Flux attendu

1. L'utilisateur soumet le formulaire frontend.
2. `authClient.signUp.email` ou `authClient.signIn.email` appelle `/api/auth/...`.
3. Better Auth valide la requete.
4. Prisma ecrit ou lit dans PostgreSQL Supabase.
5. Better Auth renvoie la session et pose les cookies.

## Limite Actuelle

Le raccord applicatif est en place, mais l'execution de bout en bout depend encore d'un `DATABASE_URL` Supabase valide. Si le mot de passe reste en placeholder, la validation reelle ne peut pas aboutir.
