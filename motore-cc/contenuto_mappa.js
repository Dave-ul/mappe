// Mappa di TPSEE sul motore in corrente continua: 1 foglio A4 fronte-retro, da ricopiare a mano.
// Fonte: appunti Saber di TPSEE (26-11-04, 26-11-10 Motore cc, 26-11-10, 26-11-11). Formule verificate con verifica.py.
// Criteri della skill mappe-studio; formato dei riquadri: vedi integrali/contenuto_mappa.js.

const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "Motore in corrente continua",
    sezioni: [
      {
        titolo: "1. Grandezze",
        box: [
          {
            mem: true, h: "Coppia", w: 3,
            b: ["$C=F\\cdot d$", "unità: N·m"],
          },
          {
            mem: true, h: "Principio", w: 3,
            b: ["magnete + rotore", "interazione tra campi magnetici $\\to$ coppia"],
          },
          {
            mem: true, h: "Simboli", w: 6,
            intest: ["simbolo", "grandezza"], gruppi: 2,
            tab: [
              ["$V_A$ [V]", "tensione di armatura"],
              ["$I_A$ [A]", "corrente di armatura"],
              ["$R_A$ [Ω]", "resistenza di armatura"],
              ["$L_A$ [H]", "induttanza di armatura"],
              ["$V_g$ [V]", "f.c.e.m. $=K_E\\,\\omega$"],
              ["$\\omega$ [rad/s]", "velocità angolare"],
              ["$C_{me}$ [N·m]", "coppia motrice"],
              ["$K_E$, $K_{me}$", "costanti del motore"],
            ],
          },
        ],
      },
      {
        titolo: "2. Circuito di armatura",
        box: [
          {
            mem: true, h: "Schema", w: 6,
            b: [img("circuito", 34)],
          },
          {
            mem: true, h: "Equazioni", w: 6,
            b: [
              "$V_A-R_AI_A-L_A\\frac{dI_A}{dt}-K_E\\,\\omega=0$",
              "$C_{me}=K_{me}\\,I_A$ &nbsp;&nbsp; $V_g=K_E\\,\\omega$",
            ],
          },
          {
            mem: true, h: "Regime stazionario", w: 6, da: "equazioni",
            b: [
              "$V_A$, $I_A$ costanti $\\to$ $\\omega$ costante $\\to$ $L_A\\frac{dI_A}{dt}=0$",
              "$V_A-R_AI_A-K_E\\,\\omega=0$",
              "$I_A=\\frac{V_A-K_E\\,\\omega}{R_A}$",
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Motore in corrente continua · retro",
    sezioni: [
      {
        titolo: "3. Caratteristica meccanica",
        box: [
          {
            mem: true, h: "Retta $C_{me}(\\omega)$", w: 6, da: "regime stazionario, $C_{me}=K_{me}I_A$",
            b: [
              "$C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\,\\omega$",
              "$y=C_{me}$, $x=\\omega$: retta che scende",
            ],
          },
          {
            mem: true, h: "Grafico", w: 6,
            b: [img("caratteristica", 48)],
          },
          {
            mem: true, h: "Punti notevoli", w: 6,
            intest: ["condizione", "risultato"],
            tab: [
              ["$\\omega=0$ (spunto)", "$C=\\frac{K_{me}V_A}{R_A}$, $I_A=\\frac{V_A}{R_A}$ massima"],
              ["$C_{me}=0$ (a vuoto)", "$\\omega_0=\\frac{V_A}{K_E}$"],
              ["$C_{me}=C_r$ (carico)", "$\\omega=\\frac{V_A-R_AC_r/K_{me}}{K_E}$"],
            ],
          },
          {
            mem: true, h: "Vedo → succede", w: 6,
            intest: ["vedo", "succede"],
            tab: [
              ["$V_A$ aumenta", "retta parallela più in alto, $\\omega$ aumenta"],
              ["$C_r$ aumenta", "$\\omega$ cala, $I_A$ aumenta"],
              ["coppia nota", "$I_A=\\frac{C_{me}}{K_{me}}$"],
              ["$C_r>$ coppia di spunto", "il motore non parte"],
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
