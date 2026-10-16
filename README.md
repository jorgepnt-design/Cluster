# LOC-IN – European Cluster Intelligence

Landingpage für **LOC-IN – Cluster Management as a Service**: Standortanalysen zu 39 Städten in Deutschland, Frankreich und Luxemburg. Kostenloser Teaser, kostenpflichtiger Standort-Snapshot, Clusterprofil und Mandate auf Anfrage.

**Stack:** [Astro](https://astro.build) (statisch) und [Tailwind CSS 4](https://tailwindcss.com). Es gibt keinen Server, keine Datenbank, kein Tracking und keine Cookies.

---

## Lokale Entwicklung

Voraussetzung: Node.js ≥ 22.22

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # statische Seite nach dist/
npm run preview   # gebaute Seite lokal ansehen
npm run check     # Typprüfung
```

## Projektstruktur

```
src/
  config/
    shop.ts        ← Zahlungsanbieter, Preise, Checkout-Links, Pakete
    site.ts        ← Kontaktdaten, Formular-Endpunkte, Terminbuchung
    products.ts    ← Angebotsstufen, Inhaltsverzeichnis des Snapshots
  data/
    cities.json    ← Daten der 39 Städte (unverändert übernommen)
  components/      ← Hero, Katalog, BuyButton, TeaserButton, FAQ, Kontakt …
  layouts/         ← Basislayout (SEO, Open Graph), Rechtsseiten
  pages/
    index.astro            ← One-Pager
    staedte/[slug].astro   ← 39 Stadtseiten, statisch aus cities.json
    impressum, datenschutz, agb, widerruf, 404
    sitemap.xml.ts, robots.txt.ts
public/
  downloads/teaser/  ← NUR die kostenlosen Teaser-PDFs
  previews/          ← optionale Vorschaubilder <slug>.png
```

Eine neue Stadt kommt dazu, indem Sie einen Eintrag in `src/data/cities.json` ergänzen. Für die Karte tragen Sie zusätzlich die Koordinaten in `src/lib/geo.ts` ein.

---

## Teaser und Vorschaubilder ablegen

1. Legen Sie die Teaser-PDFs unter **`public/downloads/teaser/`** ab. Die Dateinamen stehen in `cities.json` unter `files.teaser`, z. B. `Aachen_2_Teaser.pdf`.
2. Optional legen Sie ein Vorschaubild der ersten Teaser-Seite als **`public/previews/<slug>.png`** ab (z. B. `freiburg.png`, Hochformat A4, ca. 600 × 848 px). Die Stadtseite zeigt das Bild automatisch an, sonst einen Platzhalter.

> **Wichtig – Sicherheit**
> - **Snapshots (`*_3_Snapshot.pdf`) gehören NICHT ins Repository und nicht nach `public/`.** Alles in `public/` ist frei abrufbar. Sie werden über den Zahlungsanbieter ausgeliefert (siehe unten).
> - **Interne Analysen (`*_1_Intern_Analyse.pdf`) gehören weder auf die Website noch ins Repository.**
> - Die `.gitignore` blockiert beide Dateimuster zusätzlich.

### Teaser hinter E-Mail-Formular

Solange `forms.teaserLeadEndpoint` in `src/config/site.ts` auf `null` steht, ist der Teaser ein direkter Download-Link. Tragen Sie dort den Formular-Endpunkt Ihres Newsletter-Tools ein (z. B. Brevo, Mailchimp oder Formspree). Dann öffnet „Teaser (gratis)“ ein kurzes E-Mail-Formular. Nach dem Absenden startet der Download. Gesendet werden die Felder `email` und `stadt`.

### Kontaktformular

Ohne Endpunkt öffnet das Formular das E-Mail-Programm mit vorausgefüllter Nachricht an np@loc-in.com. Für echten Versand tragen Sie in `src/config/site.ts` unter `forms.contactEndpoint` z. B. `https://formspree.io/f/xxxxxxx` ein. Mit `forms.bookingUrl` (z. B. Calendly) erscheint zusätzlich ein Button „Termin buchen“.

---

## Zahlungsanbieter einbinden

Der Anbieter wird **ausschließlich in `src/config/shop.ts`** eingebunden. Layout und Komponenten bleiben unverändert.

Solange `provider: "none"` gesetzt ist, öffnet **„Snapshot kaufen“** ein Fenster mit dem Hinweis „Der Online-Kauf wird in Kürze freigeschaltet“ und einem Button, der eine vorausgefüllte Bestell-E-Mail öffnet (Betreff `Snapshot <Stadt>`).

Sobald ein Anbieter gesetzt ist **und** für eine Stadt ein Checkout-Link hinterlegt ist, wird der Button zu einem direkten Link zum Checkout. Städte ohne Link behalten automatisch das Bestell-Fenster. So können Sie schrittweise freischalten.

### Beispiel A: Stripe Payment Links

1. **Produkte anlegen:** Stripe-Dashboard → *Produktkatalog* → *Produkt hinzufügen*, z. B. „Standort-Snapshot Aachen“, Preis 490,00 EUR, einmalig. Im Bereich *Steuern* stellen Sie „Preis exklusive Steuern“ ein und aktivieren Stripe Tax oder hinterlegen einen Steuersatz.
2. **Payment Link erstellen:** Beim Produkt → *Zahlungslink erstellen*.
   - *Nach der Zahlung* → „Bestätigungsseite anzeigen“ und dort einen Download-Hinweis eintragen. Alternativ → „Weiterleitung“ auf eine Seite Ihres Datei-Dienstes, der signierte Download-Links ausgibt.
   - Aktivieren Sie *Rechnungsadresse erfassen*, *Firmennamen erfassen* und *Steuer-ID erfassen* (für B2B).
   - Aktivieren Sie *Rechnung erstellen* („Post-purchase invoice“). Dann erhält der Käufer eine Rechnung mit ausgewiesener USt.
3. **Auslieferung des PDFs:** Stripe liefert selbst keine Dateien aus. Sie haben drei Möglichkeiten:
   - den PDF-Versand per E-Mail nach Zahlungseingang (manuell oder per Zapier/Make mit dem Stripe-Ereignis `checkout.session.completed`),
   - einen Download-Dienst, der signierte, zeitlich begrenzte Links erzeugt,
   - einen Anbieter mit eingebauter Dateiauslieferung (siehe Lemon Squeezy).
4. **Konfiguration:**
   ```ts
   export const shop = {
     provider: "stripe",
     // …
     checkoutLinks: {
       aachen: "https://buy.stripe.com/abc123",
       freiburg: "https://buy.stripe.com/def456",
     },
     bundles: { grossregion: "https://buy.stripe.com/ghi789", alle39: null },
   };
   ```
5. `npm run build` ausführen und deployen.

### Beispiel B: Lemon Squeezy (mit Dateiauslieferung)

Lemon Squeezy tritt als „Merchant of Record“ auf: Der Dienst rechnet die Umsatzsteuer ab, stellt die Rechnungen aus und liefert die Datei nach dem Kauf automatisch aus.

1. **Store anlegen** und verifizieren.
2. **Produkt anlegen:** *Products* → *New product*, z. B. „Standort-Snapshot Aachen“, 490 EUR. Unter *Files* laden Sie `Aachen_3_Snapshot.pdf` hoch. Die Datei liegt damit nur bei Lemon Squeezy, nicht auf der Website.
3. **Checkout-Link kopieren:** beim Produkt → *Share* → Link `https://<store>.lemonsqueezy.com/checkout/buy/<id>`.
4. **Konfiguration:**
   ```ts
   export const shop = {
     provider: "lemonsqueezy",
     // …
     checkoutLinks: {
       aachen: "https://loc-in.lemonsqueezy.com/checkout/buy/xxxxxxxx",
     },
   };
   ```
   Mit `provider: "lemonsqueezy"` lädt die Seite automatisch das Lemon-Squeezy-Skript. Der Checkout öffnet sich dann als Overlay über der Seite. Wenn Sie lieber auf die Checkout-Seite wechseln wollen, entfernen Sie die Klasse `lemonsqueezy-button` in `src/components/BuyButton.astro`.
5. Build und Deployment.

**Paddle / Digistore24:** Hier gehen Sie genauso vor. Sie tragen `provider` und die Checkout-URLs der Produkte in `checkoutLinks` ein.

### Preise und Pakete

- Die Einzelpreise stehen in `shop.pricesNet` (`snapshot`, `profil`). Sie erscheinen überall auf der Seite und in den strukturierten Daten (schema.org/Product).
- Die Pakete stehen in `bundleOffers`: `enabled: false` blendet ein Paket aus, `priceNet: null` zeigt „Preis auf Anfrage“. Die Checkout-Links tragen Sie in `shop.bundles` ein.

---

## Deployment

### Vercel (empfohlen)

1. Melden Sie sich auf [vercel.com](https://vercel.com) an → *Add New Project* → Repository `jorgepnt-design/Cluster` importieren.
2. Das Framework-Preset „Astro“ wird erkannt. Build Command: `npm run build`, Output: `dist`.
3. Unter *Environment Variables* setzen Sie `SITE_URL` auf die endgültige Domain, z. B. `https://analysen.loc-in.com`. Davon hängen Canonical-URLs, Sitemap und Open-Graph-Tags ab.
4. Die eigene Domain fügen Sie unter *Settings → Domains* hinzu.

### GitHub Pages

Der Workflow `.github/workflows/deploy.yml` liegt bereits im Repository.

1. Repository → *Settings → Pages* → *Source: GitHub Actions*.
2. Unter *Settings → Secrets and variables → Actions → Variables* setzen Sie:
   - `SITE_URL`, z. B. `https://jorgepnt-design.github.io` oder die eigene Domain
   - `BASE_PATH`: `/Cluster` ohne eigene Domain, `/` mit eigener Domain
3. *Actions* → „Deploy to GitHub Pages“ → *Run workflow*. Wenn bei jedem Push auf `main` automatisch veröffentlicht werden soll, aktivieren Sie den `push`-Trigger in der Workflow-Datei.

---

## Qualität

- Lighthouse (lokal gemessen, Startseite und Stadtseite, mobil und Desktop): je 100 in Performance, Barrierefreiheit, Best Practices und SEO.
- `npm run build` und `npm run check` laufen ohne Fehler und Warnungen.
- Mobile first, geprüft ab 360 px Breite ohne horizontales Scrollen.

## Offene Platzhalter

| Was | Wo |
|---|---|
| Checkout-Links je Stadt und Anbieter | `src/config/shop.ts` → `provider`, `checkoutLinks` |
| Paketpreise und Paket-Links | `src/config/shop.ts` → `bundleOffers[…].priceNet`, `shop.bundles` |
| Formular-Endpunkt Kontakt | `src/config/site.ts` → `forms.contactEndpoint` |
| Endpunkt Newsletter/Teaser-Lead | `src/config/site.ts` → `forms.teaserLeadEndpoint` |
| Link zur Terminbuchung (optional) | `src/config/site.ts` → `forms.bookingUrl` |
| Endgültige Domain | Umgebungsvariable `SITE_URL` |
| Teaser-PDFs | `public/downloads/teaser/` |
| Vorschaubilder der Teaser (optional) | `public/previews/<slug>.png` |
| Foto Nicole Da Costa Pinto | `src/components/About.astro` (Platzhalter mit Kommentar) |
| Inhaltsverzeichnis des Snapshots mit den PDFs abgleichen | `src/config/products.ts` → `snapshotToc` |
| Rechtstexte: Impressum (USt-ID, V. i. S. d. MStV), Datenschutz, AGB, Widerruf | `src/pages/*.astro` |
