// Genera una mappa mentale (nodo centrale, rami colorati numerati, foglie su curve; A4 orizzontale, una facciata
// per elemento di mappa_mentale.js), stampata con Brave via puppeteer-core. Stessi criteri di genera_mappa.js.
// Uso: node genera_mentale.js <cartella dell'argomento | file di contenuto> <output.pdf>
// Contenuto: [{ centro, rami: [{ n, h, colore, lato: "sx"|"dx", da, img, alto, foglie: [{ t, l, img, alto }] }] }]
// (h = titolo del ramo, da = collegamento "⇐", l = etichetta della foglia, t = testo con formule KaTeX).
const fs = require("fs");
const path = require("path");
const os = require("os");
const katex = require("katex");
const puppeteer = require("puppeteer-core");

const [ARGOMENTO, USCITA] = process.argv.slice(2);
if (!ARGOMENTO || !USCITA) {
  console.error("uso: node genera_mentale.js <cartella dell'argomento | file di contenuto> <output.pdf>");
  process.exit(2);
}
const CONTENUTO = fs.existsSync(ARGOMENTO) && fs.statSync(ARGOMENTO).isDirectory()
  ? path.resolve(ARGOMENTO, "mappa_mentale.js") : path.resolve(ARGOMENTO);
const facciate = require(CONTENUTO);

const BRAVE = "/opt/brave-bin/brave";
const KATEX_DIR = path.join(__dirname, "node_modules/katex/dist");
const MARGINE_MM = 6;
const LARGHEZZA_MM = 297 - 2 * MARGINE_MM;
const ALTEZZA_MM = 210 - 2 * MARGINE_MM;
const PX_PER_MM = 96 / 25.4;
const CORPO_PT = 12; // come la scrittura a mano

function tex(s) {
  return s.replace(/\$([^$]+?)\$/g, (_, t) => katex.renderToString("\\displaystyle " + t, { throwOnError: true }));
}

const img = (nome, alto) => (nome ? `<img src="img/${nome}.png" style="height:${alto}mm">` : "");

function foglia(f) {
  const etichetta = f.l ? `<div class="etichetta">${tex(f.l)}</div>` : "";
  const testo = f.t ? `<div>${tex(f.t)}</div>` : "";
  if (f.img) return `<div class="foglia con-img">${etichetta}${img(f.img, f.alto)}${testo}</div>`;
  return `<div class="foglia"><div class="testo">${etichetta}${testo}</div></div>`;
}

function ramo(r) {
  const da = r.da ? `<div class="da">⇐ ${tex(r.da)}</div>` : "";
  const corpo = r.img || r.da ? `<div class="corpo">${da}${img(r.img, r.alto)}</div>` : "";
  return `<div class="ramo" style="--c:${r.colore}">
    <div class="nodo"><div class="titolo"><span class="num">${r.n}</span><span>${tex(r.h)}</span></div>${corpo}</div>
    <div class="foglie">${r.foglie.map(foglia).join("")}</div></div>`;
}

function facciata(f, i) {
  const lato = (l) => `<div class="lato ${l}">${f.rami.filter((r) => r.lato === l).map(ramo).join("")}</div>`;
  return `<section class="page">
    <svg class="linee" xmlns="http://www.w3.org/2000/svg"></svg>
    ${lato("sx")}
    <div class="centro">${f.icona || ""}<div>${tex(f.centro)}</div></div>
    ${lato("dx")}
    <div class="piede">${facciate.legenda || ""} · ${i + 1}/${facciate.length}</div></section>`;
}

const css = `
@page { size: A4 landscape; margin: ${MARGINE_MM}mm; }
body { font-family: "Noto Sans", sans-serif; font-size: ${CORPO_PT}pt; line-height: 1.2; color: #111; margin: 0; }
.page { position: relative; width: ${LARGHEZZA_MM}mm; height: ${ALTEZZA_MM}mm; overflow: hidden;
  display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); column-gap: 6mm; align-items: center;
  page-break-after: always; }
.page:last-child { page-break-after: auto; }
.linee { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.centro { position: relative; text-align: center; font-weight: 700; font-size: 15pt; max-width: 46mm; }
.centro svg { display: block; margin: 0 auto 1mm; }
.lato { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: space-evenly; }
.ramo { display: flex; align-items: center; gap: 10mm; }
.sx .ramo { flex-direction: row-reverse; }
.nodo { flex: none; background: var(--c); color: #fff; border-radius: 2.5mm; padding: 1.2mm 1.6mm; max-width: 56mm; }
.titolo { display: flex; align-items: center; gap: 1.5mm; font-weight: 600; }
.num { flex: none; width: 5mm; height: 5mm; border: 1.3px solid #fff; border-radius: 50%; font-size: 9pt;
  display: flex; align-items: center; justify-content: center; }
.corpo { background: #fff; color: #111; border-radius: 1.5mm; margin-top: 1mm; padding: 0.6mm 1mm; }
.da { font-size: 10pt; }
.corpo img { display: block; margin: 0 auto; }
.foglie { display: flex; flex-direction: column; gap: 1.8mm; min-width: 0; }
.sx .foglie { align-items: flex-end; text-align: right; }
.foglia { display: flex; align-items: center; gap: 1.5mm; font-weight: 600;
  color: color-mix(in srgb, var(--c) 70%, #000); }
.foglia.con-img { flex-direction: column; align-items: flex-start; gap: 0.5mm; }
.sx .foglia.con-img { align-items: flex-end; }
.etichetta { font-weight: 700; }
.foglia img { flex: none; }
.katex { font-size: 1.05em; white-space: nowrap; }
.piede { position: absolute; right: 0; bottom: 0; font-size: 9pt; color: #444; }
`;

