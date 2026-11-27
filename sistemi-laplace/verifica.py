"""Verifica con sympy le formule della mappa su Laplace e funzioni di trasferimento (libro, Moduli G e H1)."""
import sympy as sp

controlli = []


def ok(nome, cond):
    controlli.append((nome, bool(cond)))


def uguali(a, b):
    return sp.simplify(sp.expand(a - b)) == 0


s, t = sp.symbols("s t", positive=True)
w, k, a, tau, E, C, R, L, q, h0, hi = sp.symbols("omega k a tau E C R L q h_0 h_i", positive=True)
A = sp.symbols("A")
TRAPPOLE = dict(noconds=True)


def lap(f):
    return sp.laplace_transform(f, t, s, **TRAPPOLE)


def ilap(F):
    return sp.simplify(sp.inverse_laplace_transform(F, s, t).subs(sp.Heaviside(t), 1))


# Tabella minima
ok("L{1} = 1/s", uguali(lap(sp.Integer(1)), 1 / s))
ok("L{t} = 1/s^2", uguali(lap(t), 1 / s**2))
for n in range(2, 6):
    ok(f"L{{t^{n}}} = n!/s^(n+1)", uguali(lap(t**n), sp.factorial(n) / s ** (n + 1)))
treale = sp.symbols("t", real=True)  # con t positivo sympy esclude l'impulso in t = 0
ok("L{delta} = 1", sp.laplace_transform(sp.DiracDelta(treale), treale, s, noconds=True) == 1)
ok("L{sin wt}", uguali(lap(sp.sin(w * t)), w / (s**2 + w**2)))
ok("L{cos wt}", uguali(lap(sp.cos(w * t)), s / (s**2 + w**2)))

# Eulero
al = sp.symbols("alpha", real=True)
ok("Eulero sin", uguali(sp.expand_complex((sp.exp(sp.I * al) - sp.exp(-sp.I * al)) / (2 * sp.I)), sp.sin(al)))
ok("Eulero cos", uguali(sp.expand_complex((sp.exp(sp.I * al) + sp.exp(-sp.I * al)) / 2), sp.cos(al)))

# Teoremi, su funzioni di prova
f = sp.cos(2 * t) + t
F = lap(f)
ok("linearità", uguali(lap(3 * sp.sin(t) + 5 * t), 3 * lap(sp.sin(t)) + 5 * lap(t)))
ok("traslazione in s", uguali(lap(t**2 * sp.exp(-3 * t)), lap(t**2).subs(s, s + 3)))
ritardo = sp.laplace_transform((t - 2) * sp.Heaviside(t - 2), t, s, noconds=True)
ok("ritardo", uguali(ritardo, sp.exp(-2 * s) * lap(t)))
ok("derivata", uguali(lap(sp.diff(f, t)), s * F - f.subs(t, 0)))
ok("derivata seconda", uguali(lap(sp.diff(f, t, 2)), s**2 * F - s * f.subs(t, 0) - sp.diff(f, t).subs(t, 0)))
x = sp.symbols("x", positive=True)
ok("integrale", uguali(lap(sp.integrate(f.subs(t, x), (x, 0, t))), F / s))
ok("per t", uguali(lap(t * sp.sin(w * t)), -sp.diff(lap(sp.sin(w * t)), s)))
g = 1 - sp.exp(-t)
ok("valore finale", sp.limit(s * lap(g), s, 0) == sp.limit(g, t, sp.oo))
h = sp.exp(-t)
ok("valore iniziale", sp.limit(s * lap(h), s, sp.oo) == sp.limit(h, t, 0))

# Antitrasformata: residui
U = (s + 2) / ((s + 1) * (s + 3))
ok("residui poli semplici", sp.simplify((U * (s + 1)).subs(s, -1)) == sp.Rational(1, 2)
   and sp.simplify((U * (s + 3)).subs(s, -3)) == sp.Rational(1, 2))
U2 = (2 + s) / ((s + 1) ** 2 * s)
Amax = sp.simplify((U2 * (s + 1) ** 2).subs(s, -1))
A1 = sp.simplify(sp.diff(sp.simplify(U2 * (s + 1) ** 2), s, 1).subs(s, -1) / sp.factorial(1))
B = sp.simplify((U2 * s).subs(s, 0))
ok("residui polo doppio (grado massimo, derivata, polo semplice)",
   uguali(Amax / (s + 1) ** 2 + A1 / (s + 1) + B / s, U2))
U3 = (s + 1) / (s**3 * (s + 2))
p3 = sp.simplify(U3 * s**3)
coeff = [sp.simplify(sp.diff(p3, s, kk).subs(s, 0) / sp.factorial(kk)) for kk in range(3)]
ok("residui polo triplo: derivo k volte, divido per k!",
   uguali(sum(c / s ** (3 - kk) for kk, c in enumerate(coeff)) + sp.simplify((U3 * (s + 2)).subs(s, -2)) / (s + 2), U3))

