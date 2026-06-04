/**
 * MISSION : AdminUserForm — Formulaire complet pour Créer/Modifier un utilisateur.
 * Utilise React Hook Form + Zod + Server Actions.
 */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { adminCreateUser, adminUpdateUser, type AdminUserInput } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, User as UserIcon } from "lucide-react";
import type { Role } from "@/lib/generated/prisma";

const userFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  role: z.enum(["ADMIN", "CLIENT"]),
  image: z.string().optional().or(z.literal("")).nullable(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface AdminUserFormProps {
  initialData?: UserFormValues;
  userId?: string;
}

export function AdminUserForm({ initialData, userId }: AdminUserFormProps) {
  const router = useRouter();
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      email: initialData.email,
      role: initialData.role,
      image: initialData.image || "",
    } : {
      name: "",
      email: "",
      role: "CLIENT",
      image: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: UserFormValues) {
    try {
      if (userId) {
        await adminUpdateUser(userId, values as Partial<AdminUserInput>);
        toast.success("Utilisateur mis à jour avec succès");
      } else {
        await adminCreateUser(values as AdminUserInput);
        toast.success("Utilisateur créé avec succès");
      }
      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error(error);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>{userId ? "Modifier l'Utilisateur" : "Nouvel Utilisateur"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom Complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="jean.dupont@exemple.com" 
                            disabled={!!userId} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle du compte</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CLIENT">Client (Winall)</SelectItem>
                          <SelectItem value="ADMIN">Administrateur</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isLoading} className="gap-2">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {userId ? "Enregistrer les modifications" : "Créer l'utilisateur"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserIcon className="size-4" />
              Photo de profil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              folder="avatars"
              defaultValue={form.getValues("image")}
              onUploadSuccess={(url) => form.setValue("image", url)}
              label="Photo de profil"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
