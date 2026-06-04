"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Project, User } from "@/lib/generated/prisma";
import { deleteProject } from "@/actions/project.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectWithUser extends Project {
  user?: Partial<User> | null;
}

interface AdminProjectsTableProps {
  projects: ProjectWithUser[];
}

export function AdminProjectsTable({ projects }: AdminProjectsTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) {
      return;
    }

    try {
      setIsDeleting(id);
      const result = await deleteProject(id);
      if (result.success) {
        toast.success("Projet supprimé avec succès");
        router.refresh();
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[300px]">Projet</TableHead>
            <TableHead>Domaine</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Visibilité</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">
                <div>{project.titre}</div>
                <div className="text-[10px] text-muted-foreground line-clamp-1">{project.localisation || "Non spécifié"}</div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] font-normal">
                  {project.domaine}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  className="text-[10px]"
                  variant={
                    project.statut === "TERMINE" ? "default" : 
                    project.statut === "EN_COURS" ? "secondary" : "outline"
                  }
                >
                  {project.statut.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {project.user?.name || "Sans client"}
              </TableCell>
              <TableCell>
                <Badge variant={project.isPublic ? "default" : "outline"} className="text-[10px]">
                  {project.isPublic ? "Public" : "Privé"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isDeleting === project.id}>
                      {isDeleting === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoreHorizontal className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/projects/${project.id}/edit`} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" /> Modifier
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive cursor-pointer"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {projects.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                Aucun projet trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
