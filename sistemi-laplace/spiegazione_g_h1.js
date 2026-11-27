// Prima parte della spiegazione di Sistemi Automatici per l'interrogazione sui Moduli G e H:
// G1 trasformata, G2 antitrasformata, H1 funzioni di trasferimento e risposte, nello stile "spiegato semplice".
// La usa sistemi-2ordine/spiegazione.js, che aggiunge H2 (secondo ordine): un solo PDF per tutta l'interrogazione.
// Fonti: libro "Nuovo Corso di sistemi automatici" vol. 2 (Hoepli), screenshot bsmart doppie 2-7 (G1, pp. 414-424),
// 10-12 (G2, pp. 430-434), 18-26 (H1, pp. 446-463). Il quaderno di settembre-novembre non tratta questi argomenti.
// Esempi ed esercizi controllati da sistemi-laplace/verifica.py; grafici calcolati da sistemi-laplace/grafici.py.
// I percorsi delle immagini sono relativi a sistemi-2ordine/, dove genera_doc.js scrive l'HTML.
const img = (nome, alto) => `<img src="../sistemi-laplace/img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = [
  { t: "box", tipo: "passi", titolo: "Il filo dell'interrogazione (Moduli G e H)", righe: [
    "<b>G1</b> trasformata: cos'è, perché serve, tabella, teoremi, equazione differenziale → §1-5",
    "<b>G2</b> antitrasformata: fratti semplici con il sistema e con i residui → §6-7",
    "<b>H1</b> funzione di trasferimento, poli e zeri, due forme, risposte, sistemi idraulici e termici → §8-12",
    "<b>H2</b> secondo ordine: $\\xi$, $\\omega_n$, poli, risposte, specifiche, esercizi → §13-21",
    "<b>H3</b> schemi a blocchi: non c'è ancora (le pagine del libro non sono state catturate)",
  ] },

  // ------------------------------------------------------------------ G1
  { t: "sez", testo: "1 · G1 · Perché serve la trasformata di Laplace" },
  { t: "due", sx: [
    { t: "box", tipo: "memo", titolo: "Definizione", righe: [
      "$$F(s)=\\mathcal{L}\\{f(t)\\}=\\int_0^{\\infty}f(t)\\,e^{-st}\\,dt\\qquad s=\\alpha+j\\omega$$",
      "trasforma una funzione del <b>tempo</b> $f(t)$ in una funzione $F(s)$ della variabile complessa $s$",
      "inversa: $f(t)=\\mathcal{L}^{-1}\\{F(s)\\}$, l'<b>antitrasformata</b>",
      "è <b>biunivoca</b>: a ogni $f(t)$ corrisponde una sola $F(s)$, e viceversa",
    ] },
    { t: "p", testo: "L'integrale \"assorbe\" la $t$: alla fine resta una funzione della sola $s$. I valori di $f(t)$ per $t<0$ non contano, perché si integra da 0." },
  ], dx: [
    { t: "box", tipo: "passi", titolo: "Il percorso indiretto", righe: [
      "1. problema nel tempo $f(t)$ → $\\mathcal{L}$ → problema in $s$, $F(s)$",
      "2. in $s$ lo risolvo con l'algebra",
      "3. soluzione in $s$ → $\\mathcal{L}^{-1}$ → soluzione nel tempo",
    ] },
    facile(["È lo stesso trucco dei <b>logaritmi</b> (è l'esempio del libro): moltiplicare due numeri enormi è difficile, ma con i logaritmi la moltiplicazione diventa una somma. Faccio la somma, poi torno indietro con l'antilogaritmo. Laplace fa lo stesso con le funzioni: <b>derivate e integrali diventano moltiplicazioni e divisioni per $s$</b>, e un'equazione differenziale diventa un'equazione algebrica."]),
  ] },

  { t: "sez", testo: "2 · G1 · La tabella minima" },
  { t: "due", sx: [
    { t: "tab", intest: ["$f(t)$", "$F(s)$", "segnale"], larghezze: ["26%", "26%", "48%"], righe: [
      ["$1$", "$\\frac1s$", "<b>gradino</b> (scalino) di ampiezza 1"],
      ["$t$", "$\\frac1{s^2}$", "<b>rampa</b> di pendenza 1 (45°)"],
      ["$t^2$", "$\\frac2{s^3}$", "parabola: occhio al 2 sopra"],
      ["$t^n$", "$\\frac{n!}{s^{n+1}}$", "$n!=n(n-1)\\cdots2\\cdot1$"],
      ["$\\delta(t)$", "$1$", "<b>impulso</b>: area 1, base → 0, altezza → ∞"],
      ["$\\sin\\omega t$", "$\\frac{\\omega}{s^2+\\omega^2}$", "seno di pulsazione $\\omega$"],
      ["$\\cos\\omega t$", "$\\frac{s}{s^2+\\omega^2}$", "coseno"],
    ] },
  ], dx: [
    { t: "box", tipo: "passi", titolo: "L'unica dimostrazione del libro: $\\mathcal{L}\\{1\\}$", righe: [
      "$\\mathcal{L}\\{1\\}=\\int_0^{\\infty}1\\cdot e^{-st}\\,dt=\\left[-\\frac{e^{-st}}{s}\\right]_0^{\\infty}$",
      "$=0-\\left(-\\frac1s\\right)=\\frac1s$",
    ] },
    { t: "box", titolo: "Esempio 2 del libro: $\\mathcal{L}\\{t^3\\}$", righe: [
      "$n=3$: $\\;\\frac{3!}{s^{4}}=\\frac{3\\cdot2\\cdot1}{s^4}=\\frac{6}{s^4}$",
    ] },
    facile(["Le altre trasformate non servono a memoria: si ricavano da queste con i teoremi (§4). La tabella è come le tabelline: poche, ma da sapere al volo."]),
  ] },

  { t: "sez", testo: "3 · G1 · I teoremi" },
  { t: "tab", intest: ["teorema", "formula", "detto semplice"], larghezze: ["22%", "38%", "40%"], righe: [
    ["linearità", "$\\mathcal{L}\\{k_1f_1+k_2f_2\\}=k_1F_1+k_2F_2$", "le costanti escono, le somme si spezzano"],
    ["traslazione in $s$", "$\\mathcal{L}\\{f(t)\\,e^{kt}\\}=F(s-k)$", "tolgo $e^{kt}$, trasformo, poi metto $s-k$ al posto di $s$"],
    ["traslazione nel tempo (ritardo)", "$\\mathcal{L}\\{f(t-k)\\}=e^{-ks}\\,F(s)$", "un ritardo di $k$ secondi diventa \"$\\times e^{-ks}$\""],
    ["derivata", "$\\mathcal{L}\\left\\{\\frac{df}{dt}\\right\\}=sF(s)-f(0)$", "derivare = moltiplicare per $s$ (meno il valore iniziale)"],
    ["derivata seconda", "$s^2F(s)-s\\,f(0)-f'(0)$", "applico due volte la regola"],
    ["integrale", "$\\mathcal{L}\\left\\{\\int_0^t f\\,dt\\right\\}=\\frac{F(s)}{s}$", "integrare = dividere per $s$"],
    ["moltiplicazione per $t$", "$\\mathcal{L}\\{t\\,f(t)\\}=-\\frac{dF}{ds}$", "derivo rispetto a $s$ e cambio segno"],
    ["valore finale", "$\\lim_{t\\to\\infty}f(t)=\\lim_{s\\to0}s\\,F(s)$", "il valore <b>a regime</b> senza antitrasformare"],
    ["valore iniziale", "$\\lim_{t\\to0}f(t)=\\lim_{s\\to\\infty}s\\,F(s)$", "il valore all'istante 0"],
  ] },
  { t: "due", sx: [
    { t: "box", titolo: "Esempio 4 del libro: traslazione in $s$", righe: [
      "1. $\\mathcal{L}\\{t^2e^{-3t}\\}$: trasformo solo $t^2$ → $\\frac2{s^3}$; qui $k=-3$, quindi $s-k=s+3$ → $\\frac{2}{(s+3)^3}$",
      "2. $\\mathcal{L}\\{4t\\,e^{3t}\\}=4\\cdot\\frac{1}{(s-3)^2}=\\frac{4}{(s-3)^2}$",
      "3. al contrario: $\\mathcal{L}^{-1}\\left\\{\\frac{3}{s+1}\\right\\}=3e^{-t}$ e $\\mathcal{L}^{-1}\\left\\{\\frac{3}{(s+2)^2}\\right\\}=3t\\,e^{-2t}$",
      "4. $\\mathcal{L}^{-1}\\left\\{\\frac{\\tau}{1+s\\tau}\\right\\}=\\mathcal{L}^{-1}\\left\\{\\frac{1}{s+\\frac1\\tau}\\right\\}=e^{-t/\\tau}$",
    ] },
  ], dx: [
    { t: "box", titolo: "Esempio 6 del libro: valore finale", righe: [
      "$\\lim_{t\\to\\infty}t\\,e^{-kt}$ è una forma $\\infty\\cdot0$",
      "con il teorema: $\\lim_{s\\to0}s\\cdot\\frac{1}{(s+k)^2}=\\frac{0}{k^2}=0$",
    ] },
    facile(["Il <b>ritardo</b>: $f(t-k)$ è lo stesso disegno di $f(t)$ spostato a destra di $k$. Quello che $f$ faceva a $t=0$, $f(t-k)$ lo fa a $t=k$. Come un video fatto partire $k$ secondi dopo."]),
  ] },

  { t: "sez", testo: "4 · G1 · Nuove trasformate dai teoremi" },
  { t: "due", sx: [
    { t: "box", tipo: "passi", titolo: "$\\mathcal{L}\\{t\\}$ dal gradino, con la derivata", righe: [
      "1. $\\frac{d}{dt}t=1$, quindi $\\mathcal{L}\\left\\{\\frac{dt}{dt}\\right\\}=\\mathcal{L}\\{1\\}=\\frac1s$",
      "2. con il teorema: $\\mathcal{L}\\left\\{\\frac{dt}{dt}\\right\\}=s\\,F(s)-0$",
      "3. $s\\,F(s)=\\frac1s$ → $F(s)=\\frac1{s^2}$",
      "allo stesso modo $\\frac{d}{dt}t^2=2t$ → $\\mathcal{L}\\{t^2\\}=\\frac{2}{s^3}$",
    ] },
    { t: "box", tipo: "passi", titolo: "Esponenziale e seno/coseno", righe: [
      "$\\mathcal{L}\\{e^{kt}\\}=\\mathcal{L}\\{1\\cdot e^{kt}\\}=\\frac{1}{s-k}$ (traslazione in $s$)",
      "Eulero: $e^{\\pm j\\alpha}=\\cos\\alpha\\pm j\\sin\\alpha$",
      "$\\sin\\alpha=\\frac{e^{j\\alpha}-e^{-j\\alpha}}{2j}\\qquad\\cos\\alpha=\\frac{e^{j\\alpha}+e^{-j\\alpha}}{2}$",
      "$\\mathcal{L}\\{\\cos\\omega t\\}=\\frac12\\left(\\frac{1}{s-j\\omega}+\\frac{1}{s+j\\omega}\\right)=\\frac{s}{s^2+\\omega^2}$",
    ] },
  ], dx: [
    { t: "box", titolo: "Con il teorema della moltiplicazione per $t$", righe: [
      "$\\mathcal{L}\\{t^2\\}=\\mathcal{L}\\{t\\cdot t\\}=-\\frac{d}{ds}\\frac1{s^2}=\\frac{2}{s^3}$: stesso risultato",
    ] },
    { t: "box", titolo: "Una trasformata \"da tabella grande\"", righe: [
      "$\\mathcal{L}\\left\\{\\frac{e^{-at}-e^{-bt}}{b-a}\\right\\}=\\frac{1}{b-a}\\left(\\frac{1}{s+a}-\\frac{1}{s+b}\\right)$",
      "$=\\frac{1}{(s+a)(s+b)}$",
    ] },
    facile(["Il messaggio del libro: invece di imparare tabelle enormi, imparo bene la tabella minima e i teoremi, e mi costruisco il resto. Come in cucina: con pochi ingredienti base faccio tante ricette."]),
  ] },

  { t: "sez", testo: "5 · G1 · Risolvere un'equazione differenziale: il circuito RC" },
  { t: "due", sx: [
    { t: "box", tipo: "passi", titolo: "Carica di C con un gradino $E$, $v_C(0)=0$", righe: [
      "1. equazione: $\\tau\\,\\frac{dv_C}{dt}+v_C=E$",
      "2. trasformo (linearità + derivata): $\\tau\\left[s\\,V_C(s)-v_C(0)\\right]+V_C(s)=\\frac{E}{s}$",
      "3. algebra: $V_C(s)\\,(\\tau s+1)=\\frac Es$ → $V_C(s)=\\frac{E}{s\\,(\\tau s+1)}$",
      "4. fratti semplici (§6): $\\frac{E}{s(\\tau s+1)}=\\frac As+\\frac{B}{\\tau s+1}$ → $A=E$, $B=-E\\tau$",
      "5. antitrasformo: $v_C(t)=E-E\\,e^{-t/\\tau}=E\\left(1-e^{-t/\\tau}\\right)$",
    ] },
  ], dx: [
    { t: "p", testo: img("gradino_rc", 40) },
    facile(["Dopo $\\tau$ il condensatore è al 63% di $E$; dopo circa $5\\tau$ è praticamente carico. La retta rossa è la tangente all'inizio: arriva a $E$ proprio dopo $\\tau$."]),
  ] },

  // ------------------------------------------------------------------ G2
  { t: "sez", testo: "6 · G2 · Antitrasformata con il metodo del sistema" },
  { t: "p", testo: "Se $U(s)$ è un solo termine semplice, la tabella basta. Se è una frazione più complicata, la spezzo in <b>fratti semplici</b>, uno per ogni fattore del denominatore, con una costante sopra." },
  { t: "due", sx: [
    { t: "box", titolo: "Esempio del libro: $U(s)=\\frac{s+2}{(s+1)(s+3)}$", righe: [
      "1. scrivo $\\frac{s+2}{(s+1)(s+3)}=\\frac{A}{s+1}+\\frac{B}{s+3}$",
      "2. m.c.m.: $\\frac{A(s+3)+B(s+1)}{(s+1)(s+3)}=\\frac{(A+B)s+3A+B}{(s+1)(s+3)}$",
      "3. stessi coefficienti per ogni grado di $s$: $\\begin{cases}3A+B=2 & s^0\\\\ A+B=1 & s^1\\end{cases}$",
      "4. $A=\\frac12$, $B=\\frac12$",
      "5. $u(t)=\\frac12e^{-t}+\\frac12e^{-3t}$",
    ] },
  ], dx: [
    { t: "box", tipo: "memo", titolo: "Regole dei fratti", righe: [
      "polo semplice $p$ → $\\frac{A}{s-p}$",
      "polo di grado $n$ → $n$ fratti, dal grado $n$ a scendere fino a 1: $\\frac{A}{(s-p)^2}+\\frac{A_1}{s-p}$",
      "i numeratori sono uguali per <b>ogni</b> $s$ → coefficienti uguali grado per grado",
      "poli complessi: il metodo vale lo stesso; poi Eulero riporta a seni e coseni",
    ] },
    { t: "box", titolo: "Esempio 1 del libro: $U(s)=\\frac{2+s}{(s+1)^2\\,s}$", righe: [
      "1. $\\frac{A}{(s+1)^2}+\\frac{A_1}{s+1}+\\frac{B}{s}$ ($s+1$ è ripetuto due volte)",
      "2. sistema: $A_1+B=0$, $A+A_1+2B=1$, $B=2$ → $A_1=-2$, $A=-1$",
      "3. $u(t)=-t\\,e^{-t}-2e^{-t}+2$",
    ] },
  ] },

  { t: "sez", testo: "7 · G2 · Il metodo dei residui" },
  { t: "due", sx: [
    { t: "box", tipo: "memo", titolo: "Formula", righe: [
      "$$A=\\left[U(s)\\cdot(s-p)^n\\right]_{s=p}$$",
      "moltiplico $U(s)$ per il denominatore del fratto e sostituisco il polo",
      "fratto di grado $n-k$ dello stesso polo: derivo $k$ volte la parentesi, divido per $k!$, poi sostituisco",
      "oppure, trovati gli altri, uso un valore di $s$ comodo (per esempio $s=1$)",
    ] },
    facile(["Il residuo è un \"copri e sostituisci\": copro con il dito il fattore $(s-p)$ nel denominatore e metto $s=p$ in quello che resta. Ogni costante si trova da sola, senza sistema."]),
  ], dx: [
    { t: "box", titolo: "Stessi esempi, con i residui", righe: [
      "$A=\\left[\\frac{s+2}{s+3}\\right]_{s=-1}=\\frac{1}{2}$",
      "$B=\\left[\\frac{s+2}{s+1}\\right]_{s=-3}=\\frac{-1}{-2}=\\frac12$",
      "polo doppio: $A=\\left[\\frac{2+s}{s}\\right]_{s=-1}=-1$, $\\;B=\\left[\\frac{2+s}{(s+1)^2}\\right]_{s=0}=2$",
      "$A_1=\\left[\\frac{d}{ds}\\frac{2+s}{s}\\right]_{s=-1}=\\left[\\frac{-2}{s^2}\\right]_{s=-1}=-2$",
      "oppure con $s=1$: $\\frac34=-\\frac14+\\frac{A_1}{2}+2$ → $A_1=-2$",
    ] },
    { t: "box", tipo: "occhio", titolo: "Quando conviene", righe: [
      "residui: comodi con poli semplici; con poli multipli le derivate si allungano, e conviene il metodo misto (residui per i coefficienti di grado massimo, poi un $s$ comodo)",
    ] },
  ] },

  // ------------------------------------------------------------------ H1
  { t: "sez", testo: "8 · H1 · La funzione di trasferimento" },
  { t: "due", sx: [
    { t: "box", tipo: "memo", titolo: "Definizione", righe: [
      "$$G(s)=\\frac{U(s)}{I(s)}\\qquad\\Longrightarrow\\qquad U(s)=G(s)\\cdot I(s)$$",
      "rapporto tra uscita e ingresso trasformati, con condizioni iniziali nulle",
      "nel tempo il legame è <b>differenziale</b>; in $s$ diventa <b>algebrico</b>: posso disegnare il sistema come un <b>blocco</b> $I(s)\\to\\boxed{G(s)}\\to U(s)$",
    ] },
    { t: "tab", intest: ["componente", "nel tempo", "in $s$ (impedenza)"], righe: [
      ["resistore", "$v=R\\,i$", "$R$"],
      ["condensatore", "$i=C\\,\\frac{dv}{dt}$", "$\\frac{1}{sC}$"],
      ["induttore", "$v=L\\,\\frac{di}{dt}$", "$sL$"],
    ] },
  ], dx: [
    facile(["$G(s)$ è la \"carta d'identità\" del sistema: conoscendola, per <b>qualunque</b> ingresso trovo l'uscita con una moltiplicazione. E sistemi complicati diventano blocchi da collegare, come i mattoncini."]),
    { t: "box", tipo: "passi", titolo: "Come si calcola (circuito RC)", righe: [
      "1. calcolo l'uscita con le leggi delle reti (partitore, paralleli), usando le impedenze",
      "$V_C=E\\,\\frac{\\frac1{sC}}{R+\\frac1{sC}}=\\frac{E}{1+sRC}$",
      "2. divido per l'ingresso: $G(s)=\\frac{V_C}{E}=\\frac{1}{1+\\tau s}$, con $\\tau=RC$",
    ] },
  ] },
  { t: "box", titolo: "Esempio 1 del libro: $R$ in serie, poi $sL\\parallel R$; ingresso $V_i$, uscita la corrente $I_R$", righe: [
    "1. parallelo: $Z=\\frac{sL\\,R}{sL+R}$; partitore: $V_R=V_i\\,\\frac{Z}{Z+R}=V_i\\,\\frac{sL}{2sL+R}$",
    "2. corrente: $I_R=\\frac{V_R}{R}=V_i\\,\\frac{sL}{R\\,(2sL+R)}$",
    "3. $G(s)=\\frac{I_R}{V_i}=\\frac{sL}{R\\,(R+2sL)}=\\frac{1}{R}\\cdot\\frac{s\\frac LR}{2s\\frac LR+1}$ (il libro dimentica il $\\frac1R$: vedi le correzioni in fondo)",
  ] },

  { t: "sez", testo: "9 · H1 · Poli, zeri e le due forme" },
  { t: "due", sx: [
    { t: "box", tipo: "memo", titolo: "Poli e zeri", righe: [
      "<b>poli</b> $p$: radici del <b>denominatore</b> di $G(s)$",
      "<b>zeri</b> $z$: radici del <b>numeratore</b>",
      "esempio 2: $\\frac{(s+5)(s-2)}{(s+1)(s+2)(s+3)}$ → zeri $-5$ e $2$, poli $-1$, $-2$, $-3$",
      "occhio: nella parentesi il polo compare <b>col segno cambiato</b>: $(s+2)$ → $p=-2$",
    ] },
    { t: "box", tipo: "memo", titolo: "Le due forme", righe: [
      "poli e zeri: $G=\\mu\\,\\frac{(s-z_1)\\cdots(s-z_m)}{s^g\\,(s-p_1)\\cdots}$ → coefficiente di $s$ sempre 1",
      "costanti di tempo: $G=K\\,\\frac{(1+T_1s)\\cdots}{s^g\\,(1+\\tau_1s)\\cdots}$ → termine noto sempre 1",
      "$g$ = numero di poli nulli; $K$ = <b>guadagno statico</b>",
      "$p=-\\frac1\\tau$, $\\;z=-\\frac1T$: inverso della costante di tempo, segno cambiato",
    ] },
  ], dx: [
    { t: "box", titolo: "Esempio 4: costanti di tempo → poli e zeri", righe: [
      "$\\frac{1}{1+\\tau s}=\\frac{1}{\\tau\\left(s+\\frac1\\tau\\right)}$: raccolgo $\\tau$ → $\\mu=\\frac1\\tau$, $p=-\\frac1\\tau$",
    ] },
    { t: "box", titolo: "Esempio 5: poli e zeri → costanti di tempo", righe: [
      "$\\frac{s+1}{(s+0{,}5)(s+0{,}25)}=\\frac{s+1}{0{,}5\\left(\\frac{s}{0{,}5}+1\\right)\\cdot0{,}25\\left(\\frac{s}{0{,}25}+1\\right)}$",
      "$=8\\,\\frac{1+s}{(1+2s)(1+4s)}$ → $K=8$, $T=1$, $\\tau_1=2$, $\\tau_2=4$",
      "$K=8$ mentre $\\mu=1$: sono numeri diversi",
    ] },
    { t: "box", titolo: "Esempi 6-7: trovare i poli", righe: [
      "2º grado: $s^2+5s+6=0$ → $p=-2$, $-3$ → $\\frac{2}{(s+2)(s+3)}$",
      "3º grado: $s^3+3s^2+3s+1$, provo i divisori del termine noto ($\\pm1$): $s=-1$ lo annulla",
      "Ruffini: diviso $(s+1)$ dà $s^2+2s+1=(s+1)^2$ → tre poli in $-1$",
    ] },
  ] },

  { t: "sez", testo: "10 · H1 · Calcolare la risposta di un sistema" },
  { t: "due", sx: [
    { t: "box", tipo: "passi", titolo: "I quattro passi", righe: [
      "1. trovo la f.d.t. $G(s)$",
      "2. trasformo l'ingresso: $I(s)=\\mathcal{L}\\{i(t)\\}$",
      "3. moltiplico: $U(s)=G(s)\\cdot I(s)$",
      "4. antitrasformo: $u(t)=\\mathcal{L}^{-1}\\{U(s)\\}$",
      "ingressi tipici: impulso $I=1$ (allora $U=G$), gradino $\\frac As$, rampa $\\frac1{s^2}$",
    ] },
    facile(["Dare un <b>impulso</b> è come dare un colpo a una campana e ascoltare come suona: il suono che senti è la \"firma\" della campana. Con $I(s)=1$ l'uscita è proprio $G(s)$."]),
  ], dx: [
    { t: "box", titolo: "Circuito RC con la rampa $i(t)=t$ (esempio del libro)", righe: [
      "1. $G=\\frac{1}{1+\\tau s}$, $\\;I=\\frac1{s^2}$ → $U=\\frac{1}{s^2(1+\\tau s)}$",
      "2. $\\frac{A}{s^2}+\\frac{A_1}{s}+\\frac{B}{1+\\tau s}$: residui $A=1$, $B=\\tau^2$; con $s=1$ trovo $A_1=-\\tau$",
      "3. $u(t)=t-\\tau+\\tau\\,e^{-t/\\tau}$",
    ] },
    { t: "p", testo: img("rampa_rc", 34) },
    { t: "p", testo: "L'esponenziale si spegne e l'uscita <b>insegue l'ingresso con un ritardo $\\tau$</b>: va parallela alla retta $t-\\tau$." },
  ] },

  { t: "sez", testo: "11 · H1 · Sistemi idraulici e termici" },
  { t: "p", testo: "Il libro li studia perché sono i più facili da \"vedere\", ma le conclusioni valgono anche per i sistemi termici, elettrici e meccanici: hanno le stesse equazioni, cambiano solo i nomi." },
  { t: "due", sx: [
    { t: "tab", intest: ["elettrico", "idraulico", "termico"], righe: [
      ["tensione $v$", "altezza del liquido $h$", "temperatura $\\theta$"],
      ["corrente $i$", "portata $q$", "flusso di calore"],
      ["capacità $C$", "capacità idraulica $C_I$ (superficie di base)", "capacità termica $C_T$"],
      ["resistenza $R$", "resistenza idraulica $R_I$ (la valvola)", "resistenza termica $R_T$"],
    ] },
    { t: "box", tipo: "memo", titolo: "Formule del serbatoio", righe: [
      "$q=C_I\\,\\frac{dh}{dt}$ (come $i=C\\frac{dv}{dt}$) $\\qquad R_I=\\frac{h_i-h_u}{q}$ (come $R=\\frac vi$)",
      "$\\tau=R_I\\,C_I$",
    ] },
  ], dx: [
    facile(["Il serbatoio è un <b>condensatore d'acqua</b>: l'altezza è la tensione, la portata è la corrente. Riempire un serbatoio attraverso un tubo stretto è come caricare $C$ attraverso $R$."]),
    { t: "box", tipo: "passi", titolo: "Serbatoio semplice: la f.d.t.", righe: [
      "1. trasformo: $Q_i=C_I\\,s\\,H_u$ e $R_I=\\frac{H_i-H_u}{Q_i}$",
      "2. elimino $Q_i$: $\\tau\\,s\\,H_u=H_i-H_u$",
      "3. $H_u(1+\\tau s)=H_i$ → $G(s)=\\frac{H_u}{H_i}=\\frac{1}{1+\\tau s}$: è il circuito RC",
    ] },
  ] },
  { t: "tab", intest: ["caso", "$G(s)$", "uscita", "come in elettronica"], larghezze: ["30%", "14%", "26%", "30%"], righe: [
    ["serbatoio semplice (o corpo che si scalda), gradino $h_i$", "$\\frac{1}{1+\\tau s}$", "$h_u=h_i\\left(1-e^{-t/\\tau}\\right)$", "carica di $C$ attraverso $R$"],
    ["afflusso costante $q_i$ da una pompa (o flusso di calore costante)", "$\\frac{1}{sC_I}$", "$h_u=\\frac{q_i}{C_I}\\,t$: una retta", "carica di $C$ a corrente costante"],
    ["svuotamento da $h_0$ (o raffreddamento)", "", "$h_u=h_0\\,e^{-t/\\tau}$", "scarica di $C$"],
  ] },
  { t: "due", sx: [
    { t: "p", testo: img("svuotamento", 34) },
    { t: "p", testo: "<b>Significato di $\\tau$</b> (in tutti e due i casi esponenziali): la tangente alla curva in $t=0$ incontra l'asintoto proprio in $t=\\tau$. La pendenza iniziale è $\\frac{h_i}{\\tau}$: più $\\tau$ è piccolo, più il sistema è veloce." },
  ], dx: [
    { t: "box", titolo: "Esempio 8 del libro: la piscina", righe: [
      "superficie $S=20$ m² $=C_I$, piena a $h=2$ m, portata $q_i=5$ l/s $=0{,}005$ m³/s",
      "afflusso costante: $h=\\frac{q_i}{C_I}\\,t$ → $t=\\frac{C_I\\,h}{q_i}=\\frac{20\\cdot2}{0{,}005}=8000$ s",
      "$8000$ s $\\approx133$ min $=2$ h e $13$ min",
    ] },
    { t: "p", testo: "Nel termico: un corpo scaldato da un flusso di calore costante $F_Q$ ha la temperatura che cresce <b>in modo lineare</b> con pendenza $\\frac{F_Q}{C_T}$." },
  ] },

  { t: "sez", testo: "12 · H1 · Esercizi del libro (pp. 462-463)" },
  { t: "due", sx: [
    { t: "box", titolo: "Es. 1: $R_1$ in serie, uscita su $R_2$ + $C$ verso massa", righe: [
      "1. partitore: $V_u=V_i\\,\\frac{R_2+\\frac1{sC}}{R_1+R_2+\\frac1{sC}}$",
      "2. moltiplico sopra e sotto per $sC$: $G=\\frac{1+sR_2C}{1+s(R_1+R_2)C}=\\frac{1+Ts}{1+\\tau s}$",
      "3. $T=R_2C$ al numeratore, $\\tau=(R_1+R_2)C$ al denominatore",
    ] },
    { t: "box", titolo: "Es. 2: $L\\parallel R_1$ in serie, uscita su $R_2$ ($L=R_1=R_2=1$)", righe: [
      "1. $Z_1=\\frac{R_1\\,sL}{R_1+sL}$; partitore: $V_u=V_i\\,\\frac{R_2}{R_2+Z_1}=V_i\\,\\frac{R_2(R_1+sL)}{R_1R_2+s(R_1+R_2)L}$",
      "2. con i valori: $G(s)=\\frac{1+s}{1+2s}$",
    ] },
  ], dx: [
    { t: "box", titolo: "Es. 3: forma costanti di tempo di $\\frac{10s(s+1)(s+2)}{(s-2)(s+4)(s+3)}$", righe: [
      "1. raccolgo i numeri nelle parentesi: $\\frac{10s\\cdot1\\cdot2\\,(1+s)(1+0{,}5s)}{(-2)\\cdot4\\cdot3\\,(1-0{,}5s)(1+0{,}25s)(1+0{,}33s)}$",
      "2. $K=\\frac{20}{-24}=-\\frac56$",
      "3. $T_1=1$, $T_2=0{,}5$; $\\tau_1=-0{,}5$ (polo positivo), $\\tau_2=0{,}25$, $\\tau_3=\\frac13$",
    ] },
    { t: "box", titolo: "Es. 5: scomporre $\\frac{10s^3+30s^2+20s}{s^3+5s^2-2s-24}$", righe: [
      "1. numeratore: $10s\\,(s^2+3s+2)=10s\\,(s+1)(s+2)$",
      "2. denominatore: provo $\\pm1$, $\\pm2$…; $s=2$ lo annulla",
      "3. Ruffini per $(s-2)$: $s^2+7s+12=(s+3)(s+4)$",
      "4. $G=\\frac{10s(s+1)(s+2)}{(s-2)(s+4)(s+3)}$ (è la f.d.t. dell'es. 3)",
    ] },
  ] },
  { t: "salto" },
];
