# 📐 Directives de Développement Winall Tech Sarl — V3.0.0

> **Philosophie** : Un code performant (Next.js 15), sécurisé et maintenable, avec une documentation pédagogique en Français.

---

## 1. Contexte & Identité Produit
Winall Tech Sarl est l'expert camerounais des infrastructures critiques : Réseaux, Sécurité électronique, Téléphonie IP et BTP.
**Objectif** : Une plateforme "Premium" qui inspire confiance et expertise.

---

## 2. Architecture & Structure (Règle d'Or)
Le projet utilise la structure `src/` pour tout le code source.
- **`src/app/`** : Uniquement le routage, les layouts et les pages (App Router).
- **`src/components/`** : 
  - `ui/` : Composants atomiques (Shadcn/UI).
  - `features/` : Composants complexes par domaine métier.
  - `layout/` : Éléments de structure (Header, Footer).
- **`src/actions/`** : Server Actions (logique de mutation).
- **`src/services/`** : Logique métier pure, appels DB (Prisma), intégrations tierces.
- **`src/lib/`** : Configurations (Auth, Prisma, Supabase, Utils).
- **`src/hooks/`** : Hooks React personnalisés.

---

## 3. Conventions de Nommage & Langue
Pour maximiser la compatibilité avec l'écosystème (libs, LLMs, outils de scan) :
- **Symboles (Code)** : **ANGLAIS** impératif pour les variables, fonctions, classes, types, fichiers et dossiers (ex: `updateUserProfile`, `UserCard`, `useAuth`).
- **Contenu & Documentation** : **FRANÇAIS** pour les commentaires JSDoc, les messages d'erreur destinés aux utilisateurs, les logs de console informatifs et les noms de variables locales très spécifiques au métier camerounais si nécessaire.

---

## 4. Standards Next.js 15 & React 19
- **Async APIs** : Toujours `await` les `params`, `searchParams`, `headers()` et `cookies()`.
- **Server Actions** :
  - Toujours utiliser `"use server"`.
  - Retourner un objet standard : `{ success: boolean, data?: T, error?: string }`.
  - Validation systématique avec **Zod**.
- **Formulaires** : Priorité à `useActionState` et `useFormStatus` de React 19.
- **Transitions & Animations** : 
  - Utiliser Tailwind CSS v4 pour les états simples.
  - Utiliser `motion/react` (Framer Motion) pour les interactions complexes et le "Premium feel", sans en abuser.
- **Composants UI** : Si un composant Shadcn/UI manque : `pnpm dlx shadcn@latest add <nom>`.

---

## 5. Qualité du Code & Production
- **Simplicité** : Préférer les fonctions et les Hooks aux classes pour la logique UI.
- **Type Safety** : Pas de `any`. Utiliser les interfaces TypeScript pour tout contrat de données.
- **Performance** : Optimiser les images (`next/image`) et utiliser les Server Components par défaut.
- **Erreurs** : Utiliser des Error Boundaries (`error.tsx`) et des Loading States (`loading.tsx`) granulaires.

---

## 6. Base de Données & Auth
- **Prisma** : Ne jamais importer `prisma` directement dans les composants ; passer par les `services`.
- **Better Auth** : Utiliser `auth.api.getSession({ headers: await headers() })` pour les vérifications côté serveur.
- **Supabase** : Utiliser les politiques RLS pour la sécurité au niveau de la ligne.
