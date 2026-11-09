// Mappa definitiva sugli integrali indefiniti: 1 foglio A4 fronte-retro (stesso contenuto di contenuto.js, compresso).
// Ogni facciata ha sezioni; ogni sezione ha riquadri su una griglia di 6 colonne.
// Riquadro: h = titolo, mem = true se va a memoria (bordo spesso), da = da dove si ricava (⇐),
// w = colonne occupate su 6, cols = colonne interne del testo, b = righe.
// $...$ = formula KaTeX inline, $$...$$ = display. Una riga che inizia con "$=", "$+" o "$-" continua la precedente.

module.exports = [
  {
    titolo: "Integrali indefiniti: mappa definitiva",
    sezioni: [
      {
        titolo: "1. Si parte da qui",
        box: [
          {
            h: "Definizione", mem: true, w: 3, pag: "pp. 1234-1239",
            b: [
              "$F$ primitiva di $f$ in $I$: $\\boxed{F'(x)=f(x)}$ (es. $x^2$ di $2x$)",
              "$\\boxed{\\int f(x)\\,dx=F(x)+c}$, $c\\in\\mathbb{R}$; $D\\left[\\int f\\,dx\\right]=f$",
              "Primitive: tutte e sole $F+c$ (Lagrange: $D[F-G]=0\\Rightarrow F-G=c$). Grafici traslati in verticale.",
              "$f$ continua in $I$ $\\Rightarrow$ integrabile (sufficiente, non necessaria). $\\frac{\\sin x}{x}$: continua ma non si calcola.",
              "<b>Verifica sempre</b>: derivo il risultato, ritrovo l'integranda.",
            ],
          },
          {
            h: "Linearità", mem: true, w: 3,
            b: [
              "$\\boxed{\\int[f+g]\\,dx=\\int f\\,dx+\\int g\\,dx}$",
              "$\\boxed{\\int k\\,f\\,dx=k\\int f\\,dx}$ ②",
              "<i>Dim: derivo i due membri.</i>",
              "<b>No</b>: $\\int f g\\neq\\int f\\cdot\\int g$, $\\int\\frac fg\\neq\\frac{\\int f}{\\int g}$",
              "Trovare $c$: integro, impongo il dato. <span class='q'>quaderno</span> $f''=6x$, $f'(1)=3$, $f(2)=10$: $f'=3x^2+c_1$, $c_1=0$; $f=x^3+c_2$, $c_2=2$.",
            ],
          },
          {
            h: "Immediati (numeri del quaderno)", mem: true, w: 6, cols: 3, pag: "pp. 1238-1240", da: "leggo al contrario le derivate",
            b: [
              "① $\\boxed{\\int x^{\\alpha}dx=\\frac{x^{\\alpha+1}}{\\alpha+1}+c}$ $\\alpha\\neq-1$",
              "③ $\\boxed{\\int\\frac1x\\,dx=\\ln|x|+c}$ <i>(caso $\\alpha=-1$)</i>",
              "④ $\\int e^x\\,dx=e^x+c$",
              "⑪ $\\int a^x\\,dx=\\frac{a^x}{\\ln a}+c$",
              "⑤ $\\int\\sin x\\,dx=-\\cos x+c$",
              "⑥ $\\int\\cos x\\,dx=\\sin x+c$",
              "⑦ $\\int\\frac{dx}{\\cos^2x}=\\tan x+c$",
              "⑧ $\\int\\frac{dx}{\\sin^2x}=-\\cot x+c$",
              "⑨ $\\int\\frac{dx}{\\sqrt{1-x^2}}=\\arcsin x+c$",
              "⑩ $\\int\\frac{dx}{1+x^2}=\\arctan x+c$",
              "<i>Segno meno: ⑤ e ⑧. Modulo in ③: vale anche per $x<0$.</i>",
            ],
          },
          {
            h: "Per parti", mem: true, w: 3, pag: "pp. 1242-1245", da: "$D[fg]=f'g+fg'$, integro e isolo",
            b: [
              "$$\\boxed{\\int f\\,g'\\,dx=f\\,g-\\int f'\\,g\\,dx}$$",
              "$f$ = fattore finito (lo derivo), $g'dx$ = fattore differenziale (lo integro). Scelgo in modo che il 2° integrale sia più facile; si può ripetere.",
            ],
          },
          {
            h: "Sostituzione", mem: true, w: 3,
            b: [
              "Per $\\sqrt x$ e simili, o per arrivare a un immediato.",
              "1. $x=g(t)$ o $t=g^{-1}(x)$ <i>($g$ invertibile, $g'$ continua $\\neq0$)</i>",
              "2. $dx=g'(t)\\,dt$ &nbsp; 3. integro in $t$ &nbsp; 4. torno a $x$",
            ],
          },
          {
            h: "Metodo: quale uso?", mem: true, w: 6, flow: true,
            b: [
              "immediato (anche dopo aver spezzato)? <b>→ tabella</b>",
              "$f(x)$ con accanto $f'(x)$? <b>→ composte</b>",
              "frazione di polinomi? <b>→ fratte</b>",
              "$x^n\\cdot$(sin, cos, $e^x$, ln, arctan)? <b>→ per parti</b>",
              "$\\sqrt x$ o simili? <b>→ sostituzione</b>",
              "alla fine: <b>derivo e controllo</b>",
            ],
          },
        ],
      },
      {
        titolo: "2. Si ricava tutto il resto",
        box: [
          {
            h: "Potenze e algebra prima di integrare", w: 3, da: "① + linearità",
            b: [
              "$\\int dx=x+c$, $\\int x\\,dx=\\frac{x^2}{2}+c$",
              "Radici e frazioni → potenza: $\\int\\sqrt x\\,dx=\\frac23\\sqrt{x^3}+c$, $\\int\\frac{dx}{x^2}=-\\frac1x+c$",
              "Spezzo: $\\int\\frac{x^2+1}{x}dx=\\int\\left(x+\\frac1x\\right)dx=\\frac{x^2}{2}+\\ln|x|+c$",
              "Scompongo <span class='q'>14/10</span>: $\\int\\frac{x^2-9}{x+3}dx=\\int(x-3)\\,dx$",
              "$=\\frac{x^2}{2}-3x+c$",
              "Termine per termine: $\\int(2x^5-4x+3)\\,dx$",
              "$=\\frac{x^6}{3}-2x^2+3x+c$",
            ],
          },
          {
            h: "Composte", w: 3, pag: "pp. 1240-1241", da: "catena: immediato con $f$ al posto di $x$, e $f'$ accanto",
            b: [
              "$$\\int[f]^{\\alpha}f'\\,dx=\\frac{[f]^{\\alpha+1}}{\\alpha+1}+c$$",
              "Manca una costante: moltiplico e divido. Manca una $x$: altro metodo.",
              "$\\int\\frac{f'}{f}dx=\\ln|f|+c$ &nbsp; $\\int f'e^{f}dx=e^{f}+c$",
              "$\\int f'a^{f}dx=\\frac{a^{f}}{\\ln a}+c$ &nbsp; $\\int f'\\sin f\\,dx=-\\cos f+c$",
              "$\\int f'\\cos f\\,dx=\\sin f+c$ &nbsp; $\\int\\frac{f'}{\\cos^2f}dx=\\tan f+c$",
              "$\\int\\frac{f'}{\\sin^2f}dx=-\\cot f+c$ &nbsp; $\\int\\frac{f'}{1+f^2}dx=\\arctan f+c$",
              "$\\int\\frac{f'}{\\sqrt{1-f^2}}dx=\\arcsin f+c$",
            ],
          },
          {
            h: "Sostituzione: esempio (libro)", w: 3, da: "sostituzione + divisione",
            b: [
              "$\\int\\frac{dx}{1+\\sqrt x}$, $\\sqrt x=t$, $x=t^2$, $dx=2t\\,dt$",
              "$=2\\int\\frac{t+1-1}{1+t}dt=2\\int\\left(1-\\frac{1}{1+t}\\right)dt$",
              "$=2t-2\\ln|1+t|+c=2\\sqrt x-2\\ln(1+\\sqrt x)+c$",
              "Trucco: aggiungo e tolgo 1 al numeratore.",
            ],
          },
          {
            h: "Per parti: chi derivo?", w: 3, da: "per parti",
            b: [
              "$x^n\\sin x$, $x^n\\cos x$, $x^ne^x$: <b>derivo $x^n$</b>",
              "$x^n\\ln x$, $x^n\\arctan x$, $x^n\\arcsin x$: <b>integro $x^n$</b>",
              "Da solo: $\\int\\ln x\\,dx=\\int1\\cdot\\ln x\\,dx=x\\ln x-x+c$",
              "Due volte: $\\int x^2e^xdx=e^x(x^2-2x+2)+c$",
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Integrali indefiniti · retro",
    sezioni: [
      {
        titolo: "2. Si ricava tutto il resto (segue)",
        box: [
          {
            h: "Composte: esempi", w: 6, cols: 2, da: "tabella composte",
            b: [
              "$\\int(2x-1)^8dx=\\frac12\\int2(2x-1)^8dx=\\frac{(2x-1)^9}{18}+c$",
              "$\\int\\frac{3x}{\\sqrt{x^2+4}}dx=\\frac32\\int2x(x^2+4)^{-\\frac12}dx=3\\sqrt{x^2+4}+c$",
              "$\\int x\\sin x^2dx=\\frac12\\int2x\\sin x^2dx=-\\frac12\\cos x^2+c$",
              "$\\int\\frac{dx}{1+4x^2}=\\frac12\\int\\frac{2\\,dx}{1+(2x)^2}=\\frac12\\arctan2x+c$",
              "$\\int\\frac{dx}{25+4x^2}=\\frac{1}{25}\\cdot\\frac52\\int\\frac{\\frac25\\,dx}{1+\\left(\\frac{2x}{5}\\right)^2}=\\frac{1}{10}\\arctan\\frac{2x}{5}+c$",
              "$\\int\\frac{\\ln x}{x}dx=\\frac{\\ln^2x}{2}+c$ &nbsp; $\\int3x^2e^{x^3}dx=e^{x^3}+c$",
              "$\\int\\frac{x^4+\\ln x}{x}dx=\\int x^3dx+\\int\\frac{\\ln x}{x}dx=\\frac{x^4}{4}+\\frac{\\ln^2x}{2}+c$",
              "$\\int\\tan x\\,dx=-\\ln|\\cos x|+c$ <i>(sopra $-D[\\cos x]$)</i>; $\\int\\cot x\\,dx=\\ln|\\sin x|+c$",
              "$\\int\\frac{f'}{k^2+f^2}dx=\\frac1k\\arctan\\frac fk+c$",
            ],
          },
          {
            h: "Per parti: esempi", w: 6, cols: 2, da: "per parti",
            b: [
              "$\\int x\\sin x\\,dx=-x\\cos x+\\int\\cos x\\,dx=-x\\cos x+\\sin x+c$",
              "$\\int xe^{2x}dx=\\frac x2e^{2x}-\\int\\frac12e^{2x}dx=e^{2x}\\left(\\frac x2-\\frac14\\right)+c$",
              "$\\int x\\ln x^4dx=\\frac{x^2}{2}\\ln x^4-\\int\\frac{x^2}{2}\\cdot\\frac4x\\,dx=\\frac{x^2}{2}\\ln x^4-x^2+c$",
              "$\\int\\frac{x}{\\cos^2x}dx=x\\tan x-\\int\\tan x\\,dx=x\\tan x+\\ln|\\cos x|+c$",
            ],
          },
          {
            h: "Fratte $\\int\\frac{N(x)}{D(x)}dx$: primo passo", w: 3, pag: "pp. 1245-1251", da: "divisione + linearità",
            b: [
              "grado $N\\geq$ grado $D$ → <b>divisione</b> $N=Q\\cdot D+R$:",
              "$$\\int\\frac ND dx=\\int Q\\,dx+\\int\\frac RD dx$$",
              "$\\int\\frac{x-1}{x+4}dx=\\int\\left(1-\\frac{5}{x+4}\\right)dx=x-5\\ln|x+4|+c$",
              "$\\int\\frac{x^3+2x^2+x+1}{x^2+1}dx$: $Q=x+2$, $R=-1$",
              "$=\\frac{x^2}{2}+2x-\\arctan x+c$",
            ],
          },
          {
            h: "$N=D'$ e $D$ di 1° grado", w: 3, da: "composte ($\\ln|f|$)",
            b: [
              "$\\int\\frac{f'}{f}dx=\\ln|f|+c$:",
              "$\\int\\frac{6x-2}{3x^2-2x-1}dx=\\ln|3x^2-2x-1|+c$",
              "$$\\int\\frac{dx}{ax+b}=\\frac1a\\ln|ax+b|+c$$",
              "$\\int\\frac{dx}{3x-2}=\\frac13\\int\\frac{3\\,dx}{3x-2}=\\frac13\\ln|3x-2|+c$",
            ],
          },
          {
            h: "$D$ di 2° grado, $\\Delta>0$", w: 3, da: "fratti semplici → due $\\ln$",
            b: [
              "$ax^2+bx+c=a(x-x_1)(x-x_2)$",
              "$\\frac{px+q}{ax^2+bx+c}=\\frac{A}{a(x-x_1)}+\\frac{B}{x-x_2}$",
              "Sommo, uguaglio i coefficienti → sistema in $A$, $B$.",
              "$\\frac{5x-1}{x^2-x-2}=\\frac{A}{x+1}+\\frac{B}{x-2}=\\frac{(A+B)x-2A+B}{x^2-x-2}$",
              "$\\begin{cases}A+B=5\\\\-2A+B=-1\\end{cases}$ → $A=2$, $B=3$",
              "$\\int\\frac{5x-1}{x^2-x-2}dx=2\\ln|x+1|+3\\ln|x-2|+c$",
            ],
          },
          {
            h: "$\\Delta=0$", w: 3, da: "① e fratti semplici",
            b: [
              "$ax^2+bx+c=a(x-x_1)^2$, $x_1=-\\frac{b}{2a}$",
              "$p=0$: $\\int\\frac{q\\,dx}{a(x-x_1)^2}=-\\frac{q}{a(x-x_1)}+c$",
              "$\\int\\frac{dx}{9x^2+6x+1}=\\int(3x+1)^{-2}dx=-\\frac{1}{3(3x+1)}+c$",
              "$p\\neq0$: $\\frac{px+q}{a(x-x_1)^2}=\\frac{A}{a(x-x_1)}+\\frac{B}{(x-x_1)^2}$",
              "$\\frac{2x-3}{(x-2)^2}=\\frac{2}{x-2}+\\frac{1}{(x-2)^2}$",
              "$\\int\\frac{2x-3}{(x-2)^2}dx=2\\ln|x-2|-\\frac{1}{x-2}+c$",
            ],
          },
          {
            h: "$\\Delta<0$", w: 3, da: "⑩ composto + $\\ln|f|$",
            b: [
              "$p=0$: <b>completo il quadrato</b> → $\\arctan$",
              "$\\int\\frac{dx}{x^2+2x+2}=\\int\\frac{dx}{(x+1)^2+1}=\\arctan(x+1)+c$",
              "$p\\neq0$: faccio comparire $2ax+b$ al numeratore:",
              "$r\\int\\frac{2ax+b}{ax^2+bx+c}dx+s\\int\\frac{dx}{ax^2+bx+c}$ → $\\ln$ + $\\arctan$",
              "$\\int\\frac{2x\\,dx}{x^2+4x+5}=\\int\\frac{(2x+4)\\,dx}{x^2+4x+5}-4\\int\\frac{dx}{(x+2)^2+1}$",
              "$=\\ln(x^2+4x+5)-4\\arctan(x+2)+c$",
            ],
          },
          {
            h: "Grado di $D$ > 2", w: 3, da: "scompongo $D$, un fratto per fattore",
            b: [
              "$\\frac{4x}{(x-1)(x+1)(x-3)}=\\frac{A}{x-1}+\\frac{B}{x+1}+\\frac{C}{x-3}$",
              "$\\frac{2x+3}{(x-1)(x+2)^2}=\\frac{A}{x-1}+\\frac{B}{x+2}+\\frac{C}{(x+2)^2}$",
              "$\\frac{x-3}{(x+2)(x^2+1)}=\\frac{A}{x+2}+\\frac{Bx+C}{x^2+1}$",
            ],
          },
          {
            h: "Schema delle fratte", w: 6, flow: true,
            b: [
              "grado $N\\geq$ grado $D$? → divisione",
              "$N=D'$ (o quasi)? → $\\ln|D|$",
              "$D$ di 1° grado → $\\frac1a\\ln|ax+b|$",
              "$D$ di 2° grado: $\\Delta>0$ → due $\\ln$; $\\Delta=0$ → $\\ln$ e $-\\frac{1}{x-x_1}$; $\\Delta<0$ → $\\ln$ e $\\arctan$",
            ],
          },
        ],
      },
    ],
  },
];
