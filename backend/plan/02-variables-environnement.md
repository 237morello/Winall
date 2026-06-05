# 02. Variables d'Environnement

Le coffre-fort de ton application : là où dorment tes secrets industriels.

---

## 🧠 Modèle Mental

Imagine que tu installes un système de vidéosurveillance haut de gamme chez un client Winall Tech. 

Il y a deux types d'informations :
1. **Les informations publiques** : L'emplacement des caméras. Tout le monde peut les voir. C'est le `NEXT_PUBLIC_`.
2. **Le code du coffre-fort** : Le mot de passe administrateur du NVR. Si tu l'écris au marqueur sur le mur, n'importe qui peut effacer les preuves. C'est ta **Variable d'Environnement Secrète**.

Dans ton code, les variables d'environnement sont des étiquettes que tu colles sur ton code, mais dont la valeur réelle est cachée dans un fichier `.env` que tu ne donnes jamais à personne (et surtout pas à GitHub).

---

## 📌 Définition

Les variables d'environnement sont des paires clé-valeur globales utilisées pour configurer ton application sans modifier le code source. 

- **Côté Serveur** : Accessibles via `process.env.MA_VARIABLE`.
- **Côté Client** : Accessibles uniquement si elles commencent par `NEXT_PUBLIC_`.
- **Où vivent-elles ?** Dans le fichier `.env` localement, et dans les réglages Vercel/Supabase en production.

---

## 🎯 Objectif

Grâce aux variables d'environnement, tu peux **connecter ton application à ta base de données Supabase de test pendant que tu développes, et basculer sur la base de production lors du déploiement, sans changer une seule ligne de code.**

---

## 🔥 Problématique — Sans ça, ton app...

Sans une gestion rigoureuse des variables d'environnement :

1. **Tu te ferais pirater** : Si tu "hardcodes" ton `DATABASE_URL` dans ton fichier `prisma/schema.prisma` et que tu le push sur GitHub, des bots vont voler tes données.
2. **Ton app serait rigide** : Pour passer du mode "Dev" au mode "Prod", tu devrais modifier manuellement les URL partout dans ton code.
3. **Erreur observable** : Tu verrais des erreurs du type `Invalid connection string` au moment du build si Prisma ne trouve pas l'URL.

---

## 💻 Exemple Concret

Voici comment configurer correctement tes accès Supabase pour Winall Tech.

```bash
# .env (À NE JAMAIS COMMIT !)
# Utilisé par Prisma pour les opérations de base
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-eu.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxx:password@aws-0-eu.pooler.supabase.com:5432/postgres"

# Clé secrète pour Better Auth
BETTER_AUTH_SECRET="une-tres-longue-chaine-aleatoire"

# Variable publique
NEXT_PUBLIC_COMPANY_NAME="Winall Tech Sarl"
```

```typescript
// app/layout.tsx (Usage de la variable publique)
export default function RootLayout() {
  // ✅ Accessible sur le client car préfixé par NEXT_PUBLIC_
  return <h1>Bienvenue chez {process.env.NEXT_PUBLIC_COMPANY_NAME}</h1>;
}

// src/lib/auth.ts (Usage de la variable secrète)
export const auth = createAuth({
  // ❌ process.env.DATABASE_URL serait 'undefined' sur le navigateur !
  // ✅ Fonctionne ici car ce fichier n'est utilisé que par le serveur
  secret: process.env.BETTER_AUTH_SECRET,
});
```

---

## 🔍 Explication Approfondie

### Le flux d'exécution
1. **Build Time** : Next.js scanne ton code. S'il voit `NEXT_PUBLIC_`, il remplace directement le texte par la valeur.
2. **Runtime (Serveur)** : Quand ton Server Component s'exécute, il demande à Node.js de lire la valeur dans la mémoire du serveur.

### Sécurité TypeScript
On utilise souvent un schéma **Zod** pour valider que les variables sont bien présentes dès le démarrage. Si une variable manque, l'app refuse de démarrer.

---

## ⚠️ Erreurs Fréquentes

❌ **Ce qu'on fait souvent :**
Oublier d'ajouter le fichier `.env` dans le `.gitignore`.
```bash
# Erreur fatale : ton mot de passe se retrouve sur Internet
git add .env
```

✅ **Ce qu'il faut faire :**
Créer un fichier `.env.example` qui contient les clés mais pas les valeurs, et le commit.

💡 **Pourquoi :** Le `.env` contient des secrets, le `.env.example` contient la structure.

---

## 🔗 Connexions dans la stack

- **[Prisma Schema]** → Utilise `DATABASE_URL` → voir `03-prisma-schema.md`
- **[Better Auth]** → Utilise `BETTER_AUTH_SECRET` pour chiffrer les sessions.

**Liens pour apprendre plus :**
- 📖 [Next.js Docs - Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- 🎥 [Environment Variables in 100 Seconds by Fireship](https://www.youtube.com/watch?v=17X2isV9_fA)
- 📦 [T3 Env](https://env.t3.gg/) — Typer tes variables avec Zod.
