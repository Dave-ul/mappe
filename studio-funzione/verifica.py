"""Controlla con sympy le formule della mappa (fogli studio-funzione e studio-funzione2) e gli esempi della spiegazione.

Uso dalla radice del repo: venv/bin/python -I studio-funzione/verifica.py
"""
import random

from sympy import (E, Abs, Function, Rational, S, atan, cbrt, cos, diff, exp, limit, log, oo, pi, real_root,
                   simplify, sin, sqrt, symbols, tan, asin)
from sympy.core.function import AppliedUndef

x = symbols("x", real=True)
xp = symbols("x", positive=True)
risultati = []


def controlla(nome, ok):
    risultati.append((nome, bool(ok)))
    if not ok:
        print("SBAGLIATO:", nome)


PUNTI_PROVA = (1.3, 1.7, 2.4, 3.1)  # dove tutte le funzioni controllate sono definite (x > 1)


def uguale(a, b):
    """Uguali se simplify dà 0; se simplify non ci riesce, prova numerica in PUNTI_PROVA."""
    d = a - b
    if simplify(d) == 0:
        return True
    if d.atoms(AppliedUndef):  # funzioni generiche f(x): solo simplify
        return False
    for v in PUNTI_PROVA:
        valore = complex(d.subs({s: v for s in d.free_symbols}).evalf())
        if abs(valore) > 1e-9:
            return False
    return True


def derivata(nome, f, attesa, var=x):
    controlla(f"derivata {nome}", uguale(diff(f, var), attesa))


# ---------- foglio 2: derivate composte (con g = x^2 + 1, positiva) ----------
g = x**2 + 1
dg = diff(g, x)
n = 5
derivata("g^n", g**n, n * g**(n - 1) * dg)
derivata("sqrt g", sqrt(g), dg / (2 * sqrt(g)))
derivata("radice cubica g", cbrt(g), dg / (3 * cbrt(g**2)))
derivata("1/g", 1 / g, -dg / g**2)
derivata("e^g", exp(g), exp(g) * dg)
derivata("a^g", 3**g, 3**g * log(3) * dg)
derivata("ln|g|", log(g), dg / g)
derivata("ln|x| per x<0", log(-x), 1 / x)
derivata("sin g", sin(g), cos(g) * dg)
derivata("cos g", cos(g), -sin(g) * dg)
derivata("tan g", tan(g), dg / cos(g)**2)
h = x / 3  # per arcsin serve |g| < 1
derivata("arcsin g", asin(h), diff(h, x) / sqrt(1 - h**2))
derivata("arctan g", atan(g), dg / (1 + g**2))

f, k = Function("f")(x), Function("k")(x)
controlla("regola del prodotto", uguale(diff(f * k, x), diff(f, x) * k + f * diff(k, x)))
controlla("regola del quoziente", uguale(diff(f / k, x), (diff(f, x) * k - f * diff(k, x)) / k**2))

# ---------- foglio 2: limiti notevoli, gerarchia, forme indeterminate ----------
a, kk = 3, Rational(5, 2)
notevoli = [
    (sin(x) / x, 1), ((1 - cos(x)) / x**2, Rational(1, 2)), ((exp(x) - 1) / x, 1),
    ((a**x - 1) / x, log(a)), (log(1 + x) / x, 1), (((1 + x)**kk - 1) / x, kk),
]
for espr, valore in notevoli:
    controlla(f"limite notevole {espr}", uguale(limit(espr, x, 0), valore))
controlla("(1+k/x)^x -> e^k a +oo", uguale(limit((1 + kk / x)**x, x, oo), exp(kk)))
controlla("(1+k/x)^x -> e^k a -oo", uguale(limit((1 + kk / x)**x, x, -oo), exp(kk)))
controlla("gerarchia ln x << x^a", limit(log(xp) / sqrt(xp), xp, oo) == 0)
controlla("gerarchia x^a << e^x", limit(xp**7 / exp(xp), xp, oo) == 0)
controlla("1^oo con e^(g ln f)", uguale(limit((1 + 1 / xp)**(3 * xp), xp, oo), limit(exp(3 * xp * log(1 + 1 / xp)), xp, oo)))
controlla("De L'Hopital 0/0", uguale(limit((exp(x) - 1 - x) / x**2, x, 0), limit(diff(exp(x) - 1 - x, x) / diff(x**2, x), x, 0)))

