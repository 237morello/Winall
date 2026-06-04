import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, Bell, Save } from "lucide-react";
import { updateUserProfile } from "@/actions/user.actions";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="space-y-1">
        <Typography variant="h1" className="text-3xl font-extrabold tracking-tight">Paramètres</Typography>
        <Typography variant="p" className="text-muted-foreground">Gérez votre profil et vos préférences de sécurité.</Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation des paramètres */}
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start rounded-xl bg-p/10 text-p font-bold">
            <User className="mr-2 size-4" /> Profil
          </Button>
          <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-p/5 text-muted-foreground">
            <Bell className="mr-2 size-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start rounded-xl hover:bg-p/5 text-muted-foreground">
            <Shield className="mr-2 size-4" /> Sécurité
          </Button>
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-3 space-y-8">
          <Card className="border-border/50 rounded-3xl shadow-xl shadow-p/5">
            <CardHeader className="border-b border-border/20 p-8">
              <CardTitle className="text-xl">Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center gap-6">
                <Avatar className="size-20 border-4 border-p/10 shadow-lg">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-p/5 text-p text-2xl font-bold">{user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Button variant="outline" className="rounded-xl h-9 text-xs font-bold border-p/20 text-p hover:bg-p/5">
                    Changer de photo
                  </Button>
                  <p className="text-[10px] text-muted-foreground italic">Format JPG ou PNG, max 2Mo.</p>
                </div>
              </div>

              <form action={async (formData) => {
                "use server";
                const name = formData.get("name") as string;
                await updateUserProfile({ name });
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nom complet</Label>
                    <Input id="name" name="name" defaultValue={user?.name || ""} className="rounded-2xl h-12 border-border/50" />
                  </div>
                  <div className="space-y-2 opacity-60">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email (Non modifiable)</Label>
                    <Input id="email" defaultValue={user?.email || ""} readOnly className="rounded-2xl h-12 border-border/50 bg-muted/20 cursor-not-allowed" />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="rounded-2xl bg-p hover:bg-p/90 text-white shadow-xl shadow-p/20 px-8 h-12">
                    <Save className="mr-2 size-4" /> Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/50 rounded-3xl shadow-xl shadow-p/5 border-destructive/20 bg-destructive/5">
            <CardHeader className="p-8">
              <CardTitle className="text-xl text-destructive">Zone de danger</CardTitle>
              <p className="text-sm text-muted-foreground">Les actions ci-dessous sont irréversibles.</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Button variant="destructive" className="rounded-2xl h-12 px-8 font-bold shadow-xl shadow-destructive/20">
                Supprimer mon compte Winall
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
