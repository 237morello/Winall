/**
 * Edge Runtime compatible session verification
 * This file does NOT import server-only modules (no Prisma, no Node.js internals)
 * Safe to use in middleware.ts
 */

import { cookies } from "next/headers";

/**
 * Check if user has a valid session cookie (edge runtime safe)
 * This only reads the cookie, doesn't hit the database
 */
export async function getSessionCookie() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("better-auth.session_token");
    
    return sessionCookie?.value ? { isAuthenticated: true } : null;
  } catch (error) {
    console.error("Error reading session cookie:", error);
    return null;
  }
}
