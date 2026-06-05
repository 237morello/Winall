import prisma from "@/lib/prisma";
import { AdminUserForm } from "@/components/features/admin/users/AdminUserForm";
import { notFound } from "next/navigation";

interface EditUserPageProps {
  params: Promise<{ userId: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modifier l&apos;Utilisateur</h1>
        <p className="text-muted-foreground">
          Mettez à jour les informations du profil ou changez le rôle de {user.name}.
        </p>
      </div>

      <AdminUserForm initialData={user} userId={user.id} />
    </div>
  );
}
