import { NextResponse } from "next/server";
import type { Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

const MAX_EVENT_NAME_LENGTH = 80;
const MAX_ROUTE_LENGTH = 300;

function normalizeString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function normalizeMetadata(value: unknown): Prisma.JsonObject {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const metadata: Prisma.JsonObject = {};

  for (const [key, rawValue] of Object.entries(value)) {
    if (
      typeof rawValue === "string" ||
      typeof rawValue === "number" ||
      typeof rawValue === "boolean" ||
      rawValue === null
    ) {
      metadata[key.slice(0, 80)] = rawValue;
    }
  }

  return metadata;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const eventName = normalizeString(body?.eventName, MAX_EVENT_NAME_LENGTH);

  if (!eventName) {
    return NextResponse.json({ error: "eventName is required" }, { status: 400 });
  }

  const currentUser = await getCurrentUser();

  await prisma.analyticsEvent.create({
    data: {
      eventName,
      route: normalizeString(body?.route, MAX_ROUTE_LENGTH),
      userId: currentUser?.id ?? null,
      role: currentUser?.role ?? null,
      metadata: normalizeMetadata(body?.metadata),
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
