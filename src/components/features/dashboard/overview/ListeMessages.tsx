/**
 * MISSION : Composant Dashboard — ListeMessages affiche les notifications de chat.
 * Migration : Utilisation de DashboardService et UI raffinée.
 */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MessageTableauDeBord } from "@/types/dashboard.types";
import { cn } from "@/lib/utils";

interface ListeMessagesProps {
  messages: MessageTableauDeBord[];
}

export function ListeMessages({ messages }: ListeMessagesProps) {
  const params = useParams<{ userId: string }>();

  return (
    <Card className="border-border/50 bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 py-4">
        <CardTitle className="text-base font-bold">Messages récents</CardTitle>
        <Link
          href={`/dashboard/${params.userId}/chat`}
          className="text-xs font-bold text-p hover:underline underline-offset-4"
        >
          Voir tout →
        </Link>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={msg.identifiant}
            className={cn(
              "group relative flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-all hover:bg-p/5 hover:border-p/20 animate-in fade-in slide-in-from-left-2 duration-300 ease-out",
              msg.nonLu && "bg-muted/40"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarFallback className="bg-p/10 text-p font-bold text-xs">
                {msg.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-bold text-foreground">{msg.expediteur}</span>
                <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{msg.moment}</span>
              </div>
              <p className={cn("truncate text-xs", msg.nonLu ? "font-bold text-foreground" : "text-muted-foreground")}>
                {msg.sujet}
              </p>
              <p className="truncate text-[11px] text-muted-foreground/80">{msg.extrait}</p>
              
              <div className="flex items-center gap-2 pt-1">
                {msg.nonLu && (
                  <span className="flex h-2 w-2 rounded-full bg-p" />
                )}
                {msg.prioritaire && (
                  <Badge className="rounded-md bg-destructive/10 text-destructive border-none px-1.5 py-0 text-[9px] font-bold uppercase tracking-wider">
                    Urgent
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
