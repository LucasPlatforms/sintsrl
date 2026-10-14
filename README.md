# SINT S.r.l. — sito web

Sito istituzionale di SINT S.r.l. (Meda, MB): pagina unica con sezioni raggiungibili dal menu, multilingua.
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

Tutto il contenuto sta in una pagina; il menu scorre alle sezioni tramite ancore tradotte.
L'italiano non ha prefisso, l'inglese ha il prefisso `/en`.

| Sezione | Italiano | Inglese |
|---|---|---|
| Home | `/` | `/en` |
| Chi siamo | `/#chi-siamo` | `/en#about-us` |
| Servizi | `/#servizi` | `/en#services` |
| Clienti | `/#clienti` | `/en#clients` |
| Contatti | `/#contatti` | `/en#contact` |
| Privacy (pagina separata) | `/privacy` | `/en/privacy` |
| Cookie (pagina separata) | `/cookie-policy` | `/en/cookie-policy` |

- L'header è fisso: la voce della sezione visibile si evidenzia mentre si scorre.
- Il selettore IT/EN porta alla stessa sezione nell'altra lingua.
- Dalle pagine privacy e cookie, le voci del menu riportano alla home sulla sezione scelta.
- La lingua dipende solo dall'URL: nessun redirect automatico in base al browser.
- Ogni pagina ha `<html lang>`, canonical e `hreflang` corretti; `sitemap.xml` e `robots.txt` sono generati in automatico.

## Struttura

```
messages/
  it.json, en.json        Tutti i testi del sito, una copia per lingua
src/
  app/
    [locale]/             Pagine (la cartella prende il nome italiano della rotta)
      layout.tsx          Layout comune: header, footer, font, metadata di base
      page.tsx            La pagina unica con tutte le sezioni
      privacy/ cookie-policy/   Pagine legali separate
      not-found.tsx       404 tradotta
    globals.css           Tailwind: palette, font, breakpoint e utility del progetto
    sitemap.ts, robots.ts, icon.svg
  components/
    layout/               Header (menu con sezione attiva + selettore lingua), Footer, BrandMark
    sections/             Hero, About, Services, Clients, Contact, LegalPage
    ui/                   Elementi riutilizzabili (Kicker, AccentHeading)
    seo/                  Dati strutturati per Google
  config/
    site.ts               Dati aziendali (indirizzo, telefono, P.IVA, dominio)
    navigation.ts         Voci del menu e ancore tradotte delle sezioni
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

**Aggiungere una sezione alla pagina.**
1. Crea il componente in `src/components/sections/` (prendi come modello `ServicesSection.tsx`):
   il tag `<section>` deve avere `id={sectionIds.<chiave>[locale]}` e `data-section="<chiave>"`.
2. In `src/config/navigation.ts` aggiungi la chiave a `SectionKey`, l'ancora per ogni lingua in `sectionIds`
   e, se deve comparire nel menu, la chiave in `mainNav`.
3. Aggiungi l'etichetta in `nav` e i testi della sezione in `messages/*.json`, poi inserisci il componente in `src/app/[locale]/page.tsx`.

**Aggiungere una pagina separata** (come privacy).
1. Crea `src/app/[locale]/<slug-italiano>/page.tsx` (modello: `privacy/page.tsx`).
2. Aggiungi la rotta in `pathnames` dentro `src/i18n/routing.ts`, con lo slug per ogni lingua.

**Aggiungere una lingua** (es. tedesco).
1. Aggiungi `"de"` a `locales` in `src/i18n/routing.ts`, lo slug tedesco di ogni pagina in `pathnames`
   e l'ancora tedesca di ogni sezione in `src/config/navigation.ts`.
2. Crea `messages/de.json` copiando `it.json` e traducendo i valori.
3. Aggiungi `de` in `ogLocales` (`src/config/site.ts`), il nome in `languages` dentro ogni file di testo e una riga di controllo in `src/i18n/messages-check.ts`.

**Stili.** Tailwind CSS 4: i colori del brand sono token in `src/app/globals.css` (`text-brand`, `bg-forest`, `text-mint`…).
Il layout passa alla versione mobile sotto gli 801px (`md:`), come nel prototipo.

## Pubblicazione (Vercel + dominio su Aruba)

Il sito usa il proxy di Next.js per le lingue: serve un hosting con supporto Next.js. Scelta: **Vercel**,
con dominio ed email che restano su Aruba.

1. Su Vercel importa il repository e imposta la variabile `NEXT_PUBLIC_SITE_URL=https://www.sintsrl.it`.
   Il piano Hobby è per uso non commerciale: per un sito aziendale serve il piano Pro.
2. In Vercel → Domains aggiungi `www.sintsrl.it` (principale) e `sintsrl.it` (redirect verso www).
3. Nel pannello Aruba (Dominio → Gestione DNS e Name Server), dopo aver salvato uno screenshot dei record attuali,
   modifica **solo** il record A di `sintsrl.it` e il CNAME di `www` con i valori indicati da Vercel.
   Non toccare MX, TXT (SPF) e i record `mail`, `smtp`, `pop3`, `imap`: le email @sintsrl.it restano su Aruba.
4. Ogni push su `main` pubblica il sito; ogni branch o pull request ha un'anteprima.

## Da completare prima del lancio

- [ ] Logo ufficiale in SVG (`BrandMark.tsx` e `app/icon.svg` sono provvisori; il PNG fornito è 349×198 px, troppo piccolo)
- [ ] Autorizzazioni del cliente per case study e nomi dei clienti (`messages/*.json`, `src/data/clients.ts`)
- [ ] Conferma del team da pubblicare (nomi, ruoli, eventuali figure amministrative)
- [ ] Revisione della traduzione inglese da parte di un traduttore tecnico
- [ ] Testi di privacy e cookie policy
- [ ] Immagine di condivisione social 1200×630 (`opengraph-image`)
- [ ] Redirect 301 dalle pagine del sito attuale sintsrl.it
- [ ] Google Search Console e invio della sitemap

## Licenze

I font DM Sans e Manrope sono distribuiti con licenza SIL Open Font License (testo in `src/app/fonts/`).
