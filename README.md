# Mappe integrali indefiniti

Generatore di `~/Documenti/Mappe_da_ricopiare_integrali.pdf` (6 facciate) e di `~/Documenti/Mappa_definitiva_integrali.pdf` (1 foglio fronte-retro), 2026-11-08.

- `contenuto.js`: testo e formule delle 6 facciate (KaTeX, `$...$` e `$$...$$`; una riga che inizia con `$=`, `$+` o `$-` va rientrata).
- `genera.js`: HTML + stampa con Brave (puppeteer-core). Segnala facciate che sforano e formule fuori dal riquadro.
- `contenuto_definitivo.js` + `genera_definitiva.js`: versione su 1 foglio (bordo spesso = a memoria, sottile = si ricava, ⇐ = da dove viene). Il generatore stampa lo spazio libero in fondo a ogni facciata: se è negativo, sfora.
- `verifica.py`: controlla con sympy ogni primitiva usata nelle mappe (deriva e confronta).
- `render_saber.py`: converte le note Saber `.sbn2` (BSON) in PNG.

Uso:

    npm install
    node genera.js ~/Documenti/Mappe_da_ricopiare_integrali.pdf
    node genera_definitiva.js ~/Documenti/Mappa_definitiva_integrali.pdf
    python3 -m venv venv && venv/bin/pip install sympy pymongo pillow
    venv/bin/python -I verifica.py
