// @ts-check
import { defineConfig } from 'astro/config';

// Sito pubblicato come "user site" GitHub Pages: nessun `base` necessario.
export default defineConfig({
  site: 'https://larrigoni.github.io',
  // Il case study è stato rinominato (titolo anonimizzato): il vecchio URL
  // resta raggiungibile con un rimando.
  redirects: {
    '/projects/scolatoio-oleoli': '/projects/scolatoio-da-lavello',
  },
});
