# 06. Route Handlers

L'API REST standard pour communiquer avec le monde extérieur.

---

## 🧠 Modèle Mental

Si les **Server Actions** sont le téléphone interne sécurisé entre tes bureaux (ton frontend Next.js et ton backend), les **Route Handlers** sont le **Standard Téléphonique Public** de l'entreprise Winall Tech.

N'importe qui de l'extérieur — une application mobile Flutter, un webhook de paiement Stripe, ou une caméra Dahua qui envoie une alerte — peut appeler un numéro public (une URL comme `/api/webhooks`) et laisser un message. 

Le Route Handler reçoit la requête externe, l'analyse, et répond dans une langue universelle (souvent du JSON).

---

## 📌 Définition

Les Route Handlers vous permettent de créer des **endpoints d'API personnalisés** pour une route donnée en utilisant les objets standards du Web : `Request` et `Response`. 

Ils vivent dans le dossier `app/` et le fichier doit s'appeler obligatoirement `route.ts`. Ils exportent des fonctions nommées d'après les verbes HTTP (`GET`, `POST`, `PUT`, `DELETE`).

---

## 🎯 Objectif

Grâce aux Route Handlers, tu peux **créer une API publique pour l'application mobile Winall afin qu'elle puisse récupérer la liste des clients, indépendamment de l'interface web Next.js.**

---

## 🔥 Problématique — Sans ça, ton app...

Si tu n'utilisais que des Server Actions :

1. **Système fermé** : Les Server Actions sont conçues pour React/Next.js. Si demain Winall Tech demande une app mobile iOS native, l'app ne pourra pas communiquer avec ton backend.
2. **Impossible de gérer les Webhooks** : Quand ton fournisseur d'emails (Resend) veut t'envoyer un accusé de réception, il fait une requête POST standard. Il ne comprend pas le format magique des Server Actions.
3. **Erreur observable** : Tu essaierais de brancher un service externe sur une Action et tu obtiendrais des erreurs CORS ou un format de payload incompréhensible.

---

## 💻 Exemple Concret

Créons une API REST basique pour récupérer les notifications d'un utilisateur, utilisable par n'importe quel client externe.

```typescript
// app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 1. On définit la méthode HTTP (ici GET)
export async function GET(request: NextRequest) {
  try {
    // 2. Extraire les paramètres de l'URL (ex: /api/notifications?limit=5)
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");

    // TODO: En réalité, vérifier le Token d'authentification dans les headers ici !

    // 3. Lire les données
    const notifications = await prisma.notification.findMany({
      take: limit,
      orderBy: { createdAt: "desc" }
    });

    // 4. Renvoyer une réponse JSON standard avec un code de succès (200)
    return NextResponse.json({ success: true, data: notifications });

  } catch (error) {
    // 5. Gestion d'erreur propre
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

---

## 🔍 Explication Approfondie

### NextRequest et NextResponse
Next.js étend les API standards du web. `NextRequest` te donne des outils utiles comme `.nextUrl` pour lire facilement l'URL. `NextResponse.json()` est un raccourci pour renvoyer du texte au format JSON avec les bons headers `Content-Type`.

### Quand utiliser Route Handlers vs Server Actions ?
- **Server Action** : Un formulaire cliqué par un humain sur ton site Next.js (Ex: "Créer un devis").
- **Route Handler** : 
  - API pour application Mobile.
  - Webhook de paiement.
  - API publique pour des partenaires.

---

## ⚠️ Erreurs Fréquentes

❌ **Ce qu'on fait souvent :**
Mettre de la logique React ou renvoyer des composants JSX dans un `route.ts`.
```typescript
// ERREUR FATALE !
export async function GET() {
  return <div>Mon contenu</div>; // Un route handler renvoie des DATA, pas du composant.
}
```

✅ **Ce qu'il faut faire :**
Utiliser `NextResponse` ou `Response` pur pour renvoyer des données brutes (JSON, texte, XML).

💡 **Pourquoi :** Un route handler est consommé par des machines ou des scripts HTTP, pas par un navigateur web attendant du HTML mis en forme.

---

## 🔗 Connexions dans la stack

- **[Server Actions]** → L'alternative "Next.js native" aux Route Handlers → voir `05-server-actions.md`
- **[Better Auth]** → Les routes `/api/auth/[...all]/route.ts` utilisent ce pattern sous le capot pour gérer les logins.

**Liens pour apprendre plus :**
- 📖 [Next.js Docs - Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- 🎥 [Route Handlers Crash Course - Next.js 14+](https://www.youtube.com/watch?v=O1k9bU_J2h0)
