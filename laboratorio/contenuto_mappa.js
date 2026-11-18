// Mappa di laboratorio di elettronica: 1 foglio A4 fronte-retro, da ricopiare a mano.
// Fronte: strumenti, segnali, comparatore; retro: amplificatori con l'op-amp e condizionamento.
// Fonti: quaderno di laboratorio (16/9 - 12/11, foto), slide del prof (8/10, 3/11, 12/11), Saber "26-10-03 Laboratorio 5".
// Formule verificate con verifica.py. Criteri della skill mappe-studio; formato dei riquadri: vedi integrali/contenuto_mappa.js.

const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "Laboratorio · strumenti e segnali",
    sezioni: [
      {
        titolo: "1. Strumenti",
        box: [
          {
            mem: true, h: "Alimentatore duale", w: 3,
            b: [
              "2 sezioni in serie: il centro è GND",
              "estremi: $+15$ V e $-15$ V",
              "puntale rosso sul +, nero su GND",
            ],
          },
          {
            mem: true, h: "µA741: piedini", w: 3,
            b: [img("ua741", 22)],
          },
          {
            mem: true, h: "Generatore di funzioni", w: 3,
            b: [
              "forma: sinusoide, triangolare, quadra",
              "$V_{pp}$, $f$, offset, duty cycle",
              "offset = componente continua",
              "$V_{max}=V_{off}+V_p$ &nbsp; $V_{min}=V_{off}-V_p$",
            ],
          },
          {
            mem: true, h: "Oscilloscopio", w: 3,
            b: [
              "cursori: $V_{pp}=A_Y-B_Y$ &nbsp; $T=B_X-A_X$",
              "AC: toglie l'offset · DC: segnale intero",
              "2 canali: $V_{in}$ e $V_{out}$ insieme",
            ],
          },
        ],
      },
      {
        titolo: "2. Grandezze di un segnale",
        box: [
          {
            mem: true, h: "Formule", w: 6,
            intest: ["grandezza", "formula"], gruppi: 2,
            tab: [
              ["periodo", "$T=\\frac{1}{f}$"],
              ["picco-picco", "$V_{pp}=V_M-V_m$"],
              ["picco (simmetrico)", "$V_p=\\frac{V_{pp}}{2}$"],
              ["efficace (sinusoide)", "$V_{eff}=\\frac{V_M}{\\sqrt2}$"],
              ["sfasamento", "$\\varphi=\\frac{360°\\cdot\\Delta t}{T}$"],
              ["guadagno", "$G=\\frac{V_{o,pp}}{V_{i,pp}}$"],
            ],
          },
          {
            mem: true, h: "LED", w: 6,
            b: [
              "$R=\\frac{V_{CC}-V_{LED}}{I_{LED}}$ &nbsp;&nbsp; $V_{LED}\\approx2$ V &nbsp;&nbsp; $I_{LED}$ 10÷20 mA",
            ],
          },
        ],
      },
      {
        titolo: "3. µA741 ad anello aperto: comparatore",
        box: [
          {
            mem: true, h: "Uscita", w: 3,
            b: [
              "$v^+>v^-\\to V_{out}=+V_{sat}$ (H)",
              "$v^+<v^-\\to V_{out}=-V_{sat}$ (L)",
              "$|V_{sat}|\\approx V_{CC}-(1\\div2)$ V",
              "le due $V_{sat}$ possono essere diverse",
              "triangolare in ingresso → quadra in uscita",
            ],
          },
          {
            mem: true, h: "Schema", w: 3,
            b: [
              img("comparatore", 30),
              "trimmer: sposta $V_{ref}$ → cambia il duty cycle",
              "si accende il LED del segno di $V_{out}$",
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Laboratorio · amplificatori con op-amp",
    sezioni: [
      {
        titolo: "4. Configurazioni",
        box: [
          {
            mem: true, h: "Guadagno teorico", w: 6,
            intest: ["configurazione", "$V_{out}$", "uscita"],
            tab: [
              ["invertente", "$-\\frac{R_f}{R_i}V_{in}$", "opposta (180°)"],
              ["non invertente", "$\\left(1+\\frac{R_f}{R_i}\\right)V_{in}$", "in fase"],
              ["inseguitore ($R_f=0$, $R_i=\\infty$)", "$V_{in}$", "in fase, $A_v=1$"],
              ["sommatore invertente", "$-R_f\\left(\\frac{V_1}{R_1}+\\frac{V_2}{R_2}+\\frac{V_3}{R_3}\\right)$", "$\\frac{R_f}{R_k}$ = peso di $V_k$"],
              ["differenziale ($R_i$, $R_f$ a coppie)", "$\\frac{R_f}{R_i}(V_2-V_1)$", "$V_1=V_2$: 0 V"],
            ],
          },
          {
            mem: true, h: "Misure", w: 3,
            b: [
              "$A_{v,reale}=\\frac{V_{out,pp}}{V_{in,pp}}$",
              "$V_{in,max}=\\frac{V_{sat}}{|A_v|}$",
              "oltre $V_{in,max}$: uscita tagliata",
            ],
          },
          {
            mem: true, h: "Inseguitore e carico", w: 3,
            b: [
              "$I_L=\\frac{V_{out}}{R_L}$",
              "µA741: $I_{out,max}\\approx\\pm25$ mA",
              "$R_L$ piccola → corrente limitata",
            ],
          },
          {
            mem: true, h: "Dimensionare", w: 6,
            flow: ["$A_v$ richiesto", "scelgo $R_i$", "$R_f=(A_v-1)R_i$ o $|A_v|R_i$", "valore E12 più vicino", "ricalcolo $A_v$ e $V_{in,max}$"],
            dopo: ["E12: 10 · 12 · 15 · 18 · 22 · 27 · 33 · 39 · 47 · 56 · 68 · 82"],
          },
        ],
      },
      {
        titolo: "5. Condizionamento di un sensore",
        box: [
          {
            mem: true, h: "LM35 (temperatura)", w: 3, da: "non invertente",
            b: [
              "$V=10\\,\\frac{\\text{mV}}{°\\text{C}}\\cdot T$, 0 °C → 0 V",
              "piedini: $V_{CC}$, $V_{out}$, GND",
              "$A_v=\\frac{V_{o,max}}{V_{LM35,max}}$",
              "$T_{max}=\\frac{V_{in,max}}{10\\text{ mV/°C}}$",
            ],
          },
          {
            mem: true, h: "Con offset", w: 3, da: "inseguitore + differenziale",
            b: [
              "sensore → inseguitore → differenziale",
              "$V_o=\\frac{R_3}{R_2}(V_s-V_r)$",
              "$\\frac{R_3}{R_2}=\\frac{V_{o,max}-V_{o,min}}{V_{s,max}-V_{s,min}}$",
              "$V_r=V_{s,min}-V_{o,min}\\frac{R_2}{R_3}$",
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
