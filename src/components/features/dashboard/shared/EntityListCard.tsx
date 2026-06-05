/**
 * MISSION : Composant Dashboard — entity-list-card gère l'affichage des listes d'entités (Clients, Devis, etc.).
 */
"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardService } from "@/services/dashboard.service";
import type { BusinessStatus } from "@/types/dashboard.types";

export interface ListColumn<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
}

interface EntityListCardProps<T> {
  title: string;
  description: string;
  icon: LucideIcon;
  rows: T[];
  columns: Array<ListColumn<T>>;
  searchPlaceholder: string;
  searchableText: (row: T) => string;
  statusAccessor: (row: T) => BusinessStatus;
}

const PAGE_SIZE = 4;

export function EntityListCard<T>({
  title,
  description,
  icon: Icon,
  rows,
  columns,
  searchPlaceholder,
  searchableText,
  statusAccessor,
}: EntityListCardProps<T>) {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<BusinessStatus | "all">("all");
  const [page, setPage] = useState(1);

  const availableStatuses = useMemo(() => {
    return Array.from(new Set(rows.map(statusAccessor)));
  }, [rows, statusAccessor]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery = searchableText(row).toLowerCase().includes(normalized);
      const matchesStatus = selectedStatus === "all" || statusAccessor(row) === selectedStatus;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, selectedStatus, searchableText, statusAccessor]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));

  const paginatedRows = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [filteredRows, page, totalPages]);

  const currentPage = Math.min(page, totalPages);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Icon className="h-5 w-5 text-p" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="pl-9 bg-background/50"
              placeholder={searchPlaceholder}
            />
          </div>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value as BusinessStatus | "all");
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-[190px] bg-background/50">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {DashboardService.statusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="py-12 text-center text-muted-foreground">
                    Aucun résultat pour les filtres actuels.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                  <TableRow key={`${searchableText(row)}-${index}`} className="hover:bg-muted/20 transition-colors">
                    {columns.map((column) => (
                      <TableCell key={column.key} className="py-4 font-medium">{column.render(row)}</TableCell>
                    ))}
                    <TableCell>
                      <Badge variant={DashboardService.statusVariant(statusAccessor(row))} className="font-semibold">
                        {DashboardService.statusLabel(statusAccessor(row))}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            {filteredRows.length} élément(s) - page {currentPage}/{totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg h-8"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Précédent
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg h-8"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            >
              Suivant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
