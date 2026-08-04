# larrigoni.github.io

Portfolio personale di **Lorenzo Arrigoni** — Progettazione 3D · Prototipazione · Soluzioni su misura.

Sito statico costruito con [Astro](https://astro.build), pubblicato automaticamente su **GitHub Pages** a ogni push su `main`.

🔗 **Sito online:** https://larrigoni.github.io

## Comandi

Richiede [Node.js](https://nodejs.org) ≥ 20.

```bash
npm install       # installa le dipendenze (solo la prima volta)
npm run dev       # avvia il sito in locale su http://localhost:4321
npm run build     # compila il sito statico in dist/
npm run preview   # anteprima locale della build di produzione
```

## Come modificare i testi

| Contenuto | File |
|---|---|
| Hero (nome, tagline, messaggio), sezioni "Cosa progetto" / "Progetti" / "Contatto" | [`src/pages/index.astro`](src/pages/index.astro) |
| Titolo e description SEO di default | [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) |
| Header (wordmark, navigazione) | [`src/components/Header.astro`](src/components/Header.astro) |
| Footer (copyright, social) | [`src/components/Footer.astro`](src/components/Footer.astro) |
| Colori, font, spaziature (design tokens) | [`src/styles/global.css`](src/styles/global.css) |

Dopo ogni modifica: commit + push su `main` → il deploy parte da solo (tab **Actions** su GitHub).

## Come aggiungere un progetto

1. Crea un file Markdown in `src/content/projects/`, es. `sinkfit.md`.
2. Compila il frontmatter (schema completo in [`src/content.config.ts`](src/content.config.ts)):

```markdown
---
title: 'SinkFit'
status: 'concept'            # concept | in-sviluppo | prototipo | completato
category: 'custom-fit'       # smart-objects | custom-fit | process-tools | print-lab
date: 2026-09-01
summary: 'Breve descrizione mostrata nella card.'
featured: false
originalDesign: true         # false = modello di terzi (richiede blocco `external`)
---

Testo del case study (per ora non visualizzato: le pagine di dettaglio
arrivano in una milestone successiva).
```

3. Per le **stampe di modelli di terzi** (Print Lab) `originalDesign: false` e blocco `external` obbligatorio:

```yaml
external:
  url: 'https://makerworld.com/...'
  author: 'Nome autore'
  platform: 'MakerWorld'
  license: 'CC BY-NC 4.0'
```

4. Commit + push: la card appare automaticamente nella sezione Progetti.

## Struttura

```
├── .github/workflows/deploy.yml   # build + deploy automatico su GitHub Pages
├── docs/                          # decisioni architetturali e roadmap
├── public/                        # favicon, robots.txt (copiati as-is)
└── src/
    ├── content.config.ts          # schema dei progetti (content collection)
    ├── content/projects/          # un file .md = un progetto
    ├── layouts/BaseLayout.astro   # <head>, header, footer condivisi
    ├── components/                # Header, Footer, ProjectCard
    ├── styles/global.css          # design tokens e stile di base
    └── pages/                     # index.astro, 404.astro
```

## Documentazione

- [docs/architecture.md](docs/architecture.md) — decisioni architetturali
- [docs/roadmap.md](docs/roadmap.md) — roadmap delle milestone
