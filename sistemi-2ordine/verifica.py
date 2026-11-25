"""Verifica con sympy le formule della mappa e della spiegazione sui sistemi del secondo ordine (libro, Unità H2)."""
import math

import sympy as sp

controlli = []


def ok(nome, cond):
    controlli.append((nome, bool(cond)))


def vicino(a, b, tol=2e-3):
    return abs(float(a) - float(b)) <= tol * max(1, abs(float(b)))


s, t = sp.symbols("s t")
wn, K = sp.symbols("omega_n K", positive=True)
xi = sp.symbols("xi", positive=True)
G = K * wn**2 / (s**2 + 2 * xi * wn * s + wn**2)

# Poli
poli = sp.solve(sp.denom(sp.together(G)), s)
attesi = [wn * (-xi + sp.sqrt(xi**2 - 1)), wn * (-xi - sp.sqrt(xi**2 - 1))]
ok("poli = wn(-xi ± sqrt(xi^2-1))", all(any(sp.simplify(p - a) == 0 for p in poli) for a in attesi))
ok("forma del quaderno -xi wn ± sqrt(xi^2 wn^2 - wn^2)",
   sp.simplify((-xi * wn + sp.sqrt(xi**2 * wn**2 - wn**2))**2 - attesi[0]**2) == 0)

# Esempio 3 del libro: 200/(s^2+50s+100) -> wn = 10, xi = 2,5, K = 2
ok("es. 3: wn = 10", sp.sqrt(100) == 10)
ok("es. 3: xi = 2,5", sp.Rational(50, 2 * 10) == sp.Rational(5, 2))
ok("es. 3: K = 2", sp.Rational(200, 100) == 2)
ok("es. 3: G riscritta uguale", sp.simplify(G.subs({K: 2, wn: 10, xi: sp.Rational(5, 2)}) - 200 / (s**2 + 50 * s + 100)) == 0)

# RLC serie: Vc/Vi = 1/(s^2 LC + s RC + 1) -> wn = 1/sqrt(LC), xi = R/2 sqrt(C/L), K = 1
R, L, C = sp.symbols("R L C", positive=True)
Zc = 1 / (s * C)
Grlc = sp.simplify(Zc / (R + s * L + Zc))
ok("RLC: G = 1/(s^2LC + sRC + 1)", sp.simplify(Grlc - 1 / (s**2 * L * C + s * R * C + 1)) == 0)
Gstd = G.subs({K: 1, wn: 1 / sp.sqrt(L * C), xi: R / 2 * sp.sqrt(C / L)})
ok("RLC: wn = 1/sqrt(LC), xi = R/2 sqrt(C/L), K = 1", sp.simplify(Grlc - Gstd) == 0)

# Risposte all'impulso (K = 1) per antitrasformata
def impulso(x):
    return sp.inverse_laplace_transform(G.subs({K: 1, xi: x}), s, t)

u1 = sp.simplify(impulso(1))
ok("impulso xi=1: wn^2 t e^(-wn t)", sp.simplify(u1 - wn**2 * t * sp.exp(-wn * t) * sp.Heaviside(t)) == 0)
x05 = sp.Rational(1, 2)
u05 = impulso(x05)
atteso05 = wn / sp.sqrt(1 - x05**2) * sp.exp(-x05 * wn * t) * sp.sin(wn * sp.sqrt(1 - x05**2) * t)
ok("impulso 0<xi<1 (xi=0,5)", all(vicino(u05.subs({wn: 3, t: tt}), atteso05.subs({wn: 3, t: tt}), 1e-6) for tt in [0.3, 1, 2.5]))
x2 = 2
u2 = impulso(x2)
p1, p2 = [wn * (-x2 + sp.sqrt(x2**2 - 1)), wn * (-x2 - sp.sqrt(x2**2 - 1))]
A = sp.simplify(wn**2 / (p1 - p2))
atteso2 = A * sp.exp(p1 * t) - A * sp.exp(p2 * t)
ok("impulso xi>1 (xi=2): A e^(p1 t) + B e^(p2 t), B = -A",
   all(vicino(u2.subs({wn: 3, t: tt}), atteso2.subs({wn: 3, t: tt}), 1e-6) for tt in [0.3, 1, 2.5]))
