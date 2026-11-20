import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Netlify / Hostinger
  output: "export",
  // Apache (Hostinger) needs /about/index.html — folders without index → 403
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
