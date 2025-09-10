import fs from "fs";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,   // ✅ url yerine connectionString
    ssl: {
      rejectUnauthorized: true,                   // ✅ kritik
      ca: fs.readFileSync("./certs/ca.crt", "utf8"),
    },
  },
});
