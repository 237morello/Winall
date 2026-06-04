import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: "ADMIN" | "CLIENT";
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch((error: unknown) => {
      console.error("[Auth] Session indisponible:", error);
      return null;
    });

  if (!session?.user) return null;

  const role = (session.user as { role?: string }).role?.toUpperCase();

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
    role: role === "ADMIN" ? "ADMIN" : "CLIENT",
  };
});
