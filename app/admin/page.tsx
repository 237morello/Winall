import { redirect } from "next/navigation";

/**
 * /admin n'a pas de tableau de bord propre : on redirige vers la vue
 * "Système & ressources", qui sert de page d'accueil de l'espace admin.
 */
export default function AdminIndexPage() {
  redirect("/admin/systeme");
}
