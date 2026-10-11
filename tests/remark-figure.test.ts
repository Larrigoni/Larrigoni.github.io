/**
 * Figure nel corpo Markdown (brief §6.19, §8): un'immagine sola in un
 * paragrafo, con il titolo fra virgolette, diventa `figure` con la cornice
 * della tile e la didascalia della galleria. Senza titolo resta un'immagine
 * come prima: il titolo è la didascalia.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import remarkFigure from '../src/lib/remark-figure.mjs';

const image = (title: string | null) => ({ type: 'image', url: './a.png', alt: 'Vista del pezzo', title });
const paragraph = (...children: unknown[]) => ({ type: 'paragraph', children });

test('un paragrafo con la sola immagine titolata diventa una figure: tile con badge e didascalia con prefisso', () => {
  const tree = { type: 'root', children: [paragraph(image('Render — Il perno di sopra.'))] };
  remarkFigure()(tree);

  const figure = tree.children[0] as any;
  assert.equal(figure.data.hName, 'figure');
  assert.equal(figure.data.hProperties.className, 'figure');

  const [tile, caption] = figure.children;
  assert.equal(tile.data.hName, 'div');
  assert.equal(tile.data.hProperties.className, 'tile tile--render');
  assert.equal(tile.children[0].type, 'image');
  assert.equal(tile.children[0].title, null, 'il titolo non resta come tooltip');
  assert.equal(tile.children[1].data.hName, 'span');
  assert.equal(tile.children[1].children[0].value, 'Render');

  assert.equal(caption.data.hName, 'figcaption');
  assert.equal(caption.children[0].children[0].value, 'Render');
  assert.equal(caption.children[2].value, 'Il perno di sopra.');
});

test('senza prefisso la figura è una foto senza badge; senza titolo o con altro testo non cambia nulla', () => {
  const plain = paragraph(image('Il banco.'));
  const noTitle = paragraph(image(null));
  const withText = paragraph(image('Didascalia'), { type: 'text', value: ' e altro' });
  const tree = { type: 'root', children: [plain, noTitle, withText] };
  remarkFigure()(tree);

  const figure = tree.children[0] as any;
  assert.equal(figure.children[0].data.hProperties.className, 'tile tile--foto');
  assert.equal(figure.children[0].children.length, 1, 'nessun badge');
  assert.equal(figure.children[1].children[0].value, 'Il banco.');
  assert.equal((tree.children[1] as any).data, undefined);
  assert.equal((tree.children[2] as any).data, undefined);
  assert.equal((tree.children[2] as any).children.length, 2);
});
