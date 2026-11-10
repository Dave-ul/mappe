// Soluzioni svolte della prova (prova.js). Ogni risultato è controllato da verifica_prova.py.
module.exports = {
  titolo: "Soluzioni · Integrali indefiniti",
  blocchi: [
    { t: "titolo", testo: "Soluzioni della prova sugli integrali",
      sotto: "Correggi con una penna di un altro colore. Un risultato giusto con un passaggio sbagliato vale metà." },

    { t: "sez", testo: "A · Teoria" },
    { t: "sol", n: "A1", righe: [
      "a) <b>V</b>: $D[F(x)+7]=F'(x)=f(x)$. &nbsp; b) <b>F</b>: l'integrale del prodotto non è il prodotto degli integrali.",
      "c) <b>V</b>: è il teorema (condizione sufficiente). &nbsp; d) <b>F</b>: $\\alpha=-1$ è escluso, $\\int\\frac1x\\,dx=\\ln|x|+c$. &nbsp; e) <b>V</b>: linearità.",
    ] },
    { t: "sol", n: "A2", righe: ["<b>a)</b> $D[\\sin x^2]=\\cos x^2\\cdot2x$. Le altre danno $4x\\cos x^2$, $-2x\\cos x^2$ e un prodotto."] },
    { t: "sol", n: "A3", righe: ["$D[(x-1)e^x]=1\\cdot e^x+(x-1)e^x=x\\,e^x$ ✓ (regola del prodotto)."] },
    { t: "sol", n: "A4", righe: [
      "La derivata di una costante è 0: se $F$ è una primitiva, lo sono tutte le $F+c$, e due primitive differiscono solo per una costante.",
      "$\\ln x$ esiste solo per $x>0$, mentre $\\frac1x$ esiste anche per $x<0$; $D[\\ln|x|]=\\frac1x$ per ogni $x\\neq0$.",
    ] },

    { t: "sez", testo: "B · Immediati" },
    { t: "due", sx: [
      { t: "sol", n: "B1", righe: ["$x^4-3x^2+5x+c$ &nbsp; (termine per termine)"] },
      { t: "sol", n: "B2", righe: ["$\\int x^{\\frac12}dx+\\int x^{-2}dx=\\frac{x^{3/2}}{3/2}+\\frac{x^{-1}}{-1}$", "$=\\frac23x\\sqrt{x}-\\frac1x+c$"] },
      { t: "sol", n: "B3", righe: ["Spezzo: $\\int\\left(x+\\frac3x\\right)dx=\\frac{x^2}{2}+3\\ln|x|+c$"] },
      { t: "sol", n: "B4", righe: ["$3\\sin x-2e^x+4\\arctan x+c$"] },
    ], dx: [
      { t: "sol", n: "B5", righe: ["$\\int a^x dx=\\frac{a^x}{\\ln a}$: &nbsp; $\\frac{5^x}{\\ln5}+c$"] },
      { t: "sol", n: "B6", righe: ["Scompongo: $\\frac{(x-2)(x+2)}{x-2}=x+2$", "$\\Rightarrow\\frac{x^2}{2}+2x+c$"] },
      { t: "sol", n: "B7", righe: ["$\\int x^{\\frac23}dx=\\frac{x^{5/3}}{5/3}=\\frac35x\\sqrt[3]{x^2}+c$"] },
    ] },

    { t: "sez", testo: "C · Composte" },
    { t: "due", sx: [
      { t: "sol", n: "C1", righe: ["$f=3x+1$, $f'=3$ manca: $\\frac13\\int3(3x+1)^5dx$", "$=\\frac13\\cdot\\frac{(3x+1)^6}{6}=\\frac{(3x+1)^6}{18}+c$"] },
      { t: "sol", n: "C2", righe: ["$f=x^3+2$, $f'=3x^2$: $\\frac13\\int3x^2(x^3+2)^4dx$", "$=\\frac{(x^3+2)^5}{15}+c$"] },
      { t: "sol", n: "C3", righe: ["Sopra c'è la derivata di sotto: $\\ln(x^2+5)+c$", "<i>(niente modulo: $x^2+5>0$)</i>"] },
      { t: "sol", n: "C4", righe: ["$\\frac12\\int2x\\,e^{x^2}dx=\\frac12e^{x^2}+c$"] },
      { t: "sol", n: "C5", righe: ["$\\frac14\\int4\\cos4x\\,dx=\\frac14\\sin4x+c$"] },
    ], dx: [
      { t: "sol", n: "C6", righe: ["$f=\\cos x$, $f'=-\\sin x$: $-\\int(-\\sin x)\\cos^3x\\,dx$", "$=-\\frac{\\cos^4x}{4}+c$"] },
      { t: "sol", n: "C7", righe: ["$\\frac19\\int\\frac{dx}{1+(x/3)^2}=\\frac19\\cdot3\\int\\frac{\\frac13\\,dx}{1+(x/3)^2}$", "$=\\frac13\\arctan\\frac x3+c$"] },
      { t: "sol", n: "C8", righe: ["$f=\\ln x$, $f'=\\frac1x$: $\\int f^3f'\\,dx=\\frac{\\ln^4x}{4}+c$"] },
      { t: "sol", n: "C9", righe: ["$f=x^2$, $f'=2x$: $\\frac12\\int\\frac{2x}{\\sqrt{1-(x^2)^2}}dx$", "$=\\frac12\\arcsin x^2+c$"] },
      { t: "sol", n: "C10", righe: ["$f=e^x=f'$, $e^{2x}=(e^x)^2$: $\\arctan e^x+c$"] },
    ] },

    { t: "sez", testo: "D · Per parti" },
    { t: "due", sx: [
      { t: "sol", n: "D1", righe: ["Derivo $x$, integro $\\cos x$:", "$x\\sin x-\\int\\sin x\\,dx=x\\sin x+\\cos x+c$"] },
      { t: "sol", n: "D2", righe: ["Derivo $x$, $\\int e^{-x}dx=-e^{-x}$:", "$-x\\,e^{-x}+\\int e^{-x}dx=-x\\,e^{-x}-e^{-x}$", "$=-(x+1)\\,e^{-x}+c$"] },
      { t: "sol", n: "D3", righe: ["Derivo $\\ln x$, integro $x^2$:", "$\\frac{x^3}{3}\\ln x-\\int\\frac{x^3}{3}\\cdot\\frac1x\\,dx=\\frac{x^3}{3}\\ln x-\\frac{x^3}{9}+c$"] },
    ], dx: [
      { t: "sol", n: "D4", righe: ["$\\int1\\cdot\\arctan x\\,dx$, derivo $\\arctan x$:", "$x\\arctan x-\\int\\frac{x}{1+x^2}dx$", "$=x\\arctan x-\\frac12\\ln(1+x^2)+c$"] },
      { t: "sol", n: "D5", righe: ["$-x^2\\cos x+\\int2x\\cos x\\,dx$, e con D1:", "$=-x^2\\cos x+2x\\sin x+2\\cos x+c$"] },
      { t: "sol", n: "D6", righe: ["$I=e^x\\sin x-\\int e^x\\cos x\\,dx$", "$=e^x\\sin x-\\left(e^x\\cos x+I\\right)$", "$2I=e^x(\\sin x-\\cos x)$", "$I=\\frac{e^x(\\sin x-\\cos x)}{2}+c$"] },
    ] },

    { t: "sez", testo: "E · Sostituzione" },
    { t: "sol", n: "E1", righe: ["$\\sqrt x=t$, $x=t^2$, $dx=2t\\,dt$: $\\int\\frac{2t}{t^2+t}dt=\\int\\frac{2}{t+1}dt=2\\ln|t+1|=2\\ln(1+\\sqrt x)+c$"] },
    { t: "sol", n: "E2", righe: ["$\\sqrt x=t$, $dx=2t\\,dt$: $2\\int t\\,e^t\\,dt$ (per parti) $=2(t\\,e^t-e^t)=2e^{\\sqrt x}(\\sqrt x-1)+c$"] },
    { t: "sol", n: "E3", righe: ["$\\sqrt{x-1}=t$, $x=t^2+1$, $dx=2t\\,dt$: $\\int(t^2+1)\\,t\\cdot2t\\,dt=2\\int(t^4+t^2)\\,dt=\\frac25t^5+\\frac23t^3$", "$=\\frac25\\sqrt{(x-1)^5}+\\frac23\\sqrt{(x-1)^3}+c$"] },

    { t: "sez", testo: "F · Fratte" },
    { t: "due", sx: [
      { t: "sol", n: "F1", righe: ["$\\frac12\\int\\frac{2}{2x-5}dx=\\frac12\\ln|2x-5|+c$"] },
      { t: "sol", n: "F2", righe: ["Grado uguale: $2x+3=2(x+1)+1$", "$\\int\\left(2+\\frac{1}{x+1}\\right)dx=2x+\\ln|x+1|+c$"] },
      { t: "sol", n: "F3", righe: ["$\\Delta=9>0$: $x^2-x-2=(x-2)(x+1)$", "$\\frac{A}{x-2}+\\frac{B}{x+1}$: $A(x+1)+B(x-2)=x+7$", "$\\begin{cases}A+B=1\\\\A-2B=7\\end{cases}\\Rightarrow A=3,\\ B=-2$", "$3\\ln|x-2|-2\\ln|x+1|+c$"] },
      { t: "sol", n: "F4", righe: ["$\\Delta=0$: $(x-1)^2$; $3x-1=3(x-1)+2$", "$\\int\\left(\\frac{3}{x-1}+\\frac{2}{(x-1)^2}\\right)dx$", "$=3\\ln|x-1|-\\frac{2}{x-1}+c$"] },
    ], dx: [
      { t: "sol", n: "F5", righe: ["$\\Delta<0$, completo il quadrato: $(x-2)^2+9$", "$\\frac19\\int\\frac{dx}{1+\\left(\\frac{x-2}{3}\\right)^2}=\\frac13\\arctan\\frac{x-2}{3}+c$"] },
      { t: "sol", n: "F6", righe: ["$\\Delta<0$, $D'=2x+2$: $x+3=\\frac12(2x+2)+2$", "$\\frac12\\ln(x^2+2x+5)+2\\int\\frac{dx}{(x+1)^2+4}$", "$=\\frac12\\ln(x^2+2x+5)+\\arctan\\frac{x+1}{2}+c$"] },
      { t: "sol", n: "F7", righe: ["Divisione: $Q=x^2-x-1$, $R=2$", "$\\frac{x^3}{3}-\\frac{x^2}{2}-x+2\\ln|x-1|+c$"] },
      { t: "sol", n: "F8", righe: ["$x^3-x=x(x-1)(x+1)$: $\\frac Ax+\\frac{B}{x-1}+\\frac{C}{x+1}$", "pongo $x=0,1,-1$ in $A(x^2-1)+Bx(x+1)+Cx(x-1)=x^2+2$:", "$A=-2$, $B=\\frac32$, $C=\\frac32$", "$-2\\ln|x|+\\frac32\\ln|x-1|+\\frac32\\ln|x+1|+c$"] },
    ] },

    { t: "sez", testo: "G · Trovare $c$" },
    { t: "sol", n: "G1", righe: ["$F(x)=x^3-2x^2+x+c$; $F(1)=1-2+1+c=5\\Rightarrow c=5$; &nbsp; $F(x)=x^3-2x^2+x+5$"] },
    { t: "sol", n: "G2", righe: ["$f'(x)=4x^3-6x+c_1$, $f'(0)=c_1=2$; &nbsp; $f(x)=x^4-3x^2+2x+c_2$, $f(1)=0+c_2=0$; &nbsp; $f(x)=x^4-3x^2+2x$"] },
    { t: "sol", n: "G3", righe: ["$f(x)=\\ln x+c$; $f(e)=1+c=3\\Rightarrow c=2$; &nbsp; $f(x)=\\ln x+2$"] },

    { t: "sez", testo: "H · Riepilogo" },
    { t: "due", sx: [
      { t: "sol", n: "H1", righe: ["$D[x^3-x]=3x^2-1$ = numeratore $\\Rightarrow\\ln|x^3-x|+c$", "<i>(con i fratti semplici esce lo stesso, ma è più lungo)</i>"] },
      { t: "sol", n: "H2", righe: ["Per parti, derivo $\\ln x$, $\\int x^{-2}dx=-\\frac1x$:", "$-\\frac{\\ln x}{x}+\\int\\frac{1}{x^2}dx=-\\frac{\\ln x+1}{x}+c$"] },
      { t: "sol", n: "H3", righe: ["Fratta, $\\Delta=0$: $x=(x+1)-1$", "$\\int\\left(\\frac{1}{x+1}-\\frac{1}{(x+1)^2}\\right)dx$", "$=\\ln|x+1|+\\frac{1}{x+1}+c$"] },
    ], dx: [
      { t: "sol", n: "H4", righe: ["Composta, $f=\\sin x$, $f'=\\cos x$: $\\arctan(\\sin x)+c$"] },
      { t: "sol", n: "H5", righe: ["Sviluppo e spezzo: $\\frac{e^{2x}+2e^x+1}{e^x}=e^x+2+e^{-x}$", "$\\Rightarrow e^x+2x-e^{-x}+c$"] },
    ] },

    { t: "box", tipo: "memo", titolo: "Voto", righe: [
      "voto $=$ punti $\\div 10$ (D6 bonus: +3). &nbsp; Sotto 60: ripassa la parte dove hai perso più punti sul file <i>Spiegazione_integrali.pdf</i>, poi rifai quella parte della scheda.",
    ] },
    { t: "sez", testo: "Per allenarti ancora" },
    { t: "p", testo: "Sulla scheda <i>11_64_integrali_indefiniti</i> (matematika.it), con i risultati accanto a ogni esercizio:" },
    { t: "tab", intest: ["Argomento", "Pagine della scheda"], righe: [
      ["Immediati (parte B)", "1-4"],
      ["Composte (parte C)", "5-9 (risultati alle pp. 30-34)"],
      ["Spezzare in somma", "10-11"],
      ["Per parti (parte D)", "12-13"],
      ["Sostituzione (parte E)", "14-15"],
      ["Fratte (parte F): 1° grado · $\\Delta>0$ · $\\Delta=0$ · $\\Delta<0$ · grado > 2", "16 · 17 · 18 · 19 · 20-21"],
      ["Riepilogo (parte H)", "22-27, poi 28-29 (più difficili)"],
    ] },
  ],
};
