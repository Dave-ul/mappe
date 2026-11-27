"""Tiene le note Saber allineate ai PDF delle mappe e delle spiegazioni.

saber.tsv (nella radice del repo) dice quale nota Saber corrisponde a ogni PDF e lo sha256
del PDF caricato l'ultima volta. I PDF sono scritti relativi a ~/Documenti/Scuola: le mappe
in Mappe/, le spiegazioni e le prove in Fonti/<Materia>/Spiegazioni/.

  venv/bin/python -I strumenti/saber.py stato             esce con 1 se qualcosa va caricato
  venv/bin/python -I strumenti/saber.py aggiorna          carica i PDF cambiati
  venv/bin/python -I strumenti/saber.py aggiungi <pdf> <Materia/AA-MM-GG Materia - Titolo>
  venv/bin/python -I strumenti/saber.py converti <pdf> <out.sbn2>

`aggiorna` segue la procedura della skill note-saber: con Saber chiuso apre e richiude Saber
per ricevere le modifiche del tablet, rifiuta le note con tratti scritti a mano, fa il backup,
copia la nota nuova (stub da 0 byte per le pagine in meno), riapre Saber per la sync e controlla
che i file non siano cambiati. Se la nota in Saber è già uguale al PDF registra solo lo sha.
"""

import hashlib
import os
import shutil
import subprocess
import sys
import tempfile
import time
from datetime import datetime
from pathlib import Path

import bson

HOME = Path.home()
REPO = Path(__file__).resolve().parents[1]
SCUOLA_DIR = Path(os.environ.get("SCUOLA_DIR", HOME / "Documenti/Scuola"))
CARTELLE_PDF = ("Mappe/*.pdf", "Fonti/*/Spiegazioni/*.pdf")  # dove cercare i PDF non registrati
SABER_DIR = Path(os.environ.get("SABER_DIR", HOME / "Documenti/Saber"))
BACKUP_DIR = Path(os.environ.get("SABER_BACKUP_DIR", HOME / "Documenti/Backup"))
ELENCO = Path(os.environ.get("SABER_ELENCO", REPO / "saber.tsv"))
SABER_CMD = os.environ.get("SABER_CMD", "/usr/lib/saber/saber")
PDF2SABER = Path(os.environ.get("PDF2SABER", HOME / ".claude/skills/note-saber/pdf2saber.py"))
ATTESA_SYNC = float(os.environ.get("SABER_ATTESA", "15"))  # attesa minima dopo l'apertura
# Poi si aspetta che Saber smetta di scrivere dati (upload compresi) per QUIETE secondi: con 13 pagine
# di immagini la sync è durata circa 45 s, e chiuderlo dopo 15 s fissi la interrompeva (2026-11-27).
QUIETE = float(os.environ.get("SABER_QUIETE", "10"))
ATTESA_MAX = float(os.environ.get("SABER_ATTESA_MAX", "600"))
CONTROLLO = 1.0  # secondi tra due letture di /proc/<pid>/io
ATTESA_CHIUSURA = 10
INTESTAZIONE = "pdf\tnota\tsha256"


class Errore(Exception):
    """Un problema da riportare all'utente senza traceback."""


# ---------------------------------------------------------------- elenco


def leggi_elenco():
    if not ELENCO.is_file():
        return []
    voci = []
    for numero, riga in enumerate(ELENCO.read_text(encoding="utf-8").splitlines()[1:], 2):
        if not riga.strip():
            continue
        campi = riga.split("\t")
        if len(campi) != 3:
            raise Errore(f"{ELENCO.name}:{numero}: servono 3 colonne separate da tab")
        voci.append({"pdf": campi[0], "nota": campi[1], "sha": campi[2]})
    return voci


def scrivi_elenco(voci):
    righe = [INTESTAZIONE] + [f"{v['pdf']}\t{v['nota']}\t{v['sha']}" for v in voci]
    ELENCO.write_text("\n".join(righe) + "\n", encoding="utf-8")


def sha256(percorso):
    return hashlib.sha256(percorso.read_bytes()).hexdigest()


def percorso_pdf(relativo):
    """Il PDF scritto in saber.tsv, controllando che resti dentro la cartella Scuola."""
    percorso = (SCUOLA_DIR / relativo).resolve()
    if SCUOLA_DIR.resolve() not in percorso.parents or ".." in Path(relativo).parts:
        raise Errore(f"pdf fuori da {SCUOLA_DIR}: {relativo}")
    return percorso


def file_nota(nota):
    """Il .sbn2 della nota, controllando che resti dentro la cartella di Saber."""
    percorso = (SABER_DIR / f"{nota}.sbn2").resolve()
    if SABER_DIR.resolve() not in percorso.parents or ".." in Path(nota).parts:
        raise Errore(f"nota fuori da {SABER_DIR}: {nota}")
    return percorso


