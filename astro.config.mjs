// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// SITE_URL: endgültige Domain (z. B. https://analysen.loc-in.com).
// BASE_PATH: nur für GitHub Pages ohne eigene Domain nötig (z. B. "/Cluster").
// Ohne SITE_URL nutzt ein Vercel-Build automatisch die Produktions-Domain des Projekts.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "https://www.loc-in.com");
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
