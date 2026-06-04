import { getMessages, getSupportAdminId } from "@/actions/message.actions";
import { auth } from "@/lib/auth";
import { ChatView } from "@/components/features/dashboard/chat/ChatView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageSquare, ShieldCheck } from "lucide-react";

/**
 * PAGE : Support Client
 * Permet au client de discuter avec l'équipe de support Winall Tech.
 */
export default async function ClientChatPage() {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch(() => null);

  const role = (session?.user as { role?: string })?.role?.toLowerCase() as "admin" | "client" || "client";
  const currentUserId = session?.user?.id || "guest-dev";
  
  // Si l'admin arrive ici, on le renvoie vers son espace dédié (uniquement s'il est authentifié)
  if (session?.user && role === "admin") {
    redirect("/admin/chat");
  }

  const adminId = await getSupportAdminId();
  
  // Le client discute toujours avec l'Admin (Support)
  const messages = adminId ? await getMessages(adminId) : [];

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col gap-5 pb-6">
      <div className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit rounded-lg border-primary/30 bg-primary/5 text-primary">
            Support client
          </Badge>
          <h1 className="text-3xl font-medium tracking-tight">Support & Assistance</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Posez vos questions, partagez un besoin technique ou suivez un projet avec l'équipe Winall.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-[360px]">
          <Card className="rounded-lg border-border/70 p-3 shadow-none">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquare className="size-4" />
              <span className="text-xs font-medium">{messages.length} messages</span>
            </div>
          </Card>
          <Card className="rounded-lg border-border/70 p-3 shadow-none">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="size-4" />
              <span className="text-xs font-medium">Canal sécurisé</span>
            </div>
          </Card>
        </div>
      </div>

      {adminId ? (
        <div className="min-h-[640px] flex-1 overflow-hidden rounded-lg border bg-background">
          <ChatView
            currentUserId={currentUserId}
            role="client"
            initialMessages={messages}
            conversations={[]} // Le client n'a pas besoin de liste de conversations
            adminId={adminId}
            initialActiveConversationId={adminId}
          />
        </div>
      ) : (
        <Card className="flex min-h-96 flex-col items-center justify-center rounded-lg border-dashed p-8 text-center shadow-none">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MessageSquare className="size-6" />
          </div>
          <h2 className="text-lg font-medium">Support indisponible</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Aucun compte administrateur support n'est disponible pour démarrer une conversation.
          </p>
        </Card>
      )}
    </div>
  );
}
