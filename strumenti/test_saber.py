"""Test di strumenti/saber.py con cartelle temporanee e un Saber finto.

Uso dalla radice del repo: venv/bin/python -I strumenti/test_saber.py
"""
import hashlib
import os
import shutil
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path

import bson
import fitz

REPO = Path(__file__).resolve().parents[1]
SCRIPT = REPO / "strumenti/saber.py"
NOTA = "Elettronica/26-11-10 Elettronica - Mappa prova"


def pdf(percorso, pagine, testo="mappa"):
    doc = fitz.open()
    for i in range(pagine):
        doc.new_page().insert_text((72, 72), f"{testo} {i}", fontsize=24)
    doc.save(percorso)


def sha(percorso):
    return hashlib.sha256(Path(percorso).read_bytes()).hexdigest()


class Saber(unittest.TestCase):
    def setUp(self):
        self.t = Path(tempfile.mkdtemp())
        self.pdf_dir, self.saber, self.backup = self.t / "Mappe", self.t / "Saber", self.t / "Backup"
        for d in (self.pdf_dir, self.saber / "Elettronica", self.backup):
            d.mkdir(parents=True)
        self.elenco = self.t / "saber.tsv"
        self.registro = self.t / "avvii"
        finto = self.t / "saber-finto"
        finto.write_text(f'#!/bin/bash\necho avvio >> "{self.registro}"\n'
                         "trap 'kill $! 2>/dev/null; exit 0' TERM\nsleep 30 & wait\n")
        finto.chmod(0o755)
        self.env = dict(os.environ, MAPPE_PDF_DIR=str(self.pdf_dir), SABER_DIR=str(self.saber),
                        SABER_BACKUP_DIR=str(self.backup), SABER_CMD=str(finto), SABER_ATTESA="0.5",
                        SABER_ELENCO=str(self.elenco))

    def tearDown(self):
        subprocess.run(["pkill", "-x", "saber-finto"], capture_output=True)
        shutil.rmtree(self.t)

    def lancia(self, *argomenti):
        return subprocess.run([sys.executable, "-I", str(SCRIPT), *argomenti], env=self.env,
                              capture_output=True, text=True, timeout=120)

    def elenca(self, *righe):
        self.elenco.write_text("pdf\tnota\tsha256\n" + "".join("\t".join(r) + "\n" for r in righe))

    def nota_da(self, nome_pdf):
        """Mette in Saber la conversione attuale del PDF, come se fosse già caricata."""
        (self.t / "conv").mkdir()
        esito = self.lancia("converti", nome_pdf, str(self.t / "conv" / (Path(NOTA).name + ".sbn2")))
        self.assertEqual(esito.returncode, 0, esito.stderr)
        for f in (self.t / "conv").iterdir():
            shutil.copy(f, self.saber / "Elettronica" / f.name)
        shutil.rmtree(self.t / "conv")

    def avvii(self):
        return len(self.registro.read_text().splitlines()) if self.registro.exists() else 0

    def file_nota(self):
        return sorted(p.name for p in (self.saber / "Elettronica").iterdir())

    # ------------------------------------------------------------ stato

    def test_stato(self):
        pdf(self.pdf_dir / "Mappa_a.pdf", 1)
        pdf(self.pdf_dir / "Mappa_b.pdf", 1)
        pdf(self.pdf_dir / "Mappa_c.pdf", 1)
        pdf(self.pdf_dir / "Mappa_fuori.pdf", 1)
        for nome in ("a", "b"):
            (self.saber / "Elettronica" / f"{nome}.sbn2").touch()
        self.elenca(("Mappa_a.pdf", "Elettronica/a", sha(self.pdf_dir / "Mappa_a.pdf")),
                    ("Mappa_b.pdf", "Elettronica/b", "vecchio"),
                    ("Mappa_c.pdf", "Elettronica/c", ""))
        esito = self.lancia("stato")
        self.assertEqual(esito.returncode, 1)
        self.assertIn("ok        Mappa_a.pdf", esito.stdout)
        self.assertIn("cambiato  Mappa_b.pdf", esito.stdout)
        self.assertIn("nuovo     Mappa_c.pdf", esito.stdout)
        self.assertIn("Mappa_fuori.pdf", esito.stdout)
        self.assertIn("non in saber.tsv", esito.stdout)

    def test_stato_tutto_ok(self):
        pdf(self.pdf_dir / "Mappa_a.pdf", 1)
        (self.saber / "Elettronica" / "a.sbn2").touch()
        self.elenca(("Mappa_a.pdf", "Elettronica/a", sha(self.pdf_dir / "Mappa_a.pdf")))
        self.assertEqual(self.lancia("stato").returncode, 0)

    # ------------------------------------------------------------ aggiorna

    def test_nota_gia_uguale_registra_solo_lo_sha(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 2)
        self.nota_da("Mappa_prova.pdf")
        self.elenca(("Mappa_prova.pdf", NOTA, ""))
        esito = self.lancia("aggiorna")
        self.assertEqual(esito.returncode, 0, esito.stdout + esito.stderr)
        self.assertEqual(self.avvii(), 0, "Saber non va aperto se la nota è già uguale")
        self.assertIn(sha(self.pdf_dir / "Mappa_prova.pdf"), self.elenco.read_text())

    def test_piu_note_gia_uguali(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1)
        self.nota_da("Mappa_prova.pdf")
        pdf(self.pdf_dir / "Mappa_altra.pdf", 1, "altra")
        (self.t / "conv").mkdir()
        self.assertEqual(self.lancia("converti", "Mappa_altra.pdf", str(self.t / "conv" / "altra.sbn2")).returncode, 0)
        for f in (self.t / "conv").iterdir():
            shutil.copy(f, self.saber / "Elettronica" / f.name)
        self.elenca(("Mappa_prova.pdf", NOTA, "vecchio"), ("Mappa_altra.pdf", "Elettronica/altra", "vecchio"))
        esito = self.lancia("aggiorna")
        self.assertEqual(esito.returncode, 0, esito.stdout + esito.stderr)
        self.assertEqual(self.avvii(), 0)
        self.assertEqual(self.lancia("stato").returncode, 0)

    def test_pdf_cambiato_carica_con_backup_e_due_sync(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 2, "vecchia")
        self.nota_da("Mappa_prova.pdf")
        vecchia = (self.saber / "Elettronica" / "26-11-10 Elettronica - Mappa prova.sbn2.0").read_bytes()
        pdf(self.pdf_dir / "Mappa_prova.pdf", 2, "nuova")
        self.elenca(("Mappa_prova.pdf", NOTA, "vecchio"))
        esito = self.lancia("aggiorna")
        self.assertEqual(esito.returncode, 0, esito.stdout + esito.stderr)
        nuova = (self.saber / "Elettronica" / "26-11-10 Elettronica - Mappa prova.sbn2.0").read_bytes()
        self.assertNotEqual(nuova, vecchia)
        self.assertEqual(self.avvii(), 2, "sync prima (tablet) e dopo (caricamento)")
        copie = list(self.backup.rglob("*.sbn2.0"))
        self.assertEqual(len(copie), 1)
        self.assertEqual(copie[0].read_bytes(), vecchia)
        self.assertIn(sha(self.pdf_dir / "Mappa_prova.pdf"), self.elenco.read_text())
        self.assertEqual(self.lancia("stato").returncode, 0)

    def test_nota_nuova(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1)
        self.elenca(("Mappa_prova.pdf", NOTA, ""))
        esito = self.lancia("aggiorna")
        self.assertEqual(esito.returncode, 0, esito.stdout + esito.stderr)
        self.assertIn("26-11-10 Elettronica - Mappa prova.sbn2", self.file_nota())
        self.assertIn("26-11-10 Elettronica - Mappa prova.sbn2.p", self.file_nota())

    def test_meno_pagine_stub_poi_tolti(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 3, "vecchia")
        self.nota_da("Mappa_prova.pdf")
        pdf(self.pdf_dir / "Mappa_prova.pdf", 2, "nuova")
        self.elenca(("Mappa_prova.pdf", NOTA, "vecchio"))
        esito = self.lancia("aggiorna")
        self.assertEqual(esito.returncode, 0, esito.stdout + esito.stderr)
        self.assertNotIn("26-11-10 Elettronica - Mappa prova.sbn2.2", self.file_nota())
        self.assertIn("pagine in meno", esito.stdout)

    def test_tratti_a_mano_rifiuta(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1, "vecchia")
        self.nota_da("Mappa_prova.pdf")
        file = self.saber / "Elettronica" / "26-11-10 Elettronica - Mappa prova.sbn2"
        nota = bson.decode(file.read_bytes())
        nota["z"][0]["s"] = [{"p": b"\x00" * 8, "c": 0}]
        file.write_bytes(bson.encode(nota))
        prima = file.read_bytes()
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1, "nuova")
        self.elenca(("Mappa_prova.pdf", NOTA, "vecchio"))
        esito = self.lancia("aggiorna")
        self.assertEqual(esito.returncode, 1)
        self.assertIn("tratti scritti a mano", esito.stdout)
        self.assertEqual(file.read_bytes(), prima)

    def test_saber_aperto_rifiuta(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1)
        self.elenca(("Mappa_prova.pdf", NOTA, ""))
        aperto = subprocess.Popen([self.env["SABER_CMD"]], start_new_session=True)
        time.sleep(0.3)
        try:
            esito = self.lancia("aggiorna")
        finally:
            aperto.kill()
        self.assertEqual(esito.returncode, 1)
        self.assertIn("Saber è aperto", esito.stdout + esito.stderr)
        self.assertEqual(self.file_nota(), [])

    # ------------------------------------------------------------ aggiungi

    def test_aggiungi(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1)
        self.elenca()
        esito = self.lancia("aggiungi", "Mappa_prova.pdf", NOTA)
        self.assertEqual(esito.returncode, 0, esito.stderr)
        self.assertIn(f"Mappa_prova.pdf\t{NOTA}\t\n", self.elenco.read_text())
        self.assertNotEqual(self.lancia("aggiungi", "Mappa_prova.pdf", NOTA).returncode, 0, "niente doppioni")
        self.assertNotEqual(self.lancia("aggiungi", "Manca.pdf", "Elettronica/x").returncode, 0)
        self.assertNotEqual(self.lancia("aggiungi", "Mappa_prova.pdf", "../fuori").returncode, 0)

    def test_aggiungi_percorso_assoluto_salva_il_nome(self):
        pdf(self.pdf_dir / "Mappa_prova.pdf", 1)
        self.elenca()
        esito = self.lancia("aggiungi", str(self.pdf_dir / "Mappa_prova.pdf"), NOTA)
        self.assertEqual(esito.returncode, 0, esito.stderr)
        self.assertIn(f"\nMappa_prova.pdf\t{NOTA}\t\n", self.elenco.read_text())
        altro = Path(tempfile.mkdtemp()) / "Fuori.pdf"
        pdf(altro, 1)
        self.assertNotEqual(self.lancia("aggiungi", str(altro), "Elettronica/y").returncode, 0, "pdf fuori dalla cartella")


if __name__ == "__main__":
    unittest.main()
