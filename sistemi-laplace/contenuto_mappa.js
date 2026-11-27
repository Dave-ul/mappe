// Mappa di Sistemi Automatici su Laplace e funzioni di trasferimento: 1 foglio A4 fronte-retro, da ricopiare a mano.
// È il primo dei due fogli sui Moduli G e H; il secondo (sistemi del secondo ordine, H2) è in sistemi-2ordine/.
// Fa da traccia per il discorso dell'interrogazione: riquadri nell'ordine in cui si espone (G1 → G2 → H1).
// Fonti: libro "Nuovo Corso di sistemi automatici" vol. 2 (Hoepli), Modulo G (G1 trasformata, G2 antitrasformata)
// e Modulo H, Unità H1 (funzioni di trasferimento e risposte), dagli screenshot bsmart doppie 2-28.
// Il quaderno di settembre-novembre tratta Bode, non questi argomenti. H3 (schemi a blocchi) non è ancora catturata.
// Criteri d'esame (skill mappe-studio): formule, parole chiave e catene di passi; niente dimostrazioni né esempi.
// Formule verificate con verifica.py.

const facciate = [
  {
    titolo: "Sistemi · trasformata e antitrasformata di Laplace",
    sezioni: [
      {
        titolo: "G1 · Trasformata",
        box: [
          {
            mem: true, h: "Cos'è e perché", w: 6,
            b: [
              "$F(s)=\\mathcal{L}\\{f(t)\\}=\\int_0^{\\infty}f(t)\\,e^{-st}\\,dt$ · $s=\\alpha+j\\omega$ · biunivoca",
              "problema in $t$ → $\\mathcal{L}$ → algebra in $s$ → $\\mathcal{L}^{-1}$ → soluzione in $t$",
              "derivo → $\\times s$ · integro → $\\div s$ · eq. differenziale → eq. algebrica",
            ],
          },
          {
            mem: true, h: "Tabella minima", w: 6,
            intest: ["$f(t)$", "$F(s)$"], gruppi: 2,
            tab: [
              ["$1$ gradino", "$\\frac1s$"],
              ["$t$ rampa", "$\\frac1{s^2}$"],
              ["$t^n$", "$\\frac{n!}{s^{n+1}}$"],
              ["$\\delta(t)$ impulso", "$1$"],
              ["$\\sin\\omega t$", "$\\frac{\\omega}{s^2+\\omega^2}$"],
              ["$\\cos\\omega t$", "$\\frac{s}{s^2+\\omega^2}$"],
            ],
            dopo: ["Eulero: $\\sin\\alpha=\\frac{e^{j\\alpha}-e^{-j\\alpha}}{2j}$ · $\\cos\\alpha=\\frac{e^{j\\alpha}+e^{-j\\alpha}}{2}$"],
          },
          {
            mem: true, h: "Teoremi", w: 6,
            b: [
              "linearità: $k_1f_1+k_2f_2$ → $k_1F_1+k_2F_2$",
              "traslazione in $s$: $f(t)\\,e^{kt}$ → $F(s-k)$ · ritardo: $f(t-k)$ → $e^{-ks}F(s)$",
              "derivata: $sF-f(0)$ · 2ª: $s^2F-sf(0)-f'(0)$",
              "integrale: $\\frac{F(s)}{s}$ · per $t$: $t\\,f(t)$ → $-\\frac{dF}{ds}$",
              "valore finale (regime): $\\lim_{t\\to\\infty}f(t)=\\lim_{s\\to0}sF(s)$",
              "valore iniziale: $\\lim_{t\\to0}f(t)=\\lim_{s\\to\\infty}sF(s)$",
            ],
          },
        ],
      },
      {
        titolo: "G2 · Antitrasformata",
        box: [
          {
            mem: true, h: "Fratti semplici", w: 6,
            b: [
              "polo $p$ → $\\frac{A}{s-p}$ · polo doppio → $\\frac{A}{(s-p)^2}+\\frac{A_1}{s-p}$",
              "sistema: m.c.m. → stessi coefficienti di $s^0, s^1,\\dots$ → sistema",
              "residui: $A=\\left[U(s)\\,(s-p)^n\\right]_{s=p}$ (grado massimo $n$)",
              "grado $n-k$: derivo $k$ volte, divido per $k!$ · o un $s$ comodo",
            ],
          },
          {
            mem: true, h: "Vedo → antitrasformo", w: 6,
            intest: ["$U(s)$", "$u(t)$"], gruppi: 3,
            tab: [
              ["$\\frac{A}{s}$", "$A$"],
              ["$\\frac{A}{s^2}$", "$A\\,t$"],
              ["$\\frac{A}{s-p}$", "$A\\,e^{pt}$"],
              ["$\\frac{A}{(s-p)^2}$", "$A\\,t\\,e^{pt}$"],
              ["$\\frac{1}{1+\\tau s}$", "$\\frac1\\tau e^{-t/\\tau}$"],
              ["$\\frac{\\omega}{(s+a)^2+\\omega^2}$", "$e^{-at}\\sin\\omega t$"],
            ],
          },
        ],
      },
    ],
  },
  {
    titolo: "Sistemi · funzioni di trasferimento e risposte",
    sezioni: [
      {
        titolo: "H1 · Funzione di trasferimento",
        box: [
          {
            mem: true, h: "Cos'è e come si calcola", w: 3,
            b: [
              "$G(s)=\\frac{U(s)}{I(s)}$ · $U=G\\,I$ (c.i. nulle)",
              "legame differenziale → algebrico → blocco",
              "R → $R$ · C → $\\frac1{sC}$ · L → $sL$",
              "partitore, paralleli → divido per l'ingresso",
              "RC: $G=\\frac{1}{1+\\tau s}$, $\\tau=RC$",
            ],
          },
          {
            mem: true, h: "Poli e zeri", w: 3,
            b: [
              "poli $p$: radici del denominatore",
              "zeri $z$: radici del numeratore",
              "oltre il 2° grado: Ruffini",
            ],
          },
          {
            mem: true, h: "Due forme", w: 6,
            b: [
              "poli e zeri $\\mu\\,\\frac{(s-z_1)\\cdots}{s^g\\,(s-p_1)\\cdots}$ ⇄ costanti di tempo $K\\,\\frac{(1+T_1s)\\cdots}{s^g\\,(1+\\tau_1s)\\cdots}$",
            ],
            dopo: ["$p=-\\frac1\\tau$ · $z=-\\frac1T$ · $K$ guadagno statico ($K\\neq\\mu$)"],
          },
        ],
      },
      {
        titolo: "H1 · Risposte",
        box: [
          {
            mem: true, h: "Passi", w: 6,
            b: [
              "$G(s)$ → $I(s)$ → $U=G\\cdot I$ → $u(t)=\\mathcal{L}^{-1}\\{U\\}$",
              "impulso $I=1$ ($U=G$) · gradino $\\frac{A}{s}$ · rampa $\\frac1{s^2}$",
            ],
          },
          {
            mem: true, h: "Primo ordine $\\frac{1}{1+\\tau s}$", w: 6,
            intest: ["ingresso", "uscita"],
            tab: [
              ["gradino $E$", "$E\\left(1-e^{-t/\\tau}\\right)$"],
              ["rampa $t$", "$t-\\tau+\\tau e^{-t/\\tau}$ · insegue con ritardo $\\tau$"],
            ],
            dopo: ["$\\tau$: la tangente nell'origine incontra l'asintoto in $t=\\tau$"],
          },
          {
            mem: true, h: "Sistemi idraulici e termici", w: 6, da: "RC",
            intest: ["sistema", "$G(s)$", "risposta", "come"],
            tab: [
              ["serbatoio semplice, corpo che si scalda", "$\\frac{1}{1+\\tau s}$", "$h_i\\left(1-e^{-t/\\tau}\\right)$", "carica di C"],
              ["afflusso costante $q_i$, flusso di calore", "$\\frac{1}{sC}$", "$\\frac{q_i}{C}\\,t$", "carica a corrente costante"],
              ["svuotamento, raffreddamento", "", "$h_0\\,e^{-t/\\tau}$", "scarica di C"],
            ],
            dopo: [
              "$q=C\\frac{dh}{dt}$ · $R=\\frac{h_i-h_u}{q}$ · $\\tau=RC$ (termici: $C_T$, $R_T$)",
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
