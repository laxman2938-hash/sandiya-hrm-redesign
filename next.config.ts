import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@prisma/client", "prisma"],
  outputFileTracingIncludes: {
    "/api/**/*": ["./node_modules/.prisma/client/**/*"],
    "/admin/**/*": ["./node_modules/.prisma/client/**/*"],
  },
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
