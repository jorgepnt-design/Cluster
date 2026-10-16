/**
 * Shop-Konfiguration – die EINZIGE Stelle, an der der Zahlungsanbieter
 * eingebunden wird. Layout und Komponenten lesen nur aus dieser Datei.
 *
 * Solange `provider` = "none" ist, öffnet „Snapshot kaufen“ ein Hinweis-Fenster
 * mit vorausgefüllter Bestell-E-Mail. Anleitung zum Umstellen: README.md.
 */

export type Provider = "none" | "stripe" | "lemonsqueezy" | "paddle" | "digistore24";

export const shop = {
  provider: "none" as Provider, // später: "stripe" | "lemonsqueezy" | "paddle" | "digistore24"
  currency: "EUR",
  pricesNet: { snapshot: 490, profil: 1490 },
  vatNote: "zzgl. gesetzlicher USt.",
  checkoutLinks: {
    // pro Stadt-Slug, später eintragen
    // "aachen": "https://buy.stripe.com/...",
  } as Record<string, string>,
  bundles: { grossregion: null, alle39: null } as Record<BundleKey, string | null>,
  orderEmail: "np@loc-in.com",
};

export type BundleKey = "grossregion" | "alle39";

/**
 * Zusatzpakete. `enabled: false` blendet ein Paket komplett aus.
 * `priceNet: null` zeigt „Preis auf Anfrage“.
 */
export const bundleOffers: Record<
  BundleKey,
  { enabled: boolean; title: string; description: string; priceNet: number | null; cities: string[] }
> = {
  grossregion: {
    enabled: true,
    title: "Großregion-Paket",
    description: "Vier Standort-Snapshots für den Raum Saar-Lor-Lux-Trier.",
    priceNet: null, // PLATZHALTER: Paketpreis netto eintragen
    cities: ["luxemburg", "metz", "saarbruecken", "trier"],
  },
  alle39: {
    enabled: true,
    title: "Alle 39 Snapshots",
    description: "Sämtliche Standort-Snapshots als Gesamtpaket.",
    priceNet: null, // PLATZHALTER: Paketpreis netto eintragen
    cities: [],
  },
};

/** Ist ein Online-Checkout für diesen Schlüssel hinterlegt? */
export function checkoutUrl(key: string, kind: "city" | "bundle" = "city"): string | null {
  if (shop.provider === "none") return null;
  const link =
    kind === "city" ? shop.checkoutLinks[key] : shop.bundles[key as BundleKey];
  return link ?? null;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: shop.currency,
    maximumFractionDigits: 0,
  }).format(value);
}
