"""
从 PDF 画册中按页裁剪产品图片，输出到 public/images/products/。
每个产品页的裁剪区域通过配置定义（基于画册布局观察）。

用法: python scripts/crop_products.py
"""

import fitz
from pathlib import Path

PDF_PATH = "/data/workspace/Yinglit EV Charger 2026.pdf"
OUTPUT_DIR = Path("/data/workspace/yinglit-ev/public/images/products")
DPI = 300

# 画册页面尺寸约 1024x737 px @100dpi → 实际 PDF 点尺寸可能不同
# 裁剪区域定义为页面百分比 (x0%, y0%, x1%, y1%)
# 左半页产品图的典型区域

CROP_MAP = {
    # Portable EV Box (page 10) — 产品图在左半页中间偏下
    10: {
        "slug": "portable-charger",
        "area": (0.22, 0.32, 0.48, 0.80),
        "products": ["portable-ev-box-3-5kw", "portable-ev-box-7kw", "portable-ev-box-11kw"],
    },
    # Home Wallbox Cable/Socket (page 11)
    11: {
        "slug": "home-wallbox-cable",
        "area": (0.05, 0.25, 0.45, 0.88),
        "products": ["home-wallbox-7kw", "home-wallbox-11kw", "home-wallbox-22kw"],
    },
    # Public Wallbox Cable/Socket (page 12)
    12: {
        "slug": "public-wallbox-cable",
        "area": (0.05, 0.25, 0.45, 0.88),
        "products": ["public-wallbox-7kw", "public-wallbox-11kw", "public-wallbox-22kw"],
    },
    # Home Level 2 (page 13)
    13: {
        "slug": "home-level2",
        "area": (0.08, 0.28, 0.48, 0.88),
        "products": ["home-wallbox-level2-32a", "home-wallbox-level2-40a", "home-wallbox-level2-48a"],
    },
    # Public Level 2 (page 14)
    14: {
        "slug": "public-level2",
        "area": (0.05, 0.25, 0.45, 0.88),
        "products": ["public-wallbox-level2-32a", "public-wallbox-level2-40a", "public-wallbox-level2-48a"],
    },
    # Pro Wallbox (page 15)
    15: {
        "slug": "pro-wallbox",
        "area": (0.05, 0.15, 0.48, 0.88),
        "products": ["pro-wallbox-7kw", "pro-wallbox-11kw", "pro-wallbox-22kw"],
    },
    # Twin Wallbox (page 16)
    16: {
        "slug": "twin-wallbox",
        "area": (0.05, 0.25, 0.48, 0.88),
        "products": ["twin-wallbox-14kw", "twin-wallbox-22kw", "twin-wallbox-44kw"],
    },
    # Twin Pedestal (page 17)
    17: {
        "slug": "twin-pedestal",
        "area": (0.05, 0.25, 0.48, 0.88),
        "products": ["twin-pedestal-14kw", "twin-pedestal-22kw", "twin-pedestal-44kw"],
    },
    # AC Advertising Pedestal (page 18)
    18: {
        "slug": "ac-advertising",
        "area": (0.05, 0.20, 0.48, 0.90),
        "products": ["ac-advertising-14kw", "ac-advertising-22kw", "ac-advertising-44kw"],
    },
    # MINI DC (page 19) — 4 台充电桩
    19: {
        "slug": "mini-dc",
        "area": (0.03, 0.40, 0.50, 0.90),
        "products": ["mini-dc-30kw", "mini-dc-40kw", "mini-dc-60kw", "mini-dc-80kw"],
    },
    # Mobile DC (page 20)
    20: {
        "slug": "mobile-dc",
        "area": (0.05, 0.25, 0.48, 0.90),
        "products": ["mobile-dc-30kw", "mobile-dc-40kw"],
    },
    # DC Advertising Pedestal (page 21) — 大屏充电桩
    21: {
        "slug": "dc-advertising",
        "area": (0.05, 0.35, 0.48, 0.90),
        "products": ["dc-advertising-60kw", "dc-advertising-120kw"],
    },
    # Super DC 120-240KW (page 22) — 3 台大型充电桩
    22: {
        "slug": "super-dc-120-240",
        "area": (0.03, 0.50, 0.50, 0.95),
        "products": ["super-dc-120kw", "super-dc-150kw", "super-dc-180kw", "super-dc-240kw"],
    },
    # Super DC 300-360KW (page 23)
    23: {
        "slug": "super-dc-300-360",
        "area": (0.03, 0.50, 0.50, 0.95),
        "products": ["super-dc-300kw", "super-dc-360kw"],
    },
    # 3-IN-1 Charger (page 24)
    24: {
        "slug": "ac-dc-3in1",
        "area": (0.05, 0.35, 0.48, 0.90),
        "products": ["ac-dc-3in1-60kw"],
    },
    # Split Type HP Fast DC (page 26) — 大型分体机柜 + 终端
    26: {
        "slug": "split-dc",
        "area": (0.15, 0.12, 0.50, 0.70),
        "products": ["split-dc-480kw", "split-dc-600kw", "split-dc-720kw"],
    },
    # Energy Storage (page 27)
    27: {
        "slug": "energy-storage",
        "area": (0.03, 0.05, 0.50, 0.70),
        "products": ["energy-storage-system", "energy-storage-residential"],
    },
}


def crop_page(doc, page_num, config):
    """Crop product image area from a PDF page at high DPI."""
    page = doc[page_num - 1]
    rect = page.rect
    x0, y0, x1, y1 = config["area"]
    clip = fitz.Rect(
        rect.x0 + rect.width * x0,
        rect.y0 + rect.height * y0,
        rect.x0 + rect.width * x1,
        rect.y0 + rect.height * y1,
    )
    pix = page.get_pixmap(clip=clip, dpi=DPI)
    return pix


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(PDF_PATH)
    print(f"PDF: {PDF_PATH} ({len(doc)} pages)")
    print(f"Output: {OUTPUT_DIR}")
    print(f"DPI: {DPI}")
    print()

    total = 0
    for page_num, config in sorted(CROP_MAP.items()):
        slug = config["slug"]
        pix = crop_page(doc, page_num, config)

        # Save as category-level image (shared by all products in this line)
        fname = f"{slug}.jpg"
        fpath = OUTPUT_DIR / fname
        pix.save(str(fpath), jpg_quality=92)
        size_kb = fpath.stat().st_size / 1024

        print(f"  Page {page_num:2d} → {fname:30s} ({pix.width}x{pix.height}, {size_kb:.0f}KB)")
        print(f"           Products: {', '.join(config['products'])}")
        total += 1

    doc.close()
    print(f"\n✅ Cropped {total} product images to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
