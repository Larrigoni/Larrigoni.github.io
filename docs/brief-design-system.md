# Brief v2 — Design system «foglio tecnico»

**Destinatario:** Claude Design (claude.ai/design), progetto «Lorenzo Arrigoni — Portfolio», da sovrascrivere.
**Committente:** Lorenzo Arrigoni — progettazione 3D su misura, prototipazione, piccole serie. Scrive sempre in prima persona singolare.
**Sito:** https://larrigoni.github.io — Astro 5 statico su GitHub Pages, zero JavaScript lato client.
**Cosa sostituisce:** il sistema «racing pop / pit lane» (Titan One, targhe inclinate, ombre offset, header verde: ADR-008/009/010) e il brief v1 «sobrio e chiaro». Del v1 restano le didascalie `RENDER`/`FOTO`, l'accessibilità e i vincoli tecnici, assorbiti in §7, §10 e §0.
**Riferimento unico:** https://kwslabs.com/build-my-homelab/, analizzato dal DOM e dal CSS reale (17 sezioni).
**Stato del codice:** i token (`src/styles/tokens.css`) e le primitive (`src/styles/base.css`: occhiello, titolo in due frasi, bottoni, pill, tag, LED, prose) sono **già implementati**. Questo brief descrive quel sistema e specifica i componenti ancora da scrivere.

Questo è un capitolato: le decisioni sono prese e si disegnano, non si discutono. Restano aperte solo le voci marcate **DA TESTARE** e le proposte di §4.4.

---

## 0. Come usare questo brief

1. Leggi prima §1 (direzione), §3 (i quattro rimandi racing) e §9 (cosa non fare). Chi salta §3 e §9 produce un fumetto: è il rischio principale di questo progetto.
2. Il blocco di §4.1 è la **copia del file `tokens.css`**: non si riscrive, non si rinomina, non si aggiungono colori. Le primitive di §6.0 sono il contenuto di `base.css`: si usano con quei nomi e quelle misure. Se una scelta ti spinge a cambiare un valore, non cambiarlo: scrivilo come proposta, in una riga (§11, punto 8).
3. Ordine di lavoro: palette e cordolo → tipografia e titolo in due frasi (§5) → tile e case (§6.7, §6.9: decidono se il sito mostra oggetti) → gli altri componenti di §6, ciascuno con i suoi stati e la resa a 375px → le pagine di §11.
4. Prima di mostrare una schermata, passala da tre metri: il test anti-fumetto (§3.E), le soglie numeriche (§8), i controlli di accessibilità (§10).
5. Zero JavaScript. Ogni pattern di kwslabs che richiede JS ha in §2 il suo equivalente statico: disegni quello. Se un'idea richiede JS, l'idea è sbagliata.
6. Contenuti (ADR-011): sul sito si afferma solo ciò che Lorenzo ha fatto o osservato, o ciò che un terzo dichiara pubblicamente di sé. Niente dati inventati, niente segnaposto, niente testo finto. I testi della home sono in `src/data/home.ts`, quelli dei progetti nei loro `.md`: usa quelli (§11.1 li riassume; se un testo citato qui diverge dal file, vale il file). Gli esempi di questo brief sono di due soli tipi: dati reali del **porta ciuccio** (dal suo `.md`: render CAD, uno studio di filettatura) oppure dati neutri scritti con «(esempio)» accanto. Nei mockup ogni dato sintetico porta l'etichetta mono `FIXTURE`, anche per mostrare uno stato che nessun progetto pubblicato ha (oggi, per esempio, il LED «validato»). Se un dato manca, il componente mostra una riga in meno, non una riga finta.
7. **Pochi progetti.** Il sito nuovo parte con pochi progetti pubblicati, e con pochi dati per ciascuno. Ogni componente e ogni pagina si disegnano prima in questo stato: da 1 a 4 case in home, da 2 a 4 card in una griglia, pannelli con due o tre righe. Lo spazio che resta vuoto resta vuoto: niente segnaposto, niente card «in arrivo», niente immagini ripetute o ingrandite per riempire. Le regole di ogni componente sono in §6.8, §6.9, §6.10, §6.17 e §8.
8. **Origine.** «Originale» vuol dire «non derivato da un modello altrui». Se la geometria l'ha generata un assistente AI sulle misure e le indicazioni di Lorenzo, il progetto resta `ORIGINALE` e lo dichiara il testo della scheda, senza etichette, tag o badge dedicati (§6.16).
9. Il repository è l'unica fonte di verità (ADR-007). Le card che ricevi sono generate dal build del sito: se una diverge dal sito è un bug dello script, non un'alternativa. Ciò che approvi torna a mano in `tokens.css`, `base.css`, `src/styles/components/*.css` e nei componenti Astro.

---

## 1. Direzione

> **Un foglio tecnico letto con la voce della telemetria: l'ambiente scuro, calmo e numerato di kwslabs — un solo oggetto acceso per schermata, e quell'oggetto è rosso.**

(Nel piano la direzione si chiama con una parola vietata; qui non si usa.)

kwslabs porta **tutto l'impianto**: superfici a gradini in una sola tinta blu-notte, filetti da 1px, `section-head` uniforme, titoli in due frasi, superfici alternate, card CASE 6fr/6fr, pill tratteggiate, nav a pillola, onestà scritta nelle etichette, ritmo di 96px. Il racing porta **quattro rimandi e solo quelli** (§3): cordolo, numerazione, telemetria, monogramma con un solo colore. Il rosso #E5322E prende il posto dell'ambra di kwslabs con la stessa disciplina: azione, stato corrente ed evidenza (una per gruppo, §8); mai struttura, mai decorazione, mai un secondo colore d'azione.

Quattro aggettivi. Ognuno impone qualcosa ed esclude qualcosa:

| Aggettivo | Impone | Esclude |
|---|---|---|
| **Scuro e calmo** | un solo ambiente blu-notte a gradini (`--pit` → `--bg` → `--surface` → `--surface-2` → `--raised`); separazioni con filetti 1px; un solo oggetto rosso pieno per schermata; lo steel per la struttura | bande colorate, fondi chiari, header e footer di un altro colore, un secondo tema, un secondo accento (giallo, ciano, verde, blu) |
| **Numerato** | occhielli mono maiuscoli dal lessico chiuso di §3.B (`PROGETTO 03`, `GIRO 3/6`, `SETTORE 2`); un progetto tiene il suo numero per sempre; il numero non è mai più alto dell'occhiello | numeri giganti o in targa, contatori animati, numeri senza fonte, due sistemi di numerazione nello stesso componente |
| **Piatto** | superfici piene; filetti 1px; il cordolo da 3px come unica linea oltre i 2px; linee da 2px solo dove le elenca §3.E punto 2 (più il barrato delle scraps); ombre solo sotto i render (`--lift`), sulla CTA primaria e sul pannello contatto; in hover cambiano colore e bordo, mai la posizione; l'unico movimento è `:active{transform:scale(.98)}` sui bottoni | ombre offset, bordi da 3px, skew fuori dal monogramma, `text-stroke`, `text-shadow`, **testo sfumato (h1 compreso)**, sollevamenti in hover, animazioni d'ingresso |
| **Onesto** | badge `RENDER`/`FOTO` su ogni immagine; LED sempre con etichetta; «Cosa non fa:» nei case; «Nessun modulo, nessun account.» sotto la CTA; date vere; stampe fallite a registro | claim non verificabili, testimonianze, superlativi, segnaposto, «in arrivo», immagini generate |

**Criteri di riuscita.**
- *Dieci secondi.* A 1440px, nei primi dieci secondi di scroll il visitatore ha visto **almeno un oggetto** (il render dell'hero, nel primo viewport) e **il primo case con la sua tile** (sezione Progetti; anche il secondo, se ne esiste uno). Se per arrivare a un oggetto servono tre schermate, il design ha fallito, per quanto sia bello.
- *Tre prove.* Togli il rosso e la pagina resta un sito kwslabs credibile; togli i numeri e sembra incompleta (sono struttura, non ornamento); aggiungi un secondo colore e sembra subito sbagliata.

**Cosa impedisce il fumetto:** niente skew (tranne il monogramma), niente bordi da 3px (tranne il cordolo, che è un filo), niente ombre offset, niente lettere multicolori o sfumate, niente font display, niente texture di fondo (tranne il foglio a griglia in una sola sezione), niente animazioni d'ingresso. Se togli i quattro rimandi la pagina deve restare kwslabs; se ne aggiungi un quinto, è fumetto.

**Il titolo non è sfumato.** kwslabs riempie l'h1 con un gradiente bianco→muted ritagliato sul testo. Qui no: il testo sfumato è un tic riconoscibile dei siti generati. L'h1 è in `--text` pieno e la seconda riga in steel, come ogni altro titolo (§5.3). È una decisione presa, non una svista.

---

## 2. Riferimento kwslabs — pattern per pattern

Legenda: «si prende» = riprodurre con le stesse misure, salvo il valore nostro indicato; «non si prende» = non proporlo nemmeno come variante. kwslabs usa JavaScript per molte cose: qui ogni pattern è riscritto nella sua forma statica.

### 2.1 Ambiente cromatico — si prende integralmente
kwslabs usa una rampa di superfici della stessa tinta fredda, così le sezioni si leggono come un unico ambiente e non come bande alternate: `#050408` → `#0C0F17` → `#11151F` → `#161B27` → `#1E2432`; testo bone `#EDEAE4`, muted `#ABA79D`, faint `#969084`; steel `#7E9CB4` per la struttura; un solo accento caldo.
**Si prende:** la rampa (i nostri `--pit` `--bg` `--surface` `--surface-2` `--raised`, esadecimali identici salvo `--pit`, che è il `#07090F` della loro sezione «problema»), i tre grigi di testo, lo steel «struttura, mai azione», i filetti `--line` (.10) e `--line-strong` (.18).
**Non si prende:** l'ambra come accento (da noi l'ambra è solo il LED «in prova», §3.C) e il logotipo bicolore.

### 2.2 `section-head` — si prende, con un'aggiunta
kwslabs: griglia con gap 16, larghezza massima 680, margine sotto 48 (32 su mobile); occhiello Plex Mono 12/16, tracking .14em, maiuscolo, steel, preceduto da un trattino 24×1 a opacità .6 con gap 12; poi h2 600 30/36 → 36/40; poi lead 18/28 muted.
**Si prende:** struttura e misure, con tre valori nostri già in `base.css`: il trattino dell'occhiello è pieno (`currentColor`, senza opacità); il margine sotto resta 48 anche su mobile; l'h2 ha interlinea 1.15 (`--lh-title`): 30/34.5 → 36/41.4, non 30/36 → 36/40.
**Si aggiunge:** sotto l'h2, il **trattino cordolo 32×3** (§3.A): l'unico punto in cui il cordolo entra nel corpo della pagina.

