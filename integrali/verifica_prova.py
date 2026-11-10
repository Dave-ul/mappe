"""Controlla con sympy ogni risultato della prova e della spiegazione: deriva la primitiva e confronta con l'integranda."""
import sys
from sympy import (Rational, atan, asin, cos, diff, exp, log, simplify, sin, sqrt, symbols, tan, cbrt, nsimplify)

x = symbols('x', positive=True)  # x>0: ln|x| = ln x; dove serve un intervallo diverso il controllo è numerico

# (nome, integranda, primitiva, punto di prova numerico)
CASI = [
    # Prova, parte A
    ("A3 x e^x", x*exp(x), (x - 1)*exp(x), 2),
    ("A2 2x cos x^2", 2*x*cos(x**2), sin(x**2), 1),
    # B immediati
    ("B1", 4*x**3 - 6*x + 5, x**4 - 3*x**2 + 5*x, 2),
    ("B2", sqrt(x) + 1/x**2, Rational(2, 3)*x*sqrt(x) - 1/x, 2),
    ("B3", (x**2 + 3)/x, x**2/2 + 3*log(x), 2),
    ("B4", 3*cos(x) - 2*exp(x) + 4/(1 + x**2), 3*sin(x) - 2*exp(x) + 4*atan(x), 2),
    ("B5", 5**x, 5**x/log(5), 2),
    ("B6", (x**2 - 4)/(x - 2), x**2/2 + 2*x, 3),
    ("B7", cbrt(x**2), Rational(3, 5)*x*cbrt(x**2), 2),
    # C composte
    ("C1", (3*x + 1)**5, (3*x + 1)**6/18, 2),
    ("C2", x**2*(x**3 + 2)**4, (x**3 + 2)**5/15, 2),
    ("C3", 2*x/(x**2 + 5), log(x**2 + 5), 2),
    ("C4", x*exp(x**2), exp(x**2)/2, 1),
    ("C5", cos(4*x), sin(4*x)/4, 2),
    ("C6", sin(x)*cos(x)**3, -cos(x)**4/4, 2),
    ("C7", 1/(9 + x**2), atan(x/3)/3, 2),
    ("C8", log(x)**3/x, log(x)**4/4, 2),
    ("C9", x/sqrt(1 - x**4), asin(x**2)/2, Rational(1, 2)),
    ("C10", exp(x)/(1 + exp(2*x)), atan(exp(x)), 2),
    # D per parti
    ("D1", x*cos(x), x*sin(x) + cos(x), 2),
    ("D2", x*exp(-x), -(x + 1)*exp(-x), 2),
    ("D3", x**2*log(x), x**3/3*log(x) - x**3/9, 2),
    ("D4", atan(x), x*atan(x) - log(1 + x**2)/2, 2),
    ("D5", x**2*sin(x), -x**2*cos(x) + 2*x*sin(x) + 2*cos(x), 2),
    ("D6", exp(x)*sin(x), exp(x)*(sin(x) - cos(x))/2, 2),
    # E sostituzione
    ("E1", 1/(x + sqrt(x)), 2*log(1 + sqrt(x)), 2),
    ("E2", exp(sqrt(x)), 2*exp(sqrt(x))*(sqrt(x) - 1), 2),
    ("E3", x*sqrt(x - 1), Rational(2, 5)*(x - 1)**Rational(5, 2) + Rational(2, 3)*(x - 1)**Rational(3, 2), 3),
    # F fratte (punti di prova dove gli argomenti dei ln sono positivi)
    ("F1", 1/(2*x - 5), log(2*x - 5)/2, 4),
    ("F2", (2*x + 3)/(x + 1), 2*x + log(x + 1), 2),
    ("F3", (x + 7)/(x**2 - x - 2), 3*log(x - 2) - 2*log(x + 1), 4),
    ("F4", (3*x - 1)/(x**2 - 2*x + 1), 3*log(x - 1) - 2/(x - 1), 3),
    ("F5", 1/(x**2 - 4*x + 13), atan((x - 2)/3)/3, 2),
    ("F6", (x + 3)/(x**2 + 2*x + 5), log(x**2 + 2*x + 5)/2 + atan((x + 1)/2), 2),
    ("F7", (x**3 - 2*x**2 + 3)/(x - 1), x**3/3 - x**2/2 - x + 2*log(x - 1), 3),
    ("F8", (x**2 + 2)/(x**3 - x), -2*log(x) + Rational(3, 2)*log(x - 1) + Rational(3, 2)*log(x + 1), 3),
    # H riepilogo
    ("H1", (3*x**2 - 1)/(x**3 - x), log(x**3 - x), 3),
    ("H2", log(x)/x**2, -(log(x) + 1)/x, 2),
    ("H3", x/(x + 1)**2, log(x + 1) + 1/(x + 1), 2),
    ("H4", cos(x)/(1 + sin(x)**2), atan(sin(x)), 2),
    ("H5", (exp(x) + 1)**2/exp(x), exp(x) + 2*x - exp(-x), 2),
    # Spiegazione: esempi svolti
    ("S pot", 6*x**2 - 2/x, 2*x**3 - 2*log(x), 2),
    ("S comp1", (5*x - 2)**3, (5*x - 2)**4/20, 2),
    ("S comp2", x*cos(x**2), sin(x**2)/2, 2),
    ("S comp3", 1/(4 + x**2), atan(x/2)/2, 2),
    ("S parti", x*exp(3*x), exp(3*x)*(x/3 - Rational(1, 9)), 2),
    ("S lnx", log(x), x*log(x) - x, 2),
    ("S sost", 1/(1 + sqrt(x)), 2*sqrt(x) - 2*log(1 + sqrt(x)), 2),
    ("S frat1", (x + 1)/(x - 2), x + 3*log(x - 2), 3),
    ("S delta>0", 1/(x**2 - 1), log(x - 1)/2 - log(x + 1)/2, 3),
    ("S delta=0", (x + 1)/(x - 1)**2, log(x - 1) - 2/(x - 1), 3),
    ("S delta<0", (2*x + 6)/(x**2 + 2*x + 2), log(x**2 + 2*x + 2) + 4*atan(x + 1), 2),
    ("S tan", tan(x), -log(cos(x)), Rational(1, 2)),
]

