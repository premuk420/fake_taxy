import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });
config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx ./prisma/seed.ts",
  },
  datasource: {
    // DATABASE_URL = pooler (port 6543) for runtime queries via Next.js
    // For CLI migrations, temporarily swap to DIRECT_URL if pooler times out
    url: process.env["DATABASE_URL"]!,
  },
});
