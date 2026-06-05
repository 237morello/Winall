# Plan de Développement : Authentification (Better Auth + Supabase + Resend)

## Vision & Architecture
L'objectif est d'intégrer une authentification "Passwordless" (Magic Link + OTP 60s) et "OAuth" (Google/GitHub) de manière sécurisée et modulaire. Le développement sera divisé en deux grandes phases strictement séparées : le Backend (Core Auth & APIs) et le Frontend (Clients & UI).

---

## PHASE 1 : Architecture Backend (Sécurité & Infrastructure) ✅ TERMINEE
Cette phase concerne uniquement le code exécuté côté serveur.

### Étape 1.1 : Inventaire des composants Backend
- [x] `src/lib/auth.ts` : Configuration centrale de Better Auth.
- [x] `src/lib/prisma.ts` : Connexion à Supabase via Prisma.
- [x] `src/app/api/auth/[...all]/route.ts` : Route API (Catch-all) pour exposer les endpoints Better Auth.
- [x] `emails/magic-link-template.tsx` : Template **React Email** pour la génération du rendu HTML des emails (Magic Link & OTP).

### Étape 1.2 : Configuration de `better-auth`
- [x] Instancier le client avec `prismaAdapter`.
- [x] Déclarer le plugin `magicLink` et connecter la méthode `sendMagicLink`.
  - Utiliser la fonction `render` de **React Email** sur `magic-link-template.tsx` pour générer le HTML.
  - Passer le HTML généré à `resend.emails.send()`.
- [x] Déclarer le plugin `emailOTP`.
  - Configurer **strictement** `expiresIn: 60` (60 secondes).
  - Connecter la méthode `sendVerificationOTP`.
  - Utiliser la fonction `render` de **React Email** pour le template OTP.
  - Passer le HTML généré à `resend.emails.send()`.
- [x] Activer les fournisseurs OAuth : Google et GitHub (récupération des variables d'environnement).

### Étape 1.3 : Vérification Backend
- [x] Test manuel des variables d'environnement (`RESEND_API_KEY`, credentials OAuth, `DATABASE_URL`).
- [x] Génération et test de la route API via un client HTTP pour s'assurer que `/api/auth/...` répond correctement.

---

## PHASE 2 : Architecture Frontend (Expérience Utilisateur & Caching) ✅ TERMINEE
Cette phase concerne uniquement l'interface client (React `'use client'`).

### Étape 2.1 : Inventaire des composants Frontend
- [x] `src/lib/auth-client.ts` : Instanciation du client Better Auth pour le navigateur.
- [x] `src/app/(auth)/log-in/page.tsx` : Conteneur principal de la page de connexion.
- [x] `src/app/(auth)/_components/auth-form.tsx` : Formulaire principal (Magic Link / OTP).
- [x] `src/app/(auth)/_components/social-button.tsx` : Boutons réutilisables pour Google/GitHub.

### Étape 2.2 : Configuration du Client Auth & TanStack Query
- [x] Configurer `createAuthClient` dans `auth-client.ts` avec les plugins `magicLinkClient` et `emailOTPClient`.
- [x] Créer/Mettre à jour un hook custom `src/hooks/use-session.ts` utilisant **TanStack Query** (`useQuery`).
  - Ce hook va fetcher la session via `authClient.getSession()`.
  - Configurer les options de **caching** (ex: `staleTime: 5 * 60 * 1000` pour 5 minutes).
  - Gérer l'invalidation du cache session lors du login/logout.

### Étape 2.3 : Implémentation du Formulaire d'Authentification (`auth-form.tsx`)
- [x] **Validation :** Utiliser Zod et React Hook Form pour sécuriser l'input email.
- [x] **Gestion d'État :** Utiliser les mutations pour gérer les appels de connexion.
- [x] **État 1 (Saisie Email) :**
  - Afficher le champ Email et les boutons OAuth.
- [x] **État 2 (Vérification OTP) :**
  - Masquer le champ Email.
  - Afficher un composant `InputOTP` (Shadcn) à 6 chiffres.
  - Afficher un chronomètre dégressif de 60 secondes.
  - Gérer le renvoi du code.

---

## 🚀 Statut du Projet : Prêt pour la Production
L'authentification est maintenant entièrement implémentée avec une séparation stricte des responsabilités et une UX fluide.
