---
title: 'Biglietto da visita Qredible con NFC'
status: 'prototipo'
category: 'oggetti-smart'
date: 2026-09-30
summary: 'Biglietto da visita stampato in 3D a quattro colori, con un tag NFC chiuso dentro: avvicinando il telefono alla Q si apre la pagina del socio.'
headline: 'Un biglietto che si apre col telefono, stampato in un pezzo solo.'
proof: 'Il tag NFC da 0,25 mm sta chiuso in una sede profonda 0,6 mm, sotto la Q in rilievo: la stampa si ferma allo strato 7, il tag entra e la stampa riprende. Fronte e retro sono intarsi di colore a filo. **La prima stampa ha mostrato tre difetti**, tutti corretti nel modello.'
trait: 'Tag NFC chiuso nel pezzo'
origin: 'originale'
context: 'personale'
depth: 'scheda'
featured: true
order: 2
tags: ['nfc']
cover:
  src: '../../assets/projects/biglietto-qredible-nfc/biglietto-qredible-fronte.jpg'
  alt: 'Foto del biglietto stampato, fronte: fondo nero, logo Qredible e nome in bianco, righe teal ad arco sulla destra'
  caption: 'La prima stampa, fronte: logo, nome e righe sono intarsi a filo, stampati a faccia in giù sul piatto.'
  kind: 'foto'
  fit: 'cover'
gallery:
  - src: '../../assets/projects/biglietto-qredible-nfc/biglietto-qredible-retro.jpg'
    alt: 'Foto del retro del biglietto: Q in rilievo a righe bianche e teal, tre onde nere in rilievo, scritta piccola impastata'
    caption: 'La prima stampa, retro: la Q in rilievo sopra il tag. Qui si vedono due dei difetti: le righe sottili della Q e la scritta illeggibile.'
    kind: 'foto'
    fit: 'cover'
print:
  printer: 'Bambu Lab X2D'
  software: ['Autodesk Fusion']
  pieces: 1
printLog:
  - attempt: 1
    outcome: 'completata'
    note: 'Scritta del retro illeggibile, righe della Q sfaldate'
---

## Il problema

Un biglietto da visita per i soci di Qredible che faccia una cosa in più della
carta: avvicinando il telefono si apre la pagina del socio, che si può
aggiornare senza ristampare niente.

## I vincoli

- **Il formato.** 85 x 55 mm, angoli R3, spesso 1,8 mm; la Q del retro sale di
  1 mm.
- **Il tag.** Un adesivo NTAG213 tondo da 25 mm, spesso 0,25 mm (misurato), va
  chiuso dentro il pezzo, non incollato sopra.
- **Il marchio.** Logo e Q dai tracciati ufficiali; il gradiente del marchio,
  teal-blu a 135°, non si può stampare come sfumatura: diventa righe.
- **La stampa.** Un pezzo solo, quattro colori, nessun incollaggio.

## Il progetto

Il progetto è mio, fatto con Claude: le scelte di grafica e di stampa sono mie,
la geometria la costruiscono script Python che preparano i tracciati e li
passano ad Autodesk Fusion, un componente per ogni colore.

Il biglietto si stampa con il fronte sul piatto. Il fronte è tutto piano: logo,
nome e righe sono intarsi di colore a filo, spessi 0,6 mm. In mezzo c’è
un’anima con la sede del tag, profonda 0,6 mm: tre strati da 0,2. Il retro sta in alto,
con la Q in rilievo di 1 mm e tre onde di 0,4 mm.

Il gradiente del marchio diventa righe a 135°: ogni riga è larga quanto serve a
fare la sfumatura, ma mai meno di quello che l’ugello riesce a stampare.

## La prima stampa

La prima stampa ha mostrato tre difetti:

- la scritta del retro, alta 3 mm e stampata sulla faccia in alto, era
  illeggibile;
- le righe della Q, larghe una sola passata d’ugello e alte 1 mm, si
  sfaldavano e mescolavano i colori;
- nel nome, fra la «g» e la «o» restavano 0,45 mm e fra il punto e l’asta della
  «i» 0,35 mm: meno di una passata d’ugello, e si sono chiusi.

## La correzione

Nel modello, adesso, la scritta del retro non c’è più: bastano la Q e le onde.
Le righe della Q hanno il passo raddoppiato e sono larghe almeno 0,8 mm. Il nome
ha la spaziatura aperta di 0,25 mm e i punti delle «i» alzati fino a 0,65 mm
dall’asta. La seconda stampa non c’è ancora.