# Vedo → antitrasformo
p = sp.symbols("p", negative=True)
ok("A/s → A", uguali(ilap(A / s), A))
ok("A/s^2 → A t", uguali(ilap(A / s**2), A * t))
ok("A/(s-p) → A e^(pt)", uguali(ilap(A / (s - p)), A * sp.exp(p * t)))
ok("A/(s-p)^2 → A t e^(pt)", uguali(ilap(A / (s - p) ** 2), A * t * sp.exp(p * t)))
ok("1/(1+tau s) → e^(-t/tau)/tau", uguali(ilap(1 / (1 + tau * s)), sp.exp(-t / tau) / tau))
ok("w/((s+a)^2+w^2) → e^(-at) sin wt", uguali(ilap(w / ((s + a) ** 2 + w**2)), sp.exp(-a * t) * sp.sin(w * t)))

# f.d.t. dei componenti e del circuito RC
ok("C: i = C dv/dt → V/I = 1/(sC)", uguali(1 / (s * C), 1 / (s * C)))
Grc = sp.simplify((1 / (s * C)) / (R + 1 / (s * C)))
ok("RC: G = 1/(1+tau s), tau = RC", uguali(Grc, 1 / (1 + s * R * C)))

# Due forme e p = -1/tau
Gpz = (s + 1) / ((s + sp.Rational(1, 2)) * (s + sp.Rational(1, 4)))
Gct = 8 * (1 + s) / ((1 + 2 * s) * (1 + 4 * s))
ok("poli e zeri ⇄ costanti di tempo (K = 8, mu = 1)", uguali(Gpz, Gct))
zz = sp.symbols("z")
ok("p = -1/tau", sp.solve(1 + tau * zz, zz) == [-1 / tau])

# Risposte del primo ordine
ok("gradino E → E(1-e^(-t/tau))", uguali(ilap(E / (s * (1 + tau * s))), E * (1 - sp.exp(-t / tau))))
rampa = ilap(1 / (s**2 * (1 + tau * s)))
ok("rampa → t - tau + tau e^(-t/tau)", uguali(rampa, t - tau + tau * sp.exp(-t / tau)))
ok("rampa: asintoto t - tau", sp.limit(rampa - (t - tau), t, sp.oo) == 0)
risp = hi * (1 - sp.exp(-t / tau))
pend = sp.diff(risp, t).subs(t, 0)
ok("tangente nell'origine incontra l'asintoto in t = tau", sp.solve(sp.Eq(pend * t, hi), t) == [tau])

# Sistemi idraulici e termici
Hu, Hi, Q = sp.symbols("H_u H_i Q")
Rs, Cs = sp.symbols("R_1 C_1", positive=True)
sol = sp.solve([sp.Eq(Q, Cs * s * Hu), sp.Eq(Rs, (Hi - Hu) / Q)], [Hu, Q], dict=True)[0]
ok("serbatoio semplice: G = 1/(1+tau s), tau = RC", uguali(sol[Hu] / Hi, 1 / (1 + Rs * Cs * s)))
ok("afflusso costante: G = 1/(sC), h = q t / C", uguali(ilap((q / s) * (1 / (s * C))), q * t / C))
Hs = sp.solve(sp.Eq(tau * (s * Hu - h0) + Hu, 0), Hu)[0]
ok("svuotamento: h0 e^(-t/tau)", uguali(ilap(Hs), h0 * sp.exp(-t / tau)))

# Esempi ed esercizi della spiegazione (spiegazione_g_h1.js)
ok("es. 2: L{t^3} = 6/s^4", uguali(lap(t**3), 6 / s**4))
ok("es. 4.2: L{4 t e^(3t)} = 4/(s-3)^2", uguali(lap(4 * t * sp.exp(3 * t)), 4 / (s - 3) ** 2))
ok("es. 4.4: L^-1{3/(s+1)} = 3 e^-t", uguali(ilap(3 / (s + 1)), 3 * sp.exp(-t)))
ok("es. 4.5: L^-1{3/(s+2)^2} = 3 t e^-2t", uguali(ilap(3 / (s + 2) ** 2), 3 * t * sp.exp(-2 * t)))
ok("es. 4.6: L^-1{tau/(1+s tau)} = e^(-t/tau)", uguali(ilap(tau / (1 + s * tau)), sp.exp(-t / tau)))
ok("es. 6: lim t e^(-kt) = 0 col valore finale", sp.limit(s / (s + k) ** 2, s, 0) == 0 == sp.limit(t * sp.exp(-k * t), t, sp.oo))
bb = sp.symbols("b", positive=True)
ok("L{(e^-at - e^-bt)/(b-a)} = 1/((s+a)(s+b))",
   uguali(lap((sp.exp(-a * t) - sp.exp(-bb * t)) / (bb - a)), 1 / ((s + a) * (s + bb))))
