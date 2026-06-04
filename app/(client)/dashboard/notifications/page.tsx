import { getNotifications, markAllAsRead } from "@/actions/notification.actions";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck, Info, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <Typography variant="h1" className="text-3xl font-extrabold tracking-tight">Notifications</Typography>
          <Typography variant="p" className="text-muted-foreground italic">Restez informé de l&apos;activité sur vos projets.</Typography>
        </div>
        <form action={async () => {
          "use server";
          await markAllAsRead();
        }}>
          <Button variant="outline" className="rounded-2xl border-p/30 text-p hover:bg-p/5 font-bold text-xs h-10 px-6">
            <CheckCheck className="mr-2 size-4" /> Tout marquer comme lu
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card className="border-dashed border-border/50 py-20 rounded-3xl">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Bell className="size-16 text-muted-foreground" />
              <Typography variant="p" className="font-medium">Vous n&apos;avez aucune notification pour le moment.</Typography>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notif) => (
            <Card key={notif.id} className={cn(
              "border-border/50 rounded-2xl transition-all hover:shadow-xl hover:shadow-p/5 group overflow-hidden",
              !notif.lu ? "bg-p/5 border-p/20" : "bg-card"
            )}>
              <CardContent className="p-6 flex items-start gap-5">
                <div className={cn(
                  "p-3 rounded-xl shrink-0",
                  !notif.lu ? "bg-p text-white shadow-lg shadow-p/20" : "bg-muted text-muted-foreground"
                )}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <Typography variant="h4" className="text-base font-bold group-hover:text-p transition-colors">{notif.titre}</Typography>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {new Date(notif.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <Typography variant="p" className="text-sm text-muted-foreground leading-relaxed">{notif.message}</Typography>
                  
                  {notif.lienUrl && (
                    <div className="pt-3">
                      <Link href={notif.lienUrl} className="text-xs font-bold text-p hover:underline flex items-center gap-1.5">
                        Consulter <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function getIcon(type: string) {
  switch (type) {
    case "PROJET_DEBUT": return <Info className="size-5" />;
    case "PROJET_TERMINE": return <CheckCheck className="size-5" />;
    case "NOUVEAU_MESSAGE": return <Bell className="size-5" />;
    case "NOUVEAU_FORMULAIRE": return <AlertTriangle className="size-5" />;
    default: return <Info className="size-5" />;
  }
}

