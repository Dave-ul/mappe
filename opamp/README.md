# Amplificatore operazionale

- `contenuto_mappa.js` + `img/` → `~/Documenti/Mappa_amplificatore_operazionale.pdf` (2026-11-10).
- `spiegazione.js` + `img/` (anche `modello.svg`, `caratteristica.svg`) → `~/Documenti/Spiegazione_amplificatore_operazionale.pdf` (2026-11-11): spiegazione completa da libro e appunti Saber, con dimostrazioni, esempi, domande e correzioni agli appunti.
- `mappa_mentale.js` + `img/` → `~/Documenti/Mappa_mentale_amplificatore_operazionale.pdf` (2026-11-12): stessi contenuti come mappa mentale (A4 orizzontale fronte-retro, rami numerati in senso orario, derivati come foglie del ramo da cui vengono), con `genera_mentale.js`.
- `verifica.py`: risolve ogni circuito con guadagno finito e fa il limite, più passaggi ed esempi della spiegazione (36/36).
- `strumenti/ritaglia_circuiti.py`: ritaglia i circuiti come PNG dalla vecchia mappa fitta (generatore perso), salvata in `~/Documenti/Backup/mappe-opamp-2026-11-10/Mappa_esame_amplificatore_operazionale.pdf`.
- `strumenti/mappa_esame_opamp.py`: toglieva da quella mappa i passaggi "⇐" e la legenda; serve solo come esempio di ritocco di un PDF.

Tolti rispetto alla vecchia mappa: CMRR, amplificatore per strumentazione (differenziale a tre stadi, tolto su richiesta il 2026-11-14), resistenza d'uscita ad anello chiuso, compensazione LM301A, definizioni di Ibias/Ios, note su alimentazione e usi.

Dalla radice del repo:

    node genera_mappa.js opamp ~/Documenti/Mappa_amplificatore_operazionale.pdf
    node genera_mentale.js opamp ~/Documenti/Mappa_mentale_amplificatore_operazionale.pdf
    node genera_doc.js opamp/spiegazione.js ~/Documenti/Spiegazione_amplificatore_operazionale.pdf
    venv/bin/python -I opamp/verifica.py
    venv/bin/python -I opamp/strumenti/ritaglia_circuiti.py <vecchia_mappa.pdf> opamp/img
