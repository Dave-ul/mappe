// Spiegazione degli integrali indefiniti (libro cap. 22 pp. 1234-1253, quaderno Saber dal 12/10 al 23/11, lavagna del 18/11 dalla chiavetta).
// Dal 2026-11-20 scritta in modo semplicissimo, come quella dell'op-amp: basi all'inizio, riquadri gialli
// "Detto semplice", ragionamento passo per passo, esempi presi dagli esercizi fatti in classe (11/11, 18/11, 19/11, 23/11)
// e correzioni agli appunti. Ogni esempio svolto è controllato da verifica_prova.py (casi "S ...").
const facile = (righe, titolo = "Detto semplice") => ({ t: "box", tipo: "facile", titolo, righe });

module.exports = {
  titolo: "Integrali indefiniti",
  blocchi: [
    { t: "titolo", testo: "Integrali indefiniti, spiegati semplice",
      sotto: "Matematica · dal libro (cap. 22) e dagli appunti dal 12/10 al 23/11 · giallo = detto semplice, per capire · bordo spesso = da sapere a memoria" },
    { t: "p", testo: "Come leggerla: prima il riquadro <b>giallo</b>, che spiega l'idea con un paragone; poi le formule nel riquadro a <b>bordo spesso</b>, che vanno sapute; poi gli <b>esempi</b> svolti passo per passo. Molti esempi sono gli esercizi fatti in classe, già corretti: gli errori trovati negli appunti sono nell'ultima sezione." },

    { t: "sez", testo: "1 · Prima di cominciare: quello che serve sapere" },
    { t: "p", testo: "Per integrare bisogna saper <b>derivare</b> e saper <b>riscrivere</b> radici e frazioni come potenze. Ripassiamo solo quello che serve." },
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Derivate da sapere", righe: [
        "$D[x^n]=n\\,x^{n-1}\\qquad D[k]=0$ ($k$ numero)",
        "$D[\\ln x]=\\frac1x\\qquad D[e^x]=e^x\\qquad D[a^x]=a^x\\ln a$",
        "$D[\\sin x]=\\cos x\\qquad D[\\cos x]=-\\sin x$",
        "$D[\\tan x]=\\frac{1}{\\cos^2x}\\qquad D[\\arctan x]=\\frac{1}{1+x^2}$",
      ] },
      { t: "box", tipo: "memo", titolo: "Due regole delle derivate", righe: [
        "<b>prodotto</b>: $D[f\\cdot g]=f'\\,g+f\\,g'$",
        "<b>composta</b>: $D[f(g(x))]=f'(g(x))\\cdot g'(x)$",
      ] },
      facile(["La regola della composta dice: derivo <b>la scatola fuori</b>, lasciando dentro quello che c'è, e poi moltiplico per la derivata di <b>quello che c'è dentro</b>. Es. $D[\\sin(x^2)]=\\cos(x^2)\\cdot2x$."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Potenze", righe: [
        "$\\sqrt x=x^{\\frac12}\\qquad\\sqrt[n]{x^m}=x^{\\frac mn}$",
        "$\\frac{1}{x^n}=x^{-n}\\qquad\\frac{1}{\\sqrt x}=x^{-\\frac12}$",
        "$x^a\\cdot x^b=x^{a+b}\\qquad\\frac{x^a}{x^b}=x^{a-b}$",
        "$a^{x+1}=a\\cdot a^x\\qquad\\frac{6^x}{2^x}=\\left(\\frac62\\right)^x=3^x$",
      ] },
      facile(["Una radice è una potenza con l'esponente a frazione; una frazione con $x$ sotto è una potenza con l'esponente negativo. Riscritte così, quasi tutte le funzioni \"strane\" diventano potenze, e le potenze si integrano con una regola sola."]),
      { t: "p", testo: "<b>Valore assoluto</b>: $|x|$ è $x$ senza segno ($|-3|=3$). Serve nel logaritmo, perché $\\ln$ esiste solo per numeri positivi: per questo si scrive $\\ln|x|$." },
    ] },

    { t: "sez", testo: "2 · L'idea: integrare è derivare al contrario" },
    facile([
      "Derivare è come avere la <b>risposta</b> da una domanda; integrare è il gioco al contrario: ti danno la risposta $f(x)$ e devi trovare la domanda, cioè la funzione $F(x)$ che, derivata, dà $f(x)$.",
      "Esempio: chi, derivato, dà $2x$? Risposta: $x^2$. Quindi $\\int2x\\,dx=x^2+c$.",
    ]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", titolo: "Primitiva e integrale indefinito", righe: [
        "$$\\int f(x)\\,dx=F(x)+c\\quad\\text{se}\\quad F'(x)=f(x)$$",
        "$F$ si chiama <b>primitiva</b> di $f$; $dx$ dice che la variabile è $x$",
      ] },
      { t: "p", testo: "<b>Perché $+c$</b>: la derivata di un numero è 0. Quindi $x^2$, $x^2+5$, $x^2-1$ derivate danno tutte $2x$: sono tutte primitive. Con $+c$ le scrivo tutte insieme." },
      facile(["Le primitive sono la <b>stessa curva spostata in su o in giù</b>, come la stessa scala vista da piani diversi: la pendenza in ogni punto è la stessa, cambia solo l'altezza. Il $+c$ dice di quanto è spostata."]),
    ], dx: [
      { t: "box", tipo: "memo", titolo: "Linearità", righe: [
        "$\\int[f(x)+g(x)]\\,dx=\\int f(x)\\,dx+\\int g(x)\\,dx$",
        "$\\int k\\,f(x)\\,dx=k\\int f(x)\\,dx$",
      ] },
      facile(["Le <b>somme</b> si integrano un pezzo alla volta e i <b>numeri</b> davanti escono fuori. Il <b>prodotto no</b>: $\\int f\\cdot g\\neq\\int f\\cdot\\int g$. Per i prodotti servono i metodi delle sezioni 4 e 5."]),
      { t: "box", tipo: "occhio", titolo: "Controllo sempre", righe: [
        "Derivo il risultato: devo ritrovare la funzione di partenza. Se non torna, ho sbagliato.",
      ] },
    ] },

    { t: "sez", testo: "3 · Gli integrali immediati" },
    { t: "p", testo: "Sono la tabella delle derivate letta da destra a sinistra. Vanno sapute a memoria, come le tabelline." },
    { t: "tab", intest: ["Funzione", "Integrale", "Funzione", "Integrale"], righe: [
      ["$x^{\\alpha}$ &nbsp;($\\alpha\\neq-1$)", "$\\frac{x^{\\alpha+1}}{\\alpha+1}+c$", "$\\sin x$", "$-\\cos x+c$"],
      ["$\\frac1x$", "$\\ln|x|+c$", "$\\cos x$", "$\\sin x+c$"],
      ["$e^x$", "$e^x+c$", "$\\frac{1}{\\cos^2x}$", "$\\tan x+c$"],
      ["$a^x$", "$\\frac{a^x}{\\ln a}+c$", "$\\frac{1}{\\sin^2x}$", "$-\\cot x+c$"],
      ["$\\frac{1}{1+x^2}$", "$\\arctan x+c$", "$\\frac{1}{\\sqrt{1-x^2}}$", "$\\arcsin x+c$"],
    ] },
    { t: "due", sx: [
      facile([
        "<b>Potenze</b>: alzo l'esponente di 1 e divido per il nuovo esponente. $x^3\\to\\frac{x^4}{4}$.",
        "L'unico caso in cui non funziona è $x^{-1}=\\frac1x$: verrebbe $\\frac{x^0}{0}$, e per zero non si divide. Per questo $\\int\\frac1x=\\ln|x|$.",
      ]),
      { t: "box", tipo: "passi", titolo: "Prima di integrare, riscrivi", righe: [
        "radici e frazioni come potenze: $\\sqrt x=x^{\\frac12}$, $\\frac{1}{x^2}=x^{-2}$",
        "spezza le frazioni: $\\frac{x^2+3}{x}=\\frac{x^2}{x}+\\frac3x=x+\\frac3x$",
        "semplifica: $\\frac{x^2-4}{x-2}=x+2$",
        "sviluppa i quadrati: $(e^x+1)^2=e^{2x}+2e^x+1$",
      ] },
      { t: "p", testo: "<b>Segni meno</b>: solo in $\\int\\sin x=-\\cos x$ e $\\int\\frac{1}{\\sin^2x}=-\\cot x$." },
    ], dx: [
      { t: "box", titolo: "Esercizi dell'11/11", righe: [
        "$\\int(4x^3-6x+5)\\,dx=4\\frac{x^4}{4}-6\\frac{x^2}{2}+5x$",
        "$=x^4-3x^2+5x+c$",
        "$\\int\\frac{x^2+3}{x}dx=\\int\\left(x+\\frac3x\\right)dx=\\frac{x^2}{2}+3\\ln|x|+c$",
        "$\\int\\left(\\sqrt x+\\frac1{x^2}\\right)dx=\\int\\left(x^{\\frac12}+x^{-2}\\right)dx$",
        "$=\\frac{x^{\\frac32}}{\\frac32}+\\frac{x^{-1}}{-1}=\\frac23x\\sqrt x-\\frac1x+c$",
        "$\\int5^x\\,dx=\\frac{5^x}{\\ln5}+c$",
        "$\\int\\left(3\\cos x-2e^x+\\frac{4}{1+x^2}\\right)dx$",
        "$=3\\sin x-2e^x+4\\arctan x+c$",
      ] },
    ] },
    { t: "due", sx: [
      { t: "box", titolo: "Esercizi del 19/11", righe: [
        "$\\int\\frac{1}{x^2}dx=\\int x^{-2}dx=\\frac{x^{-1}}{-1}=-\\frac1x+c$",
        "$\\int\\frac{1}{\\sqrt x}dx=\\int x^{-\\frac12}dx=\\frac{x^{\\frac12}}{\\frac12}=2\\sqrt x+c$",
        "$\\int\\sqrt x\\,dx=\\frac{x^{\\frac32}}{\\frac32}=\\frac23\\sqrt{x^3}+c$",
        "$\\int\\frac{x^2+1}{x}dx=\\int\\left(x+\\frac1x\\right)dx=\\frac{x^2}{2}+\\ln|x|+c$",
      ] },
    ], dx: [
      { t: "box", titolo: "Con le esponenziali (19/11)", righe: [
        "$\\int\\left(\\frac{6^x}{2^{x+1}}+2e^x\\right)dx$",
        "$\\frac{6^x}{2^{x+1}}=\\frac{6^x}{2\\cdot2^x}=\\frac12\\left(\\frac62\\right)^x=\\frac12\\,3^x$",
        "$\\int\\frac12\\,3^x\\,dx+2\\int e^x\\,dx=\\frac{3^x}{2\\ln3}+2e^x+c$",
      ] },
      { t: "p", testo: "Il trucco è mettere insieme le potenze con lo stesso esponente $x$: $\\frac{6^x}{2^x}=3^x$. Così diventa un $a^x$ della tabella." },
    ] },

    { t: "sez", testo: "4 · Funzioni composte: cerca $f$ e la sua derivata $f'$" },
    facile([
      "È la regola della composta letta al contrario. Se dentro l'integrale vedo una funzione $f(x)$ \"chiusa in una scatola\" e <b>accanto c'è la sua derivata</b> $f'(x)$, la coppia funziona come chiave e serratura: posso usare la tabella con $f(x)$ al posto di $x$.",
    ]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: [
        "$\\int f^{\\alpha}f'\\,dx=\\frac{f^{\\alpha+1}}{\\alpha+1}+c$",
        "$\\int\\frac{f'}{f}\\,dx=\\ln|f|+c\\qquad\\int f'e^{f}dx=e^{f}+c$",
        "$\\int f'\\cos f\\,dx=\\sin f+c$",
        "$\\int f'\\sin f\\,dx=-\\cos f+c$",
        "$\\int\\frac{f'}{1+f^2}dx=\\arctan f+c$",
      ] },
      { t: "box", tipo: "occhio", titolo: "Il trucco della costante", righe: [
        "Se a $f'$ manca <b>solo un numero</b>, lo moltiplico dentro e divido fuori: il risultato non cambia, perché $\\frac{k}{k}=1$.",
        "Se manca una $x$, non si può: la $x$ non esce dall'integrale. Serve un altro metodo.",
      ] },
      { t: "p", testo: "In generale: $\\int\\frac{f'}{k^2+f^2}\\,dx=\\frac1k\\arctan\\frac fk+c$." },
    ], dx: [
      { t: "box", titolo: "Esercizio del 19/11, passo per passo", righe: [
        "$\\int x\\sqrt{x^2+9}\\,dx=\\int x\\,(x^2+9)^{\\frac12}dx$",
        "dentro: $f=x^2+9$, quindi $f'=2x$. Accanto ho solo $x$: manca il <b>2</b>",
        "$=\\frac12\\int2x\\,(x^2+9)^{\\frac12}dx=\\frac12\\cdot\\frac{(x^2+9)^{\\frac32}}{\\frac32}$",
        "$=\\frac13(x^2+9)^{\\frac32}=\\frac13\\sqrt{(x^2+9)^3}+c$",
        "controllo: $D\\left[\\frac13(x^2+9)^{\\frac32}\\right]=\\frac13\\cdot\\frac32(x^2+9)^{\\frac12}\\cdot2x=x\\sqrt{x^2+9}$ ✓",
      ] },
      { t: "box", titolo: "Altri esempi", righe: [
        "$\\int(5x-2)^3dx=\\frac15\\int5(5x-2)^3dx=\\frac{(5x-2)^4}{20}+c$",
        "$\\int x\\cos x^2dx=\\frac12\\int2x\\cos x^2dx=\\frac12\\sin x^2+c$",
        "$\\int\\frac{dx}{4+x^2}=\\frac14\\int\\frac{dx}{1+(x/2)^2}=\\frac12\\arctan\\frac x2+c$",
        "$\\int\\tan x\\,dx=-\\int\\frac{-\\sin x}{\\cos x}dx=-\\ln|\\cos x|+c$",
      ] },
    ] },

    { t: "sez", testo: "5 · Per parti: prodotto di due funzioni diverse" },
    facile([
      "Quando ho un prodotto di due funzioni che non sono \"coppia\" (una non è la derivata dell'altra), faccio uno <b>scambio</b>: una la derivo, l'altra la integro. Scelgo da derivare quella che, derivata, diventa più semplice (le potenze di $x$ scendono di grado, $\\ln x$ diventa $\\frac1x$).",
      "Viene dalla regola del prodotto delle derivate: $(fg)'=f'g+fg'$, integrata e riordinata.",
    ]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: ["$$\\int f\\cdot g'\\,dx=f\\cdot g-\\int f'\\cdot g\\,dx$$", "$f$ la <b>derivo</b>, $g'$ la <b>integro</b>"] },
      { t: "tab", intest: ["Se c'è...", "derivo"], righe: [
        ["$x^n\\cdot\\sin,\\ \\cos,\\ e^x$", "$x^n$"],
        ["$x^n\\cdot\\ln,\\ \\arctan,\\ \\arcsin$", "$\\ln$, $\\arctan$, $\\arcsin$"],
        ["$x\\cdot\\frac{1}{\\cos^2x}$", "$x$ (e integro $\\frac1{\\cos^2x}$ in $\\tan x$)"],
      ] },
      { t: "p", testo: "<b>Da soli</b> ($\\int\\ln x$, $\\int\\arctan x$): li scrivo come $1\\cdot\\ln x$ e integro l'1, che diventa $x$." },
      { t: "p", testo: "Con $x^2$ lo faccio <b>due volte</b>: $\\int x^2e^xdx=e^x(x^2-2x+2)+c$. Con $e^x\\sin x$ dopo due volte torna l'integrale di partenza $I$: lo porto a sinistra e divido per 2, $I=\\frac{e^x(\\sin x-\\cos x)}{2}+c$." },
    ], dx: [
      { t: "box", titolo: "Esempi passo per passo", righe: [
        "$\\int x\\,e^{3x}dx$: derivo $x\\to1$, integro $e^{3x}\\to\\frac{e^{3x}}{3}$",
        "$=x\\cdot\\frac{e^{3x}}{3}-\\int\\frac{e^{3x}}{3}dx=e^{3x}\\left(\\frac x3-\\frac19\\right)+c$",
        "$\\int\\ln x\\,dx=\\int1\\cdot\\ln x\\,dx=x\\ln x-\\int x\\cdot\\frac1x\\,dx$",
        "$=x\\ln x-x+c$",
      ] },
      { t: "box", titolo: "Esercizi del 18/11", righe: [
        "$\\int\\ln x^2\\,dx=\\int1\\cdot\\ln x^2\\,dx$, con $D[\\ln x^2]=\\frac{2x}{x^2}=\\frac2x$",
        "$=x\\ln x^2-\\int x\\cdot\\frac2x\\,dx=x\\ln x^2-2x+c$",
        "$\\int\\frac{x}{\\cos^2x}dx$: derivo $x\\to1$, integro $\\frac1{\\cos^2x}\\to\\tan x$",
        "$=x\\tan x-\\int\\tan x\\,dx=x\\tan x+\\ln|\\cos x|+c$",
      ] },
      { t: "box", titolo: "Dalla lavagna del 18/11", righe: [
        "$\\int\\ln(x^2+1)\\,dx$: derivo $\\ln(x^2+1)$,",
        "che diventa $\\frac{2x}{x^2+1}$, e integro $1\\to x$",
        "$=x\\ln(x^2+1)-2\\int\\frac{x^2}{x^2+1}dx$",
        "trucco: $x^2=(x^2+1)-1$",
        "$=x\\ln(x^2+1)-2\\int\\left(1-\\frac{1}{x^2+1}\\right)dx$",
        "$=x\\ln(x^2+1)-2x+2\\arctan x+c$",
        "$\\int\\frac{x+2}{e^x}dx=\\int(x+2)\\,e^{-x}dx$: derivo $x+2\\to1$, integro $e^{-x}\\to-e^{-x}$",
        "$=-(x+2)e^{-x}+\\int e^{-x}dx$",
        "$=-(x+2)e^{-x}-e^{-x}=-\\frac{x+3}{e^x}+c$",
      ] },
      { t: "p", testo: "Sul quaderno del 18/11 c'è scritto $\\int\\frac{x}{\\cos x}dx$: così non si risolve con i metodi del programma. Quasi sicuramente è $\\frac{x}{\\cos^2x}$: controlla sul libro o sulla scheda." },
    ] },

    { t: "sez", testo: "6 · Sostituzione: quando c'è una radice" },
    facile(["La radice dà fastidio, quindi le do un <b>nome nuovo</b>, $t$. Riscrivo tutto con $t$, che di solito diventa un integrale facile, e alla fine rimetto la radice al posto di $t$. È come tradurre un testo in una lingua più semplice, lavorarci e poi ritradurlo."]),
    { t: "due", sx: [
      { t: "box", tipo: "passi", righe: [
        "1. pongo la radice $=t$ (es. $\\sqrt{x+3}=t$) e ricavo $x$: $x=t^2-3$",
        "2. differenzio: $dx=2t\\,dt$",
        "3. sostituisco <b>tutto</b>, anche $dx$, e integro in $t$",
        "4. rimetto la radice al posto di $t$",
      ] },
      { t: "box", titolo: "Esempio", righe: [
        "$\\int\\frac{dx}{1+\\sqrt x}$, con $\\sqrt x=t$, $x=t^2$, $dx=2t\\,dt$",
        "$=\\int\\frac{2t}{1+t}dt=2\\int\\left(1-\\frac{1}{1+t}\\right)dt$",
        "$=2t-2\\ln|1+t|=2\\sqrt x-2\\ln(1+\\sqrt x)+c$",
        "<i>trucco: $t=(t+1)-1$ al numeratore</i>",
      ] },
    ], dx: [
      { t: "box", titolo: "Esercizio del 18/11, passo per passo", righe: [
        "$\\int\\frac{x-2}{\\sqrt{x+3}}dx$",
        "1. $\\sqrt{x+3}=t$, quindi $x=t^2-3$",
        "2. $dx=2t\\,dt$",
        "3. $x-2=t^2-3-2=t^2-5$:",
        "$\\int\\frac{t^2-5}{t}\\cdot2t\\,dt=2\\int(t^2-5)\\,dt=\\frac{2t^3}{3}-10t$",
        "4. $=\\frac23\\sqrt{(x+3)^3}-10\\sqrt{x+3}+c$",
      ] },
      { t: "p", testo: "Il $t$ sotto e il $2t$ di $dx$ si semplificano: succede spesso, ed è il motivo per cui la sostituzione funziona." },
      { t: "box", titolo: "Dalla lavagna del 18/11: radice di $8-x$", righe: [
        "$\\int\\frac{3x}{\\sqrt{8-x}}dx$: $\\sqrt{8-x}=t$, $x=8-t^2$,",
        "$dx=-2t\\,dt$ (occhio al <b>meno</b>)",
        "$\\int\\frac{3(8-t^2)}{t}\\cdot(-2t)\\,dt=-6\\int(8-t^2)\\,dt$",
        "$=-48t+2t^3$",
        "$=-48\\sqrt{8-x}+2(8-x)\\sqrt{8-x}+c$",
      ] },
    ] },

    { t: "sez", testo: "7 · Funzioni razionali fratte $\\frac{N(x)}{D(x)}$" },
    facile(["Una frazione di polinomi si \"smonta\" in pezzi più piccoli, ognuno dei quali è un integrale della tabella: un $\\ln$ o un $\\arctan$. Come smontare un mobile per farlo passare dalla porta."]),
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
    { t: "due", sx: [
      { t: "p", testo: "<b>Trovare $A$ e $B$</b>: sommo le frazioni e uguaglio i coefficienti (sistema), oppure metto al posto di $x$ le radici del denominatore: è più veloce e dà lo stesso risultato." },
    ], dx: [
      { t: "box", titolo: "Esempio passo per passo", righe: [
        "$\\frac{1}{x(x+2)}=\\frac Ax+\\frac{B}{x+2}$, cioè $1=A(x+2)+Bx$",
        "$x=0$: $1=2A$, $A=\\frac12$; $\\ x=-2$: $1=-2B$, $B=-\\frac12$",
        "$\\int\\frac{dx}{x(x+2)}=\\frac12\\ln|x|-\\frac12\\ln|x+2|+c$",
      ] },
    ] },
    { t: "p", testo: "<b>Gli esercizi del 23/11</b>: denominatore di 2° grado e numeratore di grado al massimo 1, un esercizio per ogni caso di $\\Delta$ (teoria a p. 1247 del libro)." },
    { t: "due", sx: [
      { t: "box", titolo: "$\\Delta>0$: $\\int\\frac{5x-1}{x^2-x-2}dx$", righe: [
        "1. $x^2-x-2=0$: $\\Delta=9$, radici $2$ e $-1$, quindi $(x-2)(x+1)$",
        "2. $5x-1=A(x+1)+B(x-2)$",
        "3. $x=2$: $9=3A$, $A=3$; $\\ x=-1$: $-6=-3B$, $B=2$",
        "4. $=3\\ln|x-2|+2\\ln|x+1|+c$",
      ] },
      { t: "box", titolo: "$\\Delta=0$: $\\int\\frac{2x-3}{x^2-4x+4}dx$", righe: [
        "1. $x^2-4x+4=(x-2)^2$",
        "2. scrivo il numeratore con $x-2$: $2x-3=2(x-2)+1$",
        "3. $\\int\\left(\\frac{2}{x-2}+\\frac{1}{(x-2)^2}\\right)dx$",
        "4. $=2\\ln|x-2|-\\frac{1}{x-2}+c$",
      ] },
    ], dx: [
      { t: "box", titolo: "$\\Delta<0$: $\\int\\frac{2x}{x^2+4x+5}dx$", righe: [
        "1. $\\Delta=16-20<0$: non si scompone. $D'=2x+4$",
        "2. faccio comparire $D'$: $2x=(2x+4)-4$",
        "3. $\\int\\frac{2x+4}{x^2+4x+5}dx-4\\int\\frac{dx}{(x+2)^2+1}$ (quadrato completato)",
        "4. $=\\ln(x^2+4x+5)-4\\arctan(x+2)+c$",
      ] },
      { t: "box", titolo: "Compito: p. 1277 n. 508, $\\int\\frac{3x-5}{x^2-2x-3}dx$", righe: [
        "$x^2-2x-3=(x-3)(x+1)$; $\\ 3x-5=A(x+1)+B(x-3)$",
        "$x=3$: $A=1$; $\\ x=-1$: $B=2$",
        "$=\\ln|x-3|+2\\ln|x+1|+c$ (come il risultato del libro)",
      ] },
      facile(["Il modulo nel $\\ln$ serve quando l'argomento può essere negativo; $x^2+4x+5$ è sempre positivo ($\\Delta<0$), quindi lì il modulo non serve."], "Occhio"),
    ] },

    { t: "sez", testo: "8 · Trovare $c$ con una condizione" },
    facile(["Delle infinite primitive (la stessa curva spostata in su o in giù) ne voglio <b>una sola</b>: quella che passa per un punto dato. Il punto fissa l'altezza, cioè il valore di $c$."]),
    { t: "due", sx: [
      { t: "box", tipo: "passi", righe: [
        "1. integro e scrivo il risultato con $+c$",
        "2. metto le coordinate del punto al posto di $x$ e $y$",
        "3. ricavo $c$ e lo sostituisco",
      ] },
      { t: "p", testo: "Se il dato è $f''$, integro <b>due volte</b> e ho due costanti $c_1$ e $c_2$: servono due condizioni." },
    ], dx: [
      { t: "box", titolo: "Esercizio del 18/11", righe: [
        "primitiva di $f(x)=-4x$ che passa per $P(-2;\\,1)$",
        "1. $F(x)=\\int-4x\\,dx=-4\\frac{x^2}{2}=-2x^2+c$",
        "2. $F(-2)=1$: $-2\\cdot(-2)^2+c=1$, cioè $-8+c=1$",
        "3. $c=9$, quindi $F(x)=-2x^2+9$",
      ] },
      { t: "p", testo: "Qui non serve scrivere gli estremi sull'integrale ($\\int_{-2}^{1}$): quello è l'integrale <b>definito</b>, un'altra cosa (sezione 10). Il punto si usa solo dopo, per trovare $c$." },
    ] },

    { t: "sez", testo: "9 · Quale metodo uso?" },
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: [
        "1. È in tabella (dopo aver riscritto)? $\\to$ <b>immediato</b>",
        "2. C'è $f(x)$ con accanto $f'(x)$? $\\to$ <b>composta</b>",
        "3. Frazione di polinomi? $\\to$ <b>fratte</b>",
        "4. Prodotto $x^n\\cdot$ ($\\sin$, $\\cos$, $e^x$, $\\ln$, $\\arctan$)? $\\to$ <b>per parti</b>",
        "5. C'è $\\sqrt{\\ldots}$? $\\to$ <b>sostituzione</b>",
      ] },
      facile(["Si prova in quest'ordine, dal metodo più veloce al più lungo. Come cercare le chiavi: prima in tasca, poi nello zaino, poi in tutta la casa."]),
    ], dx: [
      { t: "box", tipo: "occhio", titolo: "Errori tipici", righe: [
        "• dimenticare il $+c$",
        "• $\\int\\frac1x\\neq\\frac{x^0}{0}$: con $\\alpha=-1$ esce $\\ln|x|$",
        "• $\\int\\frac1{x^2}$ non è un logaritmo: è una potenza, $x^{-2}$, e dà $-\\frac1x$",
        "• dimenticare il modulo nel $\\ln$",
        "• sbagliare il segno di $\\int\\sin x$",
        "• integrare un prodotto pezzo per pezzo: $\\int x\\cdot2^{-x}\\neq\\frac{x^2}{2}\\cdot\\frac{2^{-x}}{\\ldots}$",
        "• \"aggiustare\" una $x$ che manca: si aggiustano solo i numeri",
        "• nelle composte, dimenticare di dividere per il numero aggiunto",
      ] },
    ] },

    { t: "sez", testo: "10 · Un'occhiata avanti: l'integrale definito (lezione del 18/11)" },
    facile(["L'integrale <b>definito</b> non dà una funzione ma un <b>numero</b>: l'area sotto il grafico tra due valori $a$ e $b$ dell'asse $x$. Per calcolarla si riempie la zona con tanti rettangoli sottili e si sommano le loro aree: più sono sottili, più la somma è precisa."]),
    { t: "due", sx: [
      { t: "box", tipo: "memo", righe: [
        "$$\\int_a^b f(x)\\,dx$$",
        "$a$ = estremo <b>inferiore</b> (in basso), $b$ = estremo <b>superiore</b> (in alto), con $a<b$",
        "se $f\\geq0$ è l'area tra il grafico, l'asse $x$ e le rette $x=a$, $x=b$",
      ] },
    ], dx: [
      { t: "box", titolo: "Il caso più semplice", righe: [
        "$f(x)=3$ (retta orizzontale) tra $x=1$ e $x=5$",
        "la zona è un rettangolo: base $5-1=4$, altezza 3",
        "$\\int_1^5 3\\,dx=4\\cdot3=12$",
      ] },
      { t: "p", testo: "Il collegamento con le primitive (come si calcola $\\int_a^b$ con $F$) è il prossimo argomento: lo aggiungiamo quando arriva negli appunti." },
    ] },

    { t: "sez", testo: "11 · Correzioni agli appunti" },
    { t: "p", testo: "• <b>12/10</b>: \"$\\alpha\\neq1$\" va scritto $\\alpha\\neq-1$; e la linearità è $\\int k\\,f(x)\\,dx=k\\int f(x)\\,dx$, non \"$\\int Kx\\,dx=K\\int x^{\\alpha}dx$\".<br>• <b>28/10</b>, $\\int x\\,e^{2x}dx$: nel secondo integrale $e^{2x}$ integrato dà $\\frac{e^{2x}}{2}$, non $e^{2x}$.<br>• <b>11/11</b>, $\\int(\\sqrt x+\\frac1{x^2})$: l'esercizio si ferma a $\\frac{x^{3/2}}{3/2}$; manca il secondo pezzo, $-\\frac1x$, e il $+c$. Anche in $3\\sin x-2e^x+4\\arctan x$ manca il $+c$.<br>• <b>18/11</b>: $\\int\\frac{x}{\\cos x}dx$ non si fa con i metodi del programma; probabilmente è $\\frac{x}{\\cos^2x}$. Anche sulla lavagna del 18/11 è scritto $\\frac{x}{\\cos x}$, quindi l'errore è del testo dato in classe: chiedi al prof. Nell'esercizio della primitiva per $P(-2;1)$ non vanno scritti gli estremi sull'integrale.<br>• <b>19/11</b>, $\\int\\frac1{x^2}dx$: non è $\\ln\\frac{x^3}{3}$ ma $-\\frac1x+c$.<br>• <b>19/11</b>, $\\int\\left(\\frac{6^x}{2^{x+1}}+2e^x\\right)dx$: $6^x$ non è $2\\cdot3x$ ma $2^x\\cdot3^x$, e un prodotto non si integra pezzo per pezzo. Risultato: $\\frac{3^x}{2\\ln3}+2e^x+c$. Se invece il testo era $6x$ (senza esponente), serve il metodo per parti.<br>• <b>19/11</b>, $\\int x\\sqrt{x^2+9}\\,dx$: manca il $\\frac12$ del trucco della costante; il risultato è $\\frac13\\sqrt{(x^2+9)^3}+c$, non $\\frac23$. In $\\frac{x^2}{2}+\\ln(x)$ manca il modulo: $\\ln|x|$.<br>• <b>Lavagna del 18/11</b>, $\\int(x+2)e^{-x}dx$: con $g=-e^{-x}$ il secondo pezzo è $-\\int(-e^{-x})\\cdot1\\,dx=+\\int e^{-x}dx$, non $-\\int e^{-x}dx$. Il risultato finale $-\\frac{x+3}{e^x}+c$ è comunque giusto." },
  ],
};