# Problemi con condizioni: (nome, funzione trovata, derivata attesa, [(punto, valore atteso)])
CONDIZIONI = [
    ("G1", x**3 - 2*x**2 + x + 5, 3*x**2 - 4*x + 1, [(1, 5)]),
    ("G3", log(x) + 2, 1/x, [(exp(1), 3)]),
]


def controlla_primitive():
    errori = []
    for nome, f, F, punto in CASI:
        scarto = simplify(diff(F, x) - f)
        if scarto != 0:
            numerico = abs((diff(F, x) - f).subs(x, punto).evalf())
            if numerico > 1e-12:
                errori.append(f"{nome}: F' - f = {scarto} (in x={punto}: {numerico})")
    return errori


def controlla_condizioni():
    errori = []
    for nome, F, f, punti in CONDIZIONI:
        if simplify(diff(F, x) - f) != 0:
            errori.append(f"{nome}: derivata sbagliata")
        for p, v in punti:
            if simplify(F.subs(x, p) - v) != 0:
                errori.append(f"{nome}: F({p}) = {F.subs(x, p)} invece di {v}")
    # G2: f''=12x^2-6, f'(0)=2, f(1)=0 -> f = x^4 - 3x^2 + 2x
    f = x**4 - 3*x**2 + 2*x
    if simplify(diff(f, x, 2) - (12*x**2 - 6)) != 0 or diff(f, x).subs(x, 0) != 2 or f.subs(x, 1) != 0:
        errori.append("G2 sbagliato")
    return errori


if __name__ == "__main__":
    errori = controlla_primitive() + controlla_condizioni()
    totale = len(CASI) + len(CONDIZIONI) + 1
    for e in errori:
        print("ERRORE", e)
    print(f"{totale - len(errori)}/{totale} corretti")
    sys.exit(1 if errori else 0)
