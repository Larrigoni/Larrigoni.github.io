# Pipeline progetti — cosa progettare nelle prossime settimane

Obiettivo: passare da 4 progetti pubblicabili a una vetrina piena, **senza** scivolare nel «guarda cosa so stampare».
Regola che governa tutta la lista: **ogni oggetto parte da un problema che una persona reale sa raccontare**. Se un prodotto
commerciale da 8 € lo risolve meglio, il progetto non entra (nella sezione «Scartate» c'è l'elenco di cosa ho buttato e perché).

Vincoli presi come dati: Bambu Lab X2D (PLA/PETG, multicolore), Fusion + script Python (API Fusion, come `build_panels.py`;
CadQuery per la geometria pura, come `maniglia3600.py`), filetti tarati, incastri, nesting.
Categorie escluse per decisione presa: sicurezza automotive, armi e parti, elettrico critico, infanzia presentata come sicura,
medicale, strutture portanti, alta temperatura, gas. Più: soppressori e repliche di marchi.

---

## 1. Idee di progetto (13)

### I1 — Targhette NFC parametriche per attrezzatura e inventario  ⟨SERIE⟩

> «Ho quindici attrezzi in officina e ogni volta che serve il manuale, la data dell'ultimo controllo o le istruzioni per
> il collega nuovo, nessuno sa dove guardare.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Ogni targhetta ha numero, nome e attacco diversi (fascetta, vite, magnete, adesivo). Le targhette NFC comprate sono adesivi piatti generici: non si agganciano a un utensile né sopravvivono all'olio. Qui il valore è la **sede annegata del tag** + l'attacco su misura. |
| Difficoltà CAD | Bassa. Sketch + Extrude, **Text** su sketch ed **Emboss**, tasca per tag NTAG215 Ø25 (sede Ø25,5, residuo ≤ 0,8 mm sopra il tag), Fillet, Rectangular Pattern, User Parameters. |
| Script Python | **Sì, il moltiplicatore più economico della lista.** Un file `build_tags.py` con una lista `(id, testo, tipo_attacco)` genera 20-40 STL in una passata. Stessa architettura di `build_panels.py`. |
| Tempo | Progettazione 3-5 h (script incluso). Stampa ~10-15 min a targhetta; un piatto nestato da 20 pezzi ≈ 3 h. Con cambio colore a pausa di layer invece dell'AMS si evita lo sfrido delle torri di spurgo. |
| Resa visiva | Render CAD per la sezione (si vede il tag annegato), ma il pezzo forte è la **foto in contesto**: 20 targhette numerate sul banco + una mano che avvicina il telefono. Materiale social già pronto. |
| Categoria sito | Smart Objects |
| Rischi | Non usare il logo N-Mark NFC (marchio, uso soggetto ad approvazione NFC Forum/EMVCo) né loghi di terzi. Le pagine di destinazione vanno ospitate dove sono già le `/card/...`: coerente col sito, zero costi. |

---

### I2 — Ricambi ricostruiti da rilievo  ⟨SERIE⟩

> «La manopola della lavatrice si è spaccata, il modello è fuori produzione da dieci anni e il centro assistenza mi dice
> di cambiare la macchina.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | È il caso in cui l'alternativa **non esiste a nessun prezzo**: pezzo fuori produzione o venduto solo dentro un gruppo da 120 €. Il valore è il rilievo con calibro sul pezzo rotto e la ricostruzione dell'innesto (albero a D, dentature, clip). Attenzione: per gli elettrodomestici più diffusi (es. ruote cestello lavastoviglie) i file sono già gratis e ottimi — vedi «Scartate». **Il progetto vive sui pezzi che nessuno ha già fatto**: infissi, tapparelle, mobili vecchi, elettrodomestici anni '90. |
| Difficoltà CAD | Media. Canvas con immagine calibrata sul calibro, Sketch quotato, Revolve, Extrude, Loft per le forme raccordate, Combine (cut/intersect) per l'innesto, Draft, Shell, Fillet, **Interference analysis** per verificare i giochi, Section Analysis per il confronto con l'originale. |
| Script Python | Parziale ma reale: la sotto-famiglia **«manopola su albero a D»** (Ø 4 / 4,5 / 5 / 6 mm × profondità × diametro corpo × zigrinatura) è generabile da script con 20+ varianti. Il resto sono pezzi one-off. |
| Tempo | 2-5 h a pezzo (il rilievo è metà del lavoro), + 1-2 iterazioni di prova sull'innesto. Stampa 20-90 min. |
| Resa visiva | **Foto in contesto obbligatoria**, e la foto migliore del portfolio: pezzo rotto accanto al pezzo nuovo, poi il nuovo montato e funzionante. Il render CAD da solo non dimostra niente qui. |
| Categoria sito | Custom Fit (famiglia «piccoli ricambi») |
| Rischi | Solo comandi, cover, manopole, distanziali, clip: **mai** componenti che portano corrente, mai parti a contatto con la fiamma o il vano forno (alta temperatura è categoria esclusa), mai parti di sicurezza. PETG e non PLA quando c'è calore moderato o carico ciclico. Nei titoli non scrivere «ricambio compatibile ‹marchio›»: scrivere «ricostruito sul pezzo originale del cliente» — descrittivo, non evocativo del marchio. |

