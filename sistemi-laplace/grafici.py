"""Grafici SVG calcolati (non disegnati a occhio) per la spiegazione di Laplace e f.d.t. (Unità H1 del libro).

Uso: venv/bin/python -I sistemi-laplace/grafici.py
Scrive sistemi-laplace/img/{gradino_rc,rampa_rc,svuotamento}.svg, nello stile di sistemi-2ordine/img.
Solo libreria standard: le curve sono polilinee campionate.
"""
import math
import pathlib

IMG = pathlib.Path(__file__).resolve().parent / "img"
LARG, ALT = 320, 190
X0, Y0 = 56, 165          # origine degli assi in pixel
X_FINE, Y_CIMA = 305, 12  # estremi utili degli assi
CAMPIONI = 300
TAU = 1.0
T_MAX = 5.0
BLU, ROSSO, GRIGIO = "#1f5fbf", "#c0392b", "#888"


class Grafico:
    def __init__(self, t_max, y_max, nome_y):
        self.sx = (X_FINE - X0) / t_max
        self.sy = (Y0 - Y_CIMA) / y_max
        self.pezzi = [
            f'<path d="M{X0} {Y0} H{X_FINE + 5} M{X0} {Y0} V6" stroke="#000" stroke-width="1.5" fill="none"/>',
            f'<text x="{X_FINE}" y="{Y0 + 16}" font-style="italic">t</text>',
            f'<text x="{X0 - 22}" y="14" font-style="italic">{nome_y}</text>',
        ]

    def p(self, t, y):
        return X0 + t * self.sx, Y0 - y * self.sy

    def curva(self, f, colore=BLU, spessore=2.2, t_fine=None, tratteggio="", t_inizio=0.0):
        t_fine = T_MAX if t_fine is None else t_fine
        ts = (t_inizio + (t_fine - t_inizio) * i / CAMPIONI for i in range(CAMPIONI + 1))
        punti = " ".join("%.1f,%.1f" % self.p(t, f(t)) for t in ts)
        stile = f' stroke-dasharray="{tratteggio}"' if tratteggio else ""
        self.pezzi.append(f'<polyline points="{punti}" fill="none" stroke="{colore}" stroke-width="{spessore}"{stile}/>')
        return self

    def orizzontale(self, y, nome):
        _, py = self.p(0, y)
        self.pezzi.append(f'<path d="M{X0} {py:.1f} H{X_FINE}" stroke="{GRIGIO}" stroke-dasharray="4 3"/>')
        self.pezzi.append(f'<text x="{X0 - 6}" y="{py + 5:.1f}" text-anchor="end">{nome}</text>')
        return self

    def tacca_t(self, t, nome, y_guida=None):
        px, _ = self.p(t, 0)
        if y_guida is not None:
            _, py = self.p(t, y_guida)
            self.pezzi.append(f'<path d="M{px:.1f} {Y0} V{py:.1f}" stroke="{GRIGIO}" stroke-dasharray="2 3"/>')
        self.pezzi.append(f'<text x="{px:.1f}" y="{Y0 + 16}" text-anchor="middle" font-style="italic">{nome}</text>')
        return self

    def testo(self, t, y, scritta, colore="#000", ancora="start"):
        px, py = self.p(t, y)
        self.pezzi.append(f'<text x="{px:.1f}" y="{py:.1f}" fill="{colore}" text-anchor="{ancora}">{scritta}</text>')
        return self

    def salva(self, nome):
        corpo = "".join(self.pezzi)
        file = IMG / nome
        file.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {LARG} {ALT}" font-family="serif" '
                        f'font-size="14">\n<rect width="100%" height="100%" fill="#fff"/>\n{corpo}\n</svg>\n')
        print("scritto", file)


def gradino_rc():
    """Carica del condensatore (o riempimento del serbatoio): E(1 - e^(-t/tau)), tangente nell'origine."""
    carica = lambda t: 1 - math.exp(-t / TAU)
    g = Grafico(T_MAX, 1.15, "v<tspan baseline-shift='sub' font-size='10'>C</tspan>")
    g.orizzontale(1, "E").orizzontale(carica(TAU), "0,63E")
    g.curva(lambda t: t / TAU, ROSSO, 1.2, t_fine=TAU, tratteggio="5 4")
    g.tacca_t(TAU, "τ", 1).tacca_t(3 * TAU, "3τ", carica(3 * TAU))
    g.curva(carica)
    g.testo(1.6, 0.55, "E(1 − e<tspan baseline-shift='super' font-size='10'>−t/τ</tspan>)", BLU)
    g.salva("gradino_rc.svg")


def rampa_rc():
    """Risposta del circuito RC alla rampa: t - tau + tau e^(-t/tau), che insegue la retta t - tau."""
    g = Grafico(T_MAX, T_MAX * 0.85, "u")
    g.curva(lambda t: t, GRIGIO, 1.2, t_fine=T_MAX * 0.85, tratteggio="4 3")
    g.curva(lambda t: t - TAU, ROSSO, 1.2, tratteggio="5 4", t_inizio=TAU)
    g.curva(lambda t: t - TAU + TAU * math.exp(-t / TAU))
    g.tacca_t(TAU, "τ")
    g.testo(T_MAX * 0.62, T_MAX * 0.80, "ingresso t", GRIGIO, "end")
    g.testo(T_MAX * 0.98, T_MAX * 0.52, "t − τ", ROSSO, "end")
    g.testo(2.0, 0.35, "uscita u(t)", BLU)
    g.salva("rampa_rc.svg")


def svuotamento():
    """Svuotamento del serbatoio (o scarica di C, raffreddamento): h0 e^(-t/tau), tangente iniziale fino a tau."""
    g = Grafico(T_MAX, 1.15, "h<tspan baseline-shift='sub' font-size='10'>u</tspan>")
    g.orizzontale(1, "h₀").orizzontale(math.exp(-1), "0,37h₀")
    g.curva(lambda t: 1 - t / TAU, ROSSO, 1.2, t_fine=TAU, tratteggio="5 4")
    g.curva(lambda t: math.exp(-t / TAU))
    g.tacca_t(TAU, "τ", math.exp(-1))
    g.testo(1.5, 0.45, "h₀ e<tspan baseline-shift='super' font-size='10'>−t/τ</tspan>", BLU)
    g.salva("svuotamento.svg")


if __name__ == "__main__":
    IMG.mkdir(exist_ok=True)
    gradino_rc()
    rampa_rc()
    svuotamento()
