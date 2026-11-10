// Spiegazione breve e semplice degli integrali indefiniti (libro cap. 22 pp. 1234-1253, quaderno Saber 12/10-28/10).
// Gli esempi svolti sono controllati da verifica_prova.py (casi "S ...").
module.exports = {
  titolo: "Integrali indefiniti in breve",
  blocchi: [
    { t: "titolo", testo: "Integrali indefiniti, spiegati in breve",
      sotto: "bordo spesso = da sapere a memoria" },

    { t: "sez", testo: "1 · L'idea" },
    { t: "due", sx: [
      { t: "p", testo: "<b>Integrare = derivare al contrario.</b> Cerco una funzione $F(x)$ che, derivata, dia $f(x)$." },
      { t: "box", tipo: "memo", righe: ["$$\\int f(x)\\,dx=F(x)+c\\quad\\text{se}\\quad F'(x)=f(x)$$"] },
      { t: "p", testo: "Es. $\\int2x\\,dx=x^2+c$, perché $D[x^2]=2x$." },
    ], dx: [
      { t: "p", testo: "<b>Perché $+c$</b>: la derivata di un numero è 0, quindi $x^2$, $x^2+5$, $x^2-1$ vanno tutte bene." },
      { t: "p", testo: "<b>Controllo sempre</b>: derivo il risultato e devo ritrovare la funzione di partenza." },
      { t: "p", testo: "<b>Linearità</b>: le somme si integrano un pezzo alla volta, i numeri davanti escono fuori. Il prodotto <u>no</u>: $\\int f\\cdot g\\neq\\int f\\cdot\\int g$." },
    ] },

    { t: "sez", testo: "2 · La tabella da sapere a memoria" },
    { t: "tab", intest: ["Funzione", "Integrale", "Funzione", "Integrale"], righe: [
      ["$x^{\\alpha}$ &nbsp;($\\alpha\\neq-1$)", "$\\frac{x^{\\alpha+1}}{\\alpha+1}+c$", "$\\sin x$", "$-\\cos x+c$"],
      ["$\\frac1x$", "$\\ln|x|+c$", "$\\cos x$", "$\\sin x+c$"],
      ["$e^x$", "$e^x+c$", "$\\frac{1}{\\cos^2x}$", "$\\tan x+c$"],
      ["$a^x$", "$\\frac{a^x}{\\ln a}+c$", "$\\frac{1}{\\sin^2x}$", "$-\\cot x+c$"],
      ["$\\frac{1}{1+x^2}$", "$\\arctan x+c$", "$\\frac{1}{\\sqrt{1-x^2}}$", "$\\arcsin x+c$"],
    ] },
    { t: "due", sx: [
      { t: "box", tipo: "passi", titolo: "Prima di integrare, riscrivi", righe: [
        "radici e frazioni come potenze: $\\sqrt x=x^{\\frac12}$, $\\frac{1}{x^3}=x^{-3}$",
        "spezza: $\\frac{x^2+3}{x}=x+\\frac3x$",
        "semplifica: $\\frac{x^2-4}{x-2}=x+2$",
        "sviluppa i quadrati: $(e^x+1)^2=e^{2x}+2e^x+1$",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempio", righe: [
        "$\\int\\left(6x^2-\\frac2x\\right)dx=6\\cdot\\frac{x^3}{3}-2\\ln|x|$",
        "$=2x^3-2\\ln|x|+c$",
      ] },
      { t: "p", testo: "<b>Segni meno</b>: solo in $\\int\\sin x=-\\cos x$ e $\\int\\frac{1}{\\sin^2x}=-\\cot x$." },
    ] },

    { t: "sez", testo: "3 · Funzioni composte: cerca $f$ e $f'$" },
    { t: "due", sx: [
      { t: "p", testo: "Se dentro c'è una funzione $f(x)$ e <b>accanto c'è la sua derivata</b> $f'(x)$, uso la tabella con $f(x)$ al posto di $x$:" },
      { t: "box", tipo: "memo", righe: [
        "$\\int f^{\\alpha}f'\\,dx=\\frac{f^{\\alpha+1}}{\\alpha+1}+c\\qquad\\int\\frac{f'}{f}\\,dx=\\ln|f|+c$",
        "$\\int f'e^{f}dx=e^{f}+c\\qquad\\int f'\\cos f\\,dx=\\sin f+c$",
        "$\\int\\frac{f'}{1+f^2}dx=\\arctan f+c\\quad$ e così via",
      ] },
      { t: "box", tipo: "occhio", titolo: "Il trucco della costante", righe: [
        "Se manca <b>solo un numero</b>, moltiplico dentro e divido fuori.",
        "Se manca una $x$, non si può: serve un altro metodo.",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempi", righe: [
        "$\\int(5x-2)^3dx=\\frac15\\int5(5x-2)^3dx=\\frac{(5x-2)^4}{20}+c$",
        "$\\int x\\cos x^2dx=\\frac12\\int2x\\cos x^2dx=\\frac12\\sin x^2+c$",
        "$\\int\\frac{dx}{4+x^2}=\\frac14\\int\\frac{dx}{1+(x/2)^2}=\\frac12\\arctan\\frac x2+c$",
        "$\\int\\tan x\\,dx=-\\int\\frac{-\\sin x}{\\cos x}dx=-\\ln|\\cos x|+c$",
      ] },
      { t: "p", testo: "In generale: $\\int\\frac{f'}{k^2+f^2}\\,dx=\\frac1k\\arctan\\frac fk+c$." },
    ] },

    { t: "sez", testo: "4 · Per parti: prodotto di due funzioni diverse" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: ["$$\\int f\\cdot g'\\,dx=f\\cdot g-\\int f'\\cdot g\\,dx$$", "$f$ la <b>derivo</b>, $g'$ la <b>integro</b>."] },
      { t: "tab", intest: ["Se c'è...", "derivo"], righe: [
        ["$x^n\\cdot\\sin,\\ \\cos,\\ e^x$", "$x^n$"],
        ["$x^n\\cdot\\ln,\\ \\arctan,\\ \\arcsin$", "$\\ln$, $\\arctan$, $\\arcsin$"],
      ] },
      { t: "p", testo: "<b>Da soli</b> ($\\int\\ln x$, $\\int\\arctan x$): li scrivo come $1\\cdot\\ln x$ e integro l'1." },
    ], dx: [
      { t: "box", titolo: "Esempi", righe: [
        "$\\int x\\,e^{3x}dx=x\\cdot\\frac{e^{3x}}{3}-\\int\\frac{e^{3x}}{3}dx$",
        "$=e^{3x}\\left(\\frac x3-\\frac19\\right)+c$",
        "$\\int\\ln x\\,dx=x\\ln x-\\int x\\cdot\\frac1x\\,dx=x\\ln x-x+c$",
      ] },
      { t: "p", testo: "Con $x^2$ lo faccio <b>due volte</b>. Con $e^x\\sin x$ torna l'integrale di partenza $I$: lo porto a sinistra e divido per 2." },
    ] },

    { t: "sez", testo: "5 · Sostituzione: quando c'è una radice" },
    { t: "due", sx: [
      { t: "box", tipo: "passi", righe: [
        "1. pongo $\\sqrt x=t$, cioè $x=t^2$",
        "2. differenzio: $dx=2t\\,dt$",
        "3. sostituisco tutto e integro in $t$",
        "4. rimetto $t=\\sqrt x$",
      ] },
    ], dx: [
      { t: "box", titolo: "Esempio", righe: [
        "$\\int\\frac{dx}{1+\\sqrt x}=\\int\\frac{2t}{1+t}dt=2\\int\\left(1-\\frac{1}{1+t}\\right)dt$",
        "$=2t-2\\ln|1+t|=2\\sqrt x-2\\ln(1+\\sqrt x)+c$",
        "<i>trucco: $t=(t+1)-1$ al numeratore</i>",
      ] },
    ] },

    { t: "sez", testo: "6 · Funzioni razionali fratte $\\frac{N(x)}{D(x)}$" },
    { t: "box", tipo: "passi", titolo: "In ordine", righe: [
      "1. grado $N\\geq$ grado $D$? $\\to$ <b>divido</b>: $\\frac ND=Q+\\frac RD$",
      "2. il numeratore è la derivata del denominatore? $\\to\\ln|D|$",
      "3. $D$ di 1° grado $\\to\\int\\frac{dx}{ax+b}=\\frac1a\\ln|ax+b|$",
      "4. $D$ di 2° grado $\\to$ calcolo $\\Delta$ e guardo la tabella",
      "5. grado > 2 $\\to$ scompongo $D$",
    ] },
    { t: "tab", intest: ["Caso", "Cosa faccio", "Esempio"], larghezze: ["18%", "32%", "50%"], righe: [
      ["$\\frac{x+1}{x-2}$ &nbsp;(gradi uguali)", "$x+1=(x-2)+3$", "$\\int\\left(1+\\frac{3}{x-2}\\right)dx=x+3\\ln|x-2|+c$"],
      ["$\\Delta>0$: due radici", "$\\frac{A}{x-x_1}+\\frac{B}{x-x_2}$, trovo $A$ e $B$", "$\\int\\frac{dx}{x^2-1}=\\frac12\\ln|x-1|-\\frac12\\ln|x+1|+c$"],
      ["$\\Delta=0$: $(x-x_1)^2$", "$\\frac{A}{x-x_1}+\\frac{B}{(x-x_1)^2}$", "$\\int\\frac{x+1}{(x-1)^2}dx=\\ln|x-1|-\\frac{2}{x-1}+c$"],
      ["$\\Delta<0$", "completo il quadrato; se c'è $x$ sopra, prima faccio comparire $D'$", "$\\int\\frac{2x+6}{x^2+2x+2}dx=$<br>$\\ln(x^2+2x+2)+4\\arctan(x+1)+c$"],
      ["grado > 2", "una frazione per ogni fattore; $\\frac{Bx+C}{x^2+1}$ se il fattore non si scompone", "$\\frac{1}{x(x-1)(x+1)}=\\frac Ax+\\frac{B}{x-1}+\\frac{C}{x+1}$"],
    ] },
    { t: "p", testo: "<b>Trovare $A$, $B$</b>: sommo le frazioni e uguaglio i coefficienti (sistema), oppure metto al posto di $x$ le radici del denominatore: è più veloce e dà lo stesso risultato." },

    { t: "sez", testo: "7 · Trovare $c$ con una condizione" },
    { t: "p", testo: "Integro, poi metto il dato nel risultato e ricavo $c$. Es. primitiva di $2x$ che passa per $(1;\\,4)$: $x^2+c$, $1+c=4$, quindi $x^2+3$. Se c'è $f''$, integro <b>due volte</b> con due costanti $c_1$, $c_2$." },

    { t: "sez", testo: "8 · Quale metodo uso?" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: [
        "1. È in tabella (dopo aver riscritto)? $\\to$ <b>immediato</b>",
        "2. C'è $f(x)$ con accanto $f'(x)$? $\\to$ <b>composta</b>",
        "3. Frazione di polinomi? $\\to$ <b>fratte</b>",
        "4. Prodotto $x^n\\cdot$ ($\\sin$, $\\cos$, $e^x$, $\\ln$, $\\arctan$)? $\\to$ <b>per parti</b>",
        "5. C'è $\\sqrt x$ o simili? $\\to$ <b>sostituzione</b>",
      ] },
    ], dx: [
      { t: "box", tipo: "occhio", titolo: "Errori tipici", righe: [
        "• dimenticare il $+c$",
        "• $\\int\\frac1x\\neq\\frac{x^0}{0}$: con $\\alpha=-1$ esce $\\ln|x|$ <i>(sul quaderno 12/10 c'è scritto $\\alpha\\neq1$: è $\\alpha\\neq-1$)</i>",
        "• dimenticare il modulo nel $\\ln$",
        "• sbagliare il segno di $\\int\\sin x$",
        "• \"aggiustare\" una $x$ che manca: si possono aggiustare solo i numeri",
        "• per parti: dimenticare di dividere quando integri $e^{2x}$ (diventa $\\frac{e^{2x}}{2}$)",
      ] },
    ] },
  ],
};
