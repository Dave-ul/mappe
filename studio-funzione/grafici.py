"""Grafici SVG calcolati (non disegnati a occhio) per lo studio di funzione.

Uso: venv/bin/python -I studio-funzione/grafici.py
Scrive studio-funzione/img/*.svg (spiegazione) e studio-funzione2/img/*.svg (mappa dei grafici elementari).
Solo libreria standard: la curva è una polilinea campionata, spezzata dove esce dal riquadro o salta (asintoti).
"""
import math
import pathlib

QUI = pathlib.Path(__file__).resolve().parent
IMG_SPIEGAZIONE = QUI / "img"
IMG_MAPPA = QUI.parent / "studio-funzione2" / "img"

CAMPIONI = 1200
SALTO_MAX = 0.45  # frazione dell'altezza: un salto più grande spezza la curva (asintoto verticale)
BLU, ROSSO, GRIGIO = "#1f5fbf", "#c0392b", "#888"


class Grafico:
    def __init__(self, xr, yr, larg=360, alt=260, margine=18, testo=12):
        self.x0, self.x1 = xr
        self.y0, self.y1 = yr
        self.w, self.h, self.m, self.t = larg, alt, margine, testo
        self.pezzi = []

    def px(self, x):
        return self.m + (x - self.x0) / (self.x1 - self.x0) * (self.w - 2 * self.m)

    def py(self, y):
        return self.h - self.m - (y - self.y0) / (self.y1 - self.y0) * (self.h - 2 * self.m)

    def assi(self, xticks=(), yticks=()):
        X0, Y0 = self.px(0), self.py(0)
        s = self.pezzi
        s.append(f'<line x1="{self.m - 8}" y1="{Y0:.1f}" x2="{self.w - 4}" y2="{Y0:.1f}" stroke="#111" stroke-width="1.2"/>')
        s.append(f'<line x1="{X0:.1f}" y1="{self.h - self.m + 8}" x2="{X0:.1f}" y2="4" stroke="#111" stroke-width="1.2"/>')
        s.append(f'<path d="M{self.w - 4},{Y0:.1f} l-7,-3.5 v7 z" fill="#111"/>')
        s.append(f'<path d="M{X0:.1f},4 l-3.5,7 h7 z" fill="#111"/>')
        s.append(self._testo(self.w - 8, Y0 + self.t + 2, "x", "end"))
        s.append(self._testo(X0 - 5, 12, "y", "end"))
        for v, nome in xticks:
            p = self.px(v)
            s.append(f'<line x1="{p:.1f}" y1="{Y0 - 3:.1f}" x2="{p:.1f}" y2="{Y0 + 3:.1f}" stroke="#111"/>')
            s.append(self._testo(p, Y0 + self.t + 3, nome, "middle"))
        for v, nome in yticks:
            p = self.py(v)
            s.append(f'<line x1="{X0 - 3:.1f}" y1="{p:.1f}" x2="{X0 + 3:.1f}" y2="{p:.1f}" stroke="#111"/>')
            s.append(self._testo(X0 - 5, p + self.t / 3, nome, "end"))
        return self

    def _testo(self, x, y, t, ancora="start", colore="#111", peso="400"):
        return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{self.t}" font-family="Noto Sans, sans-serif" '
                f'text-anchor="{ancora}" fill="{colore}" font-weight="{peso}">{t}</text>')

    def testo(self, x, y, t, ancora="start", colore="#111"):
        self.pezzi.append(self._testo(self.px(x), self.py(y), t, ancora, colore))
        return self

    def verticale(self, c, nome=None):
        p = self.px(c)
        self.pezzi.append(f'<line x1="{p:.1f}" y1="6" x2="{p:.1f}" y2="{self.h - 6}" stroke="{ROSSO}" stroke-width="1.2" stroke-dasharray="5 4"/>')
        if nome:
            self.pezzi.append(self._testo(p + 4, 16, nome, "start", ROSSO))
        return self

    def retta(self, m, q, nome=None, xa=None, xb=None, pos=None):
        xa = self.x0 if xa is None else xa
        xb = self.x1 if xb is None else xb
        self._polilinea([(x, m * x + q) for x in (xa + (xb - xa) * i / 200 for i in range(201))],
                        f'stroke="{ROSSO}" stroke-width="1.2" stroke-dasharray="5 4"')
        if nome and pos:
            self.testo(pos[0], pos[1], nome, "start", ROSSO)
        return self

    def curva(self, f, xa=None, xb=None, colore=BLU, spessore=2.2):
        xa = self.x0 if xa is None else xa
        xb = self.x1 if xb is None else xb
        punti = []
        for i in range(CAMPIONI + 1):
            x = xa + (xb - xa) * i / CAMPIONI
            try:
                y = f(x)
            except (ValueError, ZeroDivisionError, OverflowError):
                y = None
            punti.append((x, y))
        self._polilinea(punti, f'stroke="{colore}" stroke-width="{spessore}"')
        return self

    def _polilinea(self, punti, stile):
        margine_y = (self.y1 - self.y0) * 0.08
        tratto, prec = [], None
        for x, y in punti:
            dentro = y is not None and self.y0 - margine_y <= y <= self.y1 + margine_y
            salto = prec is not None and y is not None and abs(y - prec) > SALTO_MAX * (self.y1 - self.y0)
            if not dentro or salto:
                self._chiudi(tratto, stile)
                tratto = []
            if dentro:
                tratto.append((self.px(x), self.py(y)))
            prec = y
        self._chiudi(tratto, stile)

    def _chiudi(self, tratto, stile):
        if len(tratto) > 1:
            d = " ".join(f"{a:.1f},{b:.1f}" for a, b in tratto)
            self.pezzi.append(f'<polyline points="{d}" fill="none" {stile} stroke-linejoin="round"/>')

    def punto(self, x, y, nome=None, dx=6, dy=-6, pieno=True):
        riemp = "#111" if pieno else "#fff"
        self.pezzi.append(f'<circle cx="{self.px(x):.1f}" cy="{self.py(y):.1f}" r="3.6" fill="{riemp}" stroke="#111" stroke-width="1.4"/>')
        if nome:
            self.pezzi.append(self._testo(self.px(x) + dx, self.py(y) + dy, nome, "start" if dx >= 0 else "end"))
        return self

    def salva(self, file):
        corpo = "\n".join(self.pezzi)
        file.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" '
                        f'width="{self.w}" height="{self.h}">\n<rect width="100%" height="100%" fill="#fff"/>\n{corpo}\n</svg>\n')
        print("scritto", file)


