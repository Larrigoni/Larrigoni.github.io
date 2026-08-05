// ⚠️ OBSOLETO (2026-08-05, vedi ADR-008): questo script replica il PRIMO
// design (minimale) e il progetto Claude Design è ora più avanti (design
// "racing pop"). NON rigenerare e ricaricare il bundle senza prima
// aggiornare lo script, o si sovrascrive il lavoro fatto sulla piattaforma.
//
// Genera il bundle di card HTML per il progetto Claude Design
// "Lorenzo Arrigoni — Portfolio". Ogni card è autonoma: font in data-URI,
// CSS inline, prima riga marker <!-- @dsCard group="…" -->.
//
// Prerequisito: `npm run build` (le card Pages partono da dist/).
// Uso: node scripts/gen-design-bundle.mjs [cartella-output]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = fileURLToPath(new URL('..', import.meta.url));
const OUT = process.argv[2] ?? join(REPO, '.design-bundle');

const b64 = (p) => readFileSync(p).toString('base64');
const F = {
  archivoLatin: b64(join(REPO, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')),
  archivoLatinExt: b64(join(REPO, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-ext-wght-normal.woff2')),
  mono400: b64(join(REPO, 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2')),
  mono500: b64(join(REPO, 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2')),
};

const FONT_CSS = `
@font-face{font-family:'Archivo Variable';font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${F.archivoLatin}) format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Archivo Variable';font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${F.archivoLatinExt}) format('woff2-variations');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:400;font-display:swap;src:url(data:font/woff2;base64,${F.mono400}) format('woff2')}
@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:500;font-display:swap;src:url(data:font/woff2;base64,${F.mono500}) format('woff2')}
`;

// Token e stili base — copia fedele di src/styles/global.css (senza animazioni)
const BASE_CSS = `
:root{--paper:#f6f3ec;--paper-raised:#fdfbf6;--ink:#17140d;--ink-soft:#625c4e;--line:rgba(23,20,13,.16);--line-strong:rgba(23,20,13,.6);--accent:#a8362c;--font-sans:'Archivo Variable',system-ui,-apple-system,sans-serif;--font-mono:'IBM Plex Mono',ui-monospace,'Cascadia Mono',monospace;--site-max:72rem;--measure:44rem;--pad-x:clamp(1.25rem,5vw,3rem);--section-gap:clamp(4rem,10vw,7rem)}
*,*::before,*::after{box-sizing:border-box;margin:0}
html{color-scheme:light}
body{background:var(--paper);color:var(--ink);font-family:var(--font-sans);font-size:1.0625rem;line-height:1.65;-webkit-font-smoothing:antialiased;padding:1.75rem}
h1,h2,h3{line-height:1.1;font-weight:640;letter-spacing:-.015em;text-wrap:balance}
a{color:inherit;text-decoration-thickness:1px;text-underline-offset:.2em}
a:hover{color:var(--accent)}
.label{font-family:var(--font-mono);font-size:.75rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft)}
.section-head{display:flex;align-items:baseline;gap:1rem;border-top:1px solid var(--line-strong);padding-top:.85rem}
.section-num{font-family:var(--font-mono);font-size:.8rem;font-weight:500;color:var(--accent)}
.section-head h2{font-size:clamp(1.5rem,3.5vw,2.1rem);text-transform:uppercase;letter-spacing:.02em}
`;

// Stili dei componenti — copie non-scoped degli stili nei file .astro
const COMPONENTS_CSS = `
/* Header */
.site-header{border-bottom:1px solid var(--line-strong);background:var(--paper)}
.site-header .bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding-block:.9rem}
.wordmark{font-weight:680;font-size:.95rem;letter-spacing:.16em;text-transform:uppercase;text-decoration:none}
.site-header nav{display:flex;gap:clamp(1rem,3vw,2rem)}
.site-header nav a{font-family:var(--font-mono);font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;text-decoration:none}
/* Hero */
.hero-eyebrow{font-family:var(--font-mono);font-size:.75rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft)}
.hero-title{font-size:clamp(3rem,12vw,7rem);font-weight:720;text-transform:uppercase;letter-spacing:-.025em;line-height:.95;margin-top:1.25rem}
.hero-tagline{margin-top:1.75rem;font-family:var(--font-mono);font-size:clamp(.85rem,2vw,1rem);font-weight:500;letter-spacing:.05em;color:var(--accent)}
.hero-lead{margin-top:1rem;font-size:clamp(1.2rem,3vw,1.6rem);font-weight:460;max-width:34ch}
.hero-tools{margin-top:1.5rem}
.hero-grid{background-image:radial-gradient(var(--line) 1px,transparent 1px);background-size:26px 26px}
/* Striscia metodo */
.process{list-style:none;padding:.9rem 0;margin:0;border-top:1px solid var(--line-strong);border-bottom:1px solid var(--line-strong);display:flex;flex-wrap:wrap;gap:.4rem 1.6rem;background:var(--paper)}
.process li{font-family:var(--font-mono);font-size:.72rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.process li:not(:last-child)::after{content:'→';margin-left:1.6rem;color:var(--ink-soft)}
.step-num{color:var(--accent);margin-right:.45rem}
/* Griglia capacità */
.cap-grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:0;border-top:1px solid var(--line);border-left:1px solid var(--line)}
.cap-grid li{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:1.1rem 1.2rem;font-weight:500;font-size:.98rem;display:flex;gap:.8rem;align-items:baseline;background:var(--paper-raised)}
.cap-num{font-family:var(--font-mono);font-size:.72rem;color:var(--accent)}
/* Card progetto */
.pcard{border:1px solid var(--ink);background:var(--paper-raised);padding:clamp(1.5rem,4vw,2.25rem);display:flex;flex-direction:column;gap:1.1rem;max-width:44rem}
.pcard:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 rgba(23,20,13,.12)}
.badges{display:flex;flex-wrap:wrap;gap:.5rem}
.badge{font-family:var(--font-mono);font-size:.7rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--line-strong);padding:.25rem .6rem}
.badge.accent{border-color:var(--accent);color:var(--accent)}
.pcard h3{font-size:clamp(1.4rem,3vw,1.8rem)}
.pcard .summary{color:var(--ink-soft);max-width:38rem}
.pcard .meta{display:flex;flex-wrap:wrap;gap:1rem 2.5rem;border-top:1px solid var(--line);padding-top:1.1rem}
.pcard .meta dd{margin:.15rem 0 0;font-size:.9rem}
.pcard .note{color:var(--accent)}
/* Card placeholder */
.placeholder-card{border:1px dashed var(--line-strong);padding:clamp(1.25rem,3vw,1.75rem);color:var(--ink-soft);display:flex;flex-direction:column;gap:.5rem;max-width:44rem}
/* CTA contatto */
.cta{font-size:clamp(1.6rem,4.5vw,2.6rem);font-weight:640;letter-spacing:-.015em;line-height:1.15;max-width:24ch;margin-bottom:1.25rem}
.contact-placeholder{margin-top:2rem;border:1px dashed var(--accent);padding:clamp(1.25rem,3vw,1.75rem);max-width:var(--measure);display:flex;flex-direction:column;gap:.5rem}
.contact-placeholder .label{color:var(--accent)}
/* Footer */
.site-footer{border-top:1px solid var(--line-strong)}
.site-footer .grid{display:flex;flex-wrap:wrap;justify-content:space-between;gap:1.25rem 3rem;padding-block:2rem 2.5rem}
.site-footer .colophon{font-size:.9rem;color:var(--ink-soft);line-height:1.7}
.site-footer .meta{line-height:2}
`;

const doc = (group, title, body, extraCss = '') =>
  `<!-- @dsCard group="${group}" -->\n<!doctype html>\n<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>${FONT_CSS}${BASE_CSS}${COMPONENTS_CSS}${extraCss}</style></head>\n<body>\n${body}\n</body></html>\n`;

const cards = [];

// ---------- Colors ----------
const swatches = [
  ['Paper', '#f6f3ec', 'sfondo pagina'],
  ['Paper raised', '#fdfbf6', 'card e superfici'],
  ['Ink', '#17140d', 'testo principale'],
  ['Ink soft', '#625c4e', 'testo secondario'],
  ['Line', 'rgba(23,20,13,.16)', 'hairline leggere'],
  ['Line strong', 'rgba(23,20,13,.6)', 'hairline marcate'],
  ['Accent', '#a8362c', 'vermiglio — badge, numeri, CTA'],
];
cards.push({
  path: 'colors/palette.html',
  html: doc(
    'Colors',
    'Palette — Lorenzo Arrigoni',
    `<p class="label" style="margin-bottom:1.25rem">Palette · estetica "tavola tecnica"</p>
<div class="swatches">${swatches
      .map(
        ([name, val, use]) =>
          `<div class="sw"><div class="chip" style="background:${val}"></div><p class="sw-name">${name}</p><p class="sw-val">${val}</p><p class="sw-use">${use}</p></div>`
      )
      .join('')}</div>`,
    `.swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(10rem,1fr));gap:1.25rem}
.sw .chip{height:5.5rem;border:1px solid var(--line-strong)}
.sw-name{font-weight:640;margin-top:.6rem}
.sw-val{font-family:var(--font-mono);font-size:.75rem;color:var(--ink-soft)}
.sw-use{font-size:.8rem;color:var(--ink-soft)}`
  ),
});

// ---------- Type ----------
cards.push({
  path: 'type/typography.html',
  html: doc(
    'Type',
    'Tipografia — Lorenzo Arrigoni',
    `<p class="label" style="margin-bottom:1.5rem">Tipografia · Archivo Variable + IBM Plex Mono</p>
<div class="t-row"><span class="t-tag">Display · 720 · uppercase</span><p class="hero-title" style="font-size:clamp(2.5rem,8vw,4.5rem)">Lorenzo<br>Arrigoni</p></div>
<div class="t-row"><span class="t-tag">H2 sezione · 640 · uppercase</span><h2 style="font-size:2.1rem;text-transform:uppercase;letter-spacing:.02em">Cosa progetto</h2></div>
<div class="t-row"><span class="t-tag">H3 card · 640</span><h3 style="font-size:1.8rem">Maatbric Smart Business Card</h3></div>
<div class="t-row"><span class="t-tag">Body · 400 · 1.0625rem</span><p style="max-width:44rem">Progetto e realizzo oggetti che risolvono piccoli problemi reali: prototipi, accessori funzionali, ricambi non critici e oggetti intelligenti con NFC.</p></div>
<div class="t-row"><span class="t-tag">Label mono · 500 · tracking .14em</span><p class="label">Bambu Lab X2D · Autodesk Fusion</p></div>
<div class="t-row"><span class="t-tag">Numeri mono accent</span><p class="label"><span style="color:var(--accent)">01</span> Problema&ensp;<span style="color:var(--accent)">02</span> Analisi&ensp;<span style="color:var(--accent)">03</span> Vincoli</p></div>`,
    `.t-row{border-top:1px solid var(--line);padding:1.25rem 0;display:flex;flex-direction:column;gap:.75rem}
.t-tag{font-family:var(--font-mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}`
  ),
});

// ---------- Components ----------
cards.push({
  path: 'components/header.html',
  html: doc(
    'Components',
    'Header',
    `<header class="site-header" style="margin:-1.75rem -1.75rem 0"><div class="bar" style="padding-inline:1.75rem"><a class="wordmark" href="#">Lorenzo&nbsp;Arrigoni</a><nav><a href="#">Progetti</a><a href="#">Contatto</a></nav></div></header>`
  ),
});

cards.push({
  path: 'components/hero.html',
  html: doc(
    'Components',
    'Hero',
    `<div class="hero-grid" style="margin:-1.75rem;padding:3.5rem 1.75rem">
<p class="hero-eyebrow">Portfolio · Progettazione &amp; stampa 3D</p>
<h1 class="hero-title">Lorenzo<br>Arrigoni</h1>
<p class="hero-tagline">Progettazione 3D&ensp;·&ensp;Prototipazione&ensp;·&ensp;Soluzioni su misura</p>
<p class="hero-lead">Progetto e realizzo oggetti che risolvono piccoli problemi reali.</p>
<p class="label hero-tools">Bambu Lab X2D · Autodesk Fusion</p>
</div>`
  ),
});

cards.push({
  path: 'components/process-strip.html',
  html: doc(
    'Components',
    'Striscia metodo',
    `<ol class="process">${['Problema', 'Analisi', 'Vincoli', 'Progettazione', 'Prototipo', 'Test', 'Iterazione', 'Soluzione']
      .map((s, i) => `<li><span class="step-num">${String(i + 1).padStart(2, '0')}</span>${s}</li>`)
      .join('')}</ol>`
  ),
});

cards.push({
  path: 'components/section-head.html',
  html: doc(
    'Components',
    'Intestazione di sezione',
    `<div class="section-head"><span class="section-num">01</span><h2>Cosa progetto</h2></div>
<div style="height:2rem"></div>
<div class="section-head"><span class="section-num">02</span><h2>Progetti</h2></div>`
  ),
});

cards.push({
  path: 'components/cap-grid.html',
  html: doc(
    'Components',
    'Griglia "Cosa progetto"',
    `<ul class="cap-grid">${['Oggetti personalizzati', 'Prototipi', 'Accessori funzionali', 'Piccoli ricambi non critici', 'Organizer', 'Supporti', 'Adattatori', 'Oggetti intelligenti con NFC']
      .map((c, i) => `<li><span class="cap-num">${String(i + 1).padStart(2, '0')}</span>${c}</li>`)
      .join('')}</ul>`
  ),
});

cards.push({
  path: 'components/project-card.html',
  html: doc(
    'Components',
    'Card progetto — 2 varianti',
    `<p class="label" style="margin-bottom:1rem">Variante A · design originale</p>
<article class="pcard">
  <div class="badges"><span class="badge accent">Design originale</span><span class="badge">In sviluppo</span></div>
  <h3>Maatbric Smart Business Card</h3>
  <p class="summary">Biglietto da visita stampato in 3D con tag NFC integrato: avvicinando il telefono si apre una pagina contatto digitale, aggiornabile nel tempo senza ristampare il biglietto.</p>
  <dl class="meta"><div><dt class="label">Categoria</dt><dd>Smart Objects</dd></div><div><dt class="label">Stampante</dt><dd>Bambu Lab X2D</dd></div><div><dt class="label">Software</dt><dd>Autodesk Fusion</dd></div></dl>
  <p class="note label">Case study completo — in arrivo</p>
</article>
<p class="label" style="margin:2rem 0 1rem">Variante B · Print Lab (dati di esempio)</p>
<article class="pcard">
  <div class="badges"><span class="badge">Print Lab · modello di terzi</span><span class="badge">Completato</span></div>
  <h3>Esempio stampa da modello di terzi</h3>
  <p class="summary">Testo di esempio per la variante Print Lab: la card cita sempre autore, piattaforma e licenza del modello originale.</p>
  <dl class="meta"><div><dt class="label">Autore</dt><dd>— esempio —</dd></div><div><dt class="label">Piattaforma</dt><dd>— esempio —</dd></div><div><dt class="label">Licenza</dt><dd>— esempio —</dd></div></dl>
</article>`
  ),
});

cards.push({
  path: 'components/placeholder-card.html',
  html: doc(
    'Components',
    'Card placeholder',
    `<div class="placeholder-card"><span class="label">In lavorazione</span><p>Altri case study sono in preparazione e verranno pubblicati qui.</p></div>`
  ),
});

cards.push({
  path: 'components/contact-cta.html',
  html: doc(
    'Components',
    'CTA contatto',
    `<p class="cta">Hai un problema che potrebbe essere risolto con un oggetto su&nbsp;misura?</p>
<p style="max-width:44rem;color:var(--ink-soft)">Un pezzo introvabile, un supporto che non esiste, un accessorio che «quasi» funziona: raccontamelo e valutiamo insieme se si può progettare una soluzione.</p>
<div class="contact-placeholder"><span class="label">Placeholder · TODO</span><p>Canale di contatto in configurazione — l'indirizzo email e i profili social verranno pubblicati qui a breve.</p></div>`
  ),
});

cards.push({
  path: 'components/footer.html',
  html: doc(
    'Components',
    'Footer',
    `<footer class="site-footer" style="margin:0 -1.75rem -1.75rem"><div class="grid" style="padding-inline:1.75rem"><p class="colophon">© 2026 Lorenzo Arrigoni<br>Progettazione 3D · Prototipazione · Soluzioni su misura</p><p class="meta label">Social — in arrivo (placeholder)<br><a href="#">Codice sorgente su GitHub</a></p></div></footer>`
  ),
});

// ---------- Pages (da dist/, CSS inline, font in data-URI) ----------
const FONT_MAP = {
  'archivo-latin-wght-normal': F.archivoLatin,
  'archivo-latin-ext-wght-normal': F.archivoLatinExt,
  'ibm-plex-mono-latin-400-normal': F.mono400,
  'ibm-plex-mono-latin-500-normal': F.mono500,
};

function pageCard(distFile, extraCss = '') {
  let html = readFileSync(join(REPO, 'dist', distFile), 'utf8');
  html = html.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"\s*\/?>/g, (_m, href) => {
    let css = readFileSync(join(REPO, 'dist', href.slice(1)), 'utf8');
    css = css.replace(/url\(\/_astro\/([a-z0-9-]+)\.[\w-]+\.woff2\)/gi, (m, base) =>
      FONT_MAP[base] ? `url(data:font/woff2;base64,${FONT_MAP[base]})` : m
    );
    return `<style>${css}</style>`;
  });
  if (extraCss) html = html.replace('</head>', `<style>${extraCss}</style></head>`);
  return `<!-- @dsCard group="Pages" -->\n${html}`;
}

cards.push({ path: 'pages/home-desktop.html', html: pageCard('index.html') });
cards.push({
  path: 'pages/home-mobile.html',
  html: pageCard(
    'index.html',
    `html{background:#dedad0}body{max-width:375px;margin:1.5rem auto;outline:1px solid rgba(23,20,13,.35);box-shadow:0 12px 40px rgba(23,20,13,.18)}`
  ),
});
cards.push({ path: 'pages/404.html', html: pageCard('404.html') });

// ---------- scrittura ----------
for (const c of cards) {
  const p = join(OUT, c.path);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, c.html);
  console.log(`${c.path}  ${(c.html.length / 1024).toFixed(0)} KB`);
}
console.log(`\n${cards.length} card generate in ${OUT}`);
