"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock3,
  Headphones,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";

import { sendMessage } from "@/actions/message.actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { playSound } from "@/lib/sounds";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  contenu: string;
  senderUserId: string;
  receiverUserId: string;
  createdAt: Date | string;
}

interface ConversationMessagePreview {
  contenu: string;
  createdAt: Date | string;
}

interface Conversation {
  id: string;
  name?: string | null;
  email: string;
  messagesSent?: ConversationMessagePreview[];
  messagesReceived?: ConversationMessagePreview[];
}

interface ChatConversationItem {
  id: string;
  title: string;
  subtitle: string;
  lastMessage: string;
  lastMessageAt: string;
  badge?: string;
  status: "online" | "waiting";
}

interface ChatViewProps {
  currentUserId: string;
  role: "admin" | "client";
  initialMessages: Message[];
  conversations?: Conversation[];
  adminId: string;
  initialActiveConversationId?: string;
}

function formatMessageTime(value: Date | string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatConversationTime(value?: Date | string) {
  if (!value) return "Maintenant";

  const date = new Date(value);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return formatMessageTime(date);
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return "Hier";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function getInitials(name: string, fallback = "WT") {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || fallback;
}

function getConversationName(conversation?: Conversation) {
  return conversation?.name?.trim() || conversation?.email || "Client Winall";
}

function getLatestPreview(conversation: Conversation) {
  const previews = [
    ...(conversation.messagesSent ?? []),
    ...(conversation.messagesReceived ?? []),
  ].sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime());

  return previews[0];
}

export function ChatView({
  currentUserId,
  role,
  initialMessages,
  conversations = [],
  adminId,
  initialActiveConversationId,
}: ChatViewProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const initialConversationId = role === "client"
    ? adminId
    : initialActiveConversationId ?? conversations[0]?.id ?? "";

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeConversation, setActiveConversation] = useState(initialConversationId);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatConversations = useMemo<ChatConversationItem[]>(() => {
    if (role === "client") {
      const lastMessage = initialMessages.at(-1);

      return [
        {
          id: adminId,
          title: "Support Winall Tech",
          subtitle: "Assistance, devis et suivi de projet",
          lastMessage: lastMessage?.contenu ?? "Démarrez une conversation avec notre équipe.",
          lastMessageAt: formatConversationTime(lastMessage?.createdAt),
          badge: "Client",
          status: "online",
        },
      ];
    }

    return conversations.map((conversation) => {
      const latestPreview = getLatestPreview(conversation);
      const name = getConversationName(conversation);

      return {
        id: conversation.id,
        title: name,
        subtitle: conversation.email,
        lastMessage: latestPreview?.contenu ?? "Aucun message récent.",
        lastMessageAt: formatConversationTime(latestPreview?.createdAt),
        badge: "Client",
        status: "waiting",
      };
    });
  }, [adminId, conversations, initialMessages, role]);

  const filteredConversations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return chatConversations;

    return chatConversations.filter((conversation) => {
      return [conversation.title, conversation.subtitle, conversation.lastMessage]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [chatConversations, query]);

  const activeConversationItem = useMemo(() => {
    return chatConversations.find((conversation) => conversation.id === activeConversation);
  }, [activeConversation, chatConversations]);

  useEffect(() => {
    setMessages(initialMessages);
    setActiveConversation(initialConversationId);
  }, [initialMessages, initialConversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!activeConversation) return;

    const channel = supabase
      .channel(`messages-${currentUserId}-${activeConversation}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
        },
        (payload) => {
          const newMessage = payload.new as Message;
          const belongsToActiveConversation =
            (newMessage.senderUserId === activeConversation && newMessage.receiverUserId === currentUserId) ||
            (newMessage.senderUserId === currentUserId && newMessage.receiverUserId === activeConversation);

          if (!belongsToActiveConversation) return;

          setMessages((currentMessages) => {
            if (currentMessages.some((message) => message.id === newMessage.id)) {
              return currentMessages;
            }

            if (newMessage.senderUserId !== currentUserId) {
              playSound("message");
            }

            return [...currentMessages, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConversation, currentUserId, supabase]);

  function handleSelectConversation(conversationId: string) {
    setActiveConversation(conversationId);

    if (role === "admin") {
      router.push(`/dashboard/${currentUserId}/chat?with=${conversationId}`);
    }
  }

  async function handleSend() {
    const trimmedInput = input.trim();
    if (!trimmedInput || !activeConversation) return;

    const temporaryId = `temporary-${Date.now()}`;
    const optimisticMessage: Message = {
      id: temporaryId,
      contenu: trimmedInput,
      senderUserId: currentUserId,
      receiverUserId: activeConversation,
      createdAt: new Date(),
    };

    setMessages((currentMessages) => [...currentMessages, optimisticMessage]);
    setInput("");

    try {
      await sendMessage({ receiverId: activeConversation, contenu: trimmedInput });
    } catch (error) {
      console.error("Échec de l'envoi du message", error);
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== temporaryId));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSend();
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  }

  const conversationList = (
    <div className="flex h-full flex-col bg-card/40">
      <div className="space-y-4 p-4">
        <Button
          type="button"
          className="h-12 w-full justify-start gap-3 rounded-2xl bg-p text-white shadow-lg shadow-p/20 hover:bg-p/90"
          onClick={() => activeConversation && handleSelectConversation(activeConversation)}
        >
          <Plus className="size-4" />
          Nouveau chat
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une discussion..."
            className="h-11 rounded-2xl border-border/50 bg-background/70 pl-10 focus-visible:ring-p/30"
          />
        </div>
      </div>

      <Separator className="bg-border/40" />

      <div className="flex-1 overflow-y-auto p-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Conversations</span>
          <Badge variant="outline" className="rounded-full border-p/30 bg-p/5 text-[10px] text-p">
            {filteredConversations.length}
          </Badge>
        </div>

        <div className="space-y-1.5">
          {filteredConversations.map((conversation) => {
            const isActive = conversation.id === activeConversation;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => handleSelectConversation(conversation.id)}
                className={cn(
                  "group w-full rounded-2xl border p-3 text-left transition-all",
                  isActive
                    ? "border-p/40 bg-p/10 shadow-sm shadow-p/10"
                    : "border-transparent hover:border-border/70 hover:bg-muted/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10 border border-border/60">
                    <AvatarFallback
                      className={cn(
                        "text-xs font-black",
                        isActive ? "bg-p text-white" : "bg-p/10 text-p"
                      )}
                    >
                      {getInitials(conversation.title)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold text-foreground">{conversation.title}</p>
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          conversation.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                        )}
                      />
                    </div>
                    <p className="truncate text-[11px] font-medium text-muted-foreground">{conversation.subtitle}</p>
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[10px] font-bold text-muted-foreground">{conversation.lastMessageAt}</span>
                      {conversation.badge && (
                        <Badge variant="secondary" className="rounded-full px-2 py-0 text-[9px] font-bold">
                          {conversation.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredConversations.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
              Aucune conversation trouvée.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-9rem)] overflow-hidden rounded-3xl border border-border/50 bg-card/40 shadow-2xl shadow-p/5 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 border-r border-border/40 lg:block">{conversationList}</aside>

        <section className="flex min-h-0 flex-col bg-background/40">
          <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border/40 bg-card/55 px-4 py-4 backdrop-blur-xl md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-2xl lg:hidden">
                    <Menu className="size-4" />
                    <span className="sr-only">Ouvrir les conversations</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] max-w-sm gap-0 p-0" showCloseButton={false}>
                  <SheetHeader className="border-b border-border/40 p-4">
                    <SheetTitle>Messagerie</SheetTitle>
                    <SheetDescription>Vos conversations avec l'équipe Winall Tech.</SheetDescription>
                  </SheetHeader>
                  {conversationList}
                </SheetContent>
              </Sheet>

              <Avatar className="size-11 border-2 border-p/20">
                <AvatarFallback className="bg-p text-sm font-black text-white">
                  {role === "client" ? "WT" : getInitials(activeConversationItem?.title ?? "Client")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-base font-black tracking-tight md:text-lg">
                    {activeConversationItem?.title ?? "Support Winall Tech"}
                  </h1>
                  <Badge className="hidden rounded-full border-none bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 md:inline-flex">
                    En ligne
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {role === "client"
                    ? "Un conseiller Winall vous répond directement ici."
                    : activeConversationItem?.subtitle ?? "Sélectionnez un client pour échanger."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden rounded-full border-p/30 bg-p/5 text-p md:inline-flex">
                <Clock3 className="mr-1 size-3" /> Réponse rapide
              </Badge>
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-p/10 hover:text-p">
                <MoreHorizontal className="size-5" />
                <span className="sr-only">Plus d'options</span>
              </Button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <Card className="border-border/50 bg-card/60 p-5 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-p/10 text-p">
                    <Headphones className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black">Bienvenue dans votre messagerie Winall</p>
                      <Badge variant="outline" className="rounded-full border-p/30 bg-p/5 text-[10px] text-p">
                        Chat sécurisé
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Échangez avec l'équipe sur vos devis, projets, interventions et documents. Aucun assistant IA ici : vos messages sont traités par nos équipes.
                    </p>
                  </div>
                </div>
              </Card>

              {messages.length === 0 ? (
                <div className="flex min-h-65 flex-col items-center justify-center rounded-3xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-p/10 text-p">
                    <MessageCircle className="size-8" />
                  </div>
                  <h2 className="text-xl font-black">Commencez la discussion</h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Posez votre question ou demandez un suivi. Un membre de l'équipe Winall Tech vous répondra dans cet espace.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isCurrentUser = message.senderUserId === currentUserId;

                  return (
                    <div
                      key={message.id}
                      className={cn("flex gap-3", isCurrentUser ? "justify-end" : "justify-start")}
                    >
                      {!isCurrentUser && (
                        <Avatar className="mt-1 size-9 border border-p/20">
                          <AvatarFallback className="bg-p/10 text-xs font-black text-p">WT</AvatarFallback>
                        </Avatar>
                      )}

                      <div className={cn("flex max-w-[85%] flex-col gap-1 md:max-w-[72%]", isCurrentUser ? "items-end" : "items-start")}>
                        <div
                          className={cn(
                            "rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                            isCurrentUser
                              ? "rounded-br-md bg-p text-white shadow-p/20"
                              : "rounded-bl-md border border-border/60 bg-card text-foreground"
                          )}
                        >
                          <p className="whitespace-pre-wrap">{message.contenu}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold text-muted-foreground">
                          {!isCurrentUser && <ShieldCheck className="size-3 text-p" />}
                          <span>{isCurrentUser ? "Vous" : "Winall Tech"}</span>
                          <span>•</span>
                          <span>{formatMessageTime(message.createdAt)}</span>
                        </div>
                      </div>

                      {isCurrentUser && (
                        <Avatar className="mt-1 size-9 border border-border/60">
                          <AvatarFallback className="bg-muted text-xs font-black">VO</AvatarFallback>
                        </Avatar>
                      )}

                      <div ref={index === messages.length - 1 ? scrollRef : null} />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <footer className="border-t border-border/40 bg-card/55 p-4 backdrop-blur-xl md:p-6">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-border/60 bg-background/85 p-2 shadow-xl shadow-p/5 focus-within:border-p/40 focus-within:ring-4 focus-within:ring-p/10">
                <div className="flex items-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mb-1 rounded-2xl text-muted-foreground hover:bg-p/10 hover:text-p"
                  >
                    <Paperclip className="size-5" />
                    <span className="sr-only">Joindre un fichier</span>
                  </Button>

                  <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleComposerKeyDown}
                    placeholder="Écrivez votre message à l'équipe Winall..."
                    className="max-h-36 min-h-12 resize-none border-0 bg-transparent px-2 py-3 shadow-none focus-visible:ring-0"
                    disabled={!activeConversation}
                  />

                  <Button
                    type="submit"
                    disabled={!input.trim() || !activeConversation}
                    className="mb-1 size-11 rounded-2xl bg-p text-white shadow-lg shadow-p/20 hover:bg-p/90"
                  >
                    <Send className="size-4" />
                    <span className="sr-only">Envoyer</span>
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-center text-[11px] font-medium text-muted-foreground">
                Entrée pour envoyer · Shift + Entrée pour une nouvelle ligne
              </p>
            </form>
          </footer>
        </section>
      </div>
    </div>
  );
}
