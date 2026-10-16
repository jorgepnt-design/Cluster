import { forms } from "./site";

/**
 * Angaben für Impressum, Datenschutzerklärung und AGB.
 *
 * Felder mit `null` sind noch offen. Solange ein Pflichtfeld offen ist, zeigen
 * die Rechtsseiten einen gut sichtbaren Hinweis und der Build gibt eine Warnung aus.
 * "keine" bedeutet: bewusst geprüft, nicht vorhanden.
 */

export type Hosting = "vercel" | "github-pages";

export const legal = {
  /** Umsatzsteuer-Identifikationsnummer nach § 27a UStG, z. B. "DE123456789". "keine", falls nicht vorhanden. */
  vatId: "keine" as string | "keine" | null, // wird ggf. nachgereicht

  /**
   * Erlaubnis nach § 34c GewO (Immobilienmakler/-darlehensvermittler).
   * Falls vorhanden: zuständige Aufsichtsbehörde eintragen, z. B. "Stadt Darmstadt, Gewerbeamt, Anschrift".
   * "keine", falls keine erlaubnispflichtige Tätigkeit ausgeübt wird.
   */
  brokerPermitAuthority: "Gewerbeamt Darmstadt, Grafenstraße 30, 64283 Darmstadt" as string | "keine" | null,

  /** Wo die Website gehostet wird. Bestimmt den Abschnitt „Hosting“ der Datenschutzerklärung. */
  hosting: "vercel" as Hosting,

  /** Anbieter des Newsletter-/Lead-Tools, sobald forms.teaserLeadEndpoint gesetzt ist. */
  teaserLeadProvider: null as null | { name: string; seat: string; privacyUrl: string },

  /** Stand der Rechtstexte */
  updated: "Oktober 2026",
};

/** Aufsichtsbehörde für Datenschutz am Sitz in Darmstadt (Hessen) */
export const dpa = {
  name: "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit",
  address: "Gustav-Stresemann-Ring 1, 65189 Wiesbaden",
  url: "https://datenschutz.hessen.de",
};

/** Angaben zu den Dienstleistern, die je nach Konfiguration in der Datenschutzerklärung erscheinen. */
export const processors = {
  vercel: {
    name: "Vercel Inc.",
    seat: "USA",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
    dpf: true,
  },
  "github-pages": {
    name: "GitHub Inc.",
    seat: "USA",
    privacyUrl: "https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement",
    dpf: true,
  },
  stripe: {
    name: "Stripe Payments Europe, Limited",
    seat: "Irland",
    privacyUrl: "https://stripe.com/de/privacy",
    dpf: false,
  },
  lemonsqueezy: {
    name: "Lemon Squeezy, LLC",
    seat: "USA",
    privacyUrl: "https://www.lemonsqueezy.com/privacy",
    dpf: false,
  },
  paddle: {
    name: "Paddle.com Market Limited",
    seat: "Vereinigtes Königreich",
    privacyUrl: "https://www.paddle.com/legal/privacy",
    dpf: false,
  },
  digistore24: {
    name: "Digistore24 GmbH",
    seat: "Deutschland",
    privacyUrl: "https://www.digistore24.com/page/privacy",
    dpf: false,
  },
  formspree: {
    name: "Formspree, Inc.",
    seat: "USA",
    privacyUrl: "https://formspree.io/legal/privacy-policy/",
    dpf: false,
  },
  calendly: {
    name: "Calendly LLC",
    seat: "USA",
    privacyUrl: "https://calendly.com/privacy",
    dpf: true,
  },
};

/** Offene Pflichtangaben – für Hinweisbox und Build-Warnung */
export function openLegalItems(): string[] {
  const open: string[] = [];
  if (legal.vatId === null) open.push("Umsatzsteuer-ID (oder „keine“) in src/config/legal.ts");
  if (legal.brokerPermitAuthority === null)
    open.push("Angabe zur Erlaubnis nach § 34c GewO (oder „keine“) in src/config/legal.ts");
  if (forms.teaserLeadEndpoint && !legal.teaserLeadProvider)
    open.push("Newsletter-Anbieter (legal.teaserLeadProvider) in src/config/legal.ts");
  if (forms.contactEndpoint && !forms.contactEndpoint.includes("formspree.io"))
    open.push("Formular-Dienstleister im Abschnitt Kontakt von src/pages/datenschutz.astro");
  return open;
}
