# 🎯 CONTEXTE PROJET WINALL - Backend Intelligence

**Dernière mise à jour**: 2025-05-05
**Branch active**: `feature/dashboard`
**Objectif**: Construire un backend métier complet pour gérer Projets, Notifications, Messages, et Formulaires (Devis, etc.)

---

## 📦 Stack Technologique

```
Frontend:
- Next.js 15.5.12 (App Router)
- React 19.1.0 (Server & Client Components)
- TypeScript 5
- Tailwind CSS 4

Backend/ORM:
- Prisma 7.4.2 (PostgreSQL)
- Better Auth 1.5.2 (Authentification)
- Redis (Secondary Storage)

Libraries métier:
- @hookform/resolvers + react-hook-form (Validation formulaires)
- zod 4.3.6 (Validation schémas)
- @tanstack/react-query 5.100.1 (Data fetching)
- recharts 2.15.4 (Visualisations)
- resend 6.12.2 (Email transactionnel)
- lucide-react (Icons)

Base de données:
- PostgreSQL 14+
- Migrations Prisma versionnées
```

---

## 🗂️ Architecture actuelle

```
app/
├── (auth)/                    # Routes authentification
│   ├── layout.tsx
│   ├── log-in/page.tsx       # Login avec OTP/Magic Link
│   ├── sign-up/page.tsx      # Registration
│   └── components/           # Social buttons, auth forms
│
├── (main)/                    # Pages publiques
│   ├── page.tsx              # Accueil
│   ├── about/page.tsx
│   └── _components/          # Header, Hero
│
├── (dashboard)/              # Zone authentifiée (protégée)
│   └── dashboard/[userId]/
│       ├── layout.tsx        # Sidebar + Navbar
│       ├── page.tsx          # Dashboard principal
│       ├── clients/page.tsx  # Liste clients
│       ├── quotes/page.tsx   # Devis
│       ├── invoices/page.tsx # Factures
│       ├── chat/page.tsx     # Messages
│       ├── notifications/page.tsx  # Notifications
│       ├── settings/page.tsx # Paramètres
│       ├── project/page.tsx  # Détails projet
│       └── _components/      # Widgets dashboard
│
├── api/
│   └── auth/[...all]/route.ts  # Better Auth routes
│
└── (root)
    ├── layout.tsx
    ├── error.tsx
    ├── loading.tsx
    ├── not-found.tsx

src/
├── lib/
│   ├── auth.ts              # Configuration Better Auth (OTP + Magic Link)
│   ├── prisma.ts            # Client Prisma
│   ├── redis.ts             # Cache secondaire
│   ├── routes.ts            # Constantes routes
│   └── utils.ts             # Helpers
│
├── components/
│   ├── features/            # Composants métier (Projets, TableauDeBord, etc.)
│   └── ui/                  # Components radix-ui + tailwind
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-session.ts       # Session utilisateur
│
└── contexts/
    └── query-provider.tsx   # React Query setup
```

---

## 🔐 Authentification (Better Auth)

**Configuration actuelle**:
```typescript
// src/lib/auth.ts
- Provider: PostgreSQL via Prisma
- Secondary Storage: Redis (OTP/Magic Link tokens)
- Plugins:
  ✓ Magic Link (5min expiration, 1 attempt)
  ✓ Email OTP (6 digits, 5min expiration, 5 attempts)
  ✓ OAuth: Google + GitHub
- Email transactionnel: Resend
```

**Modèle User existant**:
```prisma
model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]
}
```

---

## 📊 Dashboard existant

**Pages implémentées**:
- ✓ `/dashboard/[userId]` - Page d'accueil avec statistiques
- ✓ `/dashboard/[userId]/clients` - Gestion clients
- ✓ `/dashboard/[userId]/quotes` - Gestion devis
- ✓ `/dashboard/[userId]/invoices` - Gestion factures
- ✓ `/dashboard/[userId]/chat` - Messagerie
- ✓ `/dashboard/[userId]/notifications` - Centre notifications
- ✓ `/dashboard/[userId]/settings` - Paramètres

**Composants UI disponibles**:
- Sidebar navigation
- Dashboard navbar avec search
- Cards statistiques
- Charts (recharts)
- Messages feed
- Activity timeline
- Projet gallery avec filtres

