// Copy della home: output del Workflow B (home-copy-it), sintesi di tre bozze
// (ingegnere alla pari / brief-first / voce racing) giudicate per sezione su tre lenti:
// onestà (ADR-011), tono kwslabs, conversione. Struttura: piano v2 §3.1.
// Regola dei fatti (ADR-011): solo ciò che Lorenzo ha fatto o osservato, o ciò che un terzo dichiara
// di sé. Il resto è scritto come impegno («mi impegno», «quando serve»), non come resoconto.
//
// Convenzioni per i componenti:
//  - **doppio asterisco** = grassetto (uno per paragrafo). Nel titolo del manifesto marca le
//    parole da rendere in --accent-text, non in grassetto (piano §3.1, riga 6).
//  - Item.strong + Item.text: nelle liste il componente li separa con « – » (trattino di casa,
//    l'unico ammesso; le stringhe non ne contengono). Se lo strong finisce con un segno di
//    punteggiatura («Misura.») basta uno spazio. Nelle card (partenza) lo strong è il titolo e il text è il corpo;
//    nella timeline (prosegue) il tag porta settore e nome, il text è il corpo e l'outcome l'esito.
//  - Item.tag: etichetta mono (Giro n/6, Settore n · …, Consigliato, Si parte da qui).
//    Occhielli e tag si scrivono normali: il maiuscolo lo fa il CSS (brief §5.4).
//  - Item.outcome: nei scraps del problema è la confutazione della frase barrata; nella
//    timeline è l'esito del settore («Ricevi: …»).
//  - pills in «domanda»: i due tag delle colonne, nell'ordine headA / headB (FUNZIONA in rosso).
//  - closing di «progetti» contiene il percorso /projects/: il componente lo rende come link.
//
// Numeri pubblicati, tutti ammessi: 6 tappe (GIRO n/6), Bambu Lab X2D. Lessico racing solo negli occhielli:
// PROGETTO, GIRO, SETTORE, TRAGUARDO (TAVOLA è lessico da disegno tecnico).
// «Progetto» e «parto dalle tue misure», mai «disegno io»: il copy vale anche quando la geometria
// l'ha generata un assistente AI sulle misure di Lorenzo (lo dichiara la scheda, taxonomy.ts).
// La home non dice quanti progetti ci sono né cosa raccontano le schede: deve reggere con due.

export interface Cta { label: string; href: string; note?: string }
export interface Item { strong?: string; text: string; tag?: string; struck?: boolean; outcome?: string }
export interface Title { claim: string; soft?: string }
export interface Section {
  id: 'hero' | 'ricevi' | 'problema' | 'progetti' | 'partenza' | 'manifesto' | 'metodo' | 'prosegue' | 'perchi' | 'domanda' | 'printlab' | 'contatto'
  eyebrow: string
  title: Title
  lead?: string
  punch?: string
  items?: Item[]
  itemsB?: Item[]            // seconda colonna (perchi: «non sono la persona giusta se»; domanda: «un pezzo su misura»)
  headA?: string; headB?: string
  pills?: string[]
  cta?: { primary?: Cta; ghost?: Cta }
  note?: string
  closing?: string
  verdict?: string
}
export interface HomeContent {
  meta: { title: string; description: string }
  nav: { items: { label: string; href: string }[]; cta: Cta }
  sections: Section[]        // esattamente 12, nell'ordine del piano
  footer: { tagline: string; links: { label: string; href: string }[]; email: string; github: string }
}

const EMAIL = 'lore.larrigoni@gmail.com'

// Mailto precompilato del brief marketing §6.3: sostituisce il modulo senza introdurne uno.
const MAILTO =
  'mailto:' + EMAIL +
  '?subject=Richiesta%20progetto' +
  '&body=Cosa%20deve%20fare%20il%20pezzo%3A%0A%0A' +
  'Dove%20va%20montato%20o%20con%20cosa%20deve%20combaciare%3A%0A%0A' +
  'Misure%2C%20oppure%20una%20foto%20con%20un%20righello%20accanto%3A%0A%0A' +
  'Quanti%20pezzi%3A%0A%0A' +
  'Entro%20quando%3A%0A'

// Link di riserva: se il precompilato non apre nulla, almeno l'oggetto resta.
const MAILTO_SEMPLICE = 'mailto:' + EMAIL + '?subject=Richiesta%20progetto'

