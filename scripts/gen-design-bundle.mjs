#!/usr/bin/env node
/**
 * Genera il bundle di card per il progetto Claude Design «Lorenzo Arrigoni —
 * Portfolio» DAL BUILD DEL REPO (ADR-019).
 *
 *   node scripts/gen-design-bundle.mjs [--only colors,type,brief] [--no-build]
 *
 * Il bundle non contiene una copia del CSS: contiene il CSS compilato dal
 * build secondario (`astro.design.mjs`) e i componenti Astro reali, resi con
 * dati reali. Se il bundle diverge dal sito, è un bug di questo script.
 *
 * Ogni card è un HTML autonomo: CSS inline, font latin in data-URI (woff2),
 * immagini ridotte a WebP 800px in data-URI, prima riga
 * `<!-- @dsCard group="…" -->`. Le varianti mobile usano un iframe `srcdoc`
 * largo 375px, così le media query scattano davvero come su un telefono.
 *
 * Alla fine scrive `.design-bundle/manifest.json`: è la lista `writes` del
 * `finalize_plan` di DesignSync.
 */
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BUILD = path.join(ROOT, '.design-build');
const OUT = path.join(ROOT, '.design-bundle');

/**
 * Le card del bundle. `kit` = pagina di `src/design-kit/`, `page` = pagina
 * vera del sito, `palette` = generata da tokens.css. Le card la cui sorgente
 * non esiste ancora vengono saltate con un avviso: il bundle v2.0 parte prima
 * che tutti i componenti esistano.
 */
const CARDS = [
  { id: 'palette', group: 'Colors', out: 'colors/palette.html', palette: true },
  { id: 'kerb-lines', group: 'Colors', out: 'colors/kerb-lines.html', kit: 'kerb-lines' },
  { id: 'typography', group: 'Type', out: 'type/typography.html', kit: 'typography' },
  { id: 'logo', group: 'Components', out: 'components/logo.html', kit: 'logo' },
  { id: 'nav', group: 'Components', out: 'components/nav.html', kit: 'nav' },
  { id: 'buttons', group: 'Components', out: 'components/buttons.html', kit: 'buttons' },
  { id: 'section-head', group: 'Components', out: 'components/section-head.html', kit: 'section-head' },
  { id: 'tile', group: 'Components', out: 'components/tile.html', kit: 'tile' },
  { id: 'project-card', group: 'Components', out: 'components/project-card.html', kit: 'project-card' },
  { id: 'case', group: 'Components', out: 'components/case.html', kit: 'case' },
  { id: 'telemetry', group: 'Components', out: 'components/telemetry.html', kit: 'telemetry' },
  { id: 'giri', group: 'Components', out: 'components/giri.html', kit: 'giri' },
  { id: 'timeline', group: 'Components', out: 'components/timeline.html', kit: 'timeline' },
  { id: 'sheet-fit', group: 'Components', out: 'components/sheet-fit.html', kit: 'sheet-fit' },
  { id: 'compare', group: 'Components', out: 'components/compare.html', kit: 'compare' },
  { id: 'scraps', group: 'Components', out: 'components/scraps.html', kit: 'scraps' },
  { id: 'attribution', group: 'Components', out: 'components/attribution.html', kit: 'attribution' },
  { id: 'filter-bar', group: 'Components', out: 'components/filter-bar.html', kit: 'filter-bar' },
  { id: 'contact-panel', group: 'Components', out: 'components/contact-panel.html', kit: 'contact-panel' },
  { id: 'footer', group: 'Components', out: 'components/footer.html', kit: 'footer' },
  { id: 'brief', group: 'Pages', out: 'pages/00-brief.html', kit: 'brief' },
  { id: 'home-desktop', group: 'Pages', out: 'pages/home-desktop.html', page: '/' },
  { id: 'home-mobile', group: 'Pages', out: 'pages/home-mobile.html', page: '/', mobile: true },
  // Pagine progetto: il build di design include le bozze. Un case study
  // pubblicabile oggi non esiste: la card viene saltata finché non c'è.
  { id: 'project-scheda', group: 'Pages', out: 'pages/project-scheda.html', page: '/projects/porta-ciuccio/' },
  { id: 'project-case-study', group: 'Pages', out: 'pages/project-case-study.html', page: '/projects/caso-studio/' },
  { id: 'projects-index', group: 'Pages', out: 'pages/projects-index.html', page: '/projects/' },
  { id: 'preventivo', group: 'Pages', out: 'pages/preventivo.html', page: '/preventivo/' },
  { id: 'about', group: 'Pages', out: 'pages/about.html', page: '/about/' },
  { id: '404', group: 'Pages', out: 'pages/404.html', page: '/404.html' },
  { id: 'card', group: 'Pages', out: 'pages/card.html', page: '/card/lorenzo/' },
];

