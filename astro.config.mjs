// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { buildChecks } from './src/lib/build-checks.mjs';

// Sito pubblicato come "user site" GitHub Pages: nessun `base` necessario.
// Lo spazio URL dei progetti resta in inglese perché è già pubblico e
// indicizzato; /progetti/ ci arriva con src/pages/progetti.astro (in italiano).
export default defineConfig({
  site: 'https://larrigoni.github.io',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/progetti/') }), buildChecks()],
});
