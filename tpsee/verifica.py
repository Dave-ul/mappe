"""Verifica con sympy le formule del primo foglio di TPSEE (motore in c.c. a regime e dinamico, esercizi p. 289)
e le basi (Ohm, partitore, LED) usate solo nella spiegazione."""
import sympy as sp

VA, RA, IA, KE, Kme, w, C, Cr = sp.symbols("V_A R_A I_A K_E K_me omega C C_r", positive=True)

controlli = []

def ok(nome, cond):
    controlli.append((nome, bool(cond)))

# Sistema degli appunti: maglia a regime + coppia
maglia = sp.Eq(VA - RA * IA - KE * w, 0)
coppia = sp.Eq(C, Kme * IA)
sol = sp.solve([maglia, coppia], [IA, C], dict=True)[0]

# Caratteristica meccanica: C = Kme*VA/RA - Kme*KE/RA * w
ok("caratteristica C(omega)", sp.simplify(sol[C] - (Kme * VA / RA - Kme * KE / RA * w)) == 0)
ok("corrente I_A = (V_A - K_E w)/R_A", sp.simplify(sol[IA] - (VA - KE * w) / RA) == 0)
# Retta: pendenza indipendente da V_A (rette parallele), intercetta che cresce con V_A
ok("pendenza -Kme*KE/RA", sp.simplify(sp.diff(sol[C], w) + Kme * KE / RA) == 0)
ok("pendenza non dipende da V_A", sp.diff(sp.diff(sol[C], w), VA) == 0)
# Intercette
ok("spunto omega=0", sp.simplify(sol[C].subs(w, 0) - Kme * VA / RA) == 0)
ok("a vuoto C=0", sp.simplify(sp.solve(sp.Eq(sol[C], 0), w)[0] - VA / KE) == 0)
ok("rotore bloccato I_A=V_A/R_A", sp.simplify(sol[IA].subs(w, 0) - VA / RA) == 0)
# Punto di lavoro con coppia resistente C_r: omega = (V_A - R_A C_r/Kme)/K_E
wl = sp.solve(sp.Eq(sol[C], Cr), w)[0]
ok("punto di lavoro", sp.simplify(wl - (VA - RA * Cr / Kme) / KE) == 0)
ok("V_A cresce -> omega cresce", sp.diff(wl, VA).is_positive)
ok("C_r cresce -> omega cala", sp.diff(wl, Cr).is_negative)
# Errore del quaderno (26-11-10 Motore cc p4): Kme*V_g/R_A al posto di Kme*V_A/R_A
Vg = KE * w
ok("versione del quaderno diversa", sp.simplify((Kme * Vg / RA - Kme * KE / RA * w) - sol[C]) != 0)

# Bilancio di potenza (spiegazione): V_g*I_A = C*omega  =>  K_E = K_me
ok("bilancio di potenza K_E = K_me", sp.simplify((KE * w * IA - Kme * IA * w).subs(Kme, KE)) == 0)

# Esempi numerici della spiegazione: R_A = 2 ohm, K_E = K_me = 0,1
num = {RA: 2, KE: sp.Rational(1, 10), Kme: sp.Rational(1, 10)}
Cn = sol[C].subs(num)
ok("24 V: omega0 = 240 rad/s", sp.solve(sp.Eq(Cn.subs(VA, 24), 0), w)[0] == 240)
ok("24 V: spunto 1,2 N m", Cn.subs({VA: 24, w: 0}) == sp.Rational(12, 10))
ok("24 V: I spunto 12 A", sol[IA].subs(num).subs({VA: 24, w: 0}) == 12)
ok("C_r = 0,3: I_A = 3 A", sp.solve(sp.Eq(coppia.rhs.subs(num), sp.Rational(3, 10)), IA)[0] == 3)
for v, atteso in [(24, 180), (10, 40)]:
    ok(f"C_r = 0,3, {v} V: omega = {atteso}", wl.subs(num).subs({VA: v, Cr: sp.Rational(3, 10)}) == atteso)
ok("2 V: spunto 0,1 < 0,3, non parte", Cn.subs({VA: 2, w: 0}) == sp.Rational(1, 10))

