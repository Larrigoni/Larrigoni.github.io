# Brief marketing — portfolio Lorenzo Arrigoni

Documento operativo. Serve a decidere **cosa scrivere, dove metterlo e cosa non dire** su https://larrigoni.github.io.
Ogni testo fra virgolette in blocco è pronto da incollare. Le fonti sono in fondo, numerate `[F1]…[F14]`.

**Regole che valgono su tutto il documento**

| Vincolo | Traduzione operativa |
|---|---|
| Niente affermazioni su terzi | Di un cliente/azienda si può scrivere solo ciò che quel soggetto dichiara pubblicamente di sé. Nel dubbio: non nominarlo. |
| Niente dati inventati | Nessun numero di clienti, fatturato, tempo di consegna, percentuale o «tempo medio di risposta» che non sia stato misurato. Se non è misurato, si toglie la cifra e resta la frase. |
| Categorie escluse | Sicurezza automotive, armi funzionanti, elettrico critico, articoli per l'infanzia venduti come sicuri, medicale, strutturale portante, alte temperature, gas. Queste esclusioni vanno **dichiarate sul sito**: sono un segnale di competenza, non una limitazione. |
| Una sola voce | Sempre prima persona singolare. Mai «noi», «il nostro team», «l'azienda». |

---

## 1. Posizionamento

### 1.1 Dove sta il mercato

Lo spazio italiano è polarizzato e il centro è vuoto:

| Fascia | Chi c'è | Come si presenta | Perché non ci si compete |
|---|---|---|---|
| Service industriale | Xometry, WASP, service conto terzi | Dichiarano certificazioni (Xometry dichiara ISO 9001:2015 sul proprio sito), parco macchine multi-tecnologia, preventivo online automatico `[F1][F2]` | Capacità produttiva e certificazioni non sono replicabili part-time |
| Stampa «di quartiere» | Annunci su marketplace e gruppi | «Stampo qualsiasi cosa, mandami l'STL» | Competizione a prezzo, nessun margine, nessuna difendibilità |
| **Vuoto centrale** | — | — | **Qui va il posizionamento** |

Il vuoto centrale è: **il pezzo non esiste ancora e non c'è un file da mandare**. Chi ha un file STL pronto va da un service. Chi ha un problema e una misura non sa a chi rivolgersi. Questo è il cliente.

### 1.2 Frase di posizionamento

> **Progetto e realizzo pezzi che non esistono in commercio. Disegno in CAD partendo dalle misure reali, stampo, provo e correggo. Lavoro su commissione per privati e piccole aziende.**

Da usare come base per: sottotitolo hero, `<meta name="description">`, bio social, firma email, presentazione a voce.

Verifica con il **test dell'opposto** di Nielsen: riscrivi la frase al contrario e chiediti se un concorrente la direbbe mai `[F3]`. «Non parto dalle misure reali, non provo il pezzo» → nessuno lo direbbe: la frase sta dicendo qualcosa. Applicato al titolo attuale «Oggetti che risolvono problemi» → «Oggetti che non risolvono problemi» → nessuno lo direbbe: **il titolo attuale non dice niente di distintivo** (vedi §5).

### 1.3 Parole che costruiscono credibilità / parole che la bruciano

