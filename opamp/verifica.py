"""Controlla con sympy le formule di contenuto_mappa.js: ogni circuito si risolve con guadagno finito A
(v_o = A (v+ - v-)) e si fa il limite A -> oo. Uso: python -I verifica.py"""
from sympy import Eq, limit, oo, pi, simplify, solve, symbols, sin, diff, Abs

A = symbols("A", positive=True)
R, R1, R2, R3, R1a, R1b, RG, RL = symbols("R R1 R2 R3 R1a R1b RG RL", positive=True)
vi, va, vb, vip, vim, v, ii, Vos, Ip, Im, VOM, f, t = symbols("vi va vb vip vim v ii Vos Ip Im VOM f t", real=True)
vo, vm, vp, iL, vo1, vo2, vA, vB, m1, m2, p3, m3 = symbols("vo vm vp iL vo1 vo2 vA vB m1 m2 p3 m3")

risultati = []


def controlla(nome, equazioni, incognite, grandezza, atteso):
    sol = solve(equazioni, incognite, dict=True)[0]
    ottenuto = simplify(limit(sol[grandezza] if grandezza in sol else grandezza.subs(sol), A, oo))
    ok = simplify(ottenuto - atteso) == 0
    risultati.append(ok)
    print(("OK  " if ok else "NO  ") + nome, "" if ok else f"ottenuto {ottenuto}, atteso {atteso}")


opamp = lambda uscita, piu, meno: Eq(uscita, A * (piu - meno))

controlla("non invertente", [Eq(vm, vo * R1 / (R1 + R2)), opamp(vo, vi, vm)], [vo, vm], vo, vi * (1 + R2 / R1))
controlla("invertente", [Eq((vi - vm) / R1 + (vo - vm) / R2, 0), opamp(vo, 0, vm)], [vo, vm], vo, -R2 / R1 * vi)
controlla("buffer", [opamp(vo, vi, vo)], [vo], vo, vi)
controlla("sommatore invertente", [Eq((va - vm) / R1a + (vb - vm) / R1b + (vo - vm) / R2, 0), opamp(vo, 0, vm)],
          [vo, vm], vo, -R2 * (va / R1a + vb / R1b))
controlla("sommatore non invertente", [Eq((va - vp) / R + (vb - vp) / R, 0), Eq(vm, vo * R1 / (R1 + R2)), opamp(vo, vp, vm)],
          [vo, vp, vm], vo, (va + vb) / 2 * (1 + R2 / R1))
controlla("corrente -> tensione", [Eq(ii + (vo - vm) / R, 0), opamp(vo, 0, vm)], [vo, vm], vo, -R * ii)
controlla("differenziale", [Eq(vp, vip * R2 / (R1 + R2)), Eq((vim - vm) / R1 + (vo - vm) / R2, 0), opamp(vo, vp, vm)],
          [vo, vp, vm], vo, R2 / R1 * (vip - vim))
# Strumentazione: A1 ha vi- sul +, A2 ha vi+ sul +; A e B sono i - di A1 e A2, con 2R verso le uscite e RG tra A e B.
# A3: vo1 -> R -> -, vo2 -> R -> + con R a massa, R di retroazione.
controlla("strumentazione", [
    opamp(vo1, vim, vA), opamp(vo2, vip, vB),
    Eq((vo1 - vA) / (2 * R) + (vB - vA) / RG, 0), Eq((vo2 - vB) / (2 * R) + (vA - vB) / RG, 0),
    Eq(p3, vo2 / 2), Eq((vo1 - m3) / R + (vo - m3) / R, 0), opamp(vo, p3, m3),
], [vo1, vo2, vA, vB, p3, m3, vo], vo, (1 + 4 * R / RG) * (vip - vim))
# V -> I fuori massa: vo -> RL -> nodo -> R1 -> massa; R2 dal nodo a v- (nessuna corrente).
controlla("V->I fuori massa", [Eq(vm, iL * R1), Eq(vo, iL * (R1 + RL)), opamp(vo, vi, vm)], [vo, vm, iL], iL, vi / R1)
controlla("V->I fuori massa, vo", [Eq(vm, iL * R1), Eq(vo, iL * (R1 + RL)), opamp(vo, vi, vm)], [vo, vm, iL], vo,
          vi / R1 * (R1 + RL))
