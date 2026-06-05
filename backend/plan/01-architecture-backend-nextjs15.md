# 01. Architecture Backend dans Next.js 15

Le backend n'est plus une "boîte séparée" mais un invité invisible qui vit directement dans vos composants.

---

## 🧠 Modèle Mental

Imaginez un restaurant haut de gamme spécialisé dans la vidéosurveillance (Winall Tech). 

Dans un restaurant classique (architecture séparée), vous avez la salle (Frontend) et une cuisine fermée au bout d'un couloir (Backend). Vous passez commande via un serveur (API), il part dans la cuisine, et revient plus tard.

Dans **Next.js 15**, c'est comme une **Table de Chef**. La cuisine est intégrée à la table. Le chef prépare les ingrédients (données de la BDD) directement devant vous. Certains plats sont déjà prêts sur le comptoir (Static Rendering), d'autres sont cuisinés à la minute (Dynamic Rendering), mais tout se passe au même endroit. Vous n'avez plus besoin de crier pour que le serveur vous entende ; le chef est déjà là.

---

## 📌 Définition

L'architecture backend de Next.js 15 repose sur le **App Router**. C'est un environnement hybride où le code peut s'exécuter soit sur le serveur (Node.js/Edge), soit sur le navigateur. 

Le backend "vit" principalement dans les **Server Components** et les **Server Actions**. Contrairement aux anciennes versions, le serveur est désormais le citoyen de première classe : par défaut, tout composant dans le dossier `app/` est un composant serveur.

---

## 🎯 Objectif

Grâce à cette architecture, tu peux **récupérer les projets de BTP de Winall directement depuis la base de données Supabase sans créer d'API intermédiaire**. 

Au lieu de faire un `fetch('/api/projects')` dans un `useEffect`, tu écris simplement `const projects = await prisma.project.findMany()` directement dans ton composant React.

---

## 🔥 Problématique — Sans ça, ton app...

Sans cette architecture unifiée (si tu essayais de faire du React "à l'ancienne" dans Next.js), ton app :

1.  **Souffrirait du "Waterfall" de chargement** : L'utilisateur verrait d'abord une page vide, puis un spinner, puis enfin les données, car le navigateur doit attendre que le JS charge avant de demander les données au backend.
2.  **Serait moins sécurisée** : Tu serais tenté d'exposer tes clés API Supabase ou tes secrets de base de données dans le code client pour que le `fetch` fonctionne.
3.  **Afficherait des erreurs de type "Hydration Mismatch"** : Si le serveur et le client ne sont pas parfaitement synchronisés sur les données de sécurité, l'app plante au démarrage.

---

## 💻 Exemple Concret

Voici comment on affiche la liste des projets chez Winall Tech en utilisant le backend intégré.

```typescript
// app/projets/page.tsx
import prisma from "@/lib/prisma"; // Notre client BDD (Serveur uniquement)
import { ProjectCard } from "@/components/features/ProjectCard";

// Ce composant est un Server Component par défaut (Next.js 15)
export default async function ProjectsPage() {
  
  // 1. Récupération directe des données (Côté Serveur)
  // Pas de useEffect, pas de fetch HTTP interne. On parle à la BDD directement.
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Derniers Projets</h1>
      
      <div className="grid gap-4">
        {projects.map((item) => (
          // 2. On passe les données serveur aux composants (Client ou Serveur)
          <ProjectCard key={item.id} data={item} />
        ))}
      </div>
    </main>
  );
}
```

---

## 🔍 Explication Approfondie

### Le flux d'exécution
1.  **Requête** : L'utilisateur demande `winall.cm/projets`.
2.  **Exécution Serveur** : Next.js exécute `ProjectsPage` sur le serveur. Il attend que `prisma.project.findMany()` se termine.
3.  **Rendu RSC** : Next.js génère un format spécial (React Server Components Payload) qui contient la structure HTML et les données.
4.  **Réponse HTML** : Le serveur envoie du HTML pur au navigateur. L'utilisateur voit le contenu instantanément.
5.  **Hydratation** : Le navigateur télécharge le petit bout de JavaScript nécessaire pour rendre la page interactive (ex: boutons).

### Décisions de design
Next.js 15 privilégie le **Server-First**. L'idée est de réduire au maximum la quantité de JavaScript envoyée au client. Moins de JS = page plus rapide, surtout sur les réseaux mobiles.

---

## ⚠️ Erreurs Fréquentes

❌ **Ce qu'on fait souvent :**
Essayer d'utiliser `useState` ou `useEffect` dans un fichier de page sans mettre `"use client"`.
```typescript
export default async function Page() {
  const [data, setData] = useState([]); // ❌ ERREUR : useState n'existe pas sur le serveur
}
```

✅ **Ce qu'il faut faire :**
Garder la logique de données sur le serveur et ne créer des composants `"use client"` que pour l'interactivité.

💡 **Pourquoi :** Le serveur n'a pas d'état persistant dans le navigateur, il ne fait qu'exécuter une fonction et renvoyer le résultat.

---

## 🔗 Connexions dans la stack

- **[Prisma Schema]** → Définit la structure des données que le backend va lire → voir `03-prisma-schema.md`
- **[Server Actions]** → Permet au frontend d'envoyer des données au backend → voir `05-server-actions.md`
- **[Variables d'environnement]** → Sécurise les accès BDD du serveur → voir `02-variables-environnement.md`

**Liens pour apprendre plus :**
- 📖 [Next.js Documentation - Fundamentals](https://nextjs.org/docs/app/building-your-application/rendering/server-components) — Comprendre la différence entre Server et Client components.
- 🎥 [Next.js 15 Crash Course by Traversy Media](https://www.youtube.com/watch?v=Ze926WntP-w) — Une vue d'ensemble pratique de l'architecture.
- 📦 [How React Server Components work (Lee Robinson)](https://vercel.com/blog/how-react-server-components-work) — Une explication technique profonde par Vercel.