// --- argomenti ---------------------------------------------------------------

const args = process.argv.slice(2);
const onlyArg = args.find((a) => a.startsWith('--only'));
const only = onlyArg ? (onlyArg.includes('=') ? onlyArg.split('=')[1] : args[args.indexOf(onlyArg) + 1]) : undefined;
const wanted = only ? new Set(only.split(',').map((s) => s.trim().toLowerCase())) : undefined;
const selected = CARDS.filter((c) => !wanted || wanted.has(c.id) || wanted.has(c.group.toLowerCase()));

if (!args.includes('--no-build')) {
  execSync('npx astro build --config astro.design.mjs', { cwd: ROOT, stdio: 'inherit' });
}

// --- strumenti -----------------------------------------------------------------

const read = (p) => readFileSync(p, 'utf8');
const fromBuild = (url) => path.join(BUILD, decodeURIComponent(url.split('?')[0]));
const dataUri = (buffer, mime) => `data:${mime};base64,${buffer.toString('base64')}`;

function builtFile(route) {
  if (route.endsWith('.html')) return path.join(BUILD, route);
  return path.join(BUILD, route, 'index.html');
}

const fontCache = new Map();

/**
 * Tiene solo i @font-face del sottoinsieme latin (copre l'italiano, accenti
 * compresi) e solo il woff2, in data-URI. Tutti i sottoinsiemi di tutti i
 * pesi porterebbero ogni card oltre il megabyte.
 */
function inlineFonts(css) {
  return css.replace(/@font-face\s*{[^}]*}/g, (block) => {
    if (block.includes('url(data:')) return block;
    const match = block.match(/url\(["']?([^)"']*-latin-(?!ext)[^)"']*\.woff2)["']?\)/);
    if (!match) return '';
    const url = match[1];
    if (!fontCache.has(url)) fontCache.set(url, dataUri(readFileSync(fromBuild(url)), 'font/woff2'));
    return block.replace(/src:[^;}]+/, `src:url(${fontCache.get(url)}) format("woff2")`);
  });
}

function inlineStyles(html) {
  let out = html.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/g, (tag) => {
    const href = tag.match(/href=["']([^"']+)["']/)?.[1];
    if (!href || !href.startsWith('/')) return tag;
    return `<style>${inlineFonts(read(fromBuild(href)))}</style>`;
  });
  out = out.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (_, attrs, css) => `<style${attrs}>${inlineFonts(css)}</style>`);
  // Riferimenti che dentro Claude Design sarebbero rotti: favicon, canonical.
  return out.replace(/<link\b[^>]*rel=["'](?:icon|apple-touch-icon|canonical|sitemap)["'][^>]*>\s*/g, '');
}

const imageCache = new Map();

async function inlineImages(html) {
  const tags = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  let out = html;
  for (const tag of new Set(tags)) {
    const src = tag.match(/\bsrc=["']([^"']+)["']/)?.[1];
    if (!src || src.startsWith('data:') || !src.startsWith('/')) continue;
    if (!imageCache.has(src)) {
      const buffer = await sharp(fromBuild(src)).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 75 }).toBuffer();
      imageCache.set(src, dataUri(buffer, 'image/webp'));
    }
    const replaced = tag
      .replace(/\s(?:srcset|sizes)=["'][^"']*["']/g, '')
      .replace(/\bsrc=["'][^"']+["']/, `src="${imageCache.get(src)}"`);
    out = out.split(tag).join(replaced);
  }
  return out;
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const titleOf = (html, fallback) => html.match(/<title>([^<]*)<\/title>/)?.[1] ?? fallback;

