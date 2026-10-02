// @ts-check
/**
 * Build secondario per il kit di Claude Design (ADR-019).
 *
 * Stesso sito, stesso CSS, stessi componenti: in più le pagine del kit in
 * `/kit/<nome>`, e un output separato che non va mai in produzione. È da qui
 * che `scripts/gen-design-bundle.mjs` genera il bundle, così Claude Design
 * vede esattamente ciò che il sito rende.
 */
import site from './astro.config.mjs';
import designKit from './src/design-kit/integration.mjs';

// Oggetto tipizzato e non `defineConfig(...)`: riavvolgere una config già
// risolta fa inferire a TypeScript un tipo generico incompatibile per i18n.
/** @type {import('astro').AstroUserConfig} */
const config = {
  ...site,
  outDir: './.design-build',
  integrations: [...(site.integrations ?? []), designKit()],
  // Le bozze restano visibili solo qui (src/lib/content.ts).
  vite: { define: { 'import.meta.env.DESIGN_KIT': 'true' } },
};

export default config;
