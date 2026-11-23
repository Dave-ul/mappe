// Mappa di TPSEE, secondo foglio: A4 fronte-retro, da ricopiare a mano. Fronte: encoder; retro: motore in c.c. dinamico.
// Fonti: foto del libro nella cartella di classe "5E collab" (Drive, 19/11): encoder pp. 79-83 (Sezione 1, UDA 2),
// motore in c.c. pp. 286-289 (UDA 5). Negli appunti Saber non ci sono: tutto dal libro.
// Formule verificate con verifica.py. Criteri della skill mappe-studio; formato dei riquadri: vedi integrali/contenuto_mappa.js.

const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm">`;

const facciate = [
  {
    titolo: "TPSEE · encoder",
    sezioni: [
      {
        titolo: "6. Encoder: trasduttore di posizione angolare, uscita digitale",
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
        titolo: "7. Formule",
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
        titolo: "8. Verso di rotazione (incrementale)",
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
    titolo: "TPSEE · motore in c.c. dinamico",
    sezioni: [
      {
        titolo: "9. Modello completo",
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
        titolo: "10. Collaudo e funzionamento",
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
