---
title: 'Biglietto da visita NFC'
status: 'prototipo'
category: 'oggetti-smart'
date: 2026-10-02
summary: 'Il mio biglietto da visita, stampato in 3D con quattro filamenti e un tag NFC chiuso dentro, fatto per aprire la mia pagina sul sito col telefono.'
headline: 'Il mio biglietto: i colori del sito e un tag NFC dentro.'
proof: 'Tre fasce piane per 2,2 mm: retro da 0,6 sul piatto, anima da 1,0 con la sede del tag e due strati pieni sopra, fronte da 0,6. **Due stampe di prova hanno fissato la regola delle scritte**: tutte in Plex Sans da 5 mm in su. La terza versione non è ancora stampata.'
boundary: 'La terza versione non è ancora stampata: le immagini sono il modello in Fusion.'
trait: 'Scritte da 5 mm dopo due prove'
origin: 'originale'
context: 'personale'
depth: 'scheda'
featured: true
order: 3
tags: ['nfc']
cover:
  src: '../../assets/projects/biglietto-la-nfc/biglietto-la-fronte.png'
  alt: 'Render CAD del fronte del biglietto: fondo nero, pannello rosso tagliato in diagonale sulla destra con filetto bianco e lettere LA nere, nome in bianco e mestiere in grigio a sinistra'
  caption: 'Il modello, fronte: pannello rosso tagliato a 12° con il filetto bianco e le «LA» nere, nome a 6,5 mm, «Progettazione 3D / su misura» a 5 mm.'
  kind: 'render-cad'
gallery:
  - src: '../../assets/projects/biglietto-la-nfc/biglietto-la-retro.png'
    alt: 'Render CAD del retro del biglietto: fondo grigio, tondo bianco con lettere LA nere, invito, sito ed email in nero, cordolo rosso e bianco lungo il bordo in basso'
    caption: 'Il retro, che va sul piatto: il tondo bianco sta sopra il tag, le scritte sono tutte in Plex Sans da 5 mm, il cordolo chiude in basso.'
    kind: 'render-cad'
  - src: '../../assets/projects/biglietto-la-nfc/biglietto-la-iso.png'
    alt: 'Render CAD del biglietto da tre quarti: si vedono lo spessore di 2,2 mm e i colori a filo sulle due facce'
    caption: 'Da tre quarti: 2,2 mm in tre fasce piane, retro, anima con la sede del tag e fronte. I colori sono intarsi a filo, nessun rilievo.'
    kind: 'render-cad'
print:
  printer: 'Bambu Lab X2D'
  software: ['Autodesk Fusion']
  pieces: 1
printLog:
  - attempt: 1
    outcome: 'fallita'
    note: 'Fronte strappato sopra il tag, scritte da 3,6 mm illeggibili'
  - attempt: 2
    outcome: 'completata'
    note: 'Due scritte in Mono da 3,6 e 4,2 mm impastate'
---

## Il problema

Il mio biglietto da visita, con i colori del sito e una cosa in più della carta:
avvicinando il telefono al tondo si apre la mia pagina su larrigoni.github.io,
che aggiorno senza ristampare niente.

## I vincoli

- **Il formato.** 85 x 55 mm, angoli R3, spesso 2,2 mm. Tutto piano: niente
  rilievi.
- **Il tag.** Un adesivo NTAG213 tondo da 25 mm, spesso 0,25 mm, va chiuso
  dentro il pezzo.
- **I colori.** Quelli del sito: nero, bianco, rosso e grigio, con il monogramma
  «LA» e il cordolo. Quattro filamenti, un pezzo solo, nessun incollaggio.
- **Le scritte.** La stampa di prova del biglietto Qredible aveva insegnato che
  le scritte piccole escono nitide solo sulla faccia a contatto col piatto.

## Il progetto

Il progetto è mio, fatto con Claude: il disegno l’ho scelto fra tre bozze, le
scelte di stampa sono mie, la geometria la costruiscono script Python che
preparano i tracciati e li passano ad Autodesk Fusion, un componente per ogni
colore e per ogni faccia: nove parti.

Il biglietto si stampa con il retro sul piatto, in tre fasce piane: il retro da
0,6 mm, l’anima da 1,0, il fronte da 0,6. Nell’anima c’è la sede del tag, Ø25,6,
da 0,6 a 1,2 mm: tre strati da 0,2. Sopra la sede restano due strati pieni,
così il fronte non poggia mai sul tag. La pausa per inserire il tag è scritta
nel 3MF, allo strato 7 (1,4 mm).

Il retro, grigio, porta il tondo bianco con le «LA» nere sopra il tag, l’invito
«Avvicina il telefono / al tondo», il sito, l’email e il cordolo rosso e bianco
in basso. Il fronte, nero, porta il pannello rosso tagliato a 12° con il filetto
bianco e le «LA» nere, il nome in bianco a 6,5 mm e «Progettazione 3D / su
misura» in grigio a 5 mm.

## Le due stampe di prova

La prima stampa (1 ottobre) ha mostrato due difetti: sopra la sede del tag c’era
subito il fronte, steso a ponte sul tag, e l’ugello l’ha strappato; i contatti,
in Plex Mono da 3,6 mm, erano illeggibili.

Nella seconda (2 ottobre), con due strati pieni sopra il tag e i contatti in
Plex Sans da 5 mm, il tag è rimasto coperto, il fronte integro e i contatti si
leggevano. L’invito, in Mono da 3,6, e il mestiere, in Mono da 4,2, erano ancora
impastati: aste larghe una sola passata d’ugello. Attorno a ogni intarsio
restava un alone scuro, la giunzione fra i perimetri dei due colori.

## La correzione

Nel modello, adesso, ogni scritta è in Plex Sans da 5 mm in su, il nome a 6,5;
il tondo è sceso per fare posto all’invito su due righe. Uno script misura
quanto ogni scritta si chiude in stampa, come quota di fondo che sparisce
rispetto all’inchiostro: le nuove stanno fra 0,03 e 0,09, i contatti che si
leggevano nella seconda stampa erano a 0,08. L’alone non si
toglie dal disegno: si attenua in stampa. I render mostrano questo modello; la
terza stampa non c’è ancora.
