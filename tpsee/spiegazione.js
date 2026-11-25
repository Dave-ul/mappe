// Spiegazione completa di TPSEE: basi, motore in c.c., passo-passo con L297/L298, acquisizione (appunti Saber tranne Impianti Civili),
// dal 2026-11-22 motore dinamico ed encoder dal libro (foto pp. 79-83 e 286-289 nella cartella di classe "5E collab"),
// dal 2026-11-24 SCR (nota Saber del 24/11 e lavagna del 24/11 dalla chiavetta, pp. 3 e 5-8; le altre pagine sono di altre classi),
// dal 2026-11-25 L298 con PWM, passo-passo, acquisizione, A/D, TMP36, encoder (tipi, assoluto, Gray, Arduino)
// dalle dispense del corso Classroom "5Be 2026-27 Sistemi Automatici", in
// ~/Documenti/Scuola/Fonti/Sistemi Automatici/Dispense prof 2026-27/ (Driver L298, Acquisizione dati, TMP36, Encoder),
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
      sotto: "TPSEE · basi, motore in c.c., L298 e passo-passo, acquisizione e TMP36, encoder, SCR · dagli appunti da settembre al 24/11, dal libro (pp. 79-83, 286-289) e dalle dispense del prof su Classroom · giallo = detto semplice, per capire · bordo spesso = da sapere a memoria" },
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
    { t: "p", testo: img("blocchi", 30) },
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

    { t: "sez", testo: "17 · Il ponte H L298: verso e velocità del motore in c.c. (appunti 28/9 e dispense)" },
    facile(["Arduino è il <b>cervello</b>: sa cosa fare ma ha pochissima forza, da un suo piedino escono al massimo poche decine di milliampere. Il <b>L298</b> sono i <b>muscoli</b>: prende la corrente da un alimentatore a parte e la manda al motore come gli dice Arduino."]),
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
    { t: "p", testo: "<b>La schedina L298N</b> (dispensa del 18/9) ha <b>due ponti H</b>: comanda due motori in c.c. (ponte A con ENA, IN1, IN2; ponte B con ENB, IN3, IN4) oppure un passo-passo bipolare. Vuole <b>due alimentazioni</b>: 5 V per la logica e da 5 a 35 V per il motore, fino a <b>2 A per canale</b>. Le masse di Arduino e dell'alimentatore del motore vanno collegate insieme. Dentro i quattro interruttori del ponte sono <b>BJT</b> che lavorano solo ON/OFF." },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "La velocità: PWM su ENA", righe: [
        "ENA non riceve un livello fisso ma un'<b>onda quadra</b> (PWM): il ponte si accende e si spegne migliaia di volte al secondo",
        "$$D=\\frac{T_{ON}}{T}\\qquad V_{media}=D\\cdot V_{al}$$",
        "con Arduino: <code>analogWrite(pin, x)</code>, $x$ da 0 a 255, quindi $D=\\frac{x}{255}$",
        "il motore sente la tensione <b>media</b>: è il $V_g$ del motore, quindi a vuoto $\\omega\\approx\\frac{D\\,V_{al}}{k_e}$",
      ] },
    ], dx: [
      facile(["Il PWM è come accendere e spegnere la luce velocissimo: se resta accesa metà del tempo, l'occhio vede metà luce. Il motore, che è \"pesante\" (ha inerzia e induttanza), non fa in tempo a seguire gli scatti e sente solo la media."]),
      { t: "box", titolo: "Esempio della dispensa: potenziometro → velocità", righe: [
        "1. <code>analogRead</code> legge il potenziometro: un numero da 0 a 1023 (A/D a 10 bit, §20)",
        "2. <code>map(v, 0, 1023, 0, 255)</code> lo riporta da 0 a 255",
        "3. potenziometro a metà: $v=512$ → $x=127$ → $D=\\frac{127}{255}\\approx0{,}5$",
        "4. con 12 V: $V_{media}\\approx0{,}5\\cdot12=6$ V; un interruttore su un ingresso digitale decide IN1/IN2, cioè il verso",
      ] },
    ] },
    { t: "p", testo: "Come nel §12: <b>per regolare la velocità si regola $V_g$</b>, e il PWM è il modo di farlo senza sprecare energia (i transistor sono o tutti accesi o tutti spenti, come l'SCR del §27). Dal datasheet: il L298 \"si mangia\" circa 2 V (circa 1,8 V a 1 A) tra i due transistor accesi, quindi al motore arriva un po' meno dell'alimentazione." },

    { t: "sez", testo: "18 · Motore passo-passo con L297 e L298" },
    facile([
      "Il motore passo-passo gira <b>a scatti</b>, come la lancetta dei secondi di un orologio: a ogni impulso fa un passo di un angolo fisso. Contando gli impulsi so esattamente di quanto ha girato.",
      "Il <b>L297</b> è il direttore d'orchestra: decide chi suona e quando (l'ordine delle fasi). Il <b>L298</b> sono i muscoli: dà al motore la corrente che il direttore da solo non avrebbe.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: "<b>Come gira</b> (dispensa del 18/9): il motore bipolare ha due avvolgimenti, A (capi A1, A2) e B (capi B1, B2), quindi <b>4 fili</b> e servono <b>due ponti H</b>, cioè proprio un L298. Il rotore è un magnete e si gira verso la bobina alimentata: alimentando le bobine una dopo l'altra lo \"tiro\" in giro." },
      { t: "tab", intest: ["fase", "bobina alimentata", "rotore verso"], righe: [
        ["1", "A1", "nord"], ["2", "B1", "est"], ["3", "A2", "sud"], ["4", "B2", "ovest"],
      ] },
      { t: "p", testo: "Sequenza A1 → B1 → A2 → B2: <b>orario</b>. Al contrario (B2 → A2 → B1 → A1): <b>antiorario</b>. Le bobine vanno alimentate in ordine, se no il rotore non sa da che parte andare." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Passo e velocità", righe: [
        "$$\\alpha_{passo}=\\frac{360°}{N_{passi}}\\qquad n=\\frac{60\\,f}{N_{passi}}$$",
        "$N_{passi}$ = passi per giro (tipico 200, cioè 1,8°); $f$ = passi al secondo [giri/min]",
        "per cambiare velocità cambio la frequenza dei passi (il CLOCK del L297, o il <code>delay</code> tra le fasi)",
      ] },
      { t: "box", titolo: "Esempio della dispensa: motore da stampante, 48 passi/giro", righe: [
        "1. $\\alpha=\\frac{360°}{48}=7{,}5°$ a passo",
        "2. <code>delay(10)</code> tra una fase e l'altra: $f=\\frac{1}{10\\text{ ms}}=100$ passi/s",
        "3. $n=\\frac{60\\cdot100}{48}=125$ giri/min",
      ] },
    ] },
    { t: "tab", intest: ["pregi", "difetti"], righe: [
      ["sa <b>dove si trova</b> senza encoder: conto i passi (niente retroazione)", "serve un circuito di pilotaggio"],
      ["coppia alta anche a pochi giri, partenze e frenate rapide", "rendimento basso, velocità limitata, costa di più"],
      ["da fermo <b>tiene il carico</b> in posizione", "se il carico è troppo grande <b>perde passi</b> e il conteggio sbaglia"],
    ] },
    { t: "tab", intest: ["integrato", "che cosa fa"], larghezze: ["18%", "82%"], righe: [
      ["L297", "<b>controllore</b>: genera la sequenza delle fasi. Ingressi principali: CLOCK (a ogni impulso fa un passo, quindi la frequenza decide la velocità), CW/CCW (verso orario o antiorario), HALF/FULL (mezzo passo o passo intero). Controlla anche la <b>corrente</b> nelle bobine (chopper)"],
      ["L298", "<b>driver di potenza</b>: due ponti H, uno per bobina, che danno al motore la corrente che il L297 da solo non può dare"],
    ] },
    { t: "p", testo: "La catena è: <b>L297 → L298 → motore</b>. Il L297 decide <i>cosa</i> fare, il L298 fornisce la potenza. Senza L297 la sequenza la fa Arduino (dispensa: quattro uscite messe a 1 una alla volta, con un <code>delay</code> in mezzo, o la libreria <code>Stepper</code>)." },
    { t: "box", tipo: "occhio", titolo: "Tre cose pratiche dalla dispensa", righe: [
      "<b>Trovare le fasi</b>: col multimetro su ohm, i due fili con resistenza bassa tra loro sono la stessa bobina; gli altri due sono l'altra.",
      "<b>Diodi</b> sulle uscite: quando una bobina si spegne la sua induttanza dà un picco di tensione (la \"ruota pesante\" del §7 che non vuole fermarsi); i diodi lo scaricano e proteggono il L298.",
      "<b>Driver di tensione o di corrente</b>: le bobine dei passo-passo hanno resistenza bassa e andrebbero comandate in corrente. Il L298 da solo è un driver di tensione: va bene sopra circa 30÷60 Ω, ma il motore va più piano. Il L297 aggiunge il controllo di corrente.",
    ] },

    { t: "sez", testo: "19 · Il sistema di acquisizione dati (appunti 3/10 e dispense)" },
    facile(["Il microcontrollore capisce solo i <b>numeri</b>. Il sensore è l'<b>orecchio</b> che sente il mondo; il condizionamento è il <b>volume</b> e il filtro che rendono il suono chiaro e della giusta intensità; il convertitore A/D è chi <b>trascrive</b> il suono in numeri. Dall'altra parte, gli attuatori sono le <b>mani</b> che agiscono sul mondo."]),
    { t: "p", testo: img("acquisizione", 34) },
    { t: "tab", intest: ["blocco", "che cosa fa"], larghezze: ["25%", "75%"], righe: [
      ["sensore (trasduttore)", "trasforma la grandezza fisica (temperatura, luce, posizione...) in una grandezza elettrica, di solito piccola. Molti sensori cambiano la loro <b>resistenza</b> (fotoresistenza, termistore, sensore di forza): il condizionamento la trasforma in tensione"],
      ["condizionamento", "prepara il segnale per il convertitore: lo <b>amplifica</b> (A), lo <b>filtra</b> dai disturbi (F) e aggiunge un <b>offset</b> per portarlo nel campo accettato. Per Arduino il campo è <b>0÷5 V</b>"],
      ["convertitore A/D", "trasforma il segnale analogico in un numero digitale (§20). Arduino Uno ne ha uno a 10 bit con 6 ingressi, A0÷A5: fino a 6 grandezze senza altro; oltre serve un <b>multiplexer</b> esterno (un selettore che manda un segnale alla volta)"],
      ["attuatore", "agisce sul mondo comandato dalle uscite di Arduino: mostra informazioni (LED, display), muove (motori, servo), scalda (resistenza), suona (buzzer), fa luce"],
      ["azionamento di potenza", "un attuatore chiede più corrente di quella che Arduino può dare: in mezzo ci va un amplificatore di potenza, per esempio il <b>L298</b> del §17"],
    ] },
    { t: "p", testo: "<b>Sensore o trasduttore?</b> A rigore il <b>sensore</b> è l'elemento sensibile che \"sente\" la grandezza, il <b>trasduttore</b> è tutto il dispositivo che trasforma una forma di energia in un'altra (sensore più i circuiti di interfaccia). Nella pratica si usano come sinonimi. Il termometro a mercurio è un trasduttore ma <b>non elettrico</b> (temperatura → lunghezza): a noi interessano quelli con uscita elettrica." },

    { t: "sez", testo: "20 · Il convertitore A/D di Arduino" },
    facile(["Il convertitore A/D è un <b>righello con le tacche</b>: non può dire \"1,7532 V\", dice solo su quale tacca cade la tensione. Con 10 bit le tacche sono $2^{10}=1024$ e ognuna è larga 4,88 mV: è il <b>quanto</b> $q$, la differenza più piccola che si vede."]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Quanto e numero", righe: [
        "$$q=\\frac{V_{FS}}{2^{n}}\\qquad N=\\frac{V_i}{q}\\ \\ \\text{(parte intera)}\\qquad V_i\\approx N\\cdot q$$",
        "$V_{FS}$ = fondo scala (5 V), $n$ = bit (10): $q=\\frac{5}{1024}=4{,}88$ mV = 1 LSB",
        "$N$ va da 0 (0 V) a 1023 (quasi 5 V)",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempio della dispensa: $V_i=1{,}75$ V", righe: [
        "1. $N=\\frac{1{,}75}{4{,}88\\cdot10^{-3}}=358{,}4$ → <b>358</b>",
        "2. in binario (10 bit): $0101100110$ &nbsp;(256 + 64 + 32 + 4 + 2 = 358)",
        "3. in esadecimale raggruppo 4 bit <b>da destra</b>: $01\\,|\\,0110\\,|\\,0110$ → <b>166H</b> ($1\\cdot256+6\\cdot16+6=358$)",
        "4. al contrario: $358\\cdot4{,}88$ mV $=1{,}747$ V: si perde meno di un quanto",
      ] },
    ] },

    { t: "sez", testo: "21 · Un sensore vero: il TMP36 (dispensa del 27/10)" },
    { t: "due", sx: [
      { t: "p", testo: "Il <b>TMP36</b> è un sensore di temperatura <b>integrato</b>: tre piedini (alimentazione da 2,7 a 5,5 V, massa, uscita) e dentro ha già il condizionamento. Sfrutta la giunzione P-N, la cui tensione dipende molto dalla temperatura. L'uscita è una tensione <b>lineare</b>: si collega direttamente a un ingresso analogico." },
      { t: "box", tipo: "memo", titolo: "La retta del TMP36", righe: [
        "$$V_{out}=0{,}5+0{,}01\\,T\\qquad T=100\\,V_{out}-50$$",
        "$V$ in volt, $T$ in °C: <b>10 mV ogni °C</b>, 0,5 V a 0 °C",
        "da −40 °C (0,1 V) a +125 °C (1,75 V); sotto 0,5 V la temperatura è sotto zero",
        "precisione circa ±1 °C a 25 °C, ±2 °C su tutto il campo; consuma meno di 50 µA, quindi non si scalda da solo",
      ] },
      facile(["Il TMP36 è un termometro che invece di una colonnina di mercurio ha una tensione: ogni grado in più la tensione sale di 10 mV, come ogni grado la colonnina sale di una tacca. Lo \"zero\" della scala è spostato a 0,5 V per poter leggere anche le temperature sotto zero (è un <b>offset</b>)."]),
    ], dx: [
      { t: "box", titolo: "Esempi della dispensa", righe: [
        "$V_{out}=1$ V → $T=100\\cdot1-50=50$ °C",
        "$V_{out}=550$ mV → $T=55-50=5$ °C",
        "$V_{out}=0{,}75$ V → $T=25$ °C (il punto del datasheet)",
      ] },
      { t: "box", titolo: "Tutta la catena con Arduino, passo per passo", righe: [
        "1. <code>analogRead</code> dà $N=154$",
        "2. $V=N\\cdot q=154\\cdot\\frac{5}{1024}=0{,}752$ V",
        "3. $T=100\\cdot0{,}752-50=25{,}2$ °C",
        "risoluzione: un quanto (4,88 mV) vale $\\frac{4{,}88}{10}\\approx0{,}49$ °C",
      ] },
      { t: "p", testo: "<b>Perché serve il condizionamento</b>: il TMP36 usa solo da 0,1 a 1,75 V dei 5 V che l'A/D sa leggere, cioè un terzo delle tacche. Con un amplificatore di guadagno 2 l'uscita andrebbe da 0,2 a 3,5 V e la risoluzione diventerebbe circa 0,24 °C." },
    ] },

    { t: "salto" },
    { t: "sez", testo: "22 · L'encoder: come funziona (libro, pp. 79-81, e dispensa del 24/11)" },
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
        ["assoluto", "più corone, ogni posizione ha il suo codice (§25)", "la posizione <b>vera</b>, anche dopo un'accensione"],
      ] },
    ] },
    { t: "tab", intest: ["come legge", "com'è fatto", "pregi"], larghezze: ["20%", "50%", "30%"], righe: [
      ["ottico <b>trasmissivo</b>", "LED e ricevitore da parti <b>opposte</b> del disco, con zone trasparenti e opache (quello del libro)", "il più usato"],
      ["ottico <b>riflessivo</b>", "LED e ricevitore dallo <b>stesso lato</b>, disco con righe riflettenti e opache", "più piccolo, alta risoluzione"],
      ["<b>magnetico</b>", "un magnete che gira davanti a un sensore a <b>effetto Hall</b> (una tensione che nasce in un conduttore attraversato da corrente quando c'è un campo magnetico)", "nessun contatto né usura, resiste a sporco e calore"],
    ] },
    { t: "p", testo: "Nell'encoder ottico il fototransistor non dà subito 0 e 1 puliti: un <b>comparatore</b> confronta il suo segnale con una soglia e dà alto sopra la soglia, basso sotto. Poi un <b>contatore</b> conta i fronti di salita. Esistono anche encoder <b>lineari</b>, con una riga graduata al posto del disco, per misurare spostamenti in linea retta (macchine utensili). Il vecchio mouse con la pallina aveva due encoder, uno per l'asse X e uno per l'asse Y." },

    { t: "sez", testo: "23 · Le formule dell'encoder" },
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

    { t: "sez", testo: "24 · Il verso di rotazione: encoder incrementale e flip-flop D" },
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
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Quello che aggiunge la dispensa", righe: [
        "A e B sono sfasati di <b>un quarto di ciclo</b>: $\\frac\\lambda4$, cioè <b>90°</b> ($\\lambda$ = una zona chiara più una scura)",
        "<b>canale Z</b> (fase Z): un solo impulso a ogni giro, segna lo <b>zero</b>; serve a ritrovare la posizione di partenza",
        "<b>risoluzione</b> $\\frac{360°}{N}$ con $N$ fori; contando <b>tutti</b> i fronti, di salita e di discesa, di A e di B, ho 4 conteggi per ciclo invece di 1: risoluzione <b>× 4</b> (la dispensa lo fa con due XOR e una rete RC)",
      ] },
    ], dx: [
      { t: "box", tipo: "occhio", titolo: "Quale verso è \"orario\"? Libro e dispensa non coincidono", righe: [
        "<b>Libro</b>: A in anticipo su B → orario.",
        "<b>Dispensa</b>, p. 15: B in ritardo (cioè A in anticipo) → moto <b>positivo</b>; p. 16, con Arduino: quando cambia A, se A e B sono <b>uguali</b> → <b>orario</b>. Ma se A è in anticipo, quando A cambia B non ha ancora cambiato, quindi sono <b>diversi</b>: nella figura di p. 16 l'orario è quello con <b>B in anticipo</b>.",
        "Il motivo: il nome del verso dipende da come è montato l'encoder e da che parte lo guardi. Il principio è uno solo: <b>chi arriva prima dice il verso</b>, e scambiando A e B il verso si inverte. In verifica scrivi la regola che usi.",
      ] },
    ] },

    { t: "sez", testo: "25 · Encoder assoluto e codice Gray (dispensa del 24/11)" },
    facile(["L'incrementale è un <b>contapassi</b>: sa quanti passi hai fatto da quando l'hai acceso, ma se si spegne non sa più dove sei. L'assoluto è un <b>indirizzo</b> scritto su ogni casa: in qualunque momento leggi dove sei, anche appena acceso."]),
    { t: "due", sx: [
      { t: "p", testo: "Il disco dell'encoder <b>assoluto</b> ha $n$ <b>corone</b> e $2^n$ <b>settori</b>: ogni settore ha un codice di $n$ bit (opaco = 1, trasparente = 0), una corona per bit, con un LED e un ricevitore per corona. Il bit meno significativo, che cambia a ogni settore, sta sulla corona con le zone più <b>fitte</b>, quella <b>esterna</b> (vedi le correzioni, §29)." },
      { t: "tab", intest: ["", "incrementale", "assoluto"], righe: [
        ["dopo uno spegnimento", "perde la posizione", "la <b>tiene</b>"],
        ["velocità", "sì (conto impulsi nel tempo)", "secondo la dispensa no"],
        ["costo", "basso", "più alto, e lo zero va allineato con cura"],
      ] },
      { t: "p", testo: "<b>Monogiro</b>: codifica la posizione dentro un giro. <b>Multigiro</b>: conta anche i giri." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Codice Gray", righe: [
        "tra un numero e il successivo cambia <b>un solo bit</b> (anche tra l'ultimo e il primo)",
        "3 bit: 000, 001, 011, 010, 110, 111, 101, 100",
        "<b>binario → Gray</b>: il primo bit (MSB) resta uguale; ogni altro bit Gray è lo XOR tra quel bit binario e quello alla sua sinistra",
        "<b>Gray → binario</b>: l'MSB resta uguale; ogni altro bit binario è lo XOR tra il bit binario appena trovato e il bit Gray successivo",
      ] },
    ] },
    { t: "due", sx: [
      { t: "box", titolo: "Perché non il binario normale", righe: [
        "da 3 a 4 in binario: $011\\to100$, cambiano <b>tre</b> bit",
        "i tre contatti non scattano mai nello stesso istante: per un attimo posso leggere 111 (7) o 000 (0), un numero sbagliato",
        "in Gray: $010\\to110$, cambia un bit solo: o leggo il vecchio o il nuovo, mai un numero a caso",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempi", righe: [
        "binario $0110$ (6) → Gray: 0, $0\\oplus1=1$, $1\\oplus1=0$, $1\\oplus0=1$ → <b>0101</b>",
        "Gray $101011$ → binario (dispensa): 1, $1\\oplus0=1$, $1\\oplus1=0$, $0\\oplus0=0$, $0\\oplus1=1$, $1\\oplus1=0$ → <b>110010</b>",
        "$\\oplus$ = XOR: 1 se i due bit sono diversi, 0 se sono uguali",
      ] },
    ] },

    { t: "sez", testo: "26 · L'encoder con Arduino (dispense del 24/11)" },
    { t: "due", sx: [
      { t: "p", testo: "In laboratorio si usa un encoder <b>meccanico</b> a manopola, che sembra un potenziometro. Piedini: <b>CLK</b> (canale A), <b>DT</b> (canale B), <b>SW</b> (il pulsante che scatta premendo la manopola), + e GND. Il programma della dispensa fa: giro orario → contatore +1, antiorario → −1, premo → torna a 0." },
      { t: "box", tipo: "memo", titolo: "La regola del programma", righe: [
        "a ogni cambio di CLK: se CLK = DT → +1 (orario), se sono diversi → −1 (antiorario)",
        "per sapere solo di quanto ha girato basta contare; per la <b>velocità</b> conto gli impulsi in un certo tempo (§23)",
      ] },
      { t: "tab", intest: ["metodo", "come funziona", "occhio"], larghezze: ["23%", "42%", "35%"], righe: [
        ["<b>polling</b>", "a ogni giro di <code>loop()</code> il programma va a leggere i piedini", "se è occupato altrove può perdere degli scatti; va bene su qualsiasi piedino"],
        ["<b>interrupt</b>", "quando il piedino cambia, il processore <b>interrompe</b> quello che sta facendo, esegue una funzione apposta e poi riprende", "su Arduino Uno solo i piedini <b>2 e 3</b> (INT0, INT1)"],
      ] },
    ], dx: [
      facile(["Polling è come controllare il telefono ogni cinque minuti per vedere se è arrivato un messaggio: se ne arrivano tanti uno dopo l'altro te ne perdi qualcuno. L'interrupt è la <b>suoneria</b>: smetti quello che fai, rispondi, e poi torni a quello che facevi."]),
      { t: "p", testo: "Con <code>attachInterrupt(0, funzione, CHANGE)</code> la funzione parte a ogni cambio del piedino 2. Le modalità sono LOW, CHANGE, RISING (fronte di salita) e FALLING (discesa). Dentro quella funzione <code>delay()</code> non funziona, e le variabili che modifica vanno dichiarate <code>volatile</code>." },
      { t: "box", tipo: "occhio", titolo: "Il rimbalzo dei contatti", righe: [
        "un contatto meccanico, quando si chiude, \"rimbalza\": invece di un fronte pulito dà un treno di impulsi brevi, che il contatore conterebbe tutti",
        "<b>antirimbalzo</b>: analogico (filtro passa basso RC + trigger di Schmitt), digitale (flip-flop SR con porte NAND o NOR) o software (il programma aspetta che il segnale sia stabile)",
        "gli encoder ottici e magnetici non rimbalzano",
      ] },
    ] },

    { t: "sez", testo: "27 · SCR, il tiristore: un diodo che si accende a comando (lezione del 24/11)" },
    facile(["L'SCR è un <b>cancello con la serratura a scatto</b>: finché nessuno preme il pulsante (il gate) resta chiuso anche se la gente spinge. Basta una spinta breve sul pulsante e si apre; da lì resta aperto da solo finché passa gente. Quando la folla finisce (la corrente scende quasi a zero) si richiude, e per riaprirlo serve un'altra spinta."]),
    { t: "due", sx: [
      { t: "p", testo: "L'<b>SCR</b> (<i>Silicon Controlled Rectifier</i>, raddrizzatore controllato al silicio) o <b>tiristore</b> è un diodo con un terzo piedino: <b>anodo A</b>, <b>catodo K</b> e <b>gate G</b>. Come il diodo fa passare la corrente solo da A a K, ma non basta che la tensione sia positiva: aspetta il comando sul gate, un breve impulso di corrente $i_G$." },
      { t: "p", testo: img2("scr", 34) },
      { t: "p", testo: "Lo schema del 24/11: generatore alternato e SCR. Qui c'è anche il <b>carico</b> $R_L$ (per esempio una lampada): senza, quando l'SCR conduce, il generatore sarebbe in cortocircuito." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Come si comporta", righe: [
        "<b>innesco</b>: con $V_{AK}>0$, un impulso di corrente sul gate lo accende e conduce da A a K",
        "<b>autoritenuta</b>: una volta acceso resta acceso anche se tolgo il comando dal gate",
        "<b>spegnimento</b>: si spegne quando la corrente di anodo scende sotto la <b>corrente di mantenimento</b> $I_H$ (dal datasheet)",
        "con $V_{AK}<0$ non conduce mai, come un diodo",
      ] },
      { t: "p", testo: "<b>La caratteristica</b> $I_{AK}$-$V_{AK}$ della lavagna ha due rami: <b>spento</b>, la corrente resta quasi zero anche con tanta tensione (ramo quasi orizzontale sull'asse $V_{AK}$); <b>acceso</b>, la tensione resta quasi zero e la corrente la decide il carico (ramo quasi verticale). L'impulso sul gate fa saltare dal primo al secondo." },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Un interruttore che non scalda", righe: [
        "<b>ON</b>: $V_{AK}\\approx0$ &nbsp;&nbsp; <b>OFF</b>: $I_{AK}\\approx0$",
        "$$P=V_{AK}\\cdot I_{AK}\\approx0$$",
        "in tutti e due gli stati uno dei due fattori è quasi zero, quindi la potenza persa è quasi zero",
      ] },
      facile(["Un rubinetto o è tutto chiuso (niente acqua) o tutto aperto (nessuno sforzo): in nessuno dei due casi si spreca energia. Si spreca solo mentre lo giri."]),
    ], dx: [
      { t: "p", testo: "<b>La commutazione</b> (lavagna, p. 7): passando da OFF a ON la tensione $V$ scende e la corrente $I$ sale, ma non di colpo. Per un attimo ci sono <b>tutte e due</b>, e il loro prodotto fa un <b>picco di potenza</b>: è lì che l'SCR scalda. Più commuta spesso, più scalda." },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "La tensione di rete", righe: [
        "$$V_{eff}=\\frac{V_{Max}}{\\sqrt2}\\approx0{,}707\\,V_{Max}\\qquad V_{Max}=\\frac{V_{eff}}{0{,}707}$$",
        "i 220 V di casa sono il valore <b>efficace</b>: il picco è $V_{Max}=220\\cdot\\sqrt2\\approx311$ V",
        "50 Hz → periodo $T=\\frac{1}{50}=20$ ms",
      ] },
      facile(["Il valore efficace è la tensione continua che scalderebbe una stufa allo stesso modo. La sinusoide sale fino a 311 V ma passa anche da zero: in media scalda come 220 V fissi."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "SCR in alternata: controllo di fase", righe: [
        img2("scr_ca", 34),
        "nella semionda <b>positiva</b> conduce dall'impulso (angolo $\\alpha$) fino alla fine della semionda: sul carico arriva la parte grigia",
        "a fine semionda la corrente va a zero e l'SCR si spegne da solo; nella semionda <b>negativa</b> resta spento",
        "impulso <b>più tardi</b> → meno area → meno tensione sul carico (meno luce, meno calore). L'area vale $1+\\cos\\alpha$: con $\\alpha=0$ tutta la semionda, con $\\alpha=180°$ niente",
      ] },
    ] },

    { t: "sez", testo: "28 · Domande tipiche" },
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
      ["Come inverto il verso con il L298?", "§17: scambio IN1 e IN2, con ENA = 1"],
      ["Come regolo la velocità del motore con Arduino?", "§17: PWM su ENA, $V_{media}=D\\,V_{al}$"],
      ["Come gira un passo-passo? Angolo di passo e giri/min", "§18: sequenza delle bobine, $\\frac{360°}{N}$, $n=\\frac{60f}{N}$"],
      ["A cosa servono L297 e L298?", "§18: sequenza delle fasi (e corrente) e potenza"],
      ["Pregi e difetti del passo-passo", "§18: posizione senza encoder, ma può perdere passi"],
      ["Disegna lo schema di un sistema di acquisizione", "§19: sensore, condizionamento, A/D, Arduino, azionamento, attuatore"],
      ["Differenza tra sensore e trasduttore; cos'è un attuatore", "§19"],
      ["Quanto vale il quanto? Che numero dà l'A/D?", "§20: $q=\\frac{V_{FS}}{2^n}$, $N=\\frac{V_i}{q}$"],
      ["Come si legge la temperatura con il TMP36?", "§21: $T=100V-50$, 10 mV/°C"],
      ["Come funziona un encoder? Che tipi ci sono?", "§22: fotoaccoppiatore e disco forato; ottico, magnetico"],
      ["Calcola angolo, giri/min, velocità o spazio", "§23"],
      ["Velocità massima che l'encoder riesce a leggere", "§23: $T_{OFF}$ e larghezza del foro"],
      ["Come si capisce il verso di rotazione? Cos'è il canale Z?", "§24: fasi A e B a 90°, flip-flop D"],
      ["Incrementale o assoluto? Perché il codice Gray?", "§25: un solo bit cambia alla volta"],
      ["Converti da binario a Gray e viceversa", "§25: MSB uguale, poi XOR"],
      ["Polling o interrupt? Cos'è il rimbalzo?", "§26"],
      ["Cos'è un SCR? Come si accende e come si spegne?", "§27: impulso sul gate, autoritenuta, $I_H$"],
      ["Perché l'SCR acceso o spento dissipa poco? Quando scalda?", "§27: $P=V_{AK}I_{AK}\\approx0$, picco in commutazione"],
      ["Cosa fa l'SCR in corrente alternata?", "§27: conduce dall'impulso a fine semionda positiva"],
      ["Valore efficace e valore massimo della rete", "§27: $V_{Max}=\\sqrt2\\,V_{eff}\\approx311$ V"],
    ] },

    { t: "sez", testo: "29 · Correzioni agli appunti, al libro e alle dispense" },
    { t: "p", testo: "• <b>10/11 Motore cc</b> (simboli del quaderno): la caratteristica giusta è $C_{me}=\\frac{K_{me}V_A}{R_A}-\\frac{K_{me}K_E}{R_A}\\omega$, cioè col libro $\\frac{k_{me}V_g}{R}-\\frac{k_{me}k_e}{R}\\omega$: negli appunti c'è $V_g$ (che sul quaderno è la f.c.e.m.) al posto di $V_A$, e $R$ al posto di $R_A$. Le caratteristiche vanno disegnate come <b>rette parallele</b>, non curve.<br>• <b>10/11 Motore cc, pagina 1</b>: $R_2$ è 7 kΩ, non 7 Ω. In serie la corrente è una sola: con 5 V, $I=\\frac{5}{10\\,\\text{k}\\Omega}=0{,}5$ mA (non 0,2 mA, e non $\\frac{5}{3\\text{k}}$ e $\\frac{5}{7\\text{k}}$); $\\Delta V_{R_1}=1{,}5$ V e $\\Delta V_{R_2}=3{,}5$ V.<br>• <b>3/11 lavagna</b>: nella scala dei prefissi \"mA\" compare due volte; sotto µA viene <b>nA</b> (nano, $10^{-9}$), poi pA.<br>• <b>28/9</b>: nella tabella del L298 le righe ENA = 1 con IN1 = IN2 sono vuote: il motore è fermo e frenato.<br>• <b>Libro p. 82, esercizio 8</b>: arrotonda $x$ a 2,6 mm e trova 3,71 m/s e 1418 giri/min; senza arrotondare vengono 3,74 m/s e 1429 giri/min. Differenza piccola, il metodo è giusto.<br>• <b>Libro p. 82</b>: l'integrato per leggere gli encoder è scritto \"74LS2000B\"; con questa sigla non l'ho trovato: probabilmente è l'HCTL-2000 (lettore di encoder in quadratura). Da chiedere al prof se serve.<br>• <b>Libro p. 81</b>: \"tachimentrico\" è un refuso di tachimetrico.<br>• <b>24/11</b>: nello schema dell'SCR manca il <b>carico</b> in serie (lampada o resistenza $R_L$): così, quando l'SCR conduce, il generatore è in cortocircuito.<br>• <b>Lavagna 24/11, p. 8</b>: il terzo impulso sul gate è disegnato appena prima dello zero, ancora nella semionda negativa: lì l'SCR non si accende ($V_{AK}<0$). Per far condurre quasi tutta la semionda l'impulso va dato subito <b>dopo</b> lo zero.<br>• <b>Dispensa encoder (24/11), pp. 15-16</b>: a p. 15 \"B in ritardo\" è il moto positivo, a p. 16 l'orario (CLK = DT) è quello con B in anticipo; il libro dice A in anticipo → orario. Il verso dipende dal montaggio: da chiedere al prof quale convenzione vuole (§24).<br>• <b>Dispensa encoder, p. 11</b>: il testo dice che il bit meno significativo è sulla corona più interna, ma la figura di p. 12 (e di solito gli encoder) lo hanno su quella <b>esterna</b>, dove le zone sono più fitte.<br>• <b>Dispensa passo-passo (18/9)</b>: dice che nei motori veri le 4 fasi fanno girare di un solo passo. In realtà ogni fase è un passo: un motore da 48 passi/giro fa 7,5° a ogni fase (la libreria <code>Stepper</code> conta così). Gli esempi del §18 sono fatti in questo modo.<br>• <b>Dispensa TMP36 (27/10)</b>: una formula divide per 1024 ($q=\\frac{5}{1024}$, come la dispensa dell'acquisizione), il programma per 1023: differenza dello 0,1%, trascurabile. L'uscita massima è 1,75 V a 125 °C (nel testo \"circa 1,7 V\")." },
  ],
};
