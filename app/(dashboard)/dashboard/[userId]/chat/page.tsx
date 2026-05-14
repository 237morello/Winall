import { getConversations, getMessages, getSupportAdminId } from "@/actions/message.actions";
import { auth } from "@/lib/auth";
import { ChatView } from "@/components/features/dashboard";
import { headers } from "next/headers";

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string }>;
  searchParams: Promise<{ with?: string }>;
}) {
  const { userId } = await params;
  const { with: otherUserId } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role =
    ((session?.user as { role?: string })?.role?.toLowerCase() as "client" | "admin") || "client";
  const conversations = role === "admin" ? await getConversations() : [];
  const initialActiveConversationId = role === "admin" ? otherUserId ?? conversations[0]?.id : undefined;
  const messages = await getMessages(initialActiveConversationId);
  const adminId = await getSupportAdminId();

  return (
    <ChatView
      currentUserId={userId}
      role={role}
      initialMessages={messages}
      conversations={conversations}
      adminId={adminId}
      initialActiveConversationId={initialActiveConversationId}
    />
  );
}
