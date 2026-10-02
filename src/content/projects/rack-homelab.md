---
title: 'Rack homelab da 10 pollici'
status: 'in-sviluppo'
category: 'su-misura'
date: 2026-09-28
summary: 'Rack da 10 pollici e 15 unità per gli apparecchi di rete di casa: telaio in profilo 4040, 35 parti stampate, porta in acrilico con cerniere stampate.'
headline: 'Un rack da 10 pollici che si chiude, disegnato sui miei apparecchi.'
proof: 'NAS, mini PC, switch e router stanno in 302 x 380 x 840 mm: telaio in profilo 4040, 15 unità da 10 pollici, porta in acrilico fumé con cerniere stampate che si sfila alzandola. **Il modello ha 132 corpi e nessuna interferenza**, anche con la porta aperta da 0 a 90 gradi. Non è ancora montato: si parte dal provino delle tolleranze.'
boundary: 'Non è ancora stampato né montato: le immagini sono il modello in Fusion.'
trait: 'Porta con cerniere stampate'
origin: 'originale'
context: 'personale'
depth: 'scheda'
featured: true
order: 1
tags: ['supporti', 'multi-pezzo']
cover:
  src: '../../assets/projects/rack-homelab/rack-homelab-iso.png'
  alt: 'Render CAD del rack aperto in vista isometrica: telaio nero, guide e mensole stampate, apparecchi sui ripiani, router in cima'
  caption: 'Aperto, senza lastre né porta: guide, cornici e mensole stampate sul telaio in profilo 4040.'
  kind: 'render-cad'
gallery:
  - src: '../../assets/projects/rack-homelab/rack-homelab-chiuso.png'
    alt: 'Render CAD del rack chiuso, con le lastre laterali e la porta in acrilico fumé'
    caption: 'Chiuso: due lastre laterali da 3 mm e la porta in acrilico fumé da 4 mm, con 15 feritoie.'
    kind: 'render-cad'
  - src: '../../assets/projects/rack-homelab/rack-homelab-porta-aperta.png'
    alt: 'Render CAD del rack con la porta aperta a 90 gradi verso sinistra'
    caption: 'La porta aperta a 90 gradi: resta dentro la sagoma del rack, per stare vicino al muro.'
    kind: 'render-cad'
  - src: '../../assets/projects/rack-homelab/rack-homelab-fronte.png'
    alt: 'Render CAD frontale del rack aperto, con i vani da 10 pollici uno sopra l’altro'
    caption: 'Di fronte: dal basso il NAS, gli alimentatori con due ventole, il secondo NAS; in cima il router.'
    kind: 'render-cad'
  - src: '../../assets/projects/rack-homelab/rack-homelab-cerniera.png'
    alt: 'Render CAD ravvicinato di una cerniera stampata tra la colonna sinistra e la porta'
    caption: 'La cerniera stampata: il perno è una vite M5x40, la porta si sfila alzandola di 20 mm.'
    kind: 'render-cad'
    fit: 'cover'
  - src: '../../assets/projects/rack-homelab/rack-homelab-angolo.png'
    alt: 'Render CAD ravvicinato dell’angolo in basso: guida stampata sul montante e piedino'
    caption: 'L’angolo in basso: la guida stampata con gli inserti M5 sul montante e il piedino.'
    kind: 'render-cad'
    fit: 'cover'
print:
  materials: ['PETG']
  printer: 'Bambu Lab X2D'
  software: ['Autodesk Fusion']
  pieces: 77
---

## Il problema

Gli apparecchi di rete di casa (due NAS, un mini PC, uno switch, il router, un
bridge per le luci) vanno in un rack da 10 pollici chiuso da lastre e porta,
ventilato, con il fianco sinistro e il retro contro il muro.

## I vincoli

- **Il profilo che avevo.** Quattro barre di profilo 4040 da 400 mm, che ho
  misurato: cava da 8, labbro 3,5, foro centrale 6,5. Sono diventate i quattro
  longheroni da 300.
- **Lo standard.** Guide da 10 pollici con i fori a 236,5 mm, unità da 44,45 mm:
  15 unità utili.
- **Il muro.** Cerniere a sinistra, maniglia e calamite a destra, retro aperto.
  Durante l’apertura la cerniera sporge oltre il fianco: il fianco sinistro va
  tenuto ad almeno 2 cm dal muro.
- **Il piatto.** Ogni parte deve entrare nel piatto della stampante, senza
  sbalzi critici.

## Il progetto

Il progetto è mio, fatto con Claude: misure e scelte sono mie, la geometria e i
controlli sono script Python per Autodesk Fusion scritti con Claude. Ogni quota
sta in un solo file di parametri, e cambiare una misura vuol dire rigenerare le
parti.

Il telaio misura 302 x 380 x 840 mm: 4 montanti da 840, 6 traverse da 222, 4
longheroni da 300 e 20 squadrette. Sui montanti ci sono le guide stampate, con
gli inserti M5 a caldo. Dal basso: il NAS a 4 dischi in una cornice da 5 unità,
il mini PC, una mensola con gli alimentatori e due ventole da 80, il secondo NAS
con il bridge, lo switch, il patch panel. Il router sta sopra, appeso a una
parete stampata, e una ventola da 140 estrae l’aria dalla piastra superiore.

La porta è una lastra di acrilico fumé da 4 mm, 306 x 760, con 15 feritoie in
tre gruppi. Le cerniere le ho volute stampate invece che metalliche: su una
lastra acrilica andavano comunque avvitate passanti, e così l’asse sta dove serve
per aprire vicino al muro. Il perno è una vite M5x40 con il dado incassato.
La maniglia sul bordo destro chiude con due calamite.

## Cosa è verificato, e cosa no

Sul modello: nessuna interferenza fra i 132 corpi. Il controllo trova
un’interferenza quando la porta viene spostata apposta di 2 mm. È verificata
anche la porta aperta da 0 a 90 gradi, a passi di 10: nessun urto. Le parti stampate sono
35 file, 77 stampe in PETG, e tutte entrano nel piatto.

Non è ancora montato. Il primo pezzo da stampare è un provino di tolleranza: da
quello si fissano il foro degli inserti, il gioco delle viti M5 e la linguetta
che entra nella cava del profilo.

## Supporti di altri autori

Nei vani del mini PC, dello switch e del patch panel vanno tre supporti
pubblicati da altri autori, e per questo nei render non compaiono:

- mini PC: [Lenovo ThinkCentre Tiny 10" Rack Mount](https://makerworld.com/it/models/1945283-lenovo-thinkcentre-tiny-10-rack-mount-m720q)
  di Tim (@Timmi101), MakerWorld, CC BY-SA 4.0;
- switch: [10" Rack Mount 1U Netgear GS308EPP](https://www.printables.com/model/1369319-10-rack-mount-1u-netgear-gs308epp)
  di Pablo (@pablo_1344153), Printables, CC BY-NC-SA 4.0;
- patch panel: [10-inch 1U Keystone patchpanel (8) with vent holes](https://makerworld.com/it/models/1744531-10-inch-1u-keystone-patchpanel-8-with-vent-holes)
  di matataa, remix di due modelli di Mauker, MakerWorld, CC BY-NC-SA 4.0.

Il telaio misto, profilo più parti stampate, ha come riferimento di stile il
[KWS Rack v.2](https://makerworld.com/it/models/2139130-kws-rack-v-2-heavy-duty-10-inch-homelab-rack)
di Ilan Kushnir: nessun suo file è usato.