| Usa | Perché funziona | Evita | Perché brucia |
|---|---|---|---|
| «disegnato in CAD sulle quote rilevate» | Descrive un'attività verificabile | «stampo qualsiasi cosa» | Sposta il valore sulla macchina, non su di te |
| «5 taglie, prodotte in serie» | Numero vero e verificabile | «grandi quantità», «produzione industriale» | Non è vero e si vede |
| «prima versione fallita: il pezzo si è deformato in ritiro» | Dimostra metodo e onestà | «qualità professionale garantita» | Claim non verificabile, standard in ogni annuncio |
| «PETG perché resiste all'acqua e alla torsione» | Scelta motivata = progettazione | «materiali di alta qualità» | Vuoto |
| «non faccio parti strutturali portanti né componenti di sicurezza» | Chi esclude sa cosa sta facendo | «soluzioni a 360°», «nessun limite» | Segnale netto di hobbismo |
| «filetto trapezoidale a 3 principi» | Lessico tecnico corretto e specifico | «tecnologie all'avanguardia» | Gergo commerciale |
| «Bambu Lab X2D · Autodesk Fusion» | Strumenti dichiarati, contesto reale | «stampante 3D di ultima generazione» | Il cliente non compra la stampante |
| «Ti rispondo con qualche domanda, poi una stima» | Processo concreto | «risposta in 24h» | Promessa non misurata |
| «riparare invece di sostituire» | Descrive una scelta | «ecologico», «biodegradabile» | Il PLA è compostabile in impianto industriale, non in casa `[F13]`: il claim generico è greenwashing |

**Regola trasversale:** la credibilità nasce dal **livello di dettaglio**, non dagli aggettivi. Un grammo di materiale dichiarato vale più di tre superlativi.

### 1.4 Le tre parole del posizionamento

`Progettazione` → il valore è nel disegno, non nella stampa.
`Su misura` → il pezzo nasce da quote reali, non da un catalogo.
`Piccole serie` → sai passare da 1 pezzo a 5 taglie ripetibili (lo hai fatto davvero).

Queste tre devono comparire **sopra la piega**. «Stampa 3D» resta nel testo (serve per essere trovati) ma non fa da titolo.

---

## 2. Struttura della home

### 2.1 Quanto si vede senza scorrere

Dato: nella ricerca NN/g del 2018 gli utenti hanno speso circa il **57% del tempo di visione sopra la piega** e il **74% nei primi due schermi** `[F4]`.
Conseguenza operativa, non negoziabile:

- **1° schermo:** eyebrow + titolo + sottotitolo + 1 CTA primaria + 1 secondaria + **una foto reale di un pezzo finito**.
- **2° schermo:** i progetti. Non il metodo, non il manifesto, non l'ecologia.
- Se il visitatore deve scorrere tre volte per vedere un oggetto fatto da te, il portfolio non sta facendo il suo lavoro.

Benchmark di settore (fonte commerciale, valore indicativo): headline di 6-12 parole, e sulle pagine migliori **una sola CTA primaria** sopra la piega senza azioni concorrenti `[F5]`. Tradotto: la seconda CTA deve essere visivamente secondaria (ghost/outline), non un secondo pulsante pieno.

### 2.2 Sequenza raccomandata

| # | Sezione | Perché in questa posizione | Azione sul sito attuale |
|---|---|---|---|
| 1 | **Hero** — chi sei, cosa fai, per chi + 2 CTA + foto reale | Risponde a «è per me?» nei primi secondi `[F3]` | Riscrivere il copy (§5), aggiungere un'immagine vera |
| 2 | **Progetti** (3-4 card, la prima grande) | La prova viene prima della promessa. Oggi sono in terza posizione, dopo due sezioni di solo testo | **Spostare `#progetti` subito dopo l'hero** |
| 3 | **Cosa posso risolvere** (le 8 famiglie) | Auto-selezione: il visitatore si riconosce e capisce se il suo caso rientra | Tenere, ma ridurre a 6 voci e accorciare gli esempi |
| 4 | **Come lavoro** (metodo) | Ha senso *dopo* che hai dimostrato di saperlo fare: diventa spiegazione, non promessa | Comprimere da 6 a 4 passi, o tenerne 6 ma in riga singola |
| 5 | **Cosa non faccio / vincoli** | Delimita il campo e alza la credibilità nel momento in cui il visitatore sta valutando | **Nuova sezione**, oggi assente |
| 6 | **Come nasce un preventivo** | Toglie l'ansia del prezzo appena prima della richiesta di contatto | Tenere in questa posizione, sistemare l'esempio (§7) |
| 7 | **Contatto** | Chiusura, con tutto il necessario per scrivere bene la prima email | Potenziare (§6) |
| 8 | **Print Lab** (o pagina separata) | Le stampe da modelli altrui non devono competere visivamente con i progetti originali | Spostare in fondo o in `/print-lab` |
| — | **Impronta / sostenibilità** | Non è un motivo d'acquisto: è un contorno. Va accorpata a §5 come due righe, non come sezione numerata | Declassare |

