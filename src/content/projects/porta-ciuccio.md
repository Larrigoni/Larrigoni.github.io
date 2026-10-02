---
# In bozza finché Lorenzo non conferma due cose: come dichiarare che geometria e
# script li ha generati un assistente AI, e che si pubblicano i fatti presi dalla
# chat di progetto (prima stampa, difetto, ristampa del solo tappo).
# `origin: 'originale'` resta solo se Lorenzo conferma che l'etichetta
# «Originale» va bene per un modello generato da un assistente sulla sua misura:
# altrimenti serve un valore nuovo in taxonomy.ts. Non togliere `draft` prima.
# Stato «In prova»: del secondo tappo non c'è nessun esito documentato.
# Niente blocco `print`: nessun file dello slicer, e il default affermerebbe
# una stampante non documentata.
title: 'Porta ciuccio'
status: 'prototipo'
category: 'su-misura'
date: 2026-09-20
summary: 'Contenitore con tappo a vite, dimensionato su un ciuccio misurato. Geometria generata da un assistente AI in Fusion, filetto trapezoidale a 3 principi.'
headline: 'Tappo a vite a più principi, dimensionato sul ciuccio.'
proof: 'Il ciuccio da contenere misura 52 x 41 x 41 mm: ho chiesto un contenitore con tappo a vite. Il modello l’ha generato un assistente AI in Fusion, sulla mia misura. Il filetto è trapezoidale a 3 principi: **ogni giro di tappo avanza di 13,5 mm**. Lo script controlla tutto l’avvitamento in 43 posizioni, non solo il tappo chiuso.'
trait: 'Filetto a 3 principi'
origin: 'originale'
context: 'studio'
depth: 'scheda'
featured: true
order: 5
draft: true
tags: ['filetti', 'contenitori', 'multi-pezzo']
cover:
  src: '../../assets/projects/porta-ciuccio/porta-ciuccio-iso.png'
  alt: 'Render CAD del porta ciuccio chiuso, in vista isometrica, con il ciuccio in rilievo sul tappo'
  caption: 'Da tre quarti, chiuso: il filetto e la cava restano nascosti sotto la fascia del tappo.'
  kind: 'render-cad'
gallery:
  - src: '../../assets/projects/porta-ciuccio/porta-ciuccio-top.png'
    alt: 'Render CAD del tappo visto dall’alto, con la sagoma del ciuccio in rilievo'
    caption: 'Dall’alto: la sagoma del ciuccio in rilievo sul tappo, 42 x 54 mm e alta 1,2 mm.'
    kind: 'render-cad'
  - src: '../../assets/projects/porta-ciuccio/porta-ciuccio-front.png'
    alt: 'Render CAD frontale del porta ciuccio chiuso: fascia scanalata del tappo e svasatura del corpo'
    caption: 'Di fronte, da chiuso: le scanalature di presa sul fianco del tappo e, sotto, la svasatura del corpo.'
    kind: 'render-cad'
printLog:
  - attempt: 1
    outcome: 'fallita'
    note: 'Il tappo non si imbocca: cava ferma sopra il bordo'
---

## Il problema

Volevo un porta ciuccio cilindrico con tappo a vite, da stampare in 3D, con
l’immagine di un ciuccio sul tappo. Il ciuccio misura 52 x 41 x 41 mm.
Corpo e tappo escono entrambi dalla stampante: il filetto deve imboccare e
girare tra due pezzi stampati, con i giochi giusti.

## I vincoli

- **Le misure.** Interno utile Ø58 mm, profondo 44 mm, sul ciuccio misurato.
  Parete 2,0 mm, fondo 2,4 mm, cielo del tappo 2,4 mm.
- **L’ingombro.** Il tappo sta a filo con la spalla del corpo. Da chiuso il pezzo
  misura Ø68,9 x 50,3 mm, 49,1 mm senza il rilievo.
- **La stampa.** Fianchi del filetto a 45 gradi: nello script sono scelti per
  stampare senza supporti. È l’intento di progetto, non un esito documentato.
- **Il secondo colore.** Il ciuccio sul tappo l’ho voluto in rilievo e in un
  colore diverso dal tappo.

