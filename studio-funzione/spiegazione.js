// Spiegazione dello studio di funzione (Matematica), nello stile "spiegato semplice" delle altre:
// basi all'inizio, riquadri gialli con un paragone, esempi passo per passo, esercizi di classe corretti, errori in fondo.
// Fonti: Matematica.verde 4A+4B, cap. 17 (asintoti, discontinuità, pp. 907-913), 18 (non derivabilità, p. 977),
// 19 (massimi, minimi, flessi, pp. 1046-1064), 20 (studio delle funzioni, pp. 1115-1122);
// quaderno Saber 28/9, 29/9, 2/10, 5/10, 7/10. Formule ed esempi controllati da verifica.py; grafici da grafici.py.
const img = (nome, alto) => `<img src="img/${nome}.svg" style="height:${alto}mm;max-width:100%;object-fit:contain;display:block;margin:2mm auto">`;
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });
const occhio = (titolo, righe) => ({ t: "box", tipo: "occhio", titolo, righe });
const memo = (titolo, righe) => ({ t: "box", tipo: "memo", titolo, righe });
const passi = (titolo, righe) => ({ t: "box", tipo: "passi", titolo, righe });

module.exports = {
  titolo: "Studio di funzione",
  blocchi: [
    { t: "titolo", testo: "Studio di funzione, spiegato semplice",
      sotto: "Matematica · libro cap. 17-20 e quaderno dal 28/9 al 7/10 · giallo = detto semplice · bordo spesso = da sapere · grigio = esempio passo per passo" },
    { t: "p", testo: "Come leggerla: prima il riquadro <b>giallo</b>, che spiega l'idea con un paragone; poi il riquadro a <b>bordo spesso</b>, che va saputo; poi gli <b>esempi</b>, passo per passo. In fondo ci sono gli esercizi fatti in classe, corretti e finiti, le derivate date per casa e gli errori trovati negli appunti. Le due mappe (foglio 1: la procedura; foglio 2: tabelle e grafici) hanno lo stesso ordine." },

    { t: "sez", testo: "1 · Prima di cominciare: le parole" },
    { t: "tab", intest: ["parola", "cosa vuol dire"], larghezze: ["24%", "76%"], righe: [
      ["<b>dominio</b> $D$", "le $x$ per cui la formula si può calcolare (niente divisioni per zero, radici pari di negativi, logaritmi di numeri $\\leq0$)"],
      ["<b>asintoto</b>", "una retta a cui il grafico si avvicina sempre di più, senza fermarsi, quando $x$ o $y$ vanno all'infinito"],
      ["<b>derivata</b> $f'(x)$", "la pendenza del grafico nel punto $x$: positiva = sale, negativa = scende, zero = in piano"],
      ["<b>punto stazionario</b>", "dove $f'(x)=0$: la tangente è orizzontale (massimo, minimo o flesso orizzontale)"],
      ["<b>concavità</b>", "verso l'alto ∪ (come una tazza) o verso il basso ∩ (come una cupola); la decide il segno di $f''$"],
      ["<b>flesso</b>", "il punto in cui la concavità cambia"],
    ] },
    facile(["Studiare una funzione è come fare la <b>mappa di un sentiero</b> prima di camminarci. Il dominio dice dove il sentiero esiste; il segno dice dove sei sopra o sotto il livello del mare; i limiti dicono dove il sentiero va a finire; $f'$ dice dove sale e dove scende; $f''$ dice se sei in una valle (∪) o su una cresta (∩). Alla fine metti tutto insieme e disegni."]),

    { t: "sez", testo: "2 · Lo schema: otto passi, sempre nello stesso ordine" },
    { t: "due", sx: [
      memo("Gli otto passi", [
        "1. <b>dominio</b>",
        "2. <b>simmetrie</b>: pari, dispari, periodica",
        "3. <b>intersezioni con gli assi</b>",
        "4. <b>segno</b>: dove $f(x)>0$",
        "5. <b>limiti agli estremi del dominio</b> e <b>asintoti</b>",
        "6. <b>derivata prima</b>: crescenza, massimi, minimi",
        "7. <b>derivata seconda</b>: concavità, flessi",
        "8. <b>grafico</b>, controllando che torni tutto",
      ]),
    ], dx: [
      { t: "p", testo: "Il libro (cap. 20) e il quaderno (5/10: dominio, intersezioni, segno, simmetrie, asintoti, max e min, flessi, grafico) usano questo ordine. Conviene segnare sul piano cartesiano ogni risultato <b>appena lo trovi</b>: così vedi subito se qualcosa non torna." },
      occhio("Cosa ha detto il prof di portare alla verifica (quaderno 29/9)", [
        "gerarchie degli infiniti · derivate · problemi di dominio · grafici delle funzioni elementari · disequazioni irrazionali · punti di discontinuità · punti di non derivabilità",
        "Sono tutti nelle due mappe.",
      ]),
    ] },

    { t: "sez", testo: "3 · Passo 1: il dominio" },
    { t: "p", testo: "Guarda la formula e cerca le operazioni \"pericolose\". Ognuna dà una condizione; il dominio è dove valgono <b>tutte insieme</b> (sistema)." },
    { t: "tab", intest: ["vedo", "impongo", "esempio"], larghezze: ["24%", "30%", "46%"], righe: [
      ["frazione $\\frac{N}{D}$", "$D\\neq0$", "$\\frac{x^2}{x-1}$ → $x\\neq1$"],
      ["radice pari $\\sqrt{g}$", "$g\\geq0$", "$\\sqrt{|x|-1}$ → $|x|\\geq1$ → $x\\leq-1\\ \\vee\\ x\\geq1$"],
      ["radice pari sotto, $\\frac{1}{\\sqrt g}$", "$g>0$ (stretto)", "$\\frac{1}{\\sqrt{x+1}}$ → $x>-1$"],
      ["logaritmo $\\ln g$", "$g>0$ (stretto)", "$\\ln(1-\\frac2x)$ → $\\frac{x-2}{x}>0$ → $x<0\\ \\vee\\ x>2$"],
      ["$\\frac{1}{\\ln g}$", "$g>0$ e $g\\neq1$", "$\\frac{1}{\\ln x}$ → $x>0,\\ x\\neq1$"],
      ["base variabile $f^{\\,g}$", "$f>0$", "$x^x$ → $x>0$"],
      ["$\\tan g$", "$g\\neq\\frac\\pi2+k\\pi$", "$\\frac{1}{\\cos x}$ fa lo stesso: $\\cos x\\neq0$"],
      ["$\\arcsin g$, $\\arccos g$", "$-1\\leq g\\leq1$", "$\\arcsin(2x)$ → $-\\frac12\\leq x\\leq\\frac12$"],
    ] },
    occhio("Non chiedono niente", ["radici <b>dispari</b> ($\\sqrt[3]{x^2-1}$ va bene per ogni $x$), $e^g$, $\\sin g$, $\\cos g$, $\\arctan g$: solo il dominio di $g$. Esempio: $x\\,e^{1/x}$ ha dominio $x\\neq0$ solo per colpa di $\\frac1x$."]),

    { t: "sez", testo: "4 · Passi 2, 3, 4: simmetrie, assi, segno" },
    { t: "due", sx: [
      memo("Simmetrie (solo se il dominio è simmetrico)", [
        "<b>pari</b>: $f(-x)=f(x)$ → simmetrico rispetto all'asse $y$",
        "<b>dispari</b>: $f(-x)=-f(x)$ → simmetrico rispetto all'origine",
        "<b>periodica</b>: $f(x+T)=f(x)$ → basta studiare un periodo",
      ]),
      memo("Assi e segno", [
        "asse $y$: metto $x=0$ (se $0\\in D$)",
        "asse $x$: risolvo $f(x)=0$",
        "segno: risolvo $f(x)>0$; dove è negativa il grafico sta sotto l'asse $x$",
      ]),
    ], dx: [
      facile(["La simmetria fa <b>risparmiare metà lavoro</b>: se $f$ è pari, studi solo le $x\\geq0$ e poi ribalti il disegno come in uno specchio sull'asse $y$.",
        "Il segno serve a <b>cancellare zone</b> del piano: se $f>0$ per $x>1$, lì il grafico non può stare sotto l'asse $x$. Il libro tratteggia le zone vietate."]),
    ] },
    { t: "p", testo: "Il segno di una <b>frazione</b> o di un <b>prodotto</b> si studia con il quadro dei segni: ogni fattore positivo per conto suo, poi si moltiplicano i segni colonna per colonna. Con le <b>radici</b> invece servono le disequazioni irrazionali, che si risolvono con un <b>sistema</b> (si prendono le $x$ buone per tutte le righe insieme, i segni non si moltiplicano):" },
    memo("Disequazioni irrazionali", [
      "$\\sqrt A\\geq B$ → $\\begin{cases}B<0\\\\A\\geq0\\end{cases}\\ \\cup\\ \\begin{cases}B\\geq0\\\\A\\geq B^2\\end{cases}$ &nbsp;&nbsp;&nbsp;&nbsp; $\\sqrt A\\leq B$ → $\\begin{cases}A\\geq0\\\\B\\geq0\\\\A\\leq B^2\\end{cases}$",
      "Perché due sistemi nel primo caso: se $B$ è negativo la radice (che è $\\geq0$) è già più grande, basta che esista; se $B\\geq0$ si può elevare al quadrato.",
    ]),

    { t: "sez", testo: "5 · Passo 5: limiti e asintoti" },
    { t: "p", testo: "Si calcolano i limiti <b>agli estremi del dominio</b>: nei punti esclusi (da destra e da sinistra) e, se il dominio non è limitato, a $+\\infty$ e $-\\infty$. Da questi limiti escono gli asintoti." },
    { t: "tab", intest: ["asintoto", "quando c'è", "dove cercarlo"], larghezze: ["22%", "40%", "38%"], righe: [
      ["<b>verticale</b> $x=c$", "$\\lim_{x\\to c^-}f$ o $\\lim_{x\\to c^+}f$ è $\\pm\\infty$ (basta uno)", "zeri del denominatore che non si semplificano, $\\ln g$ dove $g\\to0^+$, estremi aperti"],
      ["<b>orizzontale</b> $y=l$", "$\\lim_{x\\to\\pm\\infty}f=l$ finito", "a $+\\infty$ e a $-\\infty$, separati"],
      ["<b>obliquo</b> $y=mx+q$", "$m=\\lim\\frac{f(x)}{x}$ finito e $\\neq0$, &nbsp;$q=\\lim\\,[f(x)-mx]$ finito", "solo dove $\\lim f=\\infty$ (dove c'è l'orizzontale non c'è l'obliquo)"],
    ] },
    { t: "due", sx: [
      memo("Fratte $\\frac{N}{D}$: bastano i gradi", [
        "$n$ = grado di $N$, $m$ = grado di $D$",
        "$n<m$ → $y=0$ &nbsp;&nbsp; $n=m$ → $y=\\frac{a_n}{b_m}$ (coefficienti di grado massimo)",
        "$n=m+1$ → obliquo &nbsp;&nbsp; $n>m+1$ → nessuno",
      ]),
      { t: "p", testo: "Quando un limite dà una <b>forma indeterminata</b> ($+\\infty-\\infty$, $\\frac\\infty\\infty$, $\\frac00$, $0\\cdot\\infty$, $1^\\infty$, $0^0$, $\\infty^0$) si usano i metodi del foglio 2: raccogliere, razionalizzare, limiti notevoli, gerarchia degli infiniti ($\\ln x\\ll x^a\\ll e^x$) o De L'Hôpital ($\\lim\\frac fg=\\lim\\frac{f'}{g'}$ per $\\frac00$ e $\\frac\\infty\\infty$)." },
    ], dx: [
      facile(["Un asintoto è come un <b>binario</b> che il grafico affianca sempre più da vicino senza mai salirci sopra del tutto. Verticale: il grafico schizza in su o in giù come un razzo contro un muro. Orizzontale od obliquo: lontano, a destra o a sinistra, la curva diventa quasi una retta."]),
      occhio("Errore tipico", ["L'obliquo si cerca <b>separatamente</b> a $+\\infty$ e a $-\\infty$: può esserci da un lato solo, o essere diverso dai due lati (es. del 5/10, sezione 10)."]),
    ] },

    { t: "sez", testo: "6 · Passo 6: la derivata prima" },
    { t: "due", sx: [
      memo("Segno di $f'$", [
        "$f'>0$ → $f$ <b>crescente</b> ↗ &nbsp;&nbsp; $f'<0$ → $f$ <b>decrescente</b> ↘",
        "$+\\ 0\\ -$ → <b>massimo</b> relativo &nbsp;&nbsp; $-\\ 0\\ +$ → <b>minimo</b> relativo",
        "$+\\ 0\\ +$ oppure $-\\ 0\\ -$ → <b>flesso orizzontale</b>",
        "l'ordinata del punto è $f(x_0)$: si mette $x_0$ nella $f$, non nella $f'$",
      ]),
    ], dx: [
      facile(["Cammini sul grafico da sinistra a destra. Se stai salendo e poi scendi, sei passato da una <b>cima</b> (massimo). Se scendi e poi risali, sei passato dal <b>fondo di una valle</b> (minimo). Se sali, ti fermi un attimo in piano e poi continui a salire, è un <b>flesso orizzontale</b> (come $y=x^3$ in 0)."]),
    ] },
    { t: "p", testo: "<b>Punti di non derivabilità</b>. Prima di studiare il segno di $f'$ guarda il suo dominio: dove $f$ esiste ma $f'$ no, si calcolano le derivate da sinistra e da destra ($f'_-$ e $f'_+$) con i limiti, e si confrontano:" },
    { t: "tab", intest: ["$f'_-(x_0)$ e $f'_+(x_0)$", "punto", "esempio"], larghezze: ["40%", "22%", "38%"], righe: [
      ["diversi, almeno uno finito", "<b>angoloso</b>", "$|x|$ in 0: $-1$ e $1$"],
      ["uno $+\\infty$ e l'altro $-\\infty$", "<b>cuspide</b>", "$\\sqrt{|x|}$ in 0"],
      ["tutti e due $+\\infty$ o tutti e due $-\\infty$", "<b>flesso verticale</b>", "$\\sqrt[3]{x}$ in 0"],
    ] },
    { t: "p", testo: `<span style="display:flex;justify-content:space-around">${["angoloso", "cuspide", "flesso_verticale"].map((n) => `<img src="img/${n}.svg" style="height:26mm">`).join("")}</span>` },
    memo("Massimo e minimo assoluti in un intervallo chiuso $[a;b]$", [
      "Si calcola $f$ nei punti con $f'=0$, nei punti non derivabili e negli estremi $a$ e $b$: il valore più grande è il massimo assoluto, il più piccolo il minimo assoluto.",
      "Esempio: $f=x^3-3x$ in $[-2;3]$: $f(-2)=-2$, $f(-1)=2$, $f(1)=-2$, $f(3)=18$ → massimo assoluto $18$ in $x=3$, minimo assoluto $-2$ (in $x=-2$ e $x=1$).",
    ]),

    { t: "sez", testo: "7 · Passo 7: la derivata seconda" },
    { t: "due", sx: [
      memo("Segno di $f''$", [
        "$f''>0$ → concavità verso l'<b>alto</b> ∪",
        "$f''<0$ → concavità verso il <b>basso</b> ∩",
        "$f''$ cambia segno in $x_0\\in D$ → <b>flesso</b>",
        "se lì $f'(x_0)\\neq0$ il flesso è obliquo; la sua tangente ($y-f(x_0)=f'(x_0)(x-x_0)$) si chiama <b>tangente inflessionale</b>",
      ]),
    ], dx: [
      facile(["∪ è una tazza che <b>trattiene l'acqua</b> (f'' positiva, \"felice\"); ∩ è una cupola dove l'acqua <b>scivola via</b> (f'' negativa, \"triste\"). Il flesso è il punto in cui la strada passa da curva a sinistra a curva a destra."]),
      passi("Esempio: $f=x^3-3x$", [
        "$f'=3x^2-3$, $f''=6x$: negativa per $x<0$, positiva per $x>0$ → flesso in $O(0;0)$",
        "$f'(0)=-3\\neq0$ → flesso obliquo, tangente inflessionale $y=-3x$",
      ]),
    ] },
    occhio("Attenzione", ["Il cambio di concavità conta solo in un punto <b>del dominio</b>. In $\\frac{x^2}{x-1}$ la concavità cambia passando da $x=1$, ma lì c'è un asintoto, non un flesso."]),

    { t: "salto" },
    { t: "sez", testo: "8 · Esempio guida: $f(x)=\\frac{x^2}{x-1}$, tutti gli otto passi" },
    { t: "due", sx: [
      passi("Passi 1-4", [
        "1. Dominio: $x-1\\neq0$ → $D=\\mathbb R-\\{1\\}$",
        "2. $D$ non è simmetrico → né pari né dispari",
        "3. Asse $y$: $f(0)=0$ → $O(0;0)$; asse $x$: $x^2=0$ → di nuovo $O$",
        "4. Segno: $x^2\\geq0$ sempre, quindi decide il denominatore: $f>0$ per $x>1$, $f<0$ per $x<1$ ($x\\neq0$)",
      ]),
      passi("Passo 5: limiti", [
        "$x\\to1^-$: $\\frac{1}{0^-}=-\\infty$; &nbsp;$x\\to1^+$: $\\frac{1}{0^+}=+\\infty$ → asintoto verticale $x=1$",
        "$n=2$, $m=1$: $n=m+1$ → obliquo",
        "$m=\\lim\\frac{x^2}{x(x-1)}=1$, &nbsp;$q=\\lim\\left[\\frac{x^2}{x-1}-x\\right]=\\lim\\frac{x}{x-1}=1$",
        "→ asintoto obliquo $y=x+1$ (a $+\\infty$ e a $-\\infty$)",
      ]),
    ], dx: [
      passi("Passi 6-7: derivate", [
        "$f'=\\frac{2x(x-1)-x^2}{(x-1)^2}=\\frac{x(x-2)}{(x-1)^2}$",
        "segno: $+$ per $x<0$, $-$ tra 0 e 2 ($x\\neq1$), $+$ per $x>2$",
        "→ <b>massimo</b> $(0;0)$, <b>minimo</b> $(2;\\,f(2))=(2;4)$",
        "$f''=\\frac{2}{(x-1)^3}$: $\\cap$ per $x<1$, $\\cup$ per $x>1$; nessun flesso ($1\\notin D$)",
      ]),
      { t: "p", testo: img("razionale", 52) },
    ] },

    { t: "sez", testo: "9 · Esercizio del 2/10: $f(x)=x\\,e^{1/x}$" },
    { t: "due", sx: [
      passi("Svolgimento", [
        "Dominio: $x\\neq0$. Non è simmetrica.",
        "Assi: $x=0$ è escluso; $x\\,e^{1/x}=0$ è impossibile ($e^{1/x}>0$) → nessuna intersezione",
        "Segno: $e^{1/x}>0$ sempre, quindi $f>0$ per $x>0$ (come nel quaderno)",
        "$x\\to0^+$: $\\frac1x\\to+\\infty$, forma $0\\cdot\\infty$; con $t=\\frac1x$: $\\frac{e^t}{t}\\to+\\infty$ (gerarchia) → asintoto verticale $x=0$ da destra",
        "$x\\to0^-$: $e^{1/x}\\to e^{-\\infty}=0$, quindi $f\\to0\\cdot0=0$: da sinistra arriva nell'origine (punto vuoto)",
        "$x\\to\\pm\\infty$: $e^{1/x}\\to1$, $f\\to\\pm\\infty$. $m=\\lim e^{1/x}=1$; $q=\\lim x(e^{1/x}-1)=\\lim_{t\\to0}\\frac{e^t-1}{t}=1$ → obliquo $y=x+1$",
        "$f'=e^{1/x}+x\\,e^{1/x}\\left(-\\frac{1}{x^2}\\right)=e^{1/x}\\,\\frac{x-1}{x}$",
        "$\\frac{x-1}{x}>0$ per $x<0\\ \\vee\\ x>1$ → cresce, scende tra 0 e 1, risale: <b>minimo</b> $(1;e)$",
        "$f''=\\frac{e^{1/x}}{x^3}$: ∩ per $x<0$, ∪ per $x>0$, nessun flesso",
      ]),
    ], dx: [
      { t: "p", testo: img("xe1x", 58) },
      facile(["Da sinistra la curva arriva nell'origine \"in piano\": anche $f'\\to0$ per $x\\to0^-$. Da destra invece schizza in alto lungo l'asse $y$. Lo stesso punto, due comportamenti diversi: per questo i limiti si fanno sempre da tutti e due i lati."]),
    ] },

    { t: "sez", testo: "10 · Esercizio del 5/10: $f(x)=x+2-\\sqrt{x^2-x-6}$" },
    { t: "due", sx: [
      passi("Svolgimento", [
        "Dominio: $x^2-x-6\\geq0$, radici $-2$ e $3$ → $x\\leq-2\\ \\vee\\ x\\geq3$",
        "Asse $y$: no ($0\\notin D$). Asse $x$: $\\sqrt{x^2-x-6}=x+2$ → $x^2-x-6=x^2+4x+4$ → $x=-2$ → $(-2;0)$",
        "Segno: $f\\geq0$ ⟺ $\\sqrt{x^2-x-6}\\leq x+2$ → sistema $\\{x^2-x-6\\geq0;\\ x+2\\geq0;\\ x\\geq-2\\}$ → $x=-2\\ \\vee\\ x\\geq3$. Quindi $f>0$ per $x\\geq3$, $f<0$ per $x<-2$",
        "Niente asintoti verticali: il dominio è fatto di intervalli chiusi ($f(3)=5$, finito)",
        "$x\\to+\\infty$: $+\\infty-\\infty$, razionalizzo: $\\frac{5x+10}{x+2+\\sqrt{x^2-x-6}}\\to\\frac52$ → orizzontale $y=\\frac52$ a destra",
        "$x\\to-\\infty$: $f\\to-\\infty$. Per $x<0$, $\\sqrt{x^2}=|x|=-x$: $m=\\lim\\frac fx=1+1=2$; $q=\\lim[f-2x]=\\frac32$ → <b>obliquo</b> $y=2x+\\frac32$ a sinistra",
        "$f'=1-\\frac{2x-1}{2\\sqrt{x^2-x-6}}$: per $x<-2$ è sempre $>0$ (si toglie un numero negativo); per $x>3$, $f'>0$ porterebbe a $-24>1$, impossibile → $f'<0$",
        "cresce fino a $(-2;0)$, scende da $(3;5)$: <b>massimo assoluto</b> $5$ in $x=3$. Negli estremi $f'\\to\\pm\\infty$: tangente verticale",
        "$f''=\\frac{25}{4\\sqrt{(x^2-x-6)^3}}>0$ → sempre ∪, nessun flesso",
      ]),
    ], dx: [
      { t: "p", testo: img("irrazionale", 58) },
      occhio("In classe ci si è fermati all'orizzontale", ["Il quaderno trova giustamente $y=\\frac52$ a $+\\infty$, ma a $-\\infty$ la funzione va a $-\\infty$ e lì c'è l'<b>obliquo</b> $y=2x+\\frac32$. Per $q$: $-x-\\sqrt{x^2-x-6}=\\frac{x+6}{-x+\\sqrt{x^2-x-6}}\\to-\\frac12$, e $2-\\frac12=\\frac32$."]),
    ] },

    { t: "sez", testo: "11 · Esercizio del 28/9: $f(x)=\\frac{1-4\\sin^2x}{\\cos x}$" },
    { t: "due", sx: [
      passi("Svolgimento", [
        "Dominio: $\\cos x\\neq0$ → $x\\neq\\frac\\pi2+k\\pi$. Periodica di periodo $2\\pi$ e <b>pari</b> ($\\sin^2$ e $\\cos$ non cambiano con $-x$): basta $[-\\frac\\pi2;\\frac{3\\pi}{2}]$",
        "Asse $y$: $f(0)=1$. Asse $x$: $\\sin^2x=\\frac14$ → $\\sin x=\\pm\\frac12$ → $x=\\pm\\frac\\pi6,\\ \\frac{5\\pi}{6},\\ \\frac{7\\pi}{6}$",
        "Segno (circonferenza del quaderno): $N>0$ per $-\\frac12<\\sin x<\\frac12$, $D>0$ per $-\\frac\\pi2<x<\\frac\\pi2$ → $f>0$ in $(-\\frac\\pi6;\\frac\\pi6)$, $(\\frac\\pi2;\\frac{5\\pi}6)$, $(\\frac{7\\pi}6;\\frac{3\\pi}2)$",
        "$x\\to\\frac\\pi2^-$: $\\frac{-3}{0^+}=-\\infty$; $x\\to\\frac\\pi2^+$: $+\\infty$ → asintoti verticali $x=\\frac\\pi2+k\\pi$. Periodica → niente orizzontali od obliqui",
        "Trucco: $1-4\\sin^2x=4\\cos^2x-3$, quindi $f=4\\cos x-\\frac{3}{\\cos x}$",
        "$f'=-4\\sin x-\\frac{3\\sin x}{\\cos^2x}=-\\sin x\\left(4+\\frac{3}{\\cos^2x}\\right)$: la parentesi è sempre positiva, il segno è quello di $-\\sin x$",
        "→ <b>massimo</b> $(0;1)$, <b>minimo</b> $(\\pi;-1)$",
        "$f''=\\frac{-4\\sin^4x+5\\sin^2x-7}{\\cos^3x}$: il numeratore è sempre negativo ($\\Delta<0$) → ∩ dove $\\cos x>0$, ∪ dove $\\cos x<0$; nessun flesso",
      ]),
    ], dx: [
      { t: "p", testo: img("goniometrica", 54) },
      facile(["La derivata del quaderno ($\\frac{-8\\sin x\\cos^2x+\\sin x(1-4\\sin^2x)}{\\cos^2x}$) è <b>giusta</b>: raccogliendo $\\sin x$ diventa la stessa di qui. Il trucco $\\sin^2x=1-\\cos^2x$ serve solo a fare meno conti."]),
    ] },

    { t: "salto" },
    { t: "sez", testo: "12 · Esercizi del 29/9: $\\sqrt{|x|-1}$ e una funzione a tratti" },
    { t: "due", sx: [
      passi("$f(x)=\\sqrt{|x|-1}$", [
        "Dominio: $|x|-1\\geq0$ → $x\\leq-1\\ \\vee\\ x\\geq1$ (i due sistemi del quaderno sono giusti)",
        "Pari: studio $x\\geq1$, dove $f=\\sqrt{x-1}$",
        "Zeri $x=\\pm1$; $f\\geq0$ sempre",
        "Niente asintoti (come nel quaderno): verticali no (dominio chiuso), orizzontali no ($f\\to+\\infty$), obliqui no ($m=\\lim\\frac{\\sqrt{x-1}}{x}=0$)",
        "$f'=\\frac{1}{2\\sqrt{x-1}}>0$: cresce; per $x\\to1^+$, $f'\\to+\\infty$ → tangente verticale nell'estremo",
        "minimi assoluti $(\\pm1;0)$; $f''<0$ → ∩",
      ]),
    ], dx: [
      { t: "p", testo: img("radice_modulo", 32) },
      passi("$f(x)=\\begin{cases}\\sqrt{2-x} & x\\leq2\\\\(2-x)^2 & x>2\\end{cases}$", [
        "Continua in 2: $\\sqrt{0}=0$ e $\\lim_{x\\to2^+}(2-x)^2=0$",
        "$f'_-(2)=\\lim\\frac{-1}{2\\sqrt{2-x}}=-\\infty$; &nbsp;$f'_+(2)=\\lim-2(2-x)=0$",
        "diverse, una finita → <b>punto angoloso</b> in $(2;0)$",
      ]),
      { t: "p", testo: img("a_tratti", 36) },
    ] },

    { t: "sez", testo: "13 · Le derivate date per casa (2/10 e 7/10), svolte" },
    { t: "tab", intest: ["funzione", "derivata", "regola usata"], larghezze: ["27%", "45%", "28%"], righe: [
      ["$\\frac{e^{x^2}}{3x}$", "$\\frac{2x\\,e^{x^2}\\cdot3x-3e^{x^2}}{9x^2}=\\frac{e^{x^2}(2x^2-1)}{3x^2}$", "quoziente, $e^g$"],
      ["$\\frac{\\sqrt[3]{x^2-1}}{x}$", "$\\frac{3-x^2}{3x^2\\sqrt[3]{(x^2-1)^2}}$", "quoziente, $\\sqrt[3]{g}$"],
      ["$\\frac{\\sin x}{\\ln\\frac{3}{x^2}}$", "$\\frac{x\\cos x\\,\\ln\\frac{3}{x^2}+2\\sin x}{x\\,\\ln^2\\frac{3}{x^2}}$", "quoziente; $\\left(\\ln\\frac{3}{x^2}\\right)'=-\\frac2x$"],
      ["$2e^{1/x}$", "$-\\frac{2e^{1/x}}{x^2}$", "$e^g$ (come nel quaderno)"],
      ["$\\frac{\\ln(x^2)}{x^2+1}$", "$\\frac{2(x^2+1-x^2\\ln x^2)}{x(x^2+1)^2}$", "quoziente, $\\ln g$"],
      ["$\\frac{1}{\\sqrt[3]{(x^2+1)^4}}=(x^2+1)^{-\\frac43}$", "$-\\frac{8x}{3\\sqrt[3]{(x^2+1)^7}}$", "$g^n$ con $n=-\\frac43$"],
      ["$\\ln^2(x+3)$", "$\\frac{2\\ln(x+3)}{x+3}$", "$g^2$, poi $\\ln g$"],
      ["$\\ln\\left(1-\\frac2x\\right)$", "$\\frac{2}{x(x-2)}$", "$\\ln g$"],
      ["$(x-3)\\,e^x$", "$(x-2)\\,e^x$", "prodotto"],
      ["$\\left[\\ln\\frac{1}{x+2}\\right]^2=\\ln^2(x+2)$", "$\\frac{2\\ln(x+2)}{x+2}$ &nbsp;(se invece è $\\ln\\frac{1}{(x+2)^2}$: $-\\frac{2}{x+2}$)", "$g^2$, poi $\\ln g$"],
    ] },
    { t: "p", testo: "La funzione $\\frac{1-4\\sin^2x}{\\cos x}$ della lista del 7/10 è quella della sezione 11." },

    { t: "sez", testo: "14 · Correzioni agli appunti" },
    { t: "tab", intest: ["dove", "c'è scritto", "giusto"], larghezze: ["15%", "42%", "43%"], righe: [
      ["2/10, derivate per casa n. 1", "$y'=\\frac{e^{2x}\\cdot3x-3e^{x^2}}{(3x)^2}$", "la derivata di $e^{x^2}$ è $2x\\,e^{x^2}$, non $e^{2x}$: $y'=\\frac{e^{x^2}(2x^2-1)}{3x^2}$"],
      ["5/10, riquadro rosso", "$\\sqrt A\\geq B$: primo sistema $\\{A\\geq0;\\ B\\geq0\\}$", "$\\{A\\geq0;\\ B<0\\}$: con $B\\geq0$ i due sistemi si sovrapporrebbero e mancherebbe il caso $B$ negativo"],
      ["5/10, segno", "quadro dei segni del sistema con i segni moltiplicati: risultato $+\\ -\\ +$", "un sistema non si moltiplica: si prendono le $x$ buone per tutte le righe. $f\\geq0$ solo per $x=-2$ e $x\\geq3$; per $x<-2$ è negativa ($f(-5)=-3-\\sqrt{24}$)"],
      ["5/10, asintoti", "solo l'orizzontale $y=\\frac52$", "manca l'obliquo $y=2x+\\frac32$ a $-\\infty$ (sezione 10)"],
    ] },
  ],
};
