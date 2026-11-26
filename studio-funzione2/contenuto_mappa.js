// Mappa sullo studio di funzione, foglio 2 di 2 (gli strumenti): derivate, limiti, forme indeterminate, gerarchia degli
// infiniti, disequazioni irrazionali e grafici elementari. Il foglio 1 (la procedura) è in studio-funzione/.
// Copre la lista del prof "cose da portare alla verifica" (quaderno 29/9): gerarchie, derivate, domini, grafici di
// funzioni elementari, disequazioni irrazionali, discontinuità, non derivabilità.
// Criteri della skill mappe-studio: niente dimostrazioni, esempi svolti, rimandi al libro o al quaderno; stesso bordo.
// I grafici in img/ sono calcolati da studio-funzione/grafici.py.

const grafico = (nome) => `<img src="img/${nome}.svg" style="width:100%">`;

const facciate = [
  {
    titolo: "Studio di funzione 2 · strumenti",
    sezioni: [
      {
        titolo: "1. Derivate",
        box: [
          {
            mem: true, h: "Composte ($g=g(x)$; con $g=x$ le fondamentali)", w: 6,
            b: ["$k'=0$, &nbsp;$x'=1$"],
            intest: ["$y$", "$y'$"], gruppi: 2,
            tab: [
              ["$g^{\\,n}$", "$n\\,g^{\\,n-1}\\,g'$"],
              ["$\\sqrt g$", "$\\frac{g'}{2\\sqrt g}$"],
              ["$\\sqrt[n]{g}$", "$\\frac{g'}{n\\sqrt[n]{g^{\\,n-1}}}$"],
              ["$\\frac1g$", "$-\\frac{g'}{g^2}$"],
              ["$e^g$", "$e^g\\,g'$"],
              ["$a^g$", "$a^g\\ln a\\,g'$"],
              ["$\\ln|g|$", "$\\frac{g'}{g}$"],
              ["$\\sin g$", "$\\cos g\\,g'$"],
              ["$\\cos g$", "$-\\sin g\\,g'$"],
              ["$\\tan g$", "$\\frac{g'}{\\cos^2g}$"],
              ["$\\arcsin g$", "$\\frac{g'}{\\sqrt{1-g^2}}$"],
              ["$\\arctan g$", "$\\frac{g'}{1+g^2}$"],
            ],
          },
          {
            mem: true, h: "Regole", w: 6,
            b: [
              "$(f\\,g)'=f'g+f\\,g'$ &nbsp;&nbsp; $\\left(\\frac fg\\right)'=\\frac{f'g-f\\,g'}{g^2}$ &nbsp;&nbsp; $(k\\,f)'=k\\,f'$",
            ],
          },
        ],
      },
      {
        titolo: "2. Limiti",
        box: [
          {
            mem: true, h: "Notevoli ($x\\to0$)", w: 6,
            intest: ["limite", "vale"], gruppi: 2,
            tab: [
              ["$\\frac{\\sin x}{x}$", "$1$"],
              ["$\\frac{1-\\cos x}{x^2}$", "$\\frac12$"],
              ["$\\frac{e^x-1}{x}$", "$1$"],
              ["$\\frac{a^x-1}{x}$", "$\\ln a$"],
              ["$\\frac{\\ln(1+x)}{x}$", "$1$"],
              ["$\\frac{(1+x)^k-1}{x}$", "$k$"],
            ],
            dopo: ["$\\left(1+\\frac{k}{x}\\right)^x\\to e^k$ per $x\\to\\pm\\infty$"],
          },
          {
            mem: true, h: "Gerarchia ($x\\to+\\infty$)", w: 6,
            b: ["$\\ln x\\ll x^a\\ll e^x$ &nbsp;($a>0$): vince il più forte"],
          },
          {
            mem: true, h: "Disequazioni irrazionali", w: 6, da: "dominio e segno",
            b: [
              "$\\sqrt A\\geq B$ → $\\begin{cases}B<0\\\\A\\geq0\\end{cases}\\cup\\begin{cases}B\\geq0\\\\A\\geq B^2\\end{cases}$ &nbsp;&nbsp; $\\sqrt A\\leq B$ → $\\begin{cases}A\\geq0\\\\B\\geq0\\\\A\\leq B^2\\end{cases}$",
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Studio di funzione 2 · retro",
    sezioni: [
      {
        titolo: "3. Forme indeterminate",
        box: [
          {
            mem: true, h: "Vedo → faccio", w: 6,
            intest: ["forma", "faccio"],
            tab: [
              ["$+\\infty-\\infty$", "raccolgo il termine più forte; radici: razionalizzo"],
              ["$\\frac\\infty\\infty$", "raccolgo il grado massimo, gerarchia"],
              ["$\\frac00$", "scompongo e semplifico, limiti notevoli"],
              ["$0\\cdot\\infty$", "$f\\cdot g=\\frac{f}{1/g}$"],
              ["$1^\\infty$, $0^0$, $\\infty^0$", "$f^{\\,g}=e^{\\,g\\ln f}$"],
            ],
            dopo: ["$\\frac00$, $\\frac\\infty\\infty$ → De L'Hôpital: $\\lim\\frac fg=\\lim\\frac{f'}{g'}$"],
          },
        ],
      },
      {
        titolo: "4. Grafici elementari",
        box: [
          { mem: true, h: "$x^2$", w: 2, b: [grafico("x2")] },
          { mem: true, h: "$x^3$", w: 2, b: [grafico("x3")] },
          { mem: true, h: "$\\frac1x$", w: 2, b: [grafico("1x")] },
          { mem: true, h: "$\\sqrt x$", w: 2, b: [grafico("radice")] },
          { mem: true, h: "$e^x$", w: 2, b: [grafico("exp")] },
          { mem: true, h: "$\\ln x$", w: 2, b: [grafico("ln")] },
          { mem: true, h: "$\\arctan x$", w: 2, b: [grafico("arctan")] },
          { mem: true, h: "$\\tan x$", w: 2, b: [grafico("tan")] },
          { mem: true, h: "$\\sin x$, $\\cos x$", w: 2, b: [grafico("sincos")] },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
