/**
 * Selezione, ordinamento e lettura dei progetti.
 *
 * Funzioni pure su array di entry: niente `astro:content` qui dentro, così si
 * testano con `node --test`. Il collegamento alla collection sta in
 * `src/lib/content.ts`.
 */
import { CATEGORIES, METHOD_STEPS, ORIGINS } from './taxonomy.ts';
import type { Category, Depth, Origin, PrintOutcome, Status } from './taxonomy.ts';

interface ProjectLike {
  id: string;
  data: {
    draft: boolean;
    order?: number;
    date: Date;
    depth: Depth;
    category: Category;
    origin: Origin;
  };
}

/** Le bozze restano visibili in sviluppo e spariscono in produzione. */
export function isPublished(entry: ProjectLike, { prod }: { prod: boolean }) {
  return !(prod && entry.data.draft);
}

/** Prima i progetti numerati, in ordine di numero; poi gli altri, dal più recente. */
export function sortProjects<T extends ProjectLike>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const oa = a.data.order;
    const ob = b.data.order;
    if (oa !== undefined && ob !== undefined && oa !== ob) return oa - ob;
    if (oa !== undefined && ob === undefined) return -1;
    if (oa === undefined && ob !== undefined) return 1;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

/** Spazio indivisibile prima del « · »: la riga non va mai a capo prima del punto (brief §5.4). */
const SEP = ' · ';

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

interface PillSource {
  print?: { materials: string[]; pieces?: number };
  printLog: { outcome: PrintOutcome }[];
  trait?: string;
}

/**
 * Le pill di un progetto (brief §6.9), in ordine fisso e solo se il dato
 * esiste: materiali e pezzi, stampe e fallite, tratto distintivo.
 */
/** «PETG · 2 pezzi»: materiali e pezzi, solo se esistono. La prima pill del case e la riga meta della card. */
export function madeOf(print: PillSource['print']): string | undefined {
  return (
    [print?.materials.length ? print.materials.join(', ') : undefined, print?.pieces ? plural(print.pieces, 'pezzo', 'pezzi') : undefined]
      .filter(Boolean)
      .join(SEP) || undefined
  );
}

export function projectPills({ print, printLog, trait }: PillSource): string[] {
  const failed = printLog.filter((p) => p.outcome === 'fallita').length;
  const printed = printLog.length
    ? [plural(printLog.length, 'stampa', 'stampe'), failed ? plural(failed, 'fallita', 'fallite') : undefined]
        .filter(Boolean)
        .join(SEP)
    : undefined;
  return [madeOf(print), printed, trait?.trim() || undefined].filter((p): p is string => Boolean(p));
}

/** I case della home (brief §11.1): progetti in vetrina con una copertina, al massimo quattro, nell'ordine dato. */
export function homeCases<T extends { data: { featured: boolean; cover?: unknown } }>(entries: T[]): T[] {
  return entries.filter((p) => p.data.featured && p.data.cover).slice(0, 4);
}

/** La fascia Print Lab della home esiste solo con un modello di terzi pubblicato che non è «in coda». */
export function showsPrintLab(entries: { data: { origin: Origin; status: Status } }[]): boolean {
  return entries.some((p) => p.data.origin === 'terzi' && p.data.status !== 'concept');
}

/** Solo schede e case study hanno una pagina; una card vive solo nella griglia. */
export function projectHref(entry: ProjectLike) {
  return entry.data.depth === 'card' ? undefined : `/projects/${entry.id}/`;
}

/** «4» → «04»: il numero di griglia si legge sempre a due cifre. */
export function padOrder(order: number) {
  return String(order).padStart(2, '0');
}

export function collectionStats(entries: ProjectLike[]) {
  const byCategory = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<Category, number>;
  const byOrigin = Object.fromEntries(ORIGINS.map((o) => [o, 0])) as Record<Origin, number>;
  let lastDate: Date | undefined;

  for (const { data } of entries) {
    byCategory[data.category] += 1;
    byOrigin[data.origin] += 1;
    if (!lastDate || data.date > lastDate) lastDate = data.date;
  }

  return { total: entries.length, byCategory, byOrigin, lastDate };
}

/**
 * Un case study è un giro completo del metodo: i suoi `##` devono essere
 * esattamente le sei tappe, in ordine. Lanciare qui fa fallire il build.
 */
export function assertCaseStudyHeadings(slug: string, headings: { depth: number; text: string }[]) {
  const found = headings.filter((h) => h.depth === 2).map((h) => h.text.trim());
  const missing = METHOD_STEPS.filter((step) => !found.includes(step));

  if (missing.length > 0) {
    throw new Error(
      `Case study «${slug}»: manca ${missing.map((m) => `«${m}»`).join(', ')} tra i titoli ## del metodo.`,
    );
  }
  if (found.length !== METHOD_STEPS.length || found.some((text, i) => text !== METHOD_STEPS[i])) {
    throw new Error(
      `Case study «${slug}»: i titoli ## devono essere le sei tappe del metodo, in ordine: ` +
        `${METHOD_STEPS.join(' · ')}. Trovati: ${found.join(' · ')}.`,
    );
  }
}
