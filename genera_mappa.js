// Genera la mappa (schematica: tabelle, catene di passi, alberi; 1 foglio A4 fronte-retro, da ricopiare a mano e portare
// all'esame) da contenuto_mappa.js, stampata con Brave via puppeteer-core.
// Uso: node genera_mappa.js <cartella dell'argomento | file di contenuto> <output.pdf>
// (es. node genera_mappa.js integrali ~/Documenti/Mappa_integrali.pdf)
const fs = require("fs");
const path = require("path");
const os = require("os");
const katex = require("katex");
const puppeteer = require("puppeteer-core");
// Nel contenuto: facciate.legenda sostituisce la legenda, facciate.scala ingrandisce tutto (1.45 = corpo 12 pt,
// come la scrittura a mano). L'HTML va accanto al contenuto, così le immagini (img/...) si trovano.
const [ARGOMENTO, USCITA] = process.argv.slice(2);
if (!ARGOMENTO || !USCITA) {
  console.error("uso: node genera_mappa.js <cartella dell'argomento | file di contenuto> <output.pdf>");
  process.exit(2);
}
const CONTENUTO = fs.existsSync(ARGOMENTO) && fs.statSync(ARGOMENTO).isDirectory()
  ? path.resolve(ARGOMENTO, "contenuto_mappa.js") : path.resolve(ARGOMENTO);
const facciate = require(CONTENUTO);
const SCALA = facciate.scala || 1;
const ALTEZZA_PAGINA_MM = 284;

const BRAVE = "/opt/brave-bin/brave";
const KATEX_DIR = path.join(__dirname, "node_modules/katex/dist");
const LARGHEZZA_UTILE_MM = 210 - 2 * 8; // A4 meno i margini laterali di @page
const PX_PER_MM = 96 / 25.4;

function tex(s) {
  const display = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) =>
    `<div class="disp">${katex.renderToString(t, { displayMode: true, throwOnError: true })}</div>`);
  return display.replace(/\$([^$]+?)\$/g, (_, t) => katex.renderToString("\\displaystyle " + t, { throwOnError: true }));
}

function riga(r) {
  const cont = /^\$[=+-]/.test(r) ? " cont" : "";
  return `<div class="riga${cont}">${tex(r)}</div>`;
}

// Tabella a due colonne (vedo | faccio), divisa in b.gruppi tabelle affiancate.
function tabella(b) {
  const gruppi = b.gruppi || 1;
  const perGruppo = Math.ceil(b.tab.length / gruppi);
  const intest = b.intest ? `<tr>${b.intest.map((h) => `<th>${tex(h)}</th>`).join("")}</tr>` : "";
  const tabelle = Array.from({ length: gruppi }, (_, g) => b.tab.slice(g * perGruppo, (g + 1) * perGruppo))
    .map((righe) => `<table>${intest}${righe.map((r) => `<tr>${r.map((c) => `<td>${tex(c)}</td>`).join("")}</tr>`).join("")}</table>`);
  return `<div class="tabelle" style="grid-template-columns: repeat(${gruppi}, minmax(0, 1fr))">${tabelle.join("")}</div>`;
}

// Albero decisionale: nodo = {t: testo, f: [figli]}.
function ramo(n) {
  const figli = n.f ? `<ul>${n.f.map((f) => `<li>${ramo(f)}</li>`).join("")}</ul>` : "";
  return `<span class="nodo">${tex(n.t)}</span>${figli}`;
}

// Un riquadro può avere, in quest'ordine: righe (b), tabella (tab), catena di passi (flow), albero (albero), righe finali (dopo).
function riquadro(b) {
  const classi = ["box", b.mem ? "mem" : "der"].join(" ");
  const da = b.da ? `<div class="da">⇐ ${tex(b.da)}</div>` : "";
  const parti = [
    b.b ? `<div class="corpo" style="column-count:${b.cols || 1}">${b.b.map(riga).join("")}</div>` : "",
    b.tab ? tabella(b) : "",
    b.flow ? `<div class="passi">${b.flow.map((r) => `<span class="passo">${tex(r)}</span>`).join('<span class="freccia">→</span>')}</div>` : "",
    b.albero ? `<div class="albero">${ramo(b.albero)}</div>` : "",
    b.dopo ? `<div class="corpo">${b.dopo.map(riga).join("")}</div>` : "",
  ].join("");
  return `<div class="${classi}" style="grid-column: span ${b.w}"><h3><span>${tex(b.h)}</span></h3>${da}${parti}</div>`;
}

function facciata(f, i) {
  const sezioni = f.sezioni.map((s) =>
    `<h2>${s.titolo}</h2><div class="griglia">${s.box.map(riquadro).join("")}</div>`).join("");
  return `<section class="page">
    <header><h1>${f.titolo}</h1><div class="legenda">${facciate.legenda !== undefined ? facciate.legenda : `<span class="lm">spesso</span> a memoria
      <span class="ld">sottile</span> si ricava &nbsp;⇐ da dove viene`} · ${i + 1}/${facciate.length}</div></header>
    ${sezioni}</section>`;
}

