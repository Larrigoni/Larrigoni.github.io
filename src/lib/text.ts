/**
 * Regole di scrittura condivise dai componenti. Ogni componente se le
 * riscriveva da sé: qui sono una volta sola, con i test in tests/text.test.ts.
 */

/** Spazio indivisibile (U+00A0). */
export const NBSP = ' ';

/** Un segmento dell'occhiello e se può andare a capo al suo interno. */
export interface Segment {
  text: string;
  nw: boolean;
}

/**
 * Segmenti dell'occhiello (brief §5.4): la stringa si spezza sui « · ».
 * I segmenti di 26 caratteri o meno non vanno mai a capo al loro interno
 * (`.nw`): reggono anche a 320px. Quelli più lunghi vanno a capo fra le parole.
 */
export function eyebrowSegments(input: string | readonly (string | undefined)[]): Segment[] {
  const parts = typeof input === 'string' ? input.split('·') : input;
  return parts
    .map((part) => (part ?? '').trim())
    .filter(Boolean)
    .map((text) => ({ text, nw: text.length <= 26 }));
}

/** `**grassetto**` di home.ts e dei `.md`: le parti di indice dispari vanno in grassetto. */
export function boldParts(text: string): string[] {
  return text.split(/\*\*(.+?)\*\*/g);
}

/** Fra etichetta e testo di una voce « – »; basta uno spazio se l'etichetta chiude con la punteggiatura. */
export function itemJoiner(strong: string): string {
  return /[.:;!?]$/.test(strong) ? ' ' : ' – ';
}

/** La freccia finale di un'etichetta («Scrivimi →») è un glifo: si mostra, ma non si legge. */
export function splitGlyph(label: string): [string, string | undefined] {
  const match = label.match(/^(.*\S)\s*([→↗])$/);
  return match ? [match[1], match[2]] : [label, undefined];
}