// Curve dal centro ai rami (spesse) e dal ramo alle foglie (sottili, con un pallino all'incrocio), come nelle mappe
// mentali: disegnate dopo l'impaginazione, misurando i riquadri.
function disegnaLinee() {
  const NS = "http://www.w3.org/2000/svg";
  const SPESSO = 2.6, SOTTILE = 1.4, PALLINO = 3, STACCO = 14;
  const curva = (svg, x1, y1, x2, y2, colore, spessore) => {
    const p = document.createElementNS(NS, "path");
    const mx = (x1 + x2) / 2;
    p.setAttribute("d", `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
    Object.entries({ fill: "none", stroke: colore, "stroke-width": spessore, "stroke-linecap": "round" })
      .forEach(([k, v]) => p.setAttribute(k, v));
    svg.appendChild(p);
  };
  for (const pagina of document.querySelectorAll(".page")) {
    const svg = pagina.querySelector(".linee");
    const o = pagina.getBoundingClientRect();
    const r = (el) => { const b = el.getBoundingClientRect(); return { l: b.left - o.left, r: b.right - o.left, y: (b.top + b.bottom) / 2 - o.top }; };
    const centro = r(pagina.querySelector(".centro"));
    for (const ramo of pagina.querySelectorAll(".ramo")) {
      const colore = getComputedStyle(ramo).getPropertyValue("--c").trim();
      const sx = ramo.parentElement.classList.contains("sx");
      const nodo = r(ramo.querySelector(".nodo"));
      curva(svg, sx ? centro.l - 2 : centro.r + 2, centro.y, sx ? nodo.r : nodo.l, nodo.y, colore, SPESSO);
      const xNodo = sx ? nodo.l : nodo.r;
      const xNodo2 = sx ? xNodo - STACCO / 3 : xNodo + STACCO / 3;
      for (const f of ramo.querySelectorAll(".foglia")) {
        const fo = r(f);
        curva(svg, xNodo2, nodo.y, sx ? fo.r + 4 : fo.l - 4, fo.y, colore, SOTTILE);
      }
      curva(svg, xNodo, nodo.y, xNodo2, nodo.y, colore, SOTTILE);
      const c = document.createElementNS(NS, "circle");
      Object.entries({ cx: xNodo2, cy: nodo.y, r: PALLINO, fill: "#fff", stroke: colore, "stroke-width": SOTTILE })
        .forEach(([k, v]) => c.setAttribute(k, v));
      svg.appendChild(c);
    }
  }
}

// Controlla che niente esca dalla pagina e che i rami non si sovrappongano.
function controlla() {
  const errori = [];
  document.querySelectorAll(".page").forEach((p, i) => {
    const o = p.getBoundingClientRect();
    const scatole = [...p.querySelectorAll(".nodo, .foglia, .centro")];
    for (const s of scatole) {
      const b = s.getBoundingClientRect();
      if (b.left < o.left - 1 || b.right > o.right + 1 || b.top < o.top - 1 || b.bottom > o.bottom + 1)
        errori.push(`facciata ${i + 1}: fuori pagina: ${s.textContent.trim().slice(0, 40)}`);
    }
    const rami = [...p.querySelectorAll(".ramo")].map((r) => r.getBoundingClientRect());
    rami.forEach((a, j) => rami.slice(j + 1).forEach((b) => {
      if (a.left < b.right && b.left < a.right && a.top < b.bottom - 1 && b.top < a.bottom - 1)
        errori.push(`facciata ${i + 1}: rami sovrapposti`);
    }));
    const lati = [...p.querySelectorAll(".lato")].map((l) => {
      const fine = [...l.querySelectorAll(".ramo")].reduce((m, r) => m + r.getBoundingClientRect().height, 0);
      return Math.round((l.getBoundingClientRect().height - fine) / (96 / 25.4));
    });
    console.log(`facciata ${i + 1}: spazio verticale libero sx/dx (mm): ${lati.join(" / ")}`);
  });
  return errori;
}

async function main() {
  const out = path.resolve(USCITA);
  const katexCss = fs.readFileSync(path.join(KATEX_DIR, "katex.min.css"), "utf8")
    .replace(/url\(fonts\//g, `url(file://${KATEX_DIR}/fonts/`);
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8">
    <style>${katexCss}</style><style>${css}</style></head>
    <body>${facciate.map(facciata).join("")}</body></html>`;
  const htmlPath = path.join(path.dirname(CONTENUTO), "mappa_mentale.html");
  fs.writeFileSync(htmlPath, html);

  const profilo = fs.mkdtempSync(path.join(os.tmpdir(), "brave-pdf-"));
  const browser = await puppeteer.launch({
    executablePath: BRAVE, headless: true, userDataDir: profilo,
    args: ["--no-first-run", "--disable-extensions", "--allow-file-access-from-files"],
  });
  try {
    const page = await browser.newPage();
    page.on("console", (m) => console.log(m.text()));
    await page.setViewport({ width: Math.round(LARGHEZZA_MM * PX_PER_MM), height: Math.round(ALTEZZA_MM * PX_PER_MM) });
    await page.emulateMediaType("print");
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");
    await page.evaluate(disegnaLinee);
    const errori = await page.evaluate(controlla);
    if (errori.length) console.error("ATTENZIONE:\n" + errori.join("\n"));
    await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
    console.log("PDF scritto:", out);
  } finally {
    await browser.close();
    fs.rmSync(profilo, { recursive: true, force: true });
  }
}

main().catch((e) => { console.error("ERRORE:", e.message); process.exit(1); });
