// Copy delle pagine interne: /about, /preventivo, indice dei progetti, pagina
// progetto, 404, /card/lorenzo. Stessa forma e stesse regole di home.ts.
//
// Regola dei fatti (ADR-011): ogni frase viene da un testo già pubblicato o
// approvato. Le fonti sono indicate sopra ogni blocco:
//  - home.ts (copy della home, Workflow B);
//  - docs/brief-marketing.md (§6.3, §6.4, §7);
//  - docs/brief-design-system.md §11.2 (occhielli e titoli delle pagine).
// Quello che non è documentato non c'è: niente città, anno di inizio, tempi,
// esempio di preventivo, FAQ (piano §9: arrivano solo con i dati di Lorenzo).

import type { Cta, Item, Title } from './home.ts'
import { home } from './home.ts'

export interface PageHead { eyebrow: string; title: Title; lead?: string }

const contatto = home.sections.find((s) => s.id === 'contatto')
if (!contatto?.cta?.primary) throw new Error('home.ts: manca la CTA del contatto')

/** Il mailto precompilato della home: tutte le CTA piene delle pagine interne aprono quello. */
const MAILTO = contatto.cta.primary.href

/** I settori della home: /preventivo ne usa i primi tre, con gli stessi testi. */
const prosegue = home.sections.find((s) => s.id === 'prosegue')?.items ?? []