---

## 🎯 Besoins Backend à Implémenter

### 1️⃣ **Modèle Prisma (à créer)**

```prisma
// Projets
model Project {
  id              String   @id @default(cuid())
  userId          String   @db.VarChar(255)
  titre           String
  description     String?  @db.Text
  categorie       String   // "Web", "Mobile", "DevOps", "Consulting"
  statut          String   @default("pending_validation") // pending, active, completed, archived
  budget          Decimal
  progression     Int      @default(0) // 0-100
  dateDebut       DateTime
  dateFin         DateTime?
  localisation    String?
  image           String?  @db.VarChar(500)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([statut])
}

// Notifications
model Notification {
  id              String   @id @default(cuid())
  userId          String
  titre           String
  message         String   @db.Text
  type            String   // "info", "warning", "error", "success"
  statut          String   @default("unread") // unread, read
  actionUrl       String?
  createdAt       DateTime @default(now())
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([statut])
  @@index([createdAt])
}

// Messages
model Message {
  id              String   @id @default(cuid())
  senderUserId    String
  receiverUserId  String
  contenu         String   @db.Text
  piecesJointes   String?  @db.VarChar(500)
  statut          String   @default("sent") // sent, delivered, read
  createdAt       DateTime @default(now())
  senderUser      User     @relation("MessagesSent", fields: [senderUserId], references: [id], onDelete: Cascade)
  receiverUser    User     @relation("MessagesReceived", fields: [receiverUserId], references: [id], onDelete: Cascade)

  @@index([senderUserId])
  @@index([receiverUserId])
  @@index([createdAt])
}

// Formulaires (Devis, Contact, etc.)
model Form {
  id              String   @id @default(cuid())
  userId          String?
  type            String   // "devis", "contact", "consultation", "feedback"
  titre           String
  donnees         Json     // Données dynamiques selon le type
  statut          String   @default("draft") // draft, submitted, approved, rejected
  email           String
  telephone       String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  user            User?    @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([type])
  @@index([statut])
}
```

### 2️⃣ **Types TypeScript**

```typescript
// app/types/database.ts
import { Project, Notification, Message, Form, User } from "@prisma/client";

// Domain models avec métadonnées
export type ProjectWithRelations = Project & {
  user?: User;
};

export type NotificationDTO = {
  id: string;
  titre: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  nonLu: boolean;
  creeLe: Date;
};

export type FormSubmission = {
  type: "devis" | "contact" | "consultation";
  email: string;
  donnees: Record<string, any>;
  pieces?: File[];
};

// Schémas Zod pour validation
export const schemaDevis = z.object({
  titre: z.string().min(3),
  description: z.string(),
  montant: z.number().positive(),
  duree: z.string(),
});

export type DevisFormData = z.infer<typeof schemaDevis>;
```

### 3️⃣ **Server Actions (app/api/actions/)**

```typescript
// app/api/actions/projects.ts
"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { ProjectSchema } from "@/app/types/database";

export async function createProject(data: ProjectSchema) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.project.create({
    data: { ...data, userId: session.user.id },
  });
}

export async function getProjectsByUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Unauthorized");

  return prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateProject(id: string, data: Partial<ProjectSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Vérifier ownership
  const project = await prisma.project.findUnique({ where: { id } });
  if (project?.userId !== session?.user?.id) throw new Error("Forbidden");

  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const project = await prisma.project.findUnique({ where: { id } });
  if (project?.userId !== session?.user?.id) throw new Error("Forbidden");

  return prisma.project.delete({ where: { id } });
}
```

### 4️⃣ **Client Components avec Server Actions**

