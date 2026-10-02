/**
 * Dati sintetici per le pagine del kit del gruppo «contatto» (ContactPanel,
 * Attribution). Si mostrano solo dentro uno `<Specimen fixture>`.
 *
 * Oggi nessun progetto è `derivato`: questa voce esiste solo per mostrare la
 * riga «Modifiche apportate» e una riga in meno (uso commerciale non
 * dichiarato). Nomi e valori sono neutri e marcati «(esempio)»; l'indirizzo
 * è `example.com`, riservato alla documentazione.
 */
import type { CollectionEntry } from 'astro:content';

export const derivatoFixture: CollectionEntry<'projects'> = {
  id: 'fixture-derivato',
  collection: 'projects',
  data: {
    title: 'FIXTURE: modello derivato',
    status: 'concept',
    category: 'print-lab',
    date: new Date('2026-09-25'),
    summary: 'FIXTURE: voce sintetica del kit, non pubblicata.',
    depth: 'card',
    origin: 'derivato',
    context: 'personale',
    featured: false,
    draft: true,
    gallery: [],
    tags: [],
    printLog: [],
    external: {
      url: 'https://example.com/',
      author: 'Autore (esempio)',
      platform: 'Piattaforma (esempio)',
      license: 'Licenza (esempio)',
      modifications: 'Sede allargata di 2 mm e fori spostati sulle misure del supporto (esempio).',
    },
  },
};
