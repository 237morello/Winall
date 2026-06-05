const TRANSIENT_AUTH_QUERY_KEYS = [
  "error",
  "error_description",
  "code",
  "state",
  "token",
] as const;

export function sanitizeRedirectPath(
  rawPath: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (!rawPath) return fallback;
  if (!rawPath.startsWith("/") || rawPath.startsWith("//")) return fallback;

  const normalized = new URL(rawPath, "http://localhost");
  TRANSIENT_AUTH_QUERY_KEYS.forEach((key) =>
    normalized.searchParams.delete(key),
  );

  const query = normalized.searchParams.toString();
  return query ? `${normalized.pathname}?${query}` : normalized.pathname;
}

export function buildRedirectTo(
  pathname: string,
  searchParams: URLSearchParams,
  fallback = "/dashboard",
): string {
  const sanitized = new URLSearchParams(searchParams.toString());
  TRANSIENT_AUTH_QUERY_KEYS.forEach((key) => sanitized.delete(key));

  const query = sanitized.toString();
  return sanitizeRedirectPath(
    `${pathname}${query ? `?${query}` : ""}`,
    fallback,
  );
}
