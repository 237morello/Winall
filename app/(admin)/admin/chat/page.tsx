import { getConversations, getMessages } from "@/actions/message.actions";
import { auth } from "@/lib/auth";
import { ChatView } from "@/components/features/dashboard/chat/ChatView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * PAGE : Centre de Messagerie Admin
 * Permet à l'équipe Winall de gérer toutes les conversations clients.
 */
export default async function AdminChatPage({
  searchParams,
}: {
  searchParams: Promise<{ with?: string }>;
}) {
  const { with: otherUserId } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const role = (session.user as { role?: string })?.role?.toLowerCase() as "admin" | "client";
  
  if (role !== "admin") {
    redirect("/dashboard/chat");
  }

  // L'admin voit toutes les conversations avec les clients
  const conversations = await getConversations();
  
  // Par défaut, on active la première conversation ou celle passée en paramètre
  const activeConversationId = otherUserId ?? conversations[0]?.id;
  
  const messages = activeConversationId ? await getMessages(activeConversationId) : [];
  const adminId = session.user.id;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Messagerie Client</h1>
        <p className="text-muted-foreground">
          Gérez les échanges et le support avec vos clients Winall Tech.
        </p>
      </div>
      
      <div className="flex-1 min-h-0 border rounded-2xl overflow-hidden bg-background">
        <ChatView
          currentUserId={session.user.id}
          role="admin"
          initialMessages={messages}
          conversations={conversations}
          adminId={adminId}
          initialActiveConversationId={activeConversationId}
        />
      </div>
    </div>
  );
}