vc = sp.Function("v")
eq = sp.dsolve(sp.Eq(tau * vc(t).diff(t) + vc(t), E), vc(t), ics={vc(0): 0}).rhs
ok("RC: tau v' + v = E, v(0)=0 → E(1-e^(-t/tau))", uguali(eq, E * (1 - sp.exp(-t / tau))))
ok("RC fratti: A = E, B = -E tau", uguali(E / s - E * tau / (tau * s + 1), E / (s * (tau * s + 1))))
ok("G2: (s+2)/((s+1)(s+3)) → e^-t/2 + e^-3t/2",
   uguali(ilap((s + 2) / ((s + 1) * (s + 3))), sp.exp(-t) / 2 + sp.exp(-3 * t) / 2))
ok("G2: (2+s)/((s+1)^2 s) = -1/(s+1)^2 - 2/(s+1) + 2/s", uguali(-1 / (s + 1) ** 2 - 2 / (s + 1) + 2 / s, U2))
ok("G2: → -t e^-t - 2 e^-t + 2", uguali(ilap(U2), -t * sp.exp(-t) - 2 * sp.exp(-t) + 2))
ok("G2: con s = 1, 3/4 = -1/4 + A1/2 + 2 → A1 = -2",
   sp.solve(sp.Eq(sp.Rational(3, 4), -sp.Rational(1, 4) + A / 2 + 2), A) == [-2])

# H1, esempio 1: R in serie, sL || R, uscita la corrente in R (il libro dimentica 1/R)
Zp = s * L * R / (s * L + R)
VR = Zp / (Zp + R)
ok("H1 es. 1: V_R/V_i = sL/(2sL+R)", uguali(VR, s * L / (2 * s * L + R)))
GIR = VR / R
ok("H1 es. 1: I_R/V_i = (1/R)(s L/R)/(2s L/R + 1)", uguali(GIR, (1 / R) * (s * L / R) / (2 * s * L / R + 1)))
ok("H1 es. 1: il risultato del libro è V_R/V_i, non I_R/V_i",
   uguali((s * L / R) / (2 * s * L / R + 1), VR) and not uguali((s * L / R) / (2 * s * L / R + 1), GIR))
zr = sp.symbols("z")  # s è positivo, quindi i poli negativi si cercano con un simbolo libero
ok("H1 es. 6: s^2+5s+6 → poli -2, -3", set(sp.solve(zr**2 + 5 * zr + 6, zr)) == {-2, -3})
ok("H1 es. 7: s^3+3s^2+3s+1 = (s+1)^3", uguali(s**3 + 3 * s**2 + 3 * s + 1, (s + 1) ** 3))
ok("H1 rampa RC: A = 1, B = tau^2, A1 = -tau",
   uguali(1 / s**2 - tau / s + tau**2 / (1 + tau * s), 1 / (s**2 * (1 + tau * s))))
ok("piscina: t = C h / q = 8000 s", sp.Rational(20) * 2 / sp.Rational(5, 1000) == 8000)
R1, R2 = sp.symbols("R_1 R_2", positive=True)
G_es1 = (R2 + 1 / (s * C)) / (R1 + R2 + 1 / (s * C))
ok("H1 esercizio 1: (1 + s R2 C)/(1 + s (R1+R2) C)", uguali(G_es1, (1 + s * R2 * C) / (1 + s * (R1 + R2) * C)))
Z1 = R1 * s * L / (R1 + s * L)
G_es2 = R2 / (R2 + Z1)
ok("H1 esercizio 2: R2(R1+sL)/(R1R2 + s(R1+R2)L)", uguali(G_es2, R2 * (R1 + s * L) / (R1 * R2 + s * (R1 + R2) * L)))
ok("H1 esercizio 2 con L = R1 = R2 = 1: (1+s)/(1+2s)", uguali(G_es2.subs({L: 1, R1: 1, R2: 1}), (1 + s) / (1 + 2 * s)))
G_es3 = 10 * s * (s + 1) * (s + 2) / ((s - 2) * (s + 4) * (s + 3))
forma_ct = -sp.Rational(5, 6) * s * (1 + s) * (1 + s / 2) / ((1 - s / 2) * (1 + s / 4) * (1 + s / 3))
ok("H1 esercizio 3: K = -5/6, T = 1, 0.5, tau = -0.5, 0.25, 1/3", uguali(G_es3, forma_ct))
ok("H1 esercizio 5: numeratore 10s(s+1)(s+2)", uguali(10 * s**3 + 30 * s**2 + 20 * s, 10 * s * (s + 1) * (s + 2)))
ok("H1 esercizio 5: denominatore (s-2)(s+3)(s+4)", uguali(s**3 + 5 * s**2 - 2 * s - 24, (s - 2) * (s + 3) * (s + 4)))

falliti = [n for n, c in controlli if not c]
for n in falliti:
    print("FALLITO:", n)
print(f"{len(controlli) - len(falliti)}/{len(controlli)}")
