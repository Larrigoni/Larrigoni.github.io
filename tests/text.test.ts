/**
 * Regole di scrittura condivise dai componenti: occhiello (brief §5.4),
 * grassetto (§5.5), voci di lista, badge delle immagini (§7.2).
 *
 * Ogni componente se le riscriveva da sé, con piccole differenze: qui
 * diventano una funzione sola, con un comportamento verificato.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { boldParts, eyebrowSegments, itemJoiner, splitGlyph } from '../src/lib/text.ts';
import { TAGS, rendersOnFloor, shotBadge, tagLabels } from '../src/lib/taxonomy.ts';

test("l'occhiello si spezza sui « · » e segna nowrap i segmenti fino a 26 caratteri", () => {
  assert.deepEqual(eyebrowSegments('Dove finisce il giro · La frase che voglio sentirti dire'), [
    { text: 'Dove finisce il giro', nw: true },
    { text: 'La frase che voglio sentirti dire', nw: false },
  ]);
});

test("l'occhiello accetta anche i segmenti già separati e scarta quelli vuoti", () => {
  assert.deepEqual(eyebrowSegments(['Progetto 03', '', ' Studio ']), [
    { text: 'Progetto 03', nw: true },
    { text: 'Studio', nw: true },
  ]);
});

test('il doppio asterisco separa il grassetto: le parti dispari sono in grassetto', () => {
  assert.deepEqual(boldParts('Render o foto, **lo dice l’etichetta** su ogni immagine.'), [
    'Render o foto, ',
    'lo dice l’etichetta',
    ' su ogni immagine.',
  ]);
  assert.deepEqual(boldParts('Nessun grassetto.'), ['Nessun grassetto.']);
});

test("fra etichetta e testo di una voce c'è « – », o solo uno spazio dopo la punteggiatura", () => {
  assert.equal(itemJoiner('Il pezzo stampato'), ' – ');
  assert.equal(itemJoiner('Misura.'), ' ');
  assert.equal(itemJoiner('Ricevi:'), ' ');
});

test("la freccia finale di un'etichetta si separa dal testo", () => {
  assert.deepEqual(splitGlyph('Scrivimi →'), ['Scrivimi', '→']);
  assert.deepEqual(splitGlyph('Modello su MakerWorld ↗'), ['Modello su MakerWorld', '↗']);
  assert.deepEqual(splitGlyph('Torna alla home'), ['Torna alla home', undefined]);
});

test("il badge dichiara il tipo d'immagine vero, anche quando è ritoccata", () => {
  assert.equal(shotBadge({ kind: 'render-cad', aiAssisted: false }), 'Render');
  assert.equal(shotBadge({ kind: 'stampa', aiAssisted: false }), 'Foto');
  assert.equal(shotBadge({ kind: 'render-cad', aiAssisted: true }), 'Render ritoccato');
  assert.equal(shotBadge({ kind: 'tavola', aiAssisted: true }), 'Disegno ritoccato');
});

test('solo render e disegni scontornati si posano sul pavimento della tile', () => {
  assert.equal(rendersOnFloor({ kind: 'render-cad', fit: 'contain' }), true);
  assert.equal(rendersOnFloor({ kind: 'tavola', fit: 'contain' }), true);
  assert.equal(rendersOnFloor({ kind: 'render-scena', fit: 'cover' }), false);
  assert.equal(rendersOnFloor({ kind: 'foto', fit: 'contain' }), false);
});

test('ogni tag ha la sua etichetta leggibile', () => {
  for (const tag of TAGS) assert.ok(tagLabels[tag], `manca l'etichetta del tag ${tag}`);
  assert.equal(tagLabels['multi-pezzo'], 'Multi-pezzo');
});