### 2.3 Navigazione

Voci: `Progetti · Metodo · Preventivo · Contatti`. Massimo quattro. Ogni voce di menu che punta a una sezione di solo testo è una voce da togliere.

---

## 3. Gerarchia dei contenuti

### 3.1 Rapporto mostrare / spiegare

- **Home:** ~70% immagini e dati, ~30% testo.
- **Pagina progetto:** un'immagine ogni 100-150 parole. Il lettore deve capire il progetto **guardando solo foto e didascalie** `[F6]`.
- Il metodo non si spiega: si dimostra dentro i progetti («seconda stampa fallita, ecco perché»). La sezione metodo è un riassunto, non il contenuto principale.

### 3.2 Quante parole

| Elemento | Parole | Nota |
|---|---|---|
| Titolo hero (H1) | 3-8 | Benchmark di settore: 6-12 parole per headline `[F5]` |
| Sottotitolo hero | 20-35 | Deve contenere «progetto», «su misura», «privati e piccole aziende» |
| Titolo card progetto | 3-7 | Descrittivo, non evocativo: «Scolatoio da lavello», non «Flow» `[F6]` |
| Testo card progetto | 25-40 | Una frase sul problema + 2-3 dati |
| Pagina progetto | 400-800 | Riferimento condiviso: una case study si legge in ≤3 minuti `[F6]`; 800-1500 parole è già il limite alto `[F7]` |
| Didascalia immagine | 10-25 | Deve reggere da sola, senza il testo attorno |
| Testo introduttivo di sezione home | 40-80 | |

### 3.3 Card vs pagina

| Nella card (deve far cliccare) | Nella pagina (deve convincere) |
|---|---|
| Foto del pezzo finito, reale | Sequenza: problema → vincoli → soluzione → prove → esito |
| Titolo descrittivo | Le misure e i vincoli di partenza |
| Il problema in una frase | Le iterazioni, **compresi i fallimenti**, con la causa |
| 2-3 dati (materiale, pezzi, stato) | Scheda tecnica: materiale, peso, tempo, macchina, parametri |
| Etichetta di stato | Foto di dettaglio con didascalia |
| — | Cosa faresti diversamente la prossima volta |
| — | CTA finale: «Hai un caso simile? Scrivimi» |

