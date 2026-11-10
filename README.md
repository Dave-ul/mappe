# Mappe di studio

Mappe di formule da ricopiare a mano e portare in verifica e all'esame di Stato come strumento compensativo: una sola mappa per argomento, 1 foglio A4 fronte-retro con il testo grande come la scrittura a mano. Criteri (ordinanza d'esame, Linee guida DSA 2011, vademecum DSA del Majorana) e procedura nella skill `mappe-studio`.

| Cartella | Mappa | Altro |
|---|---|---|
| `integrali/` | `~/Documenti/Mappa_integrali.pdf` | prova, soluzioni e spiegazione |
| `opamp/` | `~/Documenti/Mappa_amplificatore_operazionale.pdf` | circuiti in `img/` |

In comune nella radice:

- `genera_mappa.js`: mappa da `<argomento>/contenuto_mappa.js`, stampata in PDF con Brave (puppeteer-core). Stampa lo spazio libero di ogni facciata (se è negativo, sfora) e segnala le formule fuori dal riquadro. Il contenuto ha riquadri con righe (`b`, anche HTML come `<img>`), tabelle vedo→uso (`tab`, `intest`, `gruppi`), catene di passi (`flow`), alberi decisionali (`albero`) e righe finali (`dopo`), con formule KaTeX; `facciate.scala = 1.45` dà il corpo 12 pt.
- `genera_doc.js`: documenti a scorrimento (prove, soluzioni, spiegazioni; blocchi descritti nell'intestazione del file).
- `strumenti/controlla_esame.sh <file.pdf>`: parole vietate dai criteri d'esame e righe con "⇐" da guardare a mano.
- `strumenti/togli_rif.py`: toglie i rimandi al libro da un PDF senza generatore.
- `strumenti/render_saber.py`: converte le note Saber `.sbn2` (BSON) in PNG.

Uso:

    npm install
    node genera_mappa.js integrali ~/Documenti/Mappa_integrali.pdf
    node genera_mappa.js opamp ~/Documenti/Mappa_amplificatore_operazionale.pdf
    strumenti/controlla_esame.sh ~/Documenti/Mappa_*.pdf
    python3 -m venv venv && venv/bin/pip install sympy pymupdf pymongo pillow
    venv/bin/python -I integrali/verifica.py
    venv/bin/python -I opamp/verifica.py

Per un argomento nuovo: crea `<argomento>/contenuto_mappa.js` partendo da uno dei due e, se servono, `<argomento>/img/` e `<argomento>/verifica.py`.

La storia dei vecchi repo `mappe-integrali` e `mappe-opamp` è unita a questa (2026-11-10).