def sqrt_sicura(v):
    if v < 0:
        raise ValueError
    return math.sqrt(v)


def spiegazione():
    IMG_SPIEGAZIONE.mkdir(exist_ok=True)
    # Esempio guida: x^2/(x-1)
    g = Grafico((-4, 6), (-6, 10)).assi([(1, "1"), (2, "2")], [(4, "4")])
    g.verticale(1, "x = 1").retta(1, 1, "y = x + 1", pos=(4.3, 6.6))
    g.curva(lambda x: x * x / (x - 1))
    g.punto(0, 0, "max (0; 0)", -6, -8).punto(2, 4, "min (2; 4)", 8, 14)
    g.salva(IMG_SPIEGAZIONE / "razionale.svg")

    # 2/10: x e^(1/x)
    g = Grafico((-5, 5), (-5, 8)).assi([(1, "1")], [(math.e, "e")])
    g.verticale(0).retta(1, 1, "y = x + 1", pos=(-4.6, -1.2))
    g.curva(lambda x: x * math.exp(1 / x) if x != 0 else None, -5, -1e-3)
    g.curva(lambda x: x * math.exp(1 / x), 0.08, 5)
    g.punto(1, math.e, "min (1; e)", 8, 14).punto(0, 0, None, pieno=False)
    g.salva(IMG_SPIEGAZIONE / "xe1x.svg")

    # 5/10: x + 2 - sqrt(x^2 - x - 6)
    f = lambda x: x + 2 - sqrt_sicura(x * x - x - 6)
    g = Grafico((-7, 9), (-10, 7)).assi([(-2, "−2"), (3, "3")], [(2.5, "5/2"), (5, "5")])
    g.retta(0, 2.5, "y = 5/2", xa=3, pos=(6.0, 3.3)).retta(2, 1.5, "y = 2x + 3/2", xb=-2, pos=(-6.6, -4.0))
    g.curva(f, -7, -2).curva(f, 3, 9)
    g.punto(-2, 0, "(−2; 0)", -8, -14).punto(3, 5, "max (3; 5)", 8, -4)
    g.salva(IMG_SPIEGAZIONE / "irrazionale.svg")

    # 28/9: (1 - 4 sin^2 x)/cos x, in [-pi/2-...; 3pi/2]
    f = lambda x: (1 - 4 * math.sin(x) ** 2) / math.cos(x)
    pi = math.pi
    g = Grafico((-pi * 0.75, pi * 1.75), (-8, 8), larg=420).assi(
        [(-pi / 2, "−π/2"), (pi / 2, "π/2"), (3 * pi / 2, "3π/2")])
    for c in (-pi / 2, pi / 2, 3 * pi / 2):
        g.verticale(c)
    for a, b in ((-pi * 0.75, -pi / 2), (-pi / 2, pi / 2), (pi / 2, 3 * pi / 2), (3 * pi / 2, pi * 1.75)):
        g.curva(f, a + 1e-4, b - 1e-4)
    g.punto(0, 1, "max (0; 1)", 6, -8).punto(pi, -1, "min (π; −1)", 8, 16)
    for z in (-pi / 6, pi / 6, 5 * pi / 6, 7 * pi / 6):
        g.punto(z, 0)
    g.salva(IMG_SPIEGAZIONE / "goniometrica.svg")

    # 29/9: sqrt(|x| - 1)
    f = lambda x: sqrt_sicura(abs(x) - 1)
    g = Grafico((-6, 6), (-1, 3)).assi([(-1, "−1"), (1, "1")], [(1, "1"), (2, "2")])
    g.curva(f, -6, -1).curva(f, 1, 6).punto(-1, 0).punto(1, 0)
    g.salva(IMG_SPIEGAZIONE / "radice_modulo.svg")

    # 29/9: sqrt(2-x) per x <= 2, (2-x)^2 per x > 2: punto angoloso
    g = Grafico((-3, 5), (-1, 4)).assi([(2, "2")], [(1, "1"), (2, "2")])
    g.curva(lambda x: sqrt_sicura(2 - x), -3, 2).curva(lambda x: (2 - x) ** 2, 2, 4.2).punto(2, 0, "punto angoloso", 6, -10)
    g.salva(IMG_SPIEGAZIONE / "a_tratti.svg")

    # i tre punti di non derivabilità
    g = Grafico((-2, 2), (-1.6, 1.8), larg=200, alt=150, testo=11).assi()
    g.curva(lambda x: abs(x) + 0.0).testo(0.15, 1.5, "angoloso")
    g.salva(IMG_SPIEGAZIONE / "angoloso.svg")
    g = Grafico((-2, 2), (-1.6, 1.8), larg=200, alt=150, testo=11).assi()
    g.curva(lambda x: abs(x) ** 0.5).testo(0.15, 1.6, "cuspide")
    g.salva(IMG_SPIEGAZIONE / "cuspide.svg")
    g = Grafico((-2, 2), (-1.6, 1.8), larg=200, alt=150, testo=11).assi()
    g.curva(lambda x: math.copysign(abs(x) ** (1 / 3), x)).testo(0.15, 1.6, "flesso verticale")
    g.salva(IMG_SPIEGAZIONE / "flesso_verticale.svg")


