// Genera un documento a scorrimento (prova, soluzioni, spiegazione) da un file di contenuto: HTML con KaTeX stampato con Brave.
// Uso: node genera_doc.js <contenuto.js> <output.pdf>  (es. integrali/prova.js)
// Blocchi del contenuto:
//   {t:"titolo", testo, sotto}            intestazione del documento
//   {t:"sez", testo, punti?, nota?}        titolo di sezione (punti = punteggio della sezione)
//   {t:"p", testo}                         paragrafo
//   {t:"es", righe:[[n, testo], ...], col?} esercizi numerati, in griglia (col = colonne, default 2)
//   {t:"box", titolo?, righe:[], tipo?}    riquadro: tipo "memo" (bordo spesso), "occhio" (attenzione), "passi"
//   {t:"sol", n, righe:[]}                 soluzione svolta di un esercizio
//   {t:"tab", righe:[[...]], intest?:[], larghezze?:["30%",...]}   tabella
//   {t:"due", sx:[blocchi], dx:[blocchi]}  due colonne di blocchi
//   {t:"salto"}                            nuova pagina
const fs = require("fs");
const path = require("path");
const os = require("os");
const katex = require("katex");
const puppeteer = require("puppeteer-core");

const BRAVE = "/opt/brave-bin/brave";
const KATEX_DIR = path.join(__dirname, "node_modules/katex/dist");
const LARGHEZZA_UTILE_MM = 190; // A4 210 mm meno 2 x 10 mm di margine
const PX_PER_MM = 96 / 25.4;

function tex(s) {
  const display = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) =>
    `<div class="disp">${katex.renderToString(t, { displayMode: true, throwOnError: true })}</div>`);
  return display.replace(/\$([^$]+?)\$/g, (_, t) => katex.renderToString("\\displaystyle " + t, { throwOnError: true }));
}

const righe = (rr) => rr.map((r) => `<div class="riga${/^\$[=+-]/.test(r) ? " cont" : ""}">${tex(r)}</div>`).join("");

const RENDER = {
  titolo: (b) => `<header><h1>${tex(b.testo)}</h1>${b.sotto ? `<div class="sotto">${tex(b.sotto)}</div>` : ""}</header>`,
  sez: (b) => `<h2><span>${tex(b.testo)}</span>${b.punti ? `<span class="punti">${b.punti} punti</span>` : ""}</h2>${b.nota ? `<div class="nota">${tex(b.nota)}</div>` : ""}`,
  p: (b) => `<p>${tex(b.testo)}</p>`,
  es: (b) => `<div class="es" style="grid-template-columns: repeat(${b.col || 2}, minmax(0, 1fr))">${b.righe
    .map(([n, t]) => `<div class="item"><span class="n">${n}</span><span>${tex(t)}</span></div>`).join("")}</div>`,
  box: (b) => `<div class="box ${b.tipo || ""}">${b.titolo ? `<h3>${tex(b.titolo)}</h3>` : ""}${righe(b.righe)}</div>`,
  sol: (b) => `<div class="sol"><span class="n">${b.n}</span><div>${righe(b.righe)}</div></div>`,
  tab: (b) => `<table>${b.larghezze ? `<colgroup>${b.larghezze.map((w) => `<col style="width:${w}">`).join("")}</colgroup>` : ""}${b.intest ? `<tr>${b.intest.map((c) => `<th>${tex(c)}</th>`).join("")}</tr>` : ""}${b.righe
    .map((r) => `<tr>${r.map((c) => `<td>${tex(c)}</td>`).join("")}</tr>`).join("")}</table>`,
  due: (b) => `<div class="due"><div>${b.sx.map(blocco).join("")}</div><div>${b.dx.map(blocco).join("")}</div></div>`,
  salto: () => `<div class="salto"></div>`,
};

function blocco(b) {
  const r = RENDER[b.t];
  if (!r) throw new Error(`blocco sconosciuto: ${b.t}`);
  return r(b);
}