---

### I3 — Custom Lid System: coperchi e tappi filettati su misura  ⟨SERIE⟩

> «Ho il barattolo giusto ma ho perso il coperchio, e nessun tappo del cassetto ci si avvita.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Un filetto va ricostruito su **quel** collo: diametro, passo, numero di principi, profilo, gioco. Non esiste un negozio dove porti il barattolo. È anche l'unico progetto della lista che mette in mostra una competenza rara e verificabile (il trapezoidale a 3 principi con giochi tarati è già stato fatto). |
| Difficoltà CAD | Alta, ed è un bene: è la voce che separa un portfolio da una raccolta di stampe. **Coil** per il filetto custom, **Thread** per gli ISO, Sweep su profilo, Revolve, Combine, Chamfer d'imbocco, Draft, Section Analysis, User Parameters su tutta la catena quotata. |
| Script Python | **Sì, il moltiplicatore più forte in assoluto.** Un generatore `(D, passo, principi, gioco, altezza, tipo di presa)` produce 15-25 coperchi diversi — barattoli, thermos, taniche, contenitori da dispensa — da un solo file. Ogni variante è una foto. Dentro ci sta anche un **kit di taratura del gioco** (serie passa/non passa da 0,15 a 0,45 mm): è il pezzo che dimostra il metodo. |
| Tempo | 6-10 h per generatore + taratura. Stampa 25-60 min a coperchio; un piatto nestato da 8-10 pezzi ≈ 5-6 h. |
| Resa visiva | Eccellente su entrambi i fronti: **render CAD in sezione** del filetto (immagine d'apertura perfetta) e **foto** della fila di coperchi in colori diversi avvitati sui rispettivi barattoli. |
| Categoria sito | Custom Fit |
| Rischi | **Contatto alimentare**: non dichiararlo food-safe. Le superfici FDM trattengono residui e non si sanificano; dichiararlo apertamente nella scheda è un punto di credibilità, non una debolezza. Uso per materiali secchi non alimentari, viteria, hobbistica. Niente contenitori in pressione o per prodotti chimici. |

---

### I4 — Go/No-Go e dime di controllo per piccola produzione

> «Devo controllare 200 pezzi uno per uno col calibro e ci perdo due ore; e se sbaglio la misura di 2 decimi me ne accorgo
> solo alla fine.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | I calibri passa/non passa in acciaio costano e servono su misura per **quella** quota. In plastica si stampano in mezz'ora, si sostituiscono quando si usurano e possono essere codificati a colore. È l'uso di tooling stampato più consolidato che esista nell'industria. |
| Difficoltà CAD | Media. Sketch quotato con tolleranze esplicite, Extrude, Combine, Pattern, testo inciso della quota nominale, Fillet, User Parameters (nominale ± tolleranza come parametri guida). |
| Script Python | **Sì.** Da una tabella `(nome_quota, nominale, tolleranza)` esce una serie completa di calibri già siglati e nestati sul piatto. |
| Tempo | 3-6 h il primo set, poi minuti per le varianti. Stampa 15-40 min a calibro. |
| Resa visiva | Media da render, **ottima in foto sul banco** con i pezzi da controllare. È l'immagine che parla a un cliente B2B, non a un privato. |
| Categoria sito | Process Tools |
| Rischi | Dichiarare il limite: la plastica si usura e dilata, il calibro va riverificato periodicamente su un campione metrologico. Mai presentarli come strumenti certificati. Nessun impiego in controlli di sicurezza. |

---

### I5 — Staffa/supporto a parete per un apparecchio senza staffa in catalogo

> «Il produttore vende l'apparecchio ma non un modo per appenderlo: resta appoggiato su uno scaffale con i cavi che tirano.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Le staffe universali esistono, ma o non prendono la sagoma o coprono le prese d'aria. Qui la geometria è copiata dall'oggetto reale. Costo di progetto basso, riconoscibilità alta: è la famiglia «accessori funzionali» del sito, spiegata con un pezzo solo. |
| Difficoltà CAD | Bassa-media. Sketch su piani multipli, Extrude, Rib per i rinforzi, Shell, Fillet, fori asolati per l'allineamento, Joint e **Contact Set** per verificare che l'oggetto ci entri davvero. |
| Script Python | No, o marginale (una variante per interassi di fissaggio diversi). Non è il suo punto di forza. |
| Tempo | 2-4 h. Stampa 1-2 h. |
| Resa visiva | Render CAD debole (è una staffa), **foto in contesto forte**: prima con i cavi sul mobile, dopo a muro con tutto in ordine. |
| Categoria sito | Custom Fit (accessori funzionali) |
| Rischi | Dichiarare il carico previsto e restare su oggetti leggeri. Niente sostegni sopra un posto dove qualcuno si siede o dorme, niente elementi che diventino parte di una struttura. Nessuna riproduzione di marchi sull'oggetto ospitato. |

---

### I6 — Adattatore di aspirazione su misura per un utensile specifico

> «L'aspiratore ha il tubo da 35, la troncatrice ha una bocchetta ovale e nessuno dei due parla con l'altro: lavoro nella polvere.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Attenzione: **come generatore parametrico generico è già risolto e gratis** (più generatori su MakerWorld, Printables e persino via browser). Rifarlo non fa portfolio. Fa portfolio la versione **misurata su una macchina reale**, con la bocchetta ovale che nessun generatore copre e la prova di tenuta documentata. |
| Difficoltà CAD | Bassa-media. Loft tra sezioni diverse (tonda → ovale), Sweep, Shell, Draft per l'imbocco a pressione, Fillet, Section Analysis. |
| Script Python | Sconsigliato: il generatore esiste già in cinque versioni. L'originalità qui è il caso specifico, non lo strumento. |
| Tempo | 2-3 h. Stampa 1-2 h (PETG, pareti 3). |
| Resa visiva | Render medio, **foto in officina molto buona** (polvere prima/dopo). |
| Categoria sito | Process Tools (famiglia «adattatori») |
| Rischi | Nessuno rilevante. Solo tenere il pezzo lontano da qualsiasi claim di filtrazione o sicurezza respiratoria. |

---

### I7 — Piedini, tappi e terminali per sezioni fuori standard  ⟨SERIE minore⟩

> «Il tavolo ha le gambe ovali inclinate, ha perso due puntali e ogni volta che lo sposto graffia il parquet.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | **Regola degli 8 euro applicata**: per tubolari tondi o quadri standard il feltro adesivo o il puntale da ferramenta a 3 € vince sempre — quei casi vanno scartati e va detto. Resta il caso reale: sezioni ovali, gambe inclinate (il tappo deve essere tagliato di sbieco), profili di arredi vecchi. Lì non esiste alternativa. |
| Difficoltà CAD | Bassa. Sketch della sezione rilevata, Extrude, Shell, Draft, taglio con piano inclinato, alette elastiche, Fillet. |
| Script Python | **Sì**: `(sezione, quote, angolo di taglio, altezza)` genera decine di varianti. Buon riempitivo di serie, valore per pezzo basso. |
| Tempo | 3-5 h con generatore. Stampa 8-15 min a pezzo. |
| Resa visiva | Bassa da solo. Regge solo come **famiglia fotografata insieme**, o come dettaglio dentro un altro case study. |
| Categoria sito | Custom Fit |
| Rischi | Niente: non è un elemento portante finché resta un terminale d'appoggio su mobili leggeri. Dichiararlo. |

---

### I8 — Targa/espositore NFC + QR da banco per un'attività

> «I clienti escono contenti e me lo dicono in faccia, ma online le recensioni non arrivano: nessuno si mette a cercare la pagina.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Prodotti simili esistono (Etsy, fornitori NFC). Il differenziale non è l'oggetto, è che **il pezzo è disegnato sul bancone del cliente**: inclinazione di lettura, base zavorrata, colori dell'insegna, testo in rilievo bicolore. Ed è il naturale seguito del biglietto NFC già in cantiere: stesso know-how (sede tag, pausa di stampa), oggetto più grande e più fotografabile. |
| Difficoltà CAD | Bassa-media. Extrude, Emboss del testo, tasca del tag, vano zavorra, Shell, Chamfer, Draft; piano di stampa scelto per avere il testo in superficie senza supporti. |
| Script Python | Sì, per generare la stessa targa con nomi e QR diversi (un'attività = una variante). Moltiplicatore medio: le varianti si somigliano troppo per contare come progetti distinti. |
| Tempo | 5-8 h il primo (grafica inclusa). Stampa 3-6 h la base. |
| Resa visiva | **Alta**: è l'oggetto più «da render» della lista, e regge anche la foto sul bancone. |
| Categoria sito | Smart Objects |
| Rischi | **Marchi**: le linee guida di Google vietano di usare i loro marchi e la loro veste grafica su prodotti di terzi; stessa cosa per le altre piattaforme di recensioni e per il logo N-Mark. La targa deve dire «Lascia una recensione» con grafica propria, mai imitare l'interfaccia altrui. Nessuna promessa sul risultato commerciale. |

---

### I9 — Famiglia di attacchi e adattatori filettati

> «Ho un supporto con l'attacco a vite di un tipo e un accessorio con l'attacco di un altro: due mondi che non si toccano.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Gli adattatori commerciali esistono per le combinazioni popolari (e lì si compra), non per le combinazioni rare o con offset e angoli particolari. Progetto utile perché **riusa la competenza sui filetti** già dimostrata e la mette in una famiglia ordinata: 1/4"-20, 3/8"-16, M-standard, ghiere di serraggio, snodi. |
| Difficoltà CAD | Media. Thread (ISO/UNC), Coil dove serve un profilo custom, Revolve, Combine, Chamfer d'imbocco, prove di gioco. |
| Script Python | **Sì**: matrice `(filetto A × filetto B × lunghezza × offset)`, decine di pezzi coerenti. |
| Tempo | 3-5 h. Stampa 15-30 min a pezzo. |
| Resa visiva | Media: render pulito di famiglia su griglia, gradevole ma freddo. Serve almeno una foto d'uso. |
| Categoria sito | Custom Fit (famiglia «adattatori») |
| Rischi | Un filetto stampato ha carico limitato: dichiararlo e non usarlo dove la caduta dell'oggetto è un problema serio (nessun sostegno sopra le persone). Nomi generici, non nomi di sistemi commerciali. |

---

### I10 — Sagome e maschere per lavorazione manuale

> «Taglio a mano lo stesso pezzo cento volte e la centounesima è ancora storta: il cartoncino che uso come sagoma si consuma.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | Sagome in plastica rigida con battuta, spessore per la guida del cutter, foro di appensione e sigla incisa: durano e sono ripetibili. Per pelletteria, cucito, legno, hobby. La sagoma è per definizione su misura del pezzo del cliente. |
| Difficoltà CAD | Media. Import/Insert SVG del profilo, Sketch, Extrude, offset per il gioco della lama, Emboss della sigla, Pattern, Fillet. |
| Script Python | **Sì**: dalla lista dei profili escono tutte le sagome della collezione già siglate e nestate. |
| Tempo | 3-6 h il set. Stampa 1-3 h il piatto. |
| Resa visiva | Buona in foto (materiale, pelle, legno, luce radente); scarsa in render. |
| Categoria sito | Process Tools |
| Rischi | Se il cliente porta un suo disegno, la **proprietà del profilo resta sua**: metterlo per iscritto e non pubblicarlo senza consenso. Niente sagome di prodotti protetti da marchio o design registrato. |

---

### I11 — Case/involucro con tre iterazioni documentate

> «Ho un dispositivo montato su una basetta e vive con lo scotch: non riesco a spiegare al cliente come sarà il prodotto finito.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | È l'**unico progetto della lista che copre la famiglia «prototipi»**, e la copre solo se si pubblicano le tre versioni una accanto all'altra con scritto cosa non andava. Il valore per il portfolio non è il pezzo: è la prova del metodo (i sei passaggi dichiarati in home). |
| Difficoltà CAD | Alta come tempo, media come funzioni. Sketch multipli, Shell, Rib, incastri a scatto (snap-fit) con Draft controllato, colonnine per viti, alloggiamenti connettori, Joint, Contact Set, Section Analysis, Interference. |
| Script Python | Poco utile: qui conta l'iterazione, non la variante. |
| Tempo | 8-14 h su 3 giri. Stampa 2-4 h a giro. |
| Resa visiva | **Alta**: le tre versioni in fila, con i segni di matita sopra, sono la foto migliore che un portfolio di progettazione possa avere. |
| Categoria sito | Custom Fit (famiglia «prototipi») |
| Rischi | Solo elettronica a bassissima tensione alimentata da USB, e senza alcun claim su sicurezza elettrica, dissipazione o resistenza al fuoco. Nessuna riproduzione di prodotti esistenti. |

---

### I12 — Inserto sagomato per valigetta o cassetto di mestiere

> «Apro la valigetta e gli strumenti sono tutti rovesciati; la spugna è tagliata male e non so mai se manca un pezzo.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | I **divisori a griglia parametrici sono già risolti e gratis** (molti generatori su MakerWorld e Printables): non vanno rifatti. Quello che non è risolto è l'inserto **sagomato sugli oggetti veri**, con l'impronta di ogni utensile e il colpo d'occhio che dice subito cosa manca (logica poka-yoke, non estetica). |
| Difficoltà CAD | Media, ma **lunga**: il costo è il rilievo di 10-20 sagome. Sketch da foto calibrate, Extrude, Combine, Loft per gli scassi, Shell, Fillet, split in più pezzi per il piatto, incastri tra i moduli. |
| Script Python | Parziale: utile per lo split e il nesting automatico; le sagome restano lavoro manuale. |
| Tempo | 6-12 h. Stampa 5-10 h (volume grande: PLA, riempimento basso, pareti sottili). |
| Resa visiva | **Altissima in foto** (valigetta aperta, tutto al suo posto), nulla in render. |
| Categoria sito | Custom Fit (famiglia «organizer») |
| Rischi | Nessuno tecnico. Il rischio è di **sforzo**: è il progetto che può mangiare due settimane e produrre una sola immagine. Farlo dopo, e solo con una valigetta reale in mano. |

---

### I13 — Dima di foratura per un caso fuori standard

> «Devo forare trenta ante già montate mantenendo tutte le maniglie alla stessa altezza, e l'interasse non è uno di quelli standard.»

| Voce | Contenuto |
|---|---|
| Perché stampa 3D | **Regola degli 8 euro, quasi violata**: le dime commerciali per maniglie coprono già gli interassi 32-320 mm a 19-48 €, e sono in metallo. Una dima stampata generica è inutile e va scartata. Resta valido solo il caso fuori catalogo: interassi non standard, maniglie a barra lunga, ante già montate dove serve una battuta particolare, o una dima monouso per un cantiere specifico. |
| Difficoltà CAD | Media. Sketch quotato, Extrude, boccole metalliche inserite a caldo (la plastica nuda si allarga col trapano — punto tecnico da raccontare), Pattern, battute ortogonali, Fillet. |
| Script Python | Sì per la serie di interassi, ma il valore marginale è basso proprio perché il mercato è coperto. |
| Tempo | 4-8 h. Stampa 2-5 h (pezzo grande). |
| Resa visiva | Bassa in render, media in foto. |
| Categoria sito | Process Tools |
| Rischi | Precisione: dichiarare che la dima va verificata sul primo foro di prova. Nessun uso su elementi strutturali. |

---

## 2. Classifica per rapporto valore/sforzo

Valore = quanto porta al portfolio (immagini, famiglie coperte, competenza dimostrata, credibilità B2B).
Sforzo = ore di progettazione, iterazioni, dipendenza da oggetti o clienti esterni. Scala 1-5.

| # | Progetto | Cat. sito | Valore | Sforzo | V/S | Serie? |
|---|---|---|---|---|---|---|
| 1 | **I1 — Targhette NFC parametriche** | Smart Objects | 4 | 1,5 | **2,67** | ✅ |
| 2 | **I2 — Ricambi ricostruiti da rilievo** | Custom Fit | 5 | 2 | **2,50** | ✅ |
| 3 | **I3 — Custom Lid System (coperchi filettati)** | Custom Fit | 5 | 2,5 | **2,00** | ✅ |
| 4 | I4 — Go/No-Go e dime di controllo | Process Tools | 4 | 2 | 2,00 | ✅ minore |
| 5 | I5 — Staffa a parete su misura | Custom Fit | 3 | 1,5 | 2,00 | — |
| 6 | I6 — Adattatore aspirazione su misura | Process Tools | 3 | 1,5 | 2,00 | — |
| 7 | I7 — Piedini e tappi fuori standard | Custom Fit | 2,5 | 1,5 | 1,67 | ✅ minore |
| 8 | I8 — Targa NFC + QR da banco | Smart Objects | 4 | 2,5 | 1,60 | — |
| 9 | I9 — Attacchi filettati | Custom Fit | 3 | 2 | 1,50 | ✅ minore |
| 10 | I10 — Sagome per lavorazione manuale | Process Tools | 3 | 2,5 | 1,20 | ✅ minore |
| 11 | I11 — Case con 3 iterazioni | Custom Fit | 4,5 | 4 | 1,13 | — |
| 12 | I13 — Dima fuori standard | Process Tools | 3 | 3 | 1,00 | — |
| 13 | I12 — Inserto sagomato valigetta | Custom Fit | 4 | 4 | 1,00 | — |

### Le prime tre: perché si fanno subito

**1. I1 — Targhette NFC parametriche.** Costa pochissimo e restituisce moltissimo. Riusa tre cose che esistono già:
lo script generatore (stessa struttura di `build_panels.py`), la competenza sulla sede del tag del biglietto NFC in cantiere
e le pagine `/card/...` già online come destinazione della scansione. In una sessione di lavoro si ottengono 20-40 pezzi
diversi, quindi immagini, e si chiude da sola la famiglia «oggetti intelligenti», oggi coperta solo da un progetto ancora
da sviluppare. È anche l'unico progetto che **dimostra il sito dentro l'oggetto**: si tocca la targhetta e si apre il portfolio.

**2. I2 — Ricambi ricostruiti da rilievo.** È il progetto che racconta meglio il posizionamento «problem solver»: nessun
prodotto commerciale, nessuna alternativa, un pezzo rotto e uno nuovo che funziona. È la storia che si condivide da sola e
la richiesta che porta clienti veri. Sforzo basso per pezzo (2-5 h), zero investimento, e l'archivio di casa ne contiene già
di sicuro tre o quattro casi. Vincolo: bisogna avere pezzi rotti in mano, quindi va aperta subito la raccolta (amici,
famiglia, gruppi di quartiere) perché maturi mentre si fanno gli altri progetti.

**3. I3 — Custom Lid System.** È il progetto più «difficile» delle prime tre, ed è il motivo per cui va fatto ora e non dopo:
è l'unico che dimostra una competenza che gli altri non hanno (filetti custom con giochi tarati), e contemporaneamente è il
generatore che produce più varianti pubblicabili per ora di lavoro. Un solo script vale 15-25 pezzi fotografabili. In più
è già in roadmap come milestone 8: farlo ora allinea sito e produzione. Il kit passa/non passa sul gioco del filetto è il
dettaglio che, da solo, sposta la percezione da «stampa in 3D» a «progetta in 3D».

**Dopo queste tre, in ordine:** I4 (apre il canale B2B, che è dove ci sono i soldi) e I5 o I6 (due ore l'uno, coprono due
famiglie del sito rimaste vuote).

---

## 3. Copertura delle otto famiglie del sito

Stato dopo le **prime cinque** (I1, I2, I3, I4 + I5):

| Famiglia «Cosa posso risolvere» | Coperta? | Da cosa |
|---|---|---|
| Oggetti personalizzati | ✅ | I1 (targhette siglate), I3 (coperchi con nome) |
| Prototipi | ❌ | **nessuno** |
| Accessori funzionali | ✅ | I5 (staffa), scolatoio già online |
| Piccoli ricambi | ✅ | I2 |
| Organizer | ⚠️ parziale | porta telecomandi in archivio, se viene pubblicato; nessun progetto nuovo |
| Supporti | ⚠️ parziale | I5 copre il supporto a parete, non il sostegno da banco o da terra |
| Adattatori | ❌ | **nessuno** |
| Oggetti intelligenti (NFC) | ✅ | I1, più il biglietto NFC quando sarà finito |

### Cosa serve per chiudere i buchi

| Buco | Rimedio più economico | Costo |
|---|---|---|
| **Prototipi** | I11 (case con 3 iterazioni). Non ci sono scorciatoie: è l'unica idea della lista che dimostra iterazione, ed è per questo che vale la pena nonostante il V/S basso. In alternativa, molto più a buon mercato: pubblicare le **iterazioni già esistenti** di un progetto d'archivio (le 32 varianti della maniglia frigo e le 4 del porta telecomandi sono iterazioni documentate a costo zero). | 0 h se si recupera l'archivio, 8-14 h se si progetta ex novo |
| **Adattatori** | I6 (2-3 h) oppure I9 (3-5 h). I6 è più veloce e più fotogenico in contesto; I9 produce più pezzi. Farne uno dei due basta. | 2-5 h |
| **Organizer** | Pubblicare il porta telecomandi (già fatto, 4 varianti: è già un case study, manca solo la pagina). Se serve un progetto nuovo, I12 — ma è caro. | ~0 h di progettazione |
| **Supporti** | Un sostegno da banco: il più economico è derivarlo da I5 come seconda variante (stesso case study, due contesti). | +1-2 h |

**Conclusione sulla copertura:** dopo le prime cinque bastano **due progetti brevi** (un adattatore + una variante da banco) e
**due pubblicazioni dall'archivio** (porta telecomandi, varianti maniglia) per avere tutte e otto le famiglie con almeno un
esempio reale. La cosa più veloce che si possa fare per la copertura non è progettare: è **pubblicare quello che esiste già**.

---

## 4. Le serie: dove sta la vera leva

Il problema dichiarato è «pochi esempi». Una serie parametrica lo risolve più in fretta di qualunque pezzo singolo, perché
il costo è quasi tutto nel primo esemplare e ogni variante successiva è quasi gratis.

### Serie A — Custom Lid System (I3) · **la più forte**
- **Principio unico:** ricostruire un filetto esistente e generare il coperchio che ci si avvita.
- **Varianti realistiche:** 15-25 (barattoli dispensa, thermos, taniche, contenitori tecnici, tappi ciechi, tappi con foro,
  tappi con presa zigrinata, versione a baionetta).
- **Cosa la rende una serie e non 20 pezzi uguali:** ogni coperchio ha un collo diverso e una presa diversa; la variabile
  interessante (il gioco) è visibile e misurabile, quindi ogni variante ha qualcosa da dire.
- **Sottoprodotto:** il kit di taratura passa/non passa, pubblicabile come mini-progetto a sé.

### Serie B — Targhette NFC parametriche (I1) · **la più veloce**
- **Principio unico:** un tag annegato + un attacco che cambia secondo l'oggetto.
- **Varianti realistiche:** 20-40 in un pomeriggio (per attrezzi, per chiavi, per scaffali di magazzino, per piante,
  per cavi e alimentatori, per attrezzatura a noleggio con data di controllo).
- **Perché conta:** è l'unica serie che crea **traffico verso il sito** invece di limitarsi a popolarlo.

### Serie C — Ricambi ricostruiti da rilievo (I2) · **la più credibile**
- **Principio unico:** dal pezzo rotto al pezzo nuovo, sempre lo stesso metodo, sempre lo stesso format di pubblicazione
  (foto del rotto, rilievo quotato, render, foto del montato).
- **Varianti realistiche:** quante ne arrivano — e la sotto-serie parametrica «manopola su albero a D» ne genera 20 da sola.
- **Attenzione:** non è una serie *parametrica*, è una serie *editoriale*. Il valore sta nella ripetizione del format, che
  dopo cinque pezzi diventa riconoscibile e fa sembrare il portfolio molto più grande di quanto sia.

**Serie minori** (riempitivo, da usare solo se serve volume): I7 piedini e tappi, I9 attacchi filettati, I4 set di calibri.

---

## 5. Scartate: cose che sembrano buone idee e non lo sono

| Idea | Perché no |
|---|---|
| Generatore parametrico di adattatori per aspiratore | Già risolto e gratis almeno cinque volte (MakerWorld, Printables, generatori web che producono l'STL nel browser). Rifarlo è lavoro invisibile. Vale solo il caso singolo misurato → I6. |
| Generatore di divisori per cassetto | Idem: molti generatori gratuiti e curati su MakerWorld e Printables. L'unica versione difendibile è l'inserto sagomato sugli oggetti reali → I12. |
| Bin Gridfinity generici | Ecosistema enorme e maturo; un bin in più non dimostra progettazione, dimostra di saper scaricare uno standard. (Nota licenza: Gridfinity è MIT, quindi l'uso commerciale è possibile, ma in giro c'è molta confusione con CC BY-NC-SA — verificare prima di vendere qualsiasi derivato.) Usabile come *contenitore* di un progetto vero, mai come progetto. |
| Ruote cestello lavastoviglie, ricambi di elettrodomestici molto diffusi | Tra i pezzi più stampati al mondo: i file esistono già per i modelli comuni. Il valore di I2 sta nei pezzi che **nessuno** ha fatto. |
| Dima per maniglie con interassi standard | Regola degli 8 euro: dime commerciali in metallo da ~19 € (fino a 40-48 € per le professionali) coprono già 32-320 mm. Progettarla è tempo buttato salvo il caso fuori standard → I13. |
| Piedini e puntali tondi standard | Ferramenta, 3 €, meglio del pezzo stampato. Solo le sezioni fuori standard hanno senso → I7. |
| Cable management da scrivania, porta-cuffie, pegboard, French cleat | Saturi, gratuiti, e soprattutto **non raccontano un problema**: sono oggetti da «guarda cosa so stampare», esattamente il posizionamento da evitare. |
| Stampi per alimenti, cioccolato, ghiaccio; contenitori food-safe | Contatto alimentare su superfici FDM: non dichiarabile sicuro. Fuori. |
| Qualsiasi pezzo in area esclusa | Sicurezza automotive, armi e componenti, elettrico critico, infanzia presentata come sicura, medicale, strutture portanti, alte temperature, gas, soppressori, repliche di marchi. Non si valuta caso per caso: si scarta e basta. |

---

## 6. Regole trasversali di pubblicazione

- **Il titolo dice il problema, non l'oggetto.** «La manopola che non si trova più» batte «Manopola parametrica in PETG».
- **Mai «compatibile ‹marchio›» nei titoli.** Descrivere il pezzo, non evocare il produttore. Nessun logo altrui stampato o
  renderizzato, incluso il logo NFC (marchio, uso soggetto ad approvazione).
- **Dichiarare sempre i limiti** del pezzo (carico, temperatura, contatto alimentare, usura). È quello che distingue un
  progettista da un hobbista, e costa due righe.
- **Ogni case study vuole almeno una foto in contesto.** Il render CAD apre, la foto convince. I progetti a resa visiva bassa
  (I4, I6, I7, I13) non vanno pubblicati senza foto d'uso.
- **Se un progetto nasce da un disegno del cliente**, la proprietà del profilo resta sua: consenso scritto prima di pubblicare.

---

## Fonti consultate

- [50 Useful 3D Prints That Make Life Easier at Home in 2026 — ka3dp](https://www.ka3dp.com/useful-3d-prints-for-your-home/)
- [3D Printed Household Models — MakerWorld](https://makerworld.com/en/3d-models/400-household)
- [Custom Vacuum Hose Adapter Generator, Parametric — MakerWorld](https://makerworld.com/en/models/2991696-custom-vacuum-hose-adapter-generator-parametric)
- [Shopvac Hose Adapter Generator [Parametric] — Printables](https://www.printables.com/model/322217-shopvac-hose-adapter-generator-parametric)
- [Free Vacuum Hose Adapter STL Generator](https://stlhoseadapter.org/)
- [Parametric drawer divider — MakerWorld](https://makerworld.com/en/models/1107949-parametric-drawer-divider)
- [Parametric drawer divider creator — Printables](https://www.printables.com/model/1580299-parametric-drawer-divider-creator)
- [Gridfinity — wiki non ufficiale](https://gridfinity.xyz/)
- [Gridfinity: dibattito su licenza e uso commerciale — BigGo News](https://biggo.com/news/202506301312_Gridfinity_Storage_System_Debate)
- [Google Brand Resource Center — regole sui marchi](https://www.google.com/permissions/trademark/rules/)
- [NFC Logos — Seritag](https://seritag.com/learn/using-nfc/nfc-logos)
- [Replacing Machined Jigs and Fixtures With 3D Printed Parts — Formlabs](https://formlabs.com/blog/replacing-machined-jigs-fixtures-3d-printed-parts/)
- [3D Printed Jigs and Fixtures: How to Design Reliable Workshop Aids — Sovol](https://www.sovol3d.com/blogs/news/3d-printed-jigs-and-fixtures-how-to-design-reliable-workshop-aids)
- [Go and No-Go Gauge: types, advantages, limitations — SMLease](https://www.smlease.com/entries/manufacturing/go-no-go-gauge/)
- [Il ragazzo che stampa in 3D pezzi introvabili o fuori produzione — ArezzoNotizie](https://www.arezzonotizie.it/speciale/post-coronavirus/economia/stampa-3d-ricambi-auto-moto-fuori-produzione.html)
- [Stampa 3D ricambi introvabili — 3DUP](https://3dup.it/servizi/stampa-3d-ricambi-introvabili)
- [Dima foratura maniglie Gedotec — Amazon.it](https://www.amazon.it/DIMA-FORATURA-MOBILI-CUCINA-BOTTONI/dp/B075LFWWBW)
- [Kreg Cabinet Hardware Jig — ePRICE](https://www.eprice.it/KREG-Cabinet-Hardware-Jig-Dima-Di-Foratura-Per-Maniglie-Per-Mobili-Khi-pull-Per-La-Costruzione-Di-Mobili-E-Porte-Di-Mobili-647096807351/d-62518680)
- [Quanto costa la stampa 3D conto terzi in Italia — Vitamina3D](https://vitamina3d.it/blog/quanto-costa-stampa-3d-conto-terzi/)
