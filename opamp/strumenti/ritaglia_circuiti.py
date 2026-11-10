"""Ritaglia i circuiti dalla vecchia mappa op-amp (generatore perso) come PNG per contenuto_mappa.js.
Uso: python -I ritaglia_circuiti.py <vecchia_mappa.pdf> <cartella_img>"""
import sys
from pathlib import Path
import pymupdf

DPI = 300
# nome: (pagina, x0, y0, x1, y1) in punti
RITAGLI = {
    "non_invertente": (0, 26, 270, 140, 320),
    "invertente": (0, 302, 270, 418, 322),
    "buffer": (0, 26, 391, 118, 434),
    "corrente_tensione": (0, 309, 391, 396, 441),
    "sommatore_inv": (0, 26, 468, 138, 530),
    "sommatore_non_inv": (0, 302, 468, 418, 532),
    "differenziale": (0, 26, 607, 140, 671),
    "strumentazione": (0, 26, 695, 205, 785),
    "vi_fuori_massa": (1, 26, 76, 138, 136),
    "vi_a_massa": (1, 302, 76, 428, 143),
    "polarizzazione": (1, 26, 342, 140, 405),
    "gbp": (1, 26, 607, 141, 670),
}


def main(pdf, cartella):
    doc = pymupdf.open(pdf)
    out = Path(cartella)
    out.mkdir(parents=True, exist_ok=True)
    for nome, (p, *r) in RITAGLI.items():
        doc[p].get_pixmap(clip=pymupdf.Rect(r), dpi=DPI).save(out / f"{nome}.png")
    print("ritagli:", len(RITAGLI))


if __name__ == "__main__":
    main(*sys.argv[1:3])
