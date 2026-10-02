/**
 * Dati di prova per le pagine del kit di Case, Giri e Timeline.
 *
 * Tutto ciò che sta qui è SINTETICO e si mostra solo dentro uno
 * `<Specimen fixture>`: serve a vedere gli stati che nessun progetto
 * pubblicato ha ancora (tre pill, fonte di un modello di terzi, nessuna
 * riga facoltativa). I testi sono neutri e dichiarano di essere un esempio;
 * l'immagine è il render reale del porta ciuccio, con un `alt` che lo dice.
 */
import type { CollectionEntry } from 'astro:content';

import { renderShot, renderTopShot } from './fixtures.ts';

type Project = CollectionEntry<'projects'>;

const fixtureData = {
  status: 'prototipo',
  category: 'su-misura',
  date: new Date('2026-01-01'),
  featured: true,
  draft: true,
  gallery: [],
  tags: [],
  printLog: [],
} satisfies Partial<Project['data']>;

/**
 * FIXTURE · lo stato più pieno: confine, tre pill (materiale e pezzi, stampe
 * dal registro, tratto distintivo nel campo `trait`) e l'azione verso la
 * fonte di un modello di terzi. Senza `order`: l'occhiello non ha numero.
 */
export const caseFull: Project = {
  id: 'fixture-completo',
  collection: 'projects',
  data: {
    ...fixtureData,
    title: 'Pezzo di prova (esempio)',
    summary: 'Pezzo di prova per il kit (esempio).',
    headline: 'Titolo del case orientato al beneficio, in otto o dieci parole',
    proof:
      'Paragrafo di prova del case, fra 35 e 60 parole: dice il dato che conta e come è stato verificato. Qui il dato decisivo è **un solo grassetto per paragrafo**, come chiede il campo proof. Sotto ci sono il confine dichiarato, le tre pill nell’ordine fisso e l’azione verso la fonte (esempio).',
    boundary: 'Il limite dichiarato del pezzo, in una frase (esempio).',
    trait: 'Aggancio a sbalzo',
    origin: 'terzi',
    context: 'personale',
    depth: 'card',
    cover: { ...renderShot, alt: 'FIXTURE: render del porta ciuccio usato come immagine di prova' },
    print: { materials: ['PLA'], pieces: 1, printer: 'Bambu Lab X2D', software: ['Autodesk Fusion'] },
    printLog: [
      { attempt: 1, outcome: 'fallita', note: 'Causa di prova (esempio)' },
      { attempt: 2, outcome: 'fallita', note: 'Causa di prova (esempio)' },
      { attempt: 3, outcome: 'completata', note: 'Esito di prova (esempio)' },
    ],
    external: {
      url: 'https://example.com/modello',
      author: 'Autore (esempio)',
      platform: 'archivio di esempio',
      license: 'Licenza (esempio)',
    },
  },
};

/** FIXTURE · lo stato più povero: numero e contesto, titolo e prova. Niente confine, pill o azione. */
export const caseMinimal: Project = {
  id: 'fixture-minimo',
  collection: 'projects',
  data: {
    ...fixtureData,
    title: 'Pezzo di prova (esempio)',
    summary: 'Pezzo di prova per il kit (esempio).',
    headline: 'Un case senza righe facoltative: titolo, prova e immagine',
    proof:
      'Un progetto con pochi dati resta un case completo: occhiello, titolo, un paragrafo con **un solo grassetto** e la tile. Il confine, le pill e l’azione mancano perché mancano i dati, e al loro posto non compare nessuna riga di ripiego (esempio).',
    origin: 'originale',
    context: 'su-commissione',
    depth: 'card',
    order: 12,
    cover: { ...renderTopShot, alt: 'FIXTURE: render del porta ciuccio visto dall’alto, usato come immagine di prova' },
  },
};
