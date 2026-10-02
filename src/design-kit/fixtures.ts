/**
 * Dati per le pagine del kit. Le immagini sono render reali della pipeline
 * Fusion; ciò che nei progetti ancora non esiste (una foto, uno stato «in
 * coda») è sintetico e va mostrato dentro uno `<Specimen fixture>`.
 */
import type { Shot } from '../components/Tile.astro';

import portaCiuccioFront from '../assets/projects/porta-ciuccio/porta-ciuccio-front.png';
import portaCiuccioIso from '../assets/projects/porta-ciuccio/porta-ciuccio-iso.png';
import portaCiuccioTop from '../assets/projects/porta-ciuccio/porta-ciuccio-top.png';

export const renderShot: Shot = {
  src: portaCiuccioIso,
  alt: 'Render del porta ciuccio: contenitore cilindrico con tappo a vite',
  kind: 'render-cad',
  fit: 'contain',
  ratio: '4:3',
  aiAssisted: false,
};

export const renderTopShot: Shot = { ...renderShot, src: portaCiuccioTop, alt: 'Porta ciuccio visto dall’alto' };

export const cadShot: Shot = {
  src: portaCiuccioFront,
  alt: 'Porta ciuccio visto di fronte',
  kind: 'render-cad',
  fit: 'contain',
  ratio: '16:9',
  aiAssisted: false,
};

/**
 * FIXTURE: il trattamento di una foto (`cover`, a filo della cornice) e del
 * badge AI. Non esiste ancora una foto vera: si usa un render etichettato come
 * tale, solo dentro il kit.
 */
export const sceneShot: Shot = {
  src: portaCiuccioIso,
  alt: 'FIXTURE: trattamento a tutta cornice',
  kind: 'render-scena',
  fit: 'cover',
  ratio: '4:3',
  aiAssisted: true,
};
