// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// SITE_URL: endgültige Domain (z. B. https://analysen.loc-in.com).
// BASE_PATH: nur für GitHub Pages ohne eigene Domain nötig (z. B. "/Cluster").
const site = process.env.SITE_URL ?? "https://www.loc-in.com";
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
