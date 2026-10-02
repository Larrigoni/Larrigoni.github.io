/**
 * Regole editoriali del portfolio, trasformate in errori di build.
 *
 * Ogni refine dello schema esiste perché una regola scritta in prosa
 * (ADR-004, ADR-011, ADR-012) è stata violata almeno una volta: qui
 * diventano impossibili da violare in silenzio.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'astro/zod';

import { projectSchema } from '../src/lib/project-schema.ts';
import {
  assertCaseStudyHeadings,
  collectionStats,
  homeCases,
  projectPills,
  showsPrintLab,
  isPublished,
  padOrder,
  projectHref,
  sortProjects,
} from '../src/lib/projects.ts';
import {
  CATEGORIES,
  CONTEXTS,
  METHOD_STEPS,
  ORIGINS,
  SHOT_KINDS,
  STATUSES,
  categoryLabels,
  contextLabels,
  originLabels,
  shotKindLabels,
  statusInfo,
} from '../src/lib/taxonomy.ts';

// Nei test l'helper `image()` di Astro è sostituito da una stringa: lo
// schema non deve dipendere da come le immagini vengono risolte.
const schema = projectSchema(() => z.string());

const shot = (kind = 'render-cad') => ({ src: 'x.png', alt: 'Vista del pezzo', kind });

const base = (extra: Record<string, unknown> = {}) => ({
  title: 'Porta telecomandi',
  status: 'completato',
  category: 'su-misura',
  date: '2026-09-20',
  summary: 'Quattro supporti disegnati sulle misure di quattro stanze diverse.',
  origin: 'originale',
  ...extra,
});

const external = (extra: Record<string, unknown> = {}) => ({
  url: 'https://makerworld.com/it/models/123',
  author: 'Autore',
  platform: 'MakerWorld',
  license: 'CC BY 4.0',
  ...extra,
});

const fails = (input: unknown, fragment: string) => {
  const result = schema.safeParse(input);
  assert.equal(result.success, false, 'lo schema doveva rifiutare l’input');
  const messages = result.error!.issues.map((i) => i.message).join(' | ');
  assert.match(messages, new RegExp(fragment, 'i'));
};

// --- schema -----------------------------------------------------------------

test('stampante e software non hanno default: senza dato la riga non esiste', () => {
  const data = schema.parse(base({ print: { materials: [] } }));
  assert.equal(data.print?.printer, undefined);
  assert.equal(data.print?.software, undefined);
});

test('una stampa fallita deve dire perché', () => {
  fails(base({ printLog: [{ attempt: 1, outcome: 'fallita', note: ' ' }] }), 'fallita');
  assert.equal(schema.safeParse(base({ printLog: [{ attempt: 1, outcome: 'completata', note: '' }] })).success, true);
});

test('il tratto distintivo del case è una pill corta', () => {
  assert.equal(schema.parse(base({ trait: 'Filetto a 3 principi' })).trait, 'Filetto a 3 principi');
  fails(base({ trait: 'Un tratto distintivo troppo lungo per stare in una pill' }), '32');
});

test('la licenza di un modello di terzi può avere il suo indirizzo', () => {
  const data = schema.parse(base({ origin: 'terzi', category: 'print-lab', external: external({ licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' }) }));
  assert.equal(data.external?.licenseUrl, 'https://creativecommons.org/licenses/by/4.0/');
  fails(base({ origin: 'terzi', external: external({ licenseUrl: 'non un indirizzo' }) }), 'url');
});


test('un progetto originale minimo è una card, personale, pubblicata', () => {
  const data = schema.parse(base());
  assert.equal(data.depth, 'card');
  assert.equal(data.context, 'personale');
  assert.equal(data.draft, false);
  assert.deepEqual(data.gallery, []);
});

test('un derivato senza blocco external viene rifiutato', () => {
  fails(base({ origin: 'derivato' }), 'external');
});

test('un derivato deve dire cosa è stato modificato, in almeno 20 caratteri', () => {
  fails(base({ origin: 'derivato', external: external({ modifications: 'ritoccato' }) }), 'modific');
});

test('un modello di terzi non può diventare un case study', () => {
  fails(
    base({
      origin: 'terzi',
      external: external(),
      depth: 'case-study',
      cover: shot(),
      gallery: [shot(), shot(), shot()],
    }),
    'case study',
  );
});

test('una scheda senza copertina viene rifiutata', () => {
  fails(base({ depth: 'scheda' }), 'copertina');
});

test('un case study con meno di tre immagini viene rifiutato', () => {
  fails(base({ depth: 'case-study', cover: shot(), gallery: [shot(), shot()] }), 'tre immagini');
});

test('un progetto in vetrina deve avere titolo di beneficio e paragrafo di prova', () => {
  fails(base({ featured: true }), 'headline');
});

test('il paragrafo di prova ammette un solo grassetto', () => {
  fails(base({ proof: 'Un **primo** grassetto e un **secondo** grassetto.' }), 'grassetto');
});

test('un tag fuori vocabolario viene rifiutato', () => {
  assert.equal(schema.safeParse(base({ tags: ['inventato'] })).success, false);
});

test('un derivato completo passa come case study', () => {
  const data = schema.parse(
    base({
      origin: 'derivato',
      context: 'su-commissione',
      depth: 'case-study',
      featured: true,
      headline: 'Cinque taglie dallo stesso disegno',
      proof: 'Una base esistente, ridisegnata e **prodotta in serie**.',
      external: external({ modifications: 'Ridisegnate le taglie, gli incastri e la marcatura in rilievo.' }),
      cover: shot(),
      gallery: [shot(), shot('foto'), shot()],
    }),
  );
  assert.equal(data.gallery[1].aiAssisted, false);
  assert.equal(data.gallery[0].fit, 'contain');
});

// --- selezione e ordinamento -------------------------------------------------

const entry = (id: string, data: Record<string, unknown> = {}) => ({ id, data: schema.parse(base(data)) });

test('le bozze sono nascoste in produzione e visibili in sviluppo', () => {
  const draft = entry('bozza', { draft: true });
  assert.equal(isPublished(draft, { prod: true }), false);
  assert.equal(isPublished(draft, { prod: false }), true);
  assert.equal(isPublished(entry('ok', {}), { prod: true }), true);
});

test('prima i progetti numerati in ordine di griglia, poi gli altri dal più recente', () => {
  const sorted = sortProjects([
    entry('vecchio', { date: '2026-01-01' }),
    entry('p2', { order: 2 }),
    entry('nuovo', { date: '2026-09-01' }),
    entry('p1', { order: 1, date: '2025-01-01' }),
  ]);
  assert.deepEqual(
    sorted.map((e) => e.id),
    ['p1', 'p2', 'nuovo', 'vecchio'],
  );
});

test('solo schede e case study hanno una pagina', () => {
  assert.equal(projectHref(entry('solo-card', {})), undefined);
  assert.equal(projectHref(entry('scheda', { depth: 'scheda', cover: shot() })), '/projects/scheda/');
});

test('il numero di griglia ha sempre due cifre', () => {
  assert.equal(padOrder(4), '04');
  assert.equal(padOrder(12), '12');
});

test('le statistiche contano per categoria e origine e trovano la data più recente', () => {
  const stats = collectionStats([
    entry('a', { date: '2026-08-08' }),
    entry('b', { date: '2026-09-20', category: 'print-lab', origin: 'terzi', external: external() }),
  ]);
  assert.equal(stats.total, 2);
  assert.equal(stats.byCategory['su-misura'], 1);
  assert.equal(stats.byOrigin.terzi, 1);
  assert.equal(stats.lastDate?.toISOString().slice(0, 10), '2026-09-20');
});

// --- case study = un giro del metodo -----------------------------------------

const h2 = (texts: readonly string[]) => texts.map((text) => ({ depth: 2, slug: '', text }));

test('un case study con le sei tappe del metodo in ordine è valido', () => {
  assert.doesNotThrow(() => assertCaseStudyHeadings('ok', h2(METHOD_STEPS)));
});

test('un case study con una tappa mancante o fuori ordine fa fallire il build', () => {
  assert.throws(() => assertCaseStudyHeadings('manca', h2(METHOD_STEPS.slice(0, 5))), /manca[\s\S]*La soluzione/);
  const swapped = [...METHOD_STEPS];
  [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  // Lo slug non contiene «ordine»: la parola deve arrivare dal messaggio.
  assert.throws(() => assertCaseStudyHeadings('scambio', h2(swapped)), /in ordine/);
});

// --- tassonomia --------------------------------------------------------------

test('ogni valore di ogni vocabolario ha la sua etichetta', () => {
  for (const c of CATEGORIES) assert.ok(categoryLabels[c], `categoria ${c}`);
  for (const s of STATUSES) assert.ok(statusInfo[s]?.label, `stato ${s}`);
  for (const o of ORIGINS) assert.ok(originLabels[o], `origine ${o}`);
  for (const c of CONTEXTS) assert.ok(contextLabels[c], `contesto ${c}`);
  for (const k of SHOT_KINDS) assert.ok(shotKindLabels[k], `immagine ${k}`);
});

// --- home e pill ------------------------------------------------------------


test('le pill del case: materiali e pezzi, stampe e fallite, tratto distintivo, solo se il dato esiste', () => {
  assert.deepEqual(projectPills(schema.parse(base())), []);
  const data = schema.parse(
    base({
      print: { materials: ['PETG'], pieces: 2 },
      printLog: [
        { attempt: 1, outcome: 'fallita', note: 'Il tappo non si imbocca' },
        { attempt: 2, outcome: 'completata', note: '' },
      ],
      trait: 'Filetto a 3 principi',
    }),
  );
  assert.deepEqual(projectPills(data), ['PETG · 2 pezzi', '2 stampe · 1 fallita', 'Filetto a 3 principi']);
  assert.deepEqual(projectPills(schema.parse(base({ printLog: [{ attempt: 1, outcome: 'completata', note: '' }] }))), ['1 stampa']);
});

test('in home vanno i progetti in vetrina con una copertina, al massimo quattro', () => {
  const vetrina = { featured: true, headline: 'Titolo', proof: 'Prova.', cover: shot() };
  const list = [
    entry('a', vetrina),
    entry('b', { ...vetrina, cover: undefined }),
    entry('c'),
    entry('d', vetrina),
    entry('e', vetrina),
    entry('f', vetrina),
    entry('g', vetrina),
  ];
  assert.deepEqual(homeCases(list).map((p) => p.id), ['a', 'd', 'e', 'f']);
});

test('la fascia Print Lab esiste solo con un modello di terzi pubblicato che non è in coda', () => {
  const terzi = { origin: 'terzi', category: 'print-lab', external: external() };
  assert.equal(showsPrintLab([entry('a')]), false);
  assert.equal(showsPrintLab([entry('b', { ...terzi, status: 'concept' })]), false);
  assert.equal(showsPrintLab([entry('c', { ...terzi, status: 'completato' })]), true);
});

// --- link e Print Lab (review finale E) -----------------------------------------

test('i link esterni devono essere https: niente javascript: né data:', () => {
  fails(base({ origin: 'terzi', category: 'print-lab', external: external({ url: 'javascript:alert(1)' }) }), 'https');
  fails(base({ origin: 'terzi', category: 'print-lab', external: external({ licenseUrl: 'data:text/html,x' }) }), 'https');
  fails(base({ origin: 'terzi', category: 'print-lab', external: external({ url: 'http://makerworld.com/x' }) }), 'https');
});

test('un modello di terzi sta nella categoria Print Lab', () => {
  fails(base({ origin: 'terzi', category: 'su-misura', external: external() }), 'print-lab');
  assert.equal(schema.safeParse(base({ origin: 'terzi', category: 'print-lab', external: external() })).success, true);
});
