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

## ADR-010 — Round-trip 3: primo case study (Scolatoio Oleolí) + pass mobile (2026-08-08)

**Decisione:** portato a bordo il primo case study reale e completo:
**Scolatoio Oleolí** (espositore scolante per saponette, cliente Oleolí, PETG,
2 pezzi, consegnato dopo 2 stampe fallite documentate).

- Nuova pagina `/projects/scolatoio-oleoli/` (porting fedele della pagina
  design): problema, soluzione, scheda del pezzo, galleria, diario di stampa.
- Collection estesa con `client`, `pieces`, `image`, `imageAlt`, `hasPage`;
  le card progetto sono cliccabili quando `hasPage: true`.
- Registro home: riga Oleolí in evidenza con dati reali; Maatbric non più
  `featured`.
- Pass di ottimizzazione mobile dal design system (header impilato con nav
  scorrevole, CTA piene, pannelli compatti).

**Pipeline immagini:** gli originali restano in
`SynologyDrive\DISEGNO 3D\Social\Pj1_Portaspugna\Immagini` (e
`...\crotti\porta spugna lavello\render`); sul sito vanno versioni compresse in
`public/projects/` (foto → JPEG q85 max 1600px, render CAD → PNG). Le copie nel
progetto Claude Design superano il limite di lettura del tool (256 KiB), quindi
la fonte per il sito sono SEMPRE gli originali locali ricompressi.

**Dati:** tutti i contenuti della pagina sono reali (scritti da Lorenzo
nel design). Le righe segnaposto del registro design ("Titolo progetto due…")
e i gauge eco NON sono stati portati, come da ADR-008.

## ADR-011 — Case study anonimizzato + regola sui contenuti di terzi (2026-08-09)

**Contesto:** la prima versione del case study affermava che il cliente
«produce saponette naturali con erbe e fiori dei suoi campi». Verifica sul loro
profilo pubblico: producono tisane e insaporitori artigianali, non saponette.
L'affermazione era inventata, non solo non verificabile.

**Decisione — regola permanente:** sul sito si afferma solo (a) ciò che Lorenzo
ha fatto o osservato di persona e (b) ciò che un terzo dichiara pubblicamente
di sé. Mai attribuire a un cliente esigenze, problemi, richieste o processi che
non ha dichiarato. Nel dubbio si scrive in prima persona o si toglie.

**Applicazione:** il case study è stato anonimizzato su richiesta del cliente
stesso (che ha invece autorizzato la pubblicazione delle immagini con il
proprio logo):

- pagina rinominata `/projects/scolatoio-da-lavello/`, con redirect dal vecchio
  `/projects/scolatoio-oleoli` (in `astro.config.mjs`);
- file di contenuto, componente pagina e immagini rinominati senza il nome del
  cliente (`public/projects/scolatoio-*`); rimosso il campo `client`;
- titolo, h1, meta e card home: "Scolatoio da lavello"; l'occhiello dice
  "su commissione" senza nominare nessuno;
- il testo è riscritto in prima persona (problema come osservazione generale,
  "Il progetto" al posto di "La soluzione"), senza claim sul cliente.

**Badge card:** la regola riproduce il design — badge origine ("Progetto
originale" se `featured`, altrimenti "Originale"), categoria solo se non c'è un
materiale da mostrare, stato solo se diverso da `completato`, materiale se
presente.

## ADR-012 — Provenienza delle immagini (2026-08-09) — APERTO

**Fatto verificato:** cinque delle sette immagini del case study
(`scolatoio-lavello`, `-ripiano`, `-piatto`, `-banco`, `-fallimenti`) hanno
negli originali Content Credentials C2PA con marcatore `trainedAlgorithmicMedia`
(pipeline Google) e il simbolo ✦ visibile: sono generate o ritoccate con AI.
I due render CAD (`scolatoio-cad-01/02`) e gli altri 13 render Fusion in
`SynologyDrive\DISEGNO 3D\Social\Pj1_Portaspugna\Immagini\render fusion` sono
puliti.

**Stato:** le didascalie attuali presentano tre di quelle immagini come
fotografie. La sola etichettata correttamente è la scena sul lavello
("Render di verifica"). Da decidere con Lorenzo: usare gli scatti originali
della fotocamera, rifare le foto, sostituire con i render Fusion puliti, oppure
etichettare le immagini come ritoccate. **Non** rimuovere i marcatori: sono
firmati, SynthID resta comunque nei pixel, e togliere la dichiarazione su un
portfolio che vende trasparenza di processo è controproducente.

## ADR-013 — Marchio sostituito su richiesta del committente (2026-08-11)

**Contesto:** il committente ha **ritirato l'autorizzazione** a comparire e ha
chiesto di rimuovere il proprio marchio dalle immagini del case study.

**Decisione:** le immagini pubblicate usano un marchio fittizio ("Floria") al
posto di quello reale, ottenuto sostituendo la scritta sul medaglione. Il set
sorgente è `SynologyDrive\DISEGNO 3D\Social\Pj1_Portaspugna\Immagini\FLORIA`;
la cartella `OLEOLì` (marchio reale) **non va pubblicata**.

**Vincoli applicati per non affermare il falso:**

- nessuna didascalia dice che è stato stampato un pezzo con quel marchio: si
  parla di "medaglione", mai del nome fittizio;
- la pagina porta una nota esplicita sotto la galleria — *"Il marchio visibile
  nelle immagini è sostituito con uno fittizio: il committente ha chiesto di
  non essere identificato"* — così il lettore sa cosa sta guardando;
- il titolo era già anonimo (ADR-011) e nel testo non compare alcun cliente.

**Nota:** i file della cartella `OLEOLì` hanno i Content Credentials rimossi ma
conservano il watermark ✦ visibile. Rimuovere i marcatori non rende
un'immagine non-AI: la dichiarazione va fatta nel testo, come sopra.
