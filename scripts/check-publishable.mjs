/**
 * Ferma il deploy se nessun progetto è pubblicabile (review finale E).
 *
 * Con zero progetti la home mostra la sezione Progetti senza case e /projects/
 * senza card: testo che rimanda a cose che non ci sono. Il deploy su main
 * parte da solo, quindi la regola «almeno un progetto» sta qui e non solo
 * nelle note.
 *
 *   node scripts/check-publishable.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import yaml from 'js-yaml';

const DIR = 'src/content/projects';
const published = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => {
    const front = readFileSync(join(DIR, f), 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = front ? yaml.load(front[1]) : {};
    return data?.draft !== true;
  });

if (published.length === 0) {
  console.error('Nessun progetto pubblicabile (tutti draft: true): il sito uscirebbe senza progetti. Deploy fermato.');
  process.exit(1);
}
console.log(`Progetti pubblicabili: ${published.length} (${published.join(', ')})`);
