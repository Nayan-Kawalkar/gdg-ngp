import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // This app lives beside the old Vite site, so pin the workspace root or
  // Turbopack walks up and picks the wrong package-lock.json.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
