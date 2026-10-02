/**
 * FIXTURE per le pagine del kit «project-card» e «filter-bar».
 *
 * Oggi l'unico progetto con un'immagine valida è il porta ciuccio: per vedere
 * la griglia con 2, 3 e 4 card, e le varianti dell'occhiello e del LED che
 * nessun progetto pubblicato ha ancora, servono voci sintetiche. Sono tutte
 * marcate: titolo con «(esempio)», id `fixture-…`, e nel kit stanno solo
 * dentro uno `<Specimen fixture>`. Le immagini sono i quattro render reali del
 * porta ciuccio, uno per card, mai ripetuti nella stessa griglia; l'`alt` dice
 * cosa mostrano davvero. Niente titoli di prodotto finti, niente marchi.
 *
 * `depth: 'card'`: le voci sintetiche non hanno una pagina, quindi la card non
 * ha link (è la resa di una card del Print Lab). Hover e focus si vedono sulla
 * card reale del porta ciuccio.
 */
import type { CollectionEntry } from 'astro:content';

import type { Shot } from '../components/Tile.astro';

import front from '../assets/projects/porta-ciuccio/porta-ciuccio-front.png';
import iso from '../assets/projects/porta-ciuccio/porta-ciuccio-iso.png';
import right from '../assets/projects/porta-ciuccio/porta-ciuccio-right.png';
import top from '../assets/projects/porta-ciuccio/porta-ciuccio-top.png';

type Project = CollectionEntry<'projects'>;
type ProjectData = Project['data'];

const render = (src: Shot['src'], alt: string): Shot => ({
  src,
  alt,
  kind: 'render-cad',
  fit: 'contain',
  ratio: '4:3',
  aiAssisted: false,
});

const shots = {
  iso: render(iso, 'Render CAD del porta ciuccio chiuso, in vista isometrica'),
  front: render(front, 'Render CAD frontale del porta ciuccio chiuso'),
  right: render(right, 'Render CAD del porta ciuccio chiuso, visto di lato'),
  top: render(top, 'Render CAD del tappo del porta ciuccio visto dall’alto'),
};

function fixture(id: string, data: Pick<ProjectData, 'title' | 'status' | 'origin'> & Partial<ProjectData>): Project {
  return {
    id: `fixture-${id}`,
    collection: 'projects',
    data: {
      category: 'su-misura',
      date: new Date('2026-01-01T00:00:00Z'),
      summary: 'FIXTURE: voce sintetica del kit (esempio).',
      depth: 'card',
      context: 'personale',
      featured: false,
      draft: true,
      gallery: [],
      tags: [],
      printLog: [],
      ...data,
    },
  };
}

/** Completato: niente riga di stato; riga meta con materiale e pezzi. */
export const fxCompleted = fixture('completato', {
  title: 'Titolo breve (esempio)',
  status: 'completato',
  origin: 'originale',
  order: 4,
  cover: shots.front,
  print: { materials: ['PLA'], pieces: 1, printer: 'Bambu Lab X2D', software: ['Autodesk Fusion'] },
});

/** Titolo su due righe, stato «in sviluppo», più pezzi. */
export const fxLong = fixture('in-sviluppo', {
  title: 'Un titolo più lungo, che va a capo su due righe (esempio)',
  status: 'in-sviluppo',
  origin: 'originale',
  order: 5,
  cover: shots.right,
  print: { materials: ['PETG'], pieces: 2, printer: 'Bambu Lab X2D', software: ['Autodesk Fusion'] },
});

/** Modello di terzi: senza `order`, quindi senza sigla P; LED «in coda». */
export const fxThirdParty = fixture('terzi', {
  title: 'Modello di un altro autore (esempio)',
  status: 'concept',
  origin: 'terzi',
  category: 'print-lab',
  cover: shots.top,
});

/** Derivato: occhiello con l'etichetta d'origine DERIVATO; LED «in prova». */
export const fxDerived = fixture('derivato', {
  title: 'Modello modificato (esempio)',
  status: 'prototipo',
  origin: 'derivato',
  order: 6,
  cover: shots.iso,
});

/** Le varianti della card, ciascuna con un render diverso. */
export const cardVariants = [fxCompleted, fxLong, fxThirdParty, fxDerived];

/** Le card sintetiche da aggiungere a quella reale per la griglia da 2, 3 e 4 (render diversi dall'iso della reale). */
export const gridFill = [fxCompleted, fxLong, fxThirdParty];
