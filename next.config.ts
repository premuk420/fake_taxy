import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These packages are CommonJS-only and must not be bundled by Turbopack.
  // Next.js will let Node.js require() them directly at runtime.
  serverExternalPackages: ["tesseract.js", "pdfjs-dist"],
};

export default nextConfig;
