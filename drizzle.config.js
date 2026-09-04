import { defineConfig } from "drizzle-kit";

// Reads your Neon connection string from the environment.
// Set DATABASE_URL in a .env file (see README) before running:
//   npx drizzle-kit push
export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
