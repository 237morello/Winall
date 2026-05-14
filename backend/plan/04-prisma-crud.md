# 04. Prisma CRUD (Create, Read, Update, Delete)

Le chef de chantier qui exécute tes ordres dans la base de données.

---

## 🧠 Modèle Mental

Si le schéma Prisma est le plan d'architecte, le **Prisma Client** (et ses opérations CRUD), c'est le **Chef de Chantier**.

Tu ne vas pas poser les briques toi-même (écrire du SQL : `INSERT INTO projets (titre) VALUES ('Video')`). Tu appelles ton chef de chantier avec ton talkie-walkie (TypeScript) et tu lui donnes des ordres clairs et sécurisés : "Construis un projet" (`prisma.project.create`), "Montre-moi les projets en cours" (`prisma.project.findMany`).

Le chef de chantier (Prisma Client) traduit tes ordres en instructions techniques (requêtes SQL optimisées) pour les ouvriers (PostgreSQL).

---

## 📌 Définition

Les opérations **CRUD** (Create, Read, Update, Delete) représentent les 4 actions fondamentales que l'on peut effectuer sur des données. 
Le client Prisma génère dynamiquement des méthodes TypeScript pour chaque modèle défini dans ton `schema.prisma` (ex: `prisma.project`, `prisma.user`), exposant ces 4 opérations de manière asynchrone (Promesses).

---

## 🎯 Objectif

Grâce aux méthodes CRUD de Prisma, tu peux **manipuler les données de Winall Tech depuis ton code backend Next.js de façon 100% sécurisée et auto-complétée par ton éditeur de code, sans jamais toucher à une ligne de SQL.**

---

## 🔥 Problématique — Sans ça, ton app...

Sans un ORM type-safe pour faire ton CRUD :

1. **Tu serais vulnérable aux Injections SQL** : Si tu concatènes des strings pour tes requêtes (`"SELECT * FROM users WHERE email = '" + req.body.email + "'"`), un attaquant pourrait envoyer `' OR 1=1; DROP TABLE users;` et détruire ta BDD. Prisma neutralise ça par défaut.
2. **Tu passerais ton temps à débugger** : Tu écrirais `UPDATE projets` au lieu de `UPDATE project`, l'erreur exploserait uniquement à l'exécution chez le client.
3. **Erreur observable avec Prisma** : Prisma te bloque *avant*. Si tu fais `prisma.project.create({ data: { titer: 'X' } })`, TypeScript te dit `Object literal may only specify known properties, and 'titer' does not exist`.

---

## 💻 Exemple Concret

Dans une Server Action Next.js pour créer un nouveau projet et le lier à un client.

```typescript
// app/api/actions/projects.ts
"use server"

import prisma from "@/lib/prisma";

// 1. CREATE : Créer une entrée
export async function createProject(data: { titre: string, budget: number, userId: string }) {
  // Prisma valide les types. Retourne l'objet complet créé.
  const newProject = await prisma.project.create({
    data: {
      titre: data.titre,
      budget: data.budget,
      statut: "en_attente",
      // Relation: On attache directement ce projet à l'utilisateur
      user: { connect: { id: data.userId } } 
    }
  });
  return newProject;
}

// 2. READ : Lire des entrées (avec filtrage et relations)
export async function getActiveProjects() {
  const projects = await prisma.project.findMany({
    where: { statut: "en_cours" },
    orderBy: { createdAt: "desc" },
    // On inclut les données de l'utilisateur lié ! (Comme un SQL JOIN)
    include: { user: true }, 
    take: 10 // Limite à 10 résultats
  });
  return projects;
}

// 3. UPDATE : Modifier une entrée existante
export async function markProjectCompleted(projectId: string) {
  return await prisma.project.update({
    where: { id: projectId },
    data: { statut: "termine" }
  });
}

// 4. DELETE : Supprimer une entrée
export async function deleteProject(projectId: string) {
  return await prisma.project.delete({
    where: { id: projectId }
  });
}
```

---

## 🔍 Explication Approfondie

### L'asynchronisme est obligatoire
Chaque appel Prisma (ex: `findMany`) retourne une `Promise`. Pourquoi ? Parce que Node.js (ton serveur) doit parler à Supabase (la BDD) à travers le réseau. Il **doit** utiliser `await` pour mettre la fonction en pause jusqu'à ce que Supabase réponde.

### Les relations profondes (Nested Writes)
La magie de Prisma se révèle dans sa capacité à gérer les relations. Dans un seul `create`, tu peux créer un Projet ET créer les Devis associés en même temps. Prisma va emballer cela dans une **Transaction SQL** : si l'un échoue, tout s'annule. Zéro donnée corrompue.

---

## ⚠️ Erreurs Fréquentes

❌ **Ce qu'on fait souvent :**
Oublier le mot-clé `await` devant l'appel Prisma.
```typescript
// ERREUR CLASSIQUE !
const project = prisma.project.findUnique({ where: { id: '1' } });
console.log(project.titre); // undefined ! 'project' est une Promise en attente, pas la donnée.
```

✅ **Ce qu'il faut faire :**
```typescript
const project = await prisma.project.findUnique({ where: { id: '1' } });
console.log(project?.titre); // Fonctionne. (Attention, project peut être null)
```

💡 **Pourquoi :** La base de données n'est pas instantanée. Il faut dire à JavaScript d'attendre la réponse du réseau.

---

## 🔗 Connexions dans la stack

- **[Prisma Schema]** → La base qui génère ces fonctions → voir `03-prisma-schema.md`
- **[Server Actions]** → L'endroit idéal pour exécuter tes CREATE/UPDATE/DELETE → voir `05-server-actions.md`

**Liens pour apprendre plus :**
- 📖 [Prisma Client CRUD Docs](https://www.prisma.io/docs/concepts/components/prisma-client/crud) — La documentation des requêtes avec plein d'exemples.
- 📦 [Prisma Relational Queries](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries) — Comment gérer les `include` et `connect`.
