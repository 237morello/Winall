// Routes publiques — accessibles sans session
export const publicRoutes: string[] = ["/", "/about", "/blog","/dashboard"];

// Routes d'authentification — accessibles SANS session
// Si l'utilisateur est déjà connecté, il est renvoyé vers defaultPrivateRoute
export const authRoutes: string[] = [
  "/log-in",
  // Legacy alias conserve pour compatibilite si des liens externes pointent encore dessus.
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

// Routes privées — nécessitent une session valide
export const privateRoutes: string[] = [ "/settings", "/profile"];

// Après login réussi, redirection par défaut
export const defaultPrivateRoute = "/dashboard";

// Après logout, redirection par défaut
export const defaultPublicRoute = "/";

// Préfixe des routes API Better Auth — toujours laissées passer
export const authApiPrefix = "/api/auth";
