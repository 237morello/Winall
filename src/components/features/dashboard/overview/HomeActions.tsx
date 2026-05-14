/**
 * MISSION : Composant Dashboard — HomeActions affiche les 3 cartes principales de la page d'accueil.
 */
"use client";

import { 
  Plus, 
  FolderKanban, 
  FileText, 
  MessageSquare,
  ChevronRight,
  Clock,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HomeActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      {/* Carte 1 : Projets Récents */}
      <Card className="border-border/50 bg-card/50 shadow-sm overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <FolderKanban className="size-4 text-primary" />
            Projets Récents
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
              <div className="size-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs">VH</div>
              <div className="flex-1">
                <p className="text-xs font-bold truncate">Villa Horizon</p>
                <p className="text-[10px] text-muted-foreground">Mise à jour il y a 2h</p>
              </div>
              <ChevronRight className="size-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="flex items-center gap-3 p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
              <div className="size-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-xs">HA</div>
              <div className="flex-1">
                <p className="text-xs font-bold truncate">Hôtel Azur</p>
                <p className="text-[10px] text-muted-foreground">Terminé</p>
              </div>
              <ChevronRight className="size-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <Button variant="link" className="text-xs p-0 h-auto text-primary" asChild>
            <Link href="/dashboard/projects">Voir tous les projets</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Carte 2 : Nouvel Espace (Formulaires) */}
      <Card className="border-border/50 bg-primary/5 shadow-md overflow-hidden flex flex-col items-center justify-center text-center p-6 border-dashed border-2">
        <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4">
          <FileText className="size-8" />
        </div>
        <h3 className="font-bold text-lg mb-2">Créer un espace</h3>
        <p className="text-xs text-muted-foreground mb-6 max-w-[200px]">
          Lancez un nouveau devis ou une demande d'intervention en un clic.
        </p>
        <Button className="rounded-xl px-8 gap-2 shadow-lg shadow-primary/20">
          <Plus className="size-4" />
          Nouvel espace
        </Button>
      </Card>

      {/* Carte 3 : Outils & Messages */}
      <Card className="border-border/50 bg-card/50 shadow-sm overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            Messages récents
          </CardTitle>
          <ChevronRight className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/50">
              <Clock className="size-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-[10px] font-bold">Admin Winall</p>
                <p className="text-[10px] text-muted-foreground line-clamp-1 italic">"Le planning est prêt..."</p>
              </div>
              <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full bg-primary/10 text-primary">
                <Send className="size-3" />
              </Button>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-border/20">
             <div className="flex flex-wrap gap-2">
                <div className="px-2 py-1 rounded-md bg-accent text-[9px] font-medium text-accent-foreground">#support</div>
                <div className="px-2 py-1 rounded-md bg-accent text-[9px] font-medium text-accent-foreground">#factures</div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