# ---------- foglio 2: disequazioni irrazionali (prova numerica su polinomi a caso) ----------
random.seed(1)
punti = [i / 7 for i in range(-70, 71)]
for prova in range(40):
    A = [random.randint(-4, 4) for _ in range(3)]
    B = [random.randint(-4, 4) for _ in range(2)]
    ok = True
    for t in punti:
        av = A[0] * t * t + A[1] * t + A[2]
        bv = B[0] * t + B[1]
        vero_ge = av >= 0 and av**0.5 >= bv - 1e-12
        regola_ge = (bv < 0 and av >= 0) or (bv >= 0 and av >= bv * bv - 1e-9)
        vero_le = av >= 0 and av**0.5 <= bv + 1e-12
        regola_le = av >= 0 and bv >= 0 and av <= bv * bv + 1e-9
        if vero_ge != regola_ge or vero_le != regola_le:
            ok = False
    controlla(f"disequazioni irrazionali, prova {prova + 1}", ok)

# ---------- foglio 1: asintoti delle fratte secondo i gradi ----------
controlla("fratta n<m: y=0", limit((x + 1) / (x**2 + 3), x, oo) == 0)
controlla("fratta n=m: y=an/bm", limit((6 * x**2 + 1) / (2 * x**2 - x), x, oo) == 3)
fr = (x**3 + 2) / (x**2 + 1)
m_fr = limit(fr / x, x, oo)
controlla("fratta n=m+1: obliquo", m_fr == 1 and limit(fr - m_fr * x, x, oo) == 0)
controlla("fratta n>m+1: niente (m infinito)", limit((x**4 + 1) / (x**2 + 1) / x, x, oo) == oo)

# ---------- foglio 1: non derivabilità e discontinuità ----------
def derivate_laterali(f, x0):
    return limit((f.subs(x, x0 + symbols("h")) - f.subs(x, x0)) / symbols("h"), symbols("h"), 0, "-"), \
        limit((f.subs(x, x0 + symbols("h")) - f.subs(x, x0)) / symbols("h"), symbols("h"), 0, "+")


sx, dx = derivate_laterali(Abs(x), 0)
controlla("|x|: angoloso (-1 e 1)", (sx, dx) == (-1, 1))
sx, dx = derivate_laterali(real_root(x**2, 3), 0)
controlla("x^(2/3): cuspide (-oo e +oo)", (sx, dx) == (-oo, oo))
sx, dx = derivate_laterali(real_root(x, 3), 0)
controlla("radice cubica: flesso verticale (+oo e +oo)", (sx, dx) == (oo, oo))
controlla("1a specie: |x|/x salta da -1 a 1", (limit(Abs(x) / x, x, 0, "-"), limit(Abs(x) / x, x, 0, "+")) == (-1, 1))
controlla("2a specie: 1/x", limit(1 / x, x, 0, "+") == oo)
controlla("3a specie: sin x/x -> 1", limit(sin(x) / x, x, 0) == 1)

# ---------- foglio 1: derivata seconda e flessi; massimo assoluto ----------
c3 = x**3 - 3 * x
controlla("x^3-3x: f''=6x cambia segno in 0 (flesso)", uguale(diff(c3, x, 2), 6 * x))
controlla("x^3-3x: tangente inflessionale y=-3x", uguale(diff(c3, x).subs(x, 0) * x + c3.subs(x, 0), -3 * x))
valori = {v: c3.subs(x, v) for v in (-1, 1, -2, 3)}  # stazionari -1, 1; estremi di [-2; 3]
controlla("massimo assoluto di x^3-3x in [-2;3] e' f(3)=18", max(valori.values()) == 18)
controlla("minimo assoluto di x^3-3x in [-2;3] e' -2", min(valori.values()) == -2)