function asMobile(html, title) {
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · 375px</title>
<style>html,body{margin:0;background:#07090f}body{display:grid;justify-items:center;padding:24px}iframe{width:375px;height:9000px;border:1px solid rgba(220,228,240,.18);border-radius:16px;background:#0c0f17}</style>
</head><body><iframe title="${escapeAttr(title)} a 375px" srcdoc="${escapeAttr(html)}"></iframe></body></html>`;
}

// --- palette dai token ---------------------------------------------------------

function luminance(hex) {
  const n = hex.replace('#', '');
  const full = n.length === 3 ? [...n].map((c) => c + c).join('') : n;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function paletteCard(css) {
  const root = read(path.join(ROOT, 'src/styles/tokens.css')).match(/:root\s*{([\s\S]*?)\n}/)[1];
  const tokens = [...root.matchAll(/(--[\w-]+):\s*([^;]+);[ \t]*(?:\/\*\s*(.*?)\s*\*\/)?/g)].map(([, name, value, note]) => ({
    name,
    value: value.trim(),
    note: note ?? '',
  }));
  const bg = tokens.find((t) => t.name === '--bg').value;
  const colors = tokens.filter((t) => /^#[0-9a-f]{3,8}$/i.test(t.value) || /^rgba?\(/.test(t.value) || t.value === 'transparent');

  const rows = colors
    .map((t) => {
      const ratio = /^#[0-9a-f]{6}$/i.test(t.value) ? contrast(t.value, bg) : undefined;
      const verdict = ratio === undefined ? '—' : `${ratio.toFixed(2)}:1 ${ratio >= 4.5 ? 'AA testo' : ratio >= 3 ? 'AA componenti' : 'sotto soglia'}`;
      return `<tr><td><span class="sw" style="background:${t.value}"></span></td><td class="mono">${t.name}</td><td class="mono">${t.value}</td><td class="mono">${verdict}</td><td>${t.note}</td></tr>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Palette · token del design system v2</title>
<style>${css}
.pal{width:100%;border-collapse:collapse;font-size:var(--fs-sm)}.pal td,.pal th{padding:var(--s-75) var(--s-100);border-bottom:var(--bd);text-align:left;vertical-align:middle}
.sw{display:block;width:48px;height:32px;border-radius:var(--radius-sm);border:var(--bd-strong)}</style></head>
<body><main class="wrap" style="padding-block:var(--s-700)">
<p class="eyebrow">Kit · design system v2</p><h1 style="margin-block:var(--s-200) var(--s-600)">Palette</h1>
<p class="lead" style="margin-bottom:var(--s-600)">Generata da <code>src/styles/tokens.css</code>. Contrasti calcolati con la formula WCAG contro <code>--bg</code> (${bg}).</p>
<table class="pal"><thead><tr><th></th><th>Token</th><th>Valore</th><th>Contrasto su --bg</th><th>Uso</th></tr></thead><tbody>
${rows}
</tbody></table></main></body></html>`;
}

// --- generazione ----------------------------------------------------------------

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Il CSS compilato per la palette: si prende da una pagina del kit, già con i font inline.
const typographyPage = builtFile('/kit/typography');
const sharedCss = existsSync(typographyPage)
  ? [...inlineStyles(read(typographyPage)).matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n')
  : '';

const manifest = [];
const skipped = [];

for (const card of selected) {
  let html;
  if (card.palette) {
    html = paletteCard(sharedCss);
  } else {
    const file = builtFile(card.kit ? `/kit/${card.kit}` : card.page);
    if (!existsSync(file)) {
      skipped.push(`${card.out} (manca ${card.kit ? `/kit/${card.kit}` : card.page})`);
      continue;
    }
    html = await inlineImages(inlineStyles(read(file)));
    if (card.mobile) html = asMobile(html, titleOf(html, card.id));
  }

  const body = `<!-- @dsCard group="${card.group}" -->\n${html}`;
  const target = path.join(OUT, card.out);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, body);
  manifest.push({ path: card.out, group: card.group, bytes: Buffer.byteLength(body) });
}

writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`\n${manifest.length} card in ${path.relative(ROOT, OUT)}/`);
for (const m of manifest) console.log(`  ${m.bytes > 1024 * 1024 ? '!' : ' '} ${m.path.padEnd(38)} ${kb(m.bytes).padStart(8)}  ${m.group}`);
if (skipped.length) {
  console.log(`\n${skipped.length} card saltate, sorgente non ancora presente:`);
  for (const s of skipped) console.log(`    ${s}`);
}
const heavy = manifest.filter((m) => m.bytes > 1024 * 1024);
if (heavy.length) console.log(`\nATTENZIONE: ${heavy.length} card oltre 1 MB.`);
