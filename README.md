# SINT S.r.l. — sito web

Sito istituzionale di SINT S.r.l. (Meda, MB), multipagina e multilingua.
Nato dalla conversione del prototipo realizzato su Bolt (`LucasPlatforms/sintsrl-prototipo`).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · next-intl 4

## Avvio rapido

Serve Node.js 20.9 o superiore.

```bash
npm install
npm run dev        # sviluppo su http://localhost:3000
npm run build      # build di produzione (fa anche il controllo dei tipi)
npm run start      # avvia la build di produzione
npm run lint
npm run typecheck
```

Copia `.env.example` in `.env.local` e imposta `NEXT_PUBLIC_SITE_URL` se il dominio non è `https://www.sintsrl.it`.

## URL e lingue

L'italiano è la lingua principale e non ha prefisso; l'inglese ha il prefisso `/en` e slug tradotti.

| Pagina | Italiano | Inglese |
|---|---|---|
| Home | `/` | `/en` |
| Chi siamo | `/chi-siamo` | `/en/about-us` |
| Servizi | `/servizi` | `/en/services` |
| Clienti | `/clienti` | `/en/clients` |
| Contatti | `/contatti` | `/en/contact` |
| Privacy | `/privacy` | `/en/privacy` |
| Cookie | `/cookie-policy` | `/en/cookie-policy` |

La lingua dipende solo dall'URL: nessun redirect automatico in base al browser.
Ogni pagina ha `<html lang>`, canonical e `hreflang` corretti; `sitemap.xml` e `robots.txt` sono generati in automatico.

## Struttura

```
messages/
  it.json, en.json        Tutti i testi del sito, una copia per lingua
src/
  app/
    [locale]/             Pagine (la cartella prende il nome italiano della rotta)
      layout.tsx          Layout comune: header, footer, font, metadata di base
      page.tsx            Home (riassume tutte le sezioni)
      chi-siamo/ servizi/ clienti/ contatti/ privacy/ cookie-policy/
      not-found.tsx       404 tradotta
    globals.css           Tailwind: palette, font, breakpoint e utility del progetto
    sitemap.ts, robots.ts, icon.svg
  components/
    layout/               Header (menu + selettore lingua), Footer, BrandMark
    sections/             Hero, About, Services, Clients, Contact, LegalPage
    ui/                   Elementi riutilizzabili (Kicker, AccentHeading)
    seo/                  Dati strutturati per Google
  config/
    site.ts               Dati aziendali (indirizzo, telefono, P.IVA, dominio)
    navigation.ts         Voci del menu
  data/clients.ts         Elenco "altri clienti" (nomi propri, uguali in ogni lingua)
  i18n/
    routing.ts            Lingue e slug tradotti
    request.ts            Caricamento dei testi per lingua
    navigation.ts         Link e usePathname che conoscono le lingue
    messages-check.ts     Verifica che en.json abbia le stesse chiavi di it.json
  proxy.ts                Instradamento delle lingue (in Next 16 sostituisce middleware.ts)
```

## Operazioni frequenti

**Modificare un testo.** Cambialo in `messages/it.json` e nella stessa posizione in `messages/en.json`.
Se una chiave manca in una delle due lingue, `npm run build` si ferma e indica quale.

**Modificare indirizzo, telefono, email o P.IVA.** `src/config/site.ts`.

**Aggiungere una pagina.**
1. Crea `src/app/[locale]/<slug-italiano>/page.tsx` (prendi come modello `servizi/page.tsx`).
2. Aggiungi la rotta in `pathnames` dentro `src/i18n/routing.ts`, con lo slug per ogni lingua.
3. Aggiungi i testi in `messages/*.json` e, se serve, la voce in `src/config/navigation.ts`.

**Aggiungere una lingua** (es. tedesco).
1. Aggiungi `"de"` a `locales` in `src/i18n/routing.ts` e lo slug tedesco di ogni pagina in `pathnames`.
2. Crea `messages/de.json` copiando `it.json` e traducendo i valori.
3. Aggiungi `de` in `ogLocales` (`src/config/site.ts`), il nome in `languages` dentro ogni file di testo e una riga di controllo in `src/i18n/messages-check.ts`.

**Stili.** Tailwind CSS 4: i colori del brand sono token in `src/app/globals.css` (`text-brand`, `bg-forest`, `text-mint`…).
Il layout passa alla versione mobile sotto gli 801px (`md:`), come nel prototipo.

## Pubblicazione

Il sito usa il proxy di Next.js per le lingue, quindi serve un hosting che supporti Next.js (non un hosting statico puro):

- **Vercel**: supporto nativo. Il piano gratuito (Hobby) è solo per uso non commerciale: per un sito aziendale serve il piano Pro.
- **Netlify**: supporta Next.js e ha un piano gratuito utilizzabile anche per siti commerciali.

In entrambi i casi: collega il repository GitHub, imposta `NEXT_PUBLIC_SITE_URL`, e ogni push su `main` pubblica il sito.
Al cambio di DNS non toccare i record MX, altrimenti si interrompono le email @sintsrl.it.

## Da completare prima del lancio

- [ ] Logo ufficiale in SVG (`BrandMark.tsx` e `app/icon.svg` sono provvisori)
- [ ] Autorizzazioni del cliente per case study e nomi dei clienti (`messages/*.json`, `src/data/clients.ts`)
- [ ] Conferma del team da pubblicare (nomi, ruoli, eventuali figure amministrative)
- [ ] Revisione della traduzione inglese da parte di un traduttore tecnico
- [ ] Testi di privacy e cookie policy
- [ ] Immagine di condivisione social 1200×630 (`opengraph-image`)
- [ ] Redirect 301 dalle pagine del sito attuale sintsrl.it
- [ ] Google Search Console e invio della sitemap

## Licenze

I font DM Sans e Manrope sono distribuiti con licenza SIL Open Font License (testo in `src/app/fonts/`).
