"""Render Saber .sbn2 notes (BSON) to PNG, one image per page; white ink drawn black."""
import struct, sys, pathlib
import bson
from PIL import Image, ImageDraw

SCALE = 1.5
MARGIN = 20

def points(raw):
    if isinstance(raw, (bytes, bytearray)):
        return [struct.unpack('<ff', raw[:8])]
    return [tuple(raw[:2])]

def color(argb):
    a, r, g, b = (argb >> 24) & 255, (argb >> 16) & 255, (argb >> 8) & 255, argb & 255
    if r > 200 and g > 200 and b > 200:
        return (0, 0, 0)
    return (r, g, b)

def render(src, out_dir):
    doc = bson.decode(pathlib.Path(src).read_bytes())
    for n, page in enumerate(doc['z']):
        strokes = [(s, [pt for raw in s['p'] for pt in points(raw)]) for s in page['s']]
        max_y = max([page['h']] + [y for _, pts in strokes for _, y in pts])
        max_x = max([page['w']] + [x for _, pts in strokes for x, _ in pts])
        img = Image.new('RGB', (int(max_x * SCALE) + MARGIN, int(max_y * SCALE) + MARGIN), 'white')
        draw = ImageDraw.Draw(img)
        for s, pts in strokes:
            xy = [(x * SCALE, y * SCALE) for x, y in pts]
            width = max(1, int(s['s'] * SCALE))
            if len(xy) == 1:
                x, y = xy[0]; draw.ellipse([x - width, y - width, x + width, y + width], fill=color(s['c']))
            else:
                draw.line(xy, fill=color(s['c']), width=width, joint='curve')
        out = pathlib.Path(out_dir) / f"{pathlib.Path(src).stem}_p{n + 1}.png"
        img.save(out)
        print(out, img.size)

for f in sys.argv[2:]:
    render(f, sys.argv[1])
