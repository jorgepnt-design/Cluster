import type { APIRoute } from "astro";
import { cities, url } from "../lib/cities";

const pages = ["/", "/staedte/", ...cities.map((c) => `/staedte/${c.slug}/`), "/impressum/", "/datenschutz/", "/agb/", "/widerruf/"];

export const GET: APIRoute = ({ site }) => {
  const [d, m, y] = cities[0].stand.split(".");
  const lastmod = `${y}-${m}-${d}`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(url(p), site).href}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
