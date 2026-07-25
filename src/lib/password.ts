/**
 * Hachage de secrets (mots de passe utilisateur et pass d'accès admin) via
 * PBKDF2-SHA256 sur Web Crypto — même socle que src/lib/admin-session.ts,
 * sans dépendance externe. Format stocké : `pbkdf2$<iter>$<saltB64url>$<hashB64url>`.
 */

const ITERATIONS = 120_000;
const KEY_LENGTH = 32; // octets
const SALT_LENGTH = 16; // octets

function toBase64Url(bytes: Uint8Array<ArrayBuffer>): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

async function derive(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
  iterations: number,
): Promise<Uint8Array<ArrayBuffer>> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    KEY_LENGTH * 8,
  );
  return new Uint8Array(bits);
}

/** Hache un secret avec un sel aléatoire. */
export async function hashSecret(plain: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const hash = await derive(plain, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;
}

/** Vérifie un secret en clair contre un hash stocké (comparaison à temps constant). */
export async function verifySecret(
  plain: string,
  stored: string | null | undefined,
): Promise<boolean> {
  if (!stored) {
    return false;
  }

  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") {
    return false;
  }

  const iterations = Number.parseInt(parts[1], 10);
  if (!Number.isFinite(iterations) || iterations <= 0) {
    return false;
  }

  let salt: Uint8Array<ArrayBuffer>;
  let expected: Uint8Array<ArrayBuffer>;
  try {
    salt = fromBase64Url(parts[2]);
    expected = fromBase64Url(parts[3]);
  } catch {
    return false;
  }

  const actual = await derive(plain, salt, iterations);
  if (actual.length !== expected.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < actual.length; i += 1) {
    diff |= actual[i] ^ expected[i];
  }
  return diff === 0;
}
