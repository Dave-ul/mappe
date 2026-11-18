"""Verifica con sympy le formule della mappa di laboratorio: segnali, op-amp con guadagno finito (limite A -> oo),
inseguitore, LM35, condizionamento con offset."""
import sympy as sp

A, Ri, Rf, R1, R2, R3, Vi, V1, V2, V3, x = sp.symbols("A R_i R_f R_1 R_2 R_3 V_i V_1 V_2 V_3 x", positive=True)
controlli = []


def ok(nome, cond):
    controlli.append((nome, bool(cond)))


def uscita(eq_nodi, incognite):
    """Risolve Kirchhoff con vo = A (v+ - v-), poi fa il limite per A -> oo."""
    sol = sp.solve(eq_nodi, incognite, dict=True)[0]
    return sp.limit(sol[incognite[0]], A, sp.oo)


vo, vm, vp = sp.symbols("v_o v_m v_p")

# Segnali
M, m, Vp, Voff, f, T, dt = sp.symbols("V_M V_m V_p V_off f T Delta_t", positive=True)
t = sp.symbols("t", real=True)
veff = sp.sqrt(sp.integrate((M * sp.sin(2 * sp.pi * t / T)) ** 2, (t, 0, T)) / T)
ok("Veff sinusoide = VM/sqrt2", sp.simplify(veff - M / sp.sqrt(2)) == 0)
ok("offset: 5 V di picco + 2 V -> +7 / -3", (2 + 5, 2 - 5) == (7, -3))
ok("Vpp = Vmax - Vmin = 2 Vp", sp.simplify((Voff + Vp) - (Voff - Vp) - 2 * Vp) == 0)
ok("sfasamento: Delta_t = T -> 360 gradi", sp.simplify(360 * dt / T).subs(dt, T) == 360)

# Invertente: nodo v- con v+ = 0
inv = uscita([sp.Eq((Vi - vm) / Ri, (vm - vo) / Rf), sp.Eq(vo, A * (0 - vm))], [vo, vm])
ok("invertente Av = -Rf/Ri", sp.simplify(inv / Vi + Rf / Ri) == 0)

# Non invertente: v+ = Vi, partitore Rf-Ri su v-
ninv = uscita([sp.Eq(vm, vo * Ri / (Ri + Rf)), sp.Eq(vo, A * (Vi - vm))], [vo, vm])
ok("non invertente Av = 1 + Rf/Ri", sp.simplify(ninv / Vi - (1 + Rf / Ri)) == 0)
ok("inseguitore: Rf = 0 -> Av = 1", sp.simplify((ninv / Vi).subs(Rf, 0)) == 1)
ok("inseguitore: Ri -> oo -> Av = 1", sp.limit(ninv / Vi, Ri, sp.oo) == 1)

# Sommatore invertente a 3 ingressi
som = uscita([sp.Eq((V1 - vm) / R1 + (V2 - vm) / R2 + (V3 - vm) / R3, (vm - vo) / Rf), sp.Eq(vo, A * (0 - vm))],
             [vo, vm])
ok("sommatore invertente", sp.simplify(som + Rf * (V1 / R1 + V2 / R2 + V3 / R3)) == 0)
comb = som.subs({R1: Rf, R2: Rf / 3, R3: Rf / 2})
ok("combinatore -(V1 + 3V2 + 2V3)", sp.simplify(comb + (V1 + 3 * V2 + 2 * V3)) == 0)

# Differenziale: V1 su Ri verso v-, V2 su Ri con Rf a massa su v+
dif = uscita([sp.Eq((V1 - vm) / Ri, (vm - vo) / Rf), sp.Eq(vp, V2 * Rf / (Ri + Rf)), sp.Eq(vo, A * (vp - vm))],
             [vo, vm, vp])
ok("differenziale Vo = Rf/Ri (V2 - V1)", sp.simplify(dif - Rf / Ri * (V2 - V1)) == 0)
ok("differenziale: V1 = V2 -> 0", sp.simplify(dif.subs(V2, V1)) == 0)
ok("differenziale: V2 = -V1 -> -2 Rf/Ri V1", sp.simplify(dif.subs(V2, -V1) + 2 * Rf / Ri * V1) == 0)

# Vin massima prima della saturazione
Vsat, Av = sp.symbols("V_sat A_v", positive=True)
ok("Vin,max = Vsat/|Av|", sp.simplify((Av * (Vsat / Av)) - Vsat) == 0)

# Inseguitore: corrente nel carico, limite del 741 a 25 mA
ok("IL = 5 V / 1 kOhm = 5 mA", sp.Rational(5, 1000) == sp.Rational(5, 10**3))
ok("RL,min = 5 V / 25 mA = 200 Ohm", sp.Rational(5) / sp.Rational(25, 1000) == 200)

# LM35: 10 mV/°C; 50 °C -> 0,5 V; Av = 5/0,5 = 10 -> Rf = 9 Ri
k = sp.Rational(10, 1000)
ok("LM35 a 50 °C = 0,5 V", k * 50 == sp.Rational(1, 2))
ok("Av = Vo,max / VLM35,max = 10", sp.Integer(5) / (k * 50) == 10)
ok("Rf = (Av - 1) Ri", sp.solve(sp.Eq(1 + Rf / Ri, 10), Rf)[0] == 9 * Ri)
E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]
ok("E12 piu' vicino a 16,2 k = 15 k", min(E12, key=lambda v: abs(v - 16.2)) == 15)
Tmax = (sp.Rational(138, 10) / 10) / k
ok("Tmax = Vsat/Av / (10 mV/°C) = 138 °C con Av = 10", Tmax == 138)

# Condizionamento con offset: Vo = k (Vs - Vr), due punti (Vs,min -> Vo,min), (Vs,max -> Vo,max)
kk, Vr, smin, smax, omin, omax = sp.symbols("k V_r V_smin V_smax V_omin V_omax")
sol = sp.solve([sp.Eq(omin, kk * (smin - Vr)), sp.Eq(omax, kk * (smax - Vr))], [kk, Vr], dict=True)[0]
ok("k = R3/R2 = dVo/dVs", sp.simplify(sol[kk] - (omax - omin) / (smax - smin)) == 0)
ok("Vr = Vs,min - Vo,min/k", sp.simplify(sol[Vr] - (smin - omin / sol[kk])) == 0)
num = {smin: sp.Rational(3, 2), smax: 4, omin: -5, omax: 5}
ok("umidita': k = 4, Vr = 2,75 V", (sol[kk].subs(num), sol[Vr].subs(num)) == (4, sp.Rational(11, 4)))

# LED: R = (Vcc - VLED)/ILED
Vcc, VL, IL = sp.symbols("V_CC V_LED I_LED", positive=True)
R = sp.solve(sp.Eq(Vcc, VL + x * IL), x)[0]
ok("LED R = (Vcc - VLED)/ILED", sp.simplify(R - (Vcc - VL) / IL) == 0)

falliti = [n for n, c in controlli if not c]
print(f"{len(controlli) - len(falliti)}/{len(controlli)}")
for n in falliti:
    print("FALLITO:", n)
