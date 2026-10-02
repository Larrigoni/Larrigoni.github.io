import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { projectSchema } from './lib/project-schema.ts';

/**
 * Collection "projects": un file Markdown = un progetto.
 *
 * Lo schema e le sue regole editoriali vivono in `src/lib/project-schema.ts`,
 * testate in `tests/content.test.ts`. Qui si collega soltanto l'helper
 * `image()` di Astro, che risolve le immagini in `src/assets/`.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => projectSchema(image),
});

export const collections = { projects };
