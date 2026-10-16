import { shop } from "./shop";

/** Angebotsstufen pro Stadt. Preise kommen aus shop.ts. */
export const tiers = [
  {
    key: "teaser",
    name: "Standort-Teaser",
    scope: "2 Seiten PDF",
    price: "kostenlos",
    process: "Download nach Eingabe der E-Mail-Adresse",
    points: ["Kernaussage zum Standort", "Ausgewählte Kennzahlen mit Stand", "Grenzüberschreitender Korridor"],
  },
  {
    key: "snapshot",
    name: "Standort-Snapshot",
    scope: "5 Seiten PDF",
    price: shop.pricesNet.snapshot,
    process: "Kauf, danach Download",
    points: [
      "Belegte Fakten mit Quelle",
      "Clusterlandkarte",
      "Vergleich mit Clustern in Frankreich und Italien",
      "Budget- und Vergaberahmen",
    ],
  },
  {
    key: "profil",
    name: "Clusterprofil",
    scope: "8–12 Seiten",
    price: shop.pricesNet.profil,
    process: "Anfrage, individuelle Erstellung",
    points: ["Vertiefung für eine konkrete Fragestellung", "Erweiterte Benchmarks", "Abgestimmter Umfang"],
  },
  {
    key: "mandat",
    name: "Individuelles Mandat",
    scope: "nach Vereinbarung",
    price: "auf Anfrage",
    process: "Kontakt oder Terminbuchung",
    points: ["Clustermanagement as a Service", "Moderation und Formatentwicklung", "Begleitung vor Ort"],
  },
] as const;

/**
 * Inhaltsverzeichnis des Standort-Snapshots (5 Seiten).
 * PLATZHALTER: bitte mit dem tatsächlichen Aufbau der PDFs abgleichen.
 */
export const snapshotToc = [
  "Standortprofil und Kennzahlen – mit Quelle und Stand",
  "Clusterlandkarte: Initiativen, Forschung, Unternehmen",
  "Benchmark mit Clustern in Frankreich und Italien (EUCLES-Labelstatus)",
  "Grenzüberschreitender Korridor und Partnerregionen",
  "Budget- und Vergaberahmen, Quellenverzeichnis",
];
