"""Verifica con sympy le formule del secondo foglio di TPSEE (encoder e SCR in alternata; passo-passo e acquisizione non hanno formule)
e gli esercizi del libro sull'encoder (pp. 80-83) usati nella spiegazione."""
import sympy as sp

controlli = []


def ok(nome, cond):
    controlli.append((nome, bool(cond)))


def vicino(a, b, tol=5e-3):
    return abs(float(a) - float(b)) <= tol * max(1, abs(float(b)))


# --- Encoder ---
nD, N, f, D = sp.symbols("n_D N f D", positive=True)
alfa1 = sp.Integer(360) / nD
ok("es. 6: 30 fori -> 12° per impulso", alfa1.subs(nD, 30) == 12)
ok("es. 6: 10 impulsi -> 120°", (N * alfa1).subs({N: 10, nD: 30}) == 120)
n = f / nD * 60
ok("es. 7: 60 fori, 200 Hz -> 200 giri/min", n.subs({f: 200, nD: 60}) == 200)
# n = f/nD*60 viene da: giri al secondo = impulsi al secondo / impulsi per giro
ok("formula n = 60 f / n_D", sp.simplify(n - 60 * (f / nD)) == 0)
v = sp.pi * D * n / 60
ok("v = pi D n / 60 = pi D f / n_D", sp.simplify(v - sp.pi * D * f / nD) == 0)
# es. 8: 30 fori su D = 5 cm, T_ON = 200 us, T_OFF = 700 us
x = sp.pi * D / (2 * nD)
x8 = x.subs({D: sp.Rational(5, 100), nD: 30})
ok("es. 8: x = 2,6 mm", vicino(x8 * 1000, 2.618))
vmax = x8 / sp.Rational(700, 10**6)
ok("es. 8: v_max = 3,74 m/s (libro 3,71 con x arrotondato)", vicino(vmax, 3.74, 2e-3))
nmax = 60 * vmax / (sp.pi * sp.Rational(5, 100))
ok("es. 8: n_max = 1429 giri/min (libro 1418 con x arrotondato)", vicino(nmax, 1428.6, 1e-3))
ok("es. 8 col libro: 60*3,71/(pi*0,05) = 1417", vicino(60 * 3.71 / (sp.pi * 0.05), 1417, 1e-3))
# n_max in forma chiusa = 60 / (2 n_D T_OFF): non dipende dal diametro
TOFF = sp.symbols("T_OFF", positive=True)
ok("n_max = 60/(2 n_D T_OFF)", sp.simplify(60 * (x / TOFF) / (sp.pi * D) - 60 / (2 * nD * TOFF)) == 0)
# es. 9: 40 impulsi a giro, D = 45 cm -> v = 0,035 f m/s = 0,127 f km/h
v9 = (sp.pi * sp.Rational(45, 100) / 40)
ok("es. 9: v = 0,0353 f [m/s]", vicino(v9, 0.0353, 2e-3))
ok("es. 9: v = 0,127 f [km/h] (libro 0,126)", vicino(v9 * 3.6, 0.127, 3e-3))
# es. 10: 80 impulsi a giro, D = 35 cm, 135 impulsi -> 185,5 cm
si = sp.pi * 35 / 80
ok("es. 10: s_i = 1,374 cm", vicino(si, 1.374, 1e-3))
ok("es. 10: 135 impulsi = 185,5 cm", vicino(135 * si, 185.5, 1e-3))
# es. 11 (da svolgere, nella spiegazione): 60 fori, D = 65 cm, 700 Hz
n11 = n.subs({f: 700, nD: 60})
ok("es. 11: n = 700 giri/min", n11 == 700)
v11 = sp.pi * sp.Rational(65, 100) * 700 / 60
ok("es. 11: v = 23,8 m/s = 85,8 km/h", vicino(v11, 23.82, 1e-3) and vicino(v11 * 3.6, 85.77, 1e-3))

# Flip-flop D: Q prende D (fase A) sul fronte di salita di B
def q_al_fronte(anticipo_A):
    # fase A alta da 0 a T/2; B uguale ma spostata di T/4 (A in anticipo) o di -T/4 (A in ritardo)
    T = 1.0
    sh = T / 4 if anticipo_A else -T / 4
    fronte_B = sh % T
    A = 1 if (fronte_B % T) < T / 2 else 0
    return A
ok("FF-D: A in anticipo -> Q = 1 (orario)", q_al_fronte(True) == 1)
ok("FF-D: A in ritardo -> Q = 0 (antiorario)", q_al_fronte(False) == 0)

# --- SCR (lavagna del 24/11, pp. 3 e 5-8) ---
ok("V_eff = V_max/sqrt2 = 0,707 V_max", vicino(1 / sp.sqrt(2), 0.707, 1e-3))
ok("220 V eff -> V_max = 311 V", vicino(220 * sp.sqrt(2), 311.1, 1e-3))
ok("220 V eff = 311/sqrt2 (come V_max = V_eff/0,707 della lavagna)", vicino(311 * 0.707, 220, 2e-3))
ok("50 Hz -> T = 20 ms", sp.Rational(1, 50) == sp.Rational(20, 1000))
# controllo di fase: l'area della semionda condotta da alfa a pi vale 1 + cos(alfa): cala se l'impulso arriva più tardi
al = sp.symbols("alpha")
area = sp.integrate(sp.sin(sp.symbols("theta")), (sp.symbols("theta"), al, sp.pi))
ok("area condotta = 1 + cos(alfa)", sp.simplify(area - (1 + sp.cos(al))) == 0)
ok("impulso più tardi -> meno area (derivata < 0 tra 0 e pi)", sp.simplify(sp.diff(area, al) + sp.sin(al)) == 0)
ok("alfa = 0 -> semionda intera (area 2), alfa = pi -> 0", area.subs(al, 0) == 2 and area.subs(al, sp.pi) == 0)

for nome, esito in controlli:
    print(("OK  " if esito else "NO  ") + nome)
print(f"{sum(e for _, e in controlli)}/{len(controlli)}")
