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
  },
};

export default nextConfig;
