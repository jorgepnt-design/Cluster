import data from "../data/cities.json";

export interface Kpi {
  value: string;
  label: string;
  source_note: string;
}

export interface City {
  slug: string;
  name: string;
  region: string;
  stand: string;
  subtitle: string;
  corridor: string;
  teaser_headline: string;
  teaser_intro: string;
  kpis: Kpi[];
  files: { teaser: string; snapshot: string };
}

const collator = new Intl.Collator("de");

export const cities: City[] = [...(data as City[])].sort((a, b) => collator.compare(a.name, b.name));

export const regions: string[] = [...new Set(cities.map((c) => c.region))].sort(collator.compare);

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Pfad mit Basis-URL (wichtig für GitHub Pages unter /Cluster/). */
export function url(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

export function teaserHref(city: City): string {
  return url(`/downloads/teaser/${city.files.teaser}`);
}
