import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    INFACTORY_API_KEY: process.env.INFACTORY_API_KEY,
  },
};

export default nextConfig;