ok("residui del libro: A = wn/(2j sqrt(1-xi^2))",
   sp.simplify(wn**2 / (2 * sp.I * wn * sp.sqrt(1 - xi**2)) - wn / (2 * sp.I * sp.sqrt(1 - xi**2))) == 0)

# Risposta al gradino unitario (K = 1), 0 < xi < 1: confronto numerico con l'antitrasformata di G/s
xs, ws = sp.Rational(2, 5), 2
gradino = sp.inverse_laplace_transform(G.subs({K: 1, xi: xs, wn: ws}) / s, s, t)
wd = ws * math.sqrt(1 - float(xs)**2)
formula = lambda tt: 1 - math.exp(-float(xs) * ws * tt) / math.sqrt(1 - float(xs)**2) * math.sin(wd * tt + math.atan(math.sqrt(1 - float(xs)**2) / float(xs)))
ok("gradino: formula del libro", all(vicino(gradino.subs(t, tt), formula(tt), 1e-6) for tt in [0.2, 1, 3, 6]))
ok("gradino: regime = 1 (per K)", sp.limit(s * G.subs({xi: xs, wn: ws}) / s, s, 0) == K)

# T_P: prima derivata nulla; M_max%
Tp = math.pi / wd
d = sp.diff(gradino, t)
ok("T_P = pi/(wn sqrt(1-xi^2)) annulla la derivata", vicino(d.subs(t, Tp), 0, 1e-6))
Mp = (formula(Tp) - 1) * 100
ok("M_max% = 100 e^(-pi xi/sqrt(1-xi^2))", vicino(Mp, 100 * math.exp(-math.pi * float(xs) / math.sqrt(1 - float(xs)**2)), 1e-6))
ok("xi = 0,707: M_max circa 4,3%", vicino(100 * math.exp(-math.pi * 0.7071 / math.sqrt(1 - 0.5)), 4.32, 5e-3))

# T_S: l'inviluppo e^(-xi wn t)/sqrt(1-xi^2) scende al 5% verso t = ln(20)/(xi wn) ≈ 3/(xi wn); al 2% ≈ 4/(xi wn)
ok("fascia 5%: ln 20 = 3,0", vicino(math.log(20), 3.0, 2e-3))
ok("fascia 2%: ln 50 = 3,9 ≈ 4", vicino(math.log(50), 3.91, 2e-3))
# numerico: xi = 0,4, wn = 1 -> ultimo istante fuori dal ±5% tra 6,5 e 8,5 (formula 7,5)
f1 = lambda tt: 1 - math.exp(-0.4 * tt) / math.sqrt(0.84) * math.sin(math.sqrt(0.84) * tt + math.atan(math.sqrt(0.84) / 0.4))
fuori = [k / 1000 for k in range(1, 30000) if abs(f1(k / 1000) - 1) > 0.05]
ok("xi=0,4: T_S(5%) numerico 7,6 vicino a 3/(xi wn) = 7,5", 6.5 < max(fuori) < 8.5)

# Esempio della spiegazione: G = 25/(s^2+4s+25) -> wn = 5, xi = 0,4, K = 1
ok("esempio: wn = 5, xi = 0,4", sp.sqrt(25) == 5 and sp.Rational(4, 2 * 5) == sp.Rational(2, 5))
wd5 = 5 * math.sqrt(1 - 0.16)
ok("esempio: T_P = 0,686 s", vicino(math.pi / wd5, 0.6856, 1e-3))
ok("esempio: T_S = 1,5 s", vicino(3 / (0.4 * 5), 1.5))
ok("esempio: M_max = 25,4%", vicino(100 * math.exp(-math.pi * 0.4 / math.sqrt(0.84)), 25.38, 1e-3))
# RLC della spiegazione: R = 100 ohm, L = 10 mH, C = 1 uF
wnr = 1 / math.sqrt(10e-3 * 1e-6)
xir = 100 / 2 * math.sqrt(1e-6 / 10e-3)
ok("RLC esempio: wn = 10000 rad/s, xi = 0,5", vicino(wnr, 10000) and vicino(xir, 0.5))
ok("RLC: R critica = 2 sqrt(L/C) = 200 ohm", vicino(2 * math.sqrt(10e-3 / 1e-6), 200))