const css = `
@page { size: A4 portrait; margin: 10mm 10mm 11mm 10mm; }
body { font-family: "Noto Sans", sans-serif; font-size: 10.5pt; line-height: 1.35; color: #111; margin: 0; }
header { text-align: center; border-bottom: 2.4px solid #111; padding-bottom: 2mm; margin-bottom: 3mm; }
h1 { font-size: 18pt; margin: 0; }
.sotto { font-size: 9pt; color: #444; margin-top: 1mm; }
h2 { font-size: 13pt; margin: 4mm 0 1.5mm; border-bottom: 1.4px solid #111; display: flex; justify-content: space-between; break-after: avoid; }
h2 .punti { font-size: 9.5pt; font-weight: 400; border: 1px solid #111; border-radius: 4px; padding: 0 1.5mm; align-self: center; }
h3 { font-size: 11pt; margin: 0 0 1mm; }
.nota { font-size: 9pt; color: #444; margin: -0.5mm 0 1.5mm; break-after: avoid; }
p { margin: 1mm 0; }
.es { display: grid; gap: 2.2mm 6mm; margin: 1.5mm 0 2mm; }
.item { display: flex; gap: 2mm; align-items: baseline; break-inside: avoid; }
.n { font-weight: 700; min-width: 7mm; flex-shrink: 0; }
.box { border: 1.2px solid #111; border-radius: 6px; padding: 1.5mm 3mm; margin: 2mm 0; break-inside: avoid; }
.box.memo { border-width: 2.4px; }
.box.occhio { border-style: dashed; border-width: 1.6px; }
.box.passi { background: #f2f2f2; }
.sol { display: flex; gap: 2mm; border-bottom: 1px dotted #888; padding: 1mm 0 1.4mm; break-inside: avoid; }
.riga { margin: 0.5mm 0; }
.riga.cont { padding-left: 6mm; }
.disp { margin: 0.4mm 0; }
.katex-display { margin: 0.6mm 0; }
.katex { font-size: 1.05em; white-space: nowrap; }
table { border-collapse: collapse; width: 100%; margin: 2mm 0; table-layout: fixed; }
tr { break-inside: avoid; }
th, td { border: 1px solid #111; padding: 1mm 2mm; text-align: left; vertical-align: top; }
th { background: #eee; }
.due { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 6mm; }
.salto { break-after: page; }
`;

async function main() {
  const [sorgente, out] = process.argv.slice(2);
  if (!sorgente || !out) throw new Error("uso: node genera_doc.js <contenuto.js> <output.pdf>");
  const doc = require(path.resolve(sorgente));
  const katexCss = fs.readFileSync(path.join(KATEX_DIR, "katex.min.css"), "utf8")
    .replace(/url\(fonts\//g, `url(file://${KATEX_DIR}/fonts/`);
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>${doc.titolo}</title>
    <style>${katexCss}</style><style>${css}</style></head><body>${doc.blocchi.map(blocco).join("")}</body></html>`;
  const htmlPath = path.join(path.dirname(path.resolve(sorgente)), path.basename(sorgente, ".js") + ".html");
  fs.writeFileSync(htmlPath, html);

  const profilo = fs.mkdtempSync(path.join(os.tmpdir(), "brave-pdf-"));
  const browser = await puppeteer.launch({
    executablePath: BRAVE, headless: true, userDataDir: profilo,
    args: ["--no-first-run", "--disable-extensions", "--allow-file-access-from-files"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: Math.round(LARGHEZZA_UTILE_MM * PX_PER_MM), height: 1100 });
    await page.emulateMediaType("print");
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    // Formule che escono dal loro contenitore (farebbero rimpicciolire tutto il PDF).
    const larghe = await page.evaluate(() =>
      [...document.querySelectorAll(".item, .sol, .box, td, p")].flatMap((c) => {
        const limite = c.getBoundingClientRect().right + 1;
        return [...c.querySelectorAll(".katex")].filter((k) => k.getBoundingClientRect().right > limite)
          .map(() => c.textContent.slice(0, 60));
      }));
    if (larghe.length) console.error("ATTENZIONE formule fuori dal contenitore:\n" + [...new Set(larghe)].join("\n"));
    const larghezza = await page.evaluate(() => document.documentElement.scrollWidth);
    if (larghezza > Math.round(LARGHEZZA_UTILE_MM * PX_PER_MM) + 1) console.error("ATTENZIONE pagina più larga del foglio:", larghezza);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: "<span></span>",
      footerTemplate: `<div style="font-size:8px;width:100%;text-align:center;color:#555">${doc.titolo} · <span class="pageNumber"></span>/<span class="totalPages"></span></div>` });
    console.log("PDF scritto:", out);
  } finally {
    await browser.close();
    fs.rmSync(profilo, { recursive: true, force: true });
  }
}

main().catch((e) => { console.error("ERRORE:", e.message); process.exit(1); });
