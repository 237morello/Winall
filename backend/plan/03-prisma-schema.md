# 03. Prisma Schema

Le plan architectural de ta base de données, l'unique source de vérité.

---

## 🧠 Modèle Mental

Le fichier `schema.prisma`, c'est exactement comme le **plan d'architecte (Blueprint)** d'un bâtiment en Génie Civil chez Winall Tech.

Avant de couler le béton (créer les tables PostgreSQL), l'architecte dessine un plan précis : ici une porte, là un mur porteur, cette pièce est reliée à ce couloir. 
Si l'équipe de construction (la base de données) et l'équipe d'aménagement (ton code TypeScript) n'ont pas le même plan, les meubles ne rentreront pas dans la pièce.

Le `schema.prisma` est ce plan commun. Il décrit la structure exacte de tes données, et Prisma s'assure que la BDD Supabase et ton code Next.js sont parfaitement alignés.

---

## 📌 Définition

Le `schema.prisma` est le fichier de configuration principal de Prisma ORM. Il accomplit trois choses :
1. **Datasource** : Indique où se trouve la base de données (Supabase PostgreSQL).
2. **Generator** : Demande à Prisma de générer un client TypeScript fortement typé.
3. **Models** : Définit tes tables de base de données, leurs colonnes et leurs relations.

---

## 🎯 Objectif

Grâce au `schema.prisma`, tu peux **modéliser les entités métier de Winall (Projets, Devis, Utilisateurs) dans un langage lisible, et obtenir une autocomplétion parfaite dans ton code TypeScript.** 

---

## 🔥 Problématique — Sans ça, ton app...

Sans un schéma ORM déclaratif comme Prisma :

1. **Le cauchemar des requêtes brutes** : Tu devrais écrire du SQL brut (`SELECT * FROM users WHERE...`) en priant pour ne pas avoir fait de faute de frappe.
2. **L'enfer des types** : TypeScript ne saurait pas ce que retourne ta base de données. Ton code serait rempli de `any`.
3. **Erreur observable** : Si tu renommes une colonne dans ta DB sans ORM, tu le découvriras en production avec une erreur `Column 'titre' does not exist`. Avec Prisma, TypeScript te crie dessus *avant* même de démarrer l'app.

---

## 💻 Exemple Concret

Modélisons un Projet pour le tableau de bord Winall.

```prisma
// prisma/schema.prisma

// 1. Le Générateur (Crée le code TypeScript)
generator client {
  provider = "prisma-client-js"
}

// 2. La Source de données (Supabase)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 3. Le Modèle (La table en base de données)
model Project {
  id          String   @id @default(cuid()) // Clé primaire auto-générée
  titre       String   // Colonne texte requise
  description String?  // Le "?" signifie optionnel (NULL en SQL)
  budget      Decimal  // Type précis pour l'argent
  statut      String   @default("en_attente") // Valeur par défaut
  
  // Relation : Un projet appartient à un Utilisateur
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  createdAt   DateTime @default(now())

  // Index pour accélérer les recherches sur l'interface
  @@index([userId])
  @@index([statut])
}
```

---

## 🔍 Explication Approfondie

### Le flux d'exécution
Quand tu modifies ce fichier, tu dois lancer `npx prisma generate`.
1. Prisma analyse ton fichier `.prisma`.
2. Il génère des milliers de lignes de TypeScript dans `node_modules/.prisma/client`.
3. Ton éditeur (VSCode) lit ces types et te donne une autocomplétion parfaite (`prisma.project.findUnique(...)`).

### Types natifs vs Types Prisma
Prisma abstrait les types de la BDD. Un `String` Prisma devient un `text` dans PostgreSQL. Si tu as besoin d'un type très spécifique de Postgres (ex: `varchar(255)`), tu peux utiliser l'annotation `@db.VarChar(255)`.

### Les Relations
La force de Prisma réside dans sa syntaxe de relations. Le `@relation` indique à Prisma comment joindre les tables. Dans Postgres, cela créera une **Foreign Key** Constraint (Contrainte de clé étrangère).

---

## ⚠️ Erreurs Fréquentes

❌ **Ce qu'on fait souvent :**
Ajouter un champ dans `schema.prisma` et essayer de l'utiliser tout de suite dans le code.
```typescript
// Erreur TypeScript : Property 'nouveauChamp' does not exist on type 'Project'
```

✅ **Ce qu'il faut faire :**
Toujours exécuter la commande de génération après une modification.
```bash
npx prisma db push  # Ou prisma migrate dev
npx prisma generate # Met à jour le client TypeScript
```

💡 **Pourquoi :** Ton code importe les types depuis le dossier généré, pas directement depuis le fichier texte `.prisma`.

---

## 🔗 Connexions dans la stack

- **[Prisma CRUD]** → Comment utiliser ces modèles dans le code → voir `04-prisma-crud.md`
- **[Variables d'environnement]** → D'où vient `env("DATABASE_URL")` → voir `02-variables-environnement.md`

**Liens pour apprendre plus :**
- 📖 [Prisma Data Model Docs](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model) — Comprendre tous les types disponibles.
- 🎥 [Prisma in 100 Seconds](https://www.youtube.com/watch?v=EedOqH_wBmg) — Introduction ultra-rapide.
