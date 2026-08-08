# Roadmap

Aggiornare man mano che si raccolgono dati e feedback. Non è immutabile.

| # | Milestone | Stato |
|---|---|---|
| 1 | Home online su GitHub Pages | ✅ Completata (2026-08-04) |
| 2 | Design system su Claude Design (iterazione visiva del front end) | ✅ Completata (2026-08-05) |
| 3 | Pagina personale NFC (`/card/lorenzo` + vCard) | ✅ Completata (2026-08-05) |
| 4 | Progettazione e documentazione del biglietto NFC (Fusion, sede tag, pausa stampa, test) | ⬜ |
| 5 | Primo case study completo (Scolatoio Oleolí — il case study Maatbric arriverà con la M4) | ✅ Completata (2026-08-08) |
| 6 | Sezione Projects con pagine di dettaglio `/projects/<slug>` | 🔄 Prima pagina online (`/projects/scolatoio-oleoli/`) |
| 7 | Secondo progetto originale: SinkFit (redesign scola-spugna) | ⬜ |
| 8 | Custom Lid System (coperchi parametrici) | ⬜ |
| 9 | DeskDock / Replacement Case | ⬜ |
| 10 | Primo progetto B2B (ProcessAid) | ⬜ |
| 11 | Print Lab con gestione corretta delle attribuzioni | ⬜ |
| 12 | Contenuti social e lancio pubblico del portfolio | ⬜ |

## TODO aperti (V1)

- [x] Email di contatto definitiva pubblicata (2026-08-05)
- [ ] Telefono / WhatsApp / LinkedIn sulla card `/card/lorenzo` (quando Lorenzo li fornirà)
- [ ] Foto del laboratorio per la sezione Impronta (ancora placeholder)
- [ ] Decidere la provenienza delle immagini del case study (vedi ADR-012): originali fotocamera, nuovi scatti, render Fusion puliti o didascalie che dichiarano il ritocco AI
- [ ] Ottimizzare i PNG dei render CAD Oleolí (~567 KB l'uno)
- [ ] Scheda tecnica con dati di stampa reali (componente pronto nel design system, entra col primo case study)
- [ ] Aggiornare `scripts/gen-design-bundle.mjs` al nuovo design (vedi ADR-008)
- [ ] Logo: convertire il testo "LA" di `logo.svg` in tracciato (resa font garantita ovunque)
- [ ] Link social (Instagram / LinkedIn / altro)
- [ ] Immagine Open Graph per le anteprime social
- [ ] Sitemap (`@astrojs/sitemap`) quando le pagine saranno più di due
- [ ] Valutare pagina About

## Aree future del portfolio

- **A — Smart Objects:** oggetti con NFC/QR (biglietti, targhe, badge, display recensioni)
- **B — Custom Fit:** oggetti su misura (coperchi, adattatori, organizer, ricambi non critici)
- **C — Process Tools / B2B:** dime, maschere, supporti, poka-yoke, organizer industriali
