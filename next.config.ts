import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "symphonybalispa-ervhc.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "*.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      },
      {
        protocol: "https",
        hostname: "symphonybalispa.com",
      },
    ],
  },
};

export default nextConfig;