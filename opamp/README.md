# Amplificatore operazionale

- `contenuto_mappa.js` + `img/` → `~/Documenti/Mappa_amplificatore_operazionale.pdf` (2026-11-10).
- `spiegazione.js` + `img/` (anche `modello.svg`, `caratteristica.svg`) → `~/Documenti/Spiegazione_amplificatore_operazionale.pdf` (2026-11-11): spiegazione completa da libro e appunti Saber, con dimostrazioni, esempi, domande e correzioni agli appunti.
- `verifica.py`: risolve ogni circuito con guadagno finito e fa il limite, più passaggi ed esempi della spiegazione (38/38).
- `strumenti/ritaglia_circuiti.py`: ritaglia i circuiti come PNG dalla vecchia mappa fitta (generatore perso), salvata in `~/Documenti/Backup/mappe-opamp-2026-11-10/Mappa_esame_amplificatore_operazionale.pdf`.
- `strumenti/mappa_esame_opamp.py`: toglieva da quella mappa i passaggi "⇐" e la legenda; serve solo come esempio di ritocco di un PDF.

Tolti rispetto alla vecchia mappa: CMRR, resistenza d'uscita ad anello chiuso, compensazione LM301A, definizioni di Ibias/Ios, note su alimentazione e usi.

Dalla radice del repo:

    node genera_mappa.js opamp ~/Documenti/Mappa_amplificatore_operazionale.pdf
    node genera_doc.js opamp/spiegazione.js ~/Documenti/Spiegazione_amplificatore_operazionale.pdf
    venv/bin/python -I opamp/verifica.py
    venv/bin/python -I opamp/strumenti/ritaglia_circuiti.py <vecchia_mappa.pdf> opamp/img
