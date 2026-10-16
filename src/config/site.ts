/** Allgemeine Angaben zur Website und zu LOC-IN. */
export const site = {
  name: "LOC-IN",
  product: "European Cluster Intelligence",
  claim: "Cluster Management as a Service",
  stand: "15.10.2026",
  description:
    "Standortanalysen für 39 Städte in Deutschland, Frankreich und Luxemburg – belegt mit Quellen, verglichen mit Frankreich und Italien. Für Wirtschaftsförderungen, Projektentwickler und Investoren.",
  person: "Nicole Da Costa Pinto",
  address: { street: "Robert-Bosch-Straße 7", city: "64293 Darmstadt" },
  email: "np@loc-in.com",
  phone: "+49 176 96032577",
  phoneHref: "+4917696032577",
  web: "https://www.loc-in.com",
  b2bNote: "Das Angebot richtet sich ausschließlich an Unternehmen und öffentliche Auftraggeber.",
};

/**
 * Formulare – noch ohne eigene Server-Logik.
 * endpoint = null  → Fallback (E-Mail-Programm bzw. direkter Download)
 * endpoint = URL   → Formular wird per POST dorthin geschickt (z. B. Formspree)
 */
export const forms = {
  // PLATZHALTER: z. B. "https://formspree.io/f/xxxxxxx"
  contactEndpoint: null as string | null,
  // PLATZHALTER: Endpunkt des Newsletter-Tools (z. B. Brevo-, Mailchimp- oder Formspree-Formular)
  teaserLeadEndpoint: null as string | null,
  // PLATZHALTER: Link zur Terminbuchung (z. B. Calendly). null = Button ausblenden
  bookingUrl: null as string | null,
};