## Il progetto

Il modello non l’ho disegnato io. Geometria e script li ha generati un
assistente AI in Autodesk Fusion, sulla misura del ciuccio e sulle mie
indicazioni. Lo script
Python ricostruisce da zero corpo e tappo, verifica l’accoppiamento filettato ed
esporta STL e 3MF.

Il filetto è trapezoidale a 3 principi: passo 4,5 mm, 13,5 mm di avanzamento per
giro, profondità 1,2 mm, cresta 0,9 mm. È destrorso: il tappo chiude girando in
senso orario. Nella prima proposta il passo era 3,5 mm, ma la cava del
tappo sarebbe stata più larga del passo. Ora la cava è larga 3,7 mm al foro, su
un passo di 4,5.

L’elica è una spline per punti, circa 90 per giro. Il profilo del filetto scorre
lungo l’elica con uno sweep e si ripete 3 volte in circolo, uno per principio. La
cava del tappo nasce allo stesso modo.

I giochi sono due: radiale 0,25 mm e assiale sui fianchi 0,45 mm.

Sul fianco del tappo ci sono 24 scanalature di presa. Sul fondo del corpo ho
chiesto dei fori: sono 19, da 3,5 mm, in tre anelli (1 al centro, 6 a raggio
12 mm, 12 a raggio 23 mm), e lo script li chiama fori di drenaggio. Il ciuccio in
rilievo è alto 1,2 mm, ha uno smusso di 0,3 mm e occupa 42 x 54 mm. È un corpo
separato. Per il secondo colore ci sono due strade: il file «Tappo 2 colori», con
ciuccio e tappo già posizionati, oppure un cambio filamento a 17,3 mm dal piatto.
Il tappo si stampa con il bordo aperto sul piatto.

Volumi dagli STL: corpo 26,24 cm³, tappo 16,63 cm³, ciuccio 1,22 cm³.

## Il prototipo

Ho stampato il corpo e il tappo a due colori. Il tappo non si chiudeva sul
corpo. Pensavo a un’elica al contrario.

## Il test

L’elica era giusta. La diagnosi l’ha fatta l’assistente sui file: l’errore era di
progetto, nella cava del tappo, che si fermava 1,1 mm sopra il bordo aperto. Restava così un
anello liscio a raggio 31,25 mm, che non passa sopra le creste del filetto a
32,2 mm. Il tappo si appoggiava in cima al filetto e non girava in nessun verso.
La faccia del bordo misurava 412,8 mm²: l’anello pieno, senza intagli.

Da chiuso i due pezzi non si toccano, quindi un controllo sulla sola posizione
chiusa non vede questo difetto. Lo script percorre tutto l’avvitamento: 43
posizioni su 420 gradi, a passi di 10, con un’analisi di interferenza a ogni
passo, e scrive «libero» oppure «BLOCCATO». Controlla anche che sul bordo ci siano
gli intagli d’imbocco.

Nello script è annotato un secondo vincolo, trovato sul modello. Le eliche del filetto e della cava devono
partire dalla stessa quota, perché lo sweep ruota il profilo di circa 25 gradi per
giro. Con le origini sfalsate di 2,5, 6 e 13 gradi la compenetrazione misurata sul
modello era di 0,0000, 0,0006 e 0,0079 cm³, fino a 0,076 mm di spessore.

## La soluzione

Nel file il tappo ha due modifiche. Le due eliche partono dalla stessa quota, 36,05 mm.
La cava si prolunga sotto il bordo aperto con un secondo sweep dello stesso
profilo, così arriva al bordo a piena profondità: sul bordo ora ci sono 52,5 mm²
di intagli d’imbocco.

Il gioco radiale è rimasto 0,25 mm, perché entra anche nella svasatura del corpo,
che era già stampato. Il gioco assiale tocca solo il tappo ed è passato da 0,40 a
0,45 mm, come margine. Avevo già stampato tutto, quindi ho chiesto di rifare
solo il tappo: nel modello il corpo è invariato e quello stampato resta com’era.

Il tappo modificato non ha ancora un esito di stampa documentato. Finché non c’è,
questo progetto resta in prova.
