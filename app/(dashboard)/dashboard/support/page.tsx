"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitFormRequest } from "@/actions/form.actions";
import { toast } from "sonner";
import { FileSpreadsheet, Send, Info } from "lucide-react";
import { playSound } from "@/lib/sounds";

export default function SupportPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      type: formData.get("type") as "DEVIS" | "INTERVENTION" | "CONTACT",
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      telephone: formData.get("telephone") as string,
      donnees: {
        sujet: formData.get("sujet") as string,
        description: formData.get("description") as string,
      },
    };

    try {
      await submitFormRequest(data);
      playSound("success");
      toast.success("Votre demande a été envoyée avec succès !");
      (event.target as HTMLFormElement).reset();
    } catch {
      toast.error("Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <Typography variant="h1" className="text-4xl font-extrabold tracking-tight">Une nouvelle idée ?</Typography>
        <Typography variant="p" className="text-muted-foreground text-lg italic">L&apos;expertise Winall Tech à votre service.</Typography>
      </div>

      <Card className="border-border/50 rounded-[2.5rem] shadow-2xl shadow-p/10 overflow-hidden bg-card/50 backdrop-blur-md">
        <CardHeader className="bg-p/5 p-10 border-b border-border/20">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold">
            <FileSpreadsheet className="size-6 text-p" /> Formulaire de Demande
          </CardTitle>
          <p className="text-sm text-muted-foreground font-medium pt-2">Décrivez votre besoin (BTP, Sécurité, IT) et nous reviendrons vers vous sous 24h.</p>
        </CardHeader>
        <CardContent className="p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="type" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Type de demande</Label>
                <Select name="type" required defaultValue="DEVIS">
                  <SelectTrigger className="rounded-2xl h-14 border-border/50 focus:ring-p/20 transition-all">
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border/50">
                    <SelectItem value="DEVIS">Demande de Devis</SelectItem>
                    <SelectItem value="INTERVENTION">Intervention Technique</SelectItem>
                    <SelectItem value="CONTACT">Question Générale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="sujet" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Objet</Label>
                <Input id="sujet" name="sujet" placeholder="Ex: Installation Caméras" required className="rounded-2xl h-14 border-border/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="nom" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Votre Nom</Label>
                <Input id="nom" name="nom" required className="rounded-2xl h-14 border-border/50" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Email de contact</Label>
                <Input id="email" name="email" type="email" required className="rounded-2xl h-14 border-border/50" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Description détaillée</Label>
              <Textarea id="description" name="description" placeholder="Dites-nous en plus sur votre projet..." required className="rounded-3xl min-h-[150px] border-border/50 p-6" />
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-blue-700 text-sm">
              <Info className="size-5 shrink-0" />
              <p className="font-medium">En soumettant ce formulaire, un expert technique sera assigné à votre demande.</p>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-p hover:bg-p/90 text-white font-bold text-lg shadow-2xl shadow-p/20 transition-all active:scale-[0.98]">
              {loading ? "Envoi en cours..." : (
                <>Envoyer la demande <Send className="ml-2 size-5" /></>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
