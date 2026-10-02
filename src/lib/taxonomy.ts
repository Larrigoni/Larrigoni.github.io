/**
 * Unica fonte di verità per vocabolari ed etichette del portfolio.
 *
 * Gli `z.enum` dello schema dei progetti si costruiscono da questi array, e
 * ogni etichetta è tipizzata sull'array corrispondente: aggiungere un valore
 * senza la sua etichetta è un errore di tipo, non una svista in pagina.
 */

export const STATUSES = ['concept', 'in-sviluppo', 'prototipo', 'completato'] as const;
export type Status = (typeof STATUSES)[number];

export const CATEGORIES = ['su-misura', 'oggetti-smart', 'piccole-serie', 'attrezzature', 'print-lab'] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Da dove viene la geometria del pezzo.
 * - `originale`: non derivata da un modello altrui. Se la geometria è stata
 *   generata con un assistente AI sulle misure e le indicazioni di Lorenzo,
 *   resta `originale` e lo si dichiara nel testo della scheda (decisione di
 *   Lorenzo, 2026-09-25).
 * - `derivato`: parte da un modello pubblicato da altri, modificato.
 * - `terzi`: modello di un altro autore, stampato così com'è.
 * `derivato` e `terzi` richiedono sempre autore, fonte e licenza (`external`).
 */
export const ORIGINS = ['originale', 'derivato', 'terzi'] as const;
export type Origin = (typeof ORIGINS)[number];

/** Per chi è nato il pezzo. Dice «su commissione» senza nominare nessuno (ADR-011). */
export const CONTEXTS = ['personale', 'su-commissione', 'studio'] as const;
export type Context = (typeof CONTEXTS)[number];

/** Quanto si racconta: solo la card, una scheda, o un case study completo. */
export const DEPTHS = ['card', 'scheda', 'case-study'] as const;
export type Depth = (typeof DEPTHS)[number];

/** Cosa mostra un'immagine. Il badge lo dichiara sempre: un render non passa mai per una foto (ADR-012). */
export const SHOT_KINDS = ['render-cad', 'render-scena', 'foto', 'stampa', 'tavola', 'schermata'] as const;
export type ShotKind = (typeof SHOT_KINDS)[number];

export const SHOT_FITS = ['contain', 'cover'] as const;
export const SHOT_RATIOS = ['4:3', '16:9', '21:9', '1:1'] as const;

export const PRINT_OUTCOMES = ['fallita', 'completata', 'validata'] as const;
export type PrintOutcome = (typeof PRINT_OUTCOMES)[number];

/** Vocabolario chiuso: i filtri sono rotte statiche e devono conoscere i tag a build time. */
export const TAGS = [
  'cucina',
  'soggiorno',
  'supporti',
  'organizer',
  'contenitori',
  'filetti',
  'multi-pezzo',
  'nfc',
] as const;
export type Tag = (typeof TAGS)[number];

/** Le sei tappe del metodo. Un case study è un giro completo: sei `##`, in quest'ordine. */
export const METHOD_STEPS = ['Il problema', 'I vincoli', 'Il progetto', 'Il prototipo', 'Il test', 'La soluzione'] as const;

/** Stato del LED di telemetria. Il fallimento non è mai rosso: il rosso è azione. */
export type Led = 'ok' | 'test' | 'fail' | 'queue';

export const statusInfo: Record<Status, { label: string; led: Led }> = {
  concept: { label: 'In coda', led: 'queue' },
  'in-sviluppo': { label: 'In sviluppo', led: 'test' },
  prototipo: { label: 'In prova', led: 'test' },
  completato: { label: 'Validato', led: 'ok' },
};

export const outcomeInfo: Record<PrintOutcome, { label: string; led: Led }> = {
  fallita: { label: 'Fallita', led: 'fail' },
  completata: { label: 'Completata', led: 'ok' },
  validata: { label: 'Validata', led: 'ok' },
};

export const categoryLabels: Record<Category, string> = {
  'su-misura': 'Su misura',
  'oggetti-smart': 'Oggetti smart',
  'piccole-serie': 'Piccole serie',
  attrezzature: 'Attrezzature',
  'print-lab': 'Print Lab',
};

export const originLabels: Record<Origin, string> = {
  originale: 'Originale',
  derivato: 'Derivato',
  terzi: 'Modello di terzi',
};

export const contextLabels: Record<Context, string> = {
  personale: 'Personale',
  'su-commissione': 'Su commissione',
  studio: 'Studio',
};

export const shotKindLabels: Record<ShotKind, string> = {
  'render-cad': 'Render',
  'render-scena': 'Render di scena',
  foto: 'Foto',
  stampa: 'Foto',
  tavola: 'Disegno',
  schermata: 'Schermata',
};

/*
 * `aiAssisted` riguarda i pixel dell'immagine, mai la geometria del pezzo
 * (ADR-012, brief §7.2): una geometria generata da un assistente AI ha un
 * render normale, `RENDER`. Il ritocco si dichiara sul tipo d'immagine vero,
 * così un disegno ritoccato non diventa un «render ritoccato».
 */
const retouchedLabels: Record<ShotKind, string> = {
  'render-cad': 'Render ritoccato',
  'render-scena': 'Render ritoccato',
  foto: 'Foto ritoccata',
  stampa: 'Foto ritoccata',
  tavola: 'Disegno ritoccato',
  schermata: 'Schermata ritoccata',
};

/** Il badge della tile, ripetuto come prefisso della didascalia: nessuna informazione esiste solo nel badge. */
export function shotBadge(shot: { kind: ShotKind; aiAssisted: boolean }): string {
  return shot.aiAssisted ? retouchedLabels[shot.kind] : shotKindLabels[shot.kind];
}

/** Un render o un disegno scontornato si posa sul pavimento della tile; il resto va al vivo (brief §7.1). */
export function rendersOnFloor(shot: { kind: ShotKind; fit: (typeof SHOT_FITS)[number] }): boolean {
  return (shot.kind === 'render-cad' || shot.kind === 'render-scena' || shot.kind === 'tavola') && shot.fit === 'contain';
}

export const tagLabels: Record<Tag, string> = {
  cucina: 'Cucina',
  soggiorno: 'Soggiorno',
  supporti: 'Supporti',
  organizer: 'Organizer',
  contenitori: 'Contenitori',
  filetti: 'Filetti',
  'multi-pezzo': 'Multi-pezzo',
  nfc: 'NFC',
};
