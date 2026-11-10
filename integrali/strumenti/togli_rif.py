"""Toglie dalla mappa i riferimenti al libro: numeri delle formule (6.x), legenda "(6.x) libro", etichette (a) (b).
Cancella solo il testo (niente riempimento), così bordi e schemi restano intatti.
Uso: python -I togli_rif.py <ingresso.pdf> <uscita.pdf>"""
import re, sys
import pymupdf

RIF = re.compile(r"\(6\.(\d+|x)\)|^libro$|^\((a|b)\)$")

def rettangoli(page):
    trovati = []
    for x0, y0, x1, y1, t, *_ in page.get_text("words"):
        m = RIF.search(t)
        if not m:
            continue
        # Rettangolo della sola parte che corrisponde (esclude la punteggiatura dopo, es. "(6.5),").
        for r in page.search_for(m.group(0), clip=pymupdf.Rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1)):
            trovati.append((m.group(0), r))
    return trovati

def main(ingresso, uscita):
    doc = pymupdf.open(ingresso)
    totale = 0
    for page in doc:
        for testo, r in rettangoli(page):
            margine = min(0.6, r.height * 0.1)
            page.add_redact_annot(pymupdf.Rect(r.x0 + 0.3, r.y0 + margine, r.x1 - 0.3, r.y1 - margine), fill=False)
            totale += 1
        page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                              text=pymupdf.PDF_REDACT_TEXT_REMOVE)
    doc.save(uscita, garbage=3, deflate=True)
    print("riferimenti tolti:", totale)

if __name__ == "__main__":
    main(*sys.argv[1:3])