# V -> I a massa (Howland): A = v-, B = v+ = iL RL.
howland = [Eq((v - vm) / R1 + (vo - vm) / R2, 0), Eq((vi - vp) / R1 + (vo - vp) / R2, iL), Eq(vp, iL * RL), opamp(vo, vp, vm)]
controlla("V->I a massa", howland, [vo, vm, vp, iL], iL, (vi - v) / R1)
controlla("V->I a massa, C a massa", [e.subs(v, 0) for e in howland], [vo, vm, vp, iL], iL, vi / R1)
controlla("V->I a massa, vo", [e.subs(v, 0) for e in howland], [vo, vm, vp, iL], vo, vi / R1 * RL * (1 + R2 / R1))
controlla("offset", [Eq(vm, vo * R1 / (R1 + R2)), opamp(vo, Vos, vm)], [vo, vm], vo, Vos * (1 + R2 / R1))
bias = [Eq(vp, -Ip * R3), Eq(-vm / R1 + (vo - vm) / R2, Im), opamp(vo, vp, vm)]
controlla("polarizzazione, R3 = R1 || R2", [e.subs(R3, R1 * R2 / (R1 + R2)) for e in bias], [vo, vp, vm], vo, R2 * (Im - Ip))
pendenza = diff(VOM * sin(2 * pi * f * t), t).subs(t, 0)
ok = simplify(solve(Eq(pendenza, symbols("SR")), f)[0] - symbols("SR") / (2 * pi * VOM)) == 0
risultati.append(ok)
print(("OK  " if ok else "NO  ") + "slew rate, f_max")

# --- Spiegazione (spiegazione.js): passaggi e esempi numerici ---
Ib, Ro, i = symbols("Ib Ro i", real=True)
controlla("polarizzazione, formula generale", [Eq(vp, -Ib * R3), Eq(-vm / R1 + (vo - vm) / R2, Ib), opamp(vo, vp, vm)],
          [vo, vp, vm], vo, R2 * Ib * (1 - R3 * (R1 + R2) / (R1 * R2)))
# Strumentazione con la corrente in RG: vo2 - vo1 = (vi+ - vi-) + 4R i, i = (vi+ - vi-)/RG.
ok = simplify((vip + 2 * R * (vip - vim) / RG) - (vim - 2 * R * (vip - vim) / RG) - (1 + 4 * R / RG) * (vip - vim)) == 0
risultati.append(ok); print(("OK  " if ok else "NO  ") + "strumentazione, corrente in RG")
# Resistenza d'uscita ad anello chiuso del non invertente: Ro / (1 + A beta), con A grande -> Ro (1 + R2/R1) / A.
rout = Ro / (1 + A * R1 / (R1 + R2))
ok = simplify(limit(rout * A, A, oo) - Ro * (1 + R2 / R1)) == 0
risultati.append(ok); print(("OK  " if ok else "NO  ") + "R_out ad anello chiuso")
# Sommatore non invertente a n ingressi (n = 3): media x G.
v1, v2, v3 = symbols("v1 v2 v3", real=True)
controlla("sommatore non invertente, 3 ingressi",
          [Eq((v1 - vp) / R + (v2 - vp) / R + (v3 - vp) / R, 0), Eq(vm, vo * R1 / (R1 + R2)), opamp(vo, vp, vm)],
          [vo, vp, vm], vo, (v1 + v2 + v3) / 3 * (1 + R2 / R1))


def numero(nome, ottenuto, atteso, tolleranza=0.01):
    ok = abs(float(ottenuto) - atteso) <= tolleranza * abs(atteso)
    risultati.append(ok)
    print(("OK  " if ok else "NO  ") + nome, "" if ok else f"ottenuto {float(ottenuto)}, atteso {atteso}")


k = 1e3
numero("zona lineare 741: 65 uV", 13 / 2e5, 65e-6)
numero("non invertente 8/10: 1,47", 1 + 2.2 * k / (4.7 * k), 1.47)
numero("invertente 30/9: G = -10", -100 * k / (10 * k), -10)
numero("invertente 30/9: Vi max 1,3 V", 13 / 10, 1.3)
numero("partitore a vuoto 6 V", 12 * 10 * k / (20 * k), 6)
numero("partitore con carico 4 V", 12 * 5 * k / (10 * k + 5 * k), 4)
numero("sommatore 3/10: uscita 9 V pp", 100 * k / (33 * k) * 3, 9.09)
numero("I->V: R = 10 kOhm", 10 / 1e-3, 10e3)
numero("V->I fuori massa: vo = 4 V", 2 / k * (k + k), 4)
numero("V->I fuori massa: vi max 6,5 V", 13 * k / (k + k), 6.5)
numero("V->I a massa: vo = 4 V", 4 / k * 500 * (1 + k / k), 4)
numero("offset: 22 mV", 2e-3 * (1 + 100 * k / (10 * k)), 22e-3)
numero("R_out 741: 4 mOhm", 75 / 2e5 * 11, 4.1e-3)
numero("CMRR 90 dB: G_CM = 6,3", 2e5 / 10 ** (90 / 20), 6.32)
numero("slew rate: f_max 8 kHz", 0.5e6 / (2 * pi * 10), 7.96e3)
numero("slew rate: salto 40 us", 20 / 0.5e6, 40e-6)
numero("GBP: f_H 5 Hz", 1e6 / 2e5, 5)
numero("GBP: G = 100 -> 10 kHz", 1e6 / 100, 10e3)

print(f"{sum(risultati)}/{len(risultati)}")
