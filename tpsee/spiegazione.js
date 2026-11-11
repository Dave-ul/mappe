// Spiegazione completa di TPSEE: motore in c.c., basi, passo-passo con L297/L298, acquisizione (appunti Saber tranne Impianti Civili).
// Formule ed esempi numerici controllati da verifica.py.
const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;

module.exports = {
  titolo: "TPSEE",
  blocchi: [
    { t: "titolo", testo: "TPSEE spiegata per intero",
      sotto: "TPSEE · motore in c.c., basi, passo-passo, acquisizione · dagli appunti di settembre-novembre · bordo spesso = da sapere a memoria" },

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

    { t: "salto" },
    { t: "sez", testo: "8 · Basi: corrente, legge di Ohm, prefissi" },
    { t: "due", sx: [
      { t: "p", testo: "La <b>corrente</b> è la quantità di carica che passa in una sezione del filo in un certo tempo. Si misura in ampere: 1 A = 1 coulomb al secondo." },
      { t: "box", tipo: "memo", titolo: "Corrente", righe: [
        "$$I=\\frac{\\Delta Q}{\\Delta t}$$",
        "carica dell'elettrone: $|q_e|=1{,}602\\cdot10^{-19}$ C",
      ] },
      { t: "p", testo: "Le cariche che si muovono nei fili sono gli <b>elettroni</b>, che girano attorno al nucleo (positivo, dove sta quasi tutta la massa dell'atomo). 1 A vuol dire circa $6{,}24\\cdot10^{18}$ elettroni al secondo." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Legge di Ohm", righe: [
        "$$V=R\\,I$$",
        "$V$ in volt, $R$ in ohm (Ω), $I$ in ampere",
      ] },
      { t: "p", testo: "La tensione ai capi di un resistore è proporzionale alla corrente che lo attraversa. Convenzione: la freccia di $I$ <b>entra dal lato +</b> della tensione $\\Delta V_R$." },
      { t: "box", titolo: "Esempi della lavagna", righe: [
        "5 V su 1 kΩ: $I=\\frac{5}{10^{3}}=5\\cdot10^{-3}$ A $=5$ mA",
        "12 V su 2 MΩ: $I=\\frac{12}{2\\cdot10^{6}}=6\\cdot10^{-6}$ A $=6$ µA",
      ] },
    ] },
    { t: "tab", intest: ["prefisso", "simbolo", "vale", "esempio"], larghezze: ["20%", "15%", "20%", "45%"], righe: [
      ["tera", "T", "$10^{12}$", "1 TΩ = $10^{3}$ GΩ"],
      ["giga", "G", "$10^{9}$", ""],
      ["mega", "M", "$10^{6}$", "2 MΩ = $2\\cdot10^{6}$ Ω"],
      ["kilo", "k", "$10^{3}$", "1 kΩ = 1000 Ω"],
      ["milli", "m", "$10^{-3}$", "5 mA = $5\\cdot10^{-3}$ A"],
      ["micro", "µ", "$10^{-6}$", "6 µA = $6\\cdot10^{-6}$ A"],
      ["nano", "n", "$10^{-9}$", ""],
      ["pico", "p", "$10^{-12}$", ""],
    ] },
    { t: "p", testo: "Due regole per i conti: $\\frac{1}{10^{3}}=10^{-3}$ (dividere per una potenza cambia il segno dell'esponente) e $10^{a}\\cdot10^{b}=10^{a+b}$ (per esempio $10^{12}=10^{6}\\cdot10^{6}$)." },

    { t: "sez", testo: "9 · Resistori in serie e partitore di tensione" },
    { t: "due", sx: [
      { t: "p", testo: "In serie la corrente è <b>una sola</b> e passa in tutti e due i resistori. La resistenza totale è la somma." },
      { t: "box", tipo: "memo", righe: [
        "$$R_{eq}=R_1+R_2\\qquad I=\\frac{V}{R_1+R_2}$$",
        "$$V_{R_1}=V\\,\\frac{R_1}{R_1+R_2}\\qquad V_{R_2}=V\\,\\frac{R_2}{R_1+R_2}$$",
      ] },
      { t: "p", testo: "La tensione si divide in proporzione alle resistenze: il resistore più grande prende più tensione. La somma delle due tensioni è $V$." },
    ], dx: [
      { t: "box", titolo: "Esempio: $R_1=3$ kΩ, $R_2=7$ kΩ", righe: [
        "$R_{eq}=10$ kΩ",
      ] },
      { t: "tab", intest: ["$V$", "$I$", "$\\Delta V_{R_2}$", "$\\Delta V_{R_1}$"], righe: [
        ["5 V", "0,5 mA", "3,5 V", "1,5 V"],
        ["10 V", "1 mA", "7 V", "3 V"],
        ["24 V", "2,4 mA", "16,8 V", "7,2 V"],
      ] },
    ] },

    { t: "sez", testo: "10 · Diodo LED e resistenza di limitazione" },
    { t: "due", sx: [
      { t: "p", testo: "Il diodo conduce quando la corrente va dall'<b>anodo</b> (A) al <b>catodo</b> (K). Un LED acceso ha ai capi una tensione quasi fissa, $V_{AK}\\approx2$ V." },
      { t: "p", testo: "Se lo collego direttamente a 5 V la corrente non ha limiti e il LED si brucia: serve una <b>resistenza in serie</b> che prenda la tensione che avanza." },
      { t: "box", tipo: "memo", righe: [
        "$$R=\\frac{V-V_{AK}}{I_{LED}}$$",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempio della lavagna: 5 V", righe: [
        "sul LED 2 V, sulla resistenza $5-2=3$ V",
        "con 30 mA: $R=\\frac{3}{30\\cdot10^{-3}}=100$ Ω",
        "con 20 mA: $R=\\frac{3}{20\\cdot10^{-3}}=150$ Ω",
      ] },
      { t: "p", testo: "Sulla lavagna c'è 30 mA. Per un LED normale da 5 mm la corrente tipica è 10÷20 mA e 30 mA è vicino al massimo: se il prof non dice altro, conviene stare sui 20 mA." },
    ] },

    { t: "sez", testo: "11 · Motore passo-passo con L297 e L298" },
    { t: "p", testo: "Il motore passo-passo non gira in modo continuo: a ogni impulso ruota di un angolo fisso, il <b>passo</b>. Per farlo girare bisogna alimentare le sue fasi (gli avvolgimenti) una dopo l'altra, nell'ordine giusto. Il circuito di controllo usa due integrati:" },
    { t: "tab", intest: ["integrato", "che cosa fa"], larghezze: ["18%", "82%"], righe: [
      ["L297", "<b>controllore</b>: genera la sequenza delle fasi. Ingressi principali: CLOCK (a ogni impulso fa un passo, quindi la frequenza decide la velocità), CW/CCW (verso orario o antiorario), HALF/FULL (mezzo passo o passo intero)"],
      ["L298", "<b>driver di potenza</b>: due ponti H che danno al motore la corrente che il L297 da solo non può dare"],
    ] },
    { t: "p", testo: "La catena è: <b>L297 → L298 → motore</b>. Il L297 decide <i>cosa</i> fare, il L298 fornisce la potenza." },
    { t: "due", sx: [
      { t: "p", testo: "<b>Un ponte H del L298</b> (ponte A) si comanda con tre ingressi: ENA abilita il ponte, IN1 e IN2 decidono il verso della corrente nel carico, collegato tra OUT1 (pin 2) e OUT2 (pin 3)." },
      { t: "tab", intest: ["ENA", "IN1", "IN2", "motore"], righe: [
        ["0", "X", "X", "spento, gira libero"],
        ["1", "0", "0", "fermo, frenato"],
        ["1", "0", "1", "gira in un verso"],
        ["1", "1", "0", "gira nell'altro verso"],
        ["1", "1", "1", "fermo, frenato"],
      ] },
      { t: "p", testo: "X = non importa. Le due righe \"fermo, frenato\" negli appunti del 28/9 sono vuote: le ho completate dal datasheet del L298 (con IN1 = IN2 i due capi del motore sono allo stesso potenziale e il motore si ferma subito)." },
    ], dx: [
      { t: "p", testo: "<b>La prova del 28/9</b>: tra OUT1 e OUT2 ci sono due LED <b>in antiparallelo</b> (uno al contrario dell'altro). La corrente in un verso accende un LED, nell'altro verso accende l'altro: così si vede il verso senza il motore." },
      { t: "box", tipo: "occhio", titolo: "Da ricordare", righe: [
        "ENA = 0 spegne il ponte qualunque siano IN1 e IN2.",
        "Per invertire il verso basta scambiare IN1 e IN2.",
      ] },
    ] },

    { t: "sez", testo: "12 · Catena di acquisizione di un segnale" },
    { t: "p", testo: "Per leggere una grandezza fisica (temperatura, luce, posizione...) con un microcontrollore servono tre blocchi:" },
    { t: "tab", intest: ["blocco", "che cosa fa"], larghezze: ["25%", "75%"], righe: [
      ["sensore", "trasforma la grandezza fisica in un segnale elettrico analogico, di solito piccolo"],
      ["condizionamento", "prepara il segnale per il convertitore: lo <b>amplifica</b> (A), lo <b>filtra</b> dai disturbi (F) e aggiunge un <b>offset</b> per portarlo nel campo di tensioni accettato"],
      ["convertitore A/D", "trasforma il segnale analogico in un numero digitale"],
    ] },

    { t: "sez", testo: "13 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["50%", "50%"], righe: [
      ["Come funziona un motore in c.c.?", "§1: magnete, rotore, interazione tra campi"],
      ["Disegna il circuito equivalente e scrivi l'equazione", "§2 e §3"],
      ["Cos'è la forza controelettromotrice?", "§2: il motore fa anche da generatore"],
      ["Perché a regime sparisce $L_A$?", "§4: corrente costante, derivata nulla"],
      ["Ricava la caratteristica meccanica", "§5: sostituisco $I_A$ in $C=K_{me}I_A$"],
      ["Cosa succede se aumento $V_A$? E il carico?", "§5 e §6: rette parallele, punto di lavoro"],
      ["Perché la corrente di spunto è alta?", "§6: a $\\omega=0$ non c'è f.c.e.m."],
      ["Calcola la corrente o la tensione in un partitore", "§8 e §9"],
      ["Che resistenza metto in serie al LED?", "§10: $R=\\frac{V-V_{AK}}{I}$"],
      ["A cosa servono L297 e L298?", "§11: sequenza delle fasi e potenza"],
      ["Come inverto il verso con il L298?", "§11: scambio IN1 e IN2, con ENA = 1"],
      ["Quali blocchi servono per acquisire un segnale?", "§12: sensore, condizionamento, A/D"],
    ] },

    { t: "sez", testo: "14 · Correzioni agli appunti" },
    { t: "p", testo: "• <b>10/11 Motore cc</b>: la caratteristica giusta è $C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\omega$: negli appunti c'è $V_g$ al posto di $V_A$ e $R$ al posto di $R_A$. Le caratteristiche vanno disegnate come <b>rette parallele</b>, non curve.<br>• <b>10/11 Motore cc, pagina 1</b>: $R_2$ è 7 kΩ, non 7 Ω. In serie la corrente è una sola: $I=\\frac{5}{10\\,\\text{k}\\Omega}=0{,}5$ mA (non 0,2 mA, e non $\\frac{5}{3\\text{k}}$ e $\\frac{5}{7\\text{k}}$); $\\Delta V_{R_1}=1{,}5$ V e $\\Delta V_{R_2}=3{,}5$ V sono diverse.<br>• <b>3/11 lavagna</b>: nella scala dei prefissi \"mA\" compare due volte; sotto µA viene <b>nA</b> (nano, $10^{-9}$), poi pA.<br>• <b>28/9</b>: nella tabella del L298 le righe ENA = 1 con IN1 = IN2 sono vuote: il motore è fermo e frenato." },
  ],
};
