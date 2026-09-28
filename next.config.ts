import type { NextConfig } from "next";

const repoName = "/Portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoName,
  env: {
    NEXT_PUBLIC_BASE_PATH: repoName,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;