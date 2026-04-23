# Directives du Projet Winall Tech SARL

Ce fichier définit les standards de développement, la stack technique et les règles d'interaction pour le projet Winall. Toutes les interactions avec l'IA doivent respecter ces directives.

## 1. Contexte & Objectifs
- **Entreprise** : Winall Tech SARL (Spécialiste en électricité : courants forts et faibles).
- **But de l'application** : Promouvoir l'entreprise à l'international, fournir des dashboards dédiés pour les clients et l'administration.
- **Fonctionnalités principales** :
    - Dashboards (Client/Admin).
    - Suivi de projets pour les clients.
    - Formulaires de contact et système de notifications.
    - Gestion complète des contenus par l'administrateur.

## 2. Stack Technique
- **Frontend** : Next.js 15 (App Router), React 19.
- **Backend/API** : Server Components & Server Actions (par défaut).
- **Base de données** : Supabase (PostgreSQL) avec l'ORM **Prisma**.
- **Authentification** : **Better Auth** (Google, GitHub, Magic Link).
- **Stylisation** : Tailwind CSS v4, Radix UI (via Shadcn/UI).
- **Icônes** : Lucide React.
- **Validation** : Zod + React Hook Form.

## 3. Standards de Développement
- **Langue** : Toute la communication et la documentation technique (commentaires, logs) doivent être en **Français**.
- **Composants** : Utiliser des composants fonctionnels avec des fonctions fléchées (`const MyComponent = () => {}`).
- **Mission** : Chaque fichier (nouveau ou modifié) doit impérativement commencer par un commentaire décrivant sa "Mission" (ex: `/** Mission : Composant de gestion des... */`).
- **Typage** : TypeScript strict. Éviter `any`. Utiliser les interfaces et types explicites.
- **Architecture** : Privilégier les Server Components. Structure modulaire basée sur les fonctionnalités.
- **Gestionnaire de paquets** : Utiliser exclusivement `pnpm`.

## 4. Règles d'Interaction Gemini
- Répondre systématiquement en français.
- Être concis et direct, en privilégiant le code de haute qualité.
- Toujours vérifier les fichiers de tests existants avant de proposer des modifications.
- Proposer des tests (Vitest/Playwright) pour chaque nouvelle fonctionnalité majeure.
