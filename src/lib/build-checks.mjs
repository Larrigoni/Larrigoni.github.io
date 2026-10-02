/**
 * Controlli sul build pubblico, a build finito (integrazione Astro).
 *
 * Il content layer emette le immagini di TUTTE le voci della collection,
 * bozze comprese: le pagine delle bozze non escono, i loro PNG sì, in
 * /_astro/. Qui si tolgono le immagini che nessuna pagina, foglio di stile o
 * sitemap cita, e il build si ferma se un'immagine servita supera 200 KB
 * (brief §7.1). Review finale E, 2026-09-25.
 */
import { readdir, readFile, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE = /\.(png|jpe?g|webp|avif|gif)$/i;
const TEXT = /\.(html|css|xml|txt|json)$/i;
const MAX_BYTES = 200 * 1024;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

export function buildChecks() {
  return {
    name: 'controlli-build',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await walk(root);
        const texts = await Promise.all(files.filter((f) => TEXT.test(f)).map((f) => readFile(f, 'utf-8')));
        const corpus = texts.join('\n');

        const assets = join(root, '_astro');
        const removed = [];
        for (const file of files.filter((f) => f.startsWith(assets) && IMAGE.test(f))) {
          const name = file.slice(assets.length + 1);
          if (!corpus.includes(name)) {
            await rm(file);
            removed.push(name);
          }
        }
        if (removed.length) logger.info(`immagini non citate tolte dal build: ${removed.length} (${removed.join(', ')})`);

        const heavy = [];
        for (const file of (await walk(root)).filter((f) => IMAGE.test(f))) {
          const { size } = await stat(file);
          if (size > MAX_BYTES) heavy.push(`${file.slice(root.length)} (${Math.round(size / 1024)} KB)`);
        }
        if (heavy.length) {
          throw new Error(`Immagini oltre 200 KB nel build (brief §7.1): ${heavy.join(', ')}`);
        }
      },
    },
  };
}
