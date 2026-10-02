/**
 * Integrazione del kit di design: inietta una rotta `/kit/<nome>` per ogni
 * pagina `.astro` di questa cartella (tranne i file che iniziano con la
 * maiuscola, che sono layout e componenti del kit).
 *
 * È registrata SOLO da `astro.design.mjs`: il build del sito pubblico non la
 * vede, quindi le pagine del kit non possono finire online (ADR-019).
 */
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));

export default function designKit() {
  return {
    name: 'design-kit',
    hooks: {
      'astro:config:setup': ({ injectRoute, logger }) => {
        const pages = readdirSync(here).filter((f) => f.endsWith('.astro') && /^[a-z0-9]/.test(f));
        for (const file of pages) {
          injectRoute({ pattern: `/kit/${file.replace(/\.astro$/, '')}`, entrypoint: `./src/design-kit/${file}` });
        }
        logger.info(`${pages.length} pagine del kit: ${pages.map((p) => p.replace('.astro', '')).join(', ')}`);
      },
    },
  };
}
