# Mappa amplificatore operazionale

Generatore di `~/Documenti/Mappa_amplificatore_operazionale.pdf` (2026-11-10): una sola mappa, 1 foglio A4 fronte-retro con il testo grande come la scrittura a mano, da ricopiare a mano e portare in verifica e all'esame (criteri nella skill mappe-studio). Stesso generatore di `mappe-integrali`.

- `contenuto_mappa.js`: riquadri, formule KaTeX e circuiti (`img/`). `facciate.scala = 1.45` = corpo 12 pt.
- `genera_mappa.js`: HTML + stampa con Brave (puppeteer-core); stampa lo spazio libero di ogni facciata.
- `verifica.py`: risolve ogni circuito con guadagno finito e fa il limite (16/16).
- `strumenti/ritaglia_circuiti.py`: ritaglia i circuiti come PNG dalla vecchia mappa (generatore perso), salvata in `~/Documenti/Backup/mappe-opamp-2026-11-10/Mappa_esame_amplificatore_operazionale.pdf`.
- `strumenti/controlla_esame.sh`: parole vietate dai criteri d'esame e righe con "⇐" da guardare.

Tolti rispetto alla vecchia mappa fitta: CMRR, resistenza d'uscita ad anello chiuso, compensazione LM301A, definizioni di Ibias/Ios, note su alimentazione e usi.

Uso:

    npm install
    node genera_mappa.js ~/Documenti/Mappa_amplificatore_operazionale.pdf
    strumenti/controlla_esame.sh ~/Documenti/Mappa_amplificatore_operazionale.pdf
    python -I verifica.py   # serve sympy
    python -I strumenti/ritaglia_circuiti.py <vecchia_mappa.pdf> img   # serve pymupdf