def mappa():
    IMG_MAPPA.mkdir(exist_ok=True)
    pi = math.pi
    mini = dict(larg=170, alt=118, margine=12, testo=15)
    casi = [
        ("x2", (-2.2, 2.2), (-0.8, 4), lambda x: x * x, [], [(1, "1")], "y = x²"),
        ("x3", (-2, 2), (-3, 3), lambda x: x ** 3, [], [], "y = x³"),
        ("1x", (-3, 3), (-3, 3), lambda x: 1 / x if abs(x) > 1e-9 else None, [], [], "y = 1/x"),
        ("radice", (-1, 5), (-0.8, 2.6), lambda x: sqrt_sicura(x), [], [], "y = √x"),
        ("exp", (-3, 2.2), (-0.8, 5), math.exp, [], [(1, "1")], "y = eˣ"),
        ("ln", (-0.8, 6), (-3, 2.4), lambda x: math.log(x) if x > 0 else None, [(1, "1")], [], "y = ln x"),
        ("arctan", (-6, 6), (-2.2, 2.2), math.atan, [], [(pi / 2, "π/2")], "y = arctan x"),
        ("tan", (-pi, pi), (-4, 4), lambda x: math.tan(x) if abs(math.cos(x)) > 1e-3 else None,
         [(pi / 2, "π/2")], [], "y = tan x"),
    ]
    for nome, xr, yr, f, xt, yt, _titolo in casi:  # il titolo sta nel riquadro della mappa
        g = Grafico(xr, yr, **mini).assi(xt, yt)
        if nome == "arctan":
            g.retta(0, pi / 2).retta(0, -pi / 2)
        if nome == "tan":
            g.verticale(-pi / 2).verticale(pi / 2)
        g.curva(f, spessore=2.6)
        g.salva(IMG_MAPPA / f"{nome}.svg")
    # seno e coseno insieme
    g = Grafico((-0.6, 2 * pi + 1.2), (-1.6, 1.8), **mini).assi([(pi, "π"), (2 * pi, "2π")], [(1, "1")])
    g.curva(math.sin, spessore=2.6).curva(math.cos, colore=ROSSO, spessore=2.0)
    g.pezzi.append(g._testo(g.w - 6, 16, "sin", "end", BLU, "700"))
    g.pezzi.append(g._testo(g.w - 40, 16, "cos", "end", ROSSO, "700"))
    g.salva(IMG_MAPPA / "sincos.svg")


if __name__ == "__main__":
    spiegazione()
    mappa()
