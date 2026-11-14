// Mappa sull'amplificatore operazionale: 1 foglio A4 fronte-retro, da ricopiare a mano e portare in verifica e all'esame.
// Criteri nella skill mappe-studio: niente dimostrazioni, esempi svolti, rimandi al libro o al quaderno; stesso bordo.
// Circuiti ritagliati dalla vecchia mappa con strumenti/ritaglia_circuiti.py (cartella img/).
// Riquadro: h = titolo, da = collegamento (⇐), w = colonne su 6; b = righe, flow = catena di passi, dopo = righe finali.

const img = (nome, alto) => `<img src="img/${nome}.png" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "Amplificatore operazionale",
    sezioni: [
      {
        titolo: "1. Base",
        box: [
          {
            mem: true, h: "Modello e CCV", w: 3,
            b: [
              "$v_o=A_{OL}(v_+-v_-)$",
              "ideale: $A_{OL}=\\infty$, $R_i=\\infty$, $R_o=0$",
              "CCV: $v_+=v_-$, $i_+=i_-=0$",
              "vale con retroazione negativa e $|v_o|<V_{sat}$",
            ],
          },
          {
            mem: true, h: "Metodo", w: 3,
            flow: ["CCV", "Ohm", "$\\sum i=0$ su $v_-$", "$v_o$"],
            dopo: [
              "più ingressi: sovrapposizione",
              "anello aperto: comparatore, $\\pm V_{sat}$",
              "$V_{sat}\\approx V_{CC}-(1\\div2)$ V",
            ],
          },
        ],
      },
      {
        titolo: "2. Configurazioni",
        box: [
          { mem: true, h: "Non invertente (N)", w: 2, b: [img("non_invertente", 18), "$G=1+\\frac{R_2}{R_1}$, in fase"] },
          { mem: true, h: "Invertente (I)", w: 2, b: [img("invertente", 18), "$G=-\\frac{R_2}{R_1}$, $R_i=R_1$"] },
          { mem: true, h: "Buffer", w: 2, da: "N", b: [img("buffer", 16), "$v_o=v_i$, adatta l'impedenza"] },
          {
            mem: true, h: "Sommatore invertente", w: 2, da: "I",
            b: [img("sommatore_inv", 19), "$v_o=-R_2\\left(\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}\\right)$"],
          },
          {
            mem: true, h: "Sommatore non invertente", w: 2, da: "N",
            b: [img("sommatore_non_inv", 19), "$v_o=\\frac{v_a+v_b}{2}\\left(1+\\frac{R_2}{R_1}\\right)$"],
          },
          { mem: true, h: "Corrente → tensione", w: 2, da: "I", b: [img("corrente_tensione", 17), "$v_o=-R\\,i_i$"] },
          {
            mem: true, h: "Differenziale", w: 4, da: "I + N",
            b: [img("differenziale", 21), "$v_o=\\frac{R_2}{R_1}(v_{i+}-v_{i-})$"],
          },
        ],
      },
    ],
  },
  {
    titolo: "Operazionale · retro",
    sezioni: [
      {
        titolo: "3. Convertitori V → I",
        box: [
          {
            mem: true, h: "Carico fuori massa", w: 3, da: "N",
            b: [img("vi_fuori_massa", 25), "$i_L=\\frac{v_i}{R_1}$, non dipende da $R_L$", "$|v_i|<V_{sat}\\frac{R_1}{R_1+R_L}$"],
          },
          {
            mem: true, h: "Carico a massa", w: 3,
            b: [img("vi_a_massa", 27), "$i_L=\\frac{v_i-v}{R_1}$; $C$ a massa: $i_L=\\frac{v_i}{R_1}$"],
          },
        ],
      },
      {
        titolo: "4. Operazionale reale",
        box: [
          {
            mem: true, h: "Offset", w: 3, da: "N",
            b: ["$V_{oo}=V_{os}\\left(1+\\frac{R_2}{R_1}\\right)$", "si riduce limitando $\\frac{R_2}{R_1}$", "$V_{os}$: da μV a qualche mV"],
          },
          {
            mem: true, h: "Slew rate", w: 3,
            b: ["$SR=\\frac{\\Delta V_o}{\\Delta t}$ [V/μs]", "$f_{max}=\\frac{SR}{2\\pi V_{OM}}$, oltre: distorce"],
          },
          {
            mem: true, h: "Correnti di polarizzazione", w: 3, da: "I",
            b: [img("polarizzazione", 24), "$R_3=R_1\\parallel R_2$ annulla $I_{bias}$", "resta $|V_{oo}|=I_{os}R_2$"],
          },
          {
            mem: true, h: "Guadagno-banda", w: 3,
            b: [img("gbp", 24), "$A_{OL}f_H=G_1f_{H1}=f_T$", "meno guadagno, più banda"],
          },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
