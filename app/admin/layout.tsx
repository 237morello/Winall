import { cookies } from "next/headers";
import { AdminHeader } from "@/components/features/admin-header/adminHeader";
import { adminSessionCookieName, verifyAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await verifyAdminSession(cookieStore.get(adminSessionCookieName)?.value);
  const user = session
    ? await prisma.user.findUnique({
        where: { email: session.email },
        select: { name: true, email: true },
      })
    : null;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={{ name: user?.name ?? null, email: user?.email ?? session?.email ?? "admin@winall.local" }} />
      <main>{children}</main>
    </div>
  );
}
