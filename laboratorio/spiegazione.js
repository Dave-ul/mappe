// Spiegazione del laboratorio di elettronica, nello stesso stile semplice della spiegazione op-amp:
// riquadri gialli "Detto semplice", ragionamento passo per passo, esempi con i numeri delle esperienze.
// Fonti: quaderno di laboratorio (foto in ~/Documenti/Scuola/Elettronica/Appunti/Laboratorio), slide del prof, Saber.
// Formule ed esempi numerici controllati da verifica.py; schemi degli amplificatori disegnati da disegna_circuiti.py.
const svg = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:1.5mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = {
  titolo: "Laboratorio di elettronica",
  blocchi: [
    { t: "titolo", testo: "Laboratorio di elettronica, spiegato semplice",
      sotto: "strumenti, segnali, comparatore, amplificatori con il µA741, condizionamento di sensori · esperienze da settembre a novembre · bordo spesso = da sapere a memoria" },

    { t: "sez", testo: "1 · L'alimentatore duale" },
    { t: "due", sx: [
      { t: "p", testo: "L'amplificatore operazionale deve poter dare in uscita tensioni <b>positive e negative</b>. Per questo va alimentato con due tensioni: $+15$ V e $-15$ V rispetto alla massa." },
      { t: "p", testo: "L'alimentatore del banco ha due sezioni uguali. Si collegano <b>in serie</b>: il − della prima con il + della seconda. Quel punto in mezzo diventa la <b>massa</b> (GND); i due estremi sono $+15$ V e $-15$ V." },
      { t: "p", testo: "Per misurare $+15$ V col multimetro: puntale <b>rosso sul +</b>, puntale <b>nero sulla massa</b>. Per $-15$ V il nero resta sulla massa e il rosso va sul morsetto negativo: il multimetro segna un numero negativo." },
    ], dx: [
      facile(["Sono due pile messe una sopra l'altra: se tocchi il punto in mezzo e lo chiami \"zero\", sopra hai $+15$ e sotto $-15$."]),
      { t: "box", tipo: "memo", titolo: "Da ricordare", righe: [
        "2 sezioni in serie, il centro è GND",
        "estremi: $+15$ V e $-15$ V",
      ] },
    ] },

    { t: "sez", testo: "2 · Il µA741 e i suoi piedini" },
    { t: "due", sx: [
      { t: "p", testo: "Il µA741 è un amplificatore operazionale in un integrato a 8 piedini. Nel laboratorio se ne usano cinque:" },
      { t: "tab", intest: ["piedino", "a cosa serve"], larghezze: ["25%", "75%"], righe: [
        ["2", "ingresso invertente (−)"],
        ["3", "ingresso non invertente (+)"],
        ["6", "uscita"],
        ["7", "alimentazione $+V_{CC}$ ($+15$ V)"],
        ["4", "alimentazione $-V_{CC}$ ($-15$ V)"],
      ] },
    ], dx: [
      { t: "p", testo: svg("ua741", 32) },
      { t: "box", tipo: "occhio", titolo: "Prima di dare tensione", righe: [
        "Controlla che il 7 vada al $+15$ e il 4 al $-15$: scambiarli può rompere l'integrato.",
      ] },
    ] },

    { t: "sez", testo: "3 · Generatore di funzioni e offset" },
    { t: "due", sx: [
      { t: "p", testo: "Il generatore di funzioni crea il segnale da mandare in ingresso. Si sceglie:" },
      { t: "p", testo: "• la <b>forma</b>: sinusoide, triangolare, quadra (rettangolare);<br>• l'ampiezza, di solito come $V_{pp}$ (picco-picco);<br>• la <b>frequenza</b> $f$;<br>• l'<b>offset</b>;<br>• per la quadra, il <b>duty cycle</b> (quanta parte del periodo sta alta)." },
      { t: "p", testo: "L'<b>offset</b> è la <b>componente continua</b> del segnale: alza o abbassa tutta l'onda senza cambiarne la forma." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Offset", righe: [
        "$$V_{max}=V_{off}+V_p\\qquad V_{min}=V_{off}-V_p$$",
      ] },
      { t: "box", tipo: "passi", titolo: "Esempio del quaderno", righe: [
        "$V_p=5$ V, $V_{off}=2$ V",
        "$V_{max}=2+5=7$ V",
        "$V_{min}=2-5=-3$ V",
      ] },
      facile(["L'offset è come alzare un'altalena intera di 2 metri: dondola come prima, ma tutto più in alto."]),
    ] },

    { t: "sez", testo: "4 · Oscilloscopio" },
    { t: "due", sx: [
      { t: "p", testo: "L'oscilloscopio disegna la tensione nel tempo. In orizzontale c'è il tempo, in verticale la tensione." },
      { t: "p", testo: "Con i <b>cursori</b> si misura senza contare i quadretti: due cursori orizzontali (A e B) sui picchi danno $V_{pp}$, due verticali su due punti uguali di periodi vicini danno $T$." },
      { t: "box", tipo: "memo", titolo: "Cursori", righe: [
        "$$V_{pp}=A_Y-B_Y\\qquad T=B_X-A_X\\qquad f=\\frac{1}{T}$$",
      ] },
    ], dx: [
      { t: "tab", intest: ["accoppiamento", "cosa vedi"], larghezze: ["40%", "60%"], righe: [
        ["DC", "il segnale intero, offset compreso"],
        ["AC", "solo la parte che varia: l'offset viene tolto e l'onda si centra sullo zero"],
      ] },
      { t: "p", testo: "Con i <b>due canali</b> si guardano insieme ingresso e uscita di un amplificatore: si vede subito se l'uscita è più grande, in fase o capovolta." },
      { t: "box", tipo: "passi", titolo: "Misure del 21/9", righe: [
        "sinusoide 10 Vpp, 1 kHz → $T=1$ ms",
        "rettangolare 8 Vpp, 33 kHz",
        "triangolare 12 Vpp, 69 kHz",
      ] },
    ] },

    { t: "sez", testo: "5 · Le grandezze di un segnale" },
    { t: "tab", intest: ["grandezza", "formula", "che cos'è"], larghezze: ["22%", "28%", "50%"], righe: [
      ["periodo", "$T=\\frac{1}{f}$", "il tempo di un'onda completa"],
      ["picco-picco", "$V_{pp}=V_M-V_m$", "dal punto più alto al più basso"],
      ["picco", "$V_p=\\frac{V_{pp}}{2}$", "dallo zero al punto più alto (onda simmetrica)"],
      ["efficace", "$V_{eff}=\\frac{V_M}{\\sqrt2}$", "per la sinusoide: la continua che scalderebbe una resistenza uguale"],
      ["sfasamento", "$\\varphi=\\frac{360°\\cdot\\Delta t}{T}$", "quanto un'onda è in ritardo sull'altra, in gradi"],
      ["guadagno", "$G=\\frac{V_{o,pp}}{V_{i,pp}}$", "quante volte l'uscita è più grande dell'ingresso"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "passi", titolo: "Esempio: sfasamento", righe: [
        "$f=50$ Hz → $T=20$ ms; tra i due picchi $\\Delta t=3$ ms",
        "$\\varphi=\\frac{360°\\cdot3}{20}=54°$",
      ] },
      { t: "p", testo: "Lo sfasamento viene da una proporzione: un periodo intero $T$ vale 360°, quindi $T:360°=\\Delta t:\\varphi$." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Esempio: valore efficace", righe: [
        "sinusoide da 10 Vpp → $V_M=5$ V",
        "$V_{eff}=\\frac{5}{\\sqrt2}\\approx3{,}54$ V",
      ] },
    ] },

    { t: "sez", testo: "6 · La resistenza del LED" },
    { t: "due", sx: [
      { t: "p", testo: "Un LED acceso ha ai suoi capi circa <b>2 V</b>, quasi qualunque sia la corrente. Se lo colleghi direttamente a 15 V la corrente sale tantissimo e il LED brucia." },
      { t: "p", testo: "Per questo si mette una <b>resistenza in serie</b>: si prende la tensione che \"avanza\" ($V_{CC}-V_{LED}$) e la si fa cadere sulla resistenza, con la corrente giusta (10÷20 mA)." },
      { t: "box", tipo: "memo", righe: ["$$R=\\frac{V_{CC}-V_{LED}}{I_{LED}}$$"] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Esempio del quaderno (uscita del 741)", righe: [
        "$V_{CC}=15$ V, $V_{LED}\\approx2$ V, $R\\approx700$ Ω",
        "$I_{LED}=\\frac{15-2}{700}\\approx18{,}6$ mA: va bene",
      ] },
      facile(["La resistenza è un rubinetto: lascia passare solo la corrente che il LED sopporta."]),
    ] },

    { t: "sez", testo: "7 · Il µA741 ad anello aperto: comparatore" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Anello aperto</b> vuol dire senza resistenza tra uscita e ingresso. Il guadagno dell'op-amp da solo è enorme (centinaia di migliaia): basta una differenza minuscola tra i due ingressi e l'uscita va al massimo possibile, cioè <b>satura</b>." },
      { t: "box", tipo: "memo", titolo: "Uscita del comparatore", righe: [
        "$v^+>v^-\\to V_{out}=+V_{sat}$ (alto, H)",
        "$v^+<v^-\\to V_{out}=-V_{sat}$ (basso, L)",
        "$|V_{sat}|\\approx V_{CC}-(1\\div2)$ V",
      ] },
      { t: "p", testo: "L'uscita non arriva proprio a $\\pm15$ V: si ferma 1-2 V prima (es. 14 V). E le due saturazioni possono essere un po' diverse: il 23/9 si sono misurati circa $\\pm12$ V." },
      facile(["È una bilancia: ti dice solo quale piatto pesa di più (+ o −), non di quanto."]),
    ], dx: [
      { t: "p", testo: svg("comparatore", 40) },
      { t: "p", testo: "<b>L'esperienza</b>: in ingresso una triangolare da 10 Vpp a 1 kHz. Sul piedino − c'è $V_{ref}$, presa dal cursore di un <b>trimmer</b> (una resistenza variabile)." },
      { t: "p", testo: "Ogni volta che la triangolare supera $V_{ref}$ l'uscita va a $+V_{sat}$, quando scende sotto va a $-V_{sat}$: esce un'<b>onda quadra</b>." },
      { t: "p", testo: "Girando il trimmer $V_{ref}$ sale o scende: la triangolare resta sopra per meno o più tempo, quindi cambia il <b>duty cycle</b>. Con $V_{ref}=0$ è al 50%." },
      { t: "p", testo: "I due LED in uscita sono montati al contrario: con $+V_{sat}$ si accende uno, con $-V_{sat}$ l'altro." },
    ] },

    { t: "sez", testo: "8 · Due regole per tutti gli amplificatori" },
    { t: "p", testo: "Da qui in poi l'op-amp ha una resistenza $R_f$ (di retroazione, <i>feedback</i>) tra uscita e ingresso −. Così non satura più e lavora in zona lineare. Per i conti si usano due regole:" },
    { t: "box", tipo: "memo", titolo: "Op-amp ideale con retroazione", righe: [
      "1. $v^+=v^-$ (cortocircuito virtuale): i due ingressi hanno la stessa tensione",
      "2. negli ingressi non entra corrente",
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Misure su ogni amplificatore", righe: [
        "$$A_{v,reale}=\\frac{V_{out,pp}}{V_{in,pp}}$$",
        "$$V_{in,max}=\\frac{V_{sat}}{|A_v|}$$",
      ] },
    ], dx: [
      { t: "p", testo: "$A_{v,reale}$ si misura con l'oscilloscopio e si confronta con quello teorico: non sono mai identici, perché le resistenze hanno una <b>tolleranza</b> e l'op-amp non è ideale." },
      { t: "p", testo: "$V_{in,max}$ è l'ingresso più grande che posso dare: oltre, l'uscita dovrebbe superare $V_{sat}$ e invece viene <b>tagliata</b> (i picchi diventano piatti)." },
    ] },

    { t: "sez", testo: "9 · Amplificatore invertente" },
    { t: "due", sx: [
      { t: "p", testo: svg("invertente", 30) },
      { t: "box", tipo: "memo", righe: ["$$A_v=-\\frac{R_f}{R_i}$$"] },
      { t: "p", testo: "<b>Perché</b>: il + è a massa, quindi anche il − sta a 0 V (massa virtuale). La corrente che entra da $R_i$ è $i_i=\\frac{V_{in}}{R_i}$; non può entrare nell'op-amp, quindi passa tutta in $R_f$ e l'uscita deve scendere di $R_f\\,i_i$: $V_{out}=-\\frac{R_f}{R_i}V_{in}$." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Esperienza", righe: [
        "$\\pm V_{CC}=\\pm12$ V, $R_i=10$ kΩ, $R_f=100$ kΩ",
        "$A_v=-\\frac{100}{10}=-10$",
        "triangolare 1 Vpp, 1 kHz → uscita 10 Vpp, 1 kHz",
        "con $V_{sat}\\approx11$ V: $V_{in,max}=\\frac{11}{10}=1{,}1$ V di picco",
      ] },
      { t: "p", testo: "All'oscilloscopio l'uscita è <b>capovolta</b>: quando l'ingresso sale, l'uscita scende (sfasamento di 180°)." },
      facile(["È un'altalena: se spingi giù da una parte, l'altra sale. $R_f/R_i$ dice quanto è più lungo il braccio dall'altra parte."]),
    ] },

    { t: "sez", testo: "10 · Amplificatore non invertente" },
    { t: "due", sx: [
      { t: "p", testo: svg("non_invertente", 30) },
      { t: "box", tipo: "memo", righe: ["$$A_v=1+\\frac{R_f}{R_i}$$"] },
      { t: "p", testo: "<b>Perché</b>: $V_{in}$ entra nel +, quindi anche il − sta a $V_{in}$. $R_f$ e $R_i$ fanno un partitore tra uscita e massa: $V_{in}=V_{out}\\frac{R_i}{R_i+R_f}$, da cui $V_{out}=\\left(1+\\frac{R_f}{R_i}\\right)V_{in}$." },
      { t: "p", testo: "L'uscita è <b>in fase</b> con l'ingresso, e il guadagno è sempre almeno 1." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Progetto: $A_v=+10$ con la serie E12", righe: [
        "scelgo $R_i=1$ kΩ",
        "$R_f=(A_v-1)R_i=9$ kΩ, che non esiste",
        "E12 più vicini: 8,2 kΩ e 10 kΩ → prendo 8,2 kΩ",
        "ricalcolo: $A_v=1+\\frac{8{,}2}{1}=9{,}2$",
      ] },
      { t: "box", tipo: "passi", titolo: "Dati della slide (8/10)", righe: [
        "$R_i=4{,}7$ kΩ, $R_f=2{,}2$ kΩ, $V_{in}=1$ Vpp, 1 kHz",
        "$A_v=1+\\frac{2{,}2}{4{,}7}\\approx1{,}468$ → uscita ≈ 1,47 Vpp",
      ] },
      { t: "p", testo: "<b>Serie E12</b>: i valori che si trovano in commercio, 10 · 12 · 15 · 18 · 22 · 27 · 33 · 39 · 47 · 56 · 68 · 82, moltiplicati per 1, 10, 100, 1000…" },
    ] },

    { t: "sez", testo: "11 · Inseguitore di tensione" },
    { t: "due", sx: [
      { t: "p", testo: svg("inseguitore", 28) },
      { t: "p", testo: "È un non invertente con $R_f=0$ (un filo) e $R_i=\\infty$ (tolta): $A_v=1+0=1$, quindi $V_{out}=V_{in}$." },
      { t: "p", testo: "<b>A cosa serve</b> se non amplifica? L'ingresso + non assorbe corrente, quindi non \"carica\" il generatore (o il sensore). La corrente per il carico $R_L$ la dà l'op-amp dalla sua alimentazione." },
      facile(["È un portavoce: ripete esattamente quello che dici, ma con la voce più forte, così non ti stanchi tu."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Corrente nel carico", righe: [
        "$$I_L=\\frac{V_{out}}{R_L}$$",
        "µA741: $I_{out,max}\\approx\\pm25$ mA",
      ] },
      { t: "box", tipo: "passi", titolo: "Esperienza: triangolare 10 Vpp (5 V di picco)", righe: [
        "$R_L=10$ kΩ → $I_L=\\frac{5}{10\\,\\text{k}}=0{,}5$ mA",
        "$R_L=1$ kΩ → $I_L=5$ mA",
        "$R_L=100$ Ω → servirebbero 50 mA: <b>più di 25 mA</b>, l'uscita si abbassa",
        "$R_L$ minima: $\\frac{5\\text{ V}}{25\\text{ mA}}=200$ Ω",
      ] },
    ] },

    { t: "sez", testo: "12 · Sommatore invertente e combinatore lineare" },
    { t: "due", sx: [
      { t: "p", testo: svg("sommatore", 34) },
      { t: "box", tipo: "memo", righe: ["$$V_{out}=-R_f\\left(\\frac{V_1}{R_1}+\\frac{V_2}{R_2}+\\frac{V_3}{R_3}\\right)$$"] },
      { t: "p", testo: "<b>Perché</b>: il − è a massa virtuale, quindi ogni ingresso manda una corrente $\\frac{V_k}{R_k}$. Le correnti si sommano nel nodo e passano tutte in $R_f$." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Esperienza (Saber 3/10)", righe: [
        "$R_f=100$ kΩ, $R_1=R_2=33$ kΩ → $\\frac{R_f}{R_i}\\approx3$",
        "$V_{out}\\approx-3(V_1+V_2)$",
        "$V_1$ triangolare 2 Vpp, $V_2$ triangolare 1 Vpp, in fase, 1 kHz",
        "uscita ≈ $3\\cdot(2+1)=9$ Vpp, capovolta",
      ] },
      { t: "p", testo: "<b>Combinatore lineare</b>: con resistenze diverse ogni ingresso ha il suo \"peso\" $\\frac{R_f}{R_k}$." },
      { t: "box", tipo: "passi", titolo: "Voglio $V_{out}=-(V_1+3V_2+2V_3)$", righe: [
        "$\\frac{R_f}{R_1}=1$, $\\frac{R_f}{R_2}=3$, $\\frac{R_f}{R_3}=2$",
        "con $R_f=30$ kΩ: $R_1=30$ kΩ, $R_2=10$ kΩ, $R_3=15$ kΩ",
      ] },
    ] },

    { t: "sez", testo: "13 · Amplificatore differenziale" },
    { t: "due", sx: [
      { t: "p", testo: svg("differenziale", 36) },
      { t: "box", tipo: "memo", righe: ["$$V_{out}=\\frac{R_f}{R_i}(V_2-V_1)$$", "vale con le resistenze uguali a coppie"] },
      { t: "p", testo: "Amplifica solo la <b>differenza</b> tra i due ingressi. Quello che hanno in comune sparisce." },
      facile(["Guarda solo chi è più alto e di quanto: se due persone sono alte uguali, la risposta è zero."]),
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Slide 3/11: $R_i=470$ kΩ, $R_f=1$ MΩ → $\\frac{R_f}{R_i}\\approx2$", righe: [
        "1) $V_1$ e $V_2$ triangolari uguali (1 Vpp): $V_{out}=0$",
        "2) $V_2$ capovolta rispetto a $V_1$: $V_2-V_1$ vale il doppio, uscita ≈ $2\\cdot2=4$ Vpp (4,26 col 2,13 vero)",
      ] },
      { t: "box", tipo: "passi", titolo: "Multisim 12/11", righe: [
        "$R_1=R_3=1$ kΩ, $R_2=R_4=20$ kΩ → guadagno 20",
        "generatore tra i due ingressi: quadra 125 mV di picco su ogni morsetto, differenza 250 mV",
        "$V_{out}=20\\cdot0{,}25=5$ V (il multimetro segna 4,999 V)",
      ] },
    ] },

    { t: "sez", testo: "14 · Condizionare il sensore di temperatura LM35" },
    { t: "due", sx: [
      { t: "p", testo: "L'LM35 ha tre piedini: $V_{CC}$, $V_{out}$, GND. Dà una tensione proporzionale alla temperatura:" },
      { t: "box", tipo: "memo", righe: ["$$V=10\\,\\frac{\\text{mV}}{°\\text{C}}\\cdot T\\qquad 0\\text{ °C}\\to0\\text{ V}$$"] },
      { t: "p", testo: "<b>Il problema</b>: tra 0 e 50 °C esce da 0 a 0,5 V, troppo poco. Lo voglio da 0 a 5 V: serve un amplificatore <b>non invertente</b> (non capovolge e non carica il sensore)." },
      { t: "box", tipo: "memo", righe: ["$$A_v=\\frac{V_{o,max}}{V_{LM35,max}}\\qquad T_{max}=\\frac{V_{in,max}}{10\\text{ mV/°C}}$$"] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Progetto", righe: [
        "a 50 °C: $V=10\\text{ mV}\\cdot50=0{,}5$ V",
        "$A_v=\\frac{5}{0{,}5}=10=1+\\frac{R_f}{R_i}$ → $R_f=9R_i$",
        "$R_i=1{,}8$ kΩ → $R_f=16{,}2$ kΩ → E12: 15 kΩ",
        "ricalcolo: $A_v=1+\\frac{15}{1{,}8}\\approx9{,}33$ → a 50 °C escono 4,67 V",
      ] },
      { t: "box", tipo: "passi", titolo: "Fino a che temperatura funziona?", righe: [
        "$V_{sat}\\approx13{,}8$ V",
        "$V_{in,max}=\\frac{13{,}8}{9{,}33}\\approx1{,}48$ V",
        "$T_{max}=\\frac{1{,}48\\text{ V}}{0{,}01\\text{ V/°C}}\\approx148$ °C",
      ] },
    ] },

    { t: "sez", testo: "15 · Condizionamento con offset: il sensore di umidità" },
    { t: "p", testo: "<b>Il problema</b> (esercizio 10 della slide): il trasduttore dà da 1,5 V (0% di umidità) a 4 V (100%). Voglio un'uscita da $-5$ V a $+5$ V. Qui non basta amplificare: bisogna anche <b>spostare</b> il segnale, cioè togliere un offset." },
    { t: "due", sx: [
      { t: "box", tipo: "passi", titolo: "La catena", righe: [
        "trasduttore → <b>inseguitore</b> (separa: non carica il sensore)",
        "→ <b>differenziale</b> con una tensione fissa $V_r$ sull'altro ingresso",
      ] },
      { t: "box", tipo: "memo", righe: [
        "$$V_o=\\frac{R_3}{R_2}(V_s-V_r)$$",
        "$$\\frac{R_3}{R_2}=\\frac{V_{o,max}-V_{o,min}}{V_{s,max}-V_{s,min}}$$",
        "$$V_r=V_{s,min}-V_{o,min}\\frac{R_2}{R_3}$$",
      ] },
      facile(["Prima sposti il segnale in modo che il centro (2,75 V) diventi zero, poi lo stiri finché i bordi arrivano a ±5 V."]),
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Si scrivono i due estremi", righe: [
        "umidità 0%: $-5=\\frac{R_3}{R_2}(1{,}5-V_r)$",
        "umidità 100%: $+5=\\frac{R_3}{R_2}(4-V_r)$",
        "sottraggo: $10=\\frac{R_3}{R_2}\\cdot2{,}5$ → $\\frac{R_3}{R_2}=4$",
        "sostituisco: $5=4(4-V_r)$ → $V_r=2{,}75$ V",
        "slide: $R_2=12{,}5$ kΩ, $R_3=50$ kΩ",
        "controllo: $4(1{,}5-2{,}75)=-5$ V e $4(4-2{,}75)=+5$ V",
      ] },
      { t: "p", testo: "Con i valori E12 più vicini (12 kΩ e 47 kΩ) il guadagno diventa 3,92 e l'uscita va da circa $-4{,}9$ a $+4{,}9$ V." },
    ] },

    { t: "sez", testo: "16 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["55%", "45%"], righe: [
      ["Come colleghi l'alimentatore duale?", "§1: due sezioni in serie, centro a massa"],
      ["Cos'è l'offset? Come lo vedi all'oscilloscopio?", "§3 e §4: componente continua, accoppiamento DC/AC"],
      ["Come misuri $V_{pp}$, $T$ e lo sfasamento?", "§4 e §5: cursori e proporzione con 360°"],
      ["Che resistenza metti al LED?", "§6"],
      ["Perché ad anello aperto il 741 satura? Cosa fa il trimmer?", "§7: comparatore, duty cycle"],
      ["Differenza tra $A_v$ teorico e reale", "§8: tolleranze, op-amp non ideale"],
      ["Dimensiona un amplificatore con la serie E12", "§10: scelgo $R_i$, trovo $R_f$, ricalcolo"],
      ["A cosa serve l'inseguitore se ha guadagno 1?", "§11: non carica la sorgente, limite di 25 mA"],
      ["Come ottieni $-(V_1+3V_2+2V_3)$?", "§12: pesi $R_f/R_k$"],
      ["Cosa esce dal differenziale con due segnali uguali?", "§13: zero"],
      ["Come condizioni l'LM35 o un sensore con offset?", "§14 e §15"],
    ] },

    { t: "sez", testo: "17 · Correzioni agli appunti" },
    { t: "p", testo: "• <b>Inseguitore</b>: c'è scritto \"per $R_L=400$ Ω\", ma i dati e il conto usano <b>100 Ω</b>. E con 100 Ω servirebbero 50 mA, più dei 25 mA che il µA741 riesce a dare: l'uscita non arriva a 5 V.<br>• <b>Non invertente, misure</b>: con $R_i=1{,}2$ kΩ e $R_f=3{,}5$ kΩ il guadagno teorico è $1+\\frac{3{,}5}{1{,}2}\\approx3{,}92$, non 3,75.<br>• <b>LM35</b>: con $R_f=15$ kΩ (E12) il guadagno è 9,33, non 10: $V_{in,max}\\approx1{,}48$ V e $T_{max}\\approx148$ °C. I valori 1,38 V e 138 °C valgono solo con $R_f=16{,}2$ kΩ. E $T_{max}$ si trova <b>dividendo</b> per 10 mV/°C, non moltiplicando.<br>• <b>Comparatore</b>: \"$\\pm V_{sat}\\cong\\pm V_{CC}\\pm1$ V\" va letto come $|V_{sat}|\\approx V_{CC}-1$ V: la saturazione è sempre <b>più piccola</b> dell'alimentazione." },
  ],
};
