#!/usr/bin/env python3
"""
Generates app/icon.svg — the terracotta D lettermark favicon.

The D is the real Switzer glyph outline at weight 550 (the same weight the
display headlines use), extracted as a vector path so the favicon needs no
webfont at render time and stays crisp at every size.

Requires fonttools + brotli (brotli decompresses the .woff2):
    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/icons/generate-icon.py
"""
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

FONT = "app/fonts/Switzer-Variable.woff2"
OUT = "app/icon.svg"

CANVAS = 512
RADIUS = 112          # ~22% — matches the squircle-ish corner of the brand marks
CAP_RATIO = 0.54      # glyph height as a share of the canvas
TERRACOTTA = "#f06530"

font = instancer.instantiateVariableFont(TTFont(FONT), {"wght": 550})
glyphs = font.getGlyphSet()
name = font.getBestCmap()[ord("D")]

pen = SVGPathPen(glyphs)
glyphs[name].draw(pen)
path = pen.getCommands()

bounds = BoundsPen(glyphs)
glyphs[name].draw(bounds)
x0, y0, x1, y1 = bounds.bounds
w, h = x1 - x0, y1 - y0

# Font coordinates are y-up; SVG is y-down, hence the negative y scale.
s = (CANVAS * CAP_RATIO) / h
tx = (CANVAS - s * w) / 2 - s * x0
ty = (CANVAS - s * h) / 2 + s * y1

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS} {CANVAS}">'
    f'<rect width="{CANVAS}" height="{CANVAS}" rx="{RADIUS}" fill="{TERRACOTTA}"/>'
    f'<path transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f} {-s:.5f})" '
    f'fill="#fff" d="{path}"/>'
    f"</svg>"
)
open(OUT, "w").write(svg)
print(f"{OUT}  ({len(svg)} bytes)  glyph={name} bbox={bounds.bounds}")
