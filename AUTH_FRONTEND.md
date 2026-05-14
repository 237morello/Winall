# Documentation Frontend Auth

## Vue D'Ensemble

Une nouvelle surface d'authentification frontend a ete mise en place avec separation claire des responsabilites.

## Fonctionnalites Creees

### Theme global

- `src/components/features/theme-provider.tsx`
- Active `next-themes` pour permettre le mode clair et sombre.
- Le provider est branche au niveau de `app/layout.tsx`.

### Toggle de theme

- `src/components/features/theme-toggle.tsx`
- Ajoute un basculement `light/dark` sur la page principale.
- Le composant utilise `Switch` et `Button` de shadcn ainsi qu'une animation `motion`.

### Layout principal

- `app/(main)/layout.tsx`
- Le header global a ete limite a la zone `(main)`.
- Les pages d'authentification ne recuperent plus automatiquement la navigation publique.

### Surface d'authentification

- `app/(auth)/_components/auth-shell.tsx`
- Gere la composition de la page auth: panneau visuel a gauche, formulaire a droite.

### Hero auth

- `app/(auth)/_components/auth-hero.tsx`
- Bloc de contexte produit.
- Met en avant la securite, la preparation backend et la separation des composants.
- Anime avec `motion`.

### Validation formulaire

- `app/(auth)/_components/auth-form.schema.ts`
- Definis deux schemas `zod`: connexion et inscription.
- Valide l'email, la longueur du mot de passe, le nom, et la confirmation du mot de passe.

### Formulaire auth

- `app/(auth)/_components/auth-form.tsx`
- Utilise `react-hook-form` + `zodResolver`.
- Garde la logique locale a l'auth.
- Gere l'etat pending, les erreurs serveur, l'affichage/masquage du mot de passe et les redirections.

### Pages auth

- `app/(auth)/log-in/page.tsx`
- `app/(auth)/sign-up/page.tsx`
- Pages fines qui composent `AuthShell` + `AuthForm`.

## Principes De Structure

- Les composants non globaux restent dans `app/(auth)/_components`.
- Les composants globaux reutilisables restent dans `src/components/features`.
- La logique formulaire et la validation sont proches des pages qui les consomment.
- Le layout racine ne contient plus de header metier impose a toutes les routes.
