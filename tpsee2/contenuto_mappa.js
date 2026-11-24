// Mappa di TPSEE, secondo foglio: A4 fronte-retro, da ricopiare a mano. Fronte: encoder; retro: passo-passo, acquisizione, SCR.
// Fonti: encoder dalle foto del libro nella cartella di classe "5E collab" (Drive, 19/11), pp. 79-83 (Sezione 1, UDA 2);
// passo-passo e acquisizione dagli appunti Saber del 28/9, 3/10 e 5/11 (+ datasheet L297/L298); SCR dalla nota Saber del 24/11
// e dalla lavagna del 24/11 (chiavetta, pp. 3 e 5-8: le altre pagine sono di altre classi); I_H dal datasheet.
// Formule verificate con verifica.py. Criteri della skill mappe-studio; formato dei riquadri: vedi integrali/contenuto_mappa.js.

const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "TPSEE · encoder",
    sezioni: [
      {
        titolo: "5. Encoder: trasduttore di posizione angolare, uscita digitale",
        box: [
          {
            mem: true, h: "Principio", w: 3,
            b: [
              "LED + fototransistor, in mezzo disco forato",
              "foro: luce → saturo → $V_{CE}\\approx0$",
              "pieno: buio → interdetto → $V_{CE}=V_{CC}$",
              "$\\omega$ costante → onda quadra",
            ],
          },
          {
            mem: true, h: "Schema", w: 3,
            b: [img("encoder", 30)],
          },
          {
            mem: true, h: "Tipi", w: 6,
            intest: ["tipo", "disco", "misura"],
            tab: [
              ["tachimetrico", "1 corona di $n_D$ fori", "angolo e velocità, non il verso"],
              ["incrementale", "2 corone sfalsate: fase A e B", "anche il verso"],
            ],
          },
        ],
      },
      {
        titolo: "6. Formule",
        box: [
          {
            mem: true, h: "Angolo", w: 3,
            b: [
              "$\\alpha_1=\\frac{360°}{n_D}$ per impulso",
              "$\\alpha=N\\cdot\\alpha_1$ ($N$ impulsi)",
              "misura relativa: da dove inizio a contare",
            ],
          },
          {
            mem: true, h: "Velocità", w: 3,
            b: [
              "$n=\\frac{f}{n_D}\\cdot60$ [giri/min], $f=\\frac1T$",
              "$v=\\frac{\\pi D\\,n}{60}$ [m/s]",
              "spazio per impulso $s_i=\\frac{\\pi D}{n_D}$",
            ],
          },
          {
            mem: true, h: "Massima velocità leggibile", w: 6,
            b: [
              "fori = pieni (duty 50%): $x=\\frac{\\pi D}{2\\,n_D}$",
              "ogni foro dura più del tempo di commutazione maggiore ($T_{ON}$ o $T_{OFF}$)",
              "$v_{Max}=\\frac{x}{T_{OFF}}$ &nbsp;&nbsp; $n_{Max}=\\frac{60\\,v_{Max}}{\\pi D}$",
            ],
          },
        ],
      },
      {
        titolo: "7. Verso di rotazione (incrementale)",
        box: [
          {
            mem: true, h: "Fasi, senso orario", w: 3,
            b: [img("fasi", 26), "A in anticipo di $\\frac T4$ → orario", "A in ritardo → antiorario"],
          },
          {
            mem: true, h: "Flip-flop D", w: 3,
            b: [img("ffd", 22), "fase A → D, fase B → CK", "$Q$ alto orario, basso antiorario"],
          },
        ],
      },
    ],
  },
  {
    titolo: "TPSEE · passo-passo, acquisizione, SCR",
    sezioni: [
      {
        titolo: "8. Motore passo-passo con L297 e L298",
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
        titolo: "9. Acquisizione di un segnale",
        box: [
          {
            mem: true, h: "Catena", w: 6,
            flow: ["sensore", "condizionamento: amplifica, filtra, offset", "convertitore A/D"],
          },
        ],
      },
      {
        titolo: "10. SCR (tiristore): diodo controllato",
        box: [
          {
            mem: true, h: "Schema", w: 3,
            b: [img("scr", 28)],
          },
          {
            mem: true, h: "Vedo → succede", w: 3,
            b: [
              "$V_{AK}>0$ + impulso su G → conduce A → K",
              "acceso: resta acceso anche senza G",
              "$I_A<I_H$ (mantenimento) → si spegne",
              "$V_{AK}<0$ → non conduce",
            ],
          },
          {
            mem: true, h: "Interruttore", w: 3,
            b: [
              "ON $V_{AK}\\approx0$, OFF $I_{AK}\\approx0$ → $P=V_{AK}I_{AK}\\approx0$",
              "commutazione: $V$ e $I$ insieme → picco di $P$",
            ],
          },
          {
            mem: true, h: "Rete", w: 3,
            b: [
              "$V_{eff}=\\frac{V_{Max}}{\\sqrt2}\\approx0{,}707\\,V_{Max}$",
              "220 V → $V_{Max}\\approx311$ V; 50 Hz → $T=20$ ms",
            ],
          },
          {
            mem: true, h: "In alternata: conduce dall'impulso a fine semionda +", w: 6,
            b: [img("scr_ca", 26)],
            dopo: ["impulso in ritardo ($\\alpha$ grande) → meno tensione sul carico $R_L$"],
          },
        ],
      },
    ],
  },
];
facciate.legenda = "⇐ si collega a";
facciate.scala = 1.45;
module.exports = facciate;
