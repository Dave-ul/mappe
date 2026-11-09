// Contenuto delle mappe sugli integrali indefiniti (cap. 22 Matematica.verde 4A+4B, pp. 1234-1253, e quaderno Saber).
// $...$ = formula KaTeX inline, $$...$$ = formula in display. Una riga che inizia con "$=" continua la precedente.

module.exports = [
  {
    root: "Integrale indefinito",
    sub: "libro pp. 1234-1239 · quaderno 12/10",
    cols: [
      [
        {
          h: "Primitiva",
          b: [
            "$F(x)$ è primitiva di $f(x)$ in $I$ se $F$ è derivabile in $I$ e",
            "$$\\boxed{F'(x)=f(x)}$$",
            "Es. $F(x)=x^2$ è primitiva di $f(x)=2x$.",
          ],
        },
        {
          h: "Infinite primitive",
          b: [
            "Se $F$ è primitiva, anche $F(x)+c$ lo è: $D[F+c]=F'=f$.",
            "Due primitive differiscono per una costante <i>(Lagrange: $D[F-G]=0 \\Rightarrow F-G=c$)</i>.",
            "Grafico: curve traslate in verticale, tangenti parallele a ugual $x$.",
          ],
        },
        {
          h: "Definizione",
          b: [
            "$$\\boxed{\\int f(x)\\,dx = F(x)+c}\\quad c\\in\\mathbb{R}$$",
            "$f(x)$ = funzione integranda, $x$ = variabile di integrazione.",
            "$F$ con $c=0$ = primitiva fondamentale.",
            "Integrare è l'inverso di derivare:",
            "$$D\\left[\\int f(x)\\,dx\\right]=f(x)$$",
            "<b>Verifica</b>: derivo il risultato e devo ritrovare l'integranda.",
          ],
        },
      ],
      [
        {
          h: "Integrabile",
          b: [
            "$f$ è integrabile se ammette una primitiva.",
            "<b>Teorema</b>: $f$ continua in $I$ $\\Rightarrow$ integrabile in $I$.",
            "Condizione sufficiente, non necessaria.",
            "Es. $\\frac{\\sin x}{x}$ è continua ma il suo integrale non si calcola con questi metodi.",
          ],
        },
        {
          h: "Linearità",
          b: [
            "$$\\int[f(x)+g(x)]\\,dx=$$",
            "$$\\int f(x)\\,dx+\\int g(x)\\,dx$$",
            "$$\\int k\\,f(x)\\,dx = k\\int f(x)\\,dx$$",
            "<i>Dim: derivo i due membri, ottengo la stessa funzione.</i>",
            "<b>Attenzione</b>:",
            "$\\int f\\cdot g \\neq \\int f\\cdot\\int g\\qquad \\int \\frac{f}{g}\\neq\\frac{\\int f}{\\int g}$",
          ],
        },
        {
          h: "Trovare $c$ con una condizione",
          b: [
            "Calcolo l'integrale, poi impongo il dato e ricavo $c$.",
            "<span class='q'>quaderno</span> $f''(x)=6x$, $f'(1)=3$, $f(2)=10$:",
            "$f'(x)=3x^2+c_1$, $3+c_1=3 \\Rightarrow c_1=0$",
            "$f(x)=x^3+c_2$, $8+c_2=10 \\Rightarrow c_2=2$",
            "$\\Rightarrow f(x)=x^3+2$",
          ],
        },
      ],
    ],
  },
  {
    root: "Integrali immediati",
    sub: "libro pp. 1238-1240 · quaderno 12/10 · numeri come sul quaderno",
    cols: [
      [
        {
          h: "Potenze",
          b: [
            "① $$\\boxed{\\int x^{\\alpha}dx=\\frac{x^{\\alpha+1}}{\\alpha+1}+c}\\quad \\alpha\\neq-1$$",
            "Casi particolari:",
            "$\\int dx = x+c\\qquad \\int x\\,dx=\\frac{x^2}{2}+c$",
            "$\\int\\sqrt{x}\\,dx=\\int x^{\\frac12}dx=\\frac23\\sqrt{x^3}+c$",
            "$\\int\\frac{1}{x^2}dx=\\int x^{-2}dx=-\\frac1x+c$",
            "Radici e frazioni: <b>riscrivo come potenza</b> $x^{\\alpha}$.",
          ],
        },
        {
          h: "Costante e $1/x$",
          b: [
            "② $\\int k\\,f(x)\\,dx=k\\int f(x)\\,dx$",
            "③ $$\\boxed{\\int\\frac1x\\,dx=\\ln|x|+c}$$",
            "È il caso $\\alpha=-1$. Il modulo serve per valere anche con $x<0$.",
          ],
        },
        {
          h: "Esponenziali",
          b: [
            "④ $\\int e^x\\,dx=e^x+c$",
            "⑪ $\\int a^x\\,dx=\\frac{a^x}{\\ln a}+c$",
          ],
        },
      ],
      [
        {
          h: "Goniometriche",
          b: [
            "⑤ $\\int\\sin x\\,dx=-\\cos x+c$",
            "⑥ $\\int\\cos x\\,dx=\\sin x+c$",
            "⑦ $\\int\\frac{1}{\\cos^2x}dx=\\tan x+c$",
            "⑧ $\\int\\frac{1}{\\sin^2x}dx=-\\cot x+c$",
            "<i>Segno meno: in ⑤ e ⑧.</i>",
          ],
        },
        {
          h: "Inverse goniometriche",
          b: [
            "⑨ $\\int\\frac{1}{\\sqrt{1-x^2}}dx=\\arcsin x+c$",
            "⑩ $\\int\\frac{1}{1+x^2}dx=\\arctan x+c$",
          ],
        },
        {
          h: "Prima di integrare",
          b: [
            "<b>Spezzo</b> la frazione:",
            "$\\int\\frac{x^2+1}{x}dx=\\int\\left(x+\\frac1x\\right)dx$",
            "$=\\frac{x^2}{2}+\\ln|x|+c$",
            "<b>Scompongo e semplifico</b> <span class='q'>quaderno 14/10</span>:",
            "$\\int\\frac{x^2-9}{x+3}dx=\\int\\frac{(x+3)(x-3)}{x+3}dx$",
            "$=\\int(x-3)\\,dx=\\frac{x^2}{2}-3x+c$",
            "<b>Linearità termine per termine</b>:",
            "$\\int(2x^5-4x+3)dx$",
            "$=\\frac{x^6}{3}-2x^2+3x+c$",
          ],
        },
      ],
    ],
  },
  {
    root: "Integrali di funzioni composte",
    sub: "libro pp. 1240-1241 · quaderno 23/10 e 2026-10-4",
    cols: [
      [
        {
          h: "Idea",
          b: [
            "Funzione composta $\\Rightarrow$ accanto serve la <b>derivata dell'interno</b> $f'(x)$.",
            "$$\\int[f(x)]^{\\alpha}f'(x)\\,dx=\\frac{[f(x)]^{\\alpha+1}}{\\alpha+1}+c$$",
            "<i>Dim: derivo il risultato con la regola della catena.</i>",
            "Se manca solo una <b>costante</b>: moltiplico e divido per quella costante.",
            "Se manca una $x$: non si può, serve un altro metodo.",
          ],
        },
        {
          h: "Tabella: gli immediati con $f$ e $f'$",
          b: [
            "$\\int\\frac{f'(x)}{f(x)}dx=\\ln|f(x)|+c$",
            "$\\int f'(x)\\,e^{f(x)}dx=e^{f(x)}+c$",
            "$\\int f'(x)\\,a^{f(x)}dx=\\frac{a^{f(x)}}{\\ln a}+c$",
            "$\\int f'(x)\\sin f(x)\\,dx=-\\cos f(x)+c$",
            "$\\int f'(x)\\cos f(x)\\,dx=\\sin f(x)+c$",
            "$\\int\\frac{f'(x)}{\\cos^2f(x)}dx=\\tan f(x)+c$",
            "$\\int\\frac{f'(x)}{\\sin^2f(x)}dx=-\\cot f(x)+c$",
            "$\\int\\frac{f'(x)}{\\sqrt{1-[f(x)]^2}}dx=\\arcsin f(x)+c$",
            "$\\int\\frac{f'(x)}{1+[f(x)]^2}dx=\\arctan f(x)+c$",
          ],
        },
      ],
      [
        {
          h: "Esempi",
          b: [
            "$\\int(2x-1)^8dx=\\frac12\\int2(2x-1)^8dx$",
            "$=\\frac{(2x-1)^9}{18}+c$",
            "$\\int\\frac{3x}{\\sqrt{x^2+4}}dx=\\frac32\\int2x\\,(x^2+4)^{-\\frac12}dx$",
            "$=3\\sqrt{x^2+4}+c$",
            "$\\int x\\sin x^2dx=\\frac12\\int2x\\sin x^2dx$",
            "$=-\\frac12\\cos x^2+c$",
            "$\\int\\frac{1}{1+4x^2}dx=\\frac12\\int\\frac{2}{1+(2x)^2}dx$",
            "$=\\frac12\\arctan2x+c$",
            "$\\int\\frac{dx}{25+4x^2}=\\frac{1}{25}\\int\\frac{dx}{1+\\left(\\frac{2x}{5}\\right)^2}$",
            "$=\\frac{1}{25}\\cdot\\frac52\\int\\frac{\\frac25\\,dx}{1+\\left(\\frac{2x}{5}\\right)^2}$",
            "$=\\frac{1}{10}\\arctan\\frac{2x}{5}+c$",
            "$\\int\\frac{\\ln x}{x}dx=\\frac{\\ln^2x}{2}+c$ <i>($f=\\ln x$, $f'=\\frac1x$)</i>",
            "$\\int\\frac{x^4+\\ln x}{x}dx=\\int x^3dx+\\int\\frac{\\ln x}{x}dx$",
            "$=\\frac{x^4}{4}+\\frac{\\ln^2x}{2}+c$",
            "$\\int 3x^2e^{x^3}dx=e^{x^3}+c$ <i>($f=x^3$)</i>",
          ],
        },
        {
          h: "Da ricordare",
          b: [
            "$\\int\\tan x\\,dx=-\\ln|\\cos x|+c$",
            "<i>($\\tan x=\\frac{\\sin x}{\\cos x}$, sopra c'è $-D[\\cos x]$)</i>",
            "$\\int\\cot x\\,dx=\\ln|\\sin x|+c$",
            "$\\int\\frac{f'(x)}{k^2+[f(x)]^2}dx=\\frac1k\\arctan\\frac{f(x)}{k}+c$",
          ],
        },
      ],
    ],
  },
  {
    root: "Sostituzione e integrazione per parti",
    sub: "libro pp. 1242-1245 · quaderno 28/10",
    cols: [
      [
        {
          h: "Metodo di sostituzione",
          b: [
            "Quando: radici come $\\sqrt{x}$, oppure per rendere l'integrale immediato.",
            "1. pongo $x=g(t)$ oppure $t=g^{-1}(x)$",
            "<i>($g$ invertibile, $g'$ continua e $\\neq0$)</i>",
            "2. calcolo il differenziale: $dx=g'(t)\\,dt$",
            "3. sostituisco e integro in $t$",
            "4. torno a $x$ con la sostituzione iniziale",
          ],
        },
        {
          h: "Esempio (libro)",
          b: [
            "$\\int\\frac{1}{1+\\sqrt x}dx$",
            "$\\sqrt x=t,\\ x=t^2,\\ dx=2t\\,dt$",
            "$=2\\int\\frac{t}{1+t}dt=2\\int\\frac{t+1-1}{1+t}dt$",
            "$=2\\int\\left(1-\\frac{1}{1+t}\\right)dt$",
            "$=2t-2\\ln|1+t|+c$",
            "$=2\\sqrt x-2\\ln(1+\\sqrt x)+c$",
            "Trucco: aggiungo e tolgo 1 al numeratore.",
          ],
        },
        {
          h: "Chi derivo nelle parti?",
          b: [
            "$\\int x^n\\sin x,\\ \\int x^n\\cos x,\\ \\int x^ne^x$:",
            "<b>derivo $x^n$</b>",
            "$\\int x^n\\ln x,\\ \\int x^n\\arctan x,$",
            "$\\int x^n\\arcsin x$:",
            "<b>integro $x^n$</b> (derivo ln, arctan, arcsin)",
          ],
        },
      ],
      [
        {
          h: "Per parti",
          b: [
            "$$\\boxed{\\int f\\,g'\\,dx=f\\,g-\\int f'\\,g\\,dx}$$",
            "<i>Dim: $D[fg]=f'g+fg'$, integro i due membri e isolo $\\int fg'$.</i>",
            "$f$ = fattore finito (lo derivo)",
            "$g'\\,dx$ = fattore differenziale (lo integro)",
            "Scelgo in modo che il secondo integrale sia più facile.",
            "Da solo: $\\int\\ln x\\,dx=\\int1\\cdot\\ln x\\,dx$",
            "$=x\\ln x-x+c$",
            "Si può applicare più volte:",
            "$\\int x^2e^xdx=e^x(x^2-2x+2)+c$",
          ],
        },
        {
          h: "Esempi",
          b: [
            "$\\int x\\sin x\\,dx=-x\\cos x+\\int\\cos x\\,dx$",
            "$=-x\\cos x+\\sin x+c$",
            "$\\int xe^{2x}dx=\\frac{x}{2}e^{2x}-\\int\\frac12e^{2x}dx$",
            "$=e^{2x}\\left(\\frac x2-\\frac14\\right)+c$",
            "$\\int x\\ln x^4dx=\\frac{x^2}{2}\\ln x^4-\\int\\frac{x^2}{2}\\cdot\\frac{4}{x}dx$",
            "$=\\frac{x^2}{2}\\ln x^4-x^2+c$",
            "$\\int\\frac{x}{\\cos^2x}dx=x\\tan x-\\int\\tan x\\,dx$",
            "$=x\\tan x+\\ln|\\cos x|+c$",
          ],
        },
      ],
    ],
  },
  {
    root: "Funzioni razionali fratte (1)",
    sub: "libro pp. 1245-1247 · quaderno 14/10 e 28/10",
    cols: [
      [
        {
          h: "Primo passo: i gradi",
          b: [
            "$\\int\\frac{N(x)}{D(x)}dx$, con $N$, $D$ polinomi.",
            "grado $N\\geq$ grado $D$ $\\Rightarrow$ <b>divisione</b>:",
            "$N=Q\\cdot D+R$",
            "$$\\int\\frac{N}{D}dx=\\int Q(x)\\,dx+\\int\\frac{R(x)}{D(x)}dx$$",
            "grado $R$ &lt; grado $D$: resta una fratta \"propria\".",
          ],
        },
        {
          h: "Esempi di divisione",
          b: [
            "$\\int\\frac{x-1}{x+4}dx=\\int\\left(1-\\frac{5}{x+4}\\right)dx$",
            "$=x-5\\ln|x+4|+c$",
            "<i>(trucco: $x-1=(x+4)-5$)</i>",
            "$\\int\\frac{x^3+2x^2+x+1}{x^2+1}dx$: $Q=x+2$, $R=-1$",
            "$=\\int\\left(x+2-\\frac{1}{x^2+1}\\right)dx$",
            "$=\\frac{x^2}{2}+2x-\\arctan x+c$",
          ],
        },
        {
          h: "Numeratore = derivata del denominatore",
          b: [
            "$$\\int\\frac{f'(x)}{f(x)}dx=\\ln|f(x)|+c$$",
            "$\\int\\frac{6x-2}{3x^2-2x-1}dx$",
            "$=\\ln|3x^2-2x-1|+c$",
          ],
        },
      ],
      [
        {
          h: "Denominatore di primo grado",
          b: [
            "$$\\int\\frac{1}{ax+b}dx=\\frac1a\\ln|ax+b|+c$$",
            "$\\int\\frac{1}{3x-2}dx=\\frac13\\int\\frac{3}{3x-2}dx$",
            "$=\\frac13\\ln|3x-2|+c$",
          ],
        },
        {
          h: "Denominatore di 2° grado, $\\Delta>0$",
          b: [
            "$ax^2+bx+c=a(x-x_1)(x-x_2)$",
            "$$\\frac{px+q}{ax^2+bx+c}=\\frac{A}{a(x-x_1)}+\\frac{B}{x-x_2}$$",
            "Sommo le frazioni, uguaglio i coefficienti $\\Rightarrow$ sistema in $A$, $B$.",
            "Es. $\\frac{5x-1}{x^2-x-2}=\\frac{A}{x+1}+\\frac{B}{x-2}$",
            "$=\\frac{(A+B)x-2A+B}{x^2-x-2}$",
            "$\\begin{cases}A+B=5\\\\-2A+B=-1\\end{cases}\\Rightarrow A=2,\\ B=3$",
            "$\\int\\frac{5x-1}{x^2-x-2}dx$",
            "$=2\\ln|x+1|+3\\ln|x-2|+c$",
          ],
        },
      ],
    ],
  },
  {
    root: "Funzioni razionali fratte (2)",
    sub: "libro pp. 1247-1251",
    cols: [
      [
        {
          h: "$\\Delta=0$",
          b: [
            "$ax^2+bx+c=a(x-x_1)^2$, con $x_1=-\\frac{b}{2a}$",
            "Se $p=0$: $\\int\\frac{q}{a(x-x_1)^2}dx=-\\frac{q}{a(x-x_1)}+c$",
            "Es. $\\int\\frac{dx}{9x^2+6x+1}=\\int(3x+1)^{-2}dx$",
            "$=-\\frac{1}{3(3x+1)}+c$",
            "Se $p\\neq0$:",
            "$\\frac{px+q}{a(x-x_1)^2}=\\frac{A}{a(x-x_1)}+\\frac{B}{(x-x_1)^2}$",
            "Es. $\\frac{2x-3}{(x-2)^2}=\\frac{2}{x-2}+\\frac{1}{(x-2)^2}$",
            "$\\int\\frac{2x-3}{(x-2)^2}dx$",
            "$=2\\ln|x-2|-\\frac{1}{x-2}+c$",
          ],
        },
        {
          h: "$\\Delta<0$",
          b: [
            "$p=0$: <b>completo il quadrato</b> e arrivo ad $\\arctan$",
            "$x^2+2x+2=(x+1)^2+1$",
            "$\\int\\frac{dx}{x^2+2x+2}=\\arctan(x+1)+c$",
            "$p\\neq0$: faccio comparire la derivata $2ax+b$ al numeratore:",
            "$$r\\int\\frac{2ax+b}{ax^2+bx+c}dx+s\\int\\frac{dx}{ax^2+bx+c}$$",
            "1° pezzo $\\to\\ln$, 2° pezzo $\\to\\arctan$.",
            "Es. $\\int\\frac{2x}{x^2+4x+5}dx$",
            "$=\\int\\frac{2x+4}{x^2+4x+5}dx$",
            "$-4\\int\\frac{dx}{(x+2)^2+1}$",
            "$=\\ln(x^2+4x+5)$",
            "$-4\\arctan(x+2)+c$",
          ],
        },
      ],
      [
        {
          h: "Denominatore di grado > 2",
          b: [
            "Scompongo $D(x)$, una frazione per ogni fattore:",
            "$\\frac{4x}{(x-1)(x+1)(x-3)}$",
            "$=\\frac{A}{x-1}+\\frac{B}{x+1}+\\frac{C}{x-3}$",
            "$\\frac{2x+3}{(x-1)(x+2)^2}$",
            "$=\\frac{A}{x-1}+\\frac{B}{x+2}+\\frac{C}{(x+2)^2}$",
            "$\\frac{x-3}{(x+2)(x^2+1)}$",
            "$=\\frac{A}{x+2}+\\frac{Bx+C}{x^2+1}$",
          ],
        },
        {
          h: "Schema delle fratte",
          b: [
            "grado $N\\geq$ grado $D$? $\\to$ divisione",
            "$N=D'$ (o quasi)? $\\to\\ln|D|$",
            "$D$ di 1° grado $\\to\\frac1a\\ln|ax+b|$",
            "$D$ di 2° grado: calcolo $\\Delta$",
            "&nbsp;&nbsp;$\\Delta>0$ $\\to$ $\\frac{A}{\\ldots}+\\frac{B}{\\ldots}$ $\\to$ due $\\ln$",
            "&nbsp;&nbsp;$\\Delta=0$ $\\to$ $\\ln$ e $-\\frac{1}{x-x_1}$",
            "&nbsp;&nbsp;$\\Delta<0$ $\\to$ $\\ln$ e $\\arctan$",
          ],
        },
        {
          h: "Quale metodo uso?",
          b: [
            "1. È immediato (anche dopo aver spezzato)? $\\to$ tabella",
            "2. C'è $f(x)$ con accanto $f'(x)$? $\\to$ composte",
            "3. È una frazione di polinomi? $\\to$ fratte",
            "4. Prodotto $x^n\\cdot$ (sin, cos, $e^x$, ln, arctan)? $\\to$ per parti",
            "5. C'è $\\sqrt{x}$ o simili? $\\to$ sostituzione",
            "Alla fine: <b>derivo e controllo</b>.",
          ],
        },
      ],
    ],
  },
];
