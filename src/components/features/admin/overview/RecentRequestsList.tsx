import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormRequest } from "@/lib/generated/prisma";
//import { formatDistanceToNow } from "date-fns";
//import { fr } from "date-fns/locale";

interface RecentRequestsListProps {
  requests: FormRequest[]; 
}

export function RecentRequestsList({ requests }: RecentRequestsListProps) {
  return (
    <Card className="border-none shadow-sm bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Demandes Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <Badge variant="outline" className="capitalize text-[10px]">
                    {req.type.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-sm">{req.nom}</div>
                  <div className="text-[10px] text-muted-foreground">{req.email}</div>
                </TableCell>

              { /* <TableCell className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale: fr })}
                </TableCell>
                */
              }
                <TableCell>
                  <Badge 
                    variant={req.statut === "NON_LU" ? "destructive" : "secondary"}
                    className="text-[10px]"
                  >
                    {req.statut.replace("_", " ")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                  Aucune demande récente.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
