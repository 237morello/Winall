import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero Skeleton */}
      <div className="space-y-8 py-6">
        <div className="space-y-6 flex flex-col items-center">
          {/* Titre "Bonjour..." */}
          <Skeleton className="h-12 w-64 md:h-16 md:w-96 rounded-2xl" />
          
          {/* Barre de recherche */}
          <Skeleton className="h-16 w-full max-w-2xl rounded-2xl" />
        </div>

        {/* Grille de Services Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center p-4 rounded-2xl border border-border/50 space-y-3">
              <Skeleton className="size-12 rounded-xl" />
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-3 w-24 rounded hidden md:block" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Actions Rapides Skeleton (3 Cartes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl border border-border/50" />
        ))}
      </div>

      {/* 3. Section "Quoi de neuf" Skeleton */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