def file_della_nota(sbn2):
    """Il .sbn2 con anteprima (.p) e pagine (.0, .1, ...), se esistono."""
    if not sbn2.parent.is_dir():
        return []
    return sorted(p for p in sbn2.parent.iterdir() if p.name == sbn2.name or p.name.startswith(sbn2.name + "."))


def pagine(sbn2):
    return {p.name: p for p in file_della_nota(sbn2) if p.name[len(sbn2.name) + 1:].isdigit()}


# ---------------------------------------------------------------- stato


def stato_voce(voce):
    pdf = percorso_pdf(voce["pdf"])
    if not pdf.is_file():
        return "manca il PDF"
    if not file_nota(voce["nota"]).exists():
        return "nuovo"
    return "ok" if voce["sha"] == sha256(pdf) else "cambiato"


def stato():
    voci = leggi_elenco()
    da_fare = 0
    for voce in voci:
        esito = stato_voce(voce)
        da_fare += esito != "ok"
        print(f"{esito:<9} {voce['pdf']}  →  {voce['nota']}")
    noti = {v["pdf"] for v in voci}
    for pdf in sorted(p for schema in CARTELLE_PDF for p in SCUOLA_DIR.glob(schema)):
        relativo = pdf.relative_to(SCUOLA_DIR).as_posix()
        if relativo not in noti:
            da_fare += 1
            print(f"{'?':<9} {relativo}  non in saber.tsv (aggiungilo con: saber.py aggiungi)")
    return 1 if da_fare else 0


# ---------------------------------------------------------------- conversione e confronto


def converti(pdf, uscita):
    if not PDF2SABER.is_file():
        raise Errore(f"manca {PDF2SABER} (skill note-saber)")
    esito = subprocess.run([sys.executable, "-I", str(PDF2SABER), str(pdf), str(uscita)],
                           capture_output=True, text=True)
    if esito.returncode != 0:
        raise Errore(f"pdf2saber non ha convertito {pdf.name}: {esito.stderr.strip()[-300:]}")


def stesse_pagine(nuova, vecchia):
    """Confronta le immagini delle pagine: il .sbn2 e l'anteprima ne derivano."""
    a, b = pagine(nuova), pagine(vecchia)
    if [n[len(nuova.name):] for n in sorted(a)] != [n[len(vecchia.name):] for n in sorted(b)]:
        return False
    return all(a[n].read_bytes() == b[vecchia.name + n[len(nuova.name):]].read_bytes() for n in a)


def ha_tratti(sbn2):
    if not sbn2.is_file() or sbn2.stat().st_size == 0:
        return False
    nota = bson.decode(sbn2.read_bytes())
    return any(pagina.get("s") for pagina in nota.get("z", []))


# ---------------------------------------------------------------- Saber


def saber_aperto():
    return subprocess.run(["pgrep", "-x", Path(SABER_CMD).name[:15]], capture_output=True).returncode == 0


def byte_scritti(pid):
    """Byte scritti finora dal processo (file e socket): crescono finché la sync carica."""
    for riga in Path(f"/proc/{pid}/io").read_text().splitlines():
        if riga.startswith("wchar:"):
            return int(riga.split()[1])
    raise Errore(f"/proc/{pid}/io senza wchar")


def aspetta_quiete(processo):
    """Aspetta che il processo non scriva più nulla per QUIETE secondi, al massimo ATTESA_MAX."""
    inizio = time.monotonic()
    time.sleep(ATTESA_SYNC)
    ultimo, fermo_da = byte_scritti(processo.pid), time.monotonic()
    while time.monotonic() - fermo_da < QUIETE:
        if processo.poll() is not None:
            raise Errore("Saber si è chiuso da solo durante la sync")
        if time.monotonic() - inizio > ATTESA_MAX:
            raise Errore(f"la sync dura più di {ATTESA_MAX:.0f} s: Saber resta aperto, rilancia quando ha finito")
        time.sleep(CONTROLLO)
        adesso = byte_scritti(processo.pid)
        if adesso != ultimo:
            ultimo, fermo_da = adesso, time.monotonic()


def sync():
    """Apre Saber, aspetta che la sync finisca e lo chiude."""
    processo = subprocess.Popen([SABER_CMD], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                                start_new_session=True)
    aspetta_quiete(processo)
    subprocess.run(["pkill", "-x", Path(SABER_CMD).name[:15]], capture_output=True)
    try:
        processo.wait(timeout=ATTESA_CHIUSURA)  # lo raccoglie, se no resta zombie e pgrep lo vede ancora
    except subprocess.TimeoutExpired as errore:
        raise Errore("Saber non si è chiuso") from errore
    fine = time.monotonic() + ATTESA_CHIUSURA
    while saber_aperto():
        if time.monotonic() > fine:
            raise Errore("Saber non si è chiuso")
        time.sleep(0.2)


# ---------------------------------------------------------------- aggiorna


