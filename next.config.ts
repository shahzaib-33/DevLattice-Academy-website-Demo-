import type { NextConfig } from "next";

/** Static export works on Vercel, Netlify, GitHub Pages or any static host. */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
