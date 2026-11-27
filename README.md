# Mappe di studio

Mappe di formule da ricopiare a mano e portare in verifica e all'esame di Stato come strumento compensativo: una sola mappa per argomento, 1 foglio A4 fronte-retro con il testo grande come la scrittura a mano. Criteri (ordinanza d'esame, Linee guida DSA 2011, vademecum DSA del Majorana) e procedura nella skill `mappe-studio`.

| Cartella | Mappa | Altro |
|---|---|---|
| `integrali/` | `~/Documenti/Scuola/Mappe/Mappa_integrali.pdf` | prova, soluzioni e spiegazione |
| `opamp/` | `~/Documenti/Scuola/Mappe/Mappa_amplificatore_operazionale.pdf` | spiegazione, circuiti in `img/` |
| `inglese-unit13-15/` | `~/Documenti/Scuola/Mappe/Mappa_inglese_unit13-15.pdf` | Electronics, Unit 13 e 15; spiegazione |
| `tpsee/` | `~/Documenti/Scuola/Mappe/Mappa_TPSEE.pdf` | TPSEE (motore in c.c., basi, passo-passo, acquisizione), solo appunti Saber; spiegazione, schemi SVG in `img/`, `verifica.py` |
| `tpsee2/` | `~/Documenti/Scuola/Mappe/Mappa_TPSEE_2.pdf` | secondo foglio TPSEE: encoder e motore in c.c. dinamico (Laplace, schema a blocchi, collaudo), dal libro (foto della classe); schemi SVG in `img/` usati anche dalla spiegazione di `tpsee/`, `verifica.py` |
| `sistemi-2ordine/` | `~/Documenti/Scuola/Mappe/Mappa_sistemi_secondo_ordine.pdf` | Sistemi Automatici, sistemi del secondo ordine (libro Hoepli Unità H2 + quaderno 5/11 e 12/11); spiegazione unica per l'interrogazione su Moduli G e H (comincia con `sistemi-laplace/spiegazione_g_h1.js`) con gli esercizi del libro, grafici calcolati in `img/`, `verifica.py` |
| `sistemi-laplace/` | `~/Documenti/Scuola/Mappe/Mappa_sistemi_laplace.pdf` | Sistemi Automatici, primo foglio per l'interrogazione su Moduli G e H: Laplace (G1, G2) e f.d.t. con risposte (H1), dal libro Hoepli; ordinato come il discorso, `verifica.py`. Il secondo foglio è `sistemi-2ordine/` (H2); H3 manca. `spiegazione_g_h1.js` (G1, G2, H1, grafici da `grafici.py` in `img/`) è la prima parte della spiegazione di `sistemi-2ordine/` |
| `laboratorio/` | `~/Documenti/Scuola/Mappe/Mappa_laboratorio_elettronica.pdf` | laboratorio di elettronica dal quaderno (foto) e dalle slide del prof; spiegazione, schemi SVG in `img/` (amplificatori da `disegna_circuiti.py`), `verifica.py` |
| `studio-funzione/` | `~/Documenti/Scuola/Mappe/Mappa_studio_di_funzione.pdf` | Matematica, foglio 1 (la procedura: dominio, asintoti, $f'$, $f''$, non derivabilità, discontinuità); spiegazione, grafici calcolati da `grafici.py` in `img/` (anche quelli del foglio 2), `verifica.py` per tutti e due i fogli |
| `studio-funzione2/` | `~/Documenti/Scuola/Mappe/Mappa_studio_di_funzione_2.pdf` | foglio 2 dello studio di funzione: derivate, limiti, forme indeterminate, disequazioni irrazionali, grafici elementari |

In comune nella radice:

- `genera_mappa.js`: mappa da `<argomento>/contenuto_mappa.js`, stampata in PDF con Brave (puppeteer-core). Stampa lo spazio libero di ogni facciata (se è negativo, sfora) e segnala le formule fuori dal riquadro. Il contenuto ha riquadri con righe (`b`, anche HTML come `<img>`), tabelle vedo→uso (`tab`, `intest`, `gruppi`), catene di passi (`flow`), alberi decisionali (`albero`) e righe finali (`dopo`), con formule KaTeX; `facciate.scala = 1.45` dà il corpo 12 pt.
- `genera_mentale.js`: la stessa mappa come mappa mentale (nodo centrale, rami colorati numerati, foglie su curve; A4 orizzontale) da `<argomento>/mappa_mentale.js`; segnala ciò che esce dalla pagina o si sovrappone. Esempio: `opamp/mappa_mentale.js`.
- `genera_doc.js`: documenti a scorrimento (prove, soluzioni, spiegazioni; blocchi descritti nell'intestazione del file).
- `strumenti/controlla_esame.sh <file.pdf>`: parole vietate dai criteri d'esame e righe con "⇐" da guardare a mano.
- `strumenti/togli_rif.py`: toglie i rimandi al libro da un PDF senza generatore.
- `strumenti/render_saber.py`: converte le note Saber `.sbn2` (BSON) in PNG.
- `strumenti/saber.py`: tiene le note Saber allineate ai PDF. `saber.tsv` associa ogni PDF (relativo a `~/Documenti/Scuola`: `Mappe/…` o `Fonti/<Materia>/Spiegazioni/…`) alla sua nota (`Materia/AA-MM-GG Materia - Titolo`) e allo sha256 caricato l'ultima volta. `stato` dice cosa è cambiato o manca; `aggiorna` carica i PDF cambiati con la procedura della skill `note-saber` (Saber chiuso, sync prima e dopo, rifiuto se la nota ha tratti a mano, backup in `~/Documenti/Backup/saber-<data>-mappe`); `aggiungi <pdf> <nota>` mette un PDF nuovo nell'elenco. Test: `venv/bin/python -I strumenti/test_saber.py`.

Uso:

    npm install
    node genera_mappa.js integrali ~/Documenti/Scuola/Mappe/Mappa_integrali.pdf
    node genera_mappa.js opamp ~/Documenti/Scuola/Mappe/Mappa_amplificatore_operazionale.pdf
    strumenti/controlla_esame.sh ~/Documenti/Scuola/Mappe/Mappa_*.pdf
    python3 -m venv venv && venv/bin/pip install sympy pymupdf pymongo pillow
    venv/bin/python -I integrali/verifica.py
    venv/bin/python -I opamp/verifica.py
    venv/bin/python -I tpsee/verifica.py
    venv/bin/python -I laboratorio/verifica.py
    venv/bin/python -I tpsee2/verifica.py
    venv/bin/python -I sistemi-2ordine/verifica.py
    venv/bin/python -I sistemi-laplace/verifica.py
    venv/bin/python -I sistemi-laplace/grafici.py
    venv/bin/python -I studio-funzione/verifica.py
    venv/bin/python -I studio-funzione/grafici.py
    venv/bin/python -I strumenti/saber.py stato
    venv/bin/python -I strumenti/saber.py aggiorna

Per un argomento nuovo: crea `<argomento>/contenuto_mappa.js` partendo da uno dei due e, se servono, `<argomento>/img/` e `<argomento>/verifica.py`.

La storia dei vecchi repo `mappe-integrali` e `mappe-opamp` è unita a questa (2026-11-10).
