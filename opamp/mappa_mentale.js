// Mappa mentale sull'amplificatore operazionale: stessi contenuti di contenuto_mappa.js, disposti come mappa mentale
// (nodo centrale, rami numerati in senso orario, foglie). A4 orizzontale fronte-retro, da ricopiare a mano.
// Generatore: node genera_mentale.js opamp ~/Documenti/Mappa_mentale_amplificatore_operazionale.pdf
// I rami derivati stanno come foglie del ramo da cui vengono (Buffer sotto N, sommatore invertente sotto I...).

const COLORI = ["#3d64d8", "#1597d8", "#19a9ab", "#2e9e3a", "#6a9f12", "#d9701a"];
const ICONA = `<svg width="64" height="40" viewBox="0 0 64 40"><g fill="none" stroke="#333" stroke-width="2.4"
  stroke-linejoin="round"><path d="M14 3 L14 37 L50 20 Z"/><path d="M2 12 H14 M2 28 H14 M50 20 H62"/></g>
  <text x="17" y="16" font-size="11" font-weight="700" fill="#333">−</text>
  <text x="17" y="32" font-size="11" font-weight="700" fill="#333">+</text></svg>`;

const facciate = [
  {
    centro: "Amplificatore operazionale",
    icona: ICONA,
    rami: [
      {
        n: 1, h: "Modello e CCV", lato: "dx", colore: COLORI[0],
        foglie: [
          { t: "$v_o=A_{OL}(v_+-v_-)$" },
          { l: "ideale:", t: "$A_{OL}=\\infty$, $R_i=\\infty$, $R_o=0$" },
          { l: "CCV:", t: "$v_+=v_-$, $i_+=i_-=0$" },
          { t: "vale con retroazione negativa e $|v_o|<V_{sat}$" },
        ],
      },
      {
        n: 2, h: "Metodo", lato: "dx", colore: COLORI[1],
        foglie: [
          { t: "CCV → Ohm → $\\sum i=0$ su $v_-$ → $v_o$" },
          { t: "più ingressi: sovrapposizione" },
          { t: "anello aperto: comparatore, $\\pm V_{sat}$" },
          { t: "$V_{sat}\\approx V_{CC}-(1\\div2)$ V" },
        ],
      },
      {
        n: 3, h: "Non invertente (N)", lato: "dx", colore: COLORI[2], img: "non_invertente", alto: 18,
        foglie: [
          { t: "$G=1+\\frac{R_2}{R_1}$, in fase" },
          { l: "Buffer", t: "$v_o=v_i$, adatta l'impedenza", img: "buffer", alto: 15 },
          { l: "Sommatore non invertente", t: "$v_o=\\frac{v_a+v_b}{2}\\left(1+\\frac{R_2}{R_1}\\right)$", img: "sommatore_non_inv", alto: 18 },
        ],
      },
      {
        n: 5, h: "Differenziale", lato: "sx", colore: COLORI[4], da: "I + N", img: "differenziale", alto: 20,
        foglie: [
          { t: "$v_o=\\frac{R_2}{R_1}(v_{i+}-v_{i-})$" },
        ],
      },
      {
        n: 4, h: "Invertente (I)", lato: "sx", colore: COLORI[3], img: "invertente", alto: 18,
        foglie: [
          { t: "$G=-\\frac{R_2}{R_1}$, $R_i=R_1$" },
          { l: "Sommatore invertente", t: "$v_o=-R_2\\left(\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}\\right)$", img: "sommatore_inv", alto: 18 },
          { l: "Corrente → tensione", t: "$v_o=-R\\,i_i$", img: "corrente_tensione", alto: 16 },
        ],
      },
    ],
  },
  {
    centro: "Operazionale reale e convertitori V → I",
    icona: ICONA,
    rami: [
      {
        n: 1, h: "V → I, carico fuori massa", lato: "dx", colore: COLORI[0], da: "N", img: "vi_fuori_massa", alto: 23,
        foglie: [
          { t: "$i_L=\\frac{v_i}{R_1}$, non dipende da $R_L$" },
          { t: "$|v_i|<V_{sat}\\frac{R_1}{R_1+R_L}$" },
        ],
      },
      {
        n: 2, h: "V → I, carico a massa", lato: "dx", colore: COLORI[1], img: "vi_a_massa", alto: 25,
        foglie: [
          { t: "$i_L=\\frac{v_i-v}{R_1}$" },
          { l: "$C$ a massa:", t: "$i_L=\\frac{v_i}{R_1}$" },
        ],
      },
      {
        n: 3, h: "Offset", lato: "dx", colore: COLORI[2], da: "N",
        foglie: [
          { t: "$V_{oo}=V_{os}\\left(1+\\frac{R_2}{R_1}\\right)$" },
          { t: "si riduce limitando $\\frac{R_2}{R_1}$" },
          { t: "$V_{os}$: da μV a qualche mV" },
        ],
      },
      {
        n: 6, h: "Guadagno-banda", lato: "sx", colore: COLORI[5], img: "gbp", alto: 23,
        foglie: [
          { t: "$A_{OL}f_H=G_1f_{H1}=f_T$" },
          { t: "meno guadagno, più banda" },
        ],
      },
      {
        n: 5, h: "Correnti di polarizzazione", lato: "sx", colore: COLORI[4], da: "I", img: "polarizzazione", alto: 23,
        foglie: [
          { t: "$R_3=R_1\\parallel R_2$ annulla $I_{bias}$" },
          { t: "resta $|V_{oo}|=I_{os}R_2$" },
        ],
      },
      {
        n: 4, h: "Slew rate", lato: "sx", colore: COLORI[3],
        foglie: [
          { t: "$SR=\\frac{\\Delta V_o}{\\Delta t}$ [V/μs]" },
          { t: "$f_{max}=\\frac{SR}{2\\pi V_{OM}}$, oltre: distorce" },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
module.exports = facciate;