# ---------- spiegazione: esempio guida x^2/(x-1) ----------
r = x**2 / (x - 1)
derivata("x^2/(x-1)", r, x * (x - 2) / (x - 1)**2)
controlla("x^2/(x-1): f''=2/(x-1)^3", uguale(diff(r, x, 2), 2 / (x - 1)**3))
controlla("x^2/(x-1): asintoto verticale x=1", limit(r, x, 1, "+") == oo and limit(r, x, 1, "-") == -oo)
controlla("x^2/(x-1): obliquo y=x+1", limit(r / x, x, oo) == 1 and limit(r - x, x, oo) == 1 and limit(r - x, x, -oo) == 1)
controlla("x^2/(x-1): max (0;0), min (2;4)", r.subs(x, 0) == 0 and r.subs(x, 2) == 4)

# ---------- spiegazione: 2/10, x e^(1/x) ----------
e1 = x * exp(1 / x)
derivata("x e^(1/x)", e1, exp(1 / x) * (x - 1) / x)
controlla("x e^(1/x): f''=e^(1/x)/x^3", uguale(diff(e1, x, 2), exp(1 / x) / x**3))
controlla("x e^(1/x): x->0+ +oo, x->0- 0", limit(e1, x, 0, "+") == oo and limit(e1, x, 0, "-") == 0)
controlla("x e^(1/x): obliquo y=x+1 da tutti e due i lati",
          all(limit(e1 / x, x, p) == 1 and limit(e1 - x, x, p) == 1 for p in (oo, -oo)))
controlla("x e^(1/x): min (1; e)", e1.subs(x, 1) == E)

# ---------- spiegazione: 5/10, x+2-sqrt(x^2-x-6) ----------
ir = x + 2 - sqrt(x**2 - x - 6)
controlla("irrazionale: zero in x=-2, f(3)=5", ir.subs(x, -2) == 0 and ir.subs(x, 3) == 5)
controlla("irrazionale: y=5/2 a +oo", limit(ir, x, oo) == Rational(5, 2))
controlla("irrazionale: obliquo y=2x+3/2 a -oo",
          limit(ir / x, x, -oo) == 2 and limit(ir - 2 * x, x, -oo) == Rational(3, 2))
d_ir = diff(ir, x)
controlla("irrazionale: f'=1-(2x-1)/(2 sqrt(...))", uguale(d_ir, 1 - (2 * x - 1) / (2 * sqrt(x**2 - x - 6))))
controlla("irrazionale: f'>0 per x<-2, f'<0 per x>3",
          all(d_ir.subs(x, v) > 0 for v in (-10, -5, -2.1)) and all(d_ir.subs(x, v) < 0 for v in (3.1, 5, 50)))
controlla("irrazionale: f'->+oo in -2 da sinistra, -oo in 3 da destra",
          limit(d_ir, x, -2, "-") == oo and limit(d_ir, x, 3, "+") == -oo)
controlla("irrazionale: f''=25/(4(x^2-x-6)^(3/2)) > 0",
          uguale(diff(ir, x, 2), Rational(25, 4) / (x**2 - x - 6)**Rational(3, 2)))
controlla("irrazionale: segno, f>=0 solo per x=-2 e x>=3",
          all(ir.subs(x, v) > 0 for v in (3, 4, 100)) and all(ir.subs(x, v) < 0 for v in (-2.5, -5, -100)))

# ---------- spiegazione: 28/9, (1-4 sin^2 x)/cos x ----------
go = (1 - 4 * sin(x)**2) / cos(x)
controlla("goniometrica: = 4cos x - 3/cos x", uguale(go, 4 * cos(x) - 3 / cos(x)))
controlla("goniometrica: pari", uguale(go.subs(x, -x), go))
controlla("goniometrica: zeri in pi/6, 5pi/6", go.subs(x, pi / 6) == 0 and simplify(go.subs(x, 5 * pi / 6)) == 0)
controlla("goniometrica: derivata del quaderno giusta",
          uguale(diff(go, x), (-8 * sin(x) * cos(x)**2 + sin(x) * (1 - 4 * sin(x)**2)) / cos(x)**2))
