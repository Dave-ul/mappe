// Mappa sugli integrali indefiniti: 1 foglio A4 fronte-retro, da ricopiare a mano e portare in verifica e all'esame.
// Testo grande come la scrittura a mano (scala 1.45) e solo l'essenziale, secondo i criteri della skill mappe-studio:
// niente dimostrazioni, esempi svolti, rimandi al libro o al quaderno; stesso bordo per tutti i riquadri.
// Riquadro: h = titolo, da = collegamento (⇐), w = colonne su 6. Contenuto, in quest'ordine: b = righe,
// tab = righe [sinistra, destra] (intest = intestazioni, gruppi = tabelle affiancate), flow = catena di passi,
// albero = {t, f: [figli]}, dopo = righe finali. $...$ = formula KaTeX inline, $$...$$ = display.

const facciate = [
  {
    titolo: "Integrali indefiniti",
    sezioni: [
      {
        titolo: "1. Regole",
        box: [
          {
            mem: true, h: "Definizione", w: 3,
            b: [
              "$F'(x)=f(x)$ $\\iff$ $\\int f(x)\\,dx=F(x)+c$",
              "controllo: derivo il risultato",
            ],
          },
          {
            mem: true, h: "Linearità", w: 3,
            b: [
              "$\\int(f+g)\\,dx=\\int f\\,dx+\\int g\\,dx$",
              "$\\int k\\,f\\,dx=k\\int f\\,dx$",
            ],
          },
          {
            mem: true, h: "Immediati", w: 6, da: "derivate lette al contrario",
            intest: ["$f(x)$", "$\\int f(x)\\,dx$"], gruppi: 2,
            tab: [
              ["$x^{\\alpha}$ <i>($\\alpha\\neq-1$)</i>", "$\\frac{x^{\\alpha+1}}{\\alpha+1}+c$"],
              ["$\\frac1x$", "$\\ln|x|+c$"],
              ["$e^x$", "$e^x+c$"],
              ["$a^x$", "$\\frac{a^x}{\\ln a}+c$"],
              ["$\\sin x$", "$-\\cos x+c$"],
              ["$\\cos x$", "$\\sin x+c$"],
              ["$\\frac{1}{\\cos^2x}$", "$\\tan x+c$"],
              ["$\\frac{1}{\\sin^2x}$", "$-\\cot x+c$"],
              ["$\\frac{1}{\\sqrt{1-x^2}}$", "$\\arcsin x+c$"],
              ["$\\frac{1}{1+x^2}$", "$\\arctan x+c$"],
            ],
            dopo: ["prima riscrivo: $\\sqrt[n]{x^m}=x^{\\frac mn}$, $\\frac{1}{x^n}=x^{-n}$"],
          },
          {
            mem: true, h: "Composte", w: 6, da: "immediati",
            b: [
              "come gli immediati, con $f$ al posto di $x$ e $f'$ accanto",
              "$\\int f^{\\alpha}f'\\,dx=\\frac{f^{\\alpha+1}}{\\alpha+1}+c$ &nbsp; $\\int\\frac{f'}{f}\\,dx=\\ln|f|+c$",
              "$\\int\\frac{f'}{k^2+f^2}\\,dx=\\frac1k\\arctan\\frac fk+c$",
              "manca un numero $\\to$ moltiplico e divido",
            ],
          },
        ],
      },
      {
        titolo: "2. Quale metodo",
        box: [
          {
            mem: true, h: "Vedo → uso", w: 6,
            intest: ["vedo", "uso"],
            tab: [
              ["è in tabella", "immediato"],
              ["$f$ e accanto $f'$", "composta"],
              ["$x^n\\cdot$ ($\\sin$, $\\cos$, $e^x$, $\\ln$)", "per parti"],
              ["$\\sqrt x$", "sostituzione"],
              ["$\\frac{\\text{polinomio}}{\\text{polinomio}}$", "fratte"],
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
        titolo: "3. Metodi",
        box: [
          {
            mem: true, h: "Per parti", w: 3, da: "derivata del prodotto",
            b: [
              "$\\int f\\,g'\\,dx=f\\,g-\\int f'\\,g\\,dx$",
              "derivo $x^n$, $\\ln$, $\\arctan$",
            ],
          },
          {
            mem: true, h: "Sostituzione", w: 3,
            flow: ["$\\sqrt x=t$", "$dx=2t\\,dt$", "torno a $x$"],
          },
          {
            mem: true, h: "Fratte", w: 6,
            albero: {
              t: "$\\int\\frac{N(x)}{D(x)}\\,dx$",
              f: [
                { t: "grado $N\\geq$ grado $D$ $\\to$ divisione" },
                { t: "$N=D'$ $\\to$ $\\ln|D|+c$" },
                {
                  t: "$D$ di 2° grado $\\to$ $\\Delta$",
                  f: [
                    { t: "$\\Delta>0$ $\\to$ $\\frac{A}{x-x_1}+\\frac{B}{x-x_2}$" },
                    { t: "$\\Delta=0$ $\\to$ $\\frac{A}{x-x_1}+\\frac{B}{(x-x_1)^2}$" },
                    { t: "$\\Delta<0$ $\\to$ completo il quadrato" },
                  ],
                },
              ],
            },
          },
          {
            mem: true, h: "Cosa esce", w: 4,
            intest: ["fattore", "dà"],
            tab: [
              ["$\\frac{A}{x-a}$", "$A\\ln|x-a|$"],
              ["$\\frac{B}{(x-a)^2}$", "$-\\frac{B}{x-a}$"],
              ["$\\frac{1}{(x-h)^2+k^2}$", "$\\frac1k\\arctan\\frac{x-h}{k}$"],
            ],
          },
          {
            mem: true, h: "$A$, $B$", w: 2,
            b: ["metto le radici di $D$ al posto di $x$"],
          },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
