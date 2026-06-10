"use client";

import { createAuthClient } from "better-auth/react";
import { magicLinkClient, emailOTPClient } from "better-auth/client/plugins";

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

/**
 * Instance du client Better Auth pour le frontend.
 */
export const authClient = createAuthClient({
  ...(baseURL ? { baseURL } : {}),
  plugins: [
    magicLinkClient(),
    emailOTPClient(),
  ],
});
