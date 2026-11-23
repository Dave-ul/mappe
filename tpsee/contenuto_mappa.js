// Mappa di TPSEE: 1 foglio A4 fronte-retro, da ricopiare a mano. Fronte: motore in c.c.; retro: basi, passo-passo, acquisizione.
// Fonte: tutti gli appunti Saber di TPSEE tranne Impianti Civili (28/9, 3/10, lavagna 3/11, 4/11, 5/11, 10/11, 11/11);
// dal 2026-11-22 il motore usa la notazione del libro (pp. 286-288, foto in "5E collab"): V_g alimentazione, e = k_e·ω f.c.e.m.
// Formule verificate con verifica.py. Criteri della skill mappe-studio; formato dei riquadri: vedi integrali/contenuto_mappa.js.

const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "TPSEE · motore in corrente continua",
    sezioni: [
      {
        titolo: "1. Motore in c.c.: circuito di armatura",
        box: [
          {
            mem: true, h: "Coppia e principio", w: 3,
            b: [
              "$C=F\\cdot d$ &nbsp; [N·m]",
              "magnete + rotore",
              "campi magnetici $\\to$ coppia",
              "$\\omega$ [rad/s] $=\\frac{2\\pi n}{60}$, $n$ [giri/min]",
            ],
          },
          {
            mem: true, h: "Schema", w: 3,
            b: [img("circuito", 24)],
          },
          {
            mem: true, h: "Equazioni", w: 6,
            b: [
              "$V_g-R\\,I-L\\frac{dI}{dt}-k_e\\,\\omega=0$",
              "$C_{me}=k_{me}\\,I$ &nbsp;&nbsp; $e=k_e\\,\\omega$ (f.c.e.m.)",
            ],
          },
          {
            mem: true, h: "Regime stazionario", w: 6, da: "equazioni",
            b: [
              "$I$, $\\omega$ costanti $\\to$ $L\\frac{dI}{dt}=0$",
              "$I=\\frac{V_g-k_e\\,\\omega}{R}$",
            ],
          },
        ],
      },
      {
        titolo: "2. Caratteristica meccanica",
        box: [
          {
            mem: true, h: "Retta $C_{me}(\\omega)$", w: 3, da: "regime, $C_{me}=k_{me}I$",
            b: [
              "$C_{me}=\\frac{k_{me}V_g}{R}-\\frac{k_{me}k_e}{R}\\,\\omega$",
              "rette parallele, scendono",
            ],
          },
          {
            mem: true, h: "Grafico", w: 3,
            b: [img("caratteristica", 30)],
          },
          {
            mem: true, h: "Vedo → succede", w: 6,
            intest: ["vedo", "succede"],
            tab: [
              ["$\\omega=0$ (spunto)", "$C_{meMax}=\\frac{k_{me}V_g}{R}$, $I=\\frac{V_g}{R}$ max"],
              ["$C_{me}=0$ (a vuoto)", "$\\omega_{Max}=\\frac{V_g}{k_e}$"],
              ["$C_{me}=C_{res}$ (carico)", "$I=\\frac{C_{res}}{k_{me}}$, $\\omega^*=\\frac{V_g-RI}{k_e}$"],
              ["$V_g$ aumenta", "retta più in alto, $\\omega$ aumenta"],
              ["$C_{res}$ aumenta", "$\\omega$ cala, $I$ aumenta"],
              ["$C_{res}>C_{meMax}$", "il motore non parte"],
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "TPSEE · basi, passo-passo, acquisizione",
    sezioni: [
      {
        titolo: "3. Basi",
        box: [
          {
            mem: true, h: "Corrente", w: 3,
            b: [
              "$I=\\frac{\\Delta Q}{\\Delta t}$ &nbsp; [A] = [C/s]",
              "$|q_e|=1{,}602\\cdot10^{-19}$ C",
            ],
          },
          {
            mem: true, h: "Legge di Ohm", w: 3,
            b: [
              "$V=R\\,I$ &nbsp; [V] = [Ω]·[A]",
              "$I$ entra dal lato +",
            ],
          },
          {
            mem: true, h: "Prefissi", w: 6,
            b: [
              "p $10^{-12}$ · n $10^{-9}$ · µ $10^{-6}$ · m $10^{-3}$",
              "k $10^{3}$ · M $10^{6}$ · G $10^{9}$ · T $10^{12}$",
              "$\\frac{1}{10^{3}}=10^{-3}$ &nbsp;&nbsp; $10^{a}\\cdot10^{b}=10^{a+b}$",
            ],
          },
          {
            mem: true, h: "Serie e partitore", w: 3, da: "Ohm",
            b: [
              "$R_{eq}=R_1+R_2$, stessa $I$",
              "$I=\\frac{V}{R_1+R_2}$",
              "$V_{R_1}=V\\,\\frac{R_1}{R_1+R_2}$",
            ],
          },
          {
            mem: true, h: "LED", w: 3, da: "Ohm",
            b: [
              "$I$ da A a K, $V_{AK}\\approx2$ V",
              "$R=\\frac{V-V_{AK}}{I_{LED}}$",
              "$I_{LED}$ 10÷20 mA, max ≈ 30",
            ],
          },
        ],
      },
      {
        titolo: "4. Motore passo-passo con L297 e L298",
        box: [
          {
            mem: true, h: "Catena", w: 6,
            flow: ["L297: sequenza delle fasi", "L298: doppio ponte H (potenza)", "motore passo-passo"],
            dopo: ["L297: CLOCK = 1 passo · CW/CCW = verso · HALF/FULL"],
          },
          {
            mem: true, h: "L298, ponte A", w: 4,
            intest: ["ENA", "IN1", "IN2", "motore"],
            tab: [
              ["0", "X", "X", "off, libero"],
              ["1", "0", "0", "fermo, frenato"],
              ["1", "0", "1", "gira ↻"],
              ["1", "1", "0", "gira ↺"],
              ["1", "1", "1", "fermo, frenato"],
            ],
          },
          {
            mem: true, h: "Uscite", w: 2,
            b: ["OUT1 pin 2", "OUT2 pin 3", "2 LED opposti: si accende quello del verso"],
          },
        ],
      },
      {
        titolo: "5. Acquisizione di un segnale",
        box: [
          {
            mem: true, h: "Catena", w: 6,
            flow: ["sensore", "condizionamento: amplifica, filtra, offset", "convertitore A/D"],
          },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
