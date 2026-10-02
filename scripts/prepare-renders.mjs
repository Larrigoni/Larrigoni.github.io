#!/usr/bin/env node
/**
 * Rifinisce i render grezzi esportati da Fusion (`scripts/fusion-capture.py`).
 *
 *   node scripts/prepare-renders.mjs <cartella-grezzi> <slug>
 *
 * Fusion inquadra il pezzo con un margine variabile: lo stesso oggetto ripreso
 * da viste diverse esce di dimensioni diverse sulla tela. Qui si ritaglia sul
 * contenuto reale leggendo il canale alpha, si riscala e si ricentra su una
 * tela 4:3 fissa con margine costante. Cosi' tutti i render del sito hanno la
 * stessa proporzione e lo stesso peso visivo, che e' la ragione per cui una
 * griglia di progetti sembra fatta da uno studio e non da una cartella.
 *
 * Esce PNG con alpha: lo stesso file funziona su fondo chiaro e su fondo scuro.
 *
 * Con --isolate tiene solo il soggetto piu' grande e cancella il resto: serve
 * quando in un documento Fusion c'e' un piatto di stampa e la vista ravvicinata
 * sul pezzo principale si porta dentro un angolo di quello accanto.
 *
 * Con --neutral porta il pezzo in scala di grigi, alpha intatto: per i modelli
 * con un aspetto Fusion nella famiglia rosso-arancio, che sul sito verrebbe
 * scambiato per il colore d'accento (ADR-018). Evita di modificare l'aspetto
 * nel documento Fusion, che risulterebbe cambiato.
 */
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const TARGET = { width: 1600, height: 1200 };
// Frazione della tela lasciata vuota attorno al pezzo, per lato.
const MARGIN = 0.06;
// Sotto questa soglia di alpha un pixel e' sfondo, non pezzo. Non e' zero
// perche' l'antialiasing lascia un alone quasi trasparente sui bordi.
const ALPHA_FLOOR = 8;

/**
 * Analizza la maschera di opacita': riquadro del contenuto e, se richiesto,
 * maschera del solo soggetto piu' grande.
 *
 * Le componenti connesse si etichettano con una union-find a due passate
 * (4-connettivita'), che su una tela da qualche milione di pixel resta
 * istantanea e non ha il limite di ricorsione di un flood fill.
 */
async function analyse(file, isolate) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const solid = new Uint8Array(width * height);
  for (let i = 0, p = 3; i < solid.length; i += 1, p += channels) {
    solid[i] = data[p] > ALPHA_FLOOR ? 1 : 0;
  }

  const boxOf = (keep) => {
    let top = height;
    let left = width;
    let right = -1;
    let bottom = -1;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (!keep(y * width + x)) continue;
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
    return right < 0 ? null : { left, top, width: right - left + 1, height: bottom - top + 1 };
  };

  if (!isolate) {
    return { box: boxOf((i) => solid[i] === 1), keep: null };
  }

  const label = new Uint32Array(width * height);
  const parent = [0];
  const find = (a) => {
    let r = a;
    while (parent[r] !== r) r = parent[r];
    while (parent[a] !== r) [a, parent[a]] = [parent[a], r];
    return r;
  };
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = y * width + x;
      if (!solid[i]) continue;
      const up = y > 0 && solid[i - width] ? label[i - width] : 0;
      const back = x > 0 && solid[i - 1] ? label[i - 1] : 0;
      if (!up && !back) {
        parent.push(parent.length);
        label[i] = parent.length - 1;
      } else if (up && back) {
        label[i] = Math.min(up, back);
        union(up, back);
      } else {
        label[i] = up || back;
      }
    }
  }

  const area = new Map();
  for (let i = 0; i < label.length; i += 1) {
    if (!label[i]) continue;
    const root = find(label[i]);
    label[i] = root;
    area.set(root, (area.get(root) ?? 0) + 1);
  }
  if (area.size === 0) return { box: null, keep: null };

  let best = 0;
  let bestArea = -1;
  for (const [root, size] of area) {
    if (size > bestArea) {
      best = root;
      bestArea = size;
    }
  }

  const keep = (i) => label[i] === best;
  return { box: boxOf(keep), keep: bestArea < solid.length ? { label, best, width } : null };
}

async function prepare(file, outFile, isolate, neutral) {
  const { box, keep } = await analyse(file, isolate);
  if (!box) {
    console.warn(`  ! ${path.basename(file)}: nessun pezzo visibile, saltato`);
    return false;
  }

  const boxW = Math.round(TARGET.width * (1 - 2 * MARGIN));
  const boxH = Math.round(TARGET.height * (1 - 2 * MARGIN));

  let source = file;
  if (keep) {
    // Azzera l'alpha di tutto cio' che non appartiene al soggetto scelto,
    // altrimenti un pezzo vicino rientrerebbe comunque dentro il ritaglio.
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0, p = 3; i < keep.label.length; i += 1, p += info.channels) {
      if (keep.label[i] !== keep.best) data[p] = 0;
    }
    source = await sharp(data, { raw: info }).png().toBuffer();
  }

  if (neutral) {
    // Scala di grigi sui soli canali colore, poi si rimette l'alpha originale.
    // Si materializza a piena risoluzione PRIMA di ritagliare: sharp applica
    // joinChannel dopo il resize, e le dimensioni non tornerebbero.
    const alpha = await sharp(source).ensureAlpha().extractChannel(3).png().toBuffer();
    const grey = await sharp(source).removeAlpha().grayscale().toColourspace('srgb').png().toBuffer();
    source = await sharp(grey).joinChannel(alpha).png().toBuffer();
  }

  const piece = await sharp(source)
    .ensureAlpha()
    .extract(box)
    .resize({ width: boxW, height: boxH, fit: 'inside', withoutEnlargement: false })
    .toBuffer();

  const { width, height } = await sharp(piece).metadata();

  await sharp({
    create: {
      width: TARGET.width,
      height: TARGET.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: piece,
        left: Math.round((TARGET.width - width) / 2),
        top: Math.round((TARGET.height - height) / 2),
      },
    ])
    .png({ compressionLevel: 9, palette: false })
    .toFile(outFile);

  return true;
}

const args = process.argv.slice(2);
const isolate = args.includes('--isolate');
const neutral = args.includes('--neutral');
const [srcDir, slug] = args.filter((a) => !a.startsWith('--'));
if (!srcDir || !slug) {
  console.error('uso: node scripts/prepare-renders.mjs <cartella-grezzi> <slug> [--isolate] [--neutral]');
  process.exit(1);
}

const outDir = path.join('src', 'assets', 'projects', slug);
await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => f.toLowerCase().endsWith('.png')).sort();
if (files.length === 0) {
  console.error(`nessun PNG in ${srcDir}`);
  process.exit(1);
}

console.log(`${slug}: ${files.length} render da rifinire -> ${outDir}`);
let done = 0;
for (const file of files) {
  const out = path.join(outDir, file);
  if (await prepare(path.join(srcDir, file), out, isolate, neutral)) {
    const { size } = await stat(out);
    console.log(`  ok ${file} ${(size / 1024).toFixed(0)} KB`);
    done += 1;
  }
}
console.log(`${done}/${files.length} rifiniti`);
