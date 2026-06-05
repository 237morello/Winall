# 05. Server Actions (Next.js 15)

Le pont invisible et sécurisé entre ton navigateur client et ton serveur backend.

---

## 🧠 Modèle Mental

Imagine le guichet sécurisé d'une banque Winall (ou la loge du gardien). 

Avant, pour faire un virement (sauvegarder une donnée), le client (Navigateur) devait écrire une lettre formelle, la mettre dans une enveloppe (Fetch API), l'envoyer par la poste (Route HTTP `/api/transfert`), et la banque devait ouvrir, lire, vérifier et valider.

Avec les **Server Actions**, c'est comme si le client avait une **ligne rouge sécurisée directement reliée au directeur de la banque**. Tu appelles une fonction JavaScript standard depuis ton bouton dans le navigateur, et Next.js s'occupe de construire l'enveloppe, faire l'appel HTTP caché, et te ramener la réponse. C'est magique, mais c'est bien une requête réseau sous le capot.

---

## 📌 Définition

Les Server Actions sont des fonctions asynchrones exécutées **strictement sur le serveur**. Elles sont définies par la directive `"use server"`.
Elles peuvent être appelées :
1. Directement depuis des **Server Components**.
2. Passées en tant que props à des **Client Components** (par exemple, pour la prop `action` d'un `<form>` ou dans un `onClick`).

---

## 🎯 Objectif

Grâce aux Server Actions, tu peux **créer un nouveau devis dans la base de données directement depuis un formulaire React, sans avoir à créer manuellement une API, gérer les fetch, ou configurer des headers CORS.**

---

## 🔥 Problématique — Sans ça, ton app...

Sans Server Actions (l'ancienne méthode React SPA) :

1. **Du code "Glue" partout** : Tu dois créer un fichier `app/api/devis/route.ts` juste pour recevoir le devis. Ensuite, côté client, tu dois écrire `fetch('/api/devis', { method: 'POST', body: JSON.stringify(data) })`. C'est lourd et répétitif.
2. **Pas de typage de bout en bout** : Le résultat de ton `fetch` est `any`. Si tu changes la structure de ta réponse serveur, ton client ne s'en rend pas compte et plante.
3. **Erreur de synchro** : Après avoir créé la donnée, tu dois gérer manuellement l'état global (Redux, React Query) pour dire au tableau de bord "Hey, affiche le nouveau devis !". Avec Next.js, `revalidatePath` recharge tout automatiquement.

---

## 💻 Exemple Concret

Voici l'action pour supprimer un projet Winall.

```typescript
// app/api/actions/projects.ts
"use server" // 👈 Cette ligne est MAGIQUE. Elle dit: "Ce code ne tourne QUE sur le serveur"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth"; // Better Auth
import { headers } from "next/headers";

// 1. Définition de l'action
export async function deleteProject(projectId: string) {
  // 🛡️ ÉTAPE 1 : TOUJOURS VÉRIFIER L'AUTHENTIFICATION
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Non autorisé");

  // 💾 ÉTAPE 2 : EXÉCUTER L'ACTION EN BDD
  await prisma.project.delete({
    where: { id: projectId }
  });

  // 🔄 ÉTAPE 3 : RAFRAÎCHIR LE CACHE NEXT.JS
  // Cela force la page /dashboard à se recharger avec les nouvelles données
  revalidatePath("/dashboard"); 
}
```

```typescript
// app/components/DeleteButton.tsx
"use client" // Côté navigateur !

import { deleteProject } from "@/app/api/actions/projects";

export function DeleteButton({ id }: { id: string }) {
  // 2. Appel de l'action directement depuis le client !
  return (
    <button onClick={() => deleteProject(id)} className="text-red-500">
      Supprimer le projet
    </button>
  );
}
```

---

## 🔍 Explication Approfondie

### Le flux d'exécution
1. Le client clique sur le bouton.
2. React intercepte l'appel de fonction `deleteProject(id)`.
3. Sous le capot, Next.js transforme cet appel en une requête HTTP **POST** vers une URL cachée générée automatiquement par Next.js.
4. Le serveur reçoit la requête POST, valide la sécurité, et exécute ta fonction TypeScript backend.
5. Le serveur répond (JSON ou redirection).

### revalidatePath
C'est le pouvoir ultime des Server Actions. Plutôt que de gérer du "state" client complexe, tu dis au serveur : "La page X a des données obsolètes". Le serveur recalcule la page et envoie le nouveau HTML au client instantanément.

---

## ⚠️ Erreurs Fréquentes

❌ **Ce qu'on fait souvent :**
Faire confiance aux données envoyées par le client sans les valider.
```typescript
"use server"
export async function updateBudget(data: any) {
  // Danger ! L'utilisateur pourrait envoyer { budget: -9999, userId: "admin_id" }
  await prisma.project.update({ data }); 
}
```

✅ **Ce qu'il faut faire :**
TOUJOURS valider les inputs avec Zod, et TOUJOURS vérifier la session de l'utilisateur (auth).

💡 **Pourquoi :** Une Server Action est juste un endpoint API caché. N'importe qui peut l'appeler via Postman ou la console du navigateur s'il trouve l'URL cachée.

---

## 🔗 Connexions dans la stack

- **[Zod Validation]** → Comment sécuriser les inputs d'une Server Action → voir `zod-validation.md`
- **[Prisma CRUD]** → La logique que tu mets dans tes actions → voir `04-prisma-crud.md`

**Liens pour apprendre plus :**
- 📖 [Next.js Docs - Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- 🎥 [Server Actions Crash Course (Next.js 14/15)](https://www.youtube.com/watch?v=dDpZfOQBMaU)
