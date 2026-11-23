// Spiegazione completa di TPSEE: basi, motore in c.c., passo-passo con L297/L298, acquisizione (appunti Saber tranne Impianti Civili),
// e dal 2026-11-22 motore dinamico ed encoder dal libro (foto pp. 79-83 e 286-289 nella cartella di classe "5E collab"),
// con la notazione del libro per il motore (V_g alimentazione, e = k_e·ω f.c.e.m.).
// Dal 2026-11-20 scritta in modo semplicissimo, come quella dell'op-amp: basi all'inizio, riquadri gialli
// "Detto semplice" con un paragone, ragionamento passo per passo, formule inverse (nota Motore cc del 12/11, p. 6).
// Formule ed esempi numerici controllati da verifica.py.
const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;
const img2 = (nome, alto) => `<img src="../tpsee2/img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = {
  titolo: "TPSEE",
  blocchi: [
    { t: "titolo", testo: "TPSEE, spiegata semplice",
      sotto: "TPSEE · basi, motore in c.c., passo-passo, acquisizione, encoder · dagli appunti da settembre al 12/11 e dal libro (pp. 79-83, 286-289) · giallo = detto semplice, per capire · bordo spesso = da sapere a memoria" },
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
        "$C_{me}=k_{me}\\cdot I$ → $I=\\frac{C_{me}}{k_{me}}$",
        "$V_g-RI-k_e\\,\\omega=0$ → porto $k_e\\omega$ a destra:",
        "$V_g-RI=k_e\\,\\omega$ → divido per $k_e$:",
        "$\\omega=\\frac{V_g-RI}{k_e}$",
        "oppure porto $RI$ a destra e divido per $R$: $I=\\frac{V_g-k_e\\,\\omega}{R}$",
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
        ["$R$", "la resistenza del filo delle spire: scalda e fa perdere tensione", "un tubo un po' stretto"],
        ["$L$", "l'induttanza delle spire: si oppone ai <i>cambiamenti</i> di corrente", "una ruota pesante nel tubo: difficile da avviare e da fermare"],
        ["$e$", "la forza controelettromotrice (f.c.e.m.)", "una pompa che spinge al contrario"],
    ] },
    { t: "box", tipo: "occhio", titolo: "Attenzione: libro e quaderno usano simboli diversi", righe: [
      "Qui uso i simboli del <b>libro</b> (pp. 286-288). Sul quaderno del 10/11 lo stesso motore è scritto così:",
      "alimentazione: libro $V_g$ = quaderno $V_A$ &nbsp;·&nbsp; resistenza $R$ = $R_A$ &nbsp;·&nbsp; induttanza $L$ = $L_A$ &nbsp;·&nbsp; corrente $I$ = $I_A$",
      "f.c.e.m.: libro $e=k_e\\,\\omega$ = quaderno $V_g=K_E\\,\\omega$ &nbsp;·&nbsp; coppia resistente $C_{res}$ = $C_r$",
      "La trappola è $V_g$: nel libro è la tensione che <b>dai</b> al motore, sul quaderno è la tensione che il motore <b>restituisce</b>. In verifica scrivi accanto che cosa intendi.",
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Forza controelettromotrice", righe: [
        "$$e=k_e\\,\\omega$$",
        "il rotore che gira nel campo fa anche da <b>generatore</b>: produce una tensione che si oppone a $V_g$. Più gira veloce, più è grande",
      ] },
    ], dx: [
      facile(["Pedalare in bici con il <b>vento contro</b>: più vai veloce, più il vento ti frena. La f.c.e.m. è quel vento: cresce con la velocità e \"mangia\" una parte della tensione $V_g$."]),
    ] },

    { t: "sez", testo: "8 · Le equazioni del motore" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Legge di Kirchhoff alla maglia</b>: la tensione $V_g$ che do al motore si divide tra i tre elementi in serie." },
      { t: "box", tipo: "memo", righe: [
        "$$V_g-RI-L\\frac{dI}{dt}-k_e\\,\\omega=0$$",
      ] },
      { t: "p", testo: "$RI$ è la caduta sulla resistenza (Ohm), $L\\frac{dI}{dt}$ quella sull'induttanza, $k_e\\omega$ la f.c.e.m." },
      facile(["Come la torta del partitore: la tensione $V_g$ si divide in tre fette, e la somma delle fette è tutta la torta."]),
    ], dx: [
      { t: "p", testo: "<b>Coppia e corrente</b>: la coppia è proporzionale alla corrente d'armatura. Più corrente = campo più forte = spinta più forte." },
      { t: "box", tipo: "memo", righe: [
        "$$C_{me}=k_{me}\\,I\\qquad e=k_e\\,\\omega$$",
      ] },
      { t: "p", testo: "$k_e$ e $k_{me}$ sono <b>costanti del motore</b>, date dal costruttore. Dal bilancio di potenza $e\\,I=C_{me}\\,\\omega$ (la potenza elettrica che diventa meccanica) si vede che, nel Sistema Internazionale, hanno lo stesso valore." },
      facile(["Le due costanti sono il \"cambio\" del motore: $k_{me}$ dice quanta coppia ottengo da ogni ampere, $k_e$ quanta tensione contraria nasce per ogni rad/s."]),
    ] },

    { t: "sez", testo: "9 · Regime stazionario" },
    { t: "due", sx: [
      { t: "p", testo: "Il regime stazionario è la situazione <b>dopo l'avvio</b>: $V_g$ e $I$ sono costanti, quindi anche $\\omega$ è costante." },
      { t: "p", testo: "Se la corrente non cambia, la sua derivata è zero: $\\frac{dI}{dt}=0$, e il termine dell'induttanza sparisce. L'induttanza conta solo nei transitori (avvio, frenata, cambi di carico)." },
      facile(["Come un'auto in autostrada a velocità costante: la fatica di accelerare c'è solo alla partenza. A velocità costante la \"ruota pesante\" $L$ gira da sola e non chiede più niente."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "A regime", righe: [
        "$$V_g-RI-k_e\\,\\omega=0$$",
        "$$I=\\frac{V_g-k_e\\,\\omega}{R}$$",
      ] },
      { t: "p", testo: "Il sistema a regime:<br>$V_g-RI-e=0$<br>$C_{me}=k_{me}I$<br>$e=k_e\\,\\omega$" },
    ] },

    { t: "sez", testo: "10 · La caratteristica meccanica $C_{me}(\\omega)$" },
    { t: "due", sx: [
      { t: "p", testo: "Metto insieme le due equazioni: sostituisco $I$ del regime stazionario in $C_{me}=k_{me}I$." },
      { t: "box", tipo: "passi", titolo: "Passaggi", righe: [
        "$C_{me}=k_{me}\\,I=k_{me}\\,\\frac{V_g-k_e\\,\\omega}{R}$",
        "$=\\frac{k_{me}V_g}{R}-\\frac{k_{me}k_e}{R}\\,\\omega$",
      ] },
      { t: "box", tipo: "memo", righe: [
        "$$C_{me}=\\frac{k_{me}V_g}{R}-\\frac{k_{me}k_e}{R}\\,\\omega$$",
      ] },
      { t: "p", testo: "È una <b>retta</b> $y=q-mx$ con $y=C_{me}$ e $x=\\omega$: l'intercetta $q=\\frac{k_{me}V_g}{R}$ cresce con $V_g$, la pendenza $m=\\frac{k_{me}k_e}{R}$ <b>non dipende da $V_g$</b>. Quindi cambiando $V_g$ ottengo <b>rette parallele</b>." },
      facile(["Più il motore gira veloce, meno spinge: come un ciclista che in salita va piano ma spinge forte, e in pianura va veloce spingendo poco. Alzare $V_g$ è come dare al ciclista gambe più forti: la retta sale tutta, ma resta parallela."]),
    ], dx: [
      { t: "p", testo: img("caratteristica", 50) },
      { t: "p", testo: "La linea tratteggiata è la <b>coppia resistente</b> $C_{res}$ del carico (quello che il motore deve muovere). Il motore si assesta alla velocità in cui la sua coppia è uguale a quella del carico: è il <b>punto di lavoro</b> (i pallini)." },
    ] },

    { t: "sez", testo: "11 · I punti da saper trovare" },
    { t: "tab", intest: ["situazione", "condizione", "risultato", "significato"], larghezze: ["18%", "17%", "30%", "35%"], righe: [
      ["avvio (spunto)", "$\\omega=0$", "$C=\\frac{k_{me}V_g}{R}$, $I=\\frac{V_g}{R}$", "coppia e corrente massime: la f.c.e.m. è zero, frena solo $R$"],
      ["a vuoto", "$C_{me}=0$", "$\\omega_{Max}=\\frac{V_g}{k_e}$", "velocità massima, senza carico"],
      ["sotto carico", "$C_{me}=C_{res}$", "$I=\\frac{C_{res}}{k_{me}}$, $\\omega=\\frac{V_g-RI}{k_e}$", "punto di lavoro"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "occhio", titolo: "Attenzione all'avvio", righe: [
        "All'avvio il motore è fermo, quindi non c'è f.c.e.m.: la corrente è limitata solo da $R$, che è piccola. Per questo la corrente di spunto è molto più alta di quella a regime.",
        "Se la coppia resistente è più grande della coppia di spunto, il motore <b>non parte</b>.",
      ] },
    ], dx: [
      facile(["Partire in bici è la parte più faticosa: sei fermo e non hai ancora il \"vento contro\" che ti limita, quindi spingi al massimo. Se la salita è troppo ripida (carico troppo grande), non riesci nemmeno a partire."]),
    ] },

    { t: "sez", testo: "12 · Un esempio con i numeri, passo per passo" },
    { t: "p", testo: "Motore con $R=2\\,\\Omega$ e $k_e=k_{me}=0{,}1$. Carico con $C_{res}=0{,}3$ N·m." },
    { t: "due", sx: [
      { t: "box", titolo: "Con $V_g=24$ V", righe: [
        "1. a vuoto: $\\omega_{Max}=\\frac{V_g}{k_e}=\\frac{24}{0{,}1}=240$ rad/s",
        "2. spunto: $C=\\frac{0{,}1\\cdot24}{2}=1{,}2$ N·m, $I=\\frac{24}{2}=12$ A",
        "3. carico: $I=\\frac{C_{res}}{k_{me}}=\\frac{0{,}3}{0{,}1}=3$ A",
        "4. $\\omega=\\frac{V_g-RI}{k_e}=\\frac{24-2\\cdot3}{0{,}1}=180$ rad/s",
      ] },
    ], dx: [
      { t: "box", titolo: "Con $V_g=10$ V e $V_g=2$ V", righe: [
        "10 V: $I=3$ A (la coppia del carico è la stessa)",
        "$\\omega=\\frac{10-2\\cdot3}{0{,}1}=40$ rad/s",
        "2 V: spunto $C=\\frac{0{,}1\\cdot2}{2}=0{,}1$ N·m",
        "$0{,}1<0{,}3$ → il motore non parte",
      ] },
      { t: "p", testo: "Con lo stesso carico la corrente non cambia: cambia solo la velocità. <b>Per regolare la velocità si regola $V_g$</b>." },
    ] },

    { t: "salto" },
    { t: "sez", testo: "13 · Il motore che accelera: l'equazione meccanica (libro)" },
    { t: "p", testo: "Fin qui ho guardato solo il <b>circuito</b>. Il libro aggiunge l'equilibrio delle <b>coppie</b> sull'albero, che serve quando la velocità cambia (avvio, frenata, carico che cambia)." },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Equilibrio delle coppie", righe: [
        "$$k_{me}I-C_{res}-k_{att}\\,\\omega-J\\frac{d\\omega}{dt}=0$$",
      ] },
      { t: "tab", intest: ["termine", "che cos'è"], larghezze: ["28%", "72%"], righe: [
        ["$k_{me}I$", "coppia motrice, fatta dalla corrente nel rotore"],
        ["$C_{res}$", "coppia resistente del carico da far girare"],
        ["$k_{att}\\,\\omega$", "coppia d'attrito: cresce con la velocità"],
        ["$J\\frac{d\\omega}{dt}$", "coppia d'inerzia: $J$ è il momento d'inerzia. Frena in accelerazione, spinge in decelerazione, vale 0 a velocità costante"],
      ] },
    ], dx: [
      facile(["È la stessa equazione della bici. La tua spinta ($k_{me}I$) deve vincere la salita ($C_{res}$), l'attrito delle ruote ($k_{att}\\omega$) e, solo mentre acceleri, la fatica di mettere in moto la bici ($J\\frac{d\\omega}{dt}$). Quando vai a velocità costante la fatica di accelerare sparisce."]),
      { t: "p", testo: "Il libro passa dal moto in linea retta alla rotazione cambiando tre parole: la forza $F$ diventa la coppia $C$, la velocità $u$ diventa la velocità angolare $\\omega$, la massa $m$ diventa il momento d'inerzia $J$." },
      { t: "box", tipo: "memo", titolo: "Giri al minuto e rad/s", righe: [
        "$$\\omega=\\frac{2\\pi\\,n}{60}\\qquad n=\\frac{60\\,\\omega}{2\\pi}$$",
        "$n$ in giri/min, $\\omega$ in rad/s. Negli esercizi del libro $k_e$ e $k_{att}$ sono dati <b>per giri/min</b>",
      ] },
    ] },

    { t: "sez", testo: "14 · Laplace e schema a blocchi (libro)" },
    { t: "p", testo: "Le due equazioni hanno delle <b>derivate</b>: risolverle nel tempo è faticoso. Con la trasformata di Laplace ogni derivata $\\frac{d}{dt}$ diventa una moltiplicazione per $s$ e le equazioni diventano normali equazioni algebriche." },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Le due equazioni in $s$", righe: [
        "$$V_g(s)-R\\,I(s)-sL\\,I(s)-k_e\\,\\omega(s)=0$$",
        "$$k_{me}I(s)-C_{res}(s)-k_{att}\\,\\omega(s)-sJ\\,\\omega(s)=0$$",
      ] },
      { t: "box", tipo: "passi", titolo: "Ricavo $I(s)$ e $\\omega(s)$", righe: [
        "prima: raccolgo $I(s)$: $V_g-k_e\\omega=(R+sL)\\,I$ → $I(s)=\\frac{V_g-k_e\\,\\omega(s)}{R+sL}$",
        "seconda: raccolgo $\\omega(s)$: $k_{me}I-C_{res}=(k_{att}+sJ)\\,\\omega$ → $\\omega(s)=\\frac{k_{me}I-C_{res}}{k_{att}+sJ}$",
      ] },
    ], dx: [
      facile(["Lo schema a blocchi è una <b>catena di montaggio</b>: la tensione entra, il primo blocco la trasforma in corrente, il secondo in coppia, il terzo in velocità. La velocità poi torna indietro (la f.c.e.m. $k_e\\omega$) e toglie un po' di tensione all'ingresso: è una <b>retroazione</b> che il motore fa da solo."]),
    ] },
    { t: "p", testo: img2("blocchi", 30) },
    { t: "p", testo: "Ingresso $V_g(s)$, uscita $\\omega(s)$. Il cerchio è un <b>nodo sommatore</b>: i segni dicono cosa si somma e cosa si toglie. $C_{res}$ entra come disturbo che toglie coppia." },
    { t: "box", tipo: "memo", titolo: "Funzione di trasferimento (senza carico, $C_{res}=0$)", righe: [
      "$$\\frac{\\omega(s)}{V_g(s)}=\\frac{k_{me}}{(R+sL)(k_{att}+sJ)+k_e\\,k_{me}}$$",
      "il denominatore ha $s^2$: il motore in c.c. è un <b>sistema del secondo ordine</b> (vedi la spiegazione di Sistemi). Con $s=0$ e senza attrito torna $\\omega=\\frac{V_g}{k_e}$, la velocità a vuoto",
    ] },

    { t: "sez", testo: "15 · Motore e generatore (libro)" },
    { t: "due", sx: [
      { t: "p", testo: "La stessa macchina può funzionare nei due versi. Sul grafico $C_{me}$-$\\omega$ del libro:" },
      { t: "tab", intest: ["$C_{me}$ e $\\omega$", "funziona da"], righe: [
        ["stesso segno", "<b>motore</b>: energia elettrica → meccanica"],
        ["segno opposto", "<b>generatore</b> (freno, dinamo): energia meccanica → elettrica"],
      ] },
    ], dx: [
      facile(["La dinamo della bici: se pedali tu, fa luce (generatore). Se le dai corrente, gira da sola (motore). E quando fa da generatore frena un po' la ruota: per questo il libro scrive \"freno\"."]),
    ] },

    { t: "sez", testo: "16 · Ricavare le costanti del motore: gli esercizi del libro" },
    { t: "tab", intest: ["prova", "cosa succede", "cosa ricavo"], larghezze: ["24%", "38%", "38%"], righe: [
      ["rotore bloccato ($\\omega=0$)", "niente f.c.e.m. ($e=0$) e niente attrito", "$k_{me}=\\frac{C_{meMax}}{I}$"],
      ["rotore libero ($C_{res}=0$)", "la coppia motrice vince solo l'attrito: $C_{me}=C_{att}$", "$k_{att}=\\frac{C_{att}}{\\omega}$"],
      ["misuro $V_g$, $I$, $\\omega$", "maglia a regime: $e=V_g-RI$", "$k_e=\\frac{e}{\\omega}$"],
    ] },
    { t: "due", sx: [
      { t: "box", titolo: "Esercizio 1 (p. 289): $R=4\\,\\Omega$, 24 V", righe: [
        "bloccato: $C_{meMax}=2$ Nm, $I=4$ A; libero: 1200 giri/min, $I=0{,}2$ A",
        "1. $k_{me}=\\frac{2}{4}=0{,}5$ Nm/A",
        "2. libero: $C_{att}=k_{me}I=0{,}5\\cdot0{,}2=0{,}1$ Nm",
        "&nbsp;&nbsp;&nbsp;$k_{att}=\\frac{0{,}1}{1200}=8{,}3\\cdot10^{-5}$ Nm/(giri/min)",
        "3. $e=24-4\\cdot0{,}2=23{,}2$ V → $k_e=\\frac{23{,}2}{1200}=0{,}0193$ V/(giri/min)",
      ] },
    ], dx: [
      { t: "box", titolo: "Esercizio 2 (p. 289), svolto qui", righe: [
        "24 V, $R=5\\,\\Omega$; bloccato $C_{meMax}=10$ Nm; a 500 giri/min $C_{me}=0{,}5$ Nm; attrito trascurabile; $C_{res}=4$ Nm",
        "1. bloccato: $I=\\frac{24}{5}=4{,}8$ A → $k_{me}=\\frac{10}{4{,}8}=2{,}08$ Nm/A",
        "2. la caratteristica è una retta: scende di $\\frac{10-0{,}5}{500}=0{,}019$ Nm ogni giro/min",
        "3. punto di lavoro: $10-0{,}019\\,n=4$ → $n=\\frac{6}{0{,}019}\\approx316$ giri/min",
        "4. $I=\\frac{C_{res}}{k_{me}}=\\frac{4}{2{,}08}\\approx1{,}92$ A",
        "controllo: $k_e=\\frac{0{,}019\\cdot5}{2{,}08}=0{,}0456$; $\\frac{24-0{,}0456\\cdot316}{5}\\approx1{,}92$ A ✓",
      ] },
    ] },

    { t: "sez", testo: "17 · Motore passo-passo con L297 e L298" },
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

    { t: "sez", testo: "18 · Catena di acquisizione di un segnale" },
    facile(["Il microcontrollore capisce solo i <b>numeri</b>. Il sensore è l'<b>orecchio</b> che sente il mondo; il condizionamento è il <b>volume</b> e il filtro che rendono il suono chiaro e della giusta intensità; il convertitore A/D è chi <b>trascrive</b> il suono in numeri."]),
    { t: "tab", intest: ["blocco", "che cosa fa"], larghezze: ["25%", "75%"], righe: [
      ["sensore", "trasforma la grandezza fisica (temperatura, luce, posizione...) in un segnale elettrico analogico, di solito piccolo"],
      ["condizionamento", "prepara il segnale per il convertitore: lo <b>amplifica</b> (A), lo <b>filtra</b> dai disturbi (F) e aggiunge un <b>offset</b> per portarlo nel campo di tensioni accettato"],
      ["convertitore A/D", "trasforma il segnale analogico in un numero digitale"],
    ] },

    { t: "salto" },
    { t: "sez", testo: "19 · L'encoder: come funziona (libro, pp. 79-81)" },
    facile(["Pensa a una <b>ruota della bici con i raggi</b> davanti a una torcia: mentre gira, la luce passa e si blocca, passa e si blocca. Se conto i lampi so di quanto ha girato la ruota; se conto quanti lampi arrivano in un secondo so quanto va veloce."]),
    { t: "due", sx: [
      { t: "p", testo: "L'<b>encoder</b> è un trasduttore di <b>posizione angolare</b> con uscita <b>digitale</b> (alto/basso), che misura anche la velocità. Dentro c'è un <b>fotoaccoppiatore</b>: un LED e un fototransistor uno di fronte all'altro, e in mezzo un <b>disco forato</b> che gira con l'albero." },
      { t: "tab", intest: ["davanti al LED", "fototransistor", "$V_{CE}$"], righe: [
        ["foro (luce)", "saturo, interruttore chiuso", "quasi 0"],
        ["parte piena (buio)", "interdetto, interruttore aperto", "$V_{CC}$"],
      ] },
      { t: "p", testo: "Se il disco gira a velocità costante, fori e parti piene si alternano con regolarità e l'uscita è un'<b>onda quadra</b>." },
    ], dx: [
      { t: "p", testo: img2("encoder", 44) },
      { t: "tab", intest: ["tipo", "come è fatto", "cosa misura"], righe: [
        ["tachimetrico", "una corona di fori (o bollini opachi su disco trasparente)", "angolo e velocità, ma <b>non il verso</b>"],
        ["incrementale", "due corone di fori sfalsati, due fotoaccoppiatori: fase A e fase B", "anche il <b>verso</b>"],
        ["assoluto", "il libro lo nomina soltanto", ""],
      ] },
    ] },

    { t: "sez", testo: "20 · Le formule dell'encoder" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Angolo", righe: [
        "$$\\alpha_1=\\frac{360°}{n_D}\\qquad \\alpha=N\\cdot\\alpha_1$$",
        "$n_D$ = numero di fori, $N$ = impulsi contati",
        "è una misura <b>relativa</b>: parte dalla posizione in cui ho cominciato a contare",
      ] },
      { t: "box", titolo: "Esercizio 6: 30 fori, 10 impulsi", righe: [
        "$\\alpha_1=\\frac{360°}{30}=12°$ → $\\alpha=10\\cdot12°=120°$",
      ] },
      { t: "box", tipo: "memo", titolo: "Velocità", righe: [
        "$$n=\\frac{f}{n_D}\\cdot60\\ \\text{[giri/min]}\\qquad f=\\frac1T$$",
        "$$v=\\frac{\\pi D\\,n}{60}\\qquad s_i=\\frac{\\pi D}{n_D}$$",
        "$v$ = velocità di un punto sul bordo della ruota di diametro $D$; $s_i$ = strada fatta a ogni impulso",
      ] },
    ], dx: [
      facile(["$n_D$ impulsi = 1 giro. Se in un secondo arrivano $f$ impulsi, in un secondo faccio $\\frac{f}{n_D}$ giri; per averli al minuto moltiplico per 60."]),
      { t: "box", titolo: "Esercizio 7: 60 fori, 200 Hz", righe: [
        "$\\frac{200}{60}=3{,}33$ giri/s → $n=3{,}33\\cdot60=200$ giri/min",
      ] },
      { t: "box", titolo: "Esercizio 9: carro ponte, 40 impulsi/giro, $D=45$ cm", righe: [
        "$C=\\pi\\cdot0{,}45=1{,}413$ m a giro",
        "$v=\\frac{1{,}413}{40\\,T}=0{,}035\\,f$ m/s $=0{,}127\\,f$ km/h",
      ] },
      { t: "box", titolo: "Esercizio 10: 80 impulsi/giro, $D=35$ cm, 135 impulsi", righe: [
        "$s_i=\\frac{\\pi\\cdot35}{80}=1{,}374$ cm → $135\\cdot1{,}374=185{,}5$ cm",
      ] },
      { t: "box", titolo: "Esercizio 11 (da svolgere): 60 fori, $D=65$ cm, 700 Hz", righe: [
        "$n=\\frac{700}{60}\\cdot60=700$ giri/min",
        "$v=\\frac{\\pi\\cdot0{,}65\\cdot700}{60}=23{,}8$ m/s $\\approx86$ km/h",
      ] },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Massima velocità leggibile", righe: [
        "il fototransistor ha bisogno di $T_{ON}$ per saturarsi e di $T_{OFF}$ per interdirsi",
        "con fori e pieni uguali ogni tratto è lungo $x=\\frac{\\pi D}{2\\,n_D}$ e deve durare più del tempo maggiore",
        "$$v_{Max}=\\frac{x}{T_{OFF}}\\qquad n_{Max}=\\frac{60\\,v_{Max}}{\\pi D}$$",
      ] },
    ], dx: [
      { t: "box", titolo: "Esercizio 8: 30 fori, $D=5$ cm, $T_{ON}=200$ µs, $T_{OFF}=700$ µs", righe: [
        "1. $C=\\pi\\cdot5=15{,}7$ cm divisa in 60 tratti: $x=0{,}26$ cm $=2{,}6$ mm",
        "2. $v_{Max}=\\frac{2{,}6\\cdot10^{-3}}{700\\cdot10^{-6}}=3{,}71$ m/s",
        "3. $n_{Max}=\\frac{60\\cdot3{,}71}{\\pi\\cdot0{,}05}=1418$ giri/min",
        "(senza arrotondare $x$: 3,74 m/s e 1429 giri/min)",
      ] },
    ] },

    { t: "sez", testo: "21 · Il verso di rotazione: encoder incrementale e flip-flop D" },
    { t: "due", sx: [
      { t: "p", testo: "Le due corone sono sfalsate, quindi anche le onde quadre delle fasi A e B sono spostate di un quarto di periodo ($\\frac T4$). Chi arriva prima dice il verso:" },
      { t: "tab", intest: ["vedo", "verso"], righe: [
        ["fase A in <b>anticipo</b> su B", "orario"],
        ["fase A in <b>ritardo</b> su B", "antiorario"],
      ] },
      { t: "p", testo: img2("fasi", 34) },
    ], dx: [
      { t: "p", testo: img2("ffd", 28) },
      { t: "p", testo: "Fase A nell'ingresso <b>D</b>, fase B nel <b>clock</b>. Sul fronte di salita di B il flip-flop copia in $Q$ quello che c'è su D in quell'istante:" },
      { t: "p", testo: "• orario: quando sale B, A è già alta → $Q=1$ sempre<br>• antiorario: quando sale B, A è ancora bassa → $Q=0$ sempre" },
      facile(["Due amici che salgono le scale uno dietro l'altro: guardando chi mette il piede per primo sul gradino capisci se stanno salendo o scendendo."]),
    ] },

    { t: "sez", testo: "22 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["50%", "50%"], righe: [
      ["Calcola corrente, tensione o resistenza", "§1 e §3: Ohm e formule inverse"],
      ["Calcola le tensioni in un partitore", "§4"],
      ["Che resistenza metto in serie al LED?", "§5: $R=\\frac{V-V_{AK}}{I}$"],
      ["Come funziona un motore in c.c.?", "§6: magnete, rotore, interazione tra campi"],
      ["Disegna il circuito equivalente e scrivi l'equazione", "§7 e §8"],
      ["Cos'è la forza controelettromotrice?", "§7: il motore fa anche da generatore"],
      ["Perché a regime sparisce $L$?", "§9: corrente costante, derivata nulla"],
      ["Ricava la caratteristica meccanica", "§10: sostituisco $I$ in $C_{me}=k_{me}I$"],
      ["Cosa succede se aumento $V_g$? E il carico?", "§10 e §11: rette parallele, punto di lavoro"],
      ["Perché la corrente di spunto è alta?", "§11: a $\\omega=0$ non c'è f.c.e.m."],
      ["Scrivi l'equazione meccanica del motore", "§13: coppia motrice = resistente + attrito + inerzia"],
      ["Trasforma con Laplace e disegna lo schema a blocchi", "§14"],
      ["Quando la macchina fa da generatore?", "§15: $C_{me}$ e $\\omega$ di segno opposto"],
      ["Ricava $k_{me}$, $k_{att}$, $k_e$ dalle prove", "§16: rotore bloccato e rotore libero"],
      ["A cosa servono L297 e L298?", "§17: sequenza delle fasi e potenza"],
      ["Come inverto il verso con il L298?", "§17: scambio IN1 e IN2, con ENA = 1"],
      ["Quali blocchi servono per acquisire un segnale?", "§18: sensore, condizionamento, A/D"],
      ["Come funziona un encoder? Che tipi ci sono?", "§19: fotoaccoppiatore e disco forato"],
      ["Calcola angolo, giri/min, velocità o spazio", "§20"],
      ["Velocità massima che l'encoder riesce a leggere", "§20: $T_{OFF}$ e larghezza del foro"],
      ["Come si capisce il verso di rotazione?", "§21: fasi A e B, flip-flop D"],
    ] },

    { t: "sez", testo: "23 · Correzioni agli appunti e al libro" },
    { t: "p", testo: "• <b>10/11 Motore cc</b> (simboli del quaderno): la caratteristica giusta è $C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\omega$, cioè col libro $\\frac{k_{me}V_g}{R}-\\frac{k_{me}k_e}{R}\\omega$: negli appunti c'è $V_g$ (che sul quaderno è la f.c.e.m.) al posto di $V_A$, e $R$ al posto di $R_A$. Le caratteristiche vanno disegnate come <b>rette parallele</b>, non curve.<br>• <b>10/11 Motore cc, pagina 1</b>: $R_2$ è 7 kΩ, non 7 Ω. In serie la corrente è una sola: con 5 V, $I=\\frac{5}{10\\,\\text{k}\\Omega}=0{,}5$ mA (non 0,2 mA, e non $\\frac{5}{3\\text{k}}$ e $\\frac{5}{7\\text{k}}$); $\\Delta V_{R_1}=1{,}5$ V e $\\Delta V_{R_2}=3{,}5$ V.<br>• <b>3/11 lavagna</b>: nella scala dei prefissi \"mA\" compare due volte; sotto µA viene <b>nA</b> (nano, $10^{-9}$), poi pA.<br>• <b>28/9</b>: nella tabella del L298 le righe ENA = 1 con IN1 = IN2 sono vuote: il motore è fermo e frenato.<br>• <b>Libro p. 82, esercizio 8</b>: arrotonda $x$ a 2,6 mm e trova 3,71 m/s e 1418 giri/min; senza arrotondare vengono 3,74 m/s e 1429 giri/min. Differenza piccola, il metodo è giusto.<br>• <b>Libro p. 82</b>: l'integrato per leggere gli encoder è scritto \"74LS2000B\"; con questa sigla non l'ho trovato: probabilmente è l'HCTL-2000 (lettore di encoder in quadratura). Da chiedere al prof se serve.<br>• <b>Libro p. 81</b>: \"tachimentrico\" è un refuso di tachimetrico." },
  ],
};
