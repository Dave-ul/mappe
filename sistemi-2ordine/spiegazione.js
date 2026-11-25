// Spiegazione dei sistemi del secondo ordine (Sistemi Automatici), nello stile "spiegato semplice" delle altre:
// basi all'inizio, riquadri gialli con un paragone, esempi passo per passo, errori in fondo.
// Fonti: libro, Unità H2, pagine 481-489 (foto della cartella di classe "5E collab" del 19/11, poi screenshot bsmart del 25/11
// in Fonti/Sistemi Automatici/Libri/.../Screenshot, doppie 35-39); quaderno Saber 5/11, 12/11, 13/11.
// Formule ed esempi controllati da verifica.py.
const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = {
  titolo: "Sistemi del secondo ordine",
  blocchi: [
    { t: "titolo", testo: "Sistemi del secondo ordine, spiegati semplice",
      sotto: "Sistemi Automatici · libro, Unità H2, e quaderno del 5/11 e 12/11 · giallo = detto semplice, per capire · bordo spesso = da sapere a memoria" },
    { t: "p", testo: "Come leggerla: prima il riquadro <b>giallo</b>, che spiega l'idea con un paragone; poi le formule nel riquadro a <b>bordo spesso</b>, che vanno sapute; poi gli <b>esempi</b> con i numeri, passo per passo. Il 13/11 il prof ha detto di leggere il libro: qui c'è tutto quello che dice, con le correzioni in fondo." },

    { t: "sez", testo: "1 · Prima di cominciare: f.d.t., poli, impulso e gradino" },
    { t: "tab", intest: ["parola", "cosa vuol dire"], larghezze: ["26%", "74%"], righe: [
      ["<b>funzione di trasferimento</b> $G(s)$", "uscita diviso ingresso, nel mondo di Laplace: $G(s)=\\frac{U(s)}{I(s)}$. Dice come il sistema trasforma qualunque ingresso"],
      ["<b>poli</b>", "i valori di $s$ che annullano il <b>denominatore</b> di $G(s)$. Decidono come si muove il sistema"],
      ["<b>impulso</b> unitario", "un colpo secco e brevissimo. In Laplace vale $I(s)=1$"],
      ["<b>gradino</b> unitario", "l'ingresso passa di colpo da 0 a 1 e resta lì (come accendere un interruttore). In Laplace vale $I(s)=\\frac1s$"],
      ["<b>ordine</b>", "il grado del denominatore: secondo ordine = c'è $s^2$"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Come si calcola una f.d.t.", righe: [
        "1. scrivo l'uscita in funzione dell'ingresso",
        "2. divido tutto per l'ingresso",
      ] },
    ], dx: [
      facile(["Dare un <b>impulso</b> è come dare un colpo a una campana e ascoltare come suona: il suono che senti dopo è la \"firma\" della campana. Per questo il libro studia prima la risposta all'impulso: con $I(s)=1$ l'uscita è proprio $G(s)$."]),
    ] },

    { t: "sez", testo: "2 · Perché il secondo ordine è importante" },
    { t: "due", sx: [
      { t: "p", testo: "Quasi tutti i sistemi reali <b>oscillano</b>, anche quelli che sembrano rigidi (un ponte, un palazzo). Le oscillazioni nascono quando ci sono <b>due componenti che accumulano energia</b> e se la passano a vicenda: un componente prende energia dall'altro, poi la restituisce, e così via." },
      { t: "p", testo: "L'<b>ordine</b> del sistema è il numero di accumulatori di energia indipendenti: con due, il sistema è del secondo ordine. I sistemi del secondo ordine descrivono la grande maggioranza dei sistemi reali." },
      { t: "tab", intest: ["sistema", "accumulatore 1", "accumulatore 2"], righe: [
        ["massa e molla", "molla (energia elastica)", "massa (energia cinetica e potenziale)"],
        ["circuito RLC", "condensatore $C$ (campo elettrico)", "induttanza $L$ (campo magnetico)"],
      ] },
    ], dx: [
      facile(["Un'<b>altalena</b>: in alto ha energia di posizione, in basso ha velocità. Le due energie si passano il testimone a ogni oscillazione. L'attrito dell'aria è lo <b>smorzamento</b>: a poco a poco l'altalena si ferma."]),
      { t: "box", tipo: "occhio", titolo: "Perché si studia (quaderno 5/11)", righe: [
        "Le sollecitazioni possono <b>danneggiare il sistema</b>: se una struttura entra in risonanza le oscillazioni crescono fino a romperla. Un buon sistema di controllo le tiene lontane.",
      ] },
    ] },

    { t: "sez", testo: "3 · I due numeri che contano: $\\xi$ e $\\omega_n$" },
    { t: "due", sx: [
      { t: "tab", intest: ["simbolo", "nome", "che cosa dice"], larghezze: ["19%", "28%", "53%"], righe: [
        ["$\\xi$ (csi)", "<b>smorzamento</b>", "quanto le oscillazioni vengono frenate dalle \"resistenze\" del sistema"],
        ["$\\omega_n$", "<b>pulsazione naturale</b>", "quanto veloce oscillerebbe il sistema lasciato libero, senza forze esterne (evoluzione libera)"],
      ] },
      { t: "p", testo: "Esempio del libro: tiro giù la massa appesa alla molla e la lascio. Si muove da sola alla sua pulsazione naturale $\\omega_n$. Se lo smorzamento è zero oscilla per sempre; altrimenti le oscillazioni calano fino a sparire." },
    ], dx: [
      facile(["Gli <b>ammortizzatori</b> dell'auto: $\\xi$ è quanto sono duri. Scarichi ($\\xi$ piccolo): dopo una buca l'auto saltella a lungo. Troppo duri ($\\xi$ grande): niente saltelli, ma l'auto torna a posto lentamente. $\\omega_n$ è il ritmo dei saltelli."]),
    ] },

    { t: "sez", testo: "4 · La forma generale e come leggerci $\\omega_n$, $\\xi$, $K$" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Forma generale", righe: [
        "$$G(s)=K\\,\\frac{\\omega_n^2}{s^2+2\\xi\\omega_n\\,s+\\omega_n^2}$$",
      ] },
      { t: "box", tipo: "passi", titolo: "Il metodo del libro", righe: [
        "0. controllo che davanti a $s^2$ ci sia 1 (se no divido tutto per quel numero)",
        "1. termine noto del denominatore $=\\omega_n^2$ → faccio la radice: $\\omega_n$",
        "2. coefficiente di $s$ $=2\\xi\\omega_n$ → $\\xi=\\frac{\\text{coefficiente}}{2\\,\\omega_n}$",
        "3. numeratore $=K\\omega_n^2$ → $K=\\frac{\\text{numeratore}}{\\omega_n^2}$",
      ] },
      facile(["È come riconoscere una persona da una foto segnaletica: la forma generale è la \"sagoma\", e basta confrontare il posto dei numeri per sapere chi è chi."]),
    ], dx: [
      { t: "box", titolo: "Esempio 3 del libro: $G(s)=\\frac{200}{s^2+50s+100}$", righe: [
        "1. $\\omega_n^2=100$ → $\\omega_n=10$",
        "2. $2\\xi\\omega_n=50$ → $\\xi=\\frac{50}{2\\cdot10}=2{,}5$",
        "3. $K=\\frac{200}{100}=2$",
        "quindi $G(s)=2\\,\\frac{10^2}{s^2+2\\cdot2{,}5\\cdot10\\,s+10^2}$",
      ] },
      { t: "box", titolo: "Esempio mio: $G(s)=\\frac{25}{s^2+4s+25}$", righe: [
        "1. $\\omega_n=\\sqrt{25}=5$ rad/s",
        "2. $\\xi=\\frac{4}{2\\cdot5}=0{,}4$",
        "3. $K=\\frac{25}{25}=1$",
      ] },
      { t: "box", tipo: "occhio", titolo: "Trappola", righe: [
        "Con $G(s)=\\frac{50}{2s^2+8s+50}$ prima divido tutto per 2: $\\frac{25}{s^2+4s+25}$. Se non lo faccio, $\\omega_n$ e $\\xi$ vengono sbagliati.",
      ] },
    ] },

    { t: "sez", testo: "5 · Il circuito RLC (esempio 4 del libro)" },
    { t: "due", sx: [
      { t: "p", testo: img("rlc", 26) },
      { t: "box", tipo: "passi", titolo: "Passaggi", righe: [
        "partitore con le impedenze $R$, $sL$, $\\frac{1}{sC}$:",
        "$V_C=V_i\\,\\frac{\\frac1{sC}}{R+sL+\\frac1{sC}}=\\frac{V_i}{s^2LC+sRC+1}$",
        "$G=\\frac{V_C}{V_i}=\\frac{1}{s^2LC+sRC+1}=\\frac{\\frac1{LC}}{s^2+\\frac RL\\,s+\\frac1{LC}}$",
        "confronto: $\\omega_n^2=\\frac1{LC}$, $2\\xi\\omega_n=\\frac RL$",
      ] },
    ], dx: [
      { t: "box", tipo: "memo", titolo: "RLC serie, uscita sul condensatore", righe: [
        "$$\\omega_n=\\frac{1}{\\sqrt{LC}}\\qquad \\xi=\\frac R2\\sqrt{\\frac CL}\\qquad K=1$$",
      ] },
      facile(["La resistenza è l'<b>attrito</b>: più $R$ è grande, più le oscillazioni tra $L$ e $C$ vengono frenate. $L$ e $C$ invece decidono il ritmo."]),
      { t: "box", titolo: "Esempio: $R=100\\,\\Omega$, $L=10$ mH, $C=1$ µF", righe: [
        "$\\omega_n=\\frac{1}{\\sqrt{10^{-2}\\cdot10^{-6}}}=\\frac{1}{10^{-4}}=10\\,000$ rad/s",
        "$\\xi=\\frac{100}{2}\\sqrt{\\frac{10^{-6}}{10^{-2}}}=50\\cdot10^{-2}=0{,}5$ → oscilla un po'",
        "smorzamento critico ($\\xi=1$) con $R=2\\sqrt{\\frac LC}=200\\,\\Omega$",
      ] },
    ] },

    { t: "salto" },
    { t: "sez", testo: "6 · I poli e i tre casi" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Poli", righe: [
        "$$p_{1,2}=-\\xi\\omega_n\\pm\\sqrt{\\xi^2\\omega_n^2-\\omega_n^2}$$",
        "$$p_{1,2}=\\omega_n\\left(-\\xi\\pm\\sqrt{\\xi^2-1}\\right)$$",
      ] },
      { t: "p", testo: "È la formula dell'equazione di secondo grado applicata al denominatore. Tutto dipende dal segno di $\\xi^2-1$, cioè da $\\xi$ rispetto a 1." },
    ], dx: [
      facile(["Il numero sotto la radice è il \"semaforo\": positivo → poli reali, niente oscillazioni; zero → poli uguali; negativo → poli complessi, il sistema oscilla."]),
    ] },
    { t: "tab", intest: ["$\\xi$", "poli", "risposta", "nome"], larghezze: ["11%", "33%", "30%", "26%"], righe: [
      ["$\\xi>1$", "reali, distinti e <b>negativi</b> (la radice è più piccola di $\\xi$)", "somma di due esponenziali che scendono, niente oscillazioni", "<b>sovrasmorzato</b>"],
      ["$\\xi=1$", "reali e coincidenti: $p=-\\xi\\omega_n$", "la più veloce senza oscillazioni", "<b>smorzamento critico</b>"],
      ["$0<\\xi<1$", "complessi coniugati: $\\omega_n\\left(-\\xi\\pm j\\sqrt{1-\\xi^2}\\right)$", "sinusoide smorzata: oscilla, ma si calma", "<b>sottosmorzato</b>"],
      ["$\\xi=0$", "immaginari puri", "oscillazioni che non finiscono mai", "<b>non smorzato</b>"],
      ["$\\xi<0$", "parte reale positiva", "oscillazioni sempre più grandi", "<b>divergente</b>, instabile"],
    ] },

    { t: "sez", testo: "7 · Risposta all'impulso" },
    { t: "due", sx: [
      { t: "p", testo: "Con l'impulso $I(s)=1$, quindi $U(s)=1\\cdot G(s)=G(s)$. Per tornare nel tempo il libro scompone in <b>fratti semplici</b>, $U(s)=\\frac{A}{s-p_1}+\\frac{B}{s-p_2}$, e antitrasforma (qui con $K=1$)." },
      { t: "box", tipo: "memo", titolo: "I tre casi", righe: [
        "$\\xi>1$: $\\;u(t)=A\\,e^{p_1t}+B\\,e^{p_2t}$",
        "$\\xi=1$: $\\;u(t)=\\omega_n^2\\,t\\,e^{-\\omega_n t}$",
        "$0<\\xi<1$: $\\;u(t)=\\frac{\\omega_n}{\\sqrt{1-\\xi^2}}\\,e^{-\\xi\\omega_n t}\\sin\\left(\\omega_n\\sqrt{1-\\xi^2}\\,t\\right)$",
        "tutte e tre tornano a 0",
      ] },
      { t: "box", tipo: "passi", titolo: "Da dove viene il caso $0<\\xi<1$ (dimostrazione del libro)", righe: [
        "residui: $A=\\frac{\\omega_n^2}{p_1-p_2}=\\frac{\\omega_n}{2j\\sqrt{1-\\xi^2}}$, $B=-A$",
        "$u=A\\,e^{p_1t}-A\\,e^{p_2t}=\\frac{\\omega_n}{\\sqrt{1-\\xi^2}}\\,e^{-\\xi\\omega_nt}\\cdot\\frac{e^{j\\omega_dt}-e^{-j\\omega_dt}}{2j}$",
        "con Eulero $\\frac{e^{jx}-e^{-jx}}{2j}=\\sin x$, e $\\omega_d=\\omega_n\\sqrt{1-\\xi^2}$",
      ] },
    ], dx: [
      { t: "p", testo: img("impulso", 46) },
      facile(["La sinusoide è la campana che suona; l'esponenziale $e^{-\\xi\\omega_n t}$ è il suono che si spegne. Più $\\xi$ è grande, prima si spegne."]),
    ] },

    { t: "sez", testo: "8 · Risposta al gradino unitario" },
    { t: "due", sx: [
      { t: "p", testo: img("risposte", 52) },
      { t: "p", testo: "La forma è la stessa dell'impulso, ma alla fine l'uscita <b>non torna a 0</b>: si ferma all'ampiezza del gradino (per $K$). Più $\\xi$ è piccolo, più la risposta è <b>pronta</b> ma <b>oscilla</b>; sopra 1 non oscilla ma è lenta (la curva rossa, $\\xi=0{,}707$, è un buon compromesso)." },
    ], dx: [
      facile(["Il quaderno del 12/11 lo riassume bene: <b>sottosmorzato</b> = pronto ma con sobbalzi, <b>critico</b> = il giusto, <b>sovrasmorzato</b> = tranquillo ma lento. Come entrare in un parcheggio: di corsa sbandando, giusto, oppure a passo d'uomo."]),
    ] },

    { t: "box", tipo: "memo", titolo: "Formula ($0<\\xi<1$, gradino unitario)", righe: [
      "$$u(t)=1-\\frac{1}{\\sqrt{1-\\xi^2}}\\,e^{-\\xi\\omega_n t}\\,\\sin\\left(\\omega_n\\sqrt{1-\\xi^2}\\,t+\\arctan\\frac{\\sqrt{1-\\xi^2}}{\\xi}\\right)$$",
    ] },

    { t: "sez", testo: "9 · Le specifiche della risposta al gradino" },
    { t: "due", sx: [
      { t: "p", testo: img("specifiche", 56) },
    ], dx: [
      { t: "tab", intest: ["simbolo", "nome", "definizione"], larghezze: ["19%", "32%", "49%"], righe: [
        ["$T_D$", "tempo di ritardo (delay)", "arriva al 50% del valore finale"],
        ["$T_R$", "tempo di salita (rise)", "passa dal 10% al 90% del valore finale"],
        ["$T_P$", "istante del picco", "quando c'è la sovraelongazione massima"],
        ["$T_S$", "tempo di assestamento (settling)", "da lì in poi resta nella fascia ±2% o ±5% di $U_F$"],
        ["$U_{max}$", "sovraelongazione massima", "il valore del picco"],
        ["$U_F$", "valore di regime", "dove si ferma"],
      ] },
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Formule", righe: [
        "$$T_P=\\frac{\\pi}{\\omega_n\\sqrt{1-\\xi^2}}\\qquad T_S=\\frac{3}{\\xi\\,\\omega_n}$$",
        "$$M_{max}\\%=\\frac{U_{max}-U_F}{U_F}\\cdot100=100\\,e^{-\\frac{\\pi\\xi}{\\sqrt{1-\\xi^2}}}$$",
        "$T_S=\\frac{3}{\\xi\\omega_n}$ vale per la fascia del <b>5%</b>; per il 2% si usa circa $\\frac{4}{\\xi\\omega_n}$",
      ] },
      facile(["La sovraelongazione dipende <b>solo da $\\xi$</b>: è quanto \"sbandi\" oltre il parcheggio. Il tempo di assestamento dipende da $\\xi\\omega_n$, cioè da quanto in fretta si spegne l'esponenziale."]),
    ], dx: [
      { t: "box", titolo: "Esempio: $G(s)=\\frac{25}{s^2+4s+25}$ ($\\omega_n=5$, $\\xi=0{,}4$)", righe: [
        "1. sottosmorzato, perché $0<0{,}4<1$",
        "2. $\\sqrt{1-0{,}4^2}=\\sqrt{0{,}84}=0{,}917$",
        "3. $T_P=\\frac{\\pi}{5\\cdot0{,}917}=0{,}69$ s",
        "4. $T_S=\\frac{3}{0{,}4\\cdot5}=1{,}5$ s",
        "5. $M_{max}\\%=100\\,e^{-\\frac{\\pi\\cdot0{,}4}{0{,}917}}=100\\,e^{-1{,}37}\\approx25\\%$",
        "6. $K=1$: col gradino unitario $U_F=1$ e $U_{max}\\approx1{,}25$",
      ] },
    ] },

    { t: "sez", testo: "10 · Esercizi del libro (Unità H2, esercitazioni)" },
    { t: "p", testo: "Gli esercizi alla fine dell'unità, svolti. Prova prima da solo coprendo la soluzione." },
    { t: "due", sx: [
      { t: "box", titolo: "Es. 1: poli, $\\omega_n$ e $\\xi$ di $\\frac{s+2}{s^3+2s^2+5s}$", righe: [
        "1. raccolgo $s$: $\\frac{s+2}{s\\,(s^2+2s+5)}$ → un polo in $p=0$",
        "2. $\\omega_n^2=5$ → $\\omega_n=\\sqrt5\\approx2{,}24$",
        "3. $2\\xi\\sqrt5=2$ → $\\xi=\\frac{1}{\\sqrt5}\\approx0{,}447$: sottosmorzato",
        "4. poli $p_{1,2}=-1\\pm j2$ (controllo: $\\omega_n(-\\xi\\pm j\\sqrt{1-\\xi^2})=-1\\pm j2$)",
      ] },
      { t: "box", titolo: "Es. 4: risposta all'impulso di $\\frac{16}{s^2+8s+16}$", righe: [
        "1. impulso: $U(s)=1\\cdot G(s)$",
        "2. $\\omega_n=4$, $\\xi=\\frac{8}{2\\cdot4}=1$: caso critico, $s^2+8s+16=(s+4)^2$",
        "3. $u(t)=\\mathcal L^{-1}\\left\\{\\frac{16}{(s+4)^2}\\right\\}=16\\,t\\,e^{-4t}$",
        "4. è la formula del caso $\\xi=1$: $\\omega_n^2\\,t\\,e^{-\\omega_n t}$",
      ] },
    ], dx: [
      { t: "box", titolo: "Es. 2-3: $R_1\\parallel L$ in serie, $R_2\\parallel C$ verso massa, uscita su $C$", righe: [
        "1. $Z_1=R_1\\parallel sL=\\frac{sLR_1}{sL+R_1}$, $\\;Z_2=R_2\\parallel\\frac{1}{sC}=\\frac{R_2}{1+sR_2C}$",
        "2. partitore: $G=\\frac{Z_2}{Z_1+Z_2}=\\frac{sR_2L+R_1R_2}{s^2LCR_1R_2+sL(R_1+R_2)+R_1R_2}$",
        "3. divido il denominatore per $LCR_1R_2$: $s^2+s\\frac{R_1+R_2}{CR_1R_2}+\\frac{1}{LC}$",
        "4. con $L=C=1$: $\\omega_n=1$ e $2\\xi=\\frac{R_1+R_2}{R_1R_2}$ → $\\xi=\\frac12\\cdot\\frac{1}{R_1\\parallel R_2}$",
        "5. $\\xi=1$ → $R_1\\parallel R_2=0{,}5$ → $R_1=R_2=1\\,\\Omega$",
      ] },
      { t: "box", tipo: "occhio", titolo: "Quesiti a scelta multipla", righe: [
        "<b>1.</b> b, d: due elementi reattivi <b>indipendenti</b>; $\\omega_n$ è la pulsazione del moto libero. Due condensatori in parallelo fanno un condensatore solo.",
        "<b>2.</b> a, d: $\\frac{16}{s^2+8s+16}$ ha $\\omega_n=4$ e $\\xi=1$, risposta critica (non oscilla).",
        "<b>3.</b> a, d: con $\\xi>1$ niente sovraelongazione; con $0<\\xi<1$ oscilla. Il 50% del regime è $T_D$, non il tempo di salita.",
      ] },
    ] },

    { t: "sez", testo: "11 · Domande tipiche" },
    { t: "tab", intest: ["domanda", "dove guardare"], larghezze: ["55%", "45%"], righe: [
      ["Perché un sistema oscilla? Cosa vuol dire secondo ordine?", "§2: due accumulatori di energia"],
      ["Cosa sono $\\xi$ e $\\omega_n$?", "§3"],
      ["Data $G(s)$, trova $\\omega_n$, $\\xi$ e $K$", "§4: metodo in 3 passi (prima $s^2$ con 1)"],
      ["Trova la f.d.t. di un RLC e i suoi parametri", "§5"],
      ["Come sono i poli al variare di $\\xi$?", "§6: tabella dei casi"],
      ["Disegna la risposta all'impulso / al gradino", "§7 e §8"],
      ["Definisci $T_D$, $T_R$, $T_P$, $T_S$, sovraelongazione", "§9"],
      ["Calcola $T_P$, $T_S$ e $M_{max}\\%$", "§9: formule ed esempio"],
      ["Quando il sistema è instabile?", "§6: $\\xi<0$, poli con parte reale positiva"],
      ["Esercizi del libro con le soluzioni", "§10"],
    ] },

    { t: "sez", testo: "12 · Correzioni agli appunti e al libro" },
    { t: "p", testo: "• <b>Quaderno 12/11, pagina 4</b>: accanto alla curva sottosmorzata c'è \"più instabile ma pronto\". Con $0<\\xi<1$ il sistema è <b>stabile</b> (la risposta si assesta): oscilla di più ed è meno smorzato, ma non è instabile. Instabile è solo con $\\xi<0$.<br>• <b>Libro</b>: dice che $T_S$ si misura con la fascia del 2% o del 5%, ma $T_S=\\frac{3}{\\xi\\omega_n}$ vale per il 5% (l'esponenziale scende al 5% dopo $\\frac{\\ln 20}{\\xi\\omega_n}\\approx\\frac{3}{\\xi\\omega_n}$); per il 2% serve circa $\\frac{4}{\\xi\\omega_n}$.<br>• <b>Libro</b>: \"la risposta allo scalino presenta esattamente le stesse caratteristiche della risposta all'impulso\" va preso con le pinze: il tipo di comportamento (smorzato o oscillante) dipende da $\\xi$ allo stesso modo, ma le curve sono diverse (il gradino sale e si ferma al valore finale, l'impulso torna a 0).<br>• <b>Libro, metodo per $\\omega_n$, $\\xi$, $K$</b>: funziona solo se il coefficiente di $s^2$ è 1; nell'esempio RLC il libro infatti divide prima per $LC$." },
  ],
};
