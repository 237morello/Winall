import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["kysely", "@better-auth/kysely-adapter"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yqvvudjepalsvfgwifyx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Autorise les logos de marques (SVG statiques, sans script) sous /public/images/tools.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
