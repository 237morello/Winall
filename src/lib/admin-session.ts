const SESSION_COOKIE = "winall_admin_session";

export interface AdminSessionPayload {
  email: string;
  role: "admin";
  exp: number;
}

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.BETTER_AUTH_SECRET ||
    "winall-admin-session-dev-secret"
  );
}

function base64UrlEncode(value: string): string {
  return btoa(value)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlDecode(value: string): string {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

async function importHmacKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signPayload(payload: string): Promise<string> {
  const key = await importHmacKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  const bytes = new Uint8Array(signature);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

export async function createAdminSession(email: string): Promise<string> {
  const payload: AdminSessionPayload = {
    email,
    role: "admin",
    exp: Date.now() + 1000 * 60 * 60 * 12,
  };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = await signPayload(encoded);
  return `${encoded}.${signature}`;
}

export async function verifyAdminSession(
  value: string | undefined | null,
): Promise<AdminSessionPayload | null> {
  if (!value) {
    return null;
  }

  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) {
    return null;
  }

  try {
    const key = await importHmacKey();
    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      Uint8Array.from(atob(signature.replaceAll("-", "+").replaceAll("_", "/")), (char) =>
        char.charCodeAt(0),
      ),
      new TextEncoder().encode(encoded),
    );

    if (!verified) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(encoded)) as AdminSessionPayload;
    if (
      payload.role !== "admin" ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp < Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export const adminSessionCookieName = SESSION_COOKIE;
