#!/usr/bin/env bash
# Controlla che una mappa PDF rispetti i criteri per l'esame di Stato (vedi skill mappe-studio).
# Esce con 1 se trova parole vietate; elenca le righe con "⇐" da guardare a mano (ammessi solo collegamenti brevi).
# Uso: controlla_esame.sh mappa.pdf [altre.pdf...]
set -euo pipefail

VIETATE='libro|quaderno|pp\.|cap\.|\([0-9]+\.[0-9]+\)|a memoria|si ricava|interrogazion|dimostra|\bDim\b|esempio|esercizio|svolto|passaggi'

esito=0
for pdf in "$@"; do
    [[ -f "$pdf" ]] || { echo "manca: $pdf" >&2; exit 2; }
    testo=$(pdftotext -layout "$pdf" -)
    echo "== $pdf ($(pdfinfo "$pdf" | awk '/^Pages/ {print $2}') facciate)"
    if trovate=$(grep -n -i -E "$VIETATE" <<<"$testo"); then
        echo "VIETATE:"; cut -c1-160 <<<"$trovate"; esito=1
    else
        echo "parole vietate: nessuna"
    fi
    echo "righe con ⇐ (solo collegamenti, niente passaggi):"
    grep '⇐' <<<"$testo" | sed -E 's/ {2,}/  /g' | cut -c1-160 || echo "  nessuna"
done
exit $esito
