# 🤖 PROMPT IA - Utilisation recommandée

Voici les prompts à utiliser pour demander l'aide de l'IA sur votre backend Winall.

---

## 📋 Prompt Complet (à copier entièrement)

```
Tu es un expert TypeScript et développeur backend Next.js 15 avec Prisma.

CONTEXTE PROJET:
- Framework: Next.js 15 (App Router)
- Auth: Better Auth v1.5 (PostgreSQL, Redis, OTP/Magic Link)
- ORM: Prisma 7 avec PostgreSQL
- Validation: Zod
- Frontend: React 19, TailwindCSS, Radix UI
- Dashboard: Pages authentifiées pour gestion Projets, Notifications, Messages, Devis

ARCHITECTURE:
- app/(auth) → Routes login/signup
- app/(main) → Pages publiques
- app/(dashboard)/dashboard/[userId] → Zone client
- app/api/actions/* → Server Actions securisées
- src/lib/auth.ts → Configuration Better Auth
- src/lib/prisma.ts → Client Prisma
- app/types/database.ts → Types + schémas Zod

CONVENTION DE NOMMAGE:
- Variables/champs: français (nomVariable, dateDebut, montantDevis)
- Fonctions/routes: anglais (getProjectsByUser, createProject)

PATTERNS:
1. Server Actions: "use server", vérifier session, valider input Zod, opération DB
2. Client Components: "use client", appeler server actions, gérer loading/errors
3. Types: Exporter depuis app/types/database.ts avec interfaces extends Prisma models

SÉCURITÉ:
- Vérifier ownership des ressources (userId match)
- Vérifier session avant toute opération
- Valider input avec Zod
- Pas de données sensibles en client-side

OBJECTIF: Construire un backend robuste pour gérer:
- Projects (CRUD + stats)
- Notifications (push, lecture)
- Messages (chat entre utilisateurs)
- Formulaires (Devis, Contact, Consultation)

Aide-moi à: [VOTRE DEMANDE ICI]
```

---

## 🎯 Prompts spécifiques par tâche

### 1. Créer le modèle Prisma
```
En utilisant le contexte du projet Winall,
aide-moi à créer les migrations Prisma pour:
- Model Project (avec relations User)
- Model Notification
- Model Message (conversations)
- Model Form (devis, contact)

Inclus:
- Champs appropriés (id, userId, statut, timestamps)
- Relations avec User (onDelete: Cascade)
- Indexes sur userId, statut, createdAt
- Format français pour noms de champs domaine
```

### 2. Créer les types TypeScript
```
Crée les interfaces TypeScript et schémas Zod pour:
- Project
- Notification
- Message
- Form (avec types variantes pour devis, contact, etc.)

À exporter depuis app/types/database.ts

Inclus:
- Types bruts depuis @prisma/client
- Types DTO enrichis
- Schémas Zod pour validation
- Inférence TypeScript (z.infer<typeof schema>)
```

### 3. Implémenter Server Actions
```
Crée les Server Actions pour Project management:
- createProject(data: ProjectSchema)
- getProjectsByUser()
- getProjectById(id: string)
- updateProject(id: string, data: Partial<ProjectSchema>)
- deleteProject(id: string)

Patterns:
- Vérifier session utilisateur
- Valider input Zod
- Vérifier ownership (userId)
- Retourner données typées

À créer: app/api/actions/projects.ts
```

### 4. Créer composants Client
```
Crée un composant React pour afficher la liste des projets:
- Appeler getProjectsByUser() dans useEffect
- Gérer loading, error, empty states
- Afficher ProjectCard pour chaque projet
- Intégrer FormCreateProject pour créer nouveau projet

Le tout compatible avec React 19 + Server Actions
```

### 5. Ajouter une notification
```
Crée une Server Action pour créer une notification:
- Valider data avec Zod
- Vérifier l'utilisateur existe
- Créer notification en DB
- Retourner notification créée

Route: app/api/actions/notifications.ts
Fonction: createNotification(userId: string, data: NotificationData)
```

---

## 💬 Utilisation simplifiée

Pour les demandes simples, vous pouvez aussi dire:

```
"En utilisant PROJECT_CONTEXT.md,
aide-moi à [créer/corriger/expliquer] [feature]"
```

L'IA comprendra directement votre contexte et répondra selon les patterns définis.

---

## 📌 Contexte à fournir systématiquement

Lorsque vous demandez aide:

1. **Fichier contexte**: Mentionner que c'est pour le projet Winall
2. **Étendue**: Spécifier si c'est Server Action, type, ou composant
3. **Sécurité**: Rappeler de vérifier session + ownership
4. **Types**: Utiliser Zod pour validation

Exemple complet:
```
Pour Winall, crée une Server Action
pour envoyer un message entre utilisateurs.

Sécurité:
- Vérifier session
- Vérifier receiverUserId existe
- Limiter message à 5000 chars

Type: app/api/actions/messages.ts
```

---

## ✨ Template pour demandes récurrentes

```markdown
**Projet**: Winall
**Type**: [Server Action / Type / Component / API Route]
**Entité**: [Project / Notification / Message / Form]
**Action**: [create / read / update / delete / list]

**Détails**:
- Champs requis: ...
- Relations: ...
- Détails métier: ...

**Sécurité**:
- Vérifier: [session, ownership, permissions]
- Limiter: [rate, file size, etc]

Crée le code avec les patterns Winall.
```
