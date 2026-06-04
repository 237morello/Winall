import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SupportRequestForm, type SupportProjectContext } from "./support-request-form";

type SupportType = "DEVIS" | "INTERVENTION" | "CONTACT";

function normalizeType(value: string | string[] | undefined): SupportType {
  const type = Array.isArray(value) ? value[0] : value;
  return type === "INTERVENTION" || type === "CONTACT" ? type : "DEVIS";
}

export default async function SupportPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string | string[]; projectId?: string | string[] }>;
}) {
  const params = (await searchParams) ?? {};
  const type = normalizeType(params.type);
  const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  let project: SupportProjectContext | null = null;

  if (projectId && session?.user?.id) {
    project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
      select: {
        id: true,
        titre: true,
        domaine: true,
        localisation: true,
      },
    });
  }

  return (
    <SupportRequestForm
      initialType={type}
      project={project}
      user={{
        nom: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
      }}
    />
  );
}
