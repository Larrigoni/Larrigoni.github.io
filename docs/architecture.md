# Decisioni architetturali

Registro delle decisioni importanti del progetto. Aggiornare a ogni scelta rilevante.

## ADR-001 — Stack: Astro 5, sito statico (2026-08-04)

**Decisione:** Astro 5 con output statico, zero JavaScript client di default.

**Motivo:** il sito deve essere veloce, SEO friendly, mobile first e facile da mantenere.
Le content collections di Astro permettono di gestire i case study come file Markdown
con schema validato (Zod). Nessun backend, database o CMS.

## ADR-002 — Hosting: GitHub Pages come user site (2026-08-04)

**Decisione:** repository pubblico `Larrigoni/Larrigoni.github.io` → URL radice
`https://larrigoni.github.io` (nessun prefisso di percorso, nessun `base` in Astro).

**Motivo:** URL più pulito e corto possibile senza acquistare un dominio. Le future
pagine NFC diventano `https://larrigoni.github.io/maatbric/lorenzo` — ideale da
scrivere su un tag NFC. Un dominio personalizzato potrà essere collegato in seguito
senza cambiare architettura (CNAME + `site` in `astro.config.mjs`).

## ADR-003 — Deploy: GitHub Actions (2026-08-04)

**Decisione:** workflow `.github/workflows/deploy.yml` con `withastro/action` (build)
e `actions/deploy-pages` (deploy). Pages configurato in modalità "GitHub Actions".

**Motivo:** deploy automatico a ogni push su `main`, nessun branch `gh-pages` da
mantenere, build riproducibile.

## ADR-004 — Progetti come content collection (2026-08-04)

**Decisione:** un file Markdown in `src/content/projects/` per ogni progetto, con
schema in `src/content.config.ts`. Il campo `originalDesign` separa i design
originali dalle stampe di modelli di terzi; per i modelli di terzi il blocco
`external` (autore, fonte, licenza, permessi) è obbligatorio — lo schema lo impone
con un refine Zod.

**Motivo:** aggiungere un progetto = creare un file. Nessun codice da toccare.
La distinzione original/terzi è una regola fondamentale del progetto (attribuzione
e rispetto delle licenze).

## ADR-005 — Design: "tavola tecnica", nessuna dipendenza UI (2026-08-04)

**Decisione:** design system minimale in `src/styles/global.css` con CSS custom
properties. Estetica "tavola tecnica": carta (`#f6f3ec`), inchiostro (`#17140d`),
accento vermiglio (`#a8362c`, ripreso dal logo AL), hairline, etichette monospace.
Font self-hosted via Fontsource: Archivo Variable + IBM Plex Mono. Nessun framework
CSS, nessun JS client.

**Motivo:** comunicare "designer / problem solver", non "maker amatoriale".
Performance e manutenzione al minimo.

## ADR-006 — Struttura URL predisposta per il futuro (2026-08-04)

**Decisione:** la V1 pubblica solo `/` e `/404`. L'architettura prevede già, senza
implementarle: `/projects/<slug>` (pagine case study), `/maatbric/<nome>` (business
card digitali NFC), `/print-lab`, `/about`, `/contact`.

**Motivo:** evitare overengineering (regola fondamentale del brief) mantenendo il
percorso di crescita libero.
