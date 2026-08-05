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
pagine NFC diventano `https://larrigoni.github.io/card/lorenzo` — ideale da
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
implementarle: `/projects/<slug>` (pagine case study), `/card/lorenzo` (business
card digitale NFC personale), `/print-lab`, `/about`, `/contact`.

**Motivo:** evitare overengineering (regola fondamentale del brief) mantenendo il
percorso di crescita libero.

## ADR-007 — Iterazione del design via Claude Design (2026-08-05)

**Decisione:** il design system del sito (colori, tipografia, componenti, pagine)
viene replicato come card di anteprima in un progetto **Claude Design**
(claude.ai/design, progetto "Lorenzo Arrigoni — Portfolio"). Lì si itera
visivamente; le varianti approvate vengono poi riportate a mano nel codice Astro
(`src/styles/global.css` e componenti), con build e deploy da questo repository.

**Motivo:** iterare sul design in chat visuale è più rapido che via codice.
**Vincolo:** il repository resta l'unica fonte di verità — nessuna modifica fatta
su Claude Design è "vera" finché non è portata qui, committata e deployata.
Le card di anteprima sono artefatti generati, rigenerabili dal codice sorgente.

## ADR-008 — Design "racing pop / pit lane" dal round-trip Claude Design (2026-08-05)

**Decisione:** adottato il design system iterato da Lorenzo su Claude Design:
Titan One come display (lettere multicolori bordate), Archivo per il testo,
IBM Plex Mono per i dati; cordoli diagonali come divisori, blocchi inclinati
(-12°), ombre piatte, pannelli "telemetria" in carbonio, sezione scura Progetti
con registro, sezione Impronta. `src/styles/global.css` è il porting fedele di
`styles.css` del progetto design (font self-hosted invece di Google Fonts).
Supera l'estetica minimale di ADR-005.

**Regola contenuti:** i dati segnaposto delle card di design (righe "Titolo
progetto uno", percentuali eco, scheda tecnica demo) NON vengono pubblicati.
Sul sito il registro mostra i progetti reali (collection + coda dalla roadmap),
il pannello Impronta contiene solo affermazioni qualitative vere, e la scheda
tecnica con dati di stampa reali arriverà con i case study. Gli slot foto sono
placeholder dichiarati.

**Nota:** `scripts/gen-design-bundle.mjs` replica ancora il vecchio design ed è
quindi obsoleto: il progetto Claude Design è ora avanti rispetto al generatore.
Non rigenerare il bundle senza prima aggiornare lo script, o si sovrascrive il
lavoro fatto sulla piattaforma.

## ADR-009 — Round-trip 2: logo, barre verdi, sezione Preventivo (2026-08-05)

**Decisione:** portate a bordo le novità della seconda iterazione su Claude Design:

- **logo ufficiale** `public/logo.svg` (monogramma "LA" racing) nell'header e
  sulla card `/card/lorenzo`; la favicon resta il monogramma washi "AL"
  (scelta esplicita di Lorenzo);
- header e footer passano da giallo a **verde**; targa numero di sezione da
  rosso a **cyan**; hero senza striscia strumenti;
- nuova sezione home **05 · Come nasce un preventivo** (`#preventivo`, anche in
  nav): 4 passaggi + pannello "Esempio di preventivo" con valori dichiarati
  indicativi dalla nota a fianco.

**Contenuti preventivo:** ispirati al flusso del software di preventivazione che
Lorenzo userà (guida di terzi analizzata ma NON citata né copiata: il copy è
originale, il PDF non è nel repo). Le parti stale del design (contatto
placeholder, registro con dati finti) NON sono state riportate: sul sito restano
email reale e dati reali (regola ADR-008).

**Nota tecnica:** il testo "LA" in `logo.svg` usa `font-family: Archivo` con
fallback `system-ui`; dentro `<img>` i font esterni non si caricano, quindi la
resa dipende dal fallback. Polish futuro: convertire il testo in tracciato.
