/**
 * Dati per la pagina del kit «telemetry».
 *
 * Il porta ciuccio (dati reali) la pagina lo legge dalla collection. Qui c'è
 * solo ciò che nei progetti ancora non esiste: un pezzo validato con il blocco
 * `print` completo, un registro di più stampe, le cifre dello slicer. Ogni
 * dato sintetico si mostra dentro uno `<Specimen fixture>` (brief §0.6).
 */
import type { CollectionEntry } from 'astro:content';

import type { BigNumber } from '../components/BigNumbers.astro';
import type { TeleRow } from '../components/Telemetry.astro';

type Project = CollectionEntry<'projects'>;
type ProjectData = Project['data'];

/** FIXTURE: un progetto neutro; ogni campo non dichiarato resta al default dello schema. */
const fixtureData: ProjectData = {
  title: 'FIXTURE',
  status: 'prototipo',
  category: 'su-misura',
  date: new Date('2026-01-01'),
  summary: 'FIXTURE: dati sintetici per il kit.',
  depth: 'scheda',
  origin: 'originale',
  context: 'personale',
  featured: false,
  draft: true,
  gallery: [],
  tags: [],
  printLog: [],
};

export function fixtureProject(data: Partial<ProjectData>): Project {
  return { id: 'fixture', collection: 'projects', data: { ...fixtureData, ...data } };
}

/** FIXTURE: la scheda con tutte le righe che lo schema sa dare, su un pezzo validato. */
export const specsComplete = fixtureProject({
  status: 'completato',
  context: 'su-commissione',
  print: {
    materials: ['PETG'],
    printer: 'Bambu Lab X2D',
    software: ['Autodesk Fusion'],
    pieces: 2,
    variants: 3,
  },
});

/**
 * FIXTURE: quattro voci di registro. La 2 è fallita senza causa: non si
 * pubblica e non si conta (brief §6.10), e il suo numero resta vuoto.
 */
export const printLogFixture: ProjectData['printLog'] = [
  { attempt: 1, outcome: 'fallita', note: 'Distacco dal piatto su un angolo del fondo' },
  { attempt: 2, outcome: 'fallita', note: '' },
  { attempt: 3, outcome: 'completata', note: 'Gioco dell’incastro ridotto di 0,2 mm' },
  { attempt: 4, outcome: 'validata', note: '' },
];

/** FIXTURE: le quattro forme di una riga, più una senza dato che non deve comparire. */
export const anatomyRows: TeleRow[] = [
  { key: 'Testo', value: 'Valore in Sans 500' },
  { key: 'Numero', value: 1250.5 },
  { key: 'Stato', value: 'In prova', led: 'test' },
  {
    key: 'Stato e causa',
    value: 'Fallita',
    led: 'fail',
    detail: 'una causa lunga va a capo sotto il testo, non sotto il LED',
  },
  { key: 'Link interno', value: 'Tutti i progetti', href: '/projects/' },
  { key: 'Link esterno', value: 'Pagina di un autore', href: 'https://example.org/' },
  { key: 'Senza dato', value: '' },
];

/**
 * Pannello Strumenti di /about: dati reali, dalle micro-prove dell'hero in
 * `src/data/home.ts` («Progetto in Autodesk Fusion», «Stampo su Bambu Lab
 * X2D», «in PLA o in PETG»). Dove e Dal non sono documentati: righe assenti.
 */
export const toolsRows: TeleRow[] = [
  { key: 'CAD', value: 'Autodesk Fusion' },
  { key: 'Stampante', value: 'Bambu Lab X2D' },
  { key: 'Materiali', value: 'PLA, PETG' },
  { key: 'Dove' },
  { key: 'Dal' },
];

/** FIXTURE: il massimo, quattro cifre (nessun progetto ha oggi dati dello slicer). */
export const numbersFull: BigNumber[] = [
  { value: 3, label: 'Stampe' },
  { value: 124, unit: 'g', label: 'Peso' },
  { value: 5.5, unit: 'h', label: 'Tempo macchina' },
  { value: 2, label: 'Pezzi' },
];

/** FIXTURE: pochi dati. Il tempo macchina non è misurato, quindi la cifra non esiste. */
export const numbersFew: BigNumber[] = [
  { value: 1, label: 'Stampe' },
  { value: 38, unit: 'g', label: 'Peso' },
  { value: undefined, unit: 'h', label: 'Tempo macchina' },
];
