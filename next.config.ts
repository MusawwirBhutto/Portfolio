import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "/Portfolio"; // <-- Replace with your exact repo name (keep the leading slash)

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoName : "",
  assetPrefix: isProd ? repoName : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
