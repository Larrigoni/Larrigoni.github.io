/**
 * Valida uno o più file di progetto con le stesse regole del build, senza
 * eseguire il build: nessuna scrittura in dist/, quindi più agenti lo possono
 * lanciare in parallelo mentre scrivono i contenuti.
 *
 *   node scripts/check-project.ts src/content/projects/<slug>.md [...]
 *
 * Controlla: frontmatter contro lo schema (src/lib/project-schema.ts), che
 * ogni immagine citata esista, e che un case study abbia le sei tappe del
 * metodo come titoli ##. Esce con codice 1 al primo file non valido.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { z } from 'astro/zod';
import yaml from 'js-yaml';

import { projectSchema } from '../src/lib/project-schema.ts';
import { assertCaseStudyHeadings } from '../src/lib/projects.ts';

// Le immagini qui sono percorsi: se esistono lo verifica il controllo sotto.
const schema = projectSchema(() => z.string());

export function checkProject(markdown: string, dir: string): string[] {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return ['Manca il frontmatter YAML tra due righe ---.'];

  let raw: unknown;
  try {
    raw = yaml.load(match[1]);
  } catch (error) {
    return [`Frontmatter YAML non valido: ${(error as Error).message}`];
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    return result.error.issues.map((issue) => `${issue.path.join('.') || '(radice)'}: ${issue.message}`);
  }

  const errors: string[] = [];
  const { data } = result;

  for (const shot of [data.cover, ...data.gallery]) {
    if (!shot) continue;
    const src = String(shot.src);
    if (!existsSync(path.resolve(dir, src))) errors.push(`Immagine mancante: ${src}`);
  }

  if (data.depth === 'case-study') {
    const headings = [...match[2].matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => ({ depth: 2, text: m[1] }));
    try {
      assertCaseStudyHeadings(path.basename(dir), headings);
    } catch (error) {
      errors.push((error as Error).message);
    }
  }

  return errors;
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.error('uso: node scripts/check-project.ts <file.md> [...]');
    process.exit(2);
  }
  let failed = false;
  for (const file of files) {
    const errors = checkProject(readFileSync(file, 'utf8'), path.dirname(path.resolve(file)));
    if (errors.length === 0) {
      console.log(`ok  ${file}`);
    } else {
      failed = true;
      console.log(`NO  ${file}`);
      for (const error of errors) console.log(`    - ${error}`);
    }
  }
  process.exit(failed ? 1 : 0);
}
