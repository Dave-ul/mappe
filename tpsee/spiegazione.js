// Spiegazione completa di TPSEE: basi, motore in c.c., passo-passo con L297/L298, acquisizione (appunti Saber tranne Impianti Civili).
// Dal 2026-11-20 scritta in modo semplicissimo, come quella dell'op-amp: basi all'inizio, riquadri gialli
// "Detto semplice" con un paragone, ragionamento passo per passo, formule inverse (nota Motore cc del 12/11, p. 6).
// Formule ed esempi numerici controllati da verifica.py.
const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = {
  titolo: "TPSEE",
  blocchi: [
    { t: "titolo", testo: "TPSEE, spiegata semplice",
      sotto: "TPSEE · basi, motore in c.c., passo-passo, acquisizione · dagli appunti da settembre al 12/11 · giallo = detto semplice, per capire · bordo spesso = da sapere a memoria" },
    { t: "p", testo: "Come leggerla: prima il riquadro <b>giallo</b>, che spiega l'idea con un paragone; poi le formule nel riquadro a <b>bordo spesso</b>, che vanno sapute; poi gli <b>esempi</b> con i numeri, passo per passo. Gli errori trovati negli appunti sono nell'ultima sezione." },

    { t: "sez", testo: "1 · Prima di cominciare: tensione, corrente, resistenza" },
    { t: "p", testo: "L'elettricità si capisce bene con l'<b>acqua</b>: i fili sono tubi, la corrente è l'acqua che scorre, la tensione è la spinta." },
    { t: "tab", intest: ["parola", "cosa vuol dire", "con l'acqua"], larghezze: ["22%", "42%", "36%"], righe: [
      ["<b>tensione</b> $V$ (volt, V)", "la \"spinta\" che fa muovere le cariche. Si misura sempre <b>tra due punti</b>", "la differenza di altezza tra due vasche"],
      ["<b>corrente</b> $I$ (ampere, A)", "quante cariche passano in un secondo", "quanta acqua passa nel tubo ogni secondo"],
      ["<b>resistenza</b> $R$ (ohm, Ω)", "quanto un componente ostacola la corrente", "un tubo stretto"],
      ["<b>massa</b> (0 V)", "il punto da cui si misurano le tensioni", "il pavimento: le altezze si misurano da lì"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Corrente", righe: [
        "$$I=\\frac{\\Delta Q}{\\Delta t}$$",
        "carica dell'elettrone: $|q_e|=1{,}602\\cdot10^{-19}$ C",
      ] },
      { t: "p", testo: "La <b>corrente</b> è la carica che passa in una sezione del filo in un certo tempo: 1 A = 1 coulomb al secondo. Le cariche che si muovono sono gli <b>elettroni</b>, che girano attorno al nucleo (positivo, dove sta quasi tutta la massa dell'atomo). 1 A vuol dire circa $6{,}24\\cdot10^{18}$ elettroni al secondo." },
      facile(["La corrente è come contare le persone che passano da una porta in un minuto: non conta quanto corrono, conta <b>quante</b> ne passano nel tempo."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Legge di Ohm", righe: [
        "$$V=R\\,I\\qquad I=\\frac VR\\qquad R=\\frac VI$$",
        "$V$ in volt, $R$ in ohm (Ω), $I$ in ampere",
      ] },
      facile(["Più spinta → più acqua. Tubo più stretto → meno acqua. Tutto qui."]),
      { t: "p", testo: "Convenzione: la freccia di $I$ <b>entra dal lato +</b> della tensione $\\Delta V_R$ ai capi del resistore." },
      { t: "box", titolo: "Esempi della lavagna (3/11)", righe: [
        "5 V su 1 kΩ: $I=\\frac{5}{10^{3}}=5\\cdot10^{-3}$ A $=5$ mA",
        "12 V su 2 MΩ: $I=\\frac{12}{2\\cdot10^{6}}=6\\cdot10^{-6}$ A $=6$ µA",
      ] },
    ] },

    { t: "sez", testo: "2 · Prefissi e potenze di 10" },
    { t: "due", sx: [
      { t: "tab", intest: ["prefisso", "simbolo", "vale", "esempio"], larghezze: ["22%", "15%", "20%", "43%"], righe: [
        ["tera", "T", "$10^{12}$", "1 TΩ = $10^{3}$ GΩ"],
        ["giga", "G", "$10^{9}$", ""],
        ["mega", "M", "$10^{6}$", "2 MΩ = $2\\cdot10^{6}$ Ω"],
        ["kilo", "k", "$10^{3}$", "1 kΩ = 1000 Ω"],
        ["milli", "m", "$10^{-3}$", "5 mA = $5\\cdot10^{-3}$ A"],
        ["micro", "µ", "$10^{-6}$", "6 µA = $6\\cdot10^{-6}$ A"],
        ["nano", "n", "$10^{-9}$", ""],
        ["pico", "p", "$10^{-12}$", ""],
      ] },
    ], dx: [
      facile(["I prefissi sono come i soldi: invece di dire \"mille euro\" dico \"1 k€\". Ogni gradino della scala vale <b>mille volte</b> quello sotto: 1 V = 1000 mV, 1 mA = 1000 µA."]),
      { t: "box", tipo: "memo", titolo: "Due regole per i conti", righe: [
        "$\\frac{1}{10^{3}}=10^{-3}$: dividere per una potenza cambia il segno dell'esponente",
        "$10^{a}\\cdot10^{b}=10^{a+b}$, per esempio $10^{12}=10^{6}\\cdot10^{6}$",
      ] },
      { t: "p", testo: "Trucco: prima di fare un conto trasformo tutto in unità base (V, A, Ω), faccio il conto, e solo alla fine rimetto il prefisso." },
    ] },

    { t: "sez", testo: "3 · Ricavare una grandezza da una formula (formule inverse)" },
    facile(["Una formula è una <b>bilancia in equilibrio</b>: quello che faccio a sinistra lo devo fare anche a destra. Se una grandezza è <b>moltiplicata</b>, per toglierla la divido da tutte e due le parti; se è <b>sommata</b>, la sottraggo."]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "La regola della nota del 12/11", righe: [
        "$$X\\cdot Y=Z\\quad\\Rightarrow\\quad Y=\\frac ZX$$",
        "$$A-B=0\\quad\\Rightarrow\\quad A=B$$",
      ] },
      { t: "box", titolo: "Con la legge di Ohm", righe: [
        "$V=R\\cdot I$: voglio $I$ → divido per $R$: $I=\\frac VR$",
        "voglio $R$ → divido per $I$: $R=\\frac VI$",
      ] },
    ], dx: [
      { t: "box", titolo: "Con le formule del motore (sezione 6)", righe: [
        "$C_{me}=K_{me}\\cdot I_A$ → $I_A=\\frac{C_{me}}{K_{me}}$",
        "$V_A-R_AI_A-K_E\\,\\omega=0$ → porto $K_E\\omega$ a destra:",
        "$V_A-R_AI_A=K_E\\,\\omega$ → divido per $K_E$:",
        "$\\omega=\\frac{V_A-R_AI_A}{K_E}$",
        "oppure porto $R_AI_A$ a destra e divido per $R_A$: $I_A=\\frac{V_A-K_E\\,\\omega}{R_A}$",
      ] },
    ] },

    { t: "sez", testo: "4 · Resistori in serie e partitore di tensione" },
    { t: "due", sx: [
      { t: "p", testo: "In serie la corrente è <b>una sola</b> e passa in tutti e due i resistori. La resistenza totale è la somma." },
      { t: "box", tipo: "memo", righe: [
        "$$R_{eq}=R_1+R_2\\qquad I=\\frac{V}{R_1+R_2}$$",
        "$$V_{R_1}=V\\,\\frac{R_1}{R_1+R_2}\\qquad V_{R_2}=V\\,\\frac{R_2}{R_1+R_2}$$",
      ] },
      facile(["Due resistori in serie si dividono la tensione come due fratelli si dividono una torta in base all'età: chi ha la resistenza più grande prende la fetta più grande. Le due fette insieme fanno sempre la torta intera, $V$."]),
    ], dx: [
      { t: "box", titolo: "Esempio (10/11): $R_1=3$ kΩ, $R_2=7$ kΩ, $V=10$ V", righe: [
        "1. $R_{eq}=3+7=10$ kΩ",
        "2. $I=\\frac{10}{10\\cdot10^3}=10^{-3}$ A $=1$ mA (una sola corrente!)",
        "3. $V_{R_1}=3\\cdot10^3\\cdot10^{-3}=3$ V, $V_{R_2}=7\\cdot10^3\\cdot10^{-3}=7$ V",
        "4. controllo: $3+7=10$ V ✓",
      ] },
      { t: "tab", intest: ["$V$", "$I$", "$\\Delta V_{R_2}$", "$\\Delta V_{R_1}$"], righe: [
        ["5 V", "0,5 mA", "3,5 V", "1,5 V"],
        ["10 V", "1 mA", "7 V", "3 V"],
        ["24 V", "2,4 mA", "16,8 V", "7,2 V"],
      ] },
    ] },

    { t: "sez", testo: "5 · Diodo LED e resistenza di limitazione" },
    { t: "due", sx: [
      { t: "p", testo: "Il diodo conduce quando la corrente va dall'<b>anodo</b> (A) al <b>catodo</b> (K). Un LED acceso ha ai capi una tensione quasi fissa, $V_{AK}\\approx2$ V." },
      facile(["Il diodo è una <b>porta girevole</b> che gira in un verso solo. Il LED, in più, quando lo attraversi si accende; ma se entri troppo di corsa (troppa corrente) lo rompi. La resistenza in serie è il buttafuori che fa entrare la gente piano."]),
      { t: "box", tipo: "memo", righe: [
        "$$R=\\frac{V-V_{AK}}{I_{LED}}$$",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempio della lavagna: 5 V, passo per passo", righe: [
        "1. sul LED 2 V, sulla resistenza $5-2=3$ V",
        "2. con 30 mA: $R=\\frac{3}{30\\cdot10^{-3}}=100$ Ω",
        "&nbsp;&nbsp;&nbsp;con 20 mA: $R=\\frac{3}{20\\cdot10^{-3}}=150$ Ω",
      ] },
      { t: "p", testo: "Sulla lavagna c'è 30 mA. Per un LED normale da 5 mm la corrente tipica è 10÷20 mA e 30 mA è vicino al massimo: se il prof non dice altro, conviene stare sui 20 mA." },
    ] },

    { t: "salto" },
    { t: "sez", testo: "6 · Il motore in corrente continua: cos'è e perché gira" },
    facile([
      "Il motore in c.c. è come un <b>ventilatore</b>: gli dai corrente e lui gira. Dentro ci sono due \"calamite\" che si spingono: una ferma e una che gira. Se lo fai girare tu a mano, funziona al contrario e <b>produce</b> tensione, come la dinamo della bicicletta.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: "Il motore in corrente continua trasforma <b>energia elettrica</b> in <b>energia meccanica</b>: gli dai una tensione e lui fa girare un albero." },
      { t: "p", testo: "Dentro ci sono un <b>magnete</b> fermo, che crea un campo magnetico, e il <b>rotore</b>, la parte che gira, avvolto da spire in cui passa corrente. La corrente nelle spire crea un secondo campo magnetico. I due campi si attirano e si respingono: questa <b>interazione tra campi magnetici</b> fa girare il rotore." },
      { t: "p", testo: "La velocità di rotazione si indica con $\\omega$ (omega), la <b>velocità angolare</b>, in rad/s." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Coppia", righe: [
        "$$C=F\\cdot d$$",
        "$F$ = forza [N], $d$ = braccio, distanza dall'asse [m]; $C$ in N·m",
      ] },
      facile(["La <b>coppia</b> è quanto il motore \"spinge\" in rotazione. È come svitare un bullone: con una chiave inglese lunga fai meno fatica, perché la stessa forza applicata più lontano dall'asse fa più coppia."]),
    ] },

    { t: "sez", testo: "7 · Il circuito equivalente dell'armatura" },
    { t: "p", testo: "Il rotore (detto anche <b>armatura</b>) si disegna come un circuito in serie con tre elementi:" },
    { t: "p", testo: img("circuito", 30) },
    { t: "tab", intest: ["elemento", "cosa rappresenta", "con l'acqua"], larghezze: ["12%", "50%", "38%"], righe: [
        ["$R_A$", "la resistenza del filo delle spire: scalda e fa perdere tensione", "un tubo un po' stretto"],
        ["$L_A$", "l'induttanza delle spire: si oppone ai <i>cambiamenti</i> di corrente", "una ruota pesante nel tubo: difficile da avviare e da fermare"],
        ["$V_g$", "la forza controelettromotrice (f.c.e.m.)", "una pompa che spinge al contrario"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Forza controelettromotrice", righe: [
        "$$V_g=K_E\\,\\omega$$",
        "il rotore che gira nel campo fa anche da <b>generatore</b>: produce una tensione che si oppone a $V_A$. Più gira veloce, più è grande",
      ] },
    ], dx: [
      facile(["Pedalare in bici con il <b>vento contro</b>: più vai veloce, più il vento ti frena. La f.c.e.m. è quel vento: cresce con la velocità e \"mangia\" una parte della tensione $V_A$."]),
    ] },

    { t: "sez", testo: "8 · Le equazioni del motore" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Legge di Kirchhoff alla maglia</b>: la tensione $V_A$ che do al motore si divide tra i tre elementi in serie." },
      { t: "box", tipo: "memo", righe: [
        "$$V_A-R_AI_A-L_A\\frac{dI_A}{dt}-K_E\\,\\omega=0$$",
      ] },
      { t: "p", testo: "$R_AI_A$ è la caduta sulla resistenza (Ohm), $L_A\\frac{dI_A}{dt}$ quella sull'induttanza, $K_E\\omega$ la f.c.e.m." },
      facile(["Come la torta del partitore: la tensione $V_A$ si divide in tre fette, e la somma delle fette è tutta la torta."]),
    ], dx: [
      { t: "p", testo: "<b>Coppia e corrente</b>: la coppia è proporzionale alla corrente d'armatura. Più corrente = campo più forte = spinta più forte." },
      { t: "box", tipo: "memo", righe: [
        "$$C_{me}=K_{me}\\,I_A\\qquad V_g=K_E\\,\\omega$$",
      ] },
      { t: "p", testo: "$K_E$ e $K_{me}$ sono <b>costanti del motore</b>, date dal costruttore. Dal bilancio di potenza $V_g\\,I_A=C_{me}\\,\\omega$ (la potenza elettrica che diventa meccanica) si vede che, nel Sistema Internazionale, hanno lo stesso valore." },
      facile(["Le due costanti sono il \"cambio\" del motore: $K_{me}$ dice quanta coppia ottengo da ogni ampere, $K_E$ quanta tensione contraria nasce per ogni rad/s."]),
    ] },

    { t: "sez", testo: "9 · Regime stazionario" },
    { t: "due", sx: [
      { t: "p", testo: "Il regime stazionario è la situazione <b>dopo l'avvio</b>: $V_A$ e $I_A$ sono costanti, quindi anche $\\omega$ è costante." },
      { t: "p", testo: "Se la corrente non cambia, la sua derivata è zero: $\\frac{dI_A}{dt}=0$, e il termine dell'induttanza sparisce. L'induttanza conta solo nei transitori (avvio, frenata, cambi di carico)." },
      facile(["Come un'auto in autostrada a velocità costante: la fatica di accelerare c'è solo alla partenza. A velocità costante la \"ruota pesante\" $L_A$ gira da sola e non chiede più niente."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "A regime", righe: [
        "$$V_A-R_AI_A-K_E\\,\\omega=0$$",
        "$$I_A=\\frac{V_A-K_E\\,\\omega}{R_A}$$",
      ] },
      { t: "p", testo: "Il sistema degli appunti, a regime:<br>$V_A-R_AI_A-V_g=0$<br>$C_{me}=K_{me}I_A$<br>$V_g=K_E\\,\\omega$" },
    ] },

    { t: "sez", testo: "10 · La caratteristica meccanica $C_{me}(\\omega)$" },
    { t: "due", sx: [
      { t: "p", testo: "Metto insieme le due equazioni: sostituisco $I_A$ del regime stazionario in $C_{me}=K_{me}I_A$." },
      { t: "box", tipo: "passi", titolo: "Passaggi", righe: [
        "$C_{me}=K_{me}\\,I_A=K_{me}\\,\\frac{V_A-K_E\\,\\omega}{R_A}$",
        "$=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\,\\omega$",
      ] },
      { t: "box", tipo: "memo", righe: [
        "$$C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\,\\omega$$",
      ] },
      { t: "p", testo: "È una <b>retta</b> $y=q-mx$ con $y=C_{me}$ e $x=\\omega$: l'intercetta $q=\\frac{K_{me}V_A}{R_A}$ cresce con $V_A$, la pendenza $m=\\frac{K_{me}K_E}{R_A}$ <b>non dipende da $V_A$</b>. Quindi cambiando $V_A$ ottengo <b>rette parallele</b>." },
      facile(["Più il motore gira veloce, meno spinge: come un ciclista che in salita va piano ma spinge forte, e in pianura va veloce spingendo poco. Alzare $V_A$ è come dare al ciclista gambe più forti: la retta sale tutta, ma resta parallela."]),
    ], dx: [
      { t: "p", testo: img("caratteristica", 50) },
      { t: "p", testo: "La linea tratteggiata è la <b>coppia resistente</b> $C_r$ del carico (quello che il motore deve muovere). Il motore si assesta alla velocità in cui la sua coppia è uguale a quella del carico: è il <b>punto di lavoro</b> (i pallini)." },
    ] },

    { t: "sez", testo: "11 · I punti da saper trovare" },
    { t: "tab", intest: ["situazione", "condizione", "risultato", "significato"], larghezze: ["18%", "17%", "30%", "35%"], righe: [
      ["avvio (spunto)", "$\\omega=0$", "$C=\\frac{K_{me}V_A}{R_A}$, $I_A=\\frac{V_A}{R_A}$", "coppia e corrente massime: la f.c.e.m. è zero, frena solo $R_A$"],
      ["a vuoto", "$C_{me}=0$", "$\\omega_0=\\frac{V_A}{K_E}$", "velocità massima, senza carico"],
      ["sotto carico", "$C_{me}=C_r$", "$I_A=\\frac{C_r}{K_{me}}$, $\\omega=\\frac{V_A-R_AI_A}{K_E}$", "punto di lavoro"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "occhio", titolo: "Attenzione all'avvio", righe: [
        "All'avvio il motore è fermo, quindi non c'è f.c.e.m.: la corrente è limitata solo da $R_A$, che è piccola. Per questo la corrente di spunto è molto più alta di quella a regime.",
        "Se la coppia resistente è più grande della coppia di spunto, il motore <b>non parte</b>.",
      ] },
    ], dx: [
      facile(["Partire in bici è la parte più faticosa: sei fermo e non hai ancora il \"vento contro\" che ti limita, quindi spingi al massimo. Se la salita è troppo ripida (carico troppo grande), non riesci nemmeno a partire."]),
    ] },

    { t: "sez", testo: "12 · Un esempio con i numeri, passo per passo" },
    { t: "p", testo: "Motore con $R_A=2\\,\\Omega$ e $K_E=K_{me}=0{,}1$. Carico con $C_r=0{,}3$ N·m." },
    { t: "due", sx: [
      { t: "box", titolo: "Con $V_A=24$ V", righe: [
        "1. a vuoto: $\\omega_0=\\frac{V_A}{K_E}=\\frac{24}{0{,}1}=240$ rad/s",
        "2. spunto: $C=\\frac{0{,}1\\cdot24}{2}=1{,}2$ N·m, $I_A=\\frac{24}{2}=12$ A",
        "3. carico: $I_A=\\frac{C_r}{K_{me}}=\\frac{0{,}3}{0{,}1}=3$ A",
        "4. $\\omega=\\frac{V_A-R_AI_A}{K_E}=\\frac{24-2\\cdot3}{0{,}1}=180$ rad/s",
      ] },
    ], dx: [
      { t: "box", titolo: "Con $V_A=10$ V e $V_A=2$ V", righe: [
        "10 V: $I_A=3$ A (la coppia del carico è la stessa)",
        "$\\omega=\\frac{10-2\\cdot3}{0{,}1}=40$ rad/s",
        "2 V: spunto $C=\\frac{0{,}1\\cdot2}{2}=0{,}1$ N·m",
        "$0{,}1<0{,}3$ → il motore non parte",
      ] },
      { t: "p", testo: "Con lo stesso carico la corrente non cambia: cambia solo la velocità. <b>Per regolare la velocità si regola $V_A$</b>." },
    ] },

    { t: "sez", testo: "13 · Motore passo-passo con L297 e L298" },
    facile([
      "Il motore passo-passo gira <b>a scatti</b>, come la lancetta dei secondi di un orologio: a ogni impulso fa un passo di un angolo fisso. Contando gli impulsi so esattamente di quanto ha girato.",
      "Il <b>L297</b> è il direttore d'orchestra: decide chi suona e quando (l'ordine delle fasi). Il <b>L298</b> sono i muscoli: dà al motore la corrente che il direttore da solo non avrebbe.",
    ]),
    { t: "tab", intest: ["integrato", "che cosa fa"], larghezze: ["18%", "82%"], righe: [
      ["L297", "<b>controllore</b>: genera la sequenza delle fasi. Ingressi principali: CLOCK (a ogni impulso fa un passo, quindi la frequenza decide la velocità), CW/CCW (verso orario o antiorario), HALF/FULL (mezzo passo o passo intero)"],
      ["L298", "<b>driver di potenza</b>: due ponti H che danno al motore la corrente che il L297 da solo non può dare"],
    ] },
    { t: "p", testo: "La catena è: <b>L297 → L298 → motore</b>. Il L297 decide <i>cosa</i> fare, il L298 fornisce la potenza." },
    { t: "due", sx: [
      { t: "p", testo: img("ponte_h", 42) },
      facile(["Il <b>ponte H</b> sono quattro interruttori intorno al motore, disegnati a forma di H. Chiudendo S1 e S4 la corrente passa nel motore da sinistra a destra; chiudendo S3 e S2 passa da destra a sinistra, e il motore gira al contrario. Gli ingressi IN1 e IN2 decidono quali interruttori chiudere."]),
    ], dx: [
      { t: "p", testo: "<b>Un ponte del L298</b> (ponte A) si comanda con tre ingressi: ENA abilita il ponte, IN1 e IN2 decidono il verso della corrente nel carico, collegato tra OUT1 (pin 2) e OUT2 (pin 3)." },
      { t: "tab", intest: ["ENA", "IN1", "IN2", "motore"], righe: [
        ["0", "X", "X", "spento, gira libero"],
        ["1", "0", "0", "fermo, frenato"],
        ["1", "0", "1", "gira in un verso"],
        ["1", "1", "0", "gira nell'altro verso"],
        ["1", "1", "1", "fermo, frenato"],
      ] },
      { t: "p", testo: "X = non importa. Con IN1 = IN2 i due capi del motore sono allo stesso potenziale e il motore si ferma subito (righe completate dal datasheet: negli appunti del 28/9 sono vuote)." },
    ] },
    { t: "due", sx: [
      { t: "p", testo: "<b>La prova del 28/9</b>: tra OUT1 e OUT2 ci sono due LED <b>in antiparallelo</b> (uno al contrario dell'altro). La corrente in un verso accende un LED, nell'altro verso accende l'altro: così si vede il verso senza il motore." },
    ], dx: [
      { t: "box", tipo: "occhio", titolo: "Da ricordare", righe: [
        "ENA = 0 spegne il ponte qualunque siano IN1 e IN2.",
        "Per invertire il verso basta scambiare IN1 e IN2.",
      ] },
    ] },

    { t: "sez", testo: "14 · Catena di acquisizione di un segnale" },
    facile(["Il microcontrollore capisce solo i <b>numeri</b>. Il sensore è l'<b>orecchio</b> che sente il mondo; il condizionamento è il <b>volume</b> e il filtro che rendono il suono chiaro e della giusta intensità; il convertitore A/D è chi <b>trascrive</b> il suono in numeri."]),
    { t: "tab", intest: ["blocco", "che cosa fa"], larghezze: ["25%", "75%"], righe: [
      ["sensore", "trasforma la grandezza fisica (temperatura, luce, posizione...) in un segnale elettrico analogico, di solito piccolo"],
      ["condizionamento", "prepara il segnale per il convertitore: lo <b>amplifica</b> (A), lo <b>filtra</b> dai disturbi (F) e aggiunge un <b>offset</b> per portarlo nel campo di tensioni accettato"],
      ["convertitore A/D", "trasforma il segnale analogico in un numero digitale"],
    ] },

    { t: "sez", testo: "15 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["50%", "50%"], righe: [
      ["Calcola corrente, tensione o resistenza", "§1 e §3: Ohm e formule inverse"],
      ["Calcola le tensioni in un partitore", "§4"],
      ["Che resistenza metto in serie al LED?", "§5: $R=\\frac{V-V_{AK}}{I}$"],
      ["Come funziona un motore in c.c.?", "§6: magnete, rotore, interazione tra campi"],
      ["Disegna il circuito equivalente e scrivi l'equazione", "§7 e §8"],
      ["Cos'è la forza controelettromotrice?", "§7: il motore fa anche da generatore"],
      ["Perché a regime sparisce $L_A$?", "§9: corrente costante, derivata nulla"],
      ["Ricava la caratteristica meccanica", "§10: sostituisco $I_A$ in $C=K_{me}I_A$"],
      ["Cosa succede se aumento $V_A$? E il carico?", "§10 e §11: rette parallele, punto di lavoro"],
      ["Perché la corrente di spunto è alta?", "§11: a $\\omega=0$ non c'è f.c.e.m."],
      ["A cosa servono L297 e L298?", "§13: sequenza delle fasi e potenza"],
      ["Come inverto il verso con il L298?", "§13: scambio IN1 e IN2, con ENA = 1"],
      ["Quali blocchi servono per acquisire un segnale?", "§14: sensore, condizionamento, A/D"],
    ] },

    { t: "sez", testo: "16 · Correzioni agli appunti" },
    { t: "p", testo: "• <b>10/11 Motore cc</b>: la caratteristica giusta è $C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\omega$: negli appunti c'è $V_g$ al posto di $V_A$ e $R$ al posto di $R_A$. Le caratteristiche vanno disegnate come <b>rette parallele</b>, non curve.<br>• <b>10/11 Motore cc, pagina 1</b>: $R_2$ è 7 kΩ, non 7 Ω. In serie la corrente è una sola: con 5 V, $I=\\frac{5}{10\\,\\text{k}\\Omega}=0{,}5$ mA (non 0,2 mA, e non $\\frac{5}{3\\text{k}}$ e $\\frac{5}{7\\text{k}}$); $\\Delta V_{R_1}=1{,}5$ V e $\\Delta V_{R_2}=3{,}5$ V.<br>• <b>3/11 lavagna</b>: nella scala dei prefissi \"mA\" compare due volte; sotto µA viene <b>nA</b> (nano, $10^{-9}$), poi pA.<br>• <b>28/9</b>: nella tabella del L298 le righe ENA = 1 con IN1 = IN2 sono vuote: il motore è fermo e frenato." },
  ],
};
