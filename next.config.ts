import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@prisma/client", "prisma"],
  outputFileTracingIncludes: {
    "/api/**/*": ["./node_modules/.prisma/client/**/*"],
    "/admin/**/*": ["./node_modules/.prisma/client/**/*"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
