import { AdminUserForm } from "@/components/features/admin/users/AdminUserForm";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nouvel Utilisateur</h1>
        <p className="text-muted-foreground">
          Créez manuellement un compte client ou administrateur.
        </p>
      </div>

      <AdminUserForm />
    </div>
  );
}