controlla("goniometrica: f'=-sin x (4+3/cos^2 x)", uguale(diff(go, x), -sin(x) * (4 + 3 / cos(x)**2)))
controlla("goniometrica: max (0;1), min (pi;-1)", go.subs(x, 0) == 1 and go.subs(x, pi) == -1)
controlla("goniometrica: x=pi/2 asintoto verticale", limit(go, x, pi / 2, "-") == -oo and limit(go, x, pi / 2, "+") == oo)
controlla("goniometrica: f''=(-4sin^4+5sin^2-7)/cos^3",
          uguale(diff(go, x, 2), (-4 * sin(x)**4 + 5 * sin(x)**2 - 7) / cos(x)**3))
controlla("goniometrica: -4s^2+5s-7 sempre negativo (Delta<0)", 5**2 - 4 * 4 * 7 < 0)

# ---------- spiegazione: 29/9, sqrt(|x|-1) e funzione a tratti ----------
controlla("sqrt(x-1): f'->+oo in 1 (tangente verticale)", limit(diff(sqrt(x - 1), x), x, 1, "+") == oo)
controlla("sqrt(x-1): f''<0 (concavita' verso il basso)", uguale(diff(sqrt(x - 1), x, 2), -1 / (4 * (x - 1)**Rational(3, 2))))
controlla("sqrt(|x|-1): niente obliquo (f/x->0)", limit(sqrt(xp - 1) / xp, xp, oo) == 0)
controlla("a tratti: continua in 2", sqrt(2 - x).subs(x, 2) == 0 and limit((2 - x)**2, x, 2, "+") == 0)
controlla("a tratti: f'_-(2)=-oo, f'_+(2)=0 -> angoloso",
          limit(diff(sqrt(2 - x), x), x, 2, "-") == -oo and limit(diff((2 - x)**2, x), x, 2, "+") == 0)

# ---------- spiegazione: derivate per casa (2/10 e 7/10) ----------
derivata("e^(x^2)/(3x)", exp(xp**2) / (3 * xp), exp(xp**2) * (2 * xp**2 - 1) / (3 * xp**2), xp)
controlla("e^(x^2)/(3x): quaderno sbagliato (e^(2x))",
          not uguale(diff(exp(xp**2) / (3 * xp), xp), (exp(2 * xp) * 3 * xp - 3 * exp(xp**2)) / (3 * xp)**2))
t = symbols("t", positive=True)  # x > 1
derivata("radice cubica(x^2-1)/x", cbrt(t**2 - 1) / t, (3 - t**2) / (3 * t**2 * cbrt((t**2 - 1)**2)), t)
derivata("sin x/ln(3/x^2)", sin(xp) / log(3 / xp**2),
         (xp * cos(xp) * log(3 / xp**2) + 2 * sin(xp)) / (xp * log(3 / xp**2)**2), xp)
derivata("2e^(1/x)", 2 * exp(1 / x), -2 * exp(1 / x) / x**2)
derivata("ln(x^2)/(x^2+1)", log(xp**2) / (xp**2 + 1), 2 * (xp**2 + 1 - xp**2 * log(xp**2)) / (xp * (xp**2 + 1)**2), xp)
derivata("1/radice cubica((x^2+1)^4)", 1 / cbrt((x**2 + 1)**4), -8 * x / (3 * cbrt((x**2 + 1)**7)))
derivata("ln^2(x+3)", log(xp + 3)**2, 2 * log(xp + 3) / (xp + 3), xp)
derivata("ln(1-2/x)", log(1 - 2 / (t + 2)), 2 / ((t + 2) * t), t)
derivata("(x-3)e^x", (x - 3) * exp(x), (x - 2) * exp(x))
derivata("[ln(1/(x+2))]^2", log(1 / (xp + 2))**2, 2 * log(xp + 2) / (xp + 2), xp)
derivata("ln((1/(x+2))^2)", log((1 / (xp + 2))**2), -2 / (xp + 2), xp)

giusti = sum(ok for _, ok in risultati)
print(f"{giusti}/{len(risultati)} controlli giusti")
raise SystemExit(0 if giusti == len(risultati) else 1)