```typescript
// app/(dashboard)/dashboard/[userId]/projects/page.tsx
"use client"

import { useEffect, useState } from "react";
import { getProjectsByUser } from "@/app/api/actions/projects";
import { ProjectCard } from "./_components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectsByUser().then(setProjects).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

---

## 🚀 Roadmap Backend

### Phase 1: Architecture Prisma
- [ ] Créer migrations pour Project, Notification, Message, Form
- [ ] Ajouter relations User 1-to-many
- [ ] Index sur userId, statut, createdAt

### Phase 2: Types & Validation
- [ ] Définir types TypeScript pour chaque entité
- [ ] Créer schémas Zod pour validation
- [ ] Exporter depuis `app/types/database.ts`

### Phase 3: Server Actions
- [ ] CRUD projects
- [ ] CRUD notifications (marquer comme lu, supprimer)
- [ ] CRUD messages (envoyer, récupérer conversations)
- [ ] CRUD forms (soumettre formulaires)

### Phase 4: Sécurité
- [ ] Vérifier ownership des ressources
- [ ] Ajouter permissions basées sur rôle
- [ ] Rate limiting sur actions sensibles
- [ ] Audit log pour opérations importantes

### Phase 5: Intégrations
- [ ] API Routes pour webhooks tiers
- [ ] Notifications push via socket.io (optionnel)
- [ ] Export PDF pour devis/factures
- [ ] Emails transactionnels

---

## 💡 Points clés d'implémentation

### Convention de nommage
```
Français pour domaine métier:
- Model: Projet, Notification, Message, Formulaire
- Variables: nomVariable, dateDebut, montantDevis
- Fichiers: types.ts, constants.ts, helpers.ts

Anglais pour infrastructure:
- Fonctions server actions: getProjectsByUser, createProject
- API routes: POST /api/projects, GET /api/notifications
```

### Pattern Server Actions
```typescript
// ✅ BON
"use server"
export async function actionName(data: ValidationSchema) {
  const session = await getSession(); // Vérifier auth
  if (!session) throw new Error("Unauthorized");

  const validated = schemaZod.parse(data); // Valider

  // Opération DB
  return prisma.model.operation(validated);
}

// ❌ MAUVAIS
export async function actionName(data: any) {
  // Pas de validation
  // Pas de vérification auth
  return prisma.model.operation(data);
}
```

### Composition Composants Client
```typescript
// app/(dashboard)/dashboard/[userId]/projects/_components/form-create-project.tsx
"use client"

import { createProject } from "@/app/api/actions/projects";
import { useFormStatus } from "react-dom";

export function FormCreateProject() {
  const { pending } = useFormStatus();

  return (
    <form action={createProject}>
      <input name="titre" required />
      <input name="description" />
      <button type="submit" disabled={pending}>
        {pending ? "Création..." : "Créer"}
      </button>
    </form>
  );
}
```

---

## 📌 Fichiers à créer

```
prisma/
└── schema.prisma              # Ajouter models Project, Notification, Message, Form

app/
├── api/
│   └── actions/
│       ├── projects.ts        # Server actions: CRUD projects
│       ├── notifications.ts   # Server actions: CRUD notifications
│       ├── messages.ts        # Server actions: CRUD messages
│       └── forms.ts           # Server actions: CRUD formulaires
│
├── types/
│   └── database.ts            # Types TypeScript + schémas Zod
│
└── (dashboard)/
    └── dashboard/[userId]/
        ├── projects/
        │   ├── page.tsx
        │   └── _components/
        │       ├── ProjectCard.tsx
        │       └── FormCreateProject.tsx
        │
        ├── devis/            # Nouveau: gestion devis
        │   ├── page.tsx
        │   └── _components/
        │
        └── messages/         # Nouveau: chat/messaging
            ├── page.tsx
            └── _components/
```

---

## 🔗 Références existantes

- **Auth**: `/src/lib/auth.ts` - Configuration Better Auth
- **Prisma Client**: `/src/lib/prisma.ts`
- **Types Dashboard**: `/src/components/features/TableauDeBord/TableauDeBord.types.ts`
- **Constantes**: `/src/lib/routes.ts`
- **Hooks**: `/src/hooks/use-session.ts`

---

## ⚡ Prochaines étapes recommandées

1. Migrer/améliorer le schéma Prisma pour Project, Notification, Message, Form
2. Créer les types TypeScript avec schémas Zod
3. Implémenter les Server Actions CRUD
4. Créer les composants UI pour chaque entité
5. Tester les permissions et ownership

**Prompt à utiliser pour IA**: *"En utilisant le contexte du PROJECT_CONTEXT.md, aide-moi à implémenter [feature]"*
