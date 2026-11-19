"""Disegna in img/ gli schemi SVG degli amplificatori della spiegazione di laboratorio, con i nomi Ri/Rf del quaderno.
Uso: python3 -I laboratorio/disegna_circuiti.py"""
import pathlib

CARTELLA = pathlib.Path(__file__).parent / "img"
TESTA = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" font-family="serif" font-size="15" '
         'font-style="italic">\n<g fill="none" stroke="#000" stroke-width="2">\n')
LARGO_OPAMP, MEZZA_ALTEZZA, DISTANZA_INGRESSI = 70, 40, 20
LUNGO_R = 30


def filo(*punti):
    return '<path d="M' + " L".join(f"{x} {y}" for x, y in punti) + '"/>\n'


def res_h(x1, x2, y):
    """Resistenza orizzontale tra x1 e x2, zigzag lungo LUNGO_R al centro."""
    a = (x1 + x2 - LUNGO_R) / 2
    zig = " ".join(f"l5 {d}" for d in (-6, 12, -12, 12, -12, 6))
    return filo((x1, y), (a, y)) + f'<path d="M{a} {y} {zig}"/>\n' + filo((a + LUNGO_R, y), (x2, y))


def res_v(x, y1, y2):
    a = (y1 + y2 - LUNGO_R) / 2
    zig = " ".join(f"l{d} 5" for d in (6, -12, 12, -12, 12, -6))
    return filo((x, y1), (x, a)) + f'<path d="M{x} {a} {zig}"/>\n' + filo((x, a + LUNGO_R), (x, y2))


def massa(x, y):
    return f'<path d="M{x - 10} {y} H{x + 10} M{x - 6} {y + 5} H{x + 6} M{x - 2} {y + 10} H{x + 2}"/>\n'


def opamp(x, y):
    return f'<path d="M{x} {y - MEZZA_ALTEZZA} V{y + MEZZA_ALTEZZA} L{x + LARGO_OPAMP} {y} Z"/>\n'


def scritte_opamp(x, y):
    return (f'<text x="{x + 6}" y="{y - DISTANZA_INGRESSI + 5}" font-style="normal">−</text>'
            f'<text x="{x + 5}" y="{y + DISTANZA_INGRESSI + 5}" font-style="normal">+</text>\n')


def nome(x, y, base, pedice=""):
    sub = f'<tspan font-size="11" dy="4">{pedice}</tspan>' if pedice else ""
    return f'<text x="{x}" y="{y}">{base}{sub}</text>\n'


def punto(x, y):
    return f'<circle cx="{x}" cy="{y}" r="3" fill="#000"/>\n'


def retroazione(x_nodo, y_meno, x_uscita, y_uscita, y_alto, con_r=True):
    tratto = filo((x_nodo, y_meno), (x_nodo, y_alto))
    tratto += res_h(x_nodo, x_uscita, y_alto) if con_r else filo((x_nodo, y_alto), (x_uscita, y_alto))
    return tratto + filo((x_uscita, y_alto), (x_uscita, y_uscita))


def svg(w, h, linee, testi):
    return TESTA.format(w=w, h=h) + "".join(linee) + "</g>\n" + "".join(testi) + "</svg>\n"


def circuiti():
    x, y = 150, 90
    meno, piu, tip = y - DISTANZA_INGRESSI, y + DISTANZA_INGRESSI, x + LARGO_OPAMP
    uscita = [filo((tip, y), (290, y))]
    vout = [nome(262, y - 8, "V", "out"), punto(250, y)]
    rf = [nome(212, 20, "R", "f")]
    yield "invertente", svg(300, 150, [
        opamp(x, y), res_h(20, x, meno), retroazione(130, meno, 250, y, 30), *uscita,
        filo((x, piu), (130, piu), (130, 125)), massa(130, 125)], [
        scritte_opamp(x, y), nome(2, meno - 8, "V", "in"), nome(60, meno - 12, "R", "i"), *rf, *vout,
        punto(130, meno)])
    yield "non_invertente", svg(300, 150, [
        opamp(x, y), filo((20, piu), (x, piu)), res_h(40, x, meno), filo((40, meno), (40, 95)), massa(40, 95),
        retroazione(130, meno, 250, y, 30), *uscita], [
        scritte_opamp(x, y), nome(2, piu - 8, "V", "in"), nome(70, meno - 12, "R", "i"), *rf, *vout,
        punto(130, meno)])
    yield "inseguitore", svg(300, 150, [
        opamp(x, y), filo((20, piu), (x, piu)), retroazione(130, meno, 250, y, 30, con_r=False),
        filo((130, meno), (x, meno)), *uscita], [
        scritte_opamp(x, y), nome(2, piu - 8, "V", "in"), *vout])
    y2 = 120
    ingressi = ((1, 40), (2, 70), (3, 100))
    meno2, piu2 = y2 - DISTANZA_INGRESSI, y2 + DISTANZA_INGRESSI
    yield "sommatore", svg(300, 185, [
        opamp(x, y2), *[res_h(20, 120, yy) for _, yy in ingressi], filo((120, 40), (120, meno2), (x, meno2)),
        retroazione(135, meno2, 250, y2, 30), filo((x + LARGO_OPAMP, y2), (290, y2)),
        filo((x, piu2), (135, piu2), (135, 155)), massa(135, 155)], [
        scritte_opamp(x, y2), *[nome(2, yy + 5, "V", str(k)) for k, yy in ingressi],
        *[nome(30, yy - 6, "R", str(k)) for k, yy in ingressi],
        nome(212, 20, "R", "f"), nome(262, y2 - 8, "V", "out"), punto(250, y2), punto(135, meno2),
        punto(120, 70)])
    yield "differenziale", svg(300, 185, [
        opamp(x, y), res_h(20, x, meno), res_h(20, x, piu), res_v(120, piu, 165), massa(120, 165),
        retroazione(130, meno, 250, y, 30), *uscita], [
        scritte_opamp(x, y), nome(2, meno - 8, "V", "1"), nome(2, piu - 8, "V", "2"),
        nome(60, meno - 12, "R", "i"), nome(60, piu - 12, "R", "i"), nome(128, 145, "R", "f"), *rf, *vout,
        punto(130, meno), punto(120, piu)])


if __name__ == "__main__":
    CARTELLA.mkdir(exist_ok=True)
    for file, testo in circuiti():
        (CARTELLA / f"{file}.svg").write_text(testo)
        print(file)
