"""Verifica con sympy le formule del secondo foglio di TPSEE (encoder, motore in c.c. dinamico) e gli esercizi del libro
(encoder pp. 80-83, motore pp. 289) usati nella spiegazione."""
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

# --- Motore in c.c. dinamico ---
s = sp.symbols("s")
R, L, ke, kme, katt, J = sp.symbols("R L k_e k_me k_att J", positive=True)
Vg, I, W, Cres = sp.symbols("V_g I omega C_res")
el = sp.Eq(Vg - R * I - s * L * I - ke * W, 0)
mec = sp.Eq(kme * I - Cres - katt * W - s * J * W, 0)
sol = sp.solve([el, mec], [I, W], dict=True)[0]
ok("I(s) = (V_g - k_e w)/(R + sL)", sp.simplify(sp.solve(el, I)[0] - (Vg - ke * W) / (R + s * L)) == 0)
ok("w(s) = (k_me I - C_res)/(k_att + sJ)", sp.simplify(sp.solve(mec, W)[0] - (kme * I - Cres) / (katt + s * J)) == 0)
G = sp.simplify(sol[W].subs(Cres, 0) / Vg)
ok("w/V_g = k_me/((R+sL)(k_att+sJ)+k_e k_me)", sp.simplify(G - kme / ((R + s * L) * (katt + s * J) + ke * kme)) == 0)
ok("denominatore di grado 2 in s", sp.degree(sp.denom(sp.together(G)), s) == 2)
# a regime (s = 0) e senza attrito: w = V_g/k_e, come a vuoto nel foglio 1
ok("s=0, k_att=0: w = V_g/k_e", sp.simplify(G.subs({s: 0, katt: 0}) * Vg - Vg / ke) == 0)
# regime del modello completo: I = (V_g - k_e w)/R, coppia motrice = C_res + k_att w
ok("s=0: I = (V_g - k_e w)/R", sp.simplify(sp.solve(el.subs(s, 0), I)[0] - (Vg - ke * W) / R) == 0)

# es. 1 p. 289: R = 4, 24 V; bloccato 2 Nm e 4 A; libero 1200 giri/min e 0,2 A
k_me1 = sp.Rational(2) / 4
ok("es. 1: k_me = 0,5 Nm/A", k_me1 == sp.Rational(1, 2))
Catt1 = k_me1 * sp.Rational(2, 10)
ok("es. 1: C_att = 0,1 Nm", Catt1 == sp.Rational(1, 10))
ok("es. 1: k_att = 8,33e-5 Nm/(giri/min)", vicino(Catt1 / 1200, 8.333e-5, 1e-3))
e1 = 24 - 4 * sp.Rational(2, 10)
ok("es. 1: e = 23,2 V", e1 == sp.Rational(232, 10))
ok("es. 1: k_e = 0,0193 V/(giri/min)", vicino(e1 / 1200, 0.01933, 1e-3))
# es. 2 p. 289 (soluzione nella spiegazione): 24 V, R = 5; bloccato 10 Nm; 500 giri/min -> 0,5 Nm; C_res = 4 Nm
I_bl = sp.Rational(24, 5)
k_me2 = 10 / I_bl
ok("es. 2: I bloccato 4,8 A, k_me = 2,083", I_bl == sp.Rational(24, 5) and vicino(k_me2, 2.0833, 1e-3))
pend = (10 - sp.Rational(1, 2)) / 500
ok("es. 2: pendenza 0,019 Nm/(giri/min)", pend == sp.Rational(19, 1000))
n2 = (10 - 4) / pend
ok("es. 2: n = 315,8 giri/min", vicino(n2, 315.8, 1e-3))
I2 = 4 / k_me2
ok("es. 2: I = 1,92 A", vicino(I2, 1.92, 1e-3))
k_e2 = pend * 5 / k_me2
ok("es. 2: k_e = 0,0456 V/(giri/min)", vicino(k_e2, 0.0456, 1e-3))
ok("es. 2: controllo con la maglia I = (24 - k_e n)/R", vicino((24 - k_e2 * n2) / 5, I2, 1e-6))

for nome, esito in controlli:
    print(("OK  " if esito else "NO  ") + nome)
print(f"{sum(e for _, e in controlli)}/{len(controlli)}")