# Esercizi del libro, pagine 488-489 (screenshot bsmart, doppia_0039)
# 1. (s+2)/(s^3+2s^2+5s): poli 0 e -1 ± j2, wn = sqrt(5), xi = 1/sqrt(5)
poli1 = sp.solve(s**3 + 2 * s**2 + 5 * s, s)
ok("libro es. 1: poli 0, -1 ± j2", set(poli1) == {0, -1 + 2 * sp.I, -1 - 2 * sp.I})
ok("libro es. 1: wn = sqrt 5, xi = 1/sqrt 5 = 0,447",
   sp.simplify(2 * (1 / sp.sqrt(5)) * sp.sqrt(5) - 2) == 0 and vicino(1 / math.sqrt(5), 0.447))
ok("libro es. 1: poli = wn(-xi ± j sqrt(1-xi^2))",
   sp.simplify(sp.sqrt(5) * (-1 / sp.sqrt(5) + sp.I * sp.sqrt(1 - sp.Rational(1, 5))) - (-1 + 2 * sp.I)) == 0)
# 2. R1 // L in serie, poi R2 // C verso massa, uscita su C
R1, R2 = sp.symbols("R1 R2", positive=True)
Z1 = R1 * s * L / (R1 + s * L)
Z2 = R2 / (1 + s * R2 * C)
G2 = sp.simplify(Z2 / (Z1 + Z2))
G2_attesa = (s * R2 * L + R1 * R2) / (s**2 * L * C * R1 * R2 + s * L * (R1 + R2) + R1 * R2)
ok("libro es. 2: G = (sR2L + R1R2)/(s^2 LC R1R2 + sL(R1+R2) + R1R2)", sp.simplify(G2 - G2_attesa) == 0)
# 3. denominatore diviso per LC R1 R2: s^2 + s (R1+R2)/(C R1 R2) + 1/(LC); con L = C = 1: wn = 1, xi = 1/(2 R1//R2)
den3 = sp.expand((s**2 * L * C * R1 * R2 + s * L * (R1 + R2) + R1 * R2) / (L * C * R1 * R2))
ok("libro es. 3: forma generale del denominatore",
   sp.simplify(den3 - (s**2 + s * (R1 + R2) / (C * R1 * R2) + 1 / (L * C))) == 0)
parallelo = R1 * R2 / (R1 + R2)
xi3 = sp.simplify((R1 + R2) / (R1 * R2) / 2)
ok("libro es. 3: xi = 1/(2 R1//R2) con L = C = 1", sp.simplify(xi3 - 1 / (2 * parallelo)) == 0)
ok("libro es. 3: xi = 1 con R1 = R2 = 1 ohm (R1//R2 = 0,5)", xi3.subs({R1: 1, R2: 1}) == 1)
# 4. impulso su 16/(s^2+8s+16) = 16/(s+4)^2 -> 16 t e^(-4t), caso critico wn = 4, xi = 1
u4 = sp.inverse_laplace_transform(16 / (s**2 + 8 * s + 16), s, t)
ok("libro es. 4: u(t) = 16 t e^(-4t)", sp.simplify(u4 - 16 * t * sp.exp(-4 * t) * sp.Heaviside(t)) == 0)
ok("libro es. 4 e quesito 2: wn = 4, xi = 1", sp.sqrt(16) == 4 and sp.Rational(8, 2 * 4) == 1)

for nome, esito in controlli:
    print(("OK  " if esito else "NO  ") + nome)
print(f"{sum(e for _, e in controlli)}/{len(controlli)}")
