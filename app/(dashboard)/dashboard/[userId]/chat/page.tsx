import { Typography } from "@/components/ui/typography";

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Typography variant="h1">Messagerie</Typography>
      <Typography variant="p" className="text-muted-foreground">
        Le système de messagerie pour discuter avec vos chargés de projets sera
        bientôt disponible.
      </Typography>
    </div>
  );
}
