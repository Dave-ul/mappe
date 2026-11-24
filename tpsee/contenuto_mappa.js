// Mappa di TPSEE, primo foglio: A4 fronte-retro, da ricopiare a mano. Fronte: motore in c.c. a regime; retro: motore in c.c. dinamico.
// Fonti: appunti Saber del 4/11, 10/11 e 11/11 e libro pp. 286-289 (UDA 5, foto nella cartella di classe "5E collab").
// Notazione del libro: V_g alimentazione, e = k_e·ω f.c.e.m. Dal 2026-11-24 niente basi (Ohm, prefissi, LED: solo nella spiegazione).
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
    titolo: "TPSEE · motore in c.c. dinamico",
    sezioni: [
      {
        titolo: "3. Modello completo",
        box: [
          {
            mem: true, h: "Elettrico e meccanico", w: 6, da: "circuito di armatura",
            b: [
              "$V_g-R\\,I-L\\frac{dI}{dt}-k_e\\,\\omega=0$",
              "$k_{me}I-C_{res}-k_{att}\\,\\omega-J\\frac{d\\omega}{dt}=0$",
              "$J\\frac{d\\omega}{dt}$ inerzia: contro $C_{me}$ in accelerazione, 0 a $\\omega$ costante",
            ],
          },
          {
            mem: true, h: "Con Laplace", w: 6,
            b: [
              "$V_g(s)-R\\,I(s)-sL\\,I(s)-k_e\\,\\omega(s)=0$",
              "$k_{me}I(s)-C_{res}(s)-k_{att}\\,\\omega(s)-sJ\\,\\omega(s)=0$",
              "$I(s)=\\frac{V_g-k_e\\,\\omega(s)}{R+sL}$ &nbsp;&nbsp; $\\omega(s)=\\frac{k_{me}I-C_{res}}{k_{att}+sJ}$",
            ],
          },
          {
            mem: true, h: "Schema a blocchi: ingresso $V_g$, uscita $\\omega$", w: 6,
            b: [img("blocchi", 22)],
            dopo: ["con $C_{res}=0$: $\\frac{\\omega}{V_g}=\\frac{k_{me}}{(R+sL)(k_{att}+sJ)+k_ek_{me}}$ &nbsp; ⇐ 2° ordine"],
          },
        ],
      },
      {
        titolo: "4. Collaudo e funzionamento",
        box: [
          {
            mem: true, h: "Vedo → ricavo", w: 6,
            intest: ["vedo", "ricavo"],
            tab: [
              ["rotore bloccato ($\\omega=0$)", "$e=0$, $C_{att}=0$ → $k_{me}=\\frac{C_{meMax}}{I}$"],
              ["rotore libero ($C_{res}=0$)", "$C_{me}=C_{att}=k_{att}\\,\\omega$ → $k_{att}=\\frac{k_{me}I}{\\omega}$"],
              ["$V_g$, $R$, $I$, $\\omega$", "$e=V_g-RI$ → $k_e=\\frac{e}{\\omega}$"],
              ["velocità $n$ in giri/min", "$k_e=\\frac{e}{n}$, $k_{att}=\\frac{C_{att}}{n}$"],
            ],
          },
          {
            mem: true, h: "Motore e generatore", w: 6,
            b: [
              "$C_{me}$ e $\\omega$ concordi: motore; discordi: generatore (freno)",
              "generatore: dinamo, energia meccanica → elettrica",
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
