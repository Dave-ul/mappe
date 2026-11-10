// Prova di verifica sugli integrali indefiniti (esercizi originali, risultati controllati da verifica_prova.py).
// Fonti degli argomenti: libro cap. 22 pp. 1234-1253, quaderno Saber 12/10-28/10, scheda matematika.it v7.7.
module.exports = {
  titolo: "Prova · Integrali indefiniti",
  blocchi: [
    { t: "titolo", testo: "Prova di verifica: integrali indefiniti",
      sotto: "Tempo consigliato: 2 ore, oppure una parte per volta · Totale 100 punti, voto = punti ÷ 10 · ★ = esercizio più difficile · Soluzioni nel file Prova_integrali_soluzioni.pdf" },
    { t: "p", testo: "Scrivi tutti i passaggi. Alla fine di ogni esercizio <b>deriva il risultato</b> e controlla di ritrovare la funzione integranda." },

    { t: "sez", testo: "A · Teoria", punti: 8 },
    { t: "es", col: 1, righe: [
      ["A1", "Vero o falso?"],
      ["", "a) Se $F(x)$ è una primitiva di $f(x)$, anche $F(x)+7$ lo è."],
      ["", "b) $\\int f(x)\\,g(x)\\,dx=\\int f(x)\\,dx\\cdot\\int g(x)\\,dx$"],
      ["", "c) Ogni funzione continua in un intervallo ha una primitiva."],
      ["", "d) $\\int x^{-1}dx=\\frac{x^{0}}{0}+c$"],
      ["", "e) $\\int k\\,f(x)\\,dx=k\\int f(x)\\,dx$"],
      ["A2", "Quale funzione è una primitiva di $2x\\cos x^2$? &nbsp; a) $\\sin x^2$ &nbsp; b) $2\\sin x^2$ &nbsp; c) $-\\sin x^2$ &nbsp; d) $x^2\\sin x^2$"],
      ["A3", "Verifica derivando che $\\int x\\,e^x\\,dx=(x-1)\\,e^x+c$."],
      ["A4", "Perché nel risultato si scrive sempre $+c$? Perché in $\\int\\frac1x\\,dx=\\ln|x|+c$ serve il valore assoluto?"],
    ] },

    { t: "sez", testo: "B · Integrali immediati", punti: 14, nota: "Riscrivi radici e frazioni come potenze, spezza, semplifica." },
    { t: "es", righe: [
      ["B1", "$\\int(4x^3-6x+5)\\,dx$"],
      ["B2", "$\\int\\left(\\sqrt{x}+\\frac{1}{x^2}\\right)dx$"],
      ["B3", "$\\int\\frac{x^2+3}{x}\\,dx$"],
      ["B4", "$\\int\\left(3\\cos x-2e^x+\\frac{4}{1+x^2}\\right)dx$"],
      ["B5", "$\\int5^x\\,dx$"],
      ["B6", "$\\int\\frac{x^2-4}{x-2}\\,dx$"],
      ["B7", "$\\int\\sqrt[3]{x^2}\\,dx$"],
    ] },

    { t: "sez", testo: "C · Funzioni composte", punti: 20, nota: "Cerca $f(x)$ e la sua derivata $f'(x)$; se manca una costante, moltiplica e dividi." },
    { t: "es", righe: [
      ["C1", "$\\int(3x+1)^5\\,dx$"],
      ["C2", "$\\int x^2\\,(x^3+2)^4\\,dx$"],
      ["C3", "$\\int\\frac{2x}{x^2+5}\\,dx$"],
      ["C4", "$\\int x\\,e^{x^2}\\,dx$"],
      ["C5", "$\\int\\cos 4x\\,dx$"],
      ["C6", "$\\int\\sin x\\,\\cos^3x\\,dx$"],
      ["C7", "$\\int\\frac{1}{9+x^2}\\,dx$"],
      ["C8", "$\\int\\frac{\\ln^3x}{x}\\,dx$"],
      ["C9", "$\\int\\frac{x}{\\sqrt{1-x^4}}\\,dx$"],
      ["C10", "$\\int\\frac{e^x}{1+e^{2x}}\\,dx$"],
    ] },

    { t: "sez", testo: "D · Integrazione per parti", punti: 15, nota: "$\\int f\\,g'\\,dx=f\\,g-\\int f'\\,g\\,dx$ · D6 vale 3 punti di bonus" },
    { t: "es", righe: [
      ["D1", "$\\int x\\cos x\\,dx$"],
      ["D2", "$\\int x\\,e^{-x}\\,dx$"],
      ["D3", "$\\int x^2\\ln x\\,dx$"],
      ["D4", "$\\int\\arctan x\\,dx$"],
      ["D5", "$\\int x^2\\sin x\\,dx$ &nbsp;(due volte)"],
      ["D6 ★", "$\\int e^x\\sin x\\,dx$ &nbsp;(ritorna l'integrale di partenza)"],
    ] },

    { t: "sez", testo: "E · Integrazione per sostituzione", punti: 9 },
    { t: "es", col: 3, righe: [
      ["E1", "$\\int\\frac{1}{x+\\sqrt{x}}\\,dx$"],
      ["E2", "$\\int e^{\\sqrt{x}}\\,dx$"],
      ["E3 ★", "$\\int x\\sqrt{x-1}\\,dx$"],
    ] },

    { t: "sez", testo: "F · Funzioni razionali fratte", punti: 20, nota: "Prima i gradi, poi il denominatore: 1° grado, oppure 2° grado con $\\Delta>0$, $\\Delta=0$, $\\Delta<0$." },
    { t: "es", righe: [
      ["F1", "$\\int\\frac{1}{2x-5}\\,dx$"],
      ["F2", "$\\int\\frac{2x+3}{x+1}\\,dx$"],
      ["F3", "$\\int\\frac{x+7}{x^2-x-2}\\,dx$"],
      ["F4", "$\\int\\frac{3x-1}{x^2-2x+1}\\,dx$"],
      ["F5", "$\\int\\frac{1}{x^2-4x+13}\\,dx$"],
      ["F6", "$\\int\\frac{x+3}{x^2+2x+5}\\,dx$"],
      ["F7", "$\\int\\frac{x^3-2x^2+3}{x-1}\\,dx$"],
      ["F8 ★", "$\\int\\frac{x^2+2}{x^3-x}\\,dx$"],
    ] },

    { t: "sez", testo: "G · Trovare la costante $c$", punti: 6 },
    { t: "es", col: 1, righe: [
      ["G1", "Trova la primitiva di $f(x)=3x^2-4x+1$ il cui grafico passa per $P(1;\\,5)$."],
      ["G2", "Trova $f(x)$ sapendo che $f''(x)=12x^2-6$, $f'(0)=2$ e $f(1)=0$."],
      ["G3", "Trova $f(x)$, con $x>0$, sapendo che $f'(x)=\\frac{1}{x}$ e $f(e)=3$."],
    ] },

    { t: "sez", testo: "H · Riepilogo: scegli tu il metodo", punti: 8, nota: "Prima di calcolare scrivi quale metodo usi e perché." },
    { t: "es", righe: [
      ["H1", "$\\int\\frac{3x^2-1}{x^3-x}\\,dx$"],
      ["H2", "$\\int\\frac{\\ln x}{x^2}\\,dx$"],
      ["H3", "$\\int\\frac{x}{(x+1)^2}\\,dx$"],
      ["H4", "$\\int\\frac{\\cos x}{1+\\sin^2x}\\,dx$"],
      ["H5", "$\\int\\frac{(e^x+1)^2}{e^x}\\,dx$"],
    ] },

  ],
};
