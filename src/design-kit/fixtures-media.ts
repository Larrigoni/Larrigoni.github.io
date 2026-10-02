/**
 * Dati di prova per la tavola «Tile e galleria» (/kit/tile).
 *
 * Tutto quello che c'è qui è FIXTURE: stati che nessun progetto pubblicato ha
 * ancora (una foto, un disegno, una schermata, un'immagine ritoccata). I pixel
 * sono render reali del porta ciuccio dalla pipeline Fusion; ogni `alt` e ogni
 * didascalia lo dichiarano, e nel kit stanno solo dentro `<Specimen fixture>`.
 * I dati reali (copertina, galleria, didascalie) si leggono dalla collection.
 */
import type { Shot } from '../components/Tile.astro';

import portaCiuccioFront from '../assets/projects/porta-ciuccio/porta-ciuccio-front.png';
import portaCiuccioIso from '../assets/projects/porta-ciuccio/porta-ciuccio-iso.png';
import portaCiuccioRight from '../assets/projects/porta-ciuccio/porta-ciuccio-right.png';
import portaCiuccioTop from '../assets/projects/porta-ciuccio/porta-ciuccio-top.png';

const base = { ratio: '4:3', aiAssisted: false } as const;

/** Una foto: al vivo nella cornice. Non ne esiste una: la sostituisce un render. */
export const fotoFixture: Shot = {
  ...base,
  src: portaCiuccioIso,
  alt: 'Foto (FIXTURE): un render del porta ciuccio al posto di una foto, per mostrare il taglio al vivo',
  caption: 'FIXTURE: un render fa le veci di una foto, solo per mostrare il taglio al vivo nella cornice.',
  kind: 'foto',
  fit: 'cover',
};

/** Un render di scena: a tutta cornice come una foto, ma dichiarato render. */
export const scenaFixture: Shot = {
  ...base,
  src: portaCiuccioFront,
  alt: 'Render di scena (FIXTURE): la vista frontale del porta ciuccio a tutta cornice',
  kind: 'render-scena',
  fit: 'cover',
};

/** Un disegno: scontornato, sul pavimento come un render. */
export const disegnoFixture: Shot = {
  ...base,
  src: portaCiuccioTop,
  alt: 'Disegno (FIXTURE): la vista dall’alto del porta ciuccio al posto di una tavola quotata',
  kind: 'tavola',
  fit: 'contain',
};

/** Una schermata: al vivo. */
export const schermataFixture: Shot = {
  ...base,
  src: portaCiuccioRight,
  alt: 'Schermata (FIXTURE): la vista laterale del porta ciuccio al posto di una schermata',
  kind: 'schermata',
  fit: 'cover',
};

/** `aiAssisted` riguarda i pixel: il badge lo dichiara sul tipo d'immagine vero. */
export const renderRitoccatoFixture: Shot = {
  ...base,
  src: portaCiuccioIso,
  alt: 'Render ritoccato (FIXTURE): il render isometrico del porta ciuccio marcato come ritoccato',
  kind: 'render-cad',
  fit: 'contain',
  aiAssisted: true,
};

export const fotoRitoccataFixture: Shot = {
  ...base,
  src: portaCiuccioFront,
  alt: 'Foto ritoccata (FIXTURE): un render del porta ciuccio al posto di una foto ritoccata',
  kind: 'foto',
  fit: 'cover',
  aiAssisted: true,
};

/** Un render che la scheda non pubblica, senza didascalia: la figcaption resta col solo prefisso. */
export const senzaDidascaliaFixture: Shot = {
  ...base,
  src: portaCiuccioRight,
  alt: 'Render CAD del porta ciuccio chiuso visto da destra (FIXTURE: vista non pubblicata nella scheda)',
  kind: 'render-cad',
  fit: 'contain',
};