# --- Basi (lavagna 3/11, Motore cc 10/11 p1) ---
V, R1, R2, I = sp.symbols("V R_1 R_2 I", positive=True)
Is = sp.solve(sp.Eq(V - R1 * I - R2 * I, 0), I)[0]
ok("serie: I = V/(R1+R2)", sp.simplify(Is - V / (R1 + R2)) == 0)
ok("partitore: V_R1 = V R1/(R1+R2)", sp.simplify(R1 * Is - V * R1 / (R1 + R2)) == 0)
ok("partitore: V_R1 + V_R2 = V", sp.simplify(R1 * Is + R2 * Is - V) == 0)
k = 10**3
for v, vr2, vr1 in [(5, sp.Rational(35, 10), sp.Rational(15, 10)), (10, 7, 3), (24, sp.Rational(168, 10), sp.Rational(72, 10))]:
    sub = {V: v, R1: 3 * k, R2: 7 * k}
    ok(f"partitore 3k/7k a {v} V: {vr2} e {vr1}", (R2 * Is).subs(sub) == vr2 and (R1 * Is).subs(sub) == vr1)
ok("errore quaderno: 5 V / 10 kΩ = 0,5 mA, non 0,2", sp.Rational(5, 10 * k) == sp.Rational(5, 10**4) != sp.Rational(2, 10**4))
ok("10 V / 10 kΩ = 1 mA", sp.Rational(10, 10 * k) == sp.Rational(1, k))
ok("24 V / 10 kΩ = 2,4 mA", sp.Rational(24, 10 * k) == sp.Rational(24, 10**4))
ok("Ohm: 5 V / 1 kΩ = 5 mA", sp.Rational(5, k) == 5 * sp.Rational(1, k))
ok("Ohm: 12 V / 2 MΩ = 6 µA", sp.Rational(12, 2 * 10**6) == 6 * sp.Rational(1, 10**6))
ok("prefissi: 10^12 = 10^6 * 10^6 = 10^3 G", 10**12 == 10**6 * 10**6 == 10**3 * 10**9)
ok("prefissi: 1/1000 = 10^-3", sp.Rational(1, 1000) == sp.Integer(10)**-3)
# LED: R = (V - V_AK)/I_LED, esempio 5 V, 2 V, 30 mA -> 100 ohm; 20 mA -> 150 ohm
VAK, IL = sp.symbols("V_AK I_LED", positive=True)
Rled = sp.solve(sp.Eq(V - R1 * IL - VAK, 0), R1)[0]
ok("LED: R = (V - V_AK)/I", sp.simplify(Rled - (V - VAK) / IL) == 0)
ok("LED 5 V, 2 V, 30 mA: 100 Ω", Rled.subs({V: 5, VAK: 2, IL: sp.Rational(30, k)}) == 100)
ok("LED 5 V, 2 V, 20 mA: 150 Ω", Rled.subs({V: 5, VAK: 2, IL: sp.Rational(20, k)}) == 150)
# Corrente come flusso di carica: 1 A = 1 C/s ≈ 6,24e18 elettroni al secondo
ok("1 C / 1,602e-19 C ≈ 6,24e18 elettroni", abs(1 / 1.602e-19 - 6.24e18) / 6.24e18 < 1e-3)

# Formule inverse (spiegazione 2026-11-20, nota Motore cc del 12/11 p. 6): X*Y = Z -> Y = Z/X
ok("inversa: I_A = C/K_me", sp.solve(coppia.subs(C, Cr), IA)[0] == Cr / Kme)
ok("inversa: omega = (V_A - R_A I_A)/K_E", sp.simplify(sp.solve(maglia, w)[0] - (VA - RA * IA) / KE) == 0)
ok("inversa: R = V/I", sp.solve(sp.Eq(V, R1 * I), R1)[0] == V / I)
# Partitore passo per passo a 10 V: 1 mA, 3 V e 7 V, somma 10 V
sub10 = {V: 10, R1: 3 * k, R2: 7 * k}
ok("10 V: V_R1 = 3 V, V_R2 = 7 V, somma 10", (R1 * Is).subs(sub10) == 3 and (R2 * Is).subs(sub10) == 7)

def vicino(a, b, tol=5e-3):
    return abs(float(a) - float(b)) <= tol * max(1, abs(float(b)))


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