export const home: HomeContent = {
  meta: {
    title: 'Pezzi che non esistono in commercio · Lorenzo Arrigoni',
    description:
      'Progetto e realizzo pezzi che non esistono in commercio: parto dalle tue misure, stampo, provo e correggo. Lavoro su commissione per privati e piccole aziende.',
  },

  nav: {
    items: [
      { label: 'Progetti', href: '/#progetti' },
      { label: 'Metodo', href: '/#metodo' },
      { label: 'Per chi è', href: '/#perchi' },
      { label: 'Preventivo', href: '/preventivo/' },
    ],
    cta: { label: 'Scrivimi', href: '/#contatto' },
  },

  sections: [
    // 1 · HERO. La didascalia del visual non sta qui: viene dai dati dell'immagine (shot.kind),
    // così resta vera quando il render diventa foto.
    {
      id: 'hero',
      eyebrow: 'Progettazione 3D · Su misura · Piccole serie',
      title: {
        claim: 'Pezzi che non esistono in commercio.',
        soft: 'Progettati in CAD sulle tue misure, stampati, provati.',
      },
      lead:
        'Progetto in CAD e stampo in 3D oggetti su misura per **privati e piccole aziende**: ricambi non critici, supporti, organizer, prototipi. Quando un pezzo va disegnato, parto dalle tue misure.',
      items: [
        { strong: 'Progetto in Autodesk Fusion', text: 'sulle misure che mi mandi, del pezzo o della sede.' },
        { strong: 'Stampo su Bambu Lab X2D', text: 'in PLA o in PETG.' },
        { strong: 'Dal pezzo singolo alla piccola serie', text: 'un solo disegno, ripetuto uguale.' },
      ],
      cta: {
        primary: { label: 'Guarda i progetti →', href: '#progetti' },
        ghost: { label: 'Raccontami il problema', href: '#contatto', note: 'Preventivo gratuito, non impegna. Nessun modulo.' },
      },
    },

    // 2 · COSA RICEVI. Cinque voci finché Lorenzo non conferma la sesta (piano §9.9).
    // Testo pronto, da aggiungere in coda solo dopo la conferma:
    //   { strong: 'Il file STEP o 3MF', text: 'se lo vuoi. Basta chiederlo.' },
    {
      id: 'ricevi',
      eyebrow: 'Cosa ricevi a fine lavoro',
      title: { claim: 'Cosa mi impegno a consegnarti.' },
      items: [
        { strong: 'Il pezzo stampato', text: 'in PLA o PETG, su Bambu Lab X2D.' },
        { strong: 'Un preventivo in PDF', text: 'prima di iniziare. Gratuito, non impegna.' },
        { strong: 'Le misure del disegno', text: 'quelle concordate, dal tuo pezzo o dalla tua foto con un righello accanto.' },
        { strong: 'Una versione di prova', text: 'quando serve, prima di quella definitiva.' },
        { strong: 'Cosa non ha funzionato e perché', text: 'per iscritto, comprese le stampe fallite.' },
      ],
      note: 'Se ti serve qualcosa che qui non c’è, chiedilo prima del preventivo.',
    },

    // 3 · IL PROBLEMA. Gli esempi del lead sono casi tipo, non lavori fatti.
    {
      id: 'problema',
      eyebrow: 'Il problema',
      title: {
        claim: 'Il pezzo che ti serve non esiste.',
        soft: 'E non hai un file da mandare a nessuno.',
      },
      lead:
        'Il ricambio è fuori produzione, il supporto non è in catalogo, il divisorio deve entrare in quel cassetto e non in un altro. Chi ha un file STL pronto sa dove andare. **Chi ha un problema e una misura**, no.',
      punch:
        'Il problema non è la stampa 3D. È che senza un disegno sulle misure giuste il pezzo non entra, non tiene, o non esiste.',
      items: [
        { text: 'Scarica un STL e sei a posto', struck: true, outcome: 'solo se le misure sono le tue' },
        { text: 'Compralo online, ce n’è uno simile', struck: true, outcome: 'simile non è uguale' },
        { text: 'Con la colla regge', struck: true, outcome: 'finché non si stacca' },
        { text: 'Una foto con un righello accanto', tag: 'Si parte da qui' },
      ],
    },

    // 4 · PROGETTI. Solo testata, lead e chiusura: i casi vivono nei .md e l’elenco li mostra da sé.
    // Nessun conteggio, nessun «ogni scheda racconta…», niente «in uso» né «non render»: tutto regge
    // anche con due progetti, e anche con voci solo card (senza pagina, quindi niente «apri il progetto»).
    // Fonti: etichetta d'origine nell'occhiello di ProjectCard, badge dell'immagine in Tile (ADR-012),
    // definizione di «originale» in taxonomy.ts (ORIGINS).
    {
      id: 'progetti',
      eyebrow: 'Progetti · Dalla misura al pezzo',
      title: {
        claim: 'Ogni pezzo con la sua origine.',
        soft: 'Originale, derivato o di terzi: lo dice l’elenco.',
      },
      lead:
        'Render o foto, **lo dice l’etichetta** su ogni immagine. Nessun render passa per una foto.',
      closing: 'Tutti i progetti sono in /projects/. Originale vuol dire che non deriva da un modello di altri.',
      cta: {
        ghost: { label: 'Il tuo caso somiglia a uno di questi? Scrivimi →', href: '#contatto' },
      },
    },

    // 5 · DA DOVE SI PARTE
    {
      id: 'partenza',
      eyebrow: 'Da dove si parte',
      title: {
        claim: 'Parti da quello che hai.',
        soft: 'Non serve un file 3D: serve una misura.',
      },
      lead:
        'Nemmeno saper disegnare. Basta sapere **cosa deve fare il pezzo**: il resto si ricava da una di queste strade.',
      items: [
        { strong: 'Da una foto con un righello', text: 'Accanto al pezzo o alla sede: la scala si vede, il resto lo chiedo io.', tag: 'Consigliato' },
        { strong: 'Da un pezzo rotto', text: 'Anche spezzato: dice dove ha ceduto e con cosa deve combaciare.' },
        { strong: 'Da un disegno a mano', text: 'Uno schizzo con qualche misura segnata vale più di una descrizione a parole.' },
        { strong: 'Da un file da correggere (STL, STEP, 3MF)', text: 'Non entra o non tiene: lo confronto con le tue misure e, se la licenza lo permette, lo correggo in CAD dove serve.' },
        { strong: 'Da un pezzo esistente, da rifare in serie', text: 'Un campione che funziona e va ripetuto: parto dalle sue misure e lo preparo per la serie.' },
      ],
      note: 'Le misure precise arrivano dopo, insieme: il primo messaggio serve a capire se il pezzo si può fare.',
    },

    // 6 · MANIFESTO. Citazione + lead + link ghost, nessuna CTA piena.
    {
      id: 'manifesto',
      eyebrow: 'Dove finisce il giro · La frase che voglio sentirti dire',
      title: { claim: '«Quel pezzo adesso **esiste**. E **funziona**.»' },
      lead:
        'Non parto da «cosa posso stampare», ma da «quale problema posso risolvere». Poi progetto il pezzo, lo stampo, lo provo e **lo correggo finché funziona**.',
      cta: {
        ghost: { label: 'Mandami una foto con un righello →', href: '#contatto' },
      },
    },

    // 7 · METODO. I sei testi sono quelli del sito attuale (piano §3.1, riga 7), tranne il GIRO 5/6
    // (niente montaggio né prove di carico: nessun progetto li documenta) e il GIRO 3/6, senza soggetto («Disegno in CAD…» diventa «In CAD…»): vale per ogni progetto.
    // «Il progetto» (GIRO 3/6) è l'unica card evidenziata: lo decide il componente.
    {
      id: 'metodo',
      eyebrow: 'Il metodo · Un giro, sempre lo stesso',
      title: {
        claim: 'Sei tappe, sempre nello stesso ordine.',
        soft: 'Il prototipo, solo quando serve.',
      },
      lead:
        'Qui c’è **solo l’ordine**. Dove un progetto ha la sua scheda, lì c’è come è andata davvero.',
      items: [
        { tag: 'Giro 1/6', strong: 'Il problema', text: 'Qualcosa non esiste, non entra o si rompe sempre nello stesso punto.' },
        { tag: 'Giro 2/6', strong: 'I vincoli', text: 'Misure reali, spazi stretti, materiali già presenti: si parte da lì.' },
        { tag: 'Giro 3/6', strong: 'Il progetto', text: 'In CAD, partendo dalle quote, non dall’idea di forma.' },
        { tag: 'Giro 4/6', strong: 'Il prototipo', text: 'Prima versione stampata: serve per sbagliare presto e a poco.' },
        { tag: 'Giro 5/6', strong: 'Il test', text: 'Si prova il pezzo stampato. Se non entra o cede, si annota perché.' },
        { tag: 'Giro 6/6', strong: 'La soluzione', text: 'Versione finale, replicabile e documentata. Poi si ricomincia.' },
      ],
      closing:
        'Dal giro 6 si torna all’1: se il pezzo cede, si annota perché e si rifà.',
    },

    // 8 · COME PROSEGUE. Timeline: il tag porta settore e nome, il text il corpo, l'outcome l'esito.
    {
      id: 'prosegue',
      eyebrow: 'Come prosegue',
      title: {
        claim: 'Dal primo messaggio al pezzo in mano.',
        soft: 'Un settore alla volta, un esito per ciascuno.',
      },
      lead:
        'Cosa succede dopo la prima email, nell’ordine in cui succede. A ogni settore sai **cosa ricevi** prima di decidere il passo dopo.',
      items: [
        {
          tag: 'Settore 1 · Il primo messaggio',
          text: 'Mi scrivi cosa deve fare il pezzo e dove va, con una foto e una misura se le hai.',
          outcome: 'Ricevi: qualche domanda per capire i vincoli.',
        },
        {
          tag: 'Settore 2 · Domande e misure',
          text: 'Si chiariscono quote, materiale e quantità. Se il pezzo non rientra in quello che faccio, te lo dico qui.',
          outcome: 'Ricevi: un sì, un no, o cosa manca per decidere.',
        },
        {
          tag: 'Settore 3 · Preventivo in PDF',
          text: 'Prima di iniziare, un preventivo in PDF: il prezzo lo vedi prima di decidere.',
          outcome: 'Ricevi: il PDF, gratuito e senza impegno. Poi decidi.',
        },
        {
          tag: 'Settore 4 · Prova e correzione',
          text: 'Prima versione stampata, quando serve. Se non entra o non tiene, lo correggo e annoto perché.',
          outcome: 'Ricevi: la versione di prova e, se non va, il perché per iscritto.',
        },
        {
          tag: 'Traguardo · Consegna',
          text: 'Stampo la versione definitiva in PLA o PETG, sulle misure concordate.',
          outcome: 'Ricevi: il pezzo finito e le misure su cui è disegnato.',
        },
      ],
      note: 'Sui tempi: rispondo appena posso. Non li ho misurati, quindi non li prometto.',
      cta: {
        ghost: { label: 'Leggi come nasce il prezzo →', href: '/preventivo/' },
      },
    },

    // 9 · PER CHI È. Voce singolare (brief §0 «Una sola voce»): «Sono la persona giusta se»
    // al posto del «Lavoriamo bene se» del piano. Ogni «no» porta il suo perché.
    {
      id: 'perchi',
      eyebrow: 'Tavola 01 · Per chi è',
      title: { claim: 'Questo lavoro chiede una misura, non un file.' },
      lead:
        'Meglio dirlo qui che dopo il primo messaggio. Se ti riconosci nella seconda colonna, **ti risparmio un’email**: accanto a ogni voce c’è il perché.',
      headA: 'Sono la persona giusta se',
      items: [
        { strong: 'Hai un problema e una misura', text: 'non un file pronto da stampare.' },
        { strong: 'Ti serve un pezzo, o una piccola serie', text: 'da ripetere uguale.' },
        { strong: 'Accetti una versione di prova', text: 'prima della definitiva, quando il pezzo lo richiede.' },
        { strong: 'Sei un privato o una piccola azienda', text: 'e vuoi parlare con chi progetta il pezzo, non con un modulo.' },
      ],
      headB: 'Non sono la persona giusta se',
      itemsB: [
        { strong: 'Hai già un STL e cerchi solo il prezzo più basso', text: 'un service conto terzi è la strada giusta.' },
        { strong: 'Ti serve un pezzo strutturale, di sicurezza, elettrico o medicale', text: 'lì un errore costa più del pezzo.' },
        { strong: 'Vuoi la copia di un prodotto di marca, o del suo logo', text: 'un marchio ha un titolare, e non sono io.' },
        { strong: 'Ti serve per domani, o comunque senza il tempo di una prova', text: 'non prometto tempi che non ho misurato.' },
      ],
      note:
        'Fuori dal mio campo, per scelta: parti strutturali portanti, componenti di sicurezza, anche automotive, parti elettriche critiche, dispositivi medicali, pezzi esposti ad alte temperature o a gas, armi funzionanti, articoli per l’infanzia venduti come sicuri. Per questo, se il pezzo è un ricambio, deve essere non critico.',
    },

    // 10 · LA DOMANDA GIUSTA. L'obiezione del lettore come titolo, la concessione nel soft.
    {
      id: 'domanda',
      eyebrow: 'La domanda giusta',
      title: {
        claim: 'Perché non scaricare un modello gratis?',
        soft: 'Dovresti, quando esiste.',
      },
      lead:
        'Un modello pubblicato da altri risolve un problema generico. Il tuo, di solito, ha **una misura che il file non conosce**.',
      headA: 'Un file scaricato',
      items: [
        { text: 'Ha le misure di qualcun altro.' },
        { text: 'Non sa che sede deve riempire.' },
        { text: 'Se non entra, resta lì.' },
      ],
      headB: 'Un pezzo su misura',
      itemsB: [
        { strong: 'Misura.', text: 'Parto dalle tue misure, del pezzo o della sede.' },
        { strong: 'Progetta.', text: 'In Fusion, attorno a quelle quote: sede, gioco, spessori.' },
        { strong: 'Prova.', text: 'Stampo una prova quando serve. Se non entra o non tiene, correggo.' },
        { strong: 'Documenta.', text: 'Cosa non ha funzionato e perché resta a registro.' },
      ],
      pills: ['Risolve a metà', 'Funziona'],
      verdict: 'Quando il file esiste, è giusto e la licenza permette di stamparlo per te, lo stampo e cito l’autore. Quando non esiste, o non entra, progetto il pezzo.',
    },

    // 11 · PRINT LAB. La pagina la mostra solo se esiste almeno una voce `origin: terzi` pubblicata
    // (getPublishedProjects, non draft) con status diverso da 'concept' (piano §3.1, riga 11). Oggi le
    // due voci `origin: terzi` (print-lab-basi-gridfinity, print-lab-supporto-telecomando) sono in bozza
    // (draft: true) e senza prova di stampa: sezione e rotta restano nascoste finché una non è pubblicata.
    // La rotta della CTA esiste con almeno un progetto pubblicato in `category: 'print-lab'` (taxonomy.ts,
    // [categoria].astro): ogni voce `origin: terzi` va in quella categoria, così la CTA non resta orfana.
    {
      id: 'printlab',
      eyebrow: 'Print Lab · Modelli di altri',
      title: {
        claim: 'Alcune stampe sono progetti di altri autori.',
        soft: 'E lo scrivo accanto a ciascuno.',
      },
      lead:
        'Qui ci sono file pubblicati da altri autori, senza modifiche: **ogni voce dichiara autore e fonte**.',
      pills: ['Autore', 'Fonte'],
      cta: {
        ghost: { label: 'Vai al Print Lab →', href: '/projects/categoria/print-lab/' },
      },
    },

    // 12 · CONTATTO. L'indirizzo va reso anche come testo selezionabile a corpo h3 (piano §3.1):
    // senza JS non c'è «copia indirizzo», e il mailto può non aprire nulla.
    {
      id: 'contatto',
      eyebrow: 'Contatto · Nessun impegno',
      title: {
        claim: 'Raccontami il problema.',
        soft: 'Una foto e qualche misura bastano per iniziare.',
      },
      lead:
        'Basta un’email: con queste cose dentro, **la prima risposta parla già del tuo pezzo**.',
      headA: 'Cosa mi serve per risponderti',
      items: [
        { strong: 'Cosa deve fare il pezzo', text: 'in poche righe.' },
        { strong: 'Dove va montato', text: 'o con cosa deve combaciare.' },
        { strong: 'Una foto con un righello o una moneta accanto', text: 'per la scala. Le misure precise arrivano dopo.' },
        { strong: 'Quanti pezzi ti servono', text: 'un pezzo singolo o una piccola serie.' },
      ],
      note: 'Non serve un file 3D. Se ce l’hai (STL, STEP, 3MF) allegalo pure, ma non è il punto di partenza.',
      headB: 'Come prosegue',
      itemsB: [
        { text: 'Ti rispondo appena posso, con qualche domanda per capire i vincoli.' },
        { text: 'Se il pezzo si può fare, ricevi un preventivo in PDF.' },
        { text: 'Poi decidi.' },
      ],
      cta: {
        primary: {
          label: 'Scrivimi →',
          href: MAILTO,
          note: 'Apre il tuo programma di posta con la traccia già scritta, se ne hai uno. Nessun modulo, nessun account.',
        },
        ghost: { label: EMAIL, href: MAILTO_SEMPLICE },
      },
    },
  ],

  footer: {
    tagline: 'Progettazione 3D su misura per privati e piccole aziende. Un pezzo, o una piccola serie.',
    links: [
      { label: 'Progetti', href: '/projects/' },
      { label: 'Metodo', href: '/#metodo' },
      { label: 'Preventivo', href: '/preventivo/' },
      { label: 'Chi sono', href: '/about/' },
      { label: 'Biglietto', href: '/card/lorenzo/' },
    ],
    email: EMAIL,
    github: 'https://github.com/Larrigoni',
  },
}
