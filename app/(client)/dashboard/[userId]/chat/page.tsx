import { redirect } from "next/navigation";

export default async function OldChatPage() {
  redirect("/dashboard/chat");
}
