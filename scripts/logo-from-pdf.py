"""
Extrai as três variantes do logo oficial (logo-casa-brazil.pdf) como paths
SVG fiéis ao vetor original e grava components/brand/Logo.tsx.
Requer: pip install pymupdf
Uso:  python scripts/logo-from-pdf.py
"""
from __future__ import annotations

import functools
import re
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT.parent / "CASA BRAZIL" / "logo-casa-brazil.pdf"
OUT = ROOT / "components" / "brand" / "Logo.tsx"


def items_to_d(items) -> str:
    d, cur = [], None
    for it in items:
        op = it[0]
        if op == "l":
            p1, p2 = it[1], it[2]
            if cur != p1:
                d.append(f"M{p1.x:.2f} {p1.y:.2f}")
            d.append(f"L{p2.x:.2f} {p2.y:.2f}")
            cur = p2
        elif op == "c":
            p1, c1, c2, p2 = it[1], it[2], it[3], it[4]
            if cur != p1:
                d.append(f"M{p1.x:.2f} {p1.y:.2f}")
            d.append(f"C{c1.x:.2f} {c1.y:.2f} {c2.x:.2f} {c2.y:.2f} {p2.x:.2f} {p2.y:.2f}")
            cur = p2
        elif op == "re":
            r = it[1]
            d.append(f"M{r.x0:.2f} {r.y0:.2f}H{r.x1:.2f}V{r.y1:.2f}H{r.x0:.2f}Z")
            cur = None
        elif op == "qu":
            q = it[1]
            d.append(f"M{q.ul.x:.2f} {q.ul.y:.2f}L{q.ur.x:.2f} {q.ur.y:.2f}L{q.lr.x:.2f} {q.lr.y:.2f}L{q.ll.x:.2f} {q.ll.y:.2f}Z")
            cur = None
    return " ".join(d)


def variant(drawings, pad: float) -> tuple[str, str]:
    bbox = functools.reduce(lambda a, b: a | b, [d["rect"] for d in drawings])
    x0, y0, x1, y1 = bbox.x0 - pad, bbox.y0 - pad, bbox.x1 + pad, bbox.y1 + pad
    paths = []
    for d in drawings:
        dd = items_to_d(d["items"])
        if d["type"] == "s":
            paths.append(f'      <path d="{dd}" fill="none" stroke="currentColor" strokeWidth="{d["width"]:.2f}" />')
        else:
            rule = "evenodd" if d.get("even_odd") else "nonzero"
            paths.append(f'      <path d="{dd}" fill="currentColor" fillRule="{rule}" />')
    return f"{x0:.2f} {y0:.2f} {x1 - x0:.2f} {y1 - y0:.2f}", "\n".join(paths)


def main() -> None:
    page = pymupdf.open(PDF)[0]
    dr = page.get_drawings()
    # No PDF oficial: 0-8 símbolo (traços), 9-52 assinatura horizontal, 53-96 empilhada.
    symbol, horizontal, stacked = dr[0:9], dr[9:53], dr[53:97]
    vb_s, p_s = variant(symbol, 3)
    vb_h, p_h = variant(horizontal, 2)
    vb_v, p_v = variant(stacked, 2)
    tsx = OUT.read_text(encoding="utf-8")
    for vb, p, marker in ((vb_s, p_s, "LogoSimbolo"), (vb_v, p_v, "LogoEmpilhado"), (vb_h, p_h, "LogoHorizontal")):
        tsx = re.sub(
            rf'(export function {marker}\([^)]*\) \{{\n  return \(\n    <svg viewBox=")[^"]+(" className=\{{className\}} \{{\.\.\.a11y\(title\)\}}>\n)(.*?)(\n    </svg>)',
            lambda m, vb=vb, p=p: f"{m.group(1)}{vb}{m.group(2)}{p}{m.group(4)}",
            tsx,
            flags=re.S,
        )
    OUT.write_text(tsx, encoding="utf-8")
    print(f"ok -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
