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
import { MoreHorizontal, Eye, CheckCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

import type { Prisma } from "@/lib/generated/prisma";

type AdminRequest = Prisma.FormRequestGetPayload<{
  include: {
    project: {
      select: {
        id: true;
        titre: true;
      };
    };
  };
}>;

interface AdminRequestsTableProps {
  requests: AdminRequest[];
}

export function AdminRequestsTable({ requests }: AdminRequestsTableProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Type</TableHead>
            <TableHead>Expéditeur</TableHead>
            <TableHead>Projet</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id} className="hover:bg-muted/30 transition-colors">
              <TableCell>
                <Badge variant="outline" className="capitalize text-[10px]">
                  {req.type.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-sm">
                <div>{req.nom}</div>
                <div className="text-[10px] text-muted-foreground">{req.email}</div>
              </TableCell>
              <TableCell className="max-w-48 text-xs">
                {req.project ? (
                  <Link href={`/admin/projects/${req.project.id}`} className="font-medium text-primary hover:underline">
                    {req.project.titre}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">Non lié</span>
                )}
              </TableCell>
              <TableCell className="text-xs">
                {req.telephone || "Non renseigné"}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </TableCell>
              <TableCell>
                <Badge 
                  className="text-[10px]"
                  variant={
                    req.statut === "CLOS" ? "secondary" : 
                    req.statut === "NON_LU" ? "destructive" : "default"
                  }
                >
                  {req.statut.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link href="/admin/requests" className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> Détails
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <CheckCircle className="mr-2 h-4 w-4" /> Marquer clos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" /> Répondre
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                Aucune demande reçue.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
