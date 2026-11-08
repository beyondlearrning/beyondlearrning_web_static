import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — matches Netlify publish of apps/web/out
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
