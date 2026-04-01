// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextConfig: any = {
  // CommonJS-only packages — Turbopack must not bundle them
  serverExternalPackages: ["tesseract.js", "pdfjs-dist"],

  // MVP: skip type & lint checks during Vercel build to ship faster.
  // !! Remove before production launch !!
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
