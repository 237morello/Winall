import "server-only";

import type { PrismaClient } from "./generated/prisma";

type VerificationUpdateArgs = {
  data?: Record<string, unknown>;
  where?: Record<string, unknown>;
};

function extractIdentifier(where: VerificationUpdateArgs["where"]): string | null {
  if (!where) {
    return null;
  }

  const identifier = where.identifier;
  return typeof identifier === "string" ? identifier : null;
}

function isVerificationUniqueWhereError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "PrismaClientValidationError" &&
    error.message.includes("VerificationWhereUniqueInput") &&
    error.message.includes("at least one of `id`")
  );
}

export function createBetterAuthPrismaClient(prisma: PrismaClient): PrismaClient {
  const verificationDelegate = prisma.verification;
  const originalUpdate = verificationDelegate.update.bind(verificationDelegate);

  const verificationProxy = new Proxy(verificationDelegate, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);

      if (prop !== "update" || typeof original !== "function") {
        return original;
      }

      return async (args: VerificationUpdateArgs) => {
        try {
          return await originalUpdate(args as never);
        } catch (error) {
          const identifier = extractIdentifier(args.where);

          if (!identifier || !isVerificationUniqueWhereError(error)) {
            throw error;
          }

          const latestRecord = await verificationDelegate.findFirst({
            where: { identifier },
            orderBy: { createdAt: "desc" },
          });

          if (!latestRecord) {
            throw error;
          }

          return verificationDelegate.update({
            where: { id: latestRecord.id },
            data: (args.data ?? {}) as never,
          });
        }
      };
    },
  });

  return new Proxy(prisma, {
    get(target, prop, receiver) {
      if (prop === "verification") {
        return verificationProxy;
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as PrismaClient;
}
