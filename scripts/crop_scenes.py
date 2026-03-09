"""
从 PDF 画册中裁剪场景/素材图片，用于网站各页面的视觉填充。
"""

import fitz
from pathlib import Path

PDF_PATH = "/data/workspace/Yinglit EV Charger 2026.pdf"
DPI = 300

CROPS = [
    # --- Logo (from page 2 About Us section, clearer) ---
    {
        "page": 2,
        "area": (0.88, 0.0, 0.98, 0.07),
        "output": "public/logo-yingli.png",
        "desc": "Yingli Logo from About page header",
    },
    # --- Hero ---
    {
        "page": 1,
        "area": (0.52, 0.08, 1.0, 0.78),
        "output": "public/images/hero-home.jpg",
        "desc": "Home charging scene (Tesla + solar)",
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
        "area": (0.03, 0.58, 0.48, 0.95),
        "output": "public/images/about/factory.jpg",
        "desc": "Company building exterior",
    },
    {
        "page": 3,
        "area": (0.50, 0.05, 1.0, 0.55),
        "output": "public/images/about/production.jpg",
        "desc": "Production line photos grid",
    },
    {
        "page": 3,
        "area": (0.50, 0.55, 1.0, 1.0),
        "output": "public/images/about/warehouse.jpg",
        "desc": "Warehouse + testing equipment",
    },
    # --- Certifications ---
    {
        "page": 4,
        "area": (0.12, 0.08, 1.0, 0.98),
        "output": "public/images/certs/certificates.jpg",
        "desc": "Enterprise qualification certificates grid",
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
    # --- OEM/ODM ---
    {
        "page": 2,
        "area": (0.50, 0.40, 1.0, 0.65),
        "output": "public/images/oem/partner-logos.jpg",
        "desc": "Partner brand logos (Toyota, Tesla, etc.)",
    },
    {
        "page": 2,
        "area": (0.50, 0.75, 1.0, 0.98),
        "output": "public/images/oem/factory-tour.jpg",
        "desc": "Factory tour photos",
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
