// Genera il PDF delle mappe da ricopiare: HTML con formule KaTeX, stampato con Brave via puppeteer-core.
// Uso: node genera.js <output.pdf>
const fs = require("fs");
const path = require("path");
const os = require("os");
const katex = require("katex");
const puppeteer = require("puppeteer-core");
const pagine = require("./contenuto.js");

const BRAVE = "/opt/brave-bin/brave";
const KATEX_DIR = path.join(__dirname, "node_modules/katex/dist");

function tex(s) {
  // Prima le formule display $$...$$, poi le inline $...$.
  const display = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) =>
    `<div class="disp">${katex.renderToString(t, { displayMode: true, throwOnError: true })}</div>`);
  return display.replace(/\$([^$]+?)\$/g, (_, t) => katex.renderToString("\\displaystyle " + t, { throwOnError: true }));
}

function nodo(n) {
  // Le righe che iniziano con "$=", "$+" o "$-" continuano il passaggio precedente: rientrate.
  const righe = n.b.map((r) => `<div${/^\$[=+-]/.test(r) ? ' class="riga cont"' : ' class="riga"'}>${tex(r)}</div>`).join("");
  return `<div class="node"><h3>${tex(n.h)}</h3>${righe}</div>`;
}

function pagina(p, i) {
  const colonne = p.cols.map((c) => `<div class="col">${c.map(nodo).join("")}</div>`).join("");
  return `<section class="page">
    <header><div class="root">${tex(p.root)}</div><div class="sub">${p.sub} · facciata ${i + 1}/${pagine.length}</div></header>
    <div class="tree">${colonne}</div></section>`;
}

const css = `
@page { size: A4 portrait; margin: 9mm 9mm 8mm 9mm; }
body { font-family: "Noto Sans", sans-serif; font-size: 12.5pt; line-height: 1.3; color: #111; margin: 0; }
.page { page-break-after: always; display: flex; flex-direction: column; height: 279mm; }
.page:last-child { page-break-after: auto; }
header { text-align: center; margin-bottom: 3mm; }
.root { display: inline-block; border: 2.4px solid #111; border-radius: 14px; padding: 2mm 7mm; font-size: 17pt; font-weight: 700; }
.sub { font-size: 8.5pt; color: #555; margin-top: 1mm; }
.tree { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 6mm; position: relative; padding-top: 4mm; border-top: 2px solid #111; }
.col { border-left: 2px solid #111; padding-left: 0; margin-left: 2mm; }
.node { position: relative; margin: 0 0 3.2mm 6mm; border: 1.4px solid #111; border-radius: 8px; padding: 1.4mm 2.4mm; break-inside: avoid; }
.node::before { content: ""; position: absolute; left: calc(-6mm - 1.4px); top: 4mm; width: 6mm; border-top: 2px solid #111; }
h3 { margin: 0 0 1mm 0; font-size: 12pt; text-decoration: underline; }
.riga { margin: 0.6mm 0; }
.disp { margin: 0.4mm 0; }
.katex-display { margin: 0.6mm 0; }
.katex { font-size: 1.05em; white-space: nowrap; }
.riga.cont { padding-left: 6mm; }
.q { font-size: 8pt; border: 1px solid #555; border-radius: 3px; padding: 0 1mm; color: #333; }
`;

async function main() {
  const out = process.argv[2];
  if (!out) throw new Error("manca il percorso del PDF di uscita");
  const katexCss = fs.readFileSync(path.join(KATEX_DIR, "katex.min.css"), "utf8")
    .replace(/url\(fonts\//g, `url(file://${KATEX_DIR}/fonts/`);
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8">
    <style>${katexCss}</style><style>${css}</style></head>
    <body>${pagine.map(pagina).join("")}</body></html>`;
  const htmlPath = path.join(__dirname, "mappe.html");
  fs.writeFileSync(htmlPath, html);

  const profilo = fs.mkdtempSync(path.join(os.tmpdir(), "brave-pdf-"));
  const browser = await puppeteer.launch({
    executablePath: BRAVE, headless: true, userDataDir: profilo,
    args: ["--no-first-run", "--disable-extensions", "--allow-file-access-from-files"],
  });
  try {
    const page = await browser.newPage();
    // Misura alla larghezza utile del foglio (A4 210 mm meno 18 mm di margini, 96 px/pollice) e con il CSS di stampa.
    await page.setViewport({ width: Math.round((192 / 25.4) * 96), height: 1100 });
    await page.emulateMediaType("print");
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    const overflow = await page.evaluate(() =>
      [...document.querySelectorAll(".page")].map((p, i) => ({ i: i + 1, extra: p.scrollHeight - p.clientHeight }))
        .filter((o) => o.extra > 0));
    if (overflow.length) console.error("ATTENZIONE pagine che sforano:", JSON.stringify(overflow));
    const larghe = await page.evaluate(() =>
      [...document.querySelectorAll(".node")].flatMap((n) => {
        const limite = n.getBoundingClientRect().right - 6;
        return [...n.querySelectorAll(".riga, h3")]
          .filter((p) => [...p.querySelectorAll(".katex, .katex-display")].some((k) => k.getBoundingClientRect().right > limite))
          .map((p) => p.textContent.slice(0, 50));
      }));
    if (larghe.length) console.error("ATTENZIONE formule fuori dal riquadro:\n" + larghe.join("\n"));
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log("PDF scritto:", out);
  } finally {
    await browser.close();
    fs.rmSync(profilo, { recursive: true, force: true });
  }
}

main().catch((e) => { console.error("ERRORE:", e.message); process.exit(1); });
