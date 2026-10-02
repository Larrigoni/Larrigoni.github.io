/**
 * Unico punto di accesso alla collection dei progetti.
 *
 * Le pagine non chiamano mai `getCollection` direttamente: una bozza che
 * sfuggisse al filtro finirebbe in pagina e in sitemap.
 */
import { getCollection } from 'astro:content';

import { isPublished, sortProjects } from './projects.ts';

/**
 * Nel build di design (`astro.design.mjs`) le bozze restano visibili: Claude
 * Design deve poter lavorare sulle schede in preparazione. Il build pubblico
 * non definisce DESIGN_KIT, quindi lì le bozze non escono mai.
 */
const showDrafts = !import.meta.env.PROD || import.meta.env.DESIGN_KIT === true;

export async function getPublishedProjects() {
  const entries = await getCollection('projects', (entry) => isPublished(entry, { prod: !showDrafts }));
  return sortProjects(entries);
}
