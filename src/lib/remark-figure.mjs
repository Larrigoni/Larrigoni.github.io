/**
 * Figure nel corpo Markdown dei progetti (brief §6.19, §8: «nessun blocco di
 * più di 4 paragrafi senza un'immagine»).
 *
 *   ![alt](../../assets/projects/x/vista.png "Render — La didascalia.")
 *
 * Un'immagine da sola in un paragrafo, con il titolo fra virgolette, diventa
 *
 *   <figure class="figure">
 *     <div class="tile tile--render"><img …><span class="tag tile__kind">Render</span></div>
 *     <figcaption class="figure__caption"><span class="gallery__kind">Render</span> — La didascalia.</figcaption>
 *   </figure>
 *
 * cioè la stessa cornice e la stessa didascalia della galleria: il badge
 * dichiara il tipo d'immagine (ADR-012) e il prefisso lo ripete nel testo. Il
 * prefisso ammesso è «Render», «Foto», «Disegno» o «Schermata» seguito da « — »;
 * senza prefisso la figura non ha badge e la cornice è quella di una foto.
 * Il titolo non resta come tooltip. Senza titolo, o con altro testo nel
 * paragrafo, non cambia nulla. È una trasformazione del build: zero JavaScript
 * in pagina. Le immagini restano nodi `image`, quindi Astro le ottimizza come
 * ogni altra immagine del Markdown.
 */

const KINDS = { Render: 'tile--render', Foto: 'tile--foto', Disegno: 'tile--render', Schermata: 'tile--foto' };

const node = (hName, className, children, extra = {}) => ({
  type: 'paragraph',
  data: { hName, hProperties: { className, ...extra } },
  children,
});

const text = (value) => ({ type: 'text', value });

function toFigure(paragraph) {
  const image = paragraph.children[0];
  const title = image.title.trim();
  image.title = null;

  const match = title.match(/^(Render|Foto|Disegno|Schermata)\s+—\s+(.+)$/s);
  const kind = match ? match[1] : undefined;
  const sentence = match ? match[2] : title;

  const tile = node('div', `tile ${kind ? KINDS[kind] : 'tile--foto'}`, [
    image,
    ...(kind ? [node('span', 'tag tile__kind', [text(kind)], { 'aria-hidden': 'true' })] : []),
  ]);
  const caption = node('figcaption', 'figure__caption', [
    ...(kind ? [node('span', 'gallery__kind', [text(kind)]), text(' — ')] : []),
    text(sentence),
  ]);

  paragraph.data = { hName: 'figure', hProperties: { className: 'figure' } };
  paragraph.children = [tile, caption];
}

function isLoneTitledImage(n) {
  return n.type === 'paragraph' && n.children?.length === 1 && n.children[0].type === 'image' && Boolean(n.children[0].title);
}

function walk(n) {
  if (!n.children) return;
  for (const child of n.children) {
    if (isLoneTitledImage(child)) toFigure(child);
    else walk(child);
  }
}

export default function remarkFigure() {
  return (tree) => walk(tree);
}
