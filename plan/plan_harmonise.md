# PLAN HARMONISÉ - SYSTÈME ET RESSOURCES

## 1. CONTEXTE
- **Projet** : Winall Tech Sarl — Dashboard B2B
- **Stack** : Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, Shadcn/ui, Tabler Icons (@tabler/icons-react).
- **Structure de composants (MVC léger, 4 fichiers)** :
  - `ComponentName.types.ts` (interfaces strictes, types)
  - `ComponentName.constants.ts` (données statiques, mocks)
  - `ComponentName.tsx` (composant React)
  - `index.ts` (barrel export)
- **Design System** : Style flat (zéro gradient, zéro shadow), couleurs OKLCH (vert Winall principal, orange accent), font-weights limités à 400 et 500, utilitaire `cn()` pour Tailwind.

## 2. OBJECTIF
Créer la page "Système et ressources" (route suggérée :  ou `/dashboard/systeme`) affichant l'utilisation et les quotas des services externes de Winall (Supabase, Upstash Redis, Vercel, Resend).
Le design doit s'inspirer de la maquette fournie (pubilc/images/ChatGPT Image 2 juil. 2026, 10_27_53.png>) (cartes d'informations claires, données chiffrées avec évolution, badges de statut, style flat).

## 3. CONTRAINTES DE LAYOUT (STRICTES)
- **Navigation** : **AUCUNE SIDEBAR (ni gauche, ni droite)**. Layout exclusif avec une navigation horizontale en haut (Top Nav) contenant le logo, les liens de navigation, et l'avatar de l'administrateur.
- **Conteneur** : Contenu principal centré, largeur maximale contrainte (ex: `max-w-6xl` / ~1100px).
- **Structure visuelle** : 
  1. En-tête de page (Titre + Sous-titre).
  2. Ligne de mini stat-cards globales (inspirées de la maquette : métriques clés).
  3. Grille de cartes de services. Chaque carte comprendra : 
     - Icône (Tabler Icons).
     - Nom du service et plan actuel.
     - Badge de statut (ex: Actif, À surveiller).
     - Barres de progression pour les métriques (seuils visuels : <70% vert, 70-90% orange, >90% rouge).

## 4. STRUCTURE DE DONNÉES ET LOGIQUE
- **Types (`.types.ts`)** : Définir des interfaces claires comme `ExternalService` (id, nom, catégorie, plan, statut) et `ServiceMetric` (label, current, limit, unit). Pas de `any`.
- **Données Mocks (`.constants.ts`)** : Utiliser un mock statique pour les 4 services ciblés (Supabase, Upstash, Vercel, Resend) en attendant l'intégration des vraies APIs.
- **Logique UI** : Créer des fonctions pures pour calculer les pourcentages et déterminer les couleurs des barres de progression, afin de garder le JSX propre. 

## 5. RÈGLES DE CODE
- Server Components (RSC) par défaut. Pas de `'use client'` à moins qu'une interactivité (ex: tabs, modals) ne l'exige.
- Utiliser les composants **Shadcn/ui** disponibles dans le projet (Card, Badge, Progress) en s'assurant qu'ils respectent le design system flat (supprimer les `shadow` via Tailwind si nécessaire).
- Toutes les icônes doivent provenir de `@tabler/icons-react`.
- Le code fourni devra être complet, sans placeholders (`// TODO`), et prêt pour la production.

## 6. LIVRABLES ATTENDUS
- Un dossier de composant (ex: `SystemResources/`) contenant les 4 fichiers de la convention.
- Le fichier `page.tsx` intégrant ce layout et ce composant.
