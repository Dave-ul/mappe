"""Verifica con sympy le formule della mappa sul motore in c.c. (regime stazionario)."""
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

for nome, esito in controlli:
    print(("OK  " if esito else "NO  ") + nome)
print(f"{sum(e for _, e in controlli)}/{len(controlli)}")
