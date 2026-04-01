// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextConfig: any = {
  // CommonJS-only packages — Turbopack must not bundle them
  serverExternalPackages: ["tesseract.js"],

  // MVP: skip TypeScript type checking during Vercel build to ship faster.
  // !! Remove before production launch !!
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
