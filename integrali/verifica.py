from sympy import *
x = symbols('x', positive=True)  # x>0 so ln|x| = ln x; abs args checked on a valid interval below
a, k = symbols('a k', positive=True)
f = Function('f')
casi = [
 ("B/(x-a)^2 [mappa]", 3/(x-2)**2, -3/(x-2)),
 ("1/((x-h)^2+k^2) [mappa]", 1/((x-1)**2+4), atan((x-1)/2)/2),
 ("x sin x", x*sin(x), -x*cos(x)+sin(x)),
 ("x e^2x", x*exp(2*x), exp(2*x)*(x/2-Rational(1,4))),
 ("x ln x^4", x*log(x**4), x**2/2*log(x**4)-x**2),
 ("(x-1)/(x+4)", (x-1)/(x+4), x-5*log(x+4)),
 ("x/cos^2", x/cos(x)**2, x*tan(x)+log(cos(x))),
 ("(x^2-9)/(x+3)", (x**2-9)/(x+3), x**2/2-3*x),
 ("1/(25+4x^2)", 1/(25+4*x**2), atan(2*x/5)/10),
 ("(x^4+lnx)/x", (x**4+log(x))/x, x**4/4+log(x)**2/2),
 ("(2x-1)^8", (2*x-1)**8, (2*x-1)**9/18),
 ("3x/sqrt(x^2+4)", 3*x/sqrt(x**2+4), 3*sqrt(x**2+4)),
 ("x sin x^2", x*sin(x**2), -cos(x**2)/2),
 ("1/(1+4x^2)", 1/(1+4*x**2), atan(2*x)/2),
 ("1/(1+sqrt x)", 1/(1+sqrt(x)), 2*sqrt(x)-2*log(1+sqrt(x))),
 ("ln x", log(x), x*log(x)-x),
 ("x ln x", x*log(x), x**2/2*(log(x)-Rational(1,2))),
 ("(5x-1)/(x^2-x-2) [x>2]", (5*x-1)/(x**2-x-2), 2*log(x+1)+3*log(x-2)),
 ("(2x-3)/(x-2)^2 [x>2]", (2*x-3)/(x**2-4*x+4), 2*log(x-2)-1/(x-2)),
 ("1/(x^2+2x+2)", 1/(x**2+2*x+2), atan(x+1)),
 ("2x/(x^2+4x+5)", 2*x/(x**2+4*x+5), log(x**2+4*x+5)-4*atan(x+2)),
 ("tan x [0<x<pi/2]", tan(x), -log(cos(x))),
 ("cot x", cot(x), log(sin(x))),
 ("3x^2 e^x^3", 3*x**2*exp(x**3), exp(x**3)),
 ("2x ln 3x", 2*x*log(3*x), x**2*log(3*x)-x**2/2),
 ("(x^3+2x^2+x+1)/(x^2+1)", (x**3+2*x**2+x+1)/(x**2+1), x**2/2+2*x-atan(x)),
 ("a^x", a**x, a**x/log(a)),
 ("1/(9x^2+6x+1)", 1/(9*x**2+6*x+1), -1/(3*(3*x+1))),
 ("(6x-2)/(3x^2-2x-1) [x>1]", (6*x-2)/(3*x**2-2*x-1), log(3*x**2-2*x-1)),
 ("1/(3x-2) [x>1]", 1/(3*x-2), log(3*x-2)/3),
 ("x^2 e^x", x**2*exp(x), exp(x)*(x**2-2*x+2)),
 ("3x^2-4x+5", 3*x**2-4*x+5, x**3-2*x**2+5*x),
 ("x^3-cos x (es.)", (2*x**5-4*x+3), x**6/3-2*x**2+3*x),
 ("(x^2+1)/x", (x**2+1)/x, x**2/2+log(x)),
 ("sqrt x", sqrt(x), Rational(2,3)*x*sqrt(x)),
 ("x sqrt(x^2+9)", x*sqrt(x**2+9), (x**2+9)**Rational(3,2)/3),
 ("1/(1-x^2)^.5 [0<x<1]", 1/sqrt(1-x**2), asin(x)),
 ("e^x cos e^x", exp(x)*cos(exp(x)), sin(exp(x))),
]
ok = 0
for nome, integranda, primitiva in casi:
    d = simplify(diff(primitiva, x) - integranda)
    if d != 0:
        d = simplify(expand_log(d, force=True).rewrite(exp))
    # numeric check at points valid for every case (x in (0,1) and x>2 handled separately)
    pts = [Rational(5,2), 3] if '[x>' in nome else [Rational(1,3), Rational(1,2)] if '0<x' in nome else [Rational(1,3), Rational(5,2)]
    num = max(abs(N((diff(primitiva, x) - integranda).subs(x, p))) for p in pts)
    good = d == 0 or num < 1e-12
    ok += good
    print(('OK ' if good else 'NO ') + nome, '' if good else (d, num))
# f'' = 6x, f'(1)=3, f(2)=10
c1, c2 = symbols('c1 c2')
fp = integrate(6*x, x) + c1
s1 = solve(fp.subs(x, 1) - 3, c1)[0]
F = integrate(fp.subs(c1, s1), x) + c2
s2 = solve(F.subs(x, 2) - 10, c2)[0]
print("f =", F.subs(c2, s2), "c1 =", s1, "c2 =", s2)
# arctan formula with k
t = symbols('t', real=True)
print("k-formula:", simplify(diff(atan(t/k)/k, t) - 1/(k**2+t**2)))
print(f"{ok}/{len(casi)}")