def prepara(voci, lavoro):
    """Converte i PDF cambiati. Restituisce le voci da caricare; per quelle già uguali aggiorna lo sha."""
    da_caricare = []
    for indice, voce in enumerate(voci):
        esito = stato_voce(voce)
        if esito == "manca il PDF":
            print(f"salto     {voce['pdf']}: il PDF non c'è")
        if esito not in ("nuovo", "cambiato"):
            continue
        sbn2 = file_nota(voce["nota"])
        nuova = lavoro / str(indice) / sbn2.name
        nuova.parent.mkdir(parents=True)
        converti(percorso_pdf(voce["pdf"]), nuova)
        if esito == "cambiato" and stesse_pagine(nuova, sbn2):
            voce["sha"] = sha256(percorso_pdf(voce["pdf"]))
            print(f"già uguale {voce['pdf']}: registro solo lo sha")
            continue
        da_caricare.append((voce, sbn2, nuova))
    return da_caricare


def carica(voce, sbn2, nuova, backup):
    """Copia una nota nuova; restituisce gli stub da togliere dopo la sync."""
    vecchi = file_della_nota(sbn2)
    if vecchi:
        cartella = backup / sbn2.parent.relative_to(SABER_DIR.resolve())
        cartella.mkdir(parents=True, exist_ok=True)
        for f in vecchi:
            shutil.copy2(f, cartella / f.name)
    sbn2.parent.mkdir(parents=True, exist_ok=True)
    nuovi = {f.name for f in file_della_nota(nuova)}
    for f in file_della_nota(nuova):
        shutil.copyfile(f, sbn2.parent / f.name)
    stub = [f for f in vecchi if f.name not in nuovi]
    for f in stub:
        f.write_bytes(b"")
    if stub:
        print(f"          {voce['pdf']}: {len(stub)} pagine in meno, stub da 0 byte per la sync")
    return stub


def controlla_copia(sbn2, nuova):
    diversi = [f.name for f in file_della_nota(nuova) if (sbn2.parent / f.name).read_bytes() != f.read_bytes()]
    if diversi:
        raise Errore(f"dopo la sync sono cambiati: {', '.join(diversi)} (backup intatto)")


def aggiorna():
    voci = leggi_elenco()
    with tempfile.TemporaryDirectory() as tmp:
        da_caricare = prepara(voci, Path(tmp))
        scrivi_elenco(voci)
        if not da_caricare:
            print("Saber è già allineato ai PDF")
            return 0
        if saber_aperto():
            raise Errore("Saber è aperto: chiudilo e rilancia (serve chiuso per copiare le note)")
        sync()
        rifiutate = [v for v, sbn2, _ in da_caricare if ha_tratti(sbn2)]
        for voce in rifiutate:
            print(f"RIFIUTO   {voce['pdf']}: la nota ha tratti scritti a mano, che andrebbero persi")
        da_caricare = [c for c in da_caricare if c[0] not in rifiutate]
        backup = BACKUP_DIR / f"saber-{datetime.now():%Y-%m-%d-%H%M%S}-mappe"
        stub = [s for voce, sbn2, nuova in da_caricare for s in carica(voce, sbn2, nuova, backup)]
        if da_caricare:
            sync()
        for f in stub:
            f.unlink(missing_ok=True)
        for voce, sbn2, nuova in da_caricare:
            controlla_copia(sbn2, nuova)
            voce["sha"] = sha256(percorso_pdf(voce["pdf"]))
            print(f"caricato  {voce['pdf']}  →  {voce['nota']}")
        scrivi_elenco(voci)
    if da_caricare:
        print(f"backup delle note sostituite in {backup}")
    return 1 if rifiutate else 0


def aggiungi(pdf, nota):
    voci = leggi_elenco()
    percorso = Path(pdf)
    if percorso.is_absolute():
        if SCUOLA_DIR.resolve() not in percorso.resolve().parents:
            raise Errore(f"{pdf} non è in {SCUOLA_DIR}")
        pdf = percorso.resolve().relative_to(SCUOLA_DIR.resolve()).as_posix()
    if not percorso_pdf(pdf).is_file():
        raise Errore(f"non trovo {SCUOLA_DIR / pdf}")
    file_nota(nota)
    if any(v["pdf"] == pdf or v["nota"] == nota for v in voci):
        raise Errore(f"{pdf} o {nota} è già in {ELENCO.name}")
    scrivi_elenco(voci + [{"pdf": pdf, "nota": nota, "sha": ""}])
    print(f"aggiunto {pdf} → {nota}: caricalo con saber.py aggiorna")
    return 0


def main(argomenti):
    comandi = {"stato": (stato, 0), "aggiorna": (aggiorna, 0), "aggiungi": (aggiungi, 2),
               "converti": (lambda pdf, out: converti(percorso_pdf(pdf), Path(out)) or 0, 2)}
    if not argomenti or argomenti[0] not in comandi or len(argomenti) - 1 != comandi[argomenti[0]][1]:
        print(__doc__, file=sys.stderr)
        return 2
    try:
        return comandi[argomenti[0]][0](*argomenti[1:])
    except Errore as errore:
        print(f"errore: {errore}")
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