**Struttura fissa della pagina progetto** (sempre la stessa, in quest'ordine): Titolo → Problema → Vincoli → Progetto → Prototipo e fallimenti → Esito → Dati tecnici → CTA. Ordine coerente con la regola «problema ed esito prima del processo» `[F8]`.

---

## 4. Prove di credibilità senza recensioni

Non servono testimonianze: servono **fatti verificabili e dettagli che un hobbista non avrebbe**. Chi assume o compra da un freelance senza referenze cerca prova di processo, chiarezza su cosa fai e cosa non fai, e coerenza `[F9]`.

### 4.1 I segnali che hai già, e come si scrivono

| Segnale | Materiale reale | Formulazione pronta | Trappola da evitare |
|---|---|---|---|
| **Fallimenti documentati** | Scolatoio: 3 stampe, 2 fallite | «La prima versione ha ceduto sul bordo: il fissaggio scaricava tutto il peso su 4 mm di parete. Nella seconda ho allargato l'appoggio.» | Non basta dire «ho sbagliato»: serve **la causa e la correzione** |
| **Dati di stampa reali** | Grammi, tempo, materiale, parametri | `PETG · 2 pezzi · ugello 0,4 · layer 0,2 · 124 g` | Solo valori letti dallo slicer o dalla bilancia. Mai stimati |
| **Vincoli dichiarati** | Le categorie escluse | «Non progetto parti strutturali portanti, componenti di sicurezza, oggetti a contatto con alte temperature o gas, né articoli per l'infanzia.» | Non presentarlo come scusa: è una scelta professionale |
| **Competenza tecnica specifica** | Porta ciuccio, filetto trapezoidale a 3 principi | «Filetto trapezoidale a 3 principi: chiude in un terzo di giro e non si sfila con la mano bagnata.» | Lessico corretto o niente |
| **Ripetibilità** | Porta telecomandi, 4 varianti | «Stesso progetto, 4 varianti su misura per stanze diverse: cambiano le quote, non il disegno.» | Non spacciare 4 varianti per 4 progetti |
| **Tracciabilità delle fonti** | Print Lab | Ogni stampa da modello altrui: **autore + link alla fonte + licenza** | Verifica la licenza: una `NonCommercial` non copre un lavoro retribuito `[F10]` |
| **Identità verificabile** | Nome, email, sito, vCard | Nome e cognome ovunque, un solo indirizzo email | Nessun nome di fantasia, nessuna finta ragione sociale |
| **Continuità** | Data di aggiornamento del registro | Data vera dell'ultima modifica | Una data generata automaticamente che cambia ogni build è un finto aggiornamento: usa la data dell'ultimo progetto pubblicato |

### 4.2 Perché i fallimenti funzionano (e quanti metterne)

Lo studio *When Blemishing Leads to Blossoming* (Ein-Gar, Shiv, Tormala, *Journal of Consumer Research* 2012) mostra che **una piccola dose di informazione negativa, inserita dopo quella positiva, aumenta la disposizione favorevole** verso il prodotto `[F11]`. Vincoli: l'informazione negativa deve essere **minore** e arrivare **dopo** il positivo.

Traduzione operativa:
- **1-2 fallimenti per case study**, non di più, e mai nella card di anteprima.
- Sempre in questa sequenza: cosa funziona → cosa è andato storto → come l'ho corretto.
- Mai un fallimento senza correzione: quello è solo un difetto.
- Mai fallimenti che tocchino la sicurezza («si è rotto mentre lo usava il cliente» non si pubblica: apre un problema diverso).

### 4.3 Come non gonfiare

- Il **registro progetti** oggi mescola 2 progetti reali e 4 «in coda». Chi legge vede 6 righe e conta 6 lavori. Soluzione: due blocchi separati e dichiarati — `Fatti` e `In programma` — oppure togliere gli «in coda» finché non esistono.
- Niente loghi cliente, niente «hanno scelto di lavorare con me», niente stelline.
- Niente parole al plurale che implicano volume: «i clienti», «i progetti B2B», «le commesse».
- Se un dato non c'è, si toglie la riga. Non si scrive «n.d.», non si mette un placeholder in pagina (§7).

---

## 5. Copy dell'hero — 3 alternative

### 5.1 Diagnosi dell'hero attuale

| Elemento | Giudizio |
|---|---|
| H1 «Oggetti che risolvono problemi» | Vero ma non distintivo: non dice cosa fai (progettazione), come (CAD + stampa), per chi. Non supera il test dell'opposto `[F3]`. Non contiene nessun termine con cui qualcuno ti cercherebbe |
| Lead «Non parto da "cosa posso stampare", ma da "quale problema posso risolvere"…» | **È il testo migliore del sito.** Ma è un manifesto di metodo, non un posizionamento: risponde a «come lavori», non a «cosa compro» |
| CTA «Guarda i progetti →» + «Raccontami il problema» | Coppia corretta. Problema: sono due pulsanti pieni e concorrenti `[F5]` |

**Raccomandazione:** tenere il lead attuale ma **spostarlo** all'inizio della sezione Metodo, dove è perfetto. L'hero deve dire cosa fai.

### 5.2 Alternativa A — Problema + categoria *(consigliata)*

> **Eyebrow:** Progettazione 3D · Prototipazione · Pezzi su misura
> **H1:** Pezzi che non esistono, disegnati sulle tue misure
> **Sottotitolo:** Progetto in CAD e stampo in 3D oggetti su misura per privati e piccole aziende: ricambi non critici, supporti, organizer, prototipi. Ogni pezzo nasce da misure reali, non da un catalogo.
> **CTA primaria:** Guarda i progetti →
> **CTA secondaria (ghost):** Raccontami il problema

**Perché:** unisce il gancio («non esistono» = il motivo per cui qualcuno cerca proprio te) e la categoria («progetto in CAD e stampo in 3D»). Contiene tutti i termini di ricerca utili. Dichiara il destinatario. Mantiene la continuità con il tono attuale.
**Rischio:** «pezzi» è generico da solo — regge solo perché il sottotitolo elenca subito quattro esempi concreti.

### 5.3 Alternativa B — Categoria pura, massima chiarezza

> **Eyebrow:** Lorenzo Arrigoni · Italia
> **H1:** Progettazione 3D e pezzi su misura
> **Sottotitolo:** Disegno in CAD, stampo, provo e correggo finché il pezzo funziona. Lavoro su commissione per privati e piccole aziende: un pezzo introvabile, un supporto che non esiste, una piccola serie.
> **CTA primaria:** Guarda i progetti →
> **CTA secondaria (ghost):** Scrivimi

**Perché:** zero ambiguità, zero attrito cognitivo, ottima per chi arriva da una ricerca o da un biglietto NFC. È la versione che regge meglio il test dei 5 secondi `[F3]`.
**Rischio:** piatta. Non differenzia dal service generico: tutto il lavoro di differenziazione si scarica sul sottotitolo e sui progetti subito sotto. Da scegliere solo se sopra la piega c'è già una foto forte.

### 5.4 Alternativa C — Prova in evidenza

> **Eyebrow:** Progettazione 3D · Prototipazione · Su misura
> **H1:** Dal problema al pezzo finito
> **Sottotitolo:** Ricambi non più in produzione, supporti che nessuno mette in catalogo, piccole serie ripetibili. Li disegno sulle quote reali, li stampo, li provo — e quando cedono li rifaccio.
> **CTA primaria:** Vedi com'è fatto un progetto →  *(porta al case study, non alla griglia)*
> **CTA secondaria (ghost):** Raccontami il problema

**Perché:** la CTA primaria porta dritto alla prova più forte invece che a una griglia. Il finale «quando cedono li rifaccio» è il blemishing effect già dentro l'hero `[F11]`.
**Rischio:** «Dal problema al pezzo finito» è una formula già molto usata; funziona solo se il case study collegato è completo. Non usarla finché la pagina di destinazione non ha foto vere e dati veri.

### 5.5 Regole comuni alle tre

- Una sola CTA piena. La seconda in outline `[F5]`.
- Il testo del pulsante dice cosa succede dopo il clic, non «Scopri di più».
- Nel primo schermo deve esserci **una foto vera di un pezzo finito**, non un render, non un'illustrazione, non un placeholder.
- Riusare l'H1 scelto come `<title>` e `<meta description>` (con la frase di §1.2).

---

## 6. Call to action e conversione

### 6.1 Obiettivo unico

**Ricevere un'email che contenga abbastanza informazioni per rispondere con una domanda intelligente.** Tutto il resto (follow, salvataggio del contatto, lettura del case study) è secondario.

### 6.2 Dove e quante volte chiedere

Da 3 a 4 richieste per pagina, sempre diverse per intensità:

| Posizione | Microcopy pronto | Tipo |
|---|---|---|
| Hero | `Raccontami il problema` | Secondaria (ghost) |
| Fine sezione Progetti | `Il tuo caso somiglia a uno di questi? Scrivimi →` | Testo + link |
| Fine pagina progetto | `Hai un problema simile? Mandami una foto e due misure →` | Pulsante |
| Fine sezione Preventivo | `Chiedi un preventivo — è gratuito e non impegna →` | Pulsante primario |
| Blocco Contatto finale | `Scrivimi →` + indirizzo in chiaro + elenco di cosa serve | Blocco completo |
| Footer | Indirizzo email in chiaro, sempre | Persistente |

### 6.3 Abbassare l'attrito quando il canale è una sola email

Il `mailto:` è il percorso di contatto con meno attrito in assoluto: nessun campo, nessun captcha, nessun caricamento. Il prezzo è che ricevi messaggi non strutturati (e l'indirizzo finisce in chiaro nell'HTML) `[F12]`. Con un sito statico su GitHub Pages e un'attività part-time, **il mailto è la scelta giusta**: va solo attrezzato.

**1. Mailto precompilato** — sostituisce il form senza introdurre un form. Link pronto:

```
mailto:lore.larrigoni@gmail.com?subject=Richiesta%20progetto&body=Cosa%20deve%20fare%20il%20pezzo%3A%0A%0ADove%20va%20montato%20o%20con%20cosa%20deve%20combaciare%3A%0A%0AMisure%2C%20oppure%20una%20foto%20con%20un%20righello%20accanto%3A%0A%0AQuanti%20pezzi%3A%0A%0AEntro%20quando%3A%0A
```

**2. Dire cosa serve, prima del pulsante** (testo pronto per il blocco contatto):

> **Cosa mi serve per risponderti**
> 1. Cosa deve fare il pezzo, in due righe.
> 2. Dove va montato o con cosa deve combaciare.
> 3. Una foto con un righello o una moneta accanto, per la scala. Le misure precise arrivano dopo.
> 4. Quanti pezzi ti servono.
>
> Non serve un file 3D. Se ce l'hai (STL, STEP, 3MF) allegalo pure, ma non è il punto di partenza.

**3. Dire cosa succede dopo** — senza promettere tempi che nessuno ha misurato:

> **Come prosegue.** Ti rispondo con qualche domanda per capire i vincoli. Se il pezzo si può fare, ricevi un preventivo in PDF con le voci separate. Poi decidi.

**4. Pulsante «copia indirizzo»** accanto al mailto: chi usa webmail da desktop spesso non ha un client associato e il `mailto:` non apre niente. Due opzioni affiancate = zero vicoli ciechi.

**5. Il biglietto NFC** (`/card/lorenzo`) è già il percorso a minor attrito nel mondo fisico: sulla card l'azione primaria deve essere `Salva il contatto` e la secondaria `Scrivimi`.

**6. Se in futuro vuoi campi strutturati:** un form di terze parti (Formspree, Netlify Forms, Google Form) resta compatibile con un sito statico, ma **aggiunge attrito e obblighi**: serve un'informativa privacy ai sensi dell'art. 13 GDPR e un link alla pagina. Non farlo finché il volume di email non diventa un problema reale.

### 6.4 Micro-decisioni che spostano la conversione

- **Un solo indirizzo email su tutto il sito** (`lore.larrigoni@gmail.com`). Due indirizzi = dubbio.
- Nessuna promessa di tempi finché non hai dati tuoi. «Ti rispondo appena posso» è meglio di un «24h» falso.
- Nella sezione preventivo, mantenere **«gratuito e non impegna»**: è la leva che abbassa la soglia d'ingresso.
- Se il lavoro è su misura, dichiaralo anche nei termini: per i beni confezionati su misura o chiaramente personalizzati il diritto di recesso è escluso (art. 59 Codice del Consumo), ma **l'esclusione va comunicata prima dell'ordine** `[F14]`. Una riga nella sezione preventivo, non una pagina legale.

---

## 7. Errori da evitare

| # | Anti-pattern | Come si manifesta qui | Correzione |
|---|---|---|---|
| 1 | **Il metodo prima delle prove** | Due sezioni di solo testo (Metodo, Problemi) prima di vedere un oggetto | Progetti in seconda posizione |
| 2 | **Placeholder pubblicati** | «Foto del laboratorio — in arrivo», «Print Lab · in arrivo», card «In coda» | Una sezione non pronta non si pubblica. Un sito con tre «in arrivo» sembra abbandonato |
| 3 | **Portfolio gonfiato** | Registro con 4 progetti mai iniziati accanto a 2 reali | Separare `Fatti` / `In programma`, o togliere |
| 4 | **Dati d'esempio scambiati per veri** | Esempio preventivo: `PETG 124 g · 4:10 h · inserti M4 ×6` | Sostituire con i dati **reali** di un lavoro già fatto (anonimizzato). Se restano di esempio, l'etichetta «Dati di esempio» deve essere grande quanto i numeri |
| 5 | **Troppi progetti, tutti uguali** | — | 3-4 progetti in home, uno solo in evidenza grande `[F8]` |
| 6 | **Foto senza contesto** | Render CAD al posto delle foto; oggetti su sfondo neutro | Almeno una foto del pezzo **montato e in uso**, per progetto |
| 7 | **Immagini generate o ritoccate con AI non dichiarate** | Case study scolatoio: immagini con Content Credentials C2PA | In un sito che vende affidabilità tecnica, una foto non autentica scoperta cancella tutto il resto. Rifare gli scatti o dichiarare in didascalia |
| 8 | **Claim ambientali generici** | Sezione «Impronta» | Descrivere pratiche («stampo solo su richiesta», «PLA da fonti rinnovabili»), mai proprietà del prodotto («ecologico», «biodegradabile») `[F13]` |
| 9 | **Gergo e superlativi** | — | Ogni aggettivo senza un numero o un fatto dietro si taglia |
| 11 | **Chiedere troppo al primo contatto** | «Invio del modello» come passo 01 del preventivo | Passo 01 = «una foto e due misure». Il file 3D è un'opzione, non un requisito |
| 12 | **Navigazione lunga** | 5 ancore a sezioni di testo | 4 voci massimo |
| 13 | **Nominare terzi senza autorizzazione scritta** | Già successo: marchio ritirato e immagini da rifare | Pubblica solo ciò che sopravvive a un cliente che cambia idea: niente marchi, niente elementi identificabili |
| 14 | **Due CTA piene che competono** | Hero attuale | Una primaria, una ghost `[F5]` |

---

## 8. Come parlare di un lavoro su commissione

Si racconta il problema di produzione, non il soggetto né il committente: niente nomi,
niente marchi, niente elementi che lo rendano riconoscibile. Un lavoro su commissione va
online solo con il permesso del committente e con la licenza del modello di partenza
verificata (ADR-020). Il dettaglio dei casi concreti sta nelle note private.

## 9. Ordine di esecuzione

| Priorità | Intervento | Sforzo | Effetto |
|---|---|---|---|
| 1 | Riscrivere l'hero (alternativa A) e rendere la seconda CTA ghost | Basso | Alto |
| 2 | Spostare i progetti subito sotto l'hero | Basso | Alto |
| 3 | Togliere tutti i placeholder «in arrivo» dalla home | Basso | Alto |
| 4 | Separare nel registro i progetti fatti da quelli in programma | Basso | Alto |
| 5 | Potenziare il blocco contatto: mailto precompilato + «cosa mi serve» + «come prosegue» | Basso | Alto |
| 6 | Aggiungere la sezione «Cosa non faccio» | Basso | Medio |
| 7 | Foto vere: pezzo finito nell'hero, pezzi montati e in uso nelle card | Medio | Alto |
| 9 | Pagine per porta telecomandi (4 varianti) e porta ciuccio (filetto a 3 principi) | Medio | Medio |
| 10 | Print Lab con autore, fonte e licenza; spostato in fondo o in pagina separata | Medio | Medio |
| 11 | Sostituire i dati d'esempio del preventivo con dati reali anonimizzati | Basso | Medio |

---

## Fonti

| # | Fonte | URL | Natura |
|---|---|---|---|
| F1 | Xometry Europe — servizio di stampa 3D (certificazione dichiarata dall'azienda) | https://xometry.eu/it/stampa-3d/ | Sito aziendale |
| F2 | WASP — service di stampa 3D | https://www.3dwasp.com/service-stampa-3d/ | Sito aziendale |
| F3 | Jakob Nielsen, *Tagline Blues: What's the Site About?* — NN/g | https://www.nngroup.com/articles/tagline-blues-whats-the-site-about/ | Ricerca UX |
| F4 | NN/g, *Scrolling and Attention* (57% del tempo sopra la piega, 74% nei primi due schermi — studio 2018) | https://www.nngroup.com/articles/scrolling-and-attention/ | Ricerca con eye-tracking |
| F5 | *Hero Section Statistics* — roast.page (headline 6-12 parole; CTA primaria unica sopra la piega) | https://roast.page/stats/hero-section-statistics | Benchmark commerciale, **non peer-reviewed**: usare come indicazione, non come prova |
| F6 | Semplice, *How to write case studies for your portfolio* (≤3 minuti di lettura, struttura in 6 blocchi) | https://www.semplice.com/how-to-write-case-studies-for-your-portfolio | Guida di settore |
| F7 | uxfol.io, *UX Case Study Template & Structure* (800-1500 parole) | https://blog.uxfol.io/ux-case-study-template/ | Guida di settore |
| F8 | Webflow Blog, *Portfolio website examples + best practices* (3-6 progetti, problema ed esito prima del processo) | https://webflow.com/blog/design-portfolio-examples | Guida di settore |
| F9 | The Mighty Marketer / Bidsketch — costruire credibilità da freelance senza referenze | https://themightymarketer.com/how-freelancers-build-client-trust/ · https://www.bidsketch.com/blog/everything-else/build-credibility/ | Guida di settore |
| F10 | Creative Commons FAQ — attribuzione obbligatoria, clausola NonCommercial, opere derivate | https://creativecommons.org/faq/ | Fonte primaria |
| F10ter | Meta — politica pubblicitaria su armi ed esplosivi (sintesi) | https://www.adamigo.ai/blog/meta-ads-policy-faq-weapons-explosives | Sintesi di terzi: verificare sul centro assistenza Meta prima di investirci |
| F11 | Ein-Gar, Shiv, Tormala, *When Blemishing Leads to Blossoming: The Positive Effect of Negative Information*, Journal of Consumer Research 38(5), 2012 | https://academic.oup.com/jcr/article-abstract/38/5/846/1796852 | Ricerca peer-reviewed |
| F12 | Confronto mailto vs form di contatto (attrito, spam, campi) | https://wpforms.com/contact-form-vs-email-address-which-is-better/ | Guida di settore. **Le percentuali di conversione citate da queste fonti non sono verificabili: usare solo l'argomento strutturale** |
| F13 | European Bioplastics — compostaggio domestico e compostaggio industriale | https://www.european-bioplastics.org/bioplastics-in-home-composting/ | Associazione di settore |
| F14 | Art. 59 Codice del Consumo — eccezioni al diritto di recesso, beni su misura o chiaramente personalizzati | https://www.brocardi.it/codice-del-consumo/parte-iii/titolo-iii/capo-i/sezione-ii/art59.html | Testo di legge commentato. Per decisioni contrattuali, verificare con un professionista |