### 2.3 Titolo in due frasi — si prende il pattern, non il gradiente
kwslabs: affermazione (600; 700 sull'h1) + `span.t-soft` a capo, 400, steel, tracking −.01em. L'h1 ha il testo sfumato. Il pattern vale per l'h1 e per la maggior parte degli h2; i titoli d'azione e di qualificazione sono a una frase.
**Si prende:** il pattern e la sua eccezione (§5.3).
**Non si prende:** il gradiente sul testo dell'h1. L'h1 è `--text` pieno.

### 2.4 Superfici alternate — si prende integralmente
kwslabs: le sezioni alternano `--bg` (senza bordi) e `--surface` (sempre con `border-block` 1px); le fasce leggere hanno 64px invece di 96; una sola sezione ha un gradiente di fondo (quella che «riceve» l'hero), una sola ha una texture (il foglio a griglia).
**Si prende:** tutto (`.section`, `.section.alt`, `.section.band`, `.section.pit` in `base.css`).
**Non si prende:** la foto a tutta pagina dell'hero. Il nostro hero è un render trasparente su `--pit` che sfuma in `--bg` (§6.19, §7.1).

### 2.5 Card CASE — si prende come componente statico
kwslabs, `article` del caso: `--surface-2`, bordo `--line-strong`, raggio 16, padding 32, griglia 6fr/6fr da 860px, gap 32, testo sempre a sinistra e immagine sempre a destra. Testo: numero mono 12 steel → h3 24/32 600 → paragrafo 16/26 muted con **un solo** grassetto → nota di confine opzionale (filetto sinistro 2px, faint) → 3 pill tratteggiate → un'azione. Immagine: raggio 12, altezza minima 320, badge mono in basso a destra **solo sulle illustrazioni**.
**Si prende:** l'intera anatomia, con `PROGETTO 03 · STUDIO` al posto del loro numero di caso (§6.9).
**Non si prende:** il deck a tab, lo scorrimento narrativo, l'avanzamento automatico, il pulsante «avanti» (tutti JS). I case sono **impilati** con gap 32: è esattamente il fallback senza JS di kwslabs. Non si prende nemmeno il badge «solo sulle illustrazioni»: da noi il badge c'è **sempre** (`RENDER`/`FOTO`), perché render e foto convivono e il lettore non deve indovinare (§7.2).

### 2.6 Pill e tag — si prende la grammatica
kwslabs distingue la pill **tratteggiata** (fatto descrittivo, mai un'azione), il tag **rettangolare mono** (etichetta o timbro) e il bordo d'accento (consigliato o attivo, uno per gruppo).
**Si prende:** le tre famiglie: `.pill`, `.tag`, `.tag.accent` di `base.css` (§6.0).
**Non si prende:** i chip selezionabili che riscrivono un documento (JS). I filtri sono link a pagine statiche (§6.17).

### 2.7 Nav a pillola — si prende in forma statica
kwslabs: pillola fissa a 16px dall'alto, vetro scuro a .72 con sfocatura 20px, bordo `--line`, raggio 999, padding 8 (16 a sinistra), gap 24, altezza 62; voci 14/500 muted; voce corrente in accento; CTA pillola piena; hamburger sotto 800px; barra di avanzamento di 3px in cima; la nav si nasconde scendendo.
**Si prende:** pillola, misure, voci, voce corrente in `--accent-text`.
**Non si prende:** hamburger, evidenziazione della sezione corrente allo scroll, nascondimento allo scroll, barra di avanzamento (tutto JS). La barra diventa il **cordolo fisso** (§3.A). La nav resta sempre visibile, quindi la sua CTA è **tinta**, non piena; il vetro sale a .90 perché sotto la nav passano render e foto chiare (§6.1).

### 2.8 Onestà nelle etichette — si prende come regola di sistema
kwslabs dichiara in chiaro cosa è un'illustrazione e cosa una foto, dove un caso si ferma, che la CTA non costa nulla, per chi il prodotto non è adatto.
**Si prende:** badge su ogni immagine (§7.2); «Cosa non fa: …» nei case; «Nessun modulo, nessun account.» sotto la CTA del contatto; la colonna «Non sono la persona giusta se» nella Tavola 01; il meta `PORTFOLIO · AGG. 2026-09` con la data dell'ultimo progetto pubblicato, non del build; nel registro stampe, le stampe fallite con la loro causa.
**Non si prende:** testimonianze (non esistono: ADR-011), scarsità («solo i primi …»), FAQ lunghe (esistono solo su `/preventivo`, solo con domande ricevute davvero).

### 2.9 Ritmo — si prende integralmente
kwslabs: sezioni a 96px (40 sotto 760), fasce a 64, contenitore 1120 con 24 di margine, testo largo al massimo 680, 48 fra colonne, 24 fra blocchi di testo, 16 fra card, 8 dentro le card. Scala 4/8/12/16/24/32/40/48/64/80/96.
**Si prende:** scala e ritmo identici (`--s-50`…`--s-900`, `--sect`, `--band`, `--wrap` 70rem, `--gutter` 1.5rem, `--measure` 42.5rem).

### 2.10 Bottoni — si prende la forma, cambiano misure e riempimento
kwslabs: altezza 48, padding 12/24, raggio 12, 16/600; primario con gradiente ambra a tre stop e testo scuro; ghost trasparente con bordo `--line-strong`; `:active` a scala .98; sollevamento di 1px in hover.
**Si prende:** raggio 12, padding orizzontale 24, ghost, coppia «primario + ghost», `:active{scale(.98)}`, alone sotto il primario.
**Cambia (valori di `base.css`):** altezza 44 e testo 14/600, più compatti, da scheda tecnica; primario **piatto** `--accent-deep` con anello 1px `--accent` e testo bianco (5.35:1).
**Non si prende:** il gradiente, il testo scuro, il sollevamento in hover.

### 2.11 Giri, timeline, foglio, confronto, scraps — si prende la forma statica
- **Giri del metodo** (kwslabs: 7 card in griglia 1→2→4→7 colonne, numero via contatore, una sola card evidenziata con bordo e numero in accento; in hover bordo steel e sollevamento di 3px): si prende come componente Giri a **6** card, 1→2→3→6 colonne, «Il progetto» evidenziato, **senza** sollevamento (§6.11).
- **Mappa del percorso** (timeline verticale, binario 2px, nodi 16px, esito in accento, tappe future tratteggiate, riempimento legato allo scroll): si prende senza riempimento animato e con l'esito in grassetto, non colorato (§6.12).
- **Foglio a griglia** (`#131826`, punti ogni 24px, griglia steel ogni 96px, righello a tacche sul bordo sinistro, chip numerato, colonne «sì» in accento e «no» in steel con h3 mono): si prende integralmente come Tavola 01 (§6.13). È l'unica texture del sito.
- **Confronto** (un contenitore, due colonne divise da un filo, tag mono, «+» in accento): si prende come compare (§6.14).
- **Scraps** (5 etichette su `--surface-2` ruotate ±3°, alcune barrate in ruggine, impilate sotto 960): si prende a **4**, e ruotano solo le barrate, ±2° al massimo (§6.15).

### 2.12 Movimento — si prende solo l'easing
kwslabs: comparsa allo scroll con sfocatura, figli sfalsati, pallini che pulsano, parole che si accendono, sollevamenti in hover.
**Si prende:** `--ease` `cubic-bezier(.32,.72,0,1)`, durate `--t-fast` (.3s) e `--t-hover` (.4s) per colore, bordo e ombra; `:active{scale(.98)}`; `prefers-reduced-motion` che azzera tutto.
**Non si prende:** tutto il resto. Nulla si muove da solo, nulla si solleva.

### 2.13 Le 17 sezioni di kwslabs → le 12 nostre

| kwslabs | Qui |
|---|---|
| Hero (foto, h1 in due frasi, 2 CTA, 3 micro-prove) | Hero: render che sfuma, CTA piena + ghost, 3 micro-prove con icona steel |
| Risultati (fascia, 6 spunte) | Cosa ricevi: fascia `--surface`, spunte in `--accent-text` |
| Problema (centrato, scraps) | Il problema: 4 scraps |
| Casi (tab + deck, JS) | Progetti: da 1 a 4 `article.case` impilati, uno per progetto in vetrina pubblicato |
| Percorsi (step-card, una consigliata) | Da dove si parte: 5 step-card, una `CONSIGLIATO` |
| Storie (card + dialog) | **Scartata**: nessuna testimonianza |
| Frase che si accende (JS) | Manifesto: frase statica, «esiste» e «funziona» già in `--accent-text` |
| Ciclo (player, JS) | Metodo: 6 card Giri `GIRO n/6` |
| Mappa (riempimento allo scroll, JS) | Come prosegue: timeline a 4 settori + traguardo |
| Blueprint e prompt (JS) | **Scartate**: confluiscono in `/preventivo` |
| Foglio «per chi è» | Tavola 01 · Per chi è |
| Domanda onesta | La domanda giusta: compare |
| Offerta con prezzo | **Scartata**: nessun prezzo pubblico; brilla solo il pannello contatto |
| Teaser di un altro prodotto | Print Lab, solo se esiste almeno una voce `origin: terzi` |
| FAQ | Solo in `/preventivo`, `details` nativi, solo domande ricevute davvero |
| Modulo di contatto (JS) | Contatto: email in chiaro + `mailto:` precompilato |

---

## 3. I quattro rimandi racing — dove, dose, divieti

Sono **quattro e solo quattro**. Per ciascuno si è cercata la dose massima che resta professionale, poi si è tolto un gradino: i paragrafi «Dose massima provata e scartata» dicono dove fermarsi e perché. Fuori da questi quattro il racing non esiste: niente scacchi, semafori, caschi, pneumatici, livree, numeri di vettura giganti, trama carbonio.

### 3.A Cordolo — un filo da 3px che delimita, non decora

**Cos'è.** Una linea alta 3px a strisce inclinate di −45°, rosso `--accent` e bone `--text`, 8px ciascuna (`--kerb`). A 3px di altezza si legge come un filo tratteggiato: è voluto. Il secondo colore è il bone del testo, non il bianco e non il giallo.

**Dove vive (elenco chiuso):**

| Uso | Dove | Misure |
|---|---|---|
| 1 · filo in cima | ogni pagina, `position:fixed` a `top:0`, sopra la nav | 3px × 100%. Prende il posto della barra di avanzamento JS di kwslabs: è ferma, non misura nulla |
| 2 · bordo del footer | `.site-footer::before`, a tutta larghezza | 3px × 100% |
| 3 · trattino del titolo | sotto ogni h2 di `.section-head` (già in `base.css`) | 32 × 3px, `margin-top: var(--s-200)` |
| 4 · chiusura di `/card/lorenzo` | la pagina non ha footer: il filo che altrove è il bordo del footer diventa l'ultimo elemento del `body`, **a tutta larghezza della viewport**, fuori dal pannello e staccato da esso di almeno 48px | 3px × 100%. Mai sul bordo del pannello da 24rem: il cordolo non incornicia nulla |

Una pagina ha al massimo i tre usi 1-3; la 404 (senza `section-head`) e `/card/lorenzo` ne hanno due. Su `/card/lorenzo` i due fili stanno ai margini della **pagina** (in cima e in fondo), mai ai margini del pannello: se il filo inferiore toccasse il pannello o ne prendesse la larghezza, farebbe da cornice a una card, cioè la dose scartata qui sotto.

```css
/* chrome.css */
.kerb{height:var(--kerb-h);background:var(--kerb)}
.kerb--top{position:fixed;inset:0 0 auto;z-index:30;pointer-events:none}
.site-footer::before{content:"";display:block;height:var(--kerb-h);background:var(--kerb)}
/* /card/lorenzo: <div class="kerb kerb--end" aria-hidden="true"> ultimo figlio del body, fuori dal pannello */
.kerb--end{width:100%;margin-top:var(--s-600)}
/* colori forzati: il motivo sparisce, il filo resta */
@media (forced-colors:active){.kerb,.site-footer::before{background:none;border-top:var(--kerb-h) solid CanvasText}}
/* già in base.css */
.section-head h2::after{content:"";display:block;width:32px;height:var(--kerb-h);margin-top:var(--s-200);background:var(--kerb)}
/* DA AGGIUNGERE in base.css (oggi non c'è): il trattino è una primitiva, i LED pure;
   chrome.css non ridefinisce le primitive */
@media (forced-colors:active){.section-head h2::after{background:none;border-top:var(--kerb-h) solid CanvasText}.led{forced-color-adjust:none;box-shadow:inset 0 0 0 1px CanvasText}}
```

**Dose massima provata e scartata.** Il cordolo come cornice del pannello contatto, come bordo delle tile, come riga sotto la nav, come separatore fra i case: ogni aggiunta riporta al «racing pop». Tre usi ai margini bastano: si legge all'ingresso (in cima), a ogni sezione (sotto l'h2) e all'uscita (footer). È la firma, non il rivestimento.

**Divieti:** mai più alto di 3px; mai come divisore di sezione (i divisori sono filetti 1px); mai attorno a immagini, card, pannelli, bottoni, badge; mai verticale; mai animato; mai con un bordo proprio; mai giallo o nero; mai dentro un pannello telemetria. La banda nel monogramma (§3.D) è parte del marchio, non un uso in più.

### 3.B Numerazione da griglia e da giro — negli occhielli mono, e solo lì

**Grammatica (decisa):** `CATEGORIA NN · QUALIFICATORE[ · ANNO]`, in `.eyebrow` (Plex Mono 500 12px, tracking .14em, maiuscolo, steel), separatore « · » (nel markup con uno spazio indivisibile prima: §5.4). Nel `section-head` l'occhiello ha il trattino 24×1; dentro card, pannelli, timeline e Giri si usa `.eyebrow.bare`, senza trattino.

**Numerazione racing (lessico chiuso, deciso):** sono le sole parole racing che compaiono sul sito.

| Sistema | Forma | Dove | Regola |
|---|---|---|---|
| **PROGETTO** | `PROGETTO 03 · STUDIO` (case in home: `order` + contesto); `PROGETTO 03 · SU MISURA · 2026` (testata della pagina: `order` + categoria + anno). Sono i dati del porta ciuccio | case in home, testata della pagina progetto | il numero è `order` nel frontmatter, a due cifre. Un progetto **tiene il suo numero per sempre**, come una vettura: se esce dal sito, il numero resta vuoto. Mai rinumerare: per questo i numeri pubblicati possono non partire da 01 e avere dei buchi, e i buchi non si colmano |
| **P** | `P03 · ORIGINALE · 2026` (porta ciuccio). Un progetto senza `order` non ha la sigla: `MODELLO DI TERZI · 2026` | card compatte dell'indice | «P» è la sigla di PROGETTO, **non una posizione**: non esiste una classifica. L'origine usa le etichette di `taxonomy.ts`: `ORIGINALE`, `DERIVATO`, `MODELLO DI TERZI` (§6.16) |
| **GIRO** | `GIRO 1/6` … `GIRO 6/6` | Giri del metodo; h2 dei case study | sempre con il totale, sempre 6 (le tappe del metodo) |
| **SETTORE** | `SETTORE 1 · IL PRIMO MESSAGGIO` … `SETTORE 4 · PROVA E CORREZIONE` | timeline (home e `/preventivo`) | una cifra, senza zero iniziale |
| **TRAGUARDO** | `TRAGUARDO · CONSEGNA` | ultima tappa della timeline | **mai numerato**: è la fine, non un settore |

**Numerazioni editoriali, non racing.** Non sono rimandi racing e non ne aumentano la dose: sono il lessico di un fascicolo tecnico e di un registro.

| Sistema | Forma | Dove | Regola |
|---|---|---|---|
| TAVOLA | `TAVOLA 01 · PER CHI È` | chip del foglio a griglia | lessico da disegno tecnico; due cifre, come in un fascicolo |
| SCHEDA | `SCHEDA DEL PEZZO · REV. FINALE` | testata del pannello specifiche | «REV.» è l'unica abbreviazione ammessa |
| STAMPA | `STAMPA 1` … `STAMPA n` | chiavi `dt` del `PrintLog` | cronologia di un registro; solo dentro il pannello |
| ERRORE | `ERRORE 404 · PAGINA NON TROVATA` | 404, con LED ruggine davanti | l'unico occhiello con LED |

Occhielli senza numero (cornici editoriali, da `home.ts` e dal piano): `PROGETTAZIONE 3D · SU MISURA · PICCOLE SERIE`, `COSA RICEVI A FINE LAVORO`, `IL PROBLEMA`, `PROGETTI · DALLA MISURA AL PEZZO`, `DA DOVE SI PARTE`, `DOVE FINISCE IL GIRO · LA FRASE CHE VOGLIO SENTIRTI DIRE`, `IL METODO · UN GIRO, SEMPRE LO STESSO`, `COME PROSEGUE`, `LA DOMANDA GIUSTA`, `PRINT LAB · MODELLI DI ALTRI`, `CONTATTO · NESSUN IMPEGNO`, `TUTTI I PROGETTI`, `CHI SONO`, `PREVENTIVO · GRATUITO, NON IMPEGNA`.

**Dose massima provata e scartata.** Il numero grande in steel dietro il titolo (filigrana a 96px) e il numero in targa (riquadro pieno): tutti e due sono il vecchio `.section-num` con un altro vestito. Il numero non è mai più alto dell'occhiello. Le uniche cifre grandi del sito sono dati (`BigNumbers`, §6.10), non numerazione.

**Divieti:** vietate le parole **pit stop, pole, box, podio, gara, bandiera, item box, pista, griglia** (niente «fuori pista», «in pista», «griglia di partenza», «in ordine di griglia», «giro veloce»); vietati gli equivalenti inglesi `LAP`, `SECTOR`, `PIT`, `GRID`: il sito parla italiano. Il divieto vale per il testo pubblicato: occhielli, titoli, didascalie, `alt`, meta e nomi dei file pubblici (immagini, PDF, `.vcf`). Colpisce le parole usate come metafora: il nome proprio del modello di un altro autore (per esempio il sistema «Gridfinity» di una voce del Print Lab) non conta. Gli identificatori del codice già esistenti (`--pit`, `.section.pit`, `--kerb`, `components/grid.css`) sono esenti; quelli ancora da scrivere si scelgono in italiano (§6.11: `ol.giri`, `li.giro`). Un solo sistema di numerazione per componente (una card ha PROGETTO oppure GIRO, mai entrambi). Nessun numero di sequenza in nav, bottoni, footer, h1, h2, didascalie. Unica eccezione: il `GIRO n/6` generato sopra gli h2 della `.prose--case`. Le date (meta del footer, ©) non sono numerazione. Niente conti alla rovescia, tempi, cronometri; niente «P01» come «il migliore». Il numero ha il colore dell'occhiello; è in `--accent-text` solo nell'elemento evidenziato del gruppo (§8).

### 3.C Telemetria — LED e pannelli chiave/valore

**Dove vive:** `ProjectSpecs` (scheda del pezzo), `PrintLog` (registro stampe), `BigNumbers` (cifre grandi), riga di stato nelle card compatte, pannello strumenti in `/about`, esempio da un lavoro fatto in `/preventivo` (solo se i dati esistono), occhiello della 404 (l'unico LED dentro un occhiello, §3.B). Sempre pannelli `--surface-2` con filetto 1px, mai «carbonio con cordolo».

**Il LED (deciso, `.led` di `base.css`):** cerchio pieno di 7px, **piatto**: nessun alone, nessuna pulsazione. Sempre seguito da un'etichetta testuale (WCAG 1.4.1): il colore non è mai l'unico veicolo.

| Stato | Classe | Colore | Etichetta | Uso |
|---|---|---|---|---|
| validato | `.led.ok` | `--led-ok` #41c98b | `VALIDATO`; nel `PrintLog` `VALIDATA` o `COMPLETATA` | `status: completato`; stampa riuscita |
| in prova | `.led.test` | `--led-test` #e0a458 | `IN PROVA` (`status: prototipo`), `IN SVILUPPO` (`status: in-sviluppo`) | prototipo, in sviluppo |
| fallita | `.led.fail` | `--led-fail` #b36b5e | `FALLITA`; nella 404 l'etichetta è l'occhiello `ERRORE 404` | nel `PrintLog`, sempre con la causa accanto; nell'occhiello della 404 |
| in coda | `.led.queue` | anello 1px `--faint`, vuoto | `IN CODA` | concept |

**Il fallimento non è rosso.** Il rosso è azione: un LED «fallita» rosso sembrerebbe un pulsante e ruberebbe il conto «un rosso pieno per schermata». La ruggine è il colore delle idee barrate di kwslabs: una stampa fallita è un'idea corretta dopo. L'ambra di kwslabs sopravvive solo qui, come stato, mai come azione.

**Il pannello (`.tele`, §6.10):** testata mono con titolo e meta, corpo `dl` a righe chiave/valore. **Una riga esiste solo se il dato esiste: niente «n/d», niente trattini.**

**Dose massima provata e scartata.** Il pannello con la testata rossa (il vecchio `.panel-tab`), le righe con la targa di posizione (`.pos`), le barre di riempimento (`.gauges`), le percentuali «eco», il LED con alone: ogni aggiunta trasforma la scheda tecnica in un cruscotto, e il cruscotto è il fumetto della telemetria. La telemetria vera è una tabella mono con un LED. Regola: **un solo pannello telemetria visibile per schermata**; niente barre, gauge, percentuali, grafici, sparkline.

**Divieti:** fondo carbonio a gradiente; LED rosso; alone; tab inclinato; targhe di posizione; riga tinta di rosso; piede verde; qualunque metafora da cruscotto (contagiri, lancette, semafori).

### 3.D Monogramma LA e colore unico — l'unico elemento che può inclinarsi

**Il monogramma (da approvare da Lorenzo).** Ridisegno piatto del `public/logo.svg` attuale (blocco rosso inclinato con contorno nero, banda gialla con contorno, «LA» in Archivo con tratto). Via i contorni, l'ombra, il giallo, il font fuori sistema. Restano il blocco rosso, le lettere chiare, l'inclinazione. Specifica, su tela 96×96, misure prima della trasformazione:
- **un solo `skewX(-12deg)` sul gruppo intero** (blocco, banda, lettere): l'unico skew del sito. Le sole altre trasformazioni sono `scale(.98)` su `:active` dei bottoni e le rotazioni fino a 2° delle tre scraps barrate, da 960px. Il gruppo è centrato otticamente dopo lo skew, con almeno 4 di aria per lato;
- **blocco** 72×72 in `--accent` #e5322e, raggio 0 (un raggio lo farebbe sembrare l'icona di un'app), nessun contorno, nessuna ombra;
- **lettere** «LA» in IBM Plex Sans 700 **convertite in tracciato** (nessun elemento `text`, nessun font nel file), bone `--text`, altezza delle maiuscole 34, tracking −.03em, centrate. Dall'alto del blocco: 12 di aria, lettere, 12 di aria, banda, 6 di fondo;
- **banda-cordolo** alta 8, da bordo a bordo del blocco, con lo stesso motivo del cordolo del sito (strisce a −45°, 8 rosso e 8 bone): marchio e cordolo sono la stessa cosa a due scale. **DA TESTARE a 28px:** se le strisce si impastano, sotto i 40px di lato la banda si disegna piena in bone;
- due soli colori, `--accent` e `--text`; nell'SVG inline usano le variabili. File sotto 3 KB.

Misure d'uso: compare solo in questi quattro posti: brand della nav (28px), footer (40px), `/card/lorenzo` (64px), angolo in basso a sinistra dell'immagine Open Graph (96px; 1200×630, fondo `--pit`). Mai come filigrana, mai ripetuto a motivo, mai nel contenuto (`main`) di nessun'altra pagina, pagine progetto e 404 comprese: il biglietto `/card/lorenzo` è l'unica pagina che lo porta dentro il `main`, perché non ha nav né footer. Nav e footer, e quindi il loro monogramma, restano su ogni pagina che li ha, 404 compresa.

**La favicon non cambia** (ADR-009): resta il monogramma washi «AL», scelta esplicita di Lorenzo. Va solo convertita in tracciato (oggi incorpora un font) per stare sotto 5 KB, e non è un compito di Claude Design.

**Il colore unico (deciso): una tonalità per l'occhio, tre esadecimali per il contrasto.**
- `--accent` #e5322e: usi da componente (cordolo, anello di focus, bordo della CTA, bordo 1px del giro evidenziato, alone, monogramma). Su `--bg` fa 4.40:1: basta per un componente (3:1), **non** per un testo sotto i 24px. Col bianco sopra fa 4.35:1: **mai fondo di un testo**, nemmeno in hover.
  Unica eccezione: le lettere del monogramma, bone su `--accent` (3.62:1). Sono un logotipo in tracciato, esente da WCAG 1.4.3, e non portano informazione: il nome del link è testo vero, visibile da 480px, `.visually-hidden` sotto. Nessun altro testo sta su `--accent`.
- `--accent-deep` #cc2a22: **solo** riempimento della CTA primaria, a riposo e in hover. Bianco sopra: 5.35:1. Il bone sopra farebbe 4.46: il testo della CTA è `--on-accent`, bianco puro.
- `--accent-text` #ff6b63: **solo** testo in rosso (link, voce corrente, tag evidenziati, «esiste» e «funziona»): 6.87:1 su `--bg`, 5.57 su `--raised`.

Il testo rosso è sempre `--accent-text`, a qualunque corpo; `--accent` non è mai testo.

Il rosso **pieno** compare solo su: CTA primaria, cordolo, alone del pannello contatto, anello di focus (più il monogramma, che è il marchio stesso). Il bordo 1px `--accent` del giro evidenziato è una linea, non un rosso pieno (§8). Il rosso **tinto** (`--accent-soft` .12, `--accent-line` .45) su: CTA della nav, filtro attivo, step-card evidenziata, `.tag.accent`, bordo e cima del pannello contatto, filetto della nota della Tavola 01. Il rosso **testo** su: link, voce di nav corrente, titolo della card compatta in hover, «esiste» e «funziona» nel manifesto, tag `FUNZIONA` e `CONSIGLIATO`, h3 mono della colonna «sì» della Tavola 01, spunte di «Cosa ricevi», marcatori « + » del confronto, occhiello o numero dell'elemento evidenziato di un gruppo.

**Dose massima provata e scartata.** Il blocco con raggio 8 e senza inclinazione (troppo «app»); l'inclinazione estesa al nome accanto (torna la targa della pit lane); la banda gialla conservata (secondo colore); un contorno nero di 2px «per staccare» (è il vecchio logo); il nodo finale della timeline riempito di rosso (una bandierina travestita). La versione scelta è la più piatta che resta un marchio racing.

**Divieti:** nessuno skew fuori dal gruppo del monogramma (né sul nome, né su bottoni, titoli, card); nessun contorno, ombra, lucido; nessun giallo; nessun wordmark in font display; il rosso mai dentro o sul bordo di un'immagine; mai due rossi pieni nella stessa schermata; mai un LED rosso.

### 3.E Test anti-fumetto (su ogni card e ogni pagina)

1. C'è un solo `skew` in tutto il sito, ed è sul gruppo del monogramma.
2. Nessun bordo supera 1px, tranne i tre usi del cordolo (3px), i filetti sinistri di note, citazioni e «Cosa non fa» (2px) e binario e nodi della timeline (2px).
3. Nessuna ombra netta con offset: le sole ombre sono `--lift` sotto i render, `--shadow-primary` sulla CTA, `--glow` sul pannello contatto.
4. I colori dell'interfaccia sono: neutri blu-notte, bone, steel, un rosso (tre gradini), quattro LED, più `--strike`, solo per il barrato delle scraps. **Ogni riga di un titolo ha un solo colore (`--text` la prima, `--steel` la `.t-soft`), h1 compreso: nessun gradiente sul testo, nessuna parola rossa. Unica eccezione: l'h3 mono della colonna «sì» della Tavola 01, tutto in `--accent-text`** (più, come stato di un link, il titolo della card compatta in hover, §6.8). Le sole parole rosse in una frase grande sono nel manifesto, che non è un titolo.
5. Nessun `text-stroke`, `text-shadow`, corsivo di titolo, maiuscolo sul testo corrente, font display.
6. L'unica rotazione è fino a 2° sulle tre scraps barrate, solo da 960px, in una griglia in flusso (mai `position:absolute`, §6.15).
7. In ogni schermata a 1440×900 e 375×812 c'è **al massimo un oggetto rosso pieno** (definizione in §8).
8. Ogni numero in un occhiello appartiene al lessico di §3.B (numerazione racing o editoriale); nessuna parola vietata compare da nessuna parte.

Un punto fallito = la schermata non si mostra.

---

## 4. Token

### 4.1 Il file `src/styles/tokens.css` — copia del file, non riscrivere

Questo è il contenuto del file nel repository, alla lettera (esadecimali minuscoli, commenti compresi). Il build lo inlina in ogni card. Nomi e valori non si toccano.

```css
/*
 * Token del design system v2 — «foglio tecnico».
 *
 * Ambiente scuro, calmo e numerato (riferimento: kwslabs.com) letto con la voce
 * della telemetria: un solo oggetto acceso per schermata, e quell'oggetto e'
 * rosso. Ogni valore qui dentro e' una decisione: vedi docs/brief-design-system.md
 * e ADR-018 in docs/architecture.md.
 */
:root {
  /* Superfici a gradini: un solo ambiente blu-notte, mai un secondo tema. */
  --pit: #07090f;
  --bg: #0c0f17;
  --surface: #11151f;
  --surface-2: #161b27;
  --raised: #1e2432;
  --sheet: #131826;

  /* Testo */
  --text: #edeae4;
  --muted: #aba79d;
  --faint: #969084;

  /* Struttura: seconda riga dei titoli, icone, bordi attivi. Mai azione. */
  --steel: #7e9cb4;
  --steel-soft: rgba(126, 156, 180, 0.14);
  --line: rgba(220, 228, 240, 0.1);
  --line-strong: rgba(220, 228, 240, 0.18);

  /*
   * Accento racing: UNA tonalita' per l'occhio, tre gradini per il contrasto.
   * #E5322E su --bg fa 4.4:1 e col bianco sopra 4.35:1, sotto AA per il testo:
   * il rosso puro resta per gli usi da componente (3:1), la CTA si riempie del
   * gradino scuro, il testo usa il gradino chiaro.
   */
  --accent: #e5322e;        /* cordolo, bordi, anello di focus, alone, monogramma: mai fondo di un testo */
  --accent-deep: #cc2a22;   /* SOLO riempimento della CTA primaria (bianco sopra = 5.3:1) */
  --accent-text: #ff6b63;   /* SOLO testo rosso su scuro, a ogni corpo: link, voce nav corrente, tag, parole del manifesto (6.9:1) */
  --accent-soft: rgba(229, 50, 46, 0.12);
  --accent-line: rgba(229, 50, 46, 0.45);
  --on-accent: #ffffff;

  /*
   * LED di telemetria: pallini da 6-8px sempre accompagnati da un'etichetta.
   * Il fallimento NON e' rosso: il rosso e' azione, e un LED «fallita» rosso
   * sembrerebbe un pulsante. Ruggine per fallito, ambra per in prova, verde
   * per validato, anello vuoto per in coda.
   */
  --led-ok: #41c98b;
  --led-test: #e0a458;
  --led-fail: #b36b5e;
  --led-queue: transparent;
  --error: #d98a7b;
  --strike: rgba(179, 107, 94, 0.8);

  /* Cordolo: filo da 3px, mai un rivestimento. Il secondo colore e' il bone del testo. */
  --kerb-h: 3px;
  --kerb: repeating-linear-gradient(-45deg, var(--accent) 0 8px, var(--text) 8px 16px);

  /* Tipografia: IBM Plex Sans per tutto, IBM Plex Mono per occhielli, etichette e dati. */
  --font-sans: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
  --fs-h1: clamp(2.25rem, 1.6rem + 2.4vw, 3.75rem);
  --fs-h2: clamp(1.875rem, 1.5rem + 1vw, 2.25rem);
  --fs-h3: 1.5rem;
  --fs-h4: 1.25rem;
  --fs-lead: 1.125rem;
  --fs-body: 1rem;
  --fs-sm: 0.875rem;
  --fs-note: 0.8125rem;
  --fs-eyebrow: 0.75rem;
  --fs-micro: 0.625rem;
  --fs-data: 3rem;
  --lh-tight: 1.1;
  --lh-title: 1.15;
  --lh-body: 1.6;
  --lh-lead: 1.55;
  --track-eyebrow: 0.14em;
  --track-label: 0.12em;

  /* Spaziatura (scala di kwslabs) */
  --s-50: 4px;
  --s-75: 8px;
  --s-100: 12px;
  --s-200: 16px;
  --s-300: 24px;
  --s-400: 32px;
  --s-500: 40px;
  --s-600: 48px;
  --s-700: 64px;
  --s-800: 80px;
  --s-900: 96px;
  --sect: var(--s-500);
  --band: var(--s-500);
  --wrap: 70rem;
  --wrap-narrow: 45rem;
  --measure: 42.5rem;
  --gutter: 1.5rem;
  --nav-h: 62px;

  /* Raggi e bordi */
  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 16px;
  --radius-tag: 6px;
  --pill: 999px;
  --bd: 1px solid var(--line);
  --bd-strong: 1px solid var(--line-strong);
  --bd-accent: 1px solid var(--accent-line);

  /* Gli unici effetti ammessi */
  --ease: cubic-bezier(0.32, 0.72, 0, 1);
  --t-fast: 0.3s;
  --t-hover: 0.4s;
  --glow: 0 0 40px -18px rgba(229, 50, 46, 0.5);                 /* solo il pannello contatto */
  --shadow-primary: 0 0 0 1px rgba(229, 50, 46, 0.5), 0 6px 20px -8px rgba(229, 50, 46, 0.55);
  --lift: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 1px rgba(237, 234, 228, 0.28));
  --grid-sheet:
    radial-gradient(rgba(220, 228, 240, 0.05) 1px, transparent 1px) 0 0 / 24px 24px,
    linear-gradient(rgba(126, 156, 180, 0.08) 1px, transparent 1px) 0 0 / 96px 96px,
    linear-gradient(90deg, rgba(126, 156, 180, 0.08) 1px, transparent 1px) 0 0 / 96px 96px;
  --focus: 2px solid var(--accent);
}

@media (min-width: 47.5rem) {
  :root {
    --sect: var(--s-900);
    --band: var(--s-700);
  }
}
```

### 4.2 Ruoli fissi
- `--text`: titoli e corpo. `--muted`: lead, paragrafi delle card, testo della `.prose`, metadati. `--faint`: note, chiavi dei pannelli, testo delle card piccole. Il minimo su superficie opaca è `--faint` su `--raised`, 4.89:1: lì `--faint` non scende sotto i 13px. Il minimo del sistema è 4.71:1, `--faint` sul vetro della nav sopra una foto bianca: lì `--faint` si usa solo per la sottoriga del brand, a 14px, e mai più piccolo. `--steel`: occhielli, numeri, seconda riga dei titoli, icone, nodi della timeline; bordo di hover di qualunque elemento, azioni comprese (ghost, filtri, tile-link): è il riscontro del puntatore, non il colore che segnala un'azione. A riposo un'azione è rossa (primaria, link, CTA tinta) o neutra (ghost, voci di nav, filtri), mai steel.
- I tre rossi: §3.D. Nessun altro colore caldo, tranne i LED e `--strike` (il ruggine del LED «fallita» all'80%, solo per il barrato delle scraps).
- `--line`, `--line-strong`, `--accent-line` stanno sotto 3:1 rispetto alle superfici (§4.3): disegnano, **non comunicano da soli uno stato**. Uno stato è sempre anche testo (un'etichetta), una forma (sottolineatura, nodo pieno, glifo) o un bordo ≥3:1 (`--accent`: 4.40 su `--bg`, 3.96 su `--surface-2`; `--steel`: 6.66 su `--bg`). Il passaggio da `--muted` o `--steel` a `--accent-text` non conta come segnale: ha la stessa luminanza (1.16:1 e 1.03:1). Nemmeno il fondo `--accent-soft` conta (1.09:1).
- `--error`: token ereditato dal piano, **NESSUN USO** nei componenti v2. La 404 ha solo il LED ruggine con l'occhiello; il testo rosso resta solo `--accent-text`. `--strike`: solo il barrato delle scraps.
- Effetti: `--lift` solo sui render, `--shadow-primary` solo sulla CTA primaria, `--glow` solo sul pannello contatto, `--grid-sheet` solo sulla Tavola 01, `--steel-soft` per il pavimento delle tile e l'hover delle voci di nav.

### 4.3 Contrasti calcolati

Formula WCAG 2.x (luminanza relativa sRGB); i colori semitrasparenti sono composti sopra la superficie reale. Soglie AA: testo 4.5:1 (3:1 da 24px, o da 18.66px in grassetto); componenti e anello di focus 3:1.

| Coppia | Rapporti | Uso |
|---|---|---|
| `--text` su `--pit` / `--bg` / `--surface` / `--surface-2` / `--raised` / `--sheet` | 16.58 / 15.95 / 15.20 / 14.33 / 12.92 / 14.74 | tutto |
| `--muted` sulle stesse | 8.29 / 7.98 / 7.60 / 7.17 / 6.46 / 7.37 | lead, paragrafi, badge |
| `--faint` sulle stesse | 6.27 / 6.04 / 5.75 / 5.42 / **4.89** / 5.58 | note, chiavi; su `--raised` non sotto i 13px |
| `--steel` sulle stesse | 6.92 / 6.66 / 6.34 / 5.98 / 5.39 / 6.15 | occhielli a 12px, `.t-soft`, numeri |
| `--accent-text` sulle stesse | 7.14 / 6.87 / 6.55 / 6.18 / 5.57 / 6.35 | link, voce corrente, tag evidenziati |
| `--accent-text` su `--accent-soft` sopra `--bg` / `--surface` / `--surface-2` / `--raised` | 6.32 / 6.00 / 5.65 / 5.11 | filtro attivo, `.tag.accent`, CTA tinta |
| bianco su `--accent-deep` | **5.35** | testo della CTA primaria, a riposo e in hover |
| bianco su `--accent` | **4.35, sotto AA** | perciò la CTA non si riempie mai di `--accent`, nemmeno in hover |
| bone su `--accent-deep` | **4.46, sotto AA** | perciò il testo della CTA è bianco puro |
| `--accent` come testo su `--bg` | **4.40, sotto AA** | perciò il rosso puro non è mai testo, a nessun corpo (§3.D) |
| anello `--accent` su `--pit` / `--bg` / `--surface` / `--surface-2` / `--raised` / `--sheet` | 4.58 / 4.40 / 4.19 / 3.96 / 3.57 / 4.07 | focus ≥3:1 ovunque. Con `outline-offset:3px` l'anello cade sul fondo, non sul bottone. Attorno alla CTA rossa, sul bordo inferiore, cade dentro l'alone `--shadow-primary` (opacità ≈ .18): 3.81:1 su `--bg`, 3.61 su `--surface`, 3.41 su `--surface-2`; in hover (≈ .21) 3.68 / 3.49 / 3.30; sulla cima tinta del pannello contatto, in hover, scenderebbe a 2.93: lì la CTA non sta mai (§6.18) |
| `--accent-deep` contro `--bg` | 3.58 | la CTA si stacca dal fondo |
| `--error` su `--bg` / `--surface-2` | 7.18 / 6.45 | **non usato** (§4.2): nessun testo rossastro fuori da `--accent-text` |
| LED `ok` / `test` / `fail` su `--surface-2` (su `--bg`) | 8.16 / 7.88 / 4.25 (9.08 / 8.78 / 4.73) | componenti ≥3:1, sempre con etichetta |
| `--line` / `--line-strong` su `--bg`; `--accent-line` su `--surface-2` | 1.24 / 1.57; 1.67 | **decorativi**: mai unico segnale |
| `--steel` come bordo su `--surface-2` / `--bg` | 5.98 / 6.66 | bordo di hover di tile, card, ghost |
| `--strike` su `--surface-2` | 3.17 | barrato delle scraps (il testo barrato resta `--faint`, 5.42) |
| vetro della nav `rgba(12,15,23,.90)` sopra una foto **bianca**: `--muted` / `--faint` / `--accent-text` / CTA tinta / CTA tinta in hover / anello | 6.22 / 4.71 / 5.36 / 4.91 / 4.91 / 3.43 | caso peggiore: la nav passa sopra qualsiasi immagine. A .72 (kwslabs) le voci scendevano a 3.25 e l'anello a 1.79. Voce in hover, `--text` su `--steel-soft` sopra vetro e foto bianca: 9.94; `--accent-text` sullo stesso fondo: 4.28, vietato (§6.1) |
| anello interno di una voce della nav su `--steel-soft` sopra vetro e foto bianca | **2.74, sotto 3:1** | perciò in focus niente fondo di hover: l'anello confina con il vetro su entrambi i lati (3.43, §6.1) |
| badge `--muted` su fondo opaco `--bg` | 7.98 | badge `RENDER`/`FOTO` sopra qualsiasi immagine |
| Tavola 01, incrocio delle linee della griglia (due linee steel .08 su `--sheet` = rgb(35.4, 44.3, 59.8)): `--accent-text` / `--steel` / `--muted` (lead 18px, nota 14px) / `--text` | 5.02 / 4.86 / 5.82 / 11.64 | il pixel peggiore del foglio; sulle colonne velate a 55%: 6.11 / 5.92. `--faint` sull'incrocio scenderebbe a 4.41: sul foglio `--faint` non si usa |
| pannello contatto, cima tinta (`--accent-soft` su `--surface-2`): `--muted` / `--steel` / `--faint` | 6.56 / 5.47 / 4.96 | testi del pannello che brilla |

### 4.4 Proposte (non applicate, da valutare)

Additive: non cambiano nessun valore esistente. Se le adotti nei mockup, restano proposte finché Lorenzo non le porta nel repository.

| Proposta | Valore | Motivo |
|---|---|---|
| `--kerb-dash` | `32px` | larghezza del trattino cordolo: oggi vive solo in `base.css`; un token la rende verificabile nel CSS compilato |
| `--eyebrow-dash` | `24px` | larghezza del trattino dell'occhiello, stessa ragione |
| `--lh-data` | `1` | interlinea delle cifre grandi (kwslabs usa 1 sul prezzo) |
| `::selection` | fondo `--accent-soft`, testo `--text` | senza regola la selezione è il blu di sistema, l'unico blu che comparirebbe nel sito. Tinta, non rosso pieno |
| `prefers-contrast: more` | `--line` .28, `--line-strong` .40, `--faint` → `--muted` | filetti e note più netti per chi lo chiede al sistema |
| bordo dei controlli a riposo | `rgba(220,228,240,.40)` (3.23:1 su `--bg`, 3.15 su `--raised`) | **DA TESTARE**, non adottare di default: renderebbe ghost e filtri riconoscibili senza leggerne il testo (WCAG 1.4.11), ma li accende molto più di `--line-strong` |

Nessuna modifica ai colori: i contrasti di §4.3 valgono solo con questi esadecimali.

---

## 5. Tipografia e titolo in due frasi

### 5.1 Famiglie e pesi
- **IBM Plex Sans** (`@fontsource/ibm-plex-sans`, pesi 400/500/600/700) per tutto il testo e i titoli. Niente 300, niente corsivi (il corsivo solo per nomi di file nel corpo).
- **IBM Plex Mono** (`@fontsource/ibm-plex-mono`, 400/500) per occhielli, numeri, etichette, tag, badge, chiavi dei pannelli, prefissi delle didascalie, cifre grandi, meta del footer.
- Sei file woff2 serviti dal dominio, `font-display: swap`. Nessuna richiesta a Google Fonts o a un CDN.
- Pesi Sans: **700** solo l'h1 · **600** h2, h3, h4, bottoni, `strong`, `summary` delle FAQ, `.link-arrow` · **500** voci di nav, valori `dd` dei pannelli, frase-punch · **400** corpo, lead, `.t-soft`, pill. Pesi Mono: **500** occhielli, tag, `.label`, cifre grandi · **400** chiavi `dt` e prefissi delle didascalie.
- **Il mono non è mai un titolo né un paragrafo**, con due eccezioni prese da kwslabs: gli h3 delle colonne della Tavola 01 e i tag accanto agli h3 del confronto.

### 5.2 Scala (valori di `tokens.css` e `base.css`, root 16px)

| Ruolo | Token | Misura | Peso · colore | Note |
|---|---|---|---|---|
| h1 | `--fs-h1` | 36 → 60px, interlinea `--lh-title` 1.15 | 700 · `--text` | tracking −.015em; uno per pagina |
| h2 | `--fs-h2` | 30 → 36px, 1.15 | 600 · `--text` | tracking −.01em |
| h3 | `--fs-h3` | 24/32 (1.33) | 600 · `--text` | h3 dei case |
| h4 | `--fs-h4` | 20/28 (1.4) | 600 · `--text` | colonne, card compatte |
| h2 della `.prose` | `--fs-h4` | 20/23 (interlinea 1.15 dell'h2), tracking −.01em, 48 sopra | 600 · `--text` | così in `base.css`: cambia solo la misura dell'h2, non interlinea e tracking |
| h3 della `.prose` | `--fs-body` | 16/21.3 (interlinea 1.33 dell'h3), 32 sopra | 600 · `--text` | così in `base.css`: non è un corpo 16/1.6 |
| lead | `--fs-lead` | 18px, `--lh-lead` 1.55 | 400 · `--muted` | larghezza `--measure` (680px) |
| corpo | `--fs-body` | 16px, `--lh-body` 1.6 | 400 · `--text` (`--muted` nella `.prose` e nelle card) | `text-wrap: pretty` |
| piccolo | `--fs-sm` | 14px | 400-600 | micro-prove, footer, voci nav, bottoni |
| nota | `--fs-note` | 13px | 400 · `--faint` | note sotto le CTA; le pill sono 13px `--muted` (§6.0) |
| occhiello | `--fs-eyebrow`, mono | 12px, 1.33, tracking .14em | 500 · `--steel` | maiuscolo; la misura minima di un'informazione in mono |
| micro | `--fs-micro`, mono | 10px, tracking .12em | 500 · `--muted` o `--faint` | solo `.tag`, `.label`, badge: maiuscolo, mai unico posto di un'informazione indispensabile |
| cifre grandi | `--fs-data`, mono | 48/1 | 500 · `--text` | `tabular-nums`; al massimo 4 per pagina |

`text-wrap: balance` su h1-h4 (già in `base.css`).

### 5.3 Il titolo in due frasi (deciso)

Per l'h1 e gli h2 di sezione: la prima frase **afferma** (600, 700 sull'h1, `--text`), la seconda **si siede** (`.t-soft`: a capo, 400, steel).

```html
<h2>Il pezzo che ti serve non esiste.<span class="t-soft">E non hai un file da mandare a nessuno.</span></h2>
```

```css
/* base.css. L'h1 prende la regola comune h1-h4 (color: var(--text)): nessun background-clip. */
.t-soft{display:block;font-weight:400;color:var(--steel);letter-spacing:-.01em}
```

Regole: la prima frase ha al massimo 8 parole e chiude con un punto; la seconda al massimo 10, non ripete la prima e non contiene numeri; nessuna delle due in maiuscolo; niente grassetto nei titoli; **ogni riga di un titolo ha un solo colore, e nessun titolo ha un gradiente**; niente punti esclamativi, niente emoji.

Formule che funzionano (dal metodo di kwslabs, con i titoli reali del sito):
- **Promessa + meccanismo** (h1): «Pezzi che non esistono in commercio. / Progettati in CAD sulle tue misure, stampati, provati.»
- **Affermazione + prova:** «Ogni pezzo con la sua origine. / Originale, derivato o modello di terzi: è scritto sulla card.»
- **Antitesi sullo stesso soggetto:** «Il pezzo che ti serve non esiste. / E non hai un file da mandare a nessuno.»
- **Imperativo + rassicurazione:** «Parti da quello che hai. / Non serve un file 3D: serve una misura.»
- **Regola + eccezione:** «Sei tappe, sempre nello stesso ordine. / Il prototipo, solo quando serve.»
- **Obiezione + concessione:** «Perché non scaricare un modello gratis? / Dovresti, quando esiste.»

**A una frase, senza `.t-soft`:** i titoli di qualificazione e d'azione. «Questo lavoro chiede una misura, non un file.» (Tavola 01), la frase della fascia «Cosa ricevi» (che non è un h2), la frase della CTA band nelle pagine progetto. Il manifesto non è un titolo: è una citazione (§6.19).

### 5.4 Occhiello (`.eyebrow`, `base.css`)
Flex con gap 12, largo quanto il contenuto (`width: fit-content`), Plex Mono 500 12/1.33, tracking .14em, maiuscolo via CSS, `--steel`; `::before` trattino 24×1 in `currentColor`, pieno. `.eyebrow.bare` toglie il trattino: si usa dentro card, pannelli, timeline e Giri. Nel markup il testo si scrive normale, il maiuscolo lo fa il CSS. A 375px un occhiello oltre ~32 caratteri va a capo dopo un « · » (un segmento oltre 26 caratteri anche fra le sue parole, vedi sotto), con il trattino sulla prima riga; mai prima di un « · », mai a metà di una parola.

**Markup (vincolante).** La primitiva è un flex senza `flex-wrap`: ogni figlio diretto del `p` è un elemento flessibile che non va mai a capo. Se ogni segmento fosse figlio diretto, il gap di 12 finirebbe attorno a ogni « · » e la riga uscirebbe dallo schermo (`DOVE FINISCE IL GIRO · LA FRASE CHE VOGLIO SENTIRTI DIRE` misura circa 540px contro i 327 utili a 375: scorrimento orizzontale della pagina, vietato da §10.5). Il componente Astro spezza la stringa su « · » al build e genera **un solo contenitore**, così c'è un solo elemento flessibile, che va a capo solo dopo un « · » e mai dentro un segmento `.nw`. Fra un segmento e l'altro scrive uno **spazio indivisibile** (U+00A0, `&nbsp;`) prima del « · » e uno spazio normale dopo: così l'unico punto in cui la riga può andare a capo è dopo il punto, e nessuna riga comincia con « · ». Con due spazi normali il browser potrebbe andare a capo anche prima del punto (basta che ci stia «Progettazione 3D» ma non «Progettazione 3D ·»). È solo HTML, niente JS:

```html
<p class="eyebrow"><span class="eyebrow__txt"><span class="nw">Progettazione 3D</span>&nbsp;· <span class="nw">Su misura</span>&nbsp;· <span class="nw">Piccole serie</span></span></p>
<p class="eyebrow"><span class="eyebrow__txt"><span class="nw">Dove finisce il giro</span>&nbsp;· <span>La frase che voglio sentirti dire</span></span></p>
```

`.nw` (`white-space:nowrap`) solo sui segmenti di **26 caratteri o meno**: reggono anche a 320px, cioè zoom al 400% (Plex Mono 12 con tracking .14em fa circa 8.9px per carattere; restano 236px dopo trattino e gap, 291 a 375). I segmenti più lunghi, oggi solo «La frase che voglio sentirti dire» (33 caratteri, circa 293px), restano senza `nowrap` e vanno a capo fra le parole, mai a metà di una parola.

```css
/* DA AGGIUNGERE in base.css (oggi non c'è), come le regole forced-colors di §3.A */
.nw{white-space:nowrap}
/* il trattino resta centrato sulla prima riga (interlinea 12 × 1.33 ≈ 16px), non fra le due righe */
.eyebrow::before{align-self:flex-start;margin-top:calc(.665em - .5px)}
```

### 5.5 Grassetto
**Al massimo un `strong` per paragrafo**, peso 600 in `--text` (in `base.css`), mai un paragrafo intero. Contiene la tesi, non un aggettivo. Usi: il dato decisivo del case (campo `proof`), l'etichetta iniziale di una voce di lista («**Il pezzo stampato** – in PLA o PETG, su Bambu Lab X2D.»), i verbi del confronto («**Misura.**»), il preambolo d'onestà («**Cosa non fa:**»), l'esito della timeline («**Ricevi:**»). Nelle liste, fra etichetta e testo c'è il trattino « – », l'unico ammesso.

### 5.6 Icone e glifi
Solo SVG inline lineari, 16-20px, tratto 1.5, `--steel`, `aria-hidden`, mai riempiti: micro-prove dell'hero, step-card, liste della Tavola 01, chiusura del metodo. Frecce come caratteri: « → » per la navigazione interna, « ↗ » per i link esterni. Spunta « ✓ » in `--accent-text` solo in «Cosa ricevi». Nessuna emoji.

---

## 6. Componenti

**Convenzioni.** Le primitive di `base.css` usano modificatori concatenati (`.btn.primary`, `.section-head.center`, `.led.ok`, `.tag.accent`, `.eyebrow.bare`) e si usano con quei nomi. I componenti ancora da scrivere usano BEM (`.tile--render`, `.case__boundary`, come `.prose--case` già nel codice): i nomi di §6.1-6.19 sono indicativi, le misure no. Ogni componente vive in un solo file: `chrome.css` (Nav, Footer, Kerb, Logo), `media.css` (Tile, Gallery), `grid.css` (ProjectCard, ProjectGrid, FilterBar), `telemetry.css` (Telemetry, ProjectSpecs, PrintLog, BigNumbers), `method.css` (Case, Giri, Timeline), `argument.css` (Sheet, Compare, Scraps), `contact.css` (ContactPanel, Attribution). I componenti consumano i token e non ridefiniscono le primitive. I nomi dei componenti ancora da scrivere sono in italiano quando il concetto è racing (`Giri.astro`, `ol.giri`, `li.giro`: mai «lap»).

Per ogni componente: anatomia, stati (riposo · hover · `:focus-visible` · corrente, dove esiste), resa a 375px, e la resa nello stato «pochi progetti» dove conta (§0.7). Nessuno stato disabilitato: il sito non ha controlli disabilitati. In `base.css` `.btn` ha in transizione `background-color`, `border-color`, `box-shadow` e `transform` (`--t-fast`, `--ease`; `transform` serve solo a `:active{scale(.98)}`); i link cambiano colore senza transizione. I componenti nuovi possono aggiungere `color` con `--t-hover` e `--ease`; nessun `transform` in hover. Tutto azzerato da `prefers-reduced-motion` (già in `base.css`).

### 6.0 Primitive già nel codice (`base.css`) — vincolanti

| Primitiva | Valori |
|---|---|
| `html` | `color-scheme: dark`; `scroll-padding-top: calc(var(--nav-h) + var(--s-400))` (94px: le ancore non finiscono sotto la nav) |
| `body` | fondo `--bg`, testo `--text`, Sans 400 16/1.6 |
| link | `--accent-text`, sottolineatura 1px con offset .2em; hover `--text` |
| `:focus-visible` | `outline: var(--focus)` (2px `--accent`), offset 3px, raggio `--radius-sm` (è un raggio di ripiego: un elemento con un raggio proprio dichiarato dopo lo tiene, così `.btn` resta a 12). `outline: none` non esiste nel foglio |
| `ul[role="list"]`, `ol[role="list"]` | senza marcatori né rientro |
| `.skip-link` | fuori schermo finché non ha il focus, poi a 16px dall'angolo; fondo `--raised`, bordo `--bd-strong`, testo `--text` 600, padding 12/16, raggio 8 |
| `.visually-hidden` | testo solo per gli screen reader |
| `.t-soft`, `.lead`, `.muted`, `.faint`, `.mono` | `.t-soft` e `.lead`: §5.2-5.3; `.muted` e `.faint`: solo il colore; `.mono`: Plex Mono con tracking .12em, senza misura né maiuscolo |
| `.eyebrow`, `.eyebrow.bare` | §5.4 |
| `.label` | Mono 500 10px, tracking .12em, maiuscolo, `--faint`: etichette di colonna (`PAGINE`, `CONTATTO`) |
| `.wrap`, `.wrap.narrow` | larghezza `min(100% - 2 × --gutter, --wrap)` (1120px) o `--wrap-narrow` (720px), centrata |
| `.section`, `.section.band`, `.section.alt`, `.section.pit` | padding `--sect` (40 → 96 da 760px) o `--band` (40 → 64); `.alt` = `--surface` con `border-block: var(--bd)`; `.pit` = fondo `--pit` |
| `.section-head`, `.section-head.center` | griglia gap 16, larghezza massima 680, margine sotto 48 a ogni larghezza; trattino cordolo 32×3 sotto l'h2; `.center` centra tutto, trattino compreso |
| `.btn` | è il **ghost**: `inline-flex`, gap 8, altezza minima 44, padding 0 24, bordo `--bd-strong`, raggio `--radius` (12), trasparente, testo `--text` 600 14/1; hover bordo `--steel`; `:active{scale(.98)}` |
| `.btn.primary` | fondo `--accent-deep`, bordo `--accent`, testo `--on-accent`, ombra `--shadow-primary`. Hover: il fondo **resta** `--accent-deep`, l'anello passa a `--accent` pieno e l'alone si allarga |
| `.cta-row` | flex che va a capo, gap 16 |
| `.link-arrow` | azione testuale: 600, `--accent-text`, senza sottolineatura; hover sottolineata e bone |
| `.pills` + `.pill` | `.pills`: flex che va a capo, gap 8. Pill tratteggiata: altezza minima 28, padding 0 12, bordo 1px dashed `--line-strong`, raggio 999, `--muted`, Sans 400 13/1 |
| `.tag`, `.tag.accent` | `inline-flex` con gap 8 (per un LED accanto), Mono 500 10px, tracking .12em, maiuscolo, padding 4/8, bordo `--bd-strong`, raggio 6, `--muted`; `.accent` = bordo `--accent-line`, fondo `--accent-soft`, testo `--accent-text` |
| `.led` (+ `.ok`, `.test`, `.fail`, `.queue`) | cerchio 7px, piatto (§3.C); senza classe di stato è `--faint` |
| `.prose`, `.prose--case` | larghezza `--measure`, testo `--muted`, blocchi distanziati di 16; h2 a 20px (interlinea 1.15 e tracking −.01em dell'h2) con 48 sopra; h3 a 16px (interlinea 1.33) con 32 sopra (§5.2); liste rientrate di 1.2em, 8 fra le voci; nei case study ogni h2 è preceduto da `GIRO n/6` (contatore CSS, Mono 500 12/1 tracking .14em steel, 12 sotto) |

### 6.1 Nav a pillola (`chrome.css`)
**Anatomia.** `header` in flusso, `position: sticky; top: 16px; z-index: 20`. Pillola dentro il `.wrap`: `display:flex; align-items:center; gap:24px; min-height:var(--nav-h)` (62), `padding: 8px 8px 8px 16px`, `background: rgba(12,15,23,.90)` con `backdrop-filter: blur(20px)` (senza supporto alla sfocatura: `rgba(12,15,23,.96)`), `border: var(--bd)`, `border-radius: var(--pill)`. Da sinistra:
- brand (link a `/`): monogramma 28px + «Lorenzo Arrigoni» 16/600 `--text` + «· Progettazione 3D» 14/400 `--faint` (visibile da 960px);
- voci **Progetti · Metodo · Per chi è · Preventivo**: link 14/500 `--muted`, `min-height:44px`, padding 0 12, raggio pill, senza sottolineatura. In home puntano alle ancore `#progetti`, `#metodo`, `#perchi` e a `/preventivo/`; nelle altre pagine «Progetti» porta a `/projects/`, le altre a `/#metodo`, `/#perchi`, `/preventivo/`;
- CTA **«Scrivimi»** (`#contatto`, altrove `/#contatto`): **pillola tinta**, non piena. Fondo `--accent-soft`, bordo `--bd-accent`, testo `--accent-text` 600 14/1, `min-height:44px`, padding 0 16. La nav è sempre visibile: una pillola piena starebbe accanto alla CTA dell'hero e a quella del contatto, due rossi pieni nella stessa schermata. Esiste solo qui: non è una variante generica di bottone.

**Stati.** Voce: hover fondo `--steel-soft` e testo `--text`; corrente (`aria-current="page"`, solo su `/projects/` e sulle sue viste, e su `/preventivo/`) testo `--accent-text` + `text-decoration: underline 1px; text-underline-offset: .3em` (5.36:1 sul vetro nel caso peggiore). È la stessa regola del filtro corrente (§6.17), copiata identica: nel sito «corrente = sottolineato» vale ovunque. In home le ancore non hanno stato corrente (servirebbe JS). Voce corrente in hover: fondo `--steel-soft`, testo `--text`, sottolineatura invariata. `.nav__list a[aria-current="page"]:hover{color:var(--text)}`, dichiarata dopo la regola della voce corrente. Mai `--accent-text` sul fondo `--steel-soft` (4.28:1 sopra una foto bianca, §4.3). CTA: hover bordo `--accent`. Focus: l'anello globale su brand e CTA; **eccezione dichiarata** per le voci della lista: `.nav__list a:focus-visible{outline-offset:-2px}`, anello interno (3.43:1 anche sopra una foto bianca). Motivo: con `box-sizing:border-box` la pillola lascia 62 − 16 − 2 = 44px interni, le voci sono alte 44, e sotto 760px la lista ha `overflow-x:auto`, che ritaglia sopra e sotto l'anello esterno (2px di spessore + 3 di offset = 5px di sporgenza). In `:focus-visible` la voce non prende il fondo di hover: `.nav__list a:focus-visible{background:transparent}`, dichiarata dopo la regola di hover. Così l'anello interno confina con il vetro su entrambi i lati (3.43); sul fondo `--steel-soft` scenderebbe a 2.74 (§4.3).

**375px (sotto 760px).** La pillola va da margine a margine del `.wrap`, raggio invariato. Il brand è solo il monogramma (sotto 480px il nome è `.visually-hidden`). Le voci stanno in una lista con `overflow-x:auto; scroll-snap-type:x proximity; scrollbar-width:none`, **senza `mask-image`**: il seguito lo segnala la voce tagliata netta dal bordo della lista, che resta a 6.22:1. Una dissolvenza sfumerebbe il testo stesso (una voce `--muted` al 50% di opacità scende a 2.64:1 sul vetro), sfumerebbe anche l'anello di focus e a fine corsa continuerebbe a dire «c'è altro»: legarla allo scorrimento richiederebbe JS o `animation-timeline`, che non è supportata ovunque. «Per chi è» sparisce. La CTA è `flex:none`, sempre visibile. **Nessun hamburger**, nessun nascondimento allo scroll. Sotto 760px la lista parte sempre dalla prima voce: senza JavaScript la voce corrente non si porta in vista. Su `/preventivo/` la voce «Preventivo» è fuori vista al caricamento (l'`aria-current` resta per gli screen reader). La posizione la dicono l'occhiello `PREVENTIVO · GRATUITO, NON IMPEGNA` e l'h1, come fa la riga «Filtro attivo» per i filtri (§6.17). Il mockup a 375px mostra la lista a inizio corsa, mai scorsa sulla voce corrente; le voci non si riordinano (WCAG 3.2.3). Nota, non regola: `.nav__list [aria-current="page"]{scroll-initial-target:nearest}` è un miglioramento progressivo solo CSS (oggi solo Chromium); il design non ci fa affidamento.

### 6.2 Footer (`chrome.css`)
**Anatomia.** Cordolo in cima (§3.A, uso 2), fondo `--bg`, `padding-block: 48px 32px`. Griglia a 3 colonne da 760px (`1.4fr 1fr 1fr`, gap 48): (1) monogramma 40px + «Lorenzo Arrigoni» 16/600 + tagline 14 `--muted` («Progettazione 3D su misura per privati e piccole aziende. Un pezzo, o una piccola serie.»); (2) `.label` `PAGINE` + Progetti · Metodo · Preventivo · Chi sono · Biglietto, 14/500 `--muted`, in colonna, ciascuno con un'area alta 44; (3) `.label` `CONTATTO` + `lore.larrigoni@gmail.com` in `--accent-text` 14/500 + «GitHub ↗» 14/500 `--muted` + meta Mono 12 `--faint` `PORTFOLIO · AGG. 2026-09` (data dell'ultimo progetto pubblicato, mai del build). Ultima riga, sotto un filetto `--bd`: «© 2026 Lorenzo Arrigoni» 13 `--faint`. Nessun «social in arrivo», nessun fondo colorato.
**Stati.** Link: hover `--text`; focus anello.
**375px.** Colonne impilate, gap 32; il cordolo resta 3px.

### 6.3 Kerb (`chrome.css`)
Specificato in §3.A: tre usi, CSS, divieti. Nessuno stato: non reagisce all'hover, non si anima, non cambia allo scroll. `aria-hidden`. A 375px identico.

### 6.4 Logo (`chrome.css`, `public/logo.svg`)
Specificato in §3.D. SVG inline; nel link del brand è `aria-hidden` (il nome è già testo), altrove `role="img"` con `aria-label="Lorenzo Arrigoni"`. Nessuno stato proprio: il focus sta sul link che lo contiene. La favicon non cambia.

### 6.5 Bottoni e link
Primitive in §6.0. Regole d'uso:
- **`.btn.primary`**: **una per schermata**. Il testo dice cosa succede dopo il clic: «Guarda i progetti →», «Scrivimi →», «Chiedi un preventivo →», «Salva il contatto». Focus: l'anello `--accent` a 3px di distanza cade sul fondo, non sul bottone. Sul bordo inferiore cade dentro l'alone, opacità ≈ .18: 3.81:1 su `--bg`, 3.61 su `--surface`, 3.41 su `--surface-2`; in hover (≈ .21) 3.68 / 3.49 / 3.30; sulla cima tinta del pannello contatto, in hover, scenderebbe a 2.93 (§6.18).
- **`.btn`** (ghost): la seconda azione della coppia («Raccontami il problema») e le azioni di sezione dove non c'è una CTA piena («Mandami una foto con un righello →», «Leggi come nasce il prezzo →», «Vai al Print Lab →», «Il tuo caso somiglia a uno di questi? Scrivimi →»).
- **Pillola tinta**: solo la CTA della nav (§6.1).
- **`.link-arrow`**: azioni testuali dentro i componenti («Vedi la scheda →», «Modello su MakerWorld ↗», «Tutti i progetti →»), in una riga propria: la riga è alta 25.6px, sopra i 24px minimi di WCAG 2.5.8.
- **Link nel testo corrente**: `--accent-text` sottolineati; hover `--text`; esenti dalla misura minima dei target (link in linea).
- **Link esterni**: nella stessa scheda, con « ↗ » nel testo.
- **Coppia CTA** (`.cta-row`): primaria + ghost, gap 16; a 375px vanno a capo, primaria per prima. Sotto la coppia, se serve, una nota 13 `--faint` («Preventivo gratuito, non impegna. Nessun modulo.»).

### 6.6 Section-head
Primitiva in §6.0 (`.section-head`, `.section-head.center`). Ordine: `p.eyebrow` → h2 in due frasi con il trattino cordolo → `p.lead`. `.center` per Il problema e il Manifesto. Nella Tavola 01 l'occhiello è sostituito dal chip (§6.13). Non è interattivo. A 375px: h2 30px, tutto il resto invariato.

### 6.7 Tile — render e foto (`media.css`)
**Anatomia.** `figure` > `.tile` > immagine + badge; `figcaption` sotto, fuori dalla tile.

```css
.tile{position:relative;aspect-ratio:4/3;border:var(--bd-strong);border-radius:var(--radius);overflow:hidden;
      background:var(--raised) radial-gradient(ellipse 70% 45% at 50% 82%,var(--steel-soft),transparent 70%)}
.tile img{width:100%;height:100%}
.tile--render img{object-fit:contain;padding:8%;filter:var(--lift)}
.tile--foto img{object-fit:cover}
.tile__kind{position:absolute;right:var(--s-100);bottom:var(--s-100);background:var(--bg)} /* insieme alla classe .tag */
```

Il radiale in basso è il **pavimento**: una pozza di luce fredda su cui il PNG trasparente si posa. `--lift` è l'ombra di contatto più un filo chiaro di 1px che stacca i pezzi scuri dal fondo: **nel CSS, mai nel PNG**. Il badge è un `.tag` su fondo **opaco** `--bg` (7.98:1 sopra qualsiasi immagine; un vetro semitrasparente scendeva fra 2.46 e 3.25:1 sopra una foto chiara): `RENDER`, `RENDER DI SCENA`, `FOTO`, `DISEGNO`, `SCHERMATA` (le etichette di `taxonomy.ts`), oppure `RENDER RITOCCATO` / `FOTO RITOCCATA` se l'immagine è `aiAssisted` (oggi `Tile.astro` aggiunge ` · AI` all'etichetta: va allineato a questa forma). `aiAssisted` riguarda solo i pixel dell'immagine (ADR-012), mai la geometria: un pezzo la cui geometria l'ha generata un assistente AI ha un render normale, `RENDER` (§6.16). Rapporti: 4:3 di base, 3:2 per l'immagine promossa della galleria, un solo rapporto per griglia.
**Stati.** Da sola, nessuno. Dentro un link: hover bordo `--steel`, nessuno zoom, nessuna ombra in più; focus: anello sul link.
**375px.** Da margine a margine (327px con il gutter di 24), 4:3; badge invariato.

### 6.8 Project-card compatta (`grid.css`)
**Anatomia.** `article.pcard` senza bordo né fondo: tile + testo allineati a sinistra. Tile 4:3 → `p.eyebrow.bare` `P03 · ORIGINALE · 2026` (12 sopra) → h3 20/28 600 che contiene l'unico link (`--text`, senza sottolineatura; un `::after` con `inset:0` estende il clic a tutta la card) → meta Mono 12 tracking .12em maiuscolo `--muted` (`PLA · 1 PEZZO` (esempio); il porta ciuccio non ha questa riga, perché materiale e pezzi non sono documentati) → riga di stato **solo se lo stato non è «completato»**: `.led` + etichetta Mono 12 `--muted` (porta ciuccio: `.led.test` `IN PROVA`). Griglia `repeat(auto-fill,minmax(18rem,1fr))`, gap 32/24, ordine per `order`. Tile tutte dello stesso rapporto, niente card doppie, niente masonry.
**Pochi progetti.** La griglia deve reggere con 2, 3 e 4 card. `auto-fill` tiene la card della stessa larghezza qualunque sia il numero (a 1440 tre colonne da circa 357px): con 2 card la terza colonna resta vuota, con 4 la seconda riga ha una card sola, allineata a sinistra. Lo spazio vuoto non si riempie: niente card segnaposto, niente card allargate o doppie per pareggiare la riga (`auto-fit` non si usa: con 2 card le allargherebbe, con 1 porterebbe la tile a tutta pagina). La sezione si accorcia e il footer sale. Un progetto senza immagine non si pubblica (resta in bozza), quindi sul sito non esiste una card senza tile: nel build di design le bozze senza immagine compaiono, ma non sono una variante da disegnare.
**Stati.** Hover sulla card: titolo `--accent-text` (stato di un link: l'unico titolo che diventa rosso, §9.23), bordo della tile `--steel`. Focus: le due regole stanno **insieme** dentro un solo `@supports`, così l'anello si sposta sulla tile solo dove il browser sa farlo:

```css
@supports selector(:has(a:focus-visible)){
  .pcard:has(a:focus-visible) .tile{outline:var(--focus);outline-offset:2px}
  .pcard h3 a:focus-visible{outline-color:transparent}
}
```

Con `:has()` l'anello è uno solo e avvolge la cosa grande; senza `:has()` resta l'anello globale sul link, e il focus non diventa mai invisibile (WCAG 2.4.7). Non è `outline:none`: in `forced-colors` l'anello trasparente del link torna visibile. È l'unica eccezione all'anello sul link (§10.3). Nessun sollevamento.
**375px.** Una colonna, stesse misure.

### 6.9 Case — il cuore della home (`method.css`)
**Anatomia.** `article.case`, da uno a quattro (uno per progetto in vetrina pubblicato, `featured`, in ordine di `order`), impilati con gap 32, ciascuno con un `id` (`p` + `order`: `p03`): `--surface-2`, `border: var(--bd-strong)`, raggio `--radius-lg` (16), padding 32; da 860px `grid-template-columns: minmax(0,6fr) minmax(0,6fr)`, gap 32, testo a sinistra, tile a destra, **mai alternati**. Colonna testo (griglia gap 16, `align-content:start`):
1. `p.eyebrow.bare` `PROGETTO 03 · STUDIO` (da `order` e `context`: porta ciuccio);
2. h3 24/32 600, orientato al beneficio (campo `headline`, 8-10 parole);
3. paragrafo 16/26 `--muted`, 35-60 parole, **un solo** `strong` (campo `proof`);
4. `p.case__boundary`, opzionale: «**Cosa non fa:** …» (campo `boundary`), filetto sinistro 2px `--line-strong`, padding-left 16, 14px `--faint`;
5. `.pills` con al massimo 3 `.pill`, in ordine fisso e solo se il dato esiste: materiale e pezzi («PLA · 1 pezzo» (esempio)), stampe ed esito dal registro, tratto distintivo. Il porta ciuccio ne ha due: «1 stampa · 1 fallita» e «Filetto a 3 principi» (materiale e pezzi non sono documentati: la pill non c'è);
6. un'azione: se `depth` non è `card` → `.link-arrow` «Vedi la scheda →»; se `origin` è `terzi` → `.link-arrow` «Modello su MakerWorld ↗»; altrimenti nessuna.

Colonna immagine: `.tile` con `aspect-ratio:auto; height:100%; min-height:320px` (riempie la colonna: è la condizione del 55% di §8), badge sempre, **senza didascalia**: il titolo del case fa da didascalia, il badge e l'`alt` dichiarano cosa è. Mai due immagini nella stessa card.
Chiusura della sezione: paragrafo 14 `--faint` (campo `closing` di `home.ts`, con il percorso /projects/ reso come link) + `.btn` ghost «Il tuo caso somiglia a uno di questi? Scrivimi →».
**Pochi progetti.** La sezione regge con un solo case: testata, un case, chiusura. Nessun case segnaposto, nessuna tile vuota, nessuna griglia di card compatte aggiunta sotto per «fare numero»; i testi della sezione non dicono quanti progetti ci sono. Un progetto in vetrina senza immagine valida non diventa un case: resta in bozza. Oggi, nel build di design, l'unico progetto in vetrina con un render valido è il porta ciuccio (`PROGETTO 03`); il porta telecomandi (`PROGETTO 02`) è in bozza senza immagini (§7.4) e nei mockup non si disegna come case.
**Stati.** La card non è un link: nessun hover. L'azione ha gli stati di §6.5.
**375px.** Una colonna, padding 24, gap 24; **la tile viene prima del testo** (`order:-1` sotto 860px: la tile non contiene elementi focalizzabili, quindi l'ordine di tabulazione non cambia) e torna 4:3; le pill vanno a capo.

### 6.10 Telemetria (`telemetry.css`): `.tele`, ProjectSpecs, PrintLog, BigNumbers
**`.tele`.** `--surface-2`, `border: var(--bd)`, raggio 12, `overflow:hidden`. Testata: flex con titolo a sinistra e meta a destra, padding 12/16, `border-bottom: var(--bd)`, Mono 500 12 tracking .14em maiuscolo; titolo `--steel`, meta `--faint`. Corpo `dl`: righe `grid-template-columns: minmax(9rem,max-content) 1fr`, gap 8/16, padding 10/16, filetto `--bd` fra le righe; `dt` Mono 400 12 tracking .12em maiuscolo `--faint`; `dd` Sans 500 16/24 `--text`. Riga di stato: `dd` con `.led` + testo. Una riga esiste solo se il dato esiste.
- **ProjectSpecs** (colonna 5fr della pagina progetto; da 960px `position:sticky; top:calc(var(--nav-h) + 40px); align-self:start`: senza `align-self:start` l'elemento di griglia si allunga quanto la riga, cioè quanto la galleria, e lo sticky non ha corsa): testata `SCHEDA DEL PEZZO` · `REV. FINALE`; righe, nell'ordine e solo se presenti: Funzione · Materiale · Pezzi · Varianti · Stampante · Software · Contesto · Stato. Per il porta ciuccio oggi esistono solo due righe: Contesto «Studio» e Stato `.led.test` «In prova». Materiale, stampante e software non ci sono perché non sono documentati: il pannello resta, con due righe, ed è la sua forma normale nello stato «pochi dati».
- **PrintLog** (nel case study dopo «Il test»; in una scheda che ha un registro, dopo il corpo Markdown, fuori dalla colonna di `ProjectSpecs`): testata `REGISTRO STAMPE` · meta con il conteggio; righe cronologiche `STAMPA n` → LED + esito + causa. Il porta ciuccio ha una riga sola: testata `REGISTRO STAMPE` · `1 STAMPA, 1 FALLITA`; `STAMPA 1` → `.led.fail` «Fallita — Il tappo non si imbocca: cava ferma sopra il bordo». Una stampa senza esito documentato non entra nel registro (il tappo ristampato del porta ciuccio, per esempio, non c'è); una stampa fallita senza causa non si pubblica.
- **BigNumbers**: griglia 2 → 4 colonne da 760px, gap 24, nessuna card per cella; valore Mono 500 48/1 `tabular-nums` `--text` (unità Mono 14 `--faint` sulla stessa linea di base) + etichetta Mono 12 tracking .12em `--faint`, 8 sotto. **Al massimo 4 per pagina**, solo dati letti dallo slicer, dalla bilancia o dal registro; peso e tempo macchina non esistono finché non sono misurati. Oggi nessun progetto ha dati per questo componente (il porta ciuccio ha una stampa a registro e nessun dato dello slicer): nel kit si mostra solo con valori marcati `FIXTURE`, nelle pagine non compare.
- **Esempio da un lavoro fatto** (`/preventivo`): testata `ESEMPIO DA UN LAVORO FATTO · DATI REALI ANONIMIZZATI`. **Se i dati non ci sono, il pannello non esiste.**
- **Strumenti** (`/about`): righe CAD · Stampante · Materiali · Dove · Dal, solo quelle con un dato.

**Stati.** Nessuno: sono dati. Focus solo sui link eventuali. **Un pannello per schermata.**
**375px.** `dt` sopra `dd` (una colonna), padding 10/12; niente sticky; BigNumbers 2×2 a 48px.

### 6.11 Giri — il metodo (`method.css`, componente `Giri.astro`)
**Anatomia.** `ol.giri` senza marcatori, griglia 1 → 2 (720) → 3 (960) → 6 colonne (1200), gap 16. Ogni `li.giro`: `--surface-2`, `border: var(--bd)`, raggio 12, padding 16, griglia gap 8: `span.eyebrow.bare` `GIRO 1/6` (scritto nel markup: è un dato) → h3 16/24 600 → paragrafo 14 `--faint`. **Una sola evidenziata**, `.giro--now` («Il progetto», GIRO 3/6): bordo `1px solid var(--accent)` (3.96:1 su `--surface-2`, 4.19 su `--surface`) **e** numero in `--accent-text`. Il bordo è il segnale: il numero da solo non basta (`--accent-text` contro lo `--steel` degli altri giri fa 1.03:1, la stessa luminanza) e nemmeno `--accent-line` (1.67:1). Chiusura sotto la griglia: paragrafo 14 `--faint` con icona di ritorno steel («Dal giro 6 si torna all'1: …»).
**Stati.** Non sono link: nessun hover, nessun sollevamento.
**375px.** Una colonna, gap 12; il testo resta 14px.

### 6.12 Timeline — i settori (`method.css`)
**Anatomia.** `ol.track` verticale, `padding-left:40px`, larghezza `--measure`; binario `::before` 2px `--line-strong` a 11px dal bordo. Ogni `li.stage`: gap 8, 40 fra le tappe; nodo `::before` 16px, bordo 2px `--steel`, fondo `--bg`, centrato sul binario. Contenuto: `p.eyebrow.bare` `SETTORE 1 · IL PRIMO MESSAGGIO` → paragrafo 16/1.6 `--muted` → esito 14 `--text` con «**Ricevi:**» in grassetto, **senza colore**. Ultima tappa `TRAGUARDO · CONSEGNA`: nodo **pieno steel**, occhiello in `--accent-text`: l'unico tocco rosso della sezione, e non è pieno. Nessuna bandiera, nessun riempimento animato, nessuna tappa «bloccata», nessun tempo promesso. Sotto: nota 13 `--faint` («Sui tempi: …») e `.btn` ghost «Leggi come nasce il prezzo →».
**Stati.** Nessuno.
**375px.** `padding-left:32px`, 32 fra le tappe.

### 6.13 Tavola 01 · Per chi è — il foglio a griglia (`argument.css`)
**Anatomia.** Sezione con `background: var(--grid-sheet), var(--sheet)` e `border-block: var(--bd-strong)`. Righello: `::before` sul bordo sinistro, largo 14px, `repeating-linear-gradient(to bottom, var(--line-strong) 0 1px, transparent 1px 8px)`, da 760px: è parte del foglio, non una seconda texture. Testata: chip `TAVOLA 01 · PER CHI È` al posto dell'occhiello (Mono 500 12 tracking .14em maiuscolo `--muted`, fondo opaco `--bg`, bordo `--bd-strong`, raggio 6, padding 4/10) → h2 **a una frase** «Questo lavoro chiede una misura, non un file.» con il trattino cordolo → lead. Due colonne da 760px (gap 48), ciascuna con `background: color-mix(in srgb, var(--bg) 55%, transparent)`, `border: var(--bd)`, raggio 12, padding 24:
- colonna «sì»: h3 **mono** 500 12 tracking .14em maiuscolo in `--accent-text` «Sono la persona giusta se» + 4 voci 16 `--text` con spunta SVG steel;
- colonna «no»: h3 mono in `--steel` «Non sono la persona giusta se» + 4 voci con segno meno SVG steel.

Ogni voce: `strong` + « – » + il perché. Sotto le colonne, la nota sulle categorie escluse: filetto sinistro 2px `--accent-line`, padding-left 16, 14 `--muted`, dichiarata come scelta. Il filetto è decorativo: l'informazione è nel testo. Tutto il testo che sta direttamente sul foglio (lead, nota) è `--muted` o `--text`, mai `--faint`: sull'incrocio delle linee `--faint` scende a 4.41:1 (§4.3).
**Stati.** Nessuno.
**375px.** Colonne impilate (gap 16), righello nascosto, griglia di fondo mantenuta.

### 6.14 Compare — La domanda giusta (`argument.css`)
**Anatomia.** Un solo contenitore: `border: var(--bd-strong)`, raggio 16, `overflow:hidden`, due colonne da 760px. Colonna A su `--surface`, padding 32: h3 20/28 «Un file scaricato» + `.tag` `RISOLVE A METÀ`; 3 voci 16 `--muted` con marcatore « · » `--faint`. Colonna B su `--surface-2`, `border-left: var(--bd)` (in colonna, `border-top`): h3 «Un pezzo su misura» + `.tag.accent` `FUNZIONA`; 4 voci con marcatore « + » in `--accent-text` e verbo in `strong` («**Misura.** Parto dalle tue misure, del pezzo o della sede.»). Sotto il contenitore, il verdetto 18/1.55 `--text`, largo 680.
**Stati.** Nessuno. I « + » sono glifi: un gruppo, un tocco.
**375px.** Colonne impilate, padding 24, divisore orizzontale.

### 6.15 Scraps — Il problema (`argument.css`)
**Anatomia.** Sezione con `background: linear-gradient(180deg, var(--pit), var(--surface) 360px)` e `border-block: var(--bd)`. Colonna centrata, 640px: `.section-head.center` → lead → punch 18/1.55 500 `--text`. Attorno, `ul.scraps` (`aria-label="Cose che si sentono dire"`) con 4 voci su `--surface-2`, `border: var(--bd)`, raggio 8, padding 8/12, larghe al massimo 240:
- tre **barrate**: la frase in `s` 14 `--faint`, `text-decoration: line-through 2px var(--strike)`, preceduta da un `.visually-hidden` «Idea sbagliata:» (il barrato non si sente); sotto, la confutazione 13 `--muted` («solo se le misure sono le tue», «simile non è uguale», «finché non si stacca»);
- una **dritta**: «Una foto con un righello accanto» 14 `--text` + `.tag` `SI PARTE DA QUI`, preceduta da un `.visually-hidden` «Quello che vale:».

Da 960px le voci stanno **ai quattro angoli, in una griglia in flusso: due sopra e due sotto il testo, mai `position:absolute`**. Colonna di 640 più due voci da 240 per lato fanno 1120px, cioè tutto il `.wrap` a 1168px di viewport: fra 960 e ~1170px un absolute coprirebbe il testo o uscirebbe dalla pagina (scorrimento orizzontale), e con testo più lungo, zoom o spaziatura aumentata nessuna regola CSS garantirebbe «mai sopra il testo».

```css
/* argument.css, da 960px */
.problem{display:grid;grid-template-columns:1fr 1fr;grid-template-areas:"a b" "t t" "c d";gap:var(--s-300) var(--s-600)}
.problem__text{grid-area:t;justify-self:center;max-width:640px}  /* section-head, lead, punch */
.scraps{display:contents}  /* ul con role="list": le quattro li diventano elementi della griglia */
.scraps li{max-width:240px} /* in a, b, c, d nell'ordine del markup; justify-self:start a sinistra, end a destra */
```

**Ruotano solo le barrate** (−2°, +2°, −1.5°), la frase giusta è dritta: la rotazione è il segno del disordine, non un ornamento. Nel markup il testo viene prima della lista: l'ordine di lettura resta titolo → scraps, e le scraps non hanno elementi focalizzabili (§10.3). Sotto 960px: pila centrata, gap 8, nessuna rotazione.
**Stati.** Nessuno, nessuna comparsa in sequenza.
**375px.** Pila, testo completo.

### 6.16 Attribution (`contact.css`)
**Anatomia.** Obbligatoria se `origin` non è `originale`; sta **accanto alle immagini** (sotto la galleria, nella stessa colonna), mai nel footer. `--surface`, `border: var(--bd-strong)`, raggio 12, padding 16/24; testata Mono 500 12 `--steel` `MODELLO DI TERZI` oppure `MODELLO DERIVATO`; `dl` come in `.tele`: Autore · Fonte (link ↗) · Licenza (link ↗) · Uso commerciale (sì/no) · Modifiche apportate (per i derivati, almeno una frase). Link `--accent-text`. Nessun LED, nessun bordo rosso. Sulla card compatta l'occhiello porta l'etichetta d'origine (`MODELLO DI TERZI · 2026`, senza `P` perché le voci del Print Lab non hanno `order`) e non è mai rosso.
**Le tre origini** (da `taxonomy.ts`, etichette `ORIGINALE`, `DERIVATO`, `MODELLO DI TERZI`). `originale` vuol dire «non derivato da un modello altrui»: niente Attribution. Se la geometria l'ha generata un assistente AI sulle misure e sulle indicazioni di Lorenzo, il progetto resta `originale`: lo dichiara il testo della scheda (nel porta ciuccio, il paragrafo «Il progetto» e il campo `proof`), **senza** un'etichetta, un tag, un badge, un LED o un pannello dedicati, e senza una variante dell'occhiello. `derivato` parte da un modello pubblicato da altri, modificato; `terzi` è il modello di un altro autore stampato così com'è: tutti e due hanno sempre l'Attribution.
**375px.** `dt` sopra `dd`.

### 6.17 Filter-bar (`grid.css`)
**Anatomia.** `nav` con `aria-label="Filtra i progetti"` e una lista flex che va a capo, gap 8. Ogni filtro è un **link a una pagina statica** (`/projects/`, `/projects/categoria/<slug>/`, `/projects/tag/<slug>/`): Mono 500 12 tracking .12em maiuscolo `--muted`, `min-height:44px`, padding 0 16, `border: var(--bd-strong)`, raggio pill; conteggio vero in `--faint` (`SU MISURA (2)` (esempio)). Nessuna icona, nessuna pillola piena.
**Ordine.** Lo stesso in tutte le viste (`/projects/`, `/projects/categoria/…`, `/projects/tag/…`): Tutti → categorie → tag, in ordine fisso. La filter-bar è un meccanismo di navigazione ripetuto su più pagine: il filtro corrente non si sposta mai (WCAG 3.2.3). Nelle viste filtrate, a ogni larghezza, una riga generata al build sopra la barra, Sans 14 `--muted`, dice quale filtro è attivo: «Filtro attivo: Su misura — 2 progetti» (esempio). Non va nell'occhiello: §3.E, punto 8.
**Pochi progetti.** Un filtro esiste solo se ha la sua rotta, come nel codice: una categoria con almeno un progetto, un tag con almeno due. Con pochi progetti la barra ha quindi pochi filtri (anche solo «Tutti» più una categoria) e sta su una riga anche a 375px; non si aggiungono filtri vuoti o a zero. Se ogni filtro mostrerebbe lo stesso elenco di «Tutti», la barra non compare.
**Stati.** Hover: bordo `--steel`, testo `--text`. Corrente (`aria-current="page"`): fondo `--accent-soft`, bordo `--accent-line`, testo `--accent-text`, `text-decoration: underline 1px; text-underline-offset: .3em` (sottolineatura 6.32:1 sul fondo tinto). Il segnale è la sottolineatura, una forma e non un colore, e non aggiunge rosso pieno: fondo, bordo e testo da soli sono solo tinta (§4.2). Focus: anello.
**375px.** Sotto 640px, una riga sola: `overflow-x:auto; scroll-snap-type:x proximity; scrollbar-width:none`, **senza `mask-image`**: il seguito lo segnala il filtro tagliato netto dal bordo (una dissolvenza porterebbe un filtro `--muted` a 2.82:1). Sul contenitore a scorrimento `padding:6px; margin:-6px; scroll-padding-inline:6px`, così l'anello di focus esterno ha spazio e non viene ritagliato. Il filtro attivo resta leggibile a 375px grazie alla riga «Filtro attivo: …».

### 6.18 Contact-panel — l'unico pannello che brilla (`contact.css`)
**Anatomia.** Sezione `#contatto` su `--surface` (`.section.alt`). Pannello `.intent`: `border: var(--bd-accent)`, `background: linear-gradient(180deg, var(--accent-soft), transparent 40%), var(--surface-2)`, `box-shadow: var(--glow)`, raggio 16, padding 32 (64 da 960px); griglia `minmax(0,6fr) minmax(0,5fr)` da 960px, gap 48.
- Sinistra: `section-head` (`CONTATTO · NESSUN IMPEGNO` · «Raccontami il problema. / Una foto e qualche misura bastano per iniziare.» · lead) → h3 20/28 «Cosa mi serve per risponderti» + lista numerata di 4 voci (numeri Sans 400 in `--faint`: il `::marker` di default, cambia solo il colore; è una lista, non numerazione di sistema) → nota 13 `--faint` sul file 3D → h3 «Come prosegue» + 3 righe `--muted`. Nessun tempo promesso.
- Destra (`align-self:center`): l'indirizzo **in chiaro**, `lore.larrigoni@gmail.com`, come link Sans 600 in `--accent-text`, 24/32 da 760px e 20/28 sotto, `overflow-wrap:anywhere` → `.btn.primary` «Scrivimi →» con il `mailto:` precompilato, larga quanto la colonna → nota 13 `--faint` (da `home.ts`: «Apre il tuo programma di posta con la traccia già scritta, se ne hai uno. Nessun modulo, nessun account.»)

Niente modulo, niente tab, niente pulsante «copia» (vorrebbe JS): l'indirizzo è testo selezionabile e punta a un `mailto:` semplice, di riserva se quello precompilato non apre nulla.
**Stati.** Quelli del bottone e del link. L'alone è fermo, non pulsa. La `.btn.primary` non sta mai nel primo 40% dell'altezza del pannello `.intent`, dove c'è la tinta: lì l'anello in hover scenderebbe a 2.93:1 (con la griglia prescritta la CTA è centrata e non ci arriva).
**375px.** Una colonna, padding 24, bottone a tutta larghezza, email a 20px: entra appena nei 277px utili, `overflow-wrap:anywhere` è la rete.

### 6.19 Pattern minori (usati dalle pagine)

| Pattern | Anatomia | 375px |
|---|---|---|
| **Hero** (fondo `linear-gradient(180deg, var(--pit), var(--bg))`) | griglia 6fr/6fr da 960px. Sinistra: occhiello, h1 in due frasi, lead con un grassetto, `.cta-row` («Guarda i progetti →» piena + «Raccontami il problema» ghost) con la nota 13 `--faint`, 3 micro-prove 14 `--muted` con icona steel e grassetto iniziale. Destra: il render **senza cornice** (non è una tile: niente bordo, niente badge), pavimento radiale più largo (`ellipse 80% 40% at 50% 85%`), `--lift`, `mask-image: linear-gradient(to bottom,#000 70%,transparent)`, così l'oggetto esce dal fondo; didascalia Mono sotto, dai dati dell'immagine: `RENDER — ` + nome del progetto (diventa `FOTO — …` quando arriva la foto). Il render è la copertina di un progetto pubblicato: quale, lo decide Lorenzo (Appendice C). Nei mockup si usa l'unico render valido oggi, `porta-ciuccio-iso` (`RENDER — PORTA CIUCCIO`), senza aggiungere testo sul pezzo | testo, poi render largo almeno l'80% della viewport entro 812px dall'alto |
| **Cosa ricevi** (`.section.alt.band`) | occhiello + frase 18 `--text` sulla stessa riga (a capo se serve): niente h2, niente trattino cordolo; lista 1 → 2 (640) → 3 colonne (960), gap 24/40; ogni voce con « ✓ » `--accent-text` (un gruppo, un tocco), `strong` + « – » + testo `--muted`; 5 voci (la sesta solo se Lorenzo la conferma); nota 13 `--faint` | una colonna |
| **Step-card** (Da dove si parte, `.section.alt`) | 5 card come quelle dei Giri, con icona steel 20px al posto del numero; griglia a 6 colonne da 760px (le prime 2 su 3 colonne, le altre 3 su 2); `.step--now` («Da una foto con un righello»): bordo `--accent-line` + `.tag.accent` `CONSIGLIATO`, l'unica evidenziata; nota 13 `--faint` | una colonna |
| **Manifesto** (`.section`, centrato) | occhiello → la frase come `blockquote`, **non un titolo**: 36px, 48 da 760px, 600, `--text`, con «esiste» e «funziona» in `--accent-text` (ferme, nessuna rivelazione) → lead `--muted` → `.btn` ghost «Mandami una foto con un righello →». Nessuna CTA piena, nessun trattino cordolo | 36px, al massimo 3 righe |
| **Prose e GIRO** (`.prose`, `.prose--case`) | primitiva di §6.0; nel case study il corpo ha **esattamente sei `##`** nell'ordine del metodo (Il problema · I vincoli · Il progetto · Il prototipo · Il test · La soluzione), ciascuno preceduto da `GIRO n/6`; immagini nel corpo come `figure` + tile + didascalia; `blockquote` con filetto sinistro 2px `--line-strong` | identico |
| **CTA band** (fine pagina progetto, `.section.alt.band`) | frase 20/28 600 «Hai un problema simile?» + `.btn.primary` «Mandami una foto e due misure →»: il solo rosso pieno della pagina | bottone a tutta larghezza |
| **Galleria** (pagina progetto, colonna 7fr) | da 768px griglia a 2 colonne gap 16, la prima tile promossa a tutta larghezza (3:2); sotto 768px striscia `overflow-x:auto; scroll-snap-type:x mandatory`, gap 12, **senza `mask-image`**, con `padding:6px; margin:-6px; scroll-padding-inline:6px` (l'anello delle tile-link non viene ritagliato); ogni figura `flex:0 0 min(85%,420px)`: la figura successiva sporge dal bordo (circa 40px a 375px) ed è lei il segnale del seguito (con `88vw` la prima figura riempiva la striscia e la seconda restava invisibile); didascalia sotto ogni figura; ogni tile è un link al file originale, nella stessa scheda. Niente lightbox | striscia |
| **FAQ** (`/preventivo`) | `details`/`summary` nativi, `summary` 16/600 con `min-height:44px`, indicatore «+» / «−» in CSS, filetto `--bd` fra le voci; al massimo 6 domande ricevute davvero | identico |
| **404** | `.wrap.narrow`: occhiello con `.led.fail` davanti, `ERRORE 404 · PAGINA NON TROVATA` → h1 «Pezzo non trovato. / Questa pagina non esiste, o non esiste ancora.» → `.btn` ghost «Torna alla home» + `.link-arrow` «Tutti i progetti →». Nessun rosso pieno | identico |
| **`/card/lorenzo`** | pannello unico largo al massimo 24rem, `--surface-2`; cordolo in cima alla pagina (uso 1, fisso) e in fondo alla pagina (uso 4: a tutta larghezza della viewport, ultimo elemento del `body`, almeno 48px sotto il pannello). Nessuno dei due tocca il pannello o ne prende la larghezza: il cordolo non gli fa da cornice (§3.A). Nel pannello: monogramma 64 → nome 24/600 → ruolo `.eyebrow.bare` `PROGETTAZIONE 3D · SU MISURA` → `.btn.primary` «Salva il contatto» (link al `.vcf`) → `.btn` «Scrivimi» → `.btn` «Guarda il portfolio», tutti a tutta larghezza. Nessuna nav, nessun footer | identico |

---

## 7. Immagini

È il punto in cui il tema scuro si gioca tutto: un PNG trasparente su blu-notte, senza pavimento, galleggia e sembra un errore di esportazione. Il sistema risolve con il contenitore, non con il file.

### 7.1 Render su scuro: il pavimento lo dà il CSS
1. Da Fusion: **PNG con canale alfa, 1600×1200 (4:3), senza ombra cotta** (su scuro un'ombra nel PNG diventa una macchia o sparisce). L'ombra di contatto è `--lift`; il pavimento è il radiale `--steel-soft` della tile.
2. Il pezzo occupa circa l'80% del lato corto (`padding: 8%`) e non tocca mai il bordo. Stessa camera, stessa luce e stessa scala per tutti i render di un progetto; set minimo `iso` (copertina), `front`, `top`.
3. Nessuna scritta, quota o filigrana nel pixel: le quote sono un'immagine a sé con badge `DISEGNO`.
4. **Hero:** render più grande, senza cornice, che esce dal fondo con la maschera in basso (§6.19).
5. Consegna via `astro:assets`: WebP al massimo 200 KB, `width` e `height` sempre dichiarati, `loading="lazy"` tranne la prima immagine della pagina.

### 7.2 Badge e alt: nessuna informazione esiste solo nel badge
kwslabs mette il badge solo sulle illustrazioni: l'assenza di badge significa «reale». Da noi il badge c'è **sempre**, perché render e foto convivono nella stessa griglia. È l'unico testo sovrapposto a un'immagine ammesso nel sito (in basso a destra, su fondo opaco). Il badge è per chi scorre; l'`alt` comincia con la stessa parola («Render Fusion del …», «Foto del pezzo montato …»), e nelle gallerie la didascalia la ripete: **nessuna informazione esiste solo nel badge**. Con `aiAssisted` il badge diventa `RENDER RITOCCATO` / `FOTO RITOCCATA`: la dichiarazione è un elemento del design, non una nota legale (ADR-012). Riguarda i pixel dell'immagine, non la geometria del pezzo: una geometria generata da un assistente AI si dichiara nel testo della scheda, non nel badge (§6.16).

### 7.3 Foto
JPEG q82 al massimo 1800px, poi WebP; `object-fit: cover`, al vivo nella tile. Esposizione uniforme nel set; fondi neutri medi o scuri (banco, tappetino, muro grigio) o il pezzo montato e in uso; ombre nella stessa direzione dei render (in basso). Una foto chiara su fondo bianco accanto a un render su `--raised` spacca la griglia: le foto si **raggruppano** (prima i render, poi le foto, o righe omogenee), **mai a scacchiera**. Niente immagini generate; se un'immagine è ritoccata, badge e didascalia lo dicono. Nessun marchio, nessuna persona, nessun contesto identificabile (ADR-013): un marchio sostituito si dichiara in una nota sotto la galleria.

### 7.4 Colore dei pezzi: mai rosso-arancio
Il rosso è l'accento dell'interfaccia: un pezzo rosso, arancione o salmone dentro una tile si confonde con la CTA e rompe «un solo rosso pieno per schermata». Quindi:
- i render si catturano con **aspetto neutro** (grigio chiaro `#C9C5BC`, bianco caldo, nero satinato) **oppure** con il colore reale del pezzo stampato, purché fuori dalla famiglia rosso-arancio: **tonalità da 0° a 40° escluse**;
- colori buoni su scuro: bianco, grigio, nero, PETG trasparente, verde, blu, giallo, legno. I render del porta ciuccio sono grigio scuro: su `--raised` li stacca il filo chiaro di `--lift`, e vanno bene;
- il porta telecomandi oggi **non ha render validi**: quelli vecchi sono ritirati e vanno rifatti con il solo corpo del pezzo, fuori dal salmone di allora. Finché non ci sono, il progetto resta in bozza e nei mockup non compare come immagine;
- nessun dettaglio evidenziato in rosso dentro un render: il rosso non tocca mai un'immagine, né dentro né sul bordo.

### 7.5 Didascalie
Sempre **sotto** l'immagine, allineate al bordo sinistro, larghe al massimo `--measure`; mai sovrapposte, mai centrate, mai in corsivo. Formato `PREFISSO — frase.`: prefisso Mono 400 12 tracking .12em maiuscolo `--steel`, lineetta, frase 14 `--muted`, 10-25 parole. Due didascalie reali del porta ciuccio (dal suo `.md`):

```
RENDER — Di fronte, da chiuso: le scanalature di presa sul fianco del tappo e, sotto, la svasatura del corpo.
RENDER — Dall'alto: la sagoma del ciuccio in rilievo sul tappo, 42 x 54 mm e alta 1,2 mm.
```

La didascalia non sostituisce l'`alt`. Il porta ciuccio è uno studio di filettatura: didascalie, `alt` e ogni testo dei mockup descrivono forma, misure e filetto, e non affermano nulla su sicurezza, igiene o uso da parte di bambini.

---

## 8. Gerarchia — soglie numeriche

**Definizione di «rosso pieno».** Una superficie riempita di `--accent` o `--accent-deep` con il lato corto di almeno 8px e il lato lungo di almeno 40px: in pratica, la CTA primaria. **Non contano:** il cordolo e ogni linea di 3px o meno (trattino, filetto della nota, anello di focus); il monogramma (è la firma); l'alone del pannello contatto (è un'ombra, non un riempimento); i LED (mai rossi); i glifi (« ✓ », « + »); il testo in `--accent-text`; i bordi `--accent-line`; le tinte `--accent-soft`. Il rosso pieno esiste solo nei quattro usi decisi: CTA primaria, cordolo, alone del contatto, focus (più il monogramma). Il bordo 1px `--accent` del giro evidenziato è una linea sotto i 3px, non un rosso pieno.

| Regola | Soglia | Come si misura |
|---|---|---|
| **Oggetti nei primi dieci secondi** | a 1440: il render dell'hero è nel primo viewport, largo almeno il 45% del `.wrap`; la sezione Progetti comincia entro 2,5 viewport; il primo case con la sua tile (e il secondo, se esiste) visibile nei primi dieci secondi di scroll. A 375: render visibile entro 812px dall'alto, largo almeno l'80% della viewport | screenshot 1440×900 e 375×812 a passi di una viewport |
| **Pixel-immagine** | **≥55%** in home (solo con le tile dei case a piena altezza della card), nell'indice `/projects/` e nelle viste filtrate, nelle pagine progetto. Nello stato «pochi progetti» vale la regola sotto la tabella | altezza occupata da tile e visual ÷ altezza del `main` (nav e footer esclusi), a 1440 |
| **Testo senza immagini** | nella pagina progetto nessun blocco di più di 4 paragrafi senza un'immagine; il case study ha almeno 3 immagini | conteggio |
| **Rosso pieno** | **≤1 per viewport**, a 1440×900 e 375×812, in ogni posizione di scroll | a ogni passo si nomina l'oggetto, o «nessuno» |
| **Tocchi rossi non pieni** | ≤4 per viewport; un gruppo omogeneo (le spunte di «Cosa ricevi», i « + » del confronto) conta uno; i link nel testo corrente non contano | tinte, bordi, parole, glifi |
| **Pannelli che brillano** | 1 in tutto il sito: il contatto | — |
| **Pannelli telemetria** | ≤1 visibile per viewport | — |
| **Cifre grandi** | ≤4 per pagina, solo dati reali | — |
| **Evidenza per gruppo** | ≤1: un giro (GIRO 3/6), una step-card («Da una foto con un righello»), una colonna nel confronto, un filtro, il TRAGUARDO nella timeline | — |
| **Cordolo** | usi 1-3 di §3.A su ogni pagina con `section-head`; `/card/lorenzo` usi 1 e 4; 404 usi 1 e 2; nessun altro | — |
| **CTA piene** | ≤1 per schermata e per sezione; home: 2 in tutto (hero, contatto); pagina progetto: 1 (CTA band); `/preventivo`: 1, in fondo; `/card/lorenzo`: 1 | — |
| **Sezioni senza CTA piena** | Cosa ricevi, Il problema, Progetti, Da dove si parte, Manifesto, Metodo, Come prosegue, Per chi è, La domanda giusta, Print Lab | — |
| **Numerazione** | ≤1 sistema per componente | — |
| **Mono** | mai più di due righe consecutive di mono fuori dai pannelli telemetria | — |
| **LED** | mai rosso; sempre con etichetta; nella card compatta solo se lo stato non è «completato» | — |
| **Testo** | misura ≤680px; h1 della home: prima frase ≤8 parole, al massimo 3 righe a 375; h3 dei case 8-10 parole; paragrafo dei case 35-60 parole con un grassetto | conteggio |
| **Titoli** | un solo h1 per pagina; nessun numero dentro h1 e h2 (il `GIRO` dei case study è contenuto generato sopra l'h2) | — |

**Pochi progetti e pochi dati.** Con meno di quattro case in home, poche card nell'indice o una scheda con poche immagini, una soglia di immagine (pixel-immagine, testo senza immagini) può non essere raggiungibile con i contenuti veri. In quel caso si misura e si riporta il valore, e la si avvicina solo con i mezzi del sistema: la tile del case a piena altezza, le immagini che esistono distribuite nel corpo, meno testo attorno. Mai con immagini ripetute, ingrandite oltre il loro rapporto, generate o segnaposto, e mai aggiungendo card o case. Le soglie di rosso, cordolo, mono e numerazione valgono sempre, senza eccezioni.

**Cosa domina, pagina per pagina:** home → i case; indice → le tile; scheda e case study → l'immagine d'apertura, poi `ProjectSpecs`; `/preventivo` → la timeline; `/about` → il testo (l'unica pagina dove il testo può vincere, al massimo 250 parole); contatto → l'email; `/card/lorenzo` → «Salva il contatto».

---

## 9. Cosa NON fare

Elenco vincolante. Le voci 1-16 sono stilemi del sistema v1 (`global.css` di oggi) che non devono ricomparire in nessuna forma, nemmeno «più leggera».

**Del sistema attuale:**
1. Titan One, Archivo, qualunque font display: i titoli sono IBM Plex Sans 600/700.
2. Lettere multicolori (`h1.hero-title .c1`-`.c4`): i titoli sono bone e steel, e basta (le due sole eccezioni rosse sono in §9.23).
3. `-webkit-text-stroke`, `paint-order`, `text-shadow` (`.display`, `.contact .cta`).
4. Fondo a puntini sul `body` (`radial-gradient` 26px), `.hero::after` a strisce, `.dark` a righe: nessuna texture tranne la Tavola 01.
5. Bordi da 3px (`--edge`) su card, bottoni, badge, header: il bordo è 1px; 3px è solo l'altezza del cordolo.
6. Ombre offset piatte (`--pop` 4px 4px 0, `--pop-lg`) e gli hover che traslano con l'ombra più grande.
7. `transform: skew()` (`--skew` −12°, `.slab`, `.btn`, `.badge`, `.step-num`, `.section-head .titles`, `.gauge .bar`, `.hero-eyebrow`): l'unico skew è nel monogramma.
8. Cordoli come divisori (`.kerb` da 0.9rem con bordi, `.kerb.yellow`, `.kerb.slim`, `.panel-kerb`, `.figure::before`, `.contact::before`).
9. Header e footer verdi (`--green`), fondi colorati su nav e footer.
10. Pannelli carbonio (`.panel` a gradiente) con `.panel-tab` rossa inclinata e `.panel-title` corsivo maiuscolo.
11. Targhe ciano (`.section-num`, `.btn.accent`, `.contact` ciano, `.badge.cyan`) ed etichette su fondo pieno saturo (`.slab.red`, `.slab.yellow`).
12. Gauge e barre (`.gauges`, `.gauge .bar`), percentuali «eco», `.panel-foot b` verde, numero di posizione `.row .pos`, riga `.row.lead` rossa.
13. LED con alone (`box-shadow: 0 0 8px`) e LED rosso (`.st.hot`): il LED è piatto e il fallimento è ruggine.
14. Segnaposto (`.placeholder-card*`, «Foto del laboratorio — in arrivo», card «In coda», righe fantasma del registro).
15. `mark` giallo con bordo nel lead (`.hero-lead mark`); `.cap-eg-key` rosso a 10px (testo `#e5322e` sotto i 24px: 4.40:1).
16. Card che si sollevano e cambiano ombra in hover (`.process li:hover`, `.cap-grid li:hover`, `.pcard:hover` con ombra rossa): l'hover cambia bordo e colore, mai la posizione.

**In generale:**

17. JavaScript: hamburger, tab, deck, carosello, lightbox, evidenziazione della sezione allo scroll, barra di avanzamento, comparse allo scroll, dialog, «copia», tooltip, moduli, contatori, interruttore di tema.
18. Animazioni d'ingresso, parallasse, effetti legati allo scroll, LED che pulsano, parole che si accendono, `translateY` in hover.
19. **Testo sfumato** (`background-clip: text`) su qualunque titolo, h1 compreso.
20. Emoji e icone decorative (ammesse: le icone lineari steel di §5.6, le frecce, la spunta, il LED).
21. Maiuscolo sul testo corrente (il maiuscolo è del mono); corsivo (tranne i nomi di file).
22. Testo sopra le immagini (tranne il badge); overlay scuri per renderlo leggibile.
23. Rosso dentro un'immagine o sul suo bordo, in un LED, in un titolo (tranne l'h3 mono della colonna «sì» della Tavola 01 e il titolo-link della card compatta in hover, che è lo stato di un link), in un numero che non sia quello dell'elemento evidenziato del gruppo; testo in `--accent`.
24. Giallo, ciano, verde, blu come colori d'interfaccia: il verde e l'ambra esistono solo nei LED con etichetta.
25. Un secondo tema, fondi chiari, una sezione «bianca».
26. Gradienti di fondo oltre ai tre ammessi (hero `--pit` → `--bg`, Il problema `--pit` → `--surface`, cima tinta del pannello contatto); gradienti sui bottoni; vetro fuori dalla pillola della nav.
27. Card di misure diverse nella stessa griglia, masonry, proporzioni miste nella stessa vista.
28. Lessico racing fuori da PROGETTO/P, GIRO, SETTORE, TRAGUARDO; le parole **pit stop, pole, box, podio, gara, bandiera, item box, pista, griglia**; `LAP`, `SECTOR`, `PIT`, `GRID` (nel testo pubblicato e nei nomi dei file pubblici; gli identificatori del codice già esistenti sono esenti, §3.B); bandiera a scacchi, semaforo, casco, livrea.
29. Dati inventati o «di esempio» non marcati (`FIXTURE` nei mockup, «(esempio)» in questo brief); affermazioni su terzi non dichiarate pubblicamente da loro (ADR-011); testimonianze, loghi di clienti, «i miei clienti».
30. «In arrivo», «placeholder», nomi di prodotto finti (SinkFit, DeskDock, ProcessAid, Custom Lid); card, case o righe aggiunte per riempire una griglia o una sezione nello stato «pochi progetti» (§0.7).
31. Nomi di committenti, clienti o marchi reali, in qualunque testo, immagine o nome di file; un'etichetta, un tag o un badge «AI» per la geometria di un progetto (la si dichiara nel testo della scheda, §6.16).

---

## 10. Accessibilità e responsive

### 10.1 Contrasti (WCAG 1.4.3, 1.4.11)
Tabella in §4.3. Regole operative: ogni token di testo passa AA su tutte e sei le superfici. Il minimo su superficie opaca è `--faint` su `--raised`, 4.89:1: lì `--faint` non scende sotto i 13px. Il minimo del sistema è 4.71:1, `--faint` sul vetro della nav sopra una foto bianca: lì `--faint` si usa solo per la sottoriga del brand, a 14px, e mai più piccolo. Il rosso `#e5322e` non è mai testo e mai fondo di un testo, **nemmeno in hover**; unica eccezione, le lettere del monogramma (bone su `--accent`, 3.62:1): logotipo in tracciato, esente da 1.4.3, senza informazione propria (§3.D); la CTA è `--accent-deep` con testo bianco; i bordi `--line*` e `--accent-line` sono decorativi e ogni stato è anche testo, forma o bordo ≥3:1 (§4.2); l'anello di focus è ≥3:1 su ogni superficie; tutto ciò che sta sopra un'immagine (nav, badge) è calcolato sul caso peggiore, una foto bianca.

### 10.2 Il colore non è mai da solo (1.4.1)
LED sempre con etichetta; filtro attivo = sottolineatura + fondo + testo + `aria-current`; voce di nav corrente = sottolineatura + testo + `aria-current` (sotto 760px può essere fuori vista: §6.1); giro evidenziato = bordo `--accent` ≥3:1 + numero colorato (la step-card: etichetta `CONSIGLIATO`); scraps barrate = elemento `s` + prefisso nascosto; link nel testo sempre sottolineati; esiti della timeline con «Ricevi:» in grassetto.

### 10.3 Focus e tastiera (2.4.7, 2.4.11, 2.1.1)
L'anello globale di `base.css` vale per ogni elemento interattivo: voci nav, CTA, link, filtri, tile-link della galleria, `summary`, email, link del footer. `outline: none` non compare mai. Due eccezioni dichiarate: le voci della nav hanno l'anello interno (`.nav__list a:focus-visible{outline-offset:-2px}`: la lista a scorrimento ritaglierebbe quello esterno; 3.43:1 sul vetro, §6.1); il link dell'h3 della card compatta ha `outline-color:transparent` perché l'anello sta sulla tile, ed è l'unica eccezione all'anello sul link. Le due regole stanno insieme dentro `@supports selector(:has(a:focus-visible))`: senza `:has()` resta l'anello globale sul link (§6.8; in `forced-colors` l'anello trasparente torna visibile). In `:focus-visible` la voce della nav non prende il fondo di hover: `.nav__list a:focus-visible{background:transparent}` (sul fondo `--steel-soft` l'anello interno scenderebbe a 2.74). I contenitori a scorrimento di filtri e striscia della galleria hanno `padding:6px; margin:-6px; scroll-padding-inline:6px`, così l'anello esterno non viene ritagliato. Lo skip-link è il primo elemento del DOM. L'ordine del DOM è l'ordine di lettura; i soli riordini visivi (la tile del case sotto 860px, le due scraps sopra il testo da 960px) riguardano elementi senza figli focalizzabili. `scroll-padding-top` tiene i bersagli delle ancore sotto la nav.

### 10.4 Dimensioni e target (1.4.4, 1.4.12, 2.5.8)
Corpo 16px; note 13px; occhielli e chiavi Mono 12px; 10px solo per `.tag`, `.label` e badge, sempre maiuscoli con tracking .12em e mai unico veicolo di un'informazione indispensabile. Target di 44px per voci nav, bottoni, CTA della nav, filtri, link del footer, `summary`; `.link-arrow` in riga propria (almeno 24px, la soglia AA); i link in linea sono esenti. Nessuna altezza fissa su contenitori di testo (`min-height` ovunque): il sito regge la spaziatura del testo aumentata. Zoom al 400% / 320px CSS: nessuno scorrimento orizzontale della pagina (1.4.10).

### 10.5 375px (e 320px)
Colonna unica; gutter 24px (`--gutter`); **nessuno scorrimento orizzontale della pagina**: gli unici scorrimenti orizzontali sono deliberati, con `scroll-snap`, primo elemento visibile e taglio netto sul bordo: l'elemento tagliato a metà è il segnale; nessuna dissolvenza sopra il testo (voci della nav, filtri; nella striscia della galleria il segnale è la figura successiva che sporge, `flex-basis: min(85%,420px)`, senza `mask-image`). Nav a pillola a tutta larghezza con la CTA tinta sempre visibile; `--sect` e `--band` a 40px; h1 36px su al massimo 3 righe; h2 30px; tile da margine a margine (nella striscia della galleria all'85%, perché la successiva sporga: §6.19) e **mai rimpicciolite per far stare il testo**; case con la tile prima del testo; pannelli con `dt` sopra `dd`, niente sticky; BigNumbers 2×2; timeline con padding 32; foglio senza righello; scraps in pila; confronto e footer impilati; email a 20px; `.cta-row` a capo, primaria per prima; nessuna tabella scorre: si impila in coppie chiave/valore.

### 10.6 Movimento (2.3.3)
`prefers-reduced-motion: reduce` azzera transizioni e `scroll-behavior` (già in `base.css`). Non c'è altro da fermare: nel foglio non esiste un `@keyframes`, nulla si muove da solo.

### 10.7 Semantica e testo alternativo
`lang="it"`; landmark `header`, `nav`, `main`, `footer`, con `aria-label` sulle nav secondarie (filtri); un solo h1; occhielli come paragrafi, non heading; pannelli chiave/valore come `dl`; metodo, timeline e «Cosa mi serve» come liste ordinate; case come `article`; FAQ con `details`; LED e icone `aria-hidden` con il testo accanto; `alt` che comincia con il tipo d'immagine e descrive forma, materiale e contesto. Il `GIRO n/6` dei case study è contenuto generato: la maggior parte degli screen reader lo legge; se i test lo smentiscono, si scrive nel markup a build time (il design non cambia).

### 10.8 Modalità speciali
- **Solo tema scuro**: `color-scheme: dark` (in `base.css`), `theme-color` `#0c0f17`, nessun interruttore.
- `forced-colors: active`: il cordolo diventa un bordo 3px `CanvasText` (§3.A); i LED prendono `forced-color-adjust: none` e un anello interno 1px `CanvasText` (`box-shadow: inset`). Le regole del trattino sotto l'h2 e dei LED **non sono ancora in `base.css`**: vanno aggiunte lì (§3.A); oggi, in colori forzati, il `.led` perde il colore; le tile tengono il bordo; il pannello contatto perde l'alone ma non il bordo.
- `@supports not (backdrop-filter: blur(1px))`: il vetro della nav sale a .96.

### 10.9 Vincoli tecnici
Astro 5 statico su GitHub Pages; nessun framework UI, nessuna libreria CSS; CSS scritto a mano su custom properties (`global.css` è un indice di `@import` che Vite fonde in un solo foglio); font self-hosted via Fontsource, **nessuna richiesta a terzi**; **zero elementi `script` nel build**; media query mobile-first (`min-width`); il sito è completo con JS disattivato perché non ne ha; Lighthouse mobile ≥95.

Breakpoint (solo `min-width`): **480** (nome nel brand); **640** (Cosa ricevi a 2 colonne, filtri a capo); **720** (giri a 2); **760 = 47.5rem**, la soglia principale (`--sect` 40 → 96, `--band` 40 → 64, h2 30 → 36, Tavola, confronto e footer a più colonne, «Per chi è» nella nav, email a 24px); **768** (galleria a griglia); **860** (case 6fr/6fr); **960** (hero e pagina progetto a due colonne, specs sticky, scraps agli angoli in griglia, giri a 3, sottoriga del brand); **1200** (giri a 6).

---

## 11. Consegna attesa da Claude Design

Il bundle arriva in due invii, generato dal build: **v2.0** = questo brief (la prima card delle Pages), `colors/palette.html`, `colors/kerb-lines.html`, `type/typography.html`, `components/logo.html`; **v2.1** = tutti i componenti e le pagine reali. Claude Design non riscrive il sito: verifica, propone correzioni puntuali e restituisce, card per card:

1. **Palette:** ogni token di colore con esadecimale, uso in una riga e contrasto su `--bg` (§4.3); i tre rossi affiancati, con scritto quale va dove; i quattro LED con etichetta.
2. **Cordolo:** i tre usi (più `/card/lorenzo`, con i due fili ai margini della pagina e non del pannello) a 1440 e a 375, con il divieto stampato accanto («mai divisore», «mai cornice»).
3. **Tipografia:** la scala di §5.2 con i pesi reali; il titolo in due frasi per h1 (bone pieno) e h2; un titolo a una frase; occhiello con e senza trattino; pill, tag, badge; una cifra grande; una didascalia `RENDER —`.
4. **Monogramma:** §3.D a 96 / 64 / 40 / 28px, nel brand della nav, nel footer, nel biglietto e nell'angolo dell'immagine OG; la prova a 28px (banda a strisce contro banda piena); conferma «testo in tracciato, sotto 3 KB». Lorenzo approva o boccia qui.
5. **Componenti** (§6.1-6.18, più i pattern di §6.19 dentro le pagine): riposo, hover, `:focus-visible`, corrente o attivo dove esiste, `:active` sui bottoni, variante a 375px (la nav a 375px con la lista a inizio corsa, mai scorsa sulla voce corrente: §6.1), resa nello stato «pochi progetti» dove conta (case, griglia di card, filter-bar, pannelli con due righe). Dati sintetici solo con `FIXTURE`.
6. **Pagine:** `home-desktop` (1440) e `home-mobile` (375) con le sezioni di §11.1 che esistono nel build; `project-scheda` (il porta ciuccio); `projects-index` con le card che esistono, nessuna aggiunta; `preventivo`; `about`; `404`; `card`. La griglia dell'indice si verifica a 2, 3 e 4 card **togliendo** card reali, mai aggiungendone. `project-case-study` solo quando esiste un case study pubblicabile: oggi non ce n'è nessuno, e un case study non si disegna con dati inventati (la card del bundle viene saltata).
7. **Verifica allegata a ogni pagina, una riga:** % di pixel-immagine; rossi pieni per viewport con il nome dell'oggetto (a passi di una viewport, a 1440×900 e 375×812); tocchi rossi per viewport; usi del cordolo; cifre grandi; evidenze per gruppo; esito del test anti-fumetto (otto punti); target sotto 44px trovati; testo informativo sotto 12px fuori da tag e badge; parole vietate trovate. Una viewport con due rossi pieni è un difetto da correggere, non da annotare.
8. **Deviazioni:** per ogni scelta che si discosta da questo brief, una riga «cosa / perché»; se tocca un colore, con il contrasto ricalcolato. Una proposta che richiede JavaScript, un secondo colore, un bordo sopra 1px (cordolo escluso), uno skew fuori dal monogramma, un testo sfumato o un dato che non è nei file è **respinta per costruzione** e non va elencata.

### 11.1 Home — 12 sezioni, in quest'ordine (testi in `src/data/home.ts`)

I testi qui sotto sono quelli di `home.ts` al momento della stesura. Il file è la fonte: se una frase diverge, vale il file, e la card `home-desktop` del bundle lo mostra com'è.

| # | Sezione · ancora · fondo | Occhiello · titolo | Contenuto e azioni |
|---|---|---|---|
| 1 | Hero · `#top` · `--pit` → `--bg` | `PROGETTAZIONE 3D · SU MISURA · PICCOLE SERIE` · «Pezzi che non esistono in commercio. / Progettati in CAD sulle tue misure, stampati, provati.» | lead con un grassetto; CTA piena «Guarda i progetti →» + ghost «Raccontami il problema» con nota; 3 micro-prove («Progetto in Autodesk Fusion» · «Stampo su Bambu Lab X2D» · «Dal pezzo singolo alla piccola serie»); il render di copertina di un progetto pubblicato che sfuma, con la didascalia dai dati dell'immagine (§6.19; nei mockup il porta ciuccio) |
| 2 | Cosa ricevi · fascia `--surface` | `COSA RICEVI A FINE LAVORO` · frase «Cosa mi impegno a consegnarti.» (non un h2) | 5 voci con « ✓ »; nota |
| 3 | Il problema · `--pit` → `--surface`, centrata | `IL PROBLEMA` · «Il pezzo che ti serve non esiste. / E non hai un file da mandare a nessuno.» | lead, punch, 4 scraps (3 barrate con la confutazione, 1 dritta con `SI PARTE DA QUI`) |
| 4 | Progetti · `#progetti` · `--bg` | `PROGETTI · DALLA MISURA AL PEZZO` · «Ogni pezzo con la sua origine. / Originale, derivato o modello di terzi: è scritto sulla card.» | da 1 a 4 case (§6.9), uno per progetto in vetrina pubblicato con un'immagine valida: oggi, nel build di design, solo `PROGETTO 03` (porta ciuccio). Nessun case segnaposto; i testi non dicono quanti progetti ci sono. Chiusura (`closing`, con il link a /projects/) + ghost «Il tuo caso somiglia a uno di questi? Scrivimi →» |
| 5 | Da dove si parte · `--surface` | `DA DOVE SI PARTE` · «Parti da quello che hai. / Non serve un file 3D: serve una misura.» | 5 step-card, «Da una foto con un righello» `CONSIGLIATO`; nota |
| 6 | Manifesto · `--bg`, centrata | `DOVE FINISCE IL GIRO · LA FRASE CHE VOGLIO SENTIRTI DIRE` · citazione «Quel pezzo adesso esiste. E funziona.» | lead; ghost «Mandami una foto con un righello →» |
| 7 | Metodo · `#metodo` · `--surface` | `IL METODO · UN GIRO, SEMPRE LO STESSO` · «Sei tappe, sempre nello stesso ordine. / Il prototipo, solo quando serve.» | 6 card Giri `GIRO 1/6`-`6/6`, «Il progetto» evidenziato; chiusura |
| 8 | Come prosegue · `--bg` | `COME PROSEGUE` · «Dal primo messaggio al pezzo in mano. / Un settore alla volta, un esito per ciascuno.» | timeline `SETTORE 1`-`4` + `TRAGUARDO · CONSEGNA`, esiti «Ricevi: …»; nota sui tempi; ghost «Leggi come nasce il prezzo →» |
| 9 | Per chi è · `#perchi` · `--sheet` + griglia | chip `TAVOLA 01 · PER CHI È` · «Questo lavoro chiede una misura, non un file.» | due colonne da 4 voci; nota sulle categorie escluse |
| 10 | La domanda giusta · `--bg` | `LA DOMANDA GIUSTA` · «Perché non scaricare un modello gratis? / Dovresti, quando esiste.» | compare `RISOLVE A METÀ` / `FUNZIONA`; verdetto |
| 11 | Print Lab · fascia `--surface`, **solo se esiste almeno una voce `origin: terzi` pubblicata e non «in coda»** (oggi due, entrambe in bozza: la sezione non compare) | `PRINT LAB · MODELLI DI ALTRI` · «Non tutto quello che stampo è un mio progetto. / E lo scrivo accanto a ciascuno.» | lead; ghost «Vai al Print Lab →». Se tocca il Contatto, le due sezioni `--surface` condividono un solo filetto |
| 12 | Contatto · `#contatto` · `--surface` | `CONTATTO · NESSUN IMPEGNO` · «Raccontami il problema. / Una foto e qualche misura bastano per iniziare.» | il pannello che brilla (§6.18) |
| — | Footer · `--bg`, cordolo sopra | — | §6.2 |

### 11.2 Le altre pagine
- **Pagina progetto, `scheda`** (nel bundle: il porta ciuccio): «← Tutti i progetti» → occhiello `PROGETTO 03 · SU MISURA · 2026` → h1 in due frasi (`title` / `headline`) → lead (`summary`) → pill. Poi 7fr/5fr da 960px: galleria (§6.19) + `ProjectSpecs` sticky. Sotto: il corpo Markdown (`.prose`), il `PrintLog` se il progetto ha un registro, l'Attribution se l'origine non è originale (accanto alle immagini), la CTA band. Il porta ciuccio ha copertina e due immagini di galleria (tutte `RENDER`), un pannello a due righe e un registro di una riga: è la scheda nello stato «pochi dati», e si disegna così, senza riempire.
- **Pagina progetto, `case-study`**: come la scheda, con i sei `##` numerati `GIRO n/6`; dopo «Il test», `PrintLog` e `BigNumbers` (solo i numeri che esistono). Oggi nessun progetto è un case study pubblicabile: il modello resta questo, e la pagina si disegna quando ne esiste uno.
- **Indice `/projects/`** e viste `categoria/…`, `tag/…`: occhiello `TUTTI I PROGETTI` · «Tutto quello che ho pubblicato. / Originali, derivati e stampe da modelli di altri: dichiarati.» (non «Ogni pezzo, con il suo numero»: le voci senza `order`, come quelle del Print Lab, non hanno numero; e non ripete il titolo della sezione Progetti della home) → filter-bar con i conteggi veri (§6.17) → griglia di card compatte (§6.8), che regge con 2-4 card.
- **`/about`**: `CHI SONO` · «Progetto pezzi che non esistono. / Li stampo, li provo, li rifaccio.» Prima persona, al massimo 250 parole, categorie escluse dichiarate, pannello strumenti. Il verbo è «progetto», come nel copy della home: vale anche per i pezzi la cui geometria l'ha generata un assistente AI sulle misure di Lorenzo.
- **`/preventivo`**: `PREVENTIVO · GRATUITO, NON IMPEGNA` · «Il prezzo si calcola sul pezzo. / Non a occhio.» Timeline a 4 settori; «Cosa incide sul prezzo»; pannello «Esempio da un lavoro fatto» **solo se i dati esistono**; FAQ con `details` (al massimo 6 domande vere); riga sul recesso escluso per i beni su misura (art. 59 del Codice del Consumo); CTA piena «Chiedi un preventivo →».
- **404** e **`/card/lorenzo`**: §6.19.

Il repository resta l'unica fonte di verità: ciò che viene approvato torna in `tokens.css`, `base.css`, `components/*.css` e nei componenti Astro, e il bundle successivo lo mostrerà com'è, non com'era stato disegnato.

---

## Appendice A — Deviazioni dal piano e dal v1 (dichiarate)

| Cosa | Perché |
|---|---|
| h1 in `--text` pieno, **senza** il testo sfumato bianco→muted previsto dal piano | deciso in implementazione: il testo sfumato è un tic riconoscibile dei siti generati. Seconda riga in steel, come negli h2 |
| CTA «Scrivimi» della nav **tinta**, non piena | la nav è sempre visibile (senza JS non si nasconde): piena, starebbe accanto alla CTA dell'hero, due rossi pieni nel primo viewport |
| Vetro della nav a **.90**, non .72 | sopra un render o una foto chiara, a .72 le voci scendono a 3.25:1 e l'anello di focus a 1.79; a .90 il caso peggiore è 4.71 (faint) e 3.43 (anello) |
| Badge della tile su fondo **opaco** `--bg` | sul vetro semitrasparente scendeva sotto 3.3:1 sopra una foto chiara; opaco fa 7.98 ovunque |
| Hover della CTA primaria: il fondo resta `--accent-deep` | con `--accent` il bianco sopra fa 4.35:1, sotto AA. Corretto anche in `base.css` (Appendice B) |
| LED piatti, 7px, senza alone | l'alone era il LED da videogioco del sistema v1; 7px sta nel 6-8 dei token. Corretto in `base.css` |
| Nel case la tile precede il testo sotto 860px | nei primi secondi, su mobile, si vede l'oggetto e non 60 parole; la tile non ha elementi focalizzabili |
| Nel case la tile non ha didascalia | il titolo del case fa da didascalia; badge e `alt` dichiarano il tipo. Nelle gallerie la didascalia resta obbligatoria (v1 §5.5) |
| Scraps: da 960px ai quattro angoli in una griglia in flusso (due sopra e due sotto il testo), mai `position:absolute`; ruotano solo le tre barrate, fino a 2° | la rotazione diventa significato (disordine), non ornamento; la frase giusta è dritta. L'absolute fra 960 e ~1170px coprirebbe il testo o uscirebbe dalla pagina, e nessun CSS garantirebbe «mai sopra il testo» con zoom o spaziatura aumentata |
| Nodo `TRAGUARDO` pieno steel, occhiello in `--accent-text` | nessuna bandiera, nessun rosso pieno nella timeline |
| `GIRO n/6` senza « · » finale | sta in un blocco sopra l'h2: il separatore non separerebbe nulla (come in `base.css`) |
| `section-head` con margine 48 anche su mobile; bottoni a 44px e 14px | valori di `base.css`: più compatti di kwslabs (48px e 16px), coerenti con il tono da scheda tecnica |
| Email del contatto a 20px sotto 760px, 24 sopra | a corpo h3 (24px) su 375px non entra; `overflow-wrap:anywhere` come rete |
| Pulsante «copia indirizzo» sostituito da testo selezionabile + `mailto:` semplice | richiederebbe JS |
| Filtri nello stesso ordine in ogni vista; il filtro attivo lo dice una riga generata al build sopra la barra («Filtro attivo: Su misura — 2 progetti», esempio) | spostare il filtro corrente al primo posto cambierebbe l'ordine di un meccanismo di navigazione ripetuto su più pagine (WCAG 3.2.3); la riga lo rende leggibile a 375px senza script |
| Pixel-immagine ≥55% esteso all'indice e alle pagine progetto | il piano lo fissa per la home; indice e schede sono pagine di oggetti a maggior ragione |
| Sostituite le formule del piano «FUORI PISTA» (occhiello della 404, ora `ERRORE 404 · PAGINA NON TROVATA`) e «in ordine di griglia» (h1 dell'indice, ora «Tutto quello che ho pubblicato.») | fuori dal lessico racing chiuso (PROGETTO/P, GIRO, SETTORE, TRAGUARDO), che non si rinegozia; «fuori pista» su una pagina d'errore è la battuta da fumetto da escludere, e «griglia» porterebbe la metafora in un h1 |
| Nome della direzione senza la parola vietata del piano: «foglio tecnico» | la parola è nell'elenco dei divieti (§3.B) e orienterebbe il disegno verso l'immaginario che il brief esclude |
| h1 di `/about`: «Progetto pezzi che non esistono.» invece di «Disegno …» | stesso verbo del copy della home: resta vero anche per i pezzi la cui geometria l'ha generata un assistente AI sulle misure di Lorenzo (§0.8) |
| Stato «pochi progetti» (§0.7): da 1 a 4 case, griglie che reggono con 2-4 card, soglie d'immagine riportate e non forzate (§8) | il sito nuovo parte con pochi progetti pubblicati; il piano presupponeva quattro case e un indice pieno |

## Appendice B — Correzioni al codice fatte insieme a questo brief

`tokens.css`: un commento corretto, nessun valore: `--accent-text` è «SOLO testo rosso su scuro, a ogni corpo» (diceva «SOLO testo <24px», mentre il brief lo usa anche a 24px nell'email e a 36-48px nel manifesto). Un secondo commento corretto, nessun valore: `--accent` è «cordolo, bordi, anello di focus, alone, monogramma: mai fondo di un testo» (diceva «riempimenti UI», mentre l'unico riempimento rosso con testo è la CTA in `--accent-deep`, §3.D e §8). Un terzo commento corretto, nessun valore: la riga 2 del file dice «Token del design system v2 — «foglio tecnico».», senza la parola vietata che il nome della direzione aveva nel piano (la copia di §4.1 è identica). Tutti i valori passano i controlli di §4.3. `base.css`: tre difetti dimostrati in revisione, corretti perché brief e codice dicano la stessa cosa.
1. `.btn.primary:hover` portava il fondo a `--accent` (bianco sopra 4.35:1, sotto AA per un testo di 14px/600) ed ereditava il bordo steel del ghost. Ora il fondo resta `--accent-deep`, il bordo resta `--accent`, si accendono anello e alone (`0 0 0 1px var(--accent), 0 10px 28px -8px var(--accent-line)`); `box-shadow` entra nella transizione di `.btn`.
2. `.skip-link` era riempito di `--accent-deep`, che i token riservano alla CTA primaria. Ora è `--raised` con bordo `--bd-strong` e testo `--text`.
3. `.led.ok` e `.led.test` avevano un alone (`box-shadow: 0 0 8px -1px`): tolto. I LED sono piatti.

## Appendice C — Punti aperti per Lorenzo (non bloccano il disegno)
1. Lessico: le formule del piano «FUORI PISTA» e «in ordine di griglia» si ripristinano solo su richiesta esplicita di Lorenzo.
2. Monogramma: approvazione del ridisegno (banda gialla → banda-cordolo) e scelta della banda a 28px.
3. Porta telecomandi: render da rifare con il solo corpo del pezzo, fuori dal salmone; fino ad allora il progetto resta in bozza.
4. Render dell'hero: quale progetto pubblicato lo presta. Nei mockup, fino alla scelta, il porta ciuccio (l'unico render valido oggi).
5. Sesta voce di «Cosa ricevi» («Il file STEP o 3MF, se lo vuoi»).
6. Foto vere (un pezzo finito per l'hero, il banco, pezzi montati): fino ad allora, render.