const css = `
@page { size: A4 portrait; margin: 7mm 8mm 6mm 8mm; }
body { font-family: "Noto Sans", sans-serif; font-size: 8.3pt; line-height: 1.25; color: #111; margin: 0; }
.page { page-break-after: always; zoom: ${SCALA}; height: calc(${ALTEZZA_PAGINA_MM}mm / ${SCALA}); overflow: hidden; }
.page:last-child { page-break-after: auto; }
header { display: flex; align-items: baseline; justify-content: space-between; gap: 3mm; margin-bottom: 1.5mm; }
h1 { font-size: 13pt; margin: 0; white-space: nowrap; }
.legenda { font-size: 7pt; color: #333; text-align: right; }
.lm, .ld { border: 2px solid #111; padding: 0 1mm; font-weight: 700; }
.ld { border-width: 0.8px; font-weight: 400; }
h2 { background: #111; color: #fff; font-size: 9.5pt; margin: 1.2mm 0 1.2mm 0; padding: 0.5mm 2mm; }
.griglia { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1.3mm; }
.box { border: 0.8px solid #111; padding: 1mm 1.8mm; break-inside: avoid; }
.box.mem { border: 2.2px solid #111; }
h3 { margin: 0 0 0.6mm 0; font-size: 9pt; display: flex; justify-content: space-between; gap: 2mm; }
.da { font-size: 8pt; color: #222; margin-bottom: 0.5mm; }
.corpo { column-gap: 5mm; }
.riga { margin: 0.35mm 0; break-inside: avoid; }
.riga.cont { padding-left: 5mm; }
.disp .katex-display { margin: 0.5mm 0; }
.katex { font-size: 1.08em; white-space: nowrap; }
.q { font-size: 7pt; border: 1px solid #555; border-radius: 2px; padding: 0 0.8mm; color: #333; }
.passi { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8mm 1.5mm; }
.passo { border: 0.8px solid #111; border-radius: 3px; padding: 0.4mm 1.5mm; }
.freccia { font-size: 9pt; font-weight: 700; }
.tabelle { display: grid; gap: 0 2mm; margin: 0.6mm 0; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 0.6px solid #555; padding: 0.3mm 1.2mm; text-align: left; vertical-align: middle; }
th { background: #e6e6e6; font-weight: 700; }
.albero ul { list-style: none; margin: 0; padding-left: 4mm; }
.albero li { position: relative; padding: 0.5mm 0 0.5mm 3.5mm; }
.albero li::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; border-left: 1px solid #111; }
.albero li:last-child::before { bottom: auto; height: 3.4mm; }
.albero li::after { content: ""; position: absolute; left: 0; top: 3.4mm; width: 3mm; border-top: 1px solid #111; }
.nodo { display: inline-block; border: 0.8px solid #111; border-radius: 3px; padding: 0.2mm 1.5mm; background: #fff; }
.albero > .nodo { font-weight: 700; border-width: 1.6px; }
.box img { display: block; max-width: 100%; margin: 0.5mm auto; }
.affianca { display: flex; align-items: center; gap: 2mm; }
.affianca img { margin: 0; }
`;

async function main() {
  const out = path.resolve(USCITA);
  const katexCss = fs.readFileSync(path.join(KATEX_DIR, "katex.min.css"), "utf8")
    .replace(/url\(fonts\//g, `url(file://${KATEX_DIR}/fonts/`);
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8">
    <style>${katexCss}</style><style>${css}</style></head>
    <body>${facciate.map(facciata).join("")}</body></html>`;
  const htmlPath = path.join(path.dirname(CONTENUTO), "mappa.html");
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
    const misure = await page.evaluate(() =>
      [...document.querySelectorAll(".page")].map((p, i) => {
        const ultimo = [...p.querySelectorAll(".box")].reduce((m, b) => Math.max(m, b.getBoundingClientRect().bottom), 0);
        return { facciata: i + 1, libero_px: Math.round(p.getBoundingClientRect().bottom - ultimo) };
      }));
    console.log("spazio libero in fondo:", JSON.stringify(misure));
    if (misure.some((m) => m.libero_px < 0)) console.error("ATTENZIONE: una facciata sfora");
    const larghe = await page.evaluate(() =>
      [...document.querySelectorAll(".riga, .passo, h3, td, .nodo")].filter((r) => {
        const box = r.closest(".box").getBoundingClientRect();
        return [...r.querySelectorAll(".katex")].some((k) => k.getBoundingClientRect().right > box.right - 2);
      }).map((r) => r.textContent.slice(0, 60)));
    if (larghe.length) console.error("ATTENZIONE formule fuori dal riquadro:\n" + larghe.join("\n"));
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log("PDF scritto:", out);
  } finally {
    await browser.close();
    fs.rmSync(profilo, { recursive: true, force: true });
  }
}

main().catch((e) => { console.error("ERRORE:", e.message); process.exit(1); });
