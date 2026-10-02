"""Cattura un set standard di viste dal documento Fusion attivo.

Non si esegue da riga di comando: il contenuto viene passato a Fusion
attraverso `fusion_mcp_execute` (featureType "script"). Questa copia esiste
perche' la pipeline sia riproducibile e rivedibile insieme al resto del repo.

Le immagini escono in PNG con canale alpha, sfondo trasparente: lo stesso file
funziona su fondo chiaro e su fondo scuro. L'inquadratura fine non si fa qui
ma in `scripts/prepare-renders.mjs`, che ritaglia sul contenuto e ricentra.
"""

import os

import adsk.core

# Le viste del set minimo. `iso` e' quella che diventa copertina della card.
VIEWS = {
    'iso': adsk.core.ViewOrientations.IsoTopRightViewOrientation,
    'front': adsk.core.ViewOrientations.FrontViewOrientation,
    'top': adsk.core.ViewOrientations.TopViewOrientation,
    'right': adsk.core.ViewOrientations.RightViewOrientation,
}

# Sovracampionato: `prepare-renders.mjs` ritaglia e riduce, quindi qui conviene
# partire larghi per non perdere definizione sul pezzo.
WIDTH = 2400
HEIGHT = 1800


def capture(out_dir, slug, views=('iso', 'front', 'top')):
    app = adsk.core.Application.get()
    viewport = app.activeViewport
    os.makedirs(out_dir, exist_ok=True)

    written = []
    for name in views:
        camera = viewport.camera
        camera.viewOrientation = VIEWS[name]
        camera.isFitView = True
        viewport.camera = camera
        viewport.refresh()
        adsk.doEvents()

        path = os.path.join(out_dir, '{}-{}.png'.format(slug, name))
        options = adsk.core.SaveImageFileOptions.create(path)
        options.width = WIDTH
        options.height = HEIGHT
        options.isAntiAliased = True
        options.isBackgroundTransparent = True

        viewport.saveAsImageFileWithOptions(options)
        written.append((name, os.path.getsize(path) if os.path.exists(path) else 0))

    return app.activeDocument.name, written
