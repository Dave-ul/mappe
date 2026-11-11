"""Verifica con sympy le formule della mappa di TPSEE: motore in c.c. (regime stazionario) e basi (Ohm, partitore, LED)."""
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

for nome, esito in controlli:
    print(("OK  " if esito else "NO  ") + nome)
print(f"{sum(e for _, e in controlli)}/{len(controlli)}")
