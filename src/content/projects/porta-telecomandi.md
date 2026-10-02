---
title: 'Porta telecomandi'
# Nell'archivio ci sono solo i quattro STL: nessun 3MF, G-code, foto o nota.
# Stampa, montaggio e uso non sono documentati, quindi niente 'completato'
# (in pagina diventa «Validato»). Passa a 'completato' quando Lorenzo conferma
# che le varianti sono stampate e montate.
# Anche 'in-sviluppo' (in pagina «In sviluppo») non ha fonte: nessun file dice
# che il lavoro è in corso. Lo stato reale va confermato con Lorenzo.
status: 'in-sviluppo'
# 'su-misura' vuol dire «il pezzo nasce da quote reali» (brief §1.4): qui
# significherebbe vani dimensionati su telecomandi misurati, e questo è un
# fatto inferito. Da confermare con Lorenzo; se non è così, la categoria va
# rivista.
category: 'su-misura'
# Data di creazione dei file nell'archivio (DISEGNO 3D/porta-telecomandi): è
# la data della copia, non quella del progetto. Da sostituire con la data vera:
# l'anno compare nell'occhiello della card e della scheda.
date: 2026-09-20
# Summary e proof dicono solo ciò che la geometria mostra.
summary: 'Lo stesso porta telecomandi in quattro varianti, a uno o a due vani. Cambiano le misure, non la costruzione.'
headline: 'Un disegno che si ripete: quattro varianti con le stesse regole'
proof: 'Quattro varianti: due a un vano, due a due vani. Da una all’altra cambiano le misure esterne e la misura dei vani. Restano uguali piastra, pareti e fondo, la finestra da 18 mm e i due fori svasati di ogni vano: sempre **al 30 e al 70% dell’altezza delle pareti**.'
boundary: 'Niente parti regolabili: ogni variante è un pezzo unico, a misure fisse.'
origin: 'originale'
# `context` resta al default ('personale'): per chi e perché quattro varianti
# non è documentato. Da confermare con Lorenzo (piano §9, punto 5).
featured: true
order: 4
# Resta 'card' e in bozza: provenienza delle varianti, render validi e
# contesto sono da confermare con Lorenzo (dettagli nelle note private).
depth: 'card'
draft: true
tags: ['supporti', 'organizer']
# Nessun blocco `print`: i default dello schema dichiarerebbero stampante e
# software che per questo progetto non sono documentati. Materiale, grammi e
# tempi non ci sono (nessun 3MF o G-code). Il numero di varianti sta nel testo.
---

## Il progetto

Ogni variante è un pezzo unico: un solo guscio chiuso. Una piastra posteriore
da 3 mm sale 15 mm sopra i vani. Pareti laterali e fondo sono da 2,5 mm, e
nelle varianti a due vani un divisorio da 3 mm separa i vani.

Sul fronte di ogni vano c’è una finestra larga 18 mm, con il fondo a
semicerchio. Sotto la finestra il fronte è chiuso. Nella piastra, sull’asse di
ogni vano, ci sono due fori da 3,4 mm svasati sul lato interno: uno al 30% e
uno al 70% dell’altezza delle pareti, misurata dalla base del pezzo, in tutte e
quattro le varianti.

Anche il nome del file segue i vani: «porta-telecomandi» per le due varianti a
due vani, «porta-telecomando» per le due a un vano.

## Le varianti

Da una variante all’altra cambiano le misure esterne, il numero di vani e la
loro misura. Restano uguali la piastra da 3 mm, pareti e fondo da 2,5 mm, la
finestra e la regola dei fori. Lo spessore del fronte cambia: 2,5, 3,5 o 7,5 mm.

| Variante | Vani | Ingombro (L × A × P, mm) | Vano interno (L × P, mm) | Altezza pareti (mm) | Altezza interna (mm) | Fronte chiuso fino a (mm) |
|---|---|---|---|---|---|---|
| A | 2 | 87 × 90 × 21 | 39,5 × 14,5 e 39,5 × 15,5 | 75 | 72,5 | 28 |
| B | 2 | 96 × 110 × 38 | 43,5 × 32,5 e 44,5 × 27,5 | 95 | 92,5 | 35 |
| C | 1 | 44,5 × 75 × 22 | 39,5 × 16,5 | 60 | 57,5 | 22 |
| D | 1 | 50,5 × 130 × 22 | 45,5 × 16,5 | 115 | 112,5 | 43 |

Nelle varianti a due vani i vani sono diversi fra loro. Nella variante A
cambiano la profondità, 14,5 e 15,5 mm, e lo spessore del fronte, 3,5 e 2,5 mm.
Nella variante B cambiano la larghezza, la profondità e lo spessore
del fronte, 2,5 e 7,5 mm.
