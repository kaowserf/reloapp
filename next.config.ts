import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ffmpeg-static bundles an ~80MB binary that /api/generate-video only touches
  // on the (currently unreachable) multi-clip concat path — keep it out of the
  // deployed function so the Vercel output stays well under size limits.
  outputFileTracingExcludes: {
    "/api/generate-video": ["./node_modules/ffmpeg-static/**/*"],
  },
};

export default nextConfig;
