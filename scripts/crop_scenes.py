"""
从 PDF 画册中裁剪站点所需的场景图片。
避免生成品牌拼接 logo 和弱质量 OEM 截图，这些模块已改为文字化表达。
"""

import fitz
from pathlib import Path

PDF_PATH = "/data/workspace/Yinglit EV Charger 2026.pdf"
DPI = 300

CROPS = [
    # --- Hero ---
    {
        "page": 1,
        "area": (0.62, 0.24, 0.99, 0.81),
        "output": "public/images/hero-home.jpg",
        "desc": "Home charging scene (clean crop without brochure logo)",
    },
    {
        "page": 1,
        "area": (0.0, 0.05, 0.52, 0.78),
        "output": "public/images/hero-products.jpg",
        "desc": "Full product lineup",
    },
    # --- Solutions ---
    {
        "page": 8,
        "area": (0.0, 0.0, 0.50, 0.55),
        "output": "public/images/solutions/home.jpg",
        "desc": "Home charging solution diagram",
    },
    {
        "page": 9,
        "area": (0.0, 0.0, 0.50, 0.55),
        "output": "public/images/solutions/public.jpg",
        "desc": "Public charging solution architecture",
    },
    {
        "page": 9,
        "area": (0.50, 0.0, 1.0, 0.55),
        "output": "public/images/solutions/commercial.jpg",
        "desc": "Cloud platform + APP (commercial)",
    },
    # --- About / Factory ---
    {
        "page": 3,
        "area": (0.08, 0.58, 0.47, 0.88),
        "output": "public/images/about/factory.jpg",
        "desc": "Company building exterior (clean crop)",
    },
    {
        "page": 3,
        "area": (0.54, 0.12, 0.95, 0.90),
        "output": "public/images/about/production.jpg",
        "desc": "Production line photo grid (logo-free crop)",
    },
    {
        "page": 3,
        "area": (0.53, 0.55, 0.95, 0.92),
        "output": "public/images/about/warehouse.jpg",
        "desc": "Warehouse + testing equipment (without page number)",
    },
    # --- Certifications ---
    {
        "page": 4,
        "area": (0.15, 0.14, 0.95, 0.89),
        "output": "public/images/certs/certificates.jpg",
        "desc": "Enterprise qualification certificates grid (logo/page-number removed)",
    },
    # --- Project Cases ---
    {
        "page": 30,
        "area": (0.0, 0.07, 0.50, 0.98),
        "output": "public/images/cases/cases-left.jpg",
        "desc": "Project cases - left column",
    },
    {
        "page": 30,
        "area": (0.50, 0.0, 1.0, 0.75),
        "output": "public/images/cases/cases-right.jpg",
        "desc": "Project cases - right column",
    },
    # --- Government subsidy (KfW) ---
    {
        "page": 7,
        "area": (0.50, 0.05, 1.0, 0.45),
        "output": "public/images/solutions/home-install.jpg",
        "desc": "Home charging installation illustration",
    },
]


def main():
    doc = fitz.open(PDF_PATH)
    print(f"PDF: {PDF_PATH} ({len(doc)} pages)")
    print(f"Cropping {len(CROPS)} scene images at {DPI} DPI\n")

    base = Path("/data/workspace/yinglit-ev")

    for crop in CROPS:
        page = doc[crop["page"] - 1]
        rect = page.rect
        x0, y0, x1, y1 = crop["area"]
        clip = fitz.Rect(
            rect.x0 + rect.width * x0,
            rect.y0 + rect.height * y0,
            rect.x0 + rect.width * x1,
            rect.y0 + rect.height * y1,
        )
        pix = page.get_pixmap(clip=clip, dpi=DPI)

        out_path = base / crop["output"]
        out_path.parent.mkdir(parents=True, exist_ok=True)

        if out_path.suffix == ".png":
            pix.save(str(out_path))
        else:
            pix.save(str(out_path), jpg_quality=90)

        size_kb = out_path.stat().st_size / 1024
        print(f"  Page {crop['page']:2d} → {crop['output']:45s} ({pix.width}x{pix.height}, {size_kb:.0f}KB)")
        print(f"           {crop['desc']}")

    doc.close()
    print(f"\n✅ Done! {len(CROPS)} scene images cropped.")


if __name__ == "__main__":
    main()
