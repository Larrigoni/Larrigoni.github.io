/**
 * Schema dei progetti, con le regole editoriali trasformate in errori di build.
 *
 * Vive fuori da `content.config.ts` perché quel file importa `astro:content`,
 * che esiste solo dentro Astro: qui lo schema si può testare con `node --test`
 * passando al posto di `image()` un validatore qualsiasi.
 */
import { z } from 'astro/zod';

import {
  CATEGORIES,
  CONTEXTS,
  DEPTHS,
  ORIGINS,
  PRINT_OUTCOMES,
  SHOT_FITS,
  SHOT_KINDS,
  SHOT_RATIOS,
  STATUSES,
  TAGS,
} from './taxonomy.ts';

/** L'helper `image()` che Astro passa allo schema delle collection. */
type ImageHelper = () => z.ZodTypeAny;

const boldCount = (text: string) => (text.match(/\*\*[^*]+\*\*/g) ?? []).length;

/** Solo https: un `javascript:` o un `data:` finirebbe in un href del sito (review finale E). */
const httpsUrl = z
  .string()
  .url()
  .refine((u) => u.startsWith('https://'), 'Solo link https (niente javascript:, data: o http:).');

export function projectSchema(image: ImageHelper) {
  const shot = z.object({
    src: image(),
    alt: z.string().min(3),
    caption: z.string().optional(),
    kind: z.enum(SHOT_KINDS),
    fit: z.enum(SHOT_FITS).default('contain'),
    ratio: z.enum(SHOT_RATIOS).default('4:3'),
    aiAssisted: z.boolean().default(false),
  });

  return z
    .object({
      title: z.string().min(1),
      status: z.enum(STATUSES),
      category: z.enum(CATEGORIES),
      date: z.coerce.date(),
      summary: z.string().max(160),
      /** Titolo orientato al beneficio: l'h3 della card in home. */
      headline: z.string().max(80).optional(),
      /** Il paragrafo della card in home: la prova, con un solo grassetto. */
      proof: z
        .string()
        .max(420)
        .refine((text) => boldCount(text) <= 1, 'Il paragrafo di prova ammette un solo grassetto (**…**).')
        .optional(),
      /** «Cosa non fa»: il limite dichiarato del pezzo. */
      boundary: z.string().max(200).optional(),
      /** Tratto distintivo: la terza pill del case in home («Filetto a 3 principi»). */
      trait: z.string().max(32, 'Il tratto distintivo sta in una pill: al massimo 32 caratteri.').optional(),
      depth: z.enum(DEPTHS).default('card'),
      origin: z.enum(ORIGINS),
      context: z.enum(CONTEXTS).default('personale'),
      featured: z.boolean().default(false),
      /** Numero di griglia: un progetto lo tiene per sempre. */
      order: z.number().int().positive().optional(),
      draft: z.boolean().default(false),
      cover: shot.optional(),
      gallery: z.array(shot).default([]),
      tags: z.array(z.enum(TAGS)).default([]),
      print: z
        .object({
          materials: z.array(z.string()).default([]),
          // Nessun default: un valore di ripiego dichiarerebbe una stampante o un
          // software mai documentati per quel progetto (ADR-011).
          printer: z.string().optional(),
          software: z.array(z.string()).optional(),
          pieces: z.number().int().positive().optional(),
          variants: z.number().int().positive().optional(),
          grams: z.number().positive().optional(),
          timeHours: z.number().positive().optional(),
        })
        .optional(),
      printLog: z
        .array(
          z.object({
            attempt: z.number().int().positive(),
            outcome: z.enum(PRINT_OUTCOMES),
            note: z.string().max(60),
          }),
        )
        .default([]),
      external: z
        .object({
          url: httpsUrl,
          author: z.string(),
          platform: z.string(),
          license: z.string(),
          /** Indirizzo del testo della licenza: la riga Licenza dell'Attribution diventa un link. */
          licenseUrl: httpsUrl.optional(),
          commercialUse: z.boolean().optional(),
          modifications: z.string().optional(),
        })
        .optional(),
    })
    .superRefine((p, ctx) => {
      const fail = (path: string, message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });

      if (p.origin !== 'originale' && !p.external) {
        fail('external', 'I modelli derivati o di terzi devono dichiarare il blocco `external` con autore, fonte e licenza.');
      }
      if (p.origin === 'derivato' && (p.external?.modifications?.trim().length ?? 0) < 20) {
        fail('external', 'Un derivato deve descrivere in `external.modifications` cosa è stato modificato (almeno 20 caratteri).');
      }
      if (p.origin === 'terzi' && p.category !== 'print-lab') {
        fail('category', 'Un modello di terzi va nella categoria `print-lab`: la fascia della home porta lì.');
      }
      if (p.origin === 'terzi' && p.depth === 'case-study') {
        fail('depth', 'Un modello di terzi non può diventare un case study: al massimo una scheda.');
      }
      if (p.depth !== 'card' && !p.cover) {
        fail('cover', 'Schede e case study richiedono una copertina (`cover`).');
      }
      if (p.depth === 'case-study' && p.gallery.length < 3) {
        fail('gallery', 'Un case study richiede almeno tre immagini in `gallery`.');
      }
      if (p.printLog.some((entry) => entry.outcome === 'fallita' && !entry.note.trim())) {
        fail('printLog', 'Una stampa fallita deve dire perché in `note`: il registro non mostra fallimenti senza causa.');
      }
      if (p.featured && (!p.headline || !p.proof)) {
        fail('featured', 'I progetti in vetrina richiedono `headline` e `proof`: sono il titolo e il paragrafo della card in home.');
      }
    });
}

export type ProjectData = z.infer<ReturnType<typeof projectSchema>>;
