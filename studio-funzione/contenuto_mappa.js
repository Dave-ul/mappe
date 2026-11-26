// Mappa sullo studio di funzione, foglio 1 di 2 (la procedura): 1 foglio A4 fronte-retro, da ricopiare a mano e
// portare in verifica e all'esame. Il foglio 2 (tabelle di derivate, limiti, grafici elementari) è in studio-funzione2/.
// Criteri della skill mappe-studio: niente dimostrazioni, esempi svolti, rimandi al libro o al quaderno; stesso bordo.
// Disequazioni irrazionali, De L'Hôpital e tabelle stanno nel foglio 2.
// Fonti: Matematica.verde 4A+4B cap. 17 (asintoti, discontinuità), 18 (non derivabilità), 19 (massimi, minimi, flessi),
// 20 (studio delle funzioni); quaderno Saber 28/9-7/10 e lista del prof "cose da portare alla verifica" (29/9).
// Riquadro: h = titolo, da = collegamento (⇐), w = colonne su 6. Contenuto: b = righe, tab = righe di tabella
// (intest = intestazioni, gruppi = tabelle affiancate), flow = catena di passi, albero = {t, f}, dopo = righe finali.

const facciate = [
  {
    titolo: "Studio di funzione",
    sezioni: [
      {
        titolo: "1. I passi",
        box: [
          {
            mem: true, h: "Schema", w: 6,
            flow: ["dominio", "simmetrie", "assi", "segno", "limiti e asintoti", "$f'$", "$f''$", "grafico"],
          },
          {
            mem: true, h: "Dominio: vedo → impongo", w: 6,
            intest: ["vedo", "impongo"], gruppi: 2,
            tab: [
              ["$\\frac{N}{D}$", "$D\\neq0$"],
              ["$\\sqrt[\\text{pari}]{g}$", "$g\\geq0$"],
              ["$\\frac{1}{\\sqrt{g}}$", "$g>0$"],
              ["$\\ln g$", "$g>0$"],
              ["$\\frac{1}{\\ln g}$", "$g>0,\\ g\\neq1$"],
              ["$f^{\\,g}$", "$f>0$"],
              ["$\\tan g$", "$g\\neq\\frac{\\pi}{2}+k\\pi$"],
              ["$\\arcsin g$", "$-1\\leq g\\leq1$"],
            ],
            dopo: ["$\\sqrt[\\text{dispari}]{g}$, $e^g$, $\\sin g$, $\\arctan g$: solo il dominio di $g$"],
          },
          {
            mem: true, h: "Simmetrie", w: 3,
            b: [
              "solo se $D$ è simmetrico",
              "$f(-x)=f(x)$ pari: asse $y$",
              "$f(-x)=-f(x)$ dispari: origine",
              "$f(x+T)=f(x)$ periodica",
            ],
          },
          {
            mem: true, h: "Assi e segno", w: 3,
            b: [
              "asse $y$: $x=0$",
              "asse $x$: $f(x)=0$",
              "segno: $f(x)>0$ → sopra l'asse $x$",
            ],
          },
        ],
      },
      {
        titolo: "2. Limiti e asintoti",
        box: [
          {
            mem: true, h: "Asintoti", w: 6,
            intest: ["asintoto", "condizione"],
            tab: [
              ["verticale $x=c$", "$\\lim_{x\\to c^{\\pm}}f=\\pm\\infty$"],
              ["orizzontale $y=l$", "$\\lim_{x\\to\\pm\\infty}f=l$"],
              ["obliquo $y=mx+q$", "$m=\\lim\\frac{f}{x}\\neq0$, &nbsp;$q=\\lim\\,[f-mx]$"],
            ],
            dopo: [
              "$c$: zeri di $D$ non semplificati, $\\ln g$ con $g\\to0^+$, estremi aperti",
              "obliquo solo se $\\lim_{x\\to\\pm\\infty}f=\\infty$; a $+\\infty$ e $-\\infty$ separati",
            ],
          },
          {
            mem: true, h: "Fratte: gradi $n$ di $N$, $m$ di $D$", w: 6,
            intest: ["gradi", "asintoto"], gruppi: 2,
            tab: [
              ["$n<m$", "$y=0$"],
              ["$n=m$", "$y=\\frac{a_n}{b_m}$"],
              ["$n=m+1$", "obliquo"],
              ["$n>m+1$", "nessuno"],
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Studio di funzione · retro",
    sezioni: [
      {
        titolo: "3. Derivata prima",
        box: [
          {
            mem: true, h: "Segno di $f'$", w: 6,
            intest: ["$f'$", "$f$"], gruppi: 2,
            tab: [
              ["$f'>0$", "crescente ↗"],
              ["$f'<0$", "decrescente ↘"],
              ["$+\\ 0\\ -$", "massimo"],
              ["$-\\ 0\\ +$", "minimo"],
              ["$+\\ 0\\ +$ o $-\\ 0\\ -$", "flesso orizzontale"],
              ["ordinata", "$f(x_0)$"],
            ],
          },
          {
            mem: true, h: "Non derivabile in $x_0$", w: 6,
            b: ["$f'_-(x_0)\\neq f'_+(x_0)$"],
            intest: ["$f'_-$ e $f'_+$", "punto"],
            tab: [
              ["diversi, almeno uno finito", "angoloso"],
              ["$+\\infty$ e $-\\infty$", "cuspide"],
              ["tutti e due $+\\infty$ o $-\\infty$", "flesso verticale"],
            ],
          },
          {
            mem: true, h: "Massimo e minimo assoluti in $[a;b]$", w: 6,
            b: ["confronto $f$ nei punti con $f'=0$, nei punti non derivabili e in $a$, $b$"],
          },
        ],
      },
      {
        titolo: "4. Derivata seconda",
        box: [
          {
            mem: true, h: "Segno di $f''$", w: 6,
            intest: ["$f''$", "$f$"],
            tab: [
              ["$f''>0$", "concavità verso l'alto ∪"],
              ["$f''<0$", "concavità verso il basso ∩"],
              ["$f''$ cambia segno in $x_0\\in D$", "flesso (obliquo se $f'(x_0)\\neq0$)"],
            ],
            dopo: ["tangente inflessionale: $y-f(x_0)=f'(x_0)(x-x_0)$ nel flesso"],
          },
        ],
      },
      {
        titolo: "5. Discontinuità in x₀",
        box: [
          {
            mem: true, h: "Specie", w: 6, da: "continuità",
            b: ["continua: $\\lim_{x\\to x_0}f=f(x_0)$"],
            intest: ["limiti", "specie"],
            tab: [
              ["$\\lim_{x_0^-}$ e $\\lim_{x_0^+}$ finiti e diversi", "prima (salto)"],
              ["almeno uno infinito o non esiste", "seconda"],
              ["$\\lim f=l$ finito, ma $\\neq f(x_0)$ o $f(x_0)$ non c'è", "terza (eliminabile)"],
            ],
          },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
