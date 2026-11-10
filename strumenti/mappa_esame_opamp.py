"""Versione per l'esame di Stato della mappa definitiva sull'amplificatore operazionale (generatore perso).
Toglie dal PDF i passaggi "⇐" (dimostrazioni), la legenda "a memoria / si ricava" e la riga "All'interrogazione";
lascia circuiti, formule nei riquadri e i rimandi "da N", "da I".
Uso: python -I mappa_esame_opamp.py <Mappa_definitiva_amplificatore_operazionale.pdf> <uscita.pdf>"""
import sys
import pymupdf

# Zone (pagina, x0, y0, x1, y1) in punti: si cancella ogni pezzo di testo il cui centro cade nella zona,
# tranne quelli dentro un riquadro di formula.
ZONE = [
    (0, 303, 92, 560, 119),    # CCV: perché v+ = v- e i = 0
    (0, 143, 296, 300, 321.5), # non invertente: partitore e CCV
    (0, 419, 296, 560, 321.8), # invertente: massa virtuale e somma delle correnti
    (0, 399, 390, 560, 417),   # corrente -> tensione
    (0, 143, 470, 300, 494.5), # sommatore invertente
    (0, 419, 470, 570, 508),   # sommatore non invertente
    (0, 143, 606, 400, 652),   # differenziale a 1 stadio ("Sommo:")
    (0, 208, 694, 490, 769),   # differenziale a 3 stadi
    (1, 144, 75, 300, 101),    # V->I carico fuori massa
    (1, 144, 118, 300, 132),
    (1, 430, 75, 570, 114),    # V->I carico a massa
    (1, 303, 146, 560, 160),
    (1, 303, 180, 489, 194),  # tiene "entro ±Vsat" dopo il riquadro
    (1, 303, 276, 560, 289),   # resistenza d'uscita ad anello chiuso
    (1, 26, 266, 200, 281),    # tensione di offset
    (1, 142, 358, 560, 417),   # correnti di polarizzazione
    (1, 26, 511, 230, 538),    # slew rate
    (1, 144, 625, 156, 639),   # prodotto guadagno-banda: solo la freccia
    (1, 303, 546, 560, 560),   # CMRR
    (1, 20, 724, 420, 737),    # "All'interrogazione: ..."
]
LEGENDA = (340, 19, 572, 34)
TITOLI_SEZIONE = {"1. Si parte da qui": "1. Modello e metodo", "2. Si ricava tutto il resto": "2. Configurazioni"}
NUOVA_LEGENDA = "⇐ si collega a"
MAX_RIQUADRO_FORMULA = (330, 45)  # larghezza e altezza massime di un riquadro di formula


def riquadri_formula(page):
    """Rettangoli disegnati piccoli: i riquadri delle formule da non toccare."""
    w_max, h_max = MAX_RIQUADRO_FORMULA
    out = []
    for d in page.get_drawings():
        r = d["rect"]
        if d.get("color") is not None and 8 < r.width < w_max and 6 < r.height < h_max:
            out.append(r)
    return out


def pezzi(page):
    for b in page.get_text("rawdict")["blocks"]:
        for l in b.get("lines", []):
            for s in l["spans"]:
                if "".join(c["c"] for c in s["chars"]).strip():
                    yield pymupdf.Rect(s["bbox"])


def segna(page, zone, protetti):
    n = 0
    for r in pezzi(page):
        c = (r.tl + r.br) / 2
        if not any(c in z for z in zone) or any(c in p for p in protetti):
            continue
        y = c.y
        page.add_redact_annot(pymupdf.Rect(r.x0 + 0.2, y - 0.8, r.x1 - 0.2, y + 0.8), fill=False)
        n += 1
    return n


def main(ingresso, uscita):
    doc = pymupdf.open(ingresso)
    totale = 0
    for i, page in enumerate(doc):
        zone = [pymupdf.Rect(z[1:]) for z in ZONE if z[0] == i]
        totale += segna(page, zone, riquadri_formula(page))
        page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                              text=pymupdf.PDF_REDACT_TEXT_REMOVE)
        # Legenda: via testo e riquadretti, poi la nuova.
        page.add_redact_annot(pymupdf.Rect(LEGENDA), fill=(1, 1, 1))
        page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                              graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED,
                              text=pymupdf.PDF_REDACT_TEXT_REMOVE)
        page.insert_htmlbox(pymupdf.Rect(LEGENDA[0], 22, LEGENDA[2], 34),
                            f'<div style="text-align:right;font-size:7pt;color:#333;font-family:sans-serif">{NUOVA_LEGENDA}</div>')
        for vecchio, nuovo in TITOLI_SEZIONE.items():
            for r in page.search_for(vecchio):
                page.add_redact_annot(pymupdf.Rect(r.x0, r.y0 + 1, r.x1, r.y1 - 1), fill=(17 / 255, 17 / 255, 17 / 255))  # #111 come la barra
                page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                                      graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                                      text=pymupdf.PDF_REDACT_TEXT_REMOVE)
                page.insert_htmlbox(pymupdf.Rect(r.x0, r.y0 - 1, r.x0 + 300, r.y1 + 2),
                                    f'<div style="color:#fff;font-weight:bold;font-size:9.5pt;font-family:sans-serif">{nuovo}</div>')
        if i == 0:
            for r in page.search_for(": mappa definitiva"):
                page.add_redact_annot(r, fill=(1, 1, 1))
            page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                                  text=pymupdf.PDF_REDACT_TEXT_REMOVE)
    doc.save(uscita, garbage=3, deflate=True)
    print("pezzi di testo tolti:", totale)


if __name__ == "__main__":
    main(*sys.argv[1:3])
