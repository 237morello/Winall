export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Espace Administration</h1>
        <p className="text-muted-foreground">
          Bienvenue sur le panneau de contrôle de Winall Tech Sarl.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder pour les statistiques admin */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium">Utilisateurs</h3>
          <div className="mt-2 text-2xl font-bold">--</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium">Projets en cours</h3>
          <div className="mt-2 text-2xl font-bold">--</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium">Demandes de devis</h3>
          <div className="mt-2 text-2xl font-bold">--</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium">Revenu total</h3>
          <div className="mt-2 text-2xl font-bold">-- FCFA</div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-12 text-center shadow-sm">
        <p className="text-muted-foreground">
          Les modules d'administration seront bientôt intégrés ici.
        </p>
      </div>
    </div>
  );
}
