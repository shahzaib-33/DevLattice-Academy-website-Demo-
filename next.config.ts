import type { NextConfig } from "next";

/**
 * Static export works on Vercel, Netlify, GitHub Pages or any static host.
 * BUILD_TARGET=artifact switches asset URLs to relative paths so the
 * exported site also runs from a sub folder (used for the shareable demo).
 */
const isArtifact = process.env.BUILD_TARGET === "artifact";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  assetPrefix: isArtifact ? "./" : undefined,
};

export default nextConfig;
