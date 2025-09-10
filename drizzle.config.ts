import fs from "fs";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default defineConfig({
  out: "./migrations",               // Migration dosyalarının çıkacağı klasör
  schema: "./shared/schema.ts",      // Şema dosyan
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,   // ✅ Artık connectionString yerine url
    ssl: {
      rejectUnauthorized: true,      // SSL doğrulama
      ca: fs.readFileSync("./certs/ca.crt", "utf8"), // DigitalOcean’dan aldığın CA
    },
  },
});
