// Genera la mappa definitiva (1 foglio A4 fronte-retro) da contenuto_definitivo.js, stampata con Brave via puppeteer-core.
// Uso: node genera_definitiva.js <output.pdf>
const fs = require("fs");
const path = require("path");
const os = require("os");
const katex = require("katex");
const puppeteer = require("puppeteer-core");
const facciate = require("./contenuto_definitivo.js");

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

function riquadro(b) {
  const classi = ["box", b.mem ? "mem" : "der", b.flow ? "flow" : ""].join(" ");
  const tag = [b.pag ? `<span class="pag">${b.pag}</span>` : ""].join("");
  const da = b.da ? `<div class="da">⇐ ${tex(b.da)}</div>` : "";
  const corpo = b.flow
    ? `<div class="passi">${b.b.map((r, i) => `<span class="passo">${i + 1}. ${tex(r)}</span>`).join('<span class="freccia">▸</span>')}</div>`
    : `<div class="corpo" style="column-count:${b.cols || 1}">${b.b.map(riga).join("")}</div>`;
  return `<div class="${classi}" style="grid-column: span ${b.w}"><h3><span>${tex(b.h)}</span>${tag}</h3>${da}${corpo}</div>`;
}

function facciata(f, i) {
  const sezioni = f.sezioni.map((s) =>
    `<h2>${s.titolo}</h2><div class="griglia">${s.box.map(riquadro).join("")}</div>`).join("");
  return `<section class="page">
    <header><h1>${f.titolo}</h1><div class="legenda"><span class="lm">spesso</span> a memoria
      <span class="ld">sottile</span> si ricava &nbsp;⇐ da dove viene &nbsp; pp. = libro cap. 22 · ${i + 1}/${facciate.length}</div></header>
    ${sezioni}</section>`;
}

const css = `
@page { size: A4 portrait; margin: 7mm 8mm 6mm 8mm; }
body { font-family: "Noto Sans", sans-serif; font-size: 8.3pt; line-height: 1.25; color: #111; margin: 0; }
.page { page-break-after: always; height: 284mm; overflow: hidden; }
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
.pag { font-size: 7pt; font-weight: 400; color: #555; white-space: nowrap; }
.da { font-size: 8pt; color: #222; margin-bottom: 0.5mm; }
.corpo { column-gap: 5mm; }
.riga { margin: 0.35mm 0; break-inside: avoid; }
.riga.cont { padding-left: 5mm; }
.disp .katex-display { margin: 0.5mm 0; }
.katex { font-size: 1.08em; white-space: nowrap; }
.q { font-size: 7pt; border: 1px solid #555; border-radius: 2px; padding: 0 0.8mm; color: #333; }
.passi { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8mm 1.5mm; }
.passo { border: 0.8px solid #111; border-radius: 3px; padding: 0.4mm 1.5mm; }
.freccia { font-size: 8pt; }
`;

async function main() {
  const out = process.argv[2];
  if (!out) throw new Error("manca il percorso del PDF di uscita");
  const katexCss = fs.readFileSync(path.join(KATEX_DIR, "katex.min.css"), "utf8")
    .replace(/url\(fonts\//g, `url(file://${KATEX_DIR}/fonts/`);
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8">
    <style>${katexCss}</style><style>${css}</style></head>
    <body>${facciate.map(facciata).join("")}</body></html>`;
  const htmlPath = path.join(__dirname, "mappa_definitiva.html");
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
      [...document.querySelectorAll(".riga, .passo, h3")].filter((r) => {
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
