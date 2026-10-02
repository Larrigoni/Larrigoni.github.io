/**
 * Il validatore di un singolo progetto: stesse regole del build, ma su un
 * file alla volta e senza toccare dist/, così più agenti lo possono eseguire
 * in parallelo.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { checkProject } from '../scripts/check-project.ts';

const dir = mkdtempSync(path.join(tmpdir(), 'check-project-'));
writeFileSync(path.join(dir, 'vista.png'), 'png');

const frontmatter = (extra = '') => `---
title: 'Porta telecomandi'
status: 'completato'
category: 'su-misura'
date: 2026-09-20
summary: 'Quattro supporti disegnati sulle misure di quattro stanze diverse.'
origin: 'originale'
${extra}---
`;

const steps = ['Il problema', 'I vincoli', 'Il progetto', 'Il prototipo', 'Il test', 'La soluzione'];
const body = (titles: string[]) => titles.map((t) => `## ${t}\n\nTesto.\n`).join('\n');

const shot = (src: string) => `  - src: '${src}'\n    alt: 'Vista del pezzo'\n    kind: 'render-cad'\n`;
const caseStudy = (gallerySrc = './vista.png') =>
  frontmatter(
    `depth: 'case-study'\ncover:\n  src: './vista.png'\n  alt: 'Vista del pezzo'\n  kind: 'render-cad'\ngallery:\n${shot(gallerySrc)}${shot('./vista.png')}${shot('./vista.png')}`,
  );

test('un progetto valido passa senza errori', () => {
  assert.deepEqual(checkProject(frontmatter() + '\nTesto.\n', dir), []);
});

test('un file senza frontmatter viene rifiutato', () => {
  assert.match(checkProject('Solo testo.', dir).join(' '), /frontmatter/i);
});

test('le violazioni dello schema arrivano col messaggio della regola', () => {
  const errors = checkProject(frontmatter("depth: 'scheda'\n"), dir);
  assert.match(errors.join(' '), /copertina/);
});

test('un’immagine citata ma inesistente è un errore', () => {
  const errors = checkProject(caseStudy('./manca.png') + body(steps), dir);
  assert.match(errors.join(' '), /manca\.png/);
});

test('un case study senza le sei tappe del metodo è un errore', () => {
  const errors = checkProject(caseStudy() + body(steps.slice(0, 4)), dir);
  assert.match(errors.join(' '), /La soluzione/);
});

test('un case study completo passa', () => {
  assert.deepEqual(checkProject(caseStudy() + body(steps), dir), []);
});
