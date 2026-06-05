"use client";

import { createAuthClient } from "better-auth/react";
import { magicLinkClient, emailOTPClient } from "better-auth/client/plugins";

/**
 * @constant authClient
 * @description Instance du client Better Auth pour le frontend.
 * Permet l'utilisation des méthodes de connexion (OTP, Magic Link, Social) dans les composants.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    magicLinkClient(),
    emailOTPClient(),
  ],
});
