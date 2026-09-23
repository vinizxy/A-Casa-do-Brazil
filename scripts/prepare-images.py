"""
Prepara as fotografias oficiais para a web.

Os originais NUNCA são alterados: ficam em `jpg - alta/`, na raiz do projeto
(fotos do WhatsApp / screenshots) e em `../CASA BRAZIL/extracted`.

Etapa 1: grava uma cópia web em JPEG (fonte de trabalho) em `assets/fotos/<chave>.jpg`.
Etapa 2: gera as variantes responsivas em WebP em `public/images/w/<chave>-<largura>.webp`
         — é o que o site serve (o loader em lib/image-loader.ts escolhe a largura).
Etapa 3: grava `content/fotos.generated.json` com dimensões e larguras disponíveis
         de cada foto (reserva de espaço → CLS ≈ 0; srcset correto).

Uso:  python scripts/prepare-images.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ALTA = ROOT / "jpg - alta"
# A pasta "CASA BRAZIL" (apresentação extraída) pode estar dentro do projeto ou ao lado dele.
PRES = next((p for p in (ROOT / "CASA BRAZIL" / "extracted", ROOT.parent / "CASA BRAZIL" / "extracted") if p.exists()), ROOT / "CASA BRAZIL" / "extracted")
SRC_WEB = ROOT / "assets" / "fotos"
OUT = ROOT / "public" / "images" / "w"
OG = ROOT / "public" / "og"
DIMS = ROOT / "content" / "fotos.generated.json"

QUALITY = 80
QUALITY_WEBP = 76
# Larguras candidatas (as mesmas de next.config.ts). Só geramos as menores que a
# fonte; a própria largura da fonte entra como maior variante.
LARGURAS = [320, 480, 640, 960, 1280, 1600, 2200]


def alta(n: int) -> Path:
    return ALTA / f"10.11.25 - @helsongomes ({n}).jpg"


def wa(stamp: str) -> Path:
    return ROOT / f"WhatsApp Image 2026-09-19 at {stamp}.jpeg"


def shot(stamp: str) -> Path:
    return ROOT / f"Screenshot 2026-09-17 at {stamp}.png"


# destino (sem extensão) -> (origem, largura máxima)
# Larguras: retratos 1400, paisagens 2000, hero 1800, pratos no tamanho nativo.
JOBS: dict[str, tuple[Path, int]] = {
    # hero
    "hero/portao": (alta(7), 1800),
    # a casa
    "casa/salao": (alta(9), 2200),
    "casa/mesa-logo": (alta(14), 1400),
    "casa/cactos-papel": (alta(42), 1400),
    "casa/entrada-interna": (alta(8), 1400),
    "casa/salao-mesa": (alta(10), 1400),
    "casa/mesa-posta-logo": (alta(13), 1400),
    "casa/escada": (alta(30), 1400),
    "casa/bar": (alta(36), 1400),
    "casa/pratos-sofa": (alta(37), 2200),
    "casa/pratos-parede": (alta(40), 2000),
    "casa/flores-mesas": (alta(44), 1400),
    "casa/cadeiras": (alta(46), 1400),
    "casa/janela-trelica": (alta(48), 1400),
    "casa/luminarias": (alta(2), 2000),
    "casa/mezanino": (alta(35), 1400),
    "casa/rede-cactos": (alta(6), 2000),
    "casa/vitrine": (alta(49), 2000),
    "casa/portao-2": (ROOT / "WhatsApp Image 2026-09-17 at 22.18.11.jpeg", 1082),
    # detalhes
    "detalhes/pratos-barro": (alta(1), 1400),
    "detalhes/palha": (alta(3), 1400),
    "detalhes/mesa-alto": (alta(5), 2000),
    "detalhes/secas": (alta(12), 1400),
    "detalhes/estante-objetos": (alta(17), 1400),
    "detalhes/estante-maquina": (alta(21), 1400),
    "detalhes/livros-tacas": (alta(27), 1400),
    "detalhes/estante-livros": (alta(29), 1400),
    "detalhes/trelica": (alta(24), 1400),
    "detalhes/macrame-cactos": (alta(33), 1400),
    "detalhes/flores-secas": (alta(34), 1400),
    "detalhes/cactos-espelho": (alta(43), 1400),
    "detalhes/cadeira-luz": (alta(47), 1400),
    "detalhes/bar-secas": (alta(52), 2000),
    "detalhes/cacto-neon": (alta(54), 2000),
    "detalhes/arte-parede": (alta(55), 1400),
    "detalhes/cortina": (alta(56), 1400),
    "detalhes/potes": (alta(28), 1400),
    # à mesa
    "mesa/composicao-1": (wa("13.31.20 (1)"), 1280),
    "mesa/composicao-2": (wa("13.31.20"), 1280),
    "mesa/mesa-posta": (alta(16), 1400),
    "mesa/drink-aperol": (shot("22.02.08"), 1179),
    # pratos (nomes confirmados no cardápio oficial)
    "pratos/ceviche": (wa("13.31.24"), 1280),
    "pratos/camarao-crocante": (wa("13.31.01"), 1280),
    "pratos/picadinho": (wa("13.31.00"), 1280),
    "pratos/barriga-de-porco": (wa("13.30.59"), 1280),
    "pratos/tilapia-crocante": (wa("13.31.24 (1)"), 1280),
    "pratos/moqueca-banana": (wa("13.31.06"), 1280),
    "pratos/peixe-empanado": (wa("13.30.57"), 1280),
    "pratos/pastel": (wa("13.31.03"), 1280),
    "pratos/bolinho-arroz": (wa("13.31.23 (2)"), 1280),
    "pratos/queijo-coalho": (wa("13.31.21 (2)"), 1280),
    "pratos/batata-frita": (wa("13.31.22 (3)"), 1280),
    "pratos/baiao": (wa("13.31.21 (1)"), 1280),
    "pratos/stinco": (wa("13.31.13"), 1280),
    "pratos/medalhao": (wa("13.31.21"), 1280),
    "pratos/picanha": (wa("13.31.23"), 1280),
    "pratos/tilapia-assada": (wa("13.31.16"), 1280),
    "pratos/mini-chef": (wa("13.31.21 (3)"), 1280),
    "pratos/berinjela": (wa("13.31.23 (1)"), 1280),
    "pratos/salada-quiche": (wa("13.31.15"), 1280),
    "pratos/bolo-chocolate": (wa("13.31.08"), 1280),
    "pratos/cocada-coco": (wa("13.31.19 (1)"), 1280),
    # pratos sem nome confirmado (só uso atmosférico)
    "pratos/sobremesa-coco": (wa("13.31.09"), 1280),
    "pratos/sobremesa-caramelo": (wa("13.31.22"), 1280),
    "pratos/prato-carnes": (wa("13.31.05"), 1280),
    "pratos/prato-glaceado": (wa("13.31.22 (1)"), 1280),
    "pratos/prato-ovos": (wa("13.31.22 (2)"), 1280),
    # mesmo prato de "peixe-empanado", na luz da treliça
    "pratos/peixe-empanado-trelica": (wa("13.31.08 (1)"), 1280),
    "pratos/sobremesa-banana": (wa("13.31.07"), 1280),
    # diego
    "diego/retrato": (PRES / "page09_0_X4.jpg", 1400),
    "diego/cenografia-1": (PRES / "page10_0_X5.png", 864),
    "diego/cenografia-2": (PRES / "page10_1_X7.png", 864),
    "diego/cenografia-3": (PRES / "page11_0_X5.png", 972),
}


def variantes(im: Image.Image, dest: str) -> list[int]:
    """Gera as variantes WebP de uma foto e devolve as larguras disponíveis."""
    larguras = [w for w in LARGURAS if w < im.width] + [im.width]
    for w in larguras:
        out = OUT / f"{dest}-{w}.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        if out.exists():
            continue
        v = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        v.save(out, "WEBP", quality=QUALITY_WEBP, method=6)
    return larguras


def main() -> int:
    dims: dict[str, list] = {}
    missing: list[str] = []
    total = 0
    for dest, (src, max_w) in JOBS.items():
        web = SRC_WEB / f"{dest}.jpg"
        if not web.exists():
            if not src.exists():
                missing.append(f"{dest} <- {src}")
                continue
            web.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(src) as im:
                im = ImageOps.exif_transpose(im).convert("RGB")
                if im.width > max_w:
                    im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
                im.save(web, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        with Image.open(web) as im:
            im = im.convert("RGB")
            larguras = variantes(im, dest)
            dims[dest] = [im.width, im.height, larguras]
        tam = sum((OUT / f"{dest}-{w}.webp").stat().st_size for w in larguras)
        total += tam
        print(f"{dest:32} {im.width}x{im.height}  {len(larguras)} variantes  {tam // 1024} KB")

    # Imagem de compartilhamento (Open Graph) em JPEG, 1200 px.
    OG.mkdir(parents=True, exist_ok=True)
    with Image.open(SRC_WEB / "casa" / "salao.jpg") as im:
        im = im.convert("RGB").resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
        im.save(OG / "casa-brazil.jpg", "JPEG", quality=82, optimize=True, progressive=True)

    DIMS.parent.mkdir(parents=True, exist_ok=True)
    DIMS.write_text(json.dumps(dims, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\n{len(dims)} fotos, {total / 1e6:.1f} MB em variantes WebP. Dimensões em {DIMS.relative_to(ROOT)}")
    if missing:
        print("\nORIGENS NÃO ENCONTRADAS:")
        print("\n".join(missing))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
