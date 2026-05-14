import {
  authApiPrefix,
  authRoutes,
  defaultPrivateRoute,
  privateRoutes,
} from "@/lib/routes";
import { NextRequest, NextResponse } from "next/server";

/**
 * @class ServiceMiddlewareAuth
 * @description Protege les routes privees en Edge sans acceder a PostgreSQL.
 */
class ServiceMiddlewareAuth {
  /**
   * Detecte la presence d'un cookie Better Auth, avec ou sans prefixe secure.
   */
  static possedeSession(requete: NextRequest): boolean {
    return Boolean(
      requete.cookies.get("better-auth.session_token")?.value ||
        requete.cookies.get("__Secure-better-auth.session_token")?.value,
    );
  }

  /**
   * Encode l'URL de retour pour renvoyer l'utilisateur vers sa destination initiale.
   */
  static construireCallbackUrl(requete: NextRequest): string {
    let callbackUrl = requete.nextUrl.pathname;

    if (requete.nextUrl.search) {
      callbackUrl += requete.nextUrl.search;
    }

    return encodeURIComponent(callbackUrl);
  }
}

export function middleware(requete: NextRequest): NextResponse {
  const { pathname } = requete.nextUrl;
  const aUneSession = ServiceMiddlewareAuth.possedeSession(requete);

  if (pathname.startsWith(authApiPrefix)) {
    return NextResponse.next();
  }

  const estRouteAuth = authRoutes.some((route) => pathname.startsWith(route));
  const estRoutePrivee = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (estRouteAuth && aUneSession) {
    return NextResponse.redirect(new URL(defaultPrivateRoute, requete.url));
  }

  if (estRoutePrivee && !aUneSession) {
    return NextResponse.redirect(
      new URL(
        `/log-in?callbackUrl=${ServiceMiddlewareAuth.construireCallbackUrl(requete)}`,
        requete.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)",
  ],
};
