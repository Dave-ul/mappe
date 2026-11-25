// Mappa di Sistemi Automatici sui sistemi del secondo ordine: 1 foglio A4 fronte-retro, da ricopiare a mano.
// Fonti: libro, Modulo H, Unità H2 "Sistemi di secondo ordine", pagine 481-487 (foto della cartella di classe "5E collab"
// del 19/11; confrontate il 25/11 con gli screenshot bsmart del libro intero, doppie 35-38: nessuna differenza),
// e quaderno Saber 5/11 (perché sono importanti, RLC e massa-molla) e 12/11 (forma generale, poli, tre casi, gradino).
// Il 13/11 il prof ha detto di leggere il libro. Formule verificate con verifica.py.

const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "Sistemi · secondo ordine: f.d.t. e poli",
    sezioni: [
      {
        titolo: "1. Funzione di trasferimento",
        box: [
          {
            mem: true, h: "Idea", w: 3,
            b: [
              "2 accumulatori di energia (L e C, molla e massa)",
              "si rimpallano l'energia → oscillazioni",
              "$\\xi$ smorzamento",
              "$\\omega_n$ pulsazione naturale (evoluzione libera)",
            ],
          },
          {
            mem: true, h: "Forma generale", w: 3,
            b: [
              "$$G(s)=K\\,\\frac{\\omega_n^2}{s^2+2\\xi\\omega_n s+\\omega_n^2}$$",
            ],
          },
          {
            mem: true, h: "Da $G(s)$ a $\\omega_n$, $\\xi$, $K$", w: 6,
            flow: ["coefficiente di $s^2$ = 1", "termine noto $=\\omega_n^2$ → $\\omega_n$", "coefficiente di $s$ $=2\\xi\\omega_n$ → $\\xi$", "numeratore $=K\\omega_n^2$ → $K$"],
          },
          {
            mem: true, h: "RLC serie, uscita su C", w: 3,
            b: [img("rlc", 20), "$G=\\frac{V_C}{V_i}=\\frac{1}{s^2LC+sRC+1}$"],
          },
          {
            mem: true, h: "RLC: parametri", w: 3, da: "forma generale",
            b: [
              "$\\omega_n=\\frac{1}{\\sqrt{LC}}$",
              "$\\xi=\\frac R2\\sqrt{\\frac CL}$",
              "$K=1$",
            ],
          },
        ],
      },
      {
        titolo: "2. Poli e smorzamento",
        box: [
          {
            mem: true, h: "Poli", w: 6,
            b: ["$p_{1,2}=-\\xi\\omega_n\\pm\\sqrt{\\xi^2\\omega_n^2-\\omega_n^2}=\\omega_n\\left(-\\xi\\pm\\sqrt{\\xi^2-1}\\right)$"],
          },
          {
            mem: true, h: "Vedo $\\xi$ → poli → sistema", w: 6,
            intest: ["$\\xi$", "poli", "sistema"],
            tab: [
              ["$\\xi>1$", "reali distinti, negativi", "sovrasmorzato: lento, niente oscillazioni"],
              ["$\\xi=1$", "reali coincidenti $-\\xi\\omega_n$", "critico: limite delle oscillazioni"],
              ["$0<\\xi<1$", "complessi coniugati $\\omega_n(-\\xi\\pm j\\sqrt{1-\\xi^2})$", "sottosmorzato: oscilla, più pronto"],
              ["$\\xi=0$", "immaginari", "non smorzato: oscillazioni persistenti"],
              ["$\\xi<0$", "parte reale positiva", "divergente: instabile"],
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Sistemi · secondo ordine: risposte",
    sezioni: [
      {
        titolo: "3. Risposta all'impulso: U(s) = 1 · G(s), con K = 1",
        box: [
          {
            mem: true, h: "Tre casi, tutti → 0", w: 6, da: "antitrasformata, fratti semplici",
            b: [
              "$\\xi>1$: $u(t)=A\\,e^{p_1t}+B\\,e^{p_2t}$",
              "$\\xi=1$: $u(t)=\\omega_n^2\\,t\\,e^{-\\omega_n t}$",
              "$0<\\xi<1$: $u(t)=\\frac{\\omega_n}{\\sqrt{1-\\xi^2}}\\,e^{-\\xi\\omega_n t}\\,\\sin\\left(\\omega_n\\sqrt{1-\\xi^2}\\,t\\right)$",
            ],
          },
        ],
      },
      {
        titolo: "4. Risposta al gradino unitario",
        box: [
          {
            mem: true, h: "Al variare di $\\xi$", w: 3,
            b: [img("risposte", 44), "$\\xi$ cala → più pronta, più oscillazioni"],
          },
          {
            mem: true, h: "Specifiche", w: 3,
            b: [img("specifiche", 50)],
          },
          {
            mem: true, h: "Formula ($0<\\xi<1$)", w: 6,
            b: [
              "$u(t)=1-\\frac{1}{\\sqrt{1-\\xi^2}}\\,e^{-\\xi\\omega_n t}\\,\\sin\\left(\\omega_n\\sqrt{1-\\xi^2}\\,t+\\arctan\\frac{\\sqrt{1-\\xi^2}}{\\xi}\\right)$",
              "regime $U_F$ = ampiezza del gradino (per $K$)",
            ],
          },
          {
            mem: true, h: "Tempi e sovraelongazione", w: 6,
            intest: ["", "definizione", "formula"],
            tab: [
              ["$T_D$ ritardo", "fino al 50% di $U_F$", ""],
              ["$T_R$ salita", "dal 10% al 90% di $U_F$", ""],
              ["$T_P$ picco", "istante di $U_{max}$", "$T_P=\\frac{\\pi}{\\omega_n\\sqrt{1-\\xi^2}}$"],
              ["$T_S$ assestamento", "entra nella fascia ±5% (o 2%)", "$T_S=\\frac{3}{\\xi\\omega_n}$ (5%)"],
              ["$M_{max}\\%$", "$\\frac{U_{max}-U_F}{U_F}\\cdot100$", "$100\\,e^{-\\pi\\xi/\\sqrt{1-\\xi^2}}$"],
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
