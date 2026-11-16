// Spiegazione completa dell'amplificatore operazionale: libro (cap. 6, par. 1-2 fino al convertitore V→I, par. 5)
// e appunti Saber di Elettronica dal 30/9 al 27/10. Formule ed esempi numerici controllati da verifica.py.
// Dal 2026-11-16 scritta in modo semplicissimo: basi all'inizio, riquadri gialli "Detto semplice" con un paragone,
// ragionamento passo per passo ed esempi svolti con i numeri per ogni circuito.
const png = (nome, alto) => `<img src="img/${nome}.png" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:1.5mm auto">`;
const svg = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:1.5mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = {
  titolo: "Amplificatore operazionale",
  blocchi: [
    { t: "titolo", testo: "Amplificatore operazionale, spiegato semplice",
      sotto: "Elettronica · dal libro e dagli appunti dal 30/9 al 27/10 · giallo = detto semplice, per capire · bordo spesso = da sapere a memoria · grigio = passaggi della dimostrazione" },
    { t: "p", testo: "Come leggerla: prima il riquadro <b>giallo</b>, che spiega l'idea con un paragone; poi le formule nel riquadro a <b>bordo spesso</b>, che vanno sapute; poi la <b>dimostrazione</b> in grigio, che va saputa rifare all'interrogazione; infine gli <b>esempi</b> con i numeri." },

    { t: "sez", testo: "1 · Prima di cominciare: le parole che servono" },
    { t: "p", testo: "Per capire l'operazionale bastano poche idee. Le spieghiamo con l'<b>acqua</b>, perché l'elettricità si comporta in modo molto simile: i fili sono tubi, la corrente è l'acqua che scorre, la tensione è la spinta." },
    { t: "tab", intest: ["parola", "cosa vuol dire", "con l'acqua"], larghezze: ["22%", "42%", "36%"], righe: [
      ["<b>tensione</b> $v$ (volt, V)", "la \"spinta\" che fa muovere le cariche. Si misura sempre <b>tra due punti</b>", "la differenza di altezza tra due vasche: più è grande, più l'acqua spinge"],
      ["<b>corrente</b> $i$ (ampere, A)", "quante cariche passano in un secondo", "quanta acqua passa nel tubo ogni secondo"],
      ["<b>resistenza</b> $R$ (ohm, Ω)", "quanto un componente ostacola la corrente", "un tubo stretto: più è stretto, meno acqua passa"],
      ["<b>massa</b> (0 V)", "il punto da cui si misurano tutte le tensioni", "il pavimento: le altezze si misurano da lì"],
      ["<b>nodo</b>", "punto in cui si incontrano tre o più fili", "un incrocio di tubi"],
      ["<b>carico</b> $R_L$", "quello che sta in fondo al circuito e usa il segnale (altoparlante, strumento...)", "il lavandino da riempire"],
    ] },
    { t: "p", testo: "Pedici che si incontrano sempre: $v_i$ = tensione d'<b>ingresso</b> (<i>input</i>), $v_o$ = tensione d'<b>uscita</b> (<i>output</i>), $V_{CC}$ = tensione di <b>alimentazione</b>, $R_L$ = resistenza del carico (<i>load</i>). Lettere minuscole ($v$, $i$) = grandezze che possono cambiare nel tempo, maiuscole ($V$, $I$) = valori fissi." },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Legge di Ohm", righe: [
        "$$v=R\\cdot i\\qquad i=\\frac{v}{R}$$",
        "la corrente in un resistore è la tensione <b>ai suoi capi</b> divisa per la resistenza",
      ] },
      facile(["Più spinta → più acqua. Tubo più stretto → meno acqua. Tutto qui."]),
      { t: "box", titolo: "Esempio", righe: ["10 V ai capi di 5 kΩ: $i=\\frac{10}{5000}=0{,}002$ A $=2$ mA"] },
      { t: "p", testo: "<b>Attenzione</b>: \"ai suoi capi\" vuol dire la differenza tra le tensioni dei due lati. Un resistore tra un punto a 5 V e uno a 2 V ha ai capi $5-2=3$ V." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Legge di Kirchhoff ai nodi", righe: [
        "$$\\sum i_{entranti}=\\sum i_{uscenti}$$",
        "la corrente non si crea e non sparisce: quanta ne entra in un nodo, tanta ne esce",
      ] },
      facile(["Come l'acqua a un incrocio di tubi: se entrano 3 litri al secondo, ne escono 3 litri al secondo, né di più né di meno."]),
      { t: "p", testo: "Spesso, come negli appunti, si scrivono <b>tutte</b> le correnti come se entrassero nel nodo e si pone la somma uguale a zero: $\\sum i=0$. Una corrente che in realtà esce verrà negativa, e va bene così: il segno lo sistema la matematica." },
      { t: "p", testo: "Per scrivere ogni corrente entrante uso Ohm: $i=\\frac{v_{\\text{da dove viene}}-v_{\\text{nodo}}}{R}$." },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Partitore di tensione", righe: [
        "$$v_{R_1}=v\\,\\frac{R_1}{R_1+R_2}$$",
        "due resistori in serie, tensione $v$ sul totale: su $R_1$ ne arriva una parte",
        "vale solo se dal punto di mezzo <b>non esce corrente</b>",
      ] },
      facile(["Due resistori in serie si dividono la tensione come due fratelli si dividono una torta in base all'età: chi ha la resistenza più grande prende la fetta più grande."]),
      { t: "box", titolo: "Esempio", righe: [
        "12 V su $R_1=10$ kΩ e $R_2=20$ kΩ in serie",
        "su $R_1$: $12\\cdot\\frac{10}{30}=4$ V; su $R_2$: $12\\cdot\\frac{20}{30}=8$ V; $4+8=12$ ✓",
      ] },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Sovrapposizione degli effetti", righe: [
        "con più ingressi: ne tengo acceso <b>uno alla volta</b> e metto gli altri a 0 V (cioè collegati a massa)",
        "calcolo l'uscita dovuta a ognuno, poi <b>sommo</b> i risultati",
      ] },
      facile(["Una vasca riempita da due rubinetti: misuro quanta acqua dà il primo da solo, poi il secondo da solo. Insieme danno la somma."]),
      { t: "box", tipo: "memo", titolo: "Guadagno", righe: [
        "$$G=\\frac{v_o}{v_i}$$",
        "quante volte l'uscita è più grande dell'ingresso",
      ] },
      facile(["Come una lente d'ingrandimento: $G=10$ vuol dire che l'uscita è 10 volte l'ingresso. Se $G$ è <b>negativo</b>, l'uscita è anche <b>capovolta</b>: quando l'ingresso sale, l'uscita scende."]),
    ] },

    { t: "sez", testo: "2 · Cos'è un amplificatore operazionale" },
    facile([
      "Immagina un aiutante <b>fortissimo ma un po' ottuso</b>. Guarda solo due cose: la tensione sul morsetto $+$ e quella sul morsetto $-$.",
      "Se il $+$ è più alto del $-$, spinge l'uscita <b>in su</b>; se è più alto il $-$, la spinge <b>in giù</b>.",
      "Spinge tantissimo: basta una differenza piccolissima perché spinga al massimo. Da solo è quasi inutile; con qualche resistore intorno diventa <b>preciso e obbediente</b>.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: "L'amplificatore operazionale (op-amp) è un <b>circuito integrato</b> (un \"chip\") che amplifica la <b>differenza</b> tra le tensioni dei suoi due ingressi. Si chiama \"operazionale\" perché, aggiungendo pochi resistori, condensatori o diodi, fa molte <b>operazioni</b> sui segnali: amplificare, sommare, sottrarre, derivare, integrare." },
      { t: "p", testo: "Un amplificatore aumenta la <b>potenza</b> che un segnale può dare a un carico. L'energia in più non la crea: la prende dall'<b>alimentazione</b> in continua. Il segnale d'ingresso porta l'<b>informazione</b>, l'alimentazione porta l'<b>energia</b>." },
      facile(["È come il servosterzo di un'auto: tu giri il volante con poca forza (il segnale), il motore ci mette la forza vera (l'alimentazione), ma la direzione la decidi tu."]),
      { t: "p", testo: "Il più famoso è il <b>741</b> (1968), economico e con prestazioni medie; TL081 e LF351 hanno gli stessi piedini ma resistenza d'ingresso molto più alta." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "I 5 terminali", righe: [
        "ingresso <b>invertente</b> ($-$), tensione $v_-$",
        "ingresso <b>non invertente</b> ($+$), tensione $v_+$",
        "<b>uscita</b> $v_o$",
        "due alimentazioni $+V_{CC}$ e $-V_{CC}$",
      ] },
      { t: "p", testo: "Il simbolo è un <b>triangolo</b> che punta verso l'uscita: il segnale va dal lato largo (ingressi) alla punta (uscita). \"Invertente\" vuol dire che, se sale $v_-$, l'uscita scende; \"non invertente\" vuol dire che, se sale $v_+$, l'uscita sale." },
      { t: "p", testo: "<b>Alimentazione duale</b>: due tensioni uguali e opposte rispetto a massa (per esempio ±15 V), ottenute con due generatori in serie e la massa nel punto in mezzo. Serve perché l'uscita possa andare sia sopra sia sotto lo zero. Negli schemi di solito non si disegna, ma c'è sempre." },
      { t: "p", testo: "L'uscita non arriva mai a $V_{CC}$: si ferma alla <b>tensione di saturazione</b> $V_{sat}$, circa <b>1÷2 V sotto</b> l'alimentazione. Con ±15 V: $V_{sat}\\approx\\pm13$ V. I modelli <i>rail-to-rail</i> arrivano fino all'alimentazione." },
      facile(["L'uscita è un ascensore: non può salire oltre l'ultimo piano ($+V_{sat}$) né scendere sotto il piano più basso ($-V_{sat}$). Quando ci arriva si dice che <b>satura</b>."]),
    ] },

    { t: "sez", testo: "3 · Il modello: tensione differenziale e guadagno" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: [
        "$$v_d=v_+-v_-$$",
        "$$v_o=A_{OL}\\,v_d=A_{OL}(v_+-v_-)$$",
      ] },
      facile([
        "$v_d$ è \"di quanto il $+$ è più alto del $-$\". L'operazionale la moltiplica per un numero <b>enorme</b>, $A_{OL}$: nel 741 è 200 000.",
        "Se $v_d=1$ mV, l'uscita vorrebbe essere $200\\,000\\cdot0{,}001=200$ V. Impossibile: si ferma a $V_{sat}$, cioè <b>satura</b>.",
      ]),
      { t: "p", testo: "$v_d$ è la <b>tensione differenziale d'ingresso</b>. $A_{OL}$ è il <b>guadagno ad anello aperto</b> (<i>open loop</i>), detto anche guadagno differenziale: il rapporto $A_{OL}=\\frac{v_o}{v_d}$." },
      { t: "p", testo: "<b>Anello aperto</b> = nessun componente tra uscita e ingressi. <b>Anello chiuso</b> = c'è un collegamento tra uscita e ingresso, cioè una <b>retroazione</b> (<i>feedback</i>): l'uscita \"torna indietro\" a influenzare l'ingresso." },
    ], dx: [
      { t: "p", testo: svg("modello", 30) },
      { t: "p", testo: "Il circuito equivalente: tra gli ingressi c'è la <b>resistenza d'ingresso</b> $R_i$; l'uscita è un generatore $A_{OL}v_d$ con in serie la <b>resistenza d'uscita</b> $R_o$." },
      { t: "tab", intest: ["", "741 reale", "ideale"], larghezze: ["28%", "36%", "36%"], righe: [
        ["$A_{OL}$", "$2\\cdot10^5$", "$\\infty$"],
        ["$R_i$", "2 MΩ", "$\\infty$"],
        ["$R_o$", "75 Ω (appunti: ~10 Ω)", "0"],
      ] },
      { t: "p", testo: "Il 741 vero è così vicino all'ideale che nei calcoli si usa quasi sempre l'<b>operazionale ideale</b>: i conti vengono molto più semplici e il risultato cambia di pochissimo." },
    ] },
    { t: "box", tipo: "memo", titolo: "Operazionale ideale e cosa comporta", righe: [
      "$A_{OL}=\\infty$ → qualsiasi $v_d\\neq0$ manda l'uscita in saturazione: per avere un circuito lineare serve la <b>retroazione negativa</b>",
      "$R_i=\\infty$ → gli ingressi <b>non assorbono corrente</b>",
      "$R_o=0$ → $v_o$ <b>non dipende dal carico</b> (dalla corrente che gli chiedo)",
      "banda infinita: amplifica allo stesso modo a tutte le frequenze (nel reale no, vedi §18)",
    ] },
    facile([
      "$R_i=\\infty$: gli ingressi sono come una <b>finestra chiusa</b>: vedi cosa c'è fuori (la tensione), ma non entra niente (la corrente).",
      "$R_o=0$: l'uscita è come un rubinetto con una pressione perfetta: quanta acqua chiedi, tanta ne dà, <b>senza che la pressione cali</b>.",
    ], "Detto semplice: cosa vogliono dire $R_i=\\infty$ e $R_o=0$"),

    { t: "sez", testo: "4 · Caratteristica di trasferimento (appunti del 3/10)" },
    { t: "due", sx: [
      { t: "p", testo: svg("caratteristica", 40) },
      facile(["Il grafico ha tre pezzi: un <b>pavimento</b> ($-V_{sat}$), una <b>salita</b> ripidissima e un <b>soffitto</b> ($+V_{sat}$). La salita è così ripida che sembra un muro: con il 741 bastano 0,065 mV per andare dal centro al soffitto."]),
    ], dx: [
      { t: "p", testo: "È il grafico $v_o=f(v_d)$: come cambia l'uscita al variare della tensione differenziale." },
      { t: "p", testo: "• Vicino all'origine è una <b>retta</b> con pendenza $A_{OL}$: è la <b>zona lineare</b>, dove l'uscita è proporzionale all'ingresso.<br>• Quando $v_d$ cresce, l'uscita <b>satura</b> a $+V_{sat}$ o $-V_{sat}$ e resta lì, anche se $v_d$ cresce ancora." },
      { t: "p", testo: "Siccome $A_{OL}$ è enorme, la zona lineare è <b>strettissima</b>: poche decine o centinaia di μV. Esempio con il 741 e $V_{sat}=13$ V:" },
      { t: "box", righe: ["$v_{d,max}=\\frac{V_{sat}}{A_{OL}}=\\frac{13}{2\\cdot10^5}=65\\ \\mu\\text{V}$"] },
      { t: "p", testo: "In pratica in zona lineare $v_d\\approx0$, come se $A_{OL}=\\infty$." },
    ] },
    { t: "box", tipo: "occhio", titolo: "Anello aperto = comparatore", righe: [
      "Senza retroazione l'unico uso è il <b>comparatore</b>: se $v_+>v_-$ l'uscita va a $+V_{sat}$, se $v_+<v_-$ va a $-V_{sat}$. Dice quale dei due ingressi è più alto.",
      "Lo schema dell'esperienza col trimmer del 6/10 ha questa forma: segnale sul $+$, sul $-$ una tensione regolata con il trimmer (partitore), nessun collegamento tra uscita e ingressi.",
    ] },
    { t: "due", sx: [
      facile(["Il comparatore è un <b>arbitro</b> che dice solo chi ha vinto, non di quanto: se vince il $+$, uscita tutta in alto; se vince il $-$, tutta in basso."]),
    ], dx: [
      { t: "box", titolo: "Esempio", righe: [
        "trimmer regolato a $v_-=2$ V, alimentazione ±15 V ($V_{sat}\\approx13$ V)",
        "$v_+=2{,}5$ V: vince il $+$ → $v_o=+13$ V",
        "$v_+=1{,}5$ V: vince il $-$ → $v_o=-13$ V",
      ] },
    ] },

    { t: "sez", testo: "5 · Retroazione negativa e cortocircuito virtuale" },
    { t: "p", testo: "Per avere un amplificatore lineare bisogna <b>ridurre il guadagno</b>: si collega una rete di resistori tra l'uscita e l'ingresso <b>invertente</b> (retroazione negativa). Così il guadagno del circuito dipende solo dai resistori e il campo di tensioni d'ingresso utilizzabili si allarga. Vale finché l'uscita <b>non satura</b>: $-V_{sat}<v_o<+V_{sat}$." },
    { t: "due", sx: [
      facile([
        "Retroazione negativa vuol dire che l'operazionale <b>si controlla da solo</b>: un pezzo dell'uscita torna sul $-$ e la frena.",
        "È come andare in bicicletta: se vai troppo a destra te ne accorgi e giri a sinistra, se vai troppo a sinistra giri a destra. Alla fine vai dritto.",
        "L'operazionale fa lo stesso: aggiusta l'uscita finché $v_-$ diventa <b>uguale</b> a $v_+$.",
      ]),
      { t: "p", testo: "<b>Perché sul $-$ e non sul $+$?</b> Sul $-$ l'uscita si corregge: se $v_o$ sale, sale anche $v_-$, la differenza $v_+-v_-$ diminuisce e l'uscita torna giù. Sul $+$ succederebbe il contrario: l'uscita sale, fa salire $v_+$, che la fa salire ancora di più, fino alla saturazione (retroazione <b>positiva</b>)." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Come l'operazionale trova l'equilibrio, al rallentatore", righe: [
        "circuito: non invertente con $R_1=R_2$, quindi $v_-=\\frac{v_o}{2}$; ingresso $v_+=v_i=1$ V",
        "1) all'inizio $v_o=0$: $v_-=0$, $v_d=1-0=1$ V positiva → l'uscita <b>sale</b>",
        "2) $v_o=1$ V: $v_-=0{,}5$ V, ancora sotto il $+$ → continua a <b>salire</b>",
        "3) $v_o=2$ V: $v_-=1$ V $=v_+$ → $v_d=0$: si <b>ferma</b> qui",
        "4) se andasse oltre, a $2{,}2$ V: $v_-=1{,}1$ V, sopra il $+$ → $v_d<0$, l'uscita <b>torna giù</b>",
        "risultato: $v_o=2$ V e $v_-=v_+$. Tutto questo succede in pochi microsecondi.",
      ] },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Cortocircuito virtuale (CCV)", righe: [
        "<b>CCV(a)</b>: la d.d.p. tra gli ingressi è nulla",
        "$$v_d=0\\ \\Rightarrow\\ v_+=v_-$$",
        "<b>CCV(b)</b>: gli ingressi non assorbono corrente",
        "$$i_+=i_-=0$$",
      ] },
      { t: "p", testo: "Si chiama così perché la tensione tra gli ingressi è zero <b>come in un cortocircuito</b>, ma <b>diversamente da un cortocircuito</b> tra i due morsetti non passa corrente. \"Virtuale\" = sembra un filo, ma non lo è." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Perché $v_d=0$", righe: [
        "da $v_o=A_{OL}v_d$ ricavo $v_d=\\frac{v_o}{A_{OL}}$",
        "$v_o$ è finita (sta tra $-V_{sat}$ e $+V_{sat}$)",
        "$A_{OL}=\\infty$ → $v_d=\\frac{\\text{finito}}{\\infty}=0$",
        "quindi $v_+=v_-$. CCV(b) viene invece da $R_i=\\infty$.",
      ] },
      { t: "box", titolo: "Con i numeri del 741", righe: [
        "$v_o=10$ V: $v_d=\\frac{10}{2\\cdot10^5}=50\\ \\mu$V: così piccola che si considera zero",
      ] },
    ] },
    facile([
      "Il cortocircuito virtuale si riassume in <b>due regole d'oro</b>, valide quando c'è retroazione negativa e l'uscita non satura:",
      "<b>1)</b> i due ingressi hanno la <b>stessa tensione</b>;",
      "<b>2)</b> negli ingressi <b>non entra corrente</b>.",
      "Con queste due regole, la legge di Ohm e Kirchhoff si risolvono <b>tutti</b> i circuiti di questa spiegazione.",
    ], "Detto semplice: le due regole d'oro"),
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Metodo per ogni circuito", righe: [
        "1) CCV(a): trovo $v_-$ (spesso $=v_+$)",
        "2) legge di Ohm: correnti nei resistori",
        "3) Kirchhoff $\\sum i=0$ al nodo $v_-$ (con $i_-=0$)",
        "4) ricavo $v_o$; più ingressi → <b>sovrapposizione</b>",
      ] },
      { t: "p", testo: "<b>Cosa bisogna saper fare per ogni configurazione</b> (appunti del 3/10 e del 24/10): disegnare lo schema, sapere la relazione $v_o=f(v_i)$, saperla dimostrare, sapere le caratteristiche." },
    ], dx: [
      { t: "p", testo: "<b>Massa virtuale</b>: se il $+$ è collegato a massa, per il CCV(a) anche il $-$ sta a 0 V, pur non essendo collegato a massa." },
      facile(["Come il perno di un'altalena: nessuno lo inchioda a terra, eppure non si muove. Qui è l'operazionale che tiene il $-$ fermo a 0 V, aggiustando l'uscita."]),
    ] },

    { t: "sez", testo: "6 · Amplificatore non invertente" },
    facile([
      "Il segnale entra <b>dritto nel $+$</b>. L'operazionale alza l'uscita finché, attraverso $R_2$ e $R_1$, sul $-$ arriva la <b>stessa tensione</b> dell'ingresso.",
      "Ma $R_2$ e $R_1$ fanno un partitore: sul $-$ arriva solo un <b>pezzo</b> dell'uscita. Perché quel pezzo sia uguale all'ingresso, l'uscita deve essere <b>più grande</b> dell'ingresso: ecco l'amplificazione.",
      "\"Non invertente\" perché l'uscita va nello <b>stesso verso</b> dell'ingresso: se l'ingresso sale, l'uscita sale.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("non_invertente", 24) },
      { t: "box", tipo: "memo", righe: [
        "$$G=\\frac{v_o}{v_i}=1+\\frac{R_2}{R_1}$$",
      ] },
      { t: "p", testo: "Il segnale entra sul $+$; $R_1$ va dal $-$ a massa, $R_2$ dall'uscita al $-$." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione (partitore)", righe: [
        "CCV(b): $i_-=0$, quindi $R_1$ e $R_2$ sono in serie e formano un partitore:",
        "$v_-=v_o\\frac{R_1}{R_1+R_2}$",
        "CCV(a): $v_-=v_+=v_i$, quindi $v_i=v_o\\frac{R_1}{R_1+R_2}$",
        "$\\frac{v_o}{v_i}=\\frac{R_1+R_2}{R_1}=1+\\frac{R_2}{R_1}$",
      ] },
      { t: "box", tipo: "passi", titolo: "Dimostrazione (Kirchhoff, come nel quaderno)", righe: [
        "nodo $v_-$: $I_{R1}=I_{R2}$, con $v_-=v_i$",
        "$\\frac{0-v_i}{R_1}=\\frac{v_i-v_o}{R_2}$",
        "$\\frac{v_o}{R_2}=\\frac{v_i}{R_2}+\\frac{v_i}{R_1}=v_i\\frac{R_1+R_2}{R_1R_2}$",
        "$\\frac{v_o}{v_i}=\\frac{R_1+R_2}{R_1}=1+\\frac{R_2}{R_1}$",
      ] },
    ] },
    { t: "p", testo: svg("altalena", 62) },
    facile([
        "Nel $-$ non entra corrente, quindi in $R_1$ e $R_2$ passa la <b>stessa</b> corrente. Allora la tensione cala in modo regolare lungo i due resistori: se la disegni, viene una <b>linea dritta</b>, come un'asta.",
        "<b>Non invertente</b> (a destra): l'asta è appoggiata a terra (massa) in fondo a $R_1$. L'ingresso la solleva a distanza $R_1$; l'uscita è la punta, a distanza $R_1+R_2$, e sale di più perché è più lontana.",
        "<b>Invertente</b> (a sinistra, §7): il perno è in mezzo, nel $-$ fermo a 0 V. Come su un'altalena, se un lato sale l'altro scende.",
      ], "Detto semplice: l'altalena"),
    { t: "box", titolo: "Esempio passo per passo", righe: [
      "$R_1=10$ kΩ, $R_2=90$ kΩ, $v_i=0{,}5$ V",
      "1) CCV(a): $v_-=v_+=0{,}5$ V",
      "2) corrente in $R_1$ (da $v_-$ a massa): $i=\\frac{0{,}5}{10\\,000}=50\\ \\mu$A",
      "3) nel $-$ non entra niente, quindi la stessa corrente arriva da $R_2$: caduta su $R_2$ $=50\\ \\mu\\text{A}\\cdot90\\text{ k}\\Omega=4{,}5$ V",
      "4) $v_o=v_-+4{,}5=0{,}5+4{,}5=5$ V",
      "controllo con la formula: $G=1+\\frac{90}{10}=10$, $v_o=10\\cdot0{,}5=5$ V ✓",
    ] },
    { t: "p", testo: "<b>Caratteristiche</b>: • $G$ dipende <b>solo dai resistori</b>, non da $A_{OL}$: precisione e stabilità dipendono dalla qualità dei resistori • $G>0$ e $G\\geq1$: $v_o$ è <b>in fase</b> con $v_i$ • $R_i=\\infty$ (il segnale entra direttamente nell'operazionale) • $R_o=0$ • si scelgono resistori grandi (10÷100 kΩ) per non togliere troppa corrente al carico; vale per tutte le configurazioni • per non saturare: $|v_i|<\\frac{V_{sat}}{G}$." },
    { t: "box", tipo: "occhio", titolo: "Errore da non fare", righe: [
      "Nel non invertente $G$ non è mai minore di 1. Se ti viene 0,5, hai scambiato $R_1$ e $R_2$: $R_2$ è quella che va dall'<b>uscita</b> al $-$.",
    ] },
    { t: "box", titolo: "Esempio: laboratorio dell'8/10", righe: [
      "$R_1=4{,}7$ kΩ, $R_2=2{,}2$ kΩ, $v_i=1$ V picco-picco a 1 kHz",
      "$A_v=1+\\frac{2{,}2}{4{,}7}\\approx1{,}47$ → in uscita circa $1{,}47$ V picco-picco, in fase",
      "all'oscilloscopio: $A_{v,reale}=\\frac{V_{out,pp}}{V_{in,pp}}$, da confrontare con quello teorico",
    ] },

    { t: "sez", testo: "7 · Amplificatore invertente" },
    facile([
      "Il $+$ è a massa, quindi (regola d'oro 1) anche il $-$ sta a <b>0 V</b>.",
      "La corrente che arriva dall'ingresso attraverso $R_1$ non può entrare nell'operazionale (regola d'oro 2): deve proseguire in $R_2$ <b>verso l'uscita</b>.",
      "Per \"tirarla via\" dal $-$, l'uscita deve stare dalla parte <b>opposta</b> dell'ingresso: se l'ingresso è positivo, l'uscita è negativa. Ecco perché si chiama invertente.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("invertente", 24) },
      { t: "box", tipo: "memo", righe: [
        "$$G=\\frac{v_o}{v_i}=-\\frac{R_2}{R_1}$$",
        "$R_i=R_1$, $R_o=0$, $|v_i|_{max}=\\frac{V_{sat}}{|G|}$",
      ] },
      { t: "p", testo: "Il segnale entra sul $-$ attraverso $R_1$; il $+$ è a massa." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione", righe: [
        "CCV(a): $v_-=v_+=0$ (massa virtuale)",
        "Ohm: $i_1=\\frac{v_i-0}{R_1}=\\frac{v_i}{R_1}$, $i_2=\\frac{v_o-0}{R_2}=\\frac{v_o}{R_2}$",
        "Kirchhoff al nodo $v_-$ con $i_-=0$: $i_1+i_2=0$",
        "$\\frac{v_i}{R_1}+\\frac{v_o}{R_2}=0$ → $v_o=-\\frac{R_2}{R_1}v_i$",
      ] },
      { t: "box", tipo: "passi", titolo: "Resistenza d'ingresso", righe: [
        "$R_i=\\frac{v_i}{i_1}=\\frac{v_i}{v_i/R_1}=R_1$",
        "il generatore vede $R_1$ con l'altro capo a 0 V (massa virtuale)",
      ] },
    ] },
    { t: "due", sx: [
      facile([
        "Guarda l'altalena a sinistra nel disegno del §6: il perno è il $-$, fermo a 0 V. L'ingresso sta a distanza $R_1$ da una parte, l'uscita a distanza $R_2$ dall'altra.",
        "Se l'ingresso sale di 1 V, l'uscita scende di $\\frac{R_2}{R_1}$ volt: più lungo è il braccio $R_2$, più l'uscita si sposta.",
        "Il <b>meno</b> non vuol dire \"più piccolo\": vuol dire <b>capovolto</b>. Una sinusoide esce sottosopra (sfasata di 180°).",
      ], "Detto semplice: altalena e segno meno"),
    ], dx: [
      { t: "box", titolo: "Esempio passo per passo", righe: [
        "$R_1=10$ kΩ, $R_2=100$ kΩ, $v_i=0{,}5$ V",
        "1) CCV(a): $v_-=0$",
        "2) corrente in $R_1$: $i_1=\\frac{0{,}5-0}{10\\,000}=50\\ \\mu$A, verso il $-$",
        "3) nel $-$ non entra: i 50 μA proseguono in $R_2$ verso l'uscita",
        "4) caduta su $R_2$: $50\\ \\mu\\text{A}\\cdot100\\text{ k}\\Omega=5$ V, e la corrente va da $v_-=0$ verso $v_o$, quindi $v_o$ è più bassa: $v_o=0-5=-5$ V",
        "controllo: $G=-\\frac{100}{10}=-10$, $v_o=-10\\cdot0{,}5=-5$ V ✓",
      ] },
    ] },
    { t: "p", testo: "<b>Caratteristiche</b>: • il segno meno vuol dire <b>sfasamento di 180°</b> (opposizione di fase) • $|G|$ può essere anche minore di 1 • $R_i=R_1$: conviene $R_1$ grande (≥ 10 kΩ) per non abbassare troppo la resistenza d'ingresso • $R_2$ è in parallelo al carico (va dall'uscita al $-$, che sta a 0 V) • con impedenze al posto dei resistori $G=-\\frac{Z_2}{Z_1}$, che dipende dalla frequenza • se $|v_i|$ supera $\\frac{V_{sat}}{|G|}$ l'uscita è tagliata (distorta) e il CCV non vale più." },
    { t: "box", titolo: "Esempio: laboratorio del 30/9", righe: [
      "$R_f=R_2=100$ kΩ, $R_i=R_1=10$ kΩ → $G=-\\frac{100}{10}=-10$",
      "ingresso triangolare 1 V picco-picco a 1 kHz, offset 0 → uscita 10 V picco-picco, capovolta",
      "con ±15 V ($V_{sat}\\approx13$ V): $V_{i,max}=\\frac{13}{10}=1{,}3$ V; oltre, la triangolare esce tagliata in alto e in basso",
    ] },
    facile(["Perché si taglia: l'uscita vorrebbe arrivare a $10\\cdot1{,}5=15$ V, ma l'ascensore si ferma all'ultimo piano, 13 V. La punta del triangolo resta \"schiacciata contro il soffitto\"."], "Detto semplice: la saturazione"),

    { t: "sez", testo: "8 · Inseguitore di tensione (buffer)" },
    facile([
      "Il buffer è un <b>pappagallo</b>: ripete esattamente quello che sente, $v_o=v_i$.",
      "Sembra inutile, ma è un pappagallo speciale: <b>ascolta senza disturbare</b> (non prende corrente da chi parla, $R_i=\\infty$) e poi <b>ripete a voce altissima</b> (dà al carico tutta la corrente che serve, $R_o=0$).",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("buffer", 20) },
      { t: "box", tipo: "memo", righe: ["$$v_o=v_i,\\quad G=1$$"] },
      { t: "box", tipo: "passi", titolo: "Dimostrazione", righe: [
        "l'uscita è collegata direttamente al $-$: $v_-=v_o$",
        "il segnale è sul $+$: $v_+=v_i$",
        "CCV(a): $v_-=v_+$ → $v_o=v_i$",
        "oppure: non invertente con $R_2=0$ e $R_1=\\infty$ → $G=1+\\frac{0}{\\infty}=1$",
      ] },
    ], dx: [
      { t: "p", testo: "<b>Retroazione unitaria</b>: tutta l'uscita torna all'ingresso." },
      { t: "p", testo: "<b>A cosa serve</b>: non amplifica la tensione, ma ha $R_i=\\infty$ e $R_o=0$. È un <b>adattatore d'impedenza</b>: il circuito a monte lavora a vuoto (non gli si chiede corrente), la corrente al carico la dà l'operazionale. Il guadagno di corrente è maggiore di 1." },
      { t: "box", titolo: "Esempio: partitore con carico", righe: [
        "$V_{CC}=12$ V, $R_1=R_2=10$ kΩ: a vuoto $V=6$ V",
        "carico $R_L=10$ kΩ su $R_2$: $R_2\\parallel R_L=5$ kΩ",
        "$V=12\\cdot\\frac{5}{10+5}=4$ V: il carico \"abbassa\" la tensione",
        "con il buffer in mezzo il partitore resta a vuoto: sul carico 6 V",
      ] },
      facile(["Senza buffer il carico \"beve\" corrente dal partitore e la tensione cala da 6 a 4 V. Con il buffer il partitore non dà corrente a nessuno e resta a 6 V; la corrente per il carico la mette l'operazionale, prendendola dall'alimentazione."], "Detto semplice: l'esempio"),
    ] },

    { t: "sez", testo: "9 · Sommatore invertente" },
    facile([
      "Più rubinetti che versano nello <b>stesso secchio</b>. Ogni ingresso manda verso il $-$ (fermo a 0 V) una corrente $\\frac{v_k}{R_k}$.",
      "Nel $-$ non entra niente, quindi tutte le correnti si sommano e passano in $R_2$. L'uscita deve \"tirarle via\", quindi diventa la <b>somma, cambiata di segno</b>.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("sommatore_inv", 26) },
      { t: "box", tipo: "memo", righe: [
        "$$v_o=-R_2\\left(\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}\\right)$$",
        "tutte uguali a $R$: $v_o=-(v_a+v_b)$",
        "$n$ ingressi: $v_o=-R_2\\sum\\frac{v_k}{R_{1k}}$",
      ] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione (appunti del 24/10)", righe: [
        "ipotesi: l'operazionale lavora in zona lineare",
        "CCV(a): $v_-=0$ (massa virtuale)",
        "Ohm: $i_a=\\frac{v_a}{R_{1a}}$, $i_b=\\frac{v_b}{R_{1b}}$, $i_2=\\frac{v_o}{R_2}$",
        "Kirchhoff al nodo $v_-$ ($i_-=0$): $i_a+i_b+i_2=0$",
        "$\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}+\\frac{v_o}{R_2}=0$",
        "$v_o=-R_2\\left(\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}\\right)$",
      ] },
      { t: "box", titolo: "Esempio passo per passo", righe: [
        "$v_a=1$ V, $v_b=0{,}5$ V, tutte le resistenze da 10 kΩ",
        "$i_a=\\frac{1}{10\\,000}=100\\ \\mu$A, $i_b=\\frac{0{,}5}{10\\,000}=50\\ \\mu$A",
        "in $R_2$ passano $100+50=150\\ \\mu$A",
        "$v_o=-150\\ \\mu\\text{A}\\cdot10\\text{ k}\\Omega=-1{,}5$ V $=-(1+0{,}5)$ ✓",
      ] },
    ] },
    { t: "p", testo: "<b>Caratteristiche</b>: • somma <b>pesata</b> (ogni ingresso conta in base alla sua resistenza) e cambiata di segno • resistenza d'ingresso di ogni ingresso: $R_{1a}$ e $R_{1b}$ (perché $v_-=0$): gli ingressi non si disturbano a vicenda • $R_o=0$ • si possono aggiungere ingressi, ma in $R_2$ passa la somma di tutte le correnti d'ingresso, che viene tolta alla corrente disponibile per il carico • per non saturare bisogna controllare il caso peggiore: tutti gli ingressi al massimo e con lo stesso segno • usi: mixer audio, media di più segnali." },
    facile(["Perché gli ingressi non si disturbano: il $-$ sta <b>sempre</b> a 0 V, qualunque cosa facciano gli altri. Quindi la corrente di un ingresso dipende solo dalla sua tensione e dalla sua resistenza, come rubinetti attaccati a tubi separati."], "Detto semplice: ingressi indipendenti"),
    { t: "box", titolo: "Esempio: laboratorio del 3/10", righe: [
      "$R_f=100$ kΩ, $R_1=R_2=33$ kΩ → $v_o=-\\frac{100}{33}(v_1+v_2)\\approx-3(v_1+v_2)$",
      "$v_1$ triangolare 2 V pp, $v_2$ triangolare 1 V pp, 1 kHz, in fase: somma 3 V pp → uscita circa 9 V pp, capovolta",
    ] },

    { t: "sez", testo: "10 · Sommatore non invertente" },
    facile([
      "Le due resistenze uguali sul $+$ fanno la <b>media</b> dei due ingressi, come la media di due voti.",
      "Poi la media entra in un <b>non invertente</b> (§6), che la moltiplica per $1+\\frac{R_2}{R_1}$.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("sommatore_non_inv", 26) },
      { t: "box", tipo: "memo", righe: [
        "$$v_o=\\frac{v_a+v_b}{2}\\left(1+\\frac{R_2}{R_1}\\right)$$",
        "$n$ ingressi: $v_o=\\frac{v_1+\\dots+v_n}{n}\\left(1+\\frac{R_2}{R_1}\\right)$",
      ] },
      { t: "p", testo: "Somma (o media) moltiplicata per una costante che dipende da $R_1$ e $R_2$." },
      { t: "box", titolo: "Esempio passo per passo", righe: [
        "$v_a=1$ V, $v_b=3$ V, $R_1=R_2=10$ kΩ",
        "media sul $+$: $v_+=\\frac{1+3}{2}=2$ V",
        "non invertente: $G=1+\\frac{10}{10}=2$ → $v_o=2\\cdot2=4$ V",
      ] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione (sovrapposizione degli effetti)", righe: [
        "$v_+=v_+'+v_+''$",
        "caso 1, $v_b=0$ (collegato a massa): le due $R$ uguali sono un partitore e il $+$ non assorbe corrente → $v_+'=\\frac{v_a}{2}$",
        "caso 2, $v_a=0$: allo stesso modo $v_+''=\\frac{v_b}{2}$",
        "$v_+=\\frac{v_a}{2}+\\frac{v_b}{2}=\\frac{1}{2}(v_a+v_b)$",
        "$v_+$ entra in un non invertente con $G=1+\\frac{R_2}{R_1}$:",
        "$v_o=\\frac{1}{2}(v_a+v_b)\\left(1+\\frac{R_2}{R_1}\\right)$",
      ] },
      facile(["\"Spengo $v_b$\" vuol dire che al posto del generatore metto un filo verso massa. Allora $v_a$ vede due resistenze uguali in serie verso massa e sul punto di mezzo arriva <b>metà</b> della sua tensione."], "Detto semplice: spegnere un ingresso"),
    ] },
    { t: "p", testo: "<b>Caratteristiche</b>: • resistenza d'ingresso di un ingresso: la sua $R$ più il parallelo delle altre $n-1$ (con due ingressi: $2R$) • si preferisce l'<b>invertente</b>, perché qui le resistenze interne dei generatori si influenzano a vicenda • con $R_2=0$ e $R_1$ tolta diventa un buffer che dà la media $\\frac{v_a+v_b}{2}$." },

    { t: "sez", testo: "11 · Amplificatore differenziale a uno stadio" },
    facile([
      "È una <b>bilancia</b>: guarda i due piatti ($v_{i+}$ e $v_{i-}$) e amplifica solo la <b>differenza</b> di peso.",
      "Se sui due piatti metti la stessa cosa, l'uscita è 0, anche se è tanta. Conta solo quanto uno è più pesante dell'altro.",
      "Dentro è un invertente e un non invertente insieme: $v_{i-}$ entra come in un invertente (§7), $v_{i+}$ come in un non invertente (§6). Uno spinge giù, l'altro su: si sottraggono.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("differenziale", 27) },
      { t: "box", tipo: "memo", righe: [
        "$$v_o=\\frac{R_2}{R_1}(v_{i+}-v_{i-})$$",
        "amplifica la <b>differenza</b> tra i due ingressi",
      ] },
      { t: "box", titolo: "Esempio passo per passo", righe: [
        "$R_1=10$ kΩ, $R_2=50$ kΩ, $v_{i+}=1{,}2$ V, $v_{i-}=1$ V",
        "differenza: $1{,}2-1=0{,}2$ V; guadagno $\\frac{50}{10}=5$",
        "$v_o=5\\cdot0{,}2=1$ V",
        "con $v_{i+}=v_{i-}=5$ V: $v_o=5\\cdot0=0$",
      ] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione (sovrapposizione)", righe: [
        "$v_{i+}=0$: il $+$ è a massa attraverso le resistenze → invertente: $v_o'=-\\frac{R_2}{R_1}v_{i-}$",
        "$v_{i-}=0$: partitore sul $+$ ($i_+=0$): $v_+=v_{i+}\\frac{R_2}{R_1+R_2}$",
        "non invertente: $v_o''=v_+\\left(1+\\frac{R_2}{R_1}\\right)$",
        "$=v_{i+}\\frac{R_2}{R_1+R_2}\\cdot\\frac{R_1+R_2}{R_1}=\\frac{R_2}{R_1}v_{i+}$",
        "$v_o=v_o'+v_o''=\\frac{R_2}{R_1}(v_{i+}-v_{i-})$",
      ] },
      facile(["Il partitore sul $+$ serve a rendere <b>uguali</b> i due guadagni: senza, $v_{i+}$ verrebbe moltiplicato per $1+\\frac{R_2}{R_1}$ e $v_{i-}$ per $\\frac{R_2}{R_1}$, e la bilancia sarebbe truccata."], "Detto semplice: perché le resistenze uguali a coppie"),
    ] },
    { t: "p", testo: "<b>Caratteristiche</b>: • il libro dà $R_i=R_1+R_2$ per entrambi gli ingressi (per l'ingresso $+$ è sempre così; per il $-$ vale con i due ingressi pilotati insieme, se il $+$ è a massa il $-$ vede solo $R_1$) • se le resistenze non sono <b>uguali a coppie</b>, $v_o$ dipende anche dal valor medio degli ingressi (tensione di modo comune) • per cambiare il guadagno bisogna cambiare insieme una coppia di resistori • usi: fare la differenza tra due segnali, amplificare segnali non riferiti a massa (ponte di Wheatstone)." },

    { t: "sez", testo: "12 · Convertitore corrente → tensione (I→V)" },
    facile([
      "Trasforma \"quanta acqua passa\" (corrente) in \"quanto è alto il livello\" (tensione).",
      "La corrente d'ingresso non può entrare nell'operazionale, quindi passa <b>tutta in $R$</b>. L'uscita si mette alla tensione che serve per farla passare: $R\\cdot i_i$, con il segno meno perché il $-$ sta a 0 V e la corrente va verso l'uscita.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("corrente_tensione", 24) },
      { t: "box", tipo: "memo", righe: ["$$v_o=-R\\,i_i$$"] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione", righe: [
        "CCV(a): $v_-=v_+=0$",
        "corrente in $R$: $i_R=\\frac{v_o-0}{R}=\\frac{v_o}{R}$",
        "Kirchhoff al nodo $v_-$ ($i_-=0$): $i_i+i_R=0$",
        "$i_i+\\frac{v_o}{R}=0$ → $v_o=-R\\,i_i$",
      ] },
    ] },
    { t: "p", testo: "<b>Caratteristiche</b>: • uscita proporzionale alla corrente d'ingresso, costante $R$ • segno meno: corrente entrante → $v_o$ negativa • la corrente d'ingresso passa in $R$ e arriva all'uscita, quindi toglie corrente al carico • $R$ va scelta perché alla corrente massima l'uscita non saturi • per avere $v_o\\neq0$ con $i_i=0$ (o il contrario) si aggiunge un resistore dal $-$ a $-V_{CC}$, che toglie una corrente fissa • serve per i <b>trasduttori con uscita in corrente</b>, senza caricarli: il trasduttore \"vede\" un punto a 0 V e la sua corrente non cambia." },
    { t: "box", titolo: "Esempio", righe: [
      "trasduttore da 0 a 1 mA, voglio da 0 a 10 V: $R=\\frac{10\\text{ V}}{1\\text{ mA}}=10$ kΩ",
      "con 0,5 mA: $v_o=-10\\text{ k}\\Omega\\cdot0{,}5\\text{ mA}=-5$ V",
      "l'uscita va da 0 a $-10$ V: per renderla positiva si mette dopo un invertente con $G=-1$ ($R_1=R_2=10$ kΩ)",
    ] },

    { t: "sez", testo: "13 · Convertitore tensione → corrente (V→I), carico fuori massa" },
    { t: "p", testo: "Un convertitore V→I fa passare nel carico una corrente <b>proporzionale alla tensione d'ingresso</b> e <b>indipendente dal carico</b>. Ne esistono due: carico fuori massa (nessun capo a massa) e carico riferito a massa." },
    facile([
      "È il contrario del §12: vogliamo una corrente che <b>non cambia</b> anche se cambia il carico, come una pompa che spinge sempre la stessa quantità d'acqua, qualunque tubo ci attacchi.",
      "L'operazionale aggiusta l'uscita finché su $R_1$ c'è proprio $v_i$ (regola d'oro 1). Quindi in $R_1$ passa $\\frac{v_i}{R_1}$. Il carico è <b>in serie</b> con $R_1$ (nel $-$ non entra niente), quindi la stessa corrente passa nel carico.",
      "Se il carico cambia, l'operazionale cambia $v_o$ per mantenere la stessa corrente. Finché ce la fa: se servirebbe più di $V_{sat}$, satura.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("vi_fuori_massa", 26) },
      { t: "box", tipo: "memo", righe: [
        "$$i_L=\\frac{v_i}{R_1}$$",
        "non satura se $|v_i|<V_{sat}\\frac{R_1}{R_1+R_L}$",
      ] },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione", righe: [
        "$i_-=0$: nel resistore verso il $-$ non passa corrente, quindi non c'è caduta e $v_-$ è la tensione su $R_1$",
        "$v_-=i_L R_1$",
        "CCV(a): $v_-=v_+=v_i$ → $v_i=i_L R_1$ → $i_L=\\frac{v_i}{R_1}$",
      ] },
      { t: "box", tipo: "passi", titolo: "Condizione di non saturazione", righe: [
        "$v_o=i_L(R_L+R_1)=\\frac{v_i}{R_1}(R_1+R_L)$",
        "$|v_o|<V_{sat}$ → $|v_i|<V_{sat}\\frac{R_1}{R_1+R_L}$",
      ] },
    ] },
    { t: "box", titolo: "Esempio", righe: [
      "$R_1=1$ kΩ, $R_L=1$ kΩ, $v_i=2$ V: $i_L=\\frac{2}{1000}=2$ mA, $v_o=2\\text{ mA}\\cdot2\\text{ k}\\Omega=4$ V, va bene",
      "cambio il carico con $R_L=3$ kΩ: $i_L$ resta 2 mA, $v_o=2\\text{ mA}\\cdot4\\text{ k}\\Omega=8$ V: l'operazionale ha alzato l'uscita da solo",
      "limite con $V_{sat}=13$ V e $R_L=1$ kΩ: $|v_i|<13\\cdot\\frac{1}{2}=6{,}5$ V",
    ] },

    { t: "sez", testo: "14 · Convertitore V→I con carico riferito a massa" },
    facile([
      "Qui il carico ha un capo a <b>massa</b>, e il trucco del §13 non funziona più. Si usano due coppie di resistenze uguali ($R_1$, $R_1$ e $R_2$, $R_2$).",
      "L'idea: quello che l'uscita aggiunge da una parte viene tolto dall'altra. Nei conti $v_o$ compare una volta con il più e una volta con il meno e <b>sparisce</b>: la corrente nel carico dipende solo da $v_i$ e da $R_1$.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("vi_a_massa", 30) },
      { t: "box", tipo: "memo", righe: [
        "$$i_L=\\frac{v_i-v}{R_1}$$",
        "con C a massa ($v=0$): $i_L=\\frac{v_i}{R_1}$",
      ] },
      { t: "p", testo: "Le due $R_1$ e le due $R_2$ devono essere uguali. $v$ è una tensione opzionale sul punto C: se C non è a massa, l'ingresso è differenziale." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Dimostrazione", righe: [
        "nodo A ($v_-$, $i_-=0$): $\\frac{v-v_A}{R_1}+\\frac{v_o-v_A}{R_2}=0$ → $v_A\\left(\\frac{1}{R_1}+\\frac{1}{R_2}\\right)=\\frac{v}{R_1}+\\frac{v_o}{R_2}$",
        "nodo B ($v_+$, $i_+=0$): la corrente che arriva da $R_1$ e $R_2$ va tutta nel carico",
        "$\\frac{v_i-v_B}{R_1}+\\frac{v_o-v_B}{R_2}=i_L$ → $i_L=\\frac{v_i}{R_1}+\\frac{v_o}{R_2}-v_B\\left(\\frac{1}{R_1}+\\frac{1}{R_2}\\right)$",
        "CCV(a): $v_B=v_A$, quindi sostituisco la prima nella seconda:",
        "$i_L=\\frac{v_i}{R_1}+\\frac{v_o}{R_2}-\\frac{v}{R_1}-\\frac{v_o}{R_2}=\\frac{v_i-v}{R_1}$",
      ] },
      { t: "p", testo: "Guarda l'ultima riga: $+\\frac{v_o}{R_2}$ e $-\\frac{v_o}{R_2}$ si cancellano. È il momento in cui $v_o$ \"sparisce\", e succede <b>solo</b> se le resistenze sono uguali a coppie." },
    ] },
    { t: "p", testo: "<b>Non saturazione</b>: la tensione sul carico $i_LR_L$ è sul $+$, che (con C a massa) è l'ingresso di un non invertente con $G=1+\\frac{R_2}{R_1}$: $v_o=i_LR_L\\left(1+\\frac{R_2}{R_1}\\right)$ deve restare sotto $V_{sat}$. Conviene $R_1$ e $R_L$ dello stesso ordine di grandezza. <b>Usi</b> dei convertitori V→I: apparecchi che vogliono ingressi in corrente, trasmissione in ambienti rumorosi (linea a bassa impedenza, più immune ai disturbi)." },
    { t: "box", titolo: "Esempio", righe: [
      "$R_1=R_2=1$ kΩ, $R_L=500$ Ω, C a massa, $v_i=4$ V: $i_L=\\frac{4}{1000}=4$ mA",
      "$v_+=4\\text{ mA}\\cdot500\\ \\Omega=2$ V, $v_o=2\\cdot(1+1)=4$ V < 13 V: zona lineare",
    ] },

    { t: "sez", testo: "15 · L'operazionale reale: i parametri (appunti del 19/10 e del 24/10)" },
    facile(["L'operazionale vero è come un atleta vero: bravissimo, ma non perfetto. Ogni parametro dice <b>quanto</b> è lontano dall'operazionale ideale dei paragrafi precedenti."]),
    { t: "p", testo: "Gli operazionali veri si avvicinano molto a quelli ideali, ma non del tutto. Questi sono i parametri che lo descrivono, con la definizione e il valore tipico." },
    { t: "tab", intest: ["parametro", "definizione", "valore tipico"], larghezze: ["20%", "56%", "24%"], righe: [
      ["$R_i$ resistenza d'ingresso differenziale", "resistenza tra i due ingressi, ad anello aperto", "alcuni MΩ (BJT), quasi ∞ (FET)"],
      ["$V_{os}$ tensione di fuori-zero (offset)", "tensione da applicare agli ingressi perché l'uscita sia <b>nulla</b>", "da decine di μV ad alcuni mV"],
      ["$V_{OM}$ massima elongazione d'uscita", "massima $v_o$ senza saturazione né distorsione", "1÷2 V sotto $V_{CC}$"],
      ["$R_o$ resistenza d'uscita", "resistenza vista dall'uscita verso l'operazionale, ad anello aperto", "decine di Ω (appunti ~10 Ω)"],
      ["$I_{cc}$ corrente di cortocircuito", "massima corrente che l'uscita dà al carico", "decine di mA (appunti ~10 mA)"],
      ["$A_{OL}$ guadagno in catena aperta", "rapporto tra la tensione sul carico e quella d'ingresso che la produce, senza retroazione", "$10^5$ e oltre"],
      ["$SR$ slew rate", "massima velocità di variazione di $v_o$ con ingresso a onda quadra", "741: 0,5 V/μs"],
      ["$f_T$ frequenza di transizione", "frequenza a cui $A_{OL}$ scende a 1", "MHz"],
      ["$CMRR$", "rapporto tra guadagno differenziale e guadagno di modo comune", "circa 100 dB"],
      ["$GBP$", "prodotto guadagno × larghezza di banda, costante", "741: 1 MHz"],
    ] },

    { t: "sez", testo: "16 · Gli effetti dei parametri reali" },
    { t: "due", sx: [
      facile(["L'offset è come una <b>bilancia</b> che, vuota, segna già 2 grammi: anche con ingresso zero l'uscita non è zero. E il circuito amplifica anche questo errore, come se fosse un segnale vero."], "Detto semplice: l'offset"),
      { t: "box", tipo: "memo", titolo: "Offset in uscita", righe: [
        "$$V_{oo}=V_{os}\\left(1+\\frac{R_2}{R_1}\\right)$$",
      ] },
      { t: "p", testo: "Ad anello chiuso (invertente o non invertente) $V_{os}$ si comporta come un generatore sul $+$, amplificato come in un non invertente: anche con $v_i=0$ l'uscita non è zero. Si riduce tenendo basso $\\frac{R_2}{R_1}$, cioè il guadagno." },
    ], dx: [
      { t: "box", titolo: "Esempio", righe: ["$V_{os}=2$ mV, $R_2=100$ kΩ, $R_1=10$ kΩ: $V_{oo}=2\\cdot11=22$ mV"] },
      { t: "p", testo: "L'offset che resta si azzera con un <b>potenziometro</b> da 10 kΩ tra due piedini appositi (1 e 5 nel 741): è come la rotellina che riporta a zero la bilancia." },
      { t: "box", tipo: "occhio", titolo: "Perché $1+\\frac{R_2}{R_1}$ anche nell'invertente", righe: [
        "$V_{os}$ sta \"dentro\" il $+$, non arriva da $R_1$: per lui il circuito è sempre un non invertente, qualunque sia la configurazione.",
      ] },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Resistenza d'uscita ad anello chiuso", righe: [
        "$$R_{out}=\\frac{R_o}{A_{OL}}\\left(1+\\frac{R_2}{R_1}\\right)$$",
        "$R_o$ = anello aperto, $R_{out}$ = anello chiuso",
      ] },
      { t: "p", testo: "La retroazione la riduce di moltissimo. Esempio: 741 con $R_o=75$ Ω, $A_{OL}=2\\cdot10^5$, $G=11$: $R_{out}=\\frac{75}{2\\cdot10^5}\\cdot11\\approx4$ mΩ, praticamente 0. Il motivo: se il carico abbassa l'uscita, la retroazione se ne accorge e la rialza subito." },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "CMRR", righe: [
        "$G_{CM}=\\frac{v_o}{v_{CM}}$ con $v_{CM}=\\frac{v_++v_-}{2}$",
        "$CMRR=\\frac{A_{OL}}{G_{CM}}$, $CMRR_{dB}=20\\log_{10}\\frac{A_{OL}}{G_{CM}}$",
      ] },
      { t: "p", testo: "Misura quanto l'operazionale <b>ignora</b> la parte comune ai due ingressi (il loro valor medio) e amplifica solo la differenza. Più è alto, meglio è. Esempio, 741 con 90 dB: $G_{CM}=\\frac{2\\cdot10^5}{10^{90/20}}\\approx6{,}3$." },
      facile(["Come capire una persona che ti parla in una stanza rumorosa: il rumore di fondo arriva uguale a tutte e due le orecchie e il cervello lo ignora. Più il CMRR è alto, meglio l'operazionale \"ignora il rumore\"."], "Detto semplice: il CMRR"),
    ] },

    { t: "sez", testo: "17 · Slew rate" },
    facile([
      "Lo slew rate è la <b>velocità massima</b> dell'uscita, come l'accelerazione massima di un'auto: non può passare da 0 a 100 all'istante.",
      "Se il segnale chiede all'uscita di cambiare più in fretta di così, l'uscita resta indietro e il segnale si <b>deforma</b>: un'onda quadra diventa un trapezio, una sinusoide un triangolo.",
      "Più il segnale è <b>alto</b> (grande $V_{OM}$) e <b>veloce</b> (grande $f$), più l'uscita deve correre: per questo nella formula ci sono tutti e due.",
    ]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: [
        "$$SR=\\frac{\\Delta v_o}{\\Delta t}\\ \\to\\ SR=\\frac{dv_o}{dt}$$",
        "si misura in V/μs",
        "$$SR=V_{OM}\\cdot2\\pi f\\quad\\Rightarrow\\quad f_{max}=\\frac{SR}{2\\pi V_{OM}}$$",
      ] },
      { t: "p", testo: "È la <b>massima velocità</b> con cui l'uscita riesce a cambiare, misurata con un ingresso a onda quadra (passaggio da saturazione positiva a negativa) nella connessione a inseguitore. Se il segnale richiederebbe di cambiare più in fretta, l'uscita non ce la fa e il segnale si <b>distorce</b>." },
    ], dx: [
      { t: "box", tipo: "passi", titolo: "Da dove viene $SR=V_{OM}2\\pi f$", righe: [
        "uscita sinusoidale: $v_o=V_{OM}\\sin(2\\pi ft)$",
        "pendenza = derivata: $\\frac{dv_o}{dt}=2\\pi f\\,V_{OM}\\cos(2\\pi ft)$",
        "è massima dove il seno passa per lo zero, $t=0$, con $\\cos0=1$:",
        "$\\left.\\frac{dv_o}{dt}\\right|_{max}=2\\pi f\\,V_{OM}$",
        "per non distorcere non deve superare lo $SR$",
      ] },
      { t: "box", titolo: "Esempi con il 741 ($SR=0{,}5$ V/μs)", righe: [
        "$0{,}5$ V/μs vuol dire: in 1 μs l'uscita sale al massimo di mezzo volt",
        "sinusoide in uscita con $V_{OM}=10$ V: $f_{max}=\\frac{0{,}5\\cdot10^6}{2\\pi\\cdot10}\\approx8$ kHz",
        "salto da $-10$ V a $+10$ V: $\\Delta t=\\frac{20}{0{,}5}=40$ μs",
      ] },
    ] },

    { t: "sez", testo: "18 · Prodotto guadagno-larghezza di banda (GBP)" },
    facile([
      "La <b>banda</b> è l'insieme delle frequenze che l'amplificatore riesce ad amplificare bene; oltre, il guadagno cala.",
      "Guadagno e banda sono come una <b>coperta corta</b>: se la tiri da una parte (più guadagno) si scopre l'altra (meno banda). Il loro prodotto resta sempre lo stesso.",
    ]),
    { t: "due", sx: [
      { t: "p", testo: png("gbp", 28) },
      { t: "box", tipo: "memo", righe: [
        "$$GBP=A_{OL}\\cdot B=f_T$$",
        "$$A_{OL}f_H=G_1f_{H1}=f_T$$",
      ] },
    ], dx: [
      { t: "p", testo: "Il guadagno $A_{OL}$ resta costante fino alla frequenza di taglio $f_H$, poi scende di <b>−20 dB/decade</b> (diventa 10 volte più piccolo ogni volta che la frequenza diventa 10 volte più grande) fino a 1 alla frequenza di transizione $f_T$." },
      { t: "p", testo: "La banda va da $f_1$ a $f_2$: $B=f_2-f_1$. Per l'operazionale la banda parte dalla continua ($f_1=0$), quindi $B=f_H$, e il prodotto $A_{OL}\\cdot B$ è uguale a $f_T$." },
      { t: "p", testo: "<b>Significato pratico</b>: il prodotto è costante, quindi <b>meno guadagno = più banda</b>. Se un solo stadio non basta, si divide il guadagno su più stadi." },
      { t: "box", titolo: "Esempio con il 741 ($GBP=1$ MHz, $A_{OL}=2\\cdot10^5$)", righe: [
        "anello aperto: $f_H=\\frac{10^6}{2\\cdot10^5}=5$ Hz",
        "con $G=100$: $f_H=\\frac{10^6}{100}=10$ kHz; con $G=10$: 100 kHz",
      ] },
    ] },

    { t: "sez", testo: "19 · Tutte le formule in una tabella" },
    { t: "tab", intest: ["circuito", "relazione", "da ricordare"], larghezze: ["26%", "40%", "34%"], righe: [
      ["non invertente", "$G=1+\\frac{R_2}{R_1}$", "in fase, $R_i=\\infty$"],
      ["invertente", "$G=-\\frac{R_2}{R_1}$", "180°, $R_i=R_1$"],
      ["buffer", "$v_o=v_i$", "adatta l'impedenza"],
      ["sommatore invertente", "$v_o=-R_2\\left(\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}\\right)$", "somma pesata"],
      ["sommatore non invertente", "$v_o=\\frac{v_a+v_b}{2}\\left(1+\\frac{R_2}{R_1}\\right)$", "media × G"],
      ["differenziale", "$v_o=\\frac{R_2}{R_1}(v_{i+}-v_{i-})$", "resistenze uguali a coppie"],
      ["I → V", "$v_o=-R\\,i_i$", "trasduttori in corrente"],
      ["V → I fuori massa", "$i_L=\\frac{v_i}{R_1}$", "$|v_i|<V_{sat}\\frac{R_1}{R_1+R_L}$"],
      ["V → I a massa", "$i_L=\\frac{v_i-v}{R_1}$", "$R_1$ e $R_2$ uguali a coppie"],
      ["offset", "$V_{oo}=V_{os}\\left(1+\\frac{R_2}{R_1}\\right)$", "abbassare il guadagno"],
      ["slew rate", "$SR=2\\pi fV_{OM}$", "oltre $f_{max}$ distorce"],
      ["GBP", "$A_{OL}f_H=Gf_{H1}=f_T$", "meno guadagno, più banda"],
    ] },

    { t: "sez", testo: "20 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["58%", "42%"], righe: [
      ["Cos'è un operazionale? Disegna il simbolo e di' a cosa servono i terminali", "§2"],
      ["Quali sono le caratteristiche dell'operazionale ideale?", "§3"],
      ["Disegna e spiega la caratteristica di trasferimento", "§4"],
      ["Cos'è il cortocircuito virtuale e perché vale?", "§5"],
      ["Disegna il non invertente e dimostra il guadagno", "§6"],
      ["Disegna l'invertente, dimostra il guadagno e la resistenza d'ingresso", "§7"],
      ["Qual è il massimo segnale d'ingresso senza saturare?", "§6, §7: $V_{sat}/|G|$"],
      ["A cosa serve il buffer?", "§8"],
      ["Dimostra il sommatore invertente / non invertente", "§9, §10"],
      ["Dimostra il differenziale; perché le resistenze vanno uguali a coppie?", "§11"],
      ["Come si trasforma una corrente in tensione e viceversa?", "§12, §13, §14"],
      ["Cos'è la tensione di offset e come si riduce?", "§15, §16"],
      ["Definisci slew rate, CMRR e GBP", "§15, §16, §17, §18"],
    ] },

    { t: "sez", testo: "21 · Correzioni agli appunti" },
    { t: "p", testo: "• <b>30/9</b>: sullo schema c'è ±15 V e nei dati ±12 V; l'alimentazione è una sola (±12 V o ±15 V), e $V_{sat}$ sta 1÷2 V sotto. Nel testo \"$V_{in,max}=+\\frac{V_{sat}}{A_v}$\" va con il modulo: $|V_{in,max}|=\\frac{V_{sat}}{|G|}$.<br>• <b>3/10 pt. 2</b>: nella dimostrazione del non invertente le prime righe hanno $\\frac{0-v_i}{R_2}$, ma la corrente è quella in $R_1$: $\\frac{0-v_i}{R_1}=\\frac{v_i-v_o}{R_2}$. Il risultato $1+\\frac{R_2}{R_1}$ è giusto.<br>• <b>5/10</b>: il guadagno dell'invertente è $G=-\\frac{R_2}{R_1}$, con il <b>segno meno</b>.<br>• <b>8/10</b>: nel non invertente il segnale va sul $+$ e $R_1$ va dal $-$ a massa; nel disegno sul $+$ c'è scritto $V_{CC}$, ma lì va $v_i$.<br>• <b>12/10</b>: \"Fig 36A p. 334\" non corrisponde ai parametri reali, che sono nel paragrafo 5 del capitolo (pp. 286-293).<br>• <b>19/10</b>: la formula giusta è $V_{oo}=V_{os}\\left(1+\\frac{R_2}{R_1}\\right)$, non $\\frac{R_1}{R_2}$. Il campo \"da μV a mV\" è quello di $V_{os}$, non di $V_{oo}$.<br>• <b>24/10</b>: nel \"si vuole dimostrare\" del sommatore invertente manca il segno meno: $v_o=-R_2\\left(\\frac{v_a}{R_{1a}}+\\frac{v_b}{R_{1b}}\\right)$.<br>• <b>27/10</b>: l'appunto sul sensore di temperatura (10 mV/°C, 0 °C → 0 V) si ferma a \"si vuole studiare la condizione\": va completato." },
  ],
};
