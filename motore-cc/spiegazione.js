// Spiegazione completa del motore in corrente continua (appunti Saber di TPSEE 4/11, 10/11, 11/11).
// Formule ed esempi numerici controllati da verifica.py.
const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;

module.exports = {
  titolo: "Motore in corrente continua",
  blocchi: [
    { t: "titolo", testo: "Motore in corrente continua, spiegato per intero",
      sotto: "TPSEE · dagli appunti del 4, 10 e 11 novembre · bordo spesso = da sapere a memoria" },

    { t: "sez", testo: "1 · Cos'è e perché gira" },
    { t: "due", sx: [
      { t: "p", testo: "Il motore in corrente continua trasforma <b>energia elettrica</b> in <b>energia meccanica</b>: gli dai una tensione e lui fa girare un albero." },
      { t: "p", testo: "Dentro ci sono due parti: un <b>magnete</b> fermo, che crea un campo magnetico, e il <b>rotore</b>, la parte che gira, avvolto da spire in cui passa corrente. La corrente nelle spire crea un secondo campo magnetico." },
      { t: "p", testo: "I due campi si attirano e si respingono: questa <b>interazione tra campi magnetici</b> spinge il rotore e lo fa girare." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Coppia", righe: [
        "$$C=F\\cdot d$$",
        "$F$ = forza [N], $d$ = braccio, cioè la distanza dall'asse [m]",
        "$C$ si misura in N·m",
      ] },
      { t: "p", testo: "La <b>coppia</b> dice quanto il motore \"spinge\" in rotazione: la stessa forza fa più effetto se è applicata più lontano dall'asse, come una chiave inglese lunga." },
      { t: "p", testo: "La velocità di rotazione si indica con $\\omega$ (omega), la <b>velocità angolare</b>, in rad/s." },
    ] },

    { t: "sez", testo: "2 · Il circuito equivalente dell'armatura" },
    { t: "p", testo: "Il rotore (detto anche <b>armatura</b>) si disegna come un circuito in serie con tre elementi:" },
    { t: "p", testo: img("circuito", 30) },
    { t: "tab", intest: ["elemento", "cosa rappresenta"], larghezze: ["15%", "85%"], righe: [
        ["$R_A$", "la resistenza del filo delle spire: scalda e fa perdere tensione"],
        ["$L_A$", "l'induttanza delle spire: si oppone ai <i>cambiamenti</i> di corrente"],
        ["$V_g$", "la forza controelettromotrice (f.c.e.m.)"],
    ] },
    { t: "box", tipo: "memo", titolo: "Forza controelettromotrice", righe: [
      "$$V_g=K_E\\,\\omega$$",
      "Quando il rotore gira dentro il campo magnetico, si comporta anche da <b>generatore</b>: produce una tensione che si oppone a $V_A$ (per questo si chiama \"contro\"). Più gira veloce, più è grande.",
    ] },

    { t: "sez", testo: "3 · Le equazioni" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Legge di Kirchhoff alla maglia</b>: la tensione $V_A$ che do al motore si divide tra i tre elementi in serie." },
      { t: "box", tipo: "memo", righe: [
        "$$V_A-R_AI_A-L_A\\frac{dI_A}{dt}-K_E\\,\\omega=0$$",
      ] },
      { t: "p", testo: "$R_AI_A$ è la caduta sulla resistenza (legge di Ohm), $L_A\\frac{dI_A}{dt}$ quella sull'induttanza, $K_E\\omega$ la f.c.e.m." },
    ], dx: [
      { t: "p", testo: "<b>Coppia e corrente</b>: la coppia è proporzionale alla corrente d'armatura. Più corrente = campo più forte = spinta più forte." },
      { t: "box", tipo: "memo", righe: [
        "$$C_{me}=K_{me}\\,I_A$$",
      ] },
      { t: "p", testo: "$K_E$ e $K_{me}$ sono <b>costanti del motore</b>, date dal costruttore. Dal bilancio di potenza $V_g\\,I_A=C_{me}\\,\\omega$ si vede che, nel Sistema Internazionale, hanno lo stesso valore." },
    ] },

    { t: "sez", testo: "4 · Regime stazionario" },
    { t: "due", sx: [
      { t: "p", testo: "Il regime stazionario è la situazione <b>dopo l'avvio</b>: $V_A$ e $I_A$ sono costanti, quindi anche $\\omega$ è costante." },
      { t: "p", testo: "Se la corrente non cambia, la sua derivata è zero: $\\frac{dI_A}{dt}=0$, e il termine dell'induttanza sparisce. L'induttanza conta solo nei transitori (avvio, frenata, cambi di carico)." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "A regime", righe: [
        "$$V_A-R_AI_A-K_E\\,\\omega=0$$",
        "$$I_A=\\frac{V_A-K_E\\,\\omega}{R_A}$$",
      ] },
    ] },

    { t: "sez", testo: "5 · La caratteristica meccanica $C_{me}(\\omega)$" },
    { t: "due", sx: [
      { t: "p", testo: "Metto insieme le due equazioni: sostituisco $I_A$ del regime stazionario in $C_{me}=K_{me}I_A$." },
      { t: "box", tipo: "passi", titolo: "Passaggi", righe: [
        "$C_{me}=K_{me}\\,I_A=K_{me}\\,\\frac{V_A-K_E\\,\\omega}{R_A}$",
        "$=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\,\\omega$",
      ] },
      { t: "box", tipo: "memo", righe: [
        "$$C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\,\\omega$$",
      ] },
      { t: "p", testo: "È una <b>retta</b> $y=q-mx$ con $y=C_{me}$ e $x=\\omega$:" },
      { t: "p", testo: "• l'intercetta $q=\\frac{K_{me}V_A}{R_A}$ cresce con $V_A$;<br>• la pendenza $m=\\frac{K_{me}K_E}{R_A}$ <b>non dipende da $V_A$</b>." },
      { t: "p", testo: "Quindi cambiando $V_A$ ottengo <b>rette parallele</b>: più alta è $V_A$, più in alto sta la retta." },
    ], dx: [
      { t: "p", testo: img("caratteristica", 50) },
      { t: "p", testo: "La linea tratteggiata è la <b>coppia resistente</b> $C_r$ del carico (quello che il motore deve muovere). Il motore si ferma alla velocità in cui la sua coppia è uguale a quella del carico: è il <b>punto di lavoro</b> (i pallini)." },
    ] },

    { t: "sez", testo: "6 · I punti da saper trovare" },
    { t: "tab", intest: ["situazione", "condizione", "risultato", "significato"], larghezze: ["18%", "17%", "30%", "35%"], righe: [
      ["avvio (spunto)", "$\\omega=0$", "$C=\\frac{K_{me}V_A}{R_A}$, $I_A=\\frac{V_A}{R_A}$", "coppia e corrente massime: la f.c.e.m. è zero, frena solo $R_A$"],
      ["a vuoto", "$C_{me}=0$", "$\\omega_0=\\frac{V_A}{K_E}$", "velocità massima, senza carico"],
      ["sotto carico", "$C_{me}=C_r$", "$I_A=\\frac{C_r}{K_{me}}$, $\\omega=\\frac{V_A-R_AI_A}{K_E}$", "punto di lavoro"],
    ] },
    { t: "box", tipo: "occhio", titolo: "Attenzione all'avvio", righe: [
      "All'avvio il motore è fermo, quindi non c'è f.c.e.m.: la corrente è limitata solo da $R_A$, che è piccola. Per questo la corrente di spunto è molto più alta di quella a regime.",
      "Se la coppia resistente è più grande della coppia di spunto, il motore <b>non parte</b>.",
    ] },

    { t: "sez", testo: "7 · Un esempio con i numeri" },
    { t: "p", testo: "Motore con $R_A=2\\,\\Omega$ e $K_E=K_{me}=0{,}1$. Carico con $C_r=0{,}3$ N·m." },
    { t: "due", sx: [
      { t: "box", titolo: "Con $V_A=24$ V", righe: [
        "a vuoto: $\\omega_0=\\frac{24}{0{,}1}=240$ rad/s",
        "spunto: $C=\\frac{0{,}1\\cdot24}{2}=1{,}2$ N·m, $I_A=\\frac{24}{2}=12$ A",
        "carico: $I_A=\\frac{0{,}3}{0{,}1}=3$ A",
        "$\\omega=\\frac{24-2\\cdot3}{0{,}1}=180$ rad/s",
      ] },
    ], dx: [
      { t: "box", titolo: "Con $V_A=10$ V e $V_A=2$ V", righe: [
        "10 V: $I_A=3$ A (la coppia è la stessa)",
        "$\\omega=\\frac{10-2\\cdot3}{0{,}1}=40$ rad/s",
        "2 V: spunto $C=\\frac{0{,}1\\cdot2}{2}=0{,}1$ N·m",
        "$0{,}1<0{,}3$ → il motore non parte",
      ] },
      { t: "p", testo: "Con lo stesso carico la corrente non cambia: cambia solo la velocità. <b>Per regolare la velocità si regola $V_A$</b>." },
    ] },

    { t: "sez", testo: "8 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["50%", "50%"], righe: [
      ["Come funziona un motore in c.c.?", "§1: magnete, rotore, interazione tra campi"],
      ["Disegna il circuito equivalente e scrivi l'equazione", "§2 e §3"],
      ["Cos'è la forza controelettromotrice?", "§2: il motore fa anche da generatore"],
      ["Perché a regime sparisce $L_A$?", "§4: corrente costante, derivata nulla"],
      ["Ricava la caratteristica meccanica", "§5: sostituisco $I_A$ in $C=K_{me}I_A$"],
      ["Cosa succede se aumento $V_A$? E il carico?", "§5 e §6: rette parallele, punto di lavoro"],
      ["Perché la corrente di spunto è alta?", "§6: a $\\omega=0$ non c'è f.c.e.m."],
    ] },

    { t: "sez", testo: "9 · Correzioni agli appunti del 10/11" },
    { t: "p", testo: "• La caratteristica giusta è $C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\omega$: negli appunti c'è $V_g$ al posto di $V_A$ e $R$ al posto di $R_A$.<br>• Le caratteristiche vanno disegnate come <b>rette parallele</b>, non curve.<br>• Nell'esercizio con $R_1=3$ kΩ e $R_2=7$ kΩ (non 7 Ω) in serie a 5 V: $I=\\frac{5}{10\\,\\text{k}\\Omega}=0{,}5$ mA, $\\Delta V_{R_2}=3{,}5$ V, $\\Delta V_{R_1}=1{,}5$ V. La corrente è una sola e le due tensioni sono diverse." },
  ],
};
