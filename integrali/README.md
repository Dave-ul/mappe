# Integrali indefiniti

- `contenuto_mappa.js` → `~/Documenti/Mappa_integrali.pdf` (2026-11-10). Le vecchie due versioni (6 facciate da ricopiare + definitiva fitta) sono nella storia git e in `~/Documenti/Backup/mappe-integrali-due-versioni-2026-11-10`.
- `verifica.py`: controlla con sympy ogni primitiva (deriva e confronta): 38/38.
- `prova.js`, `soluzioni.js`, `spiegazione.js` → `~/Documenti/Prova_integrali.pdf` (2 pagine, 100 punti, parti A-H), `Prova_integrali_soluzioni.pdf` e `Spiegazione_integrali.pdf`.
- `verifica_prova.py`: controlla con sympy i risultati della prova e gli esempi della spiegazione (56/56).

Dalla radice del repo:

    node genera_mappa.js integrali ~/Documenti/Mappa_integrali.pdf
    node genera_doc.js integrali/prova.js ~/Documenti/Prova_integrali.pdf
    node genera_doc.js integrali/soluzioni.js ~/Documenti/Prova_integrali_soluzioni.pdf
    node genera_doc.js integrali/spiegazione.js ~/Documenti/Spiegazione_integrali.pdf
    venv/bin/python -I integrali/verifica.py
    venv/bin/python -I integrali/verifica_prova.py
