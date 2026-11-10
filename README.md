# Mappe integrali indefiniti

Generatore di `~/Documenti/Mappa_integrali.pdf`: una sola mappa, 1 foglio A4 fronte-retro, con il testo grande come la scrittura a mano, da ricopiare a mano e portare in verifica e all'esame (criteri nella skill mappe-studio). Dal 2026-11-10 sostituisce le vecchie due versioni (6 facciate da ricopiare + definitiva fitta), i cui file sono in `~/Documenti/Backup/mappe-integrali-due-versioni-2026-11-10`.

- `contenuto_mappa.js`: riquadri con righe (`b`), tabelle vedo→uso (`tab`, `intest`, `gruppi`), catene di passi (`flow`), alberi decisionali (`albero`), righe finali (`dopo`); formule KaTeX. `facciate.scala = 1.45` dà il corpo 12 pt; `facciate.legenda` è il testo in alto a destra.
- `genera_mappa.js`: HTML + stampa con Brave (puppeteer-core). Stampa lo spazio libero in fondo a ogni facciata (se è negativo, sfora) e segnala le formule fuori dal riquadro.
- `verifica.py`: controlla con sympy ogni primitiva (deriva e confronta): 38/38.
- `render_saber.py`: converte le note Saber `.sbn2` (BSON) in PNG.

Uso:

    npm install
    node genera_mappa.js ~/Documenti/Mappa_integrali.pdf
    strumenti/controlla_esame.sh ~/Documenti/Mappa_integrali.pdf
    python3 -m venv venv && venv/bin/pip install sympy pymongo pillow
    venv/bin/python -I verifica.py

## Prova e spiegazione (2026-11-10)

- `prova.js`, `soluzioni.js`, `spiegazione.js`: contenuto di `~/Documenti/Prova_integrali.pdf` (2 pagine, 100 punti, parti A-H), `Prova_integrali_soluzioni.pdf` (3 pagine) e `Spiegazione_integrali.pdf` (3 pagine).
- `genera_doc.js`: generatore a scorrimento per questi tre (blocchi titolo, sez, p, es, box, sol, tab, due, salto; vedi l'intestazione del file). Segnala formule fuori dal contenitore.
- `verifica_prova.py`: controlla con sympy tutti i risultati della prova e gli esempi della spiegazione (56/56).

    node genera_doc.js prova.js ~/Documenti/Prova_integrali.pdf
    node genera_doc.js soluzioni.js ~/Documenti/Prova_integrali_soluzioni.pdf
    node genera_doc.js spiegazione.js ~/Documenti/Spiegazione_integrali.pdf
    venv/bin/python -I verifica_prova.py

## Strumenti

- `strumenti/mappa_esame_opamp.py`: toglie dal PDF op-amp (generatore perso) i passaggi "⇐", la legenda e la riga "All'interrogazione".
  `python -I strumenti/mappa_esame_opamp.py ~/Documenti/Mappa_definitiva_amplificatore_operazionale.pdf ~/Documenti/Mappa_esame_amplificatore_operazionale.pdf`
- `strumenti/controlla_esame.sh <file.pdf>`: cerca nel PDF le parole vietate dai criteri d'esame (libro, quaderno, dimostrazioni, esempi, "a memoria"...) ed elenca le righe con "⇐" da guardare a mano.