export const pages = {
  // /about. Fonti: hero e «Per chi è» di home.ts; nota ORIGINS in taxonomy.ts
  // (geometria generata con un assistente AI, dichiarata nella scheda).
  about: {
    meta: {
      title: 'Chi sono · Lorenzo Arrigoni',
      description: 'Progetto in CAD e stampo in 3D pezzi su misura per privati e piccole aziende: ricambi non critici, supporti, organizer, prototipi.',
    },
    head: {
      eyebrow: 'Chi sono',
      title: { claim: 'Progetto pezzi che non esistono.', soft: 'Li stampo, li provo, li rifaccio.' },
    } satisfies PageHead,
    body: [
      'Mi chiamo Lorenzo Arrigoni. Progetto in CAD e stampo in 3D pezzi che in commercio non si trovano: **ricambi non critici, supporti, organizer, prototipi**. Lavoro per privati e piccole aziende, su un pezzo singolo o su una piccola serie.',
      'Parto da un problema e da una misura. Progetto il pezzo in Autodesk Fusion attorno alle quote, lo stampo su una Bambu Lab X2D in PLA o PETG e lo provo. Se non entra o non tiene, lo correggo e annoto perché.',
      'Alcune geometrie le genera un assistente AI dentro Fusion, sulle mie misure e le mie indicazioni. Quando succede, **la scheda del progetto lo dice**.',
    ],
    boundary:
      'Fuori dal mio campo, per scelta: parti strutturali portanti, componenti di sicurezza, anche automotive, parti elettriche critiche, dispositivi medicali, pezzi esposti ad alte temperature o a gas, armi funzionanti, articoli per l’infanzia venduti come sicuri.',
    // Pannello strumenti (brief §6.10): solo righe documentate. «Dove» e «Dal» mancano: righe assenti.
    tools: [
      { key: 'CAD', value: 'Autodesk Fusion' },
      { key: 'Stampante', value: 'Bambu Lab X2D' },
      { key: 'Materiali', value: 'PLA, PETG' },
    ],
    cta: {
      primary: { label: 'Scrivimi →', href: MAILTO, note: 'Nessun modulo, nessun account.' },
      ghost: { label: 'Guarda i progetti', href: '/projects/' },
    } satisfies { primary: Cta; ghost: Cta },
  },

  // /preventivo. La timeline è quella della home (settori 1-3: stesse tappe,
  // stessi testi). Le voci di «Cosa incide sul prezzo» sono impegni («lo trovi
  // scritto»), non la descrizione di un metodo di calcolo: il vecchio testo del
  // sito veniva da un giro di Claude Design ispirato a un software di
  // preventivazione (ADR-009), non da preventivi verificati (review finale E).
  // Recesso: brief marketing §6.4.
  preventivo: {
    meta: {
      title: 'Preventivo · Lorenzo Arrigoni',
      description: 'Come nasce il prezzo di un pezzo su misura: un preventivo in PDF prima di iniziare, gratuito e senza impegno.',
    },
    head: {
      eyebrow: 'Preventivo · Gratuito, non impegna',
      title: { claim: 'Il prezzo si calcola sul pezzo.', soft: 'Non a occhio.' },
      lead: 'Prima di iniziare ricevi un preventivo in PDF. È gratuito e non impegna: **serve a decidere** se il pezzo vale la stampa.',
    } satisfies PageHead,
    steps: {
      eyebrow: 'Dal messaggio al preventivo',
      title: { claim: 'Dal primo messaggio al preventivo.', soft: 'Un settore alla volta, un esito per ciascuno.' },
      items: prosegue.slice(0, 3) satisfies Item[],
    },
    factors: {
      eyebrow: 'Cosa incide sul prezzo',
      title: { claim: 'Cosa incide sul prezzo.', soft: 'Lo trovi scritto nel preventivo, prima di decidere.' },
      items: [
        { strong: 'Il materiale', text: 'quanto ne serve al pezzo, in PLA o PETG.' },
        { strong: 'Il tempo di stampa', text: 'le ore di macchina del pezzo.' },
        { strong: 'La progettazione', text: 'partire da una foto non è come correggere un file che hai già.' },
        { strong: 'Gli extra', text: 'solo se servono: inserti, tag NFC, spedizione.' },
        { strong: 'La quantità', text: 'un pezzo singolo o una piccola serie cambiano il conto.' },
      ] satisfies Item[],
    },
    // Art. 59 del Codice del Consumo: l'esclusione del recesso va comunicata prima dell'ordine
    // (brief marketing §6.4, fonte F14). Da far confermare a Lorenzo (dati-mancanti.md, P2).
    recesso:
      'Un pezzo fatto su misura o personalizzato non rientra nel diritto di recesso (art. 59 del Codice del Consumo): te lo dico prima dell’ordine, non dopo.',
    cta: {
      primary: { label: 'Chiedi un preventivo →', href: MAILTO, note: 'Gratuito, non impegna. Nessun modulo.' },
    } satisfies { primary: Cta },
  },

  // Indice e viste filtrate (brief §11.2).
  projects: {
    meta: {
      title: 'Progetti · Lorenzo Arrigoni',
      description: 'Tutti i progetti pubblicati: originali, derivati e stampe da modelli di altri, dichiarati.',
    },
    head: {
      eyebrow: 'Tutti i progetti',
      title: { claim: 'Tutto quello che ho pubblicato.', soft: 'Originali, derivati e stampe da modelli di altri: dichiarati.' },
    } satisfies PageHead,
  },

  // Fine della pagina progetto (brief §6.19, CTA band): il solo rosso pieno della pagina.
  projectBand: {
    claim: 'Hai un problema simile?',
    cta: { label: 'Mandami una foto e due misure →', href: MAILTO } satisfies Cta,
    back: { label: '← Tutti i progetti', href: '/projects/' } satisfies Cta,
  },

  // 404 (brief §6.19). Nessun rosso pieno.
  notFound: {
    meta: { title: 'Pezzo non trovato · Lorenzo Arrigoni', description: 'La pagina richiesta non esiste.' },
    head: {
      eyebrow: 'Errore 404 · Pagina non trovata',
      title: { claim: 'Pezzo non trovato.', soft: 'Questa pagina non esiste, o non esiste ancora.' },
    } satisfies PageHead,
    home: { label: 'Torna alla home', href: '/' } satisfies Cta,
    projects: { label: 'Tutti i progetti →', href: '/projects/' } satisfies Cta,
  },

  // /card/lorenzo (brief §6.19): la pagina che apre il tag NFC.
  card: {
    meta: {
      title: 'Lorenzo Arrigoni · Biglietto',
      description: 'Contatti di Lorenzo Arrigoni: progettazione 3D su misura per privati e piccole aziende.',
    },
    name: 'Lorenzo Arrigoni',
    role: 'Progettazione 3D · Su misura',
    save: { label: 'Salva il contatto', href: '/lorenzo-arrigoni.vcf' } satisfies Cta,
    write: { label: 'Scrivimi', href: `mailto:${home.footer.email}` } satisfies Cta,
    portfolio: { label: 'Guarda il portfolio', href: '/' } satisfies Cta,
  },
}
