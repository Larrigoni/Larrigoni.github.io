import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection "projects": un file Markdown = un progetto/case study.
 * Lo slug deriva dal nome del file (es. maatbric-smart-business-card.md
 * → /projects/maatbric-smart-business-card nelle milestone future).
 *
 * Regola fondamentale: `originalDesign` separa i design originali di
 * Lorenzo dalle stampe di modelli di terzi (Print Lab). Per i modelli
 * di terzi il blocco `external` è obbligatorio a livello editoriale:
 * autore, fonte, licenza e permessi devono sempre essere tracciati.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string(),
      status: z.enum(['concept', 'in-sviluppo', 'prototipo', 'completato']),
      category: z.enum(['smart-objects', 'custom-fit', 'process-tools', 'print-lab']),
      date: z.coerce.date(),
      summary: z.string(),
      featured: z.boolean().default(false),
      originalDesign: z.boolean(),
      problem: z.string().optional(),
      solution: z.string().optional(),
      materials: z.array(z.string()).default([]),
      printer: z.string().default('Bambu Lab X2D'),
      software: z.array(z.string()).default(['Autodesk Fusion']),
      client: z.string().optional(),
      pieces: z.number().int().positive().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      hasPage: z.boolean().default(false),
      external: z
        .object({
          url: z.string().url(),
          author: z.string(),
          platform: z.string(),
          license: z.string(),
          commercialUse: z.boolean().optional(),
          attributionRequired: z.boolean().optional(),
          modifications: z.string().optional(),
        })
        .optional(),
    })
    .refine((p) => p.originalDesign || p.external !== undefined, {
      message:
        'I modelli di terzi (originalDesign: false) devono dichiarare il blocco `external` con autore, fonte e licenza.',
    }),
});

export const collections = { projects };
