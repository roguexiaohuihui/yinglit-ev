"""
从 PDF 画册中裁剪产品图，并标准化到统一白底画布。

产品图处理分两类：
- primary: 适合深色单体产品。会提取主主体、清理 brochure 背景、再居中到统一画布。
- raw: 适合白色大机柜等产品。保留完整裁切，只做统一画布处理。

用法: python scripts/crop_products.py
"""

from pathlib import Path

import cv2
import fitz
import numpy as np
from PIL import Image

PDF_PATH = "/data/workspace/Yinglit EV Charger 2026.pdf"
OUTPUT_DIR = Path("/data/workspace/yinglit-ev/public/images/products")
DPI = 300
CANVAS_SIZE = 1400
CONTENT_SIZE = 1120

CROP_MAP = {
    # Portable EV Box (page 10)
    10: {
        "slug": "portable-charger",
        "area": (0.18, 0.26, 0.54, 0.91),
        "mode": "primary",
        "products": ["portable-ev-box-3-5kw", "portable-ev-box-7kw", "portable-ev-box-11kw"],
    },
    # Home Wallbox / Public Wallbox
    11: {
        "slug": "home-wallbox-cable",
        "area": (0.04, 0.42, 0.28, 0.93),
        "mode": "primary",
        "products": ["home-wallbox-7kw", "home-wallbox-11kw", "home-wallbox-22kw"],
    },
    12: {
        "slug": "public-wallbox-cable",
        "area": (0.04, 0.42, 0.28, 0.93),
        "mode": "primary",
        "products": ["public-wallbox-7kw", "public-wallbox-11kw", "public-wallbox-22kw"],
    },
    # Level 2
    13: {
        "slug": "home-level2",
        "area": (0.24, 0.34, 0.50, 0.86),
        "mode": "primary",
        "products": ["home-wallbox-level2-32a", "home-wallbox-level2-40a", "home-wallbox-level2-48a"],
    },
    14: {
        "slug": "public-level2",
        "area": (0.24, 0.34, 0.50, 0.86),
        "mode": "primary",
        "products": ["public-wallbox-level2-32a", "public-wallbox-level2-40a", "public-wallbox-level2-48a"],
    },
    # Wallbox / pedestal families
    15: {
        "slug": "pro-wallbox",
        "area": (0.03, 0.40, 0.24, 0.92),
        "mode": "primary",
        "products": ["pro-wallbox-7kw", "pro-wallbox-11kw", "pro-wallbox-22kw"],
    },
    16: {
        "slug": "twin-wallbox",
        "area": (0.18, 0.42, 0.45, 0.94),
        "mode": "primary",
        "products": ["twin-wallbox-14kw", "twin-wallbox-22kw", "twin-wallbox-44kw"],
    },
    17: {
        "slug": "twin-pedestal",
        "area": (0.16, 0.42, 0.42, 0.94),
        "mode": "primary",
        "products": ["twin-pedestal-14kw", "twin-pedestal-22kw", "twin-pedestal-44kw"],
    },
    18: {
        "slug": "ac-advertising",
        "area": (0.03, 0.36, 0.27, 0.94),
        "mode": "primary",
        "products": ["ac-advertising-14kw", "ac-advertising-22kw", "ac-advertising-44kw"],
    },
    # DC families
    19: {
        "slug": "mini-dc",
        "area": (0.28, 0.52, 0.52, 0.92),
        "mode": "primary",
        "products": ["mini-dc-30kw", "mini-dc-40kw", "mini-dc-60kw", "mini-dc-80kw"],
    },
    20: {
        "slug": "mobile-dc",
        "area": (0.01, 0.54, 0.30, 0.94),
        "mode": "primary",
        "products": ["mobile-dc-30kw", "mobile-dc-40kw"],
    },
    21: {
        "slug": "dc-advertising",
        "area": (0.01, 0.44, 0.25, 0.94),
        "mode": "primary",
        "products": ["dc-advertising-60kw", "dc-advertising-120kw"],
    },
    22: {
        "slug": "super-dc-120-240",
        "area": (0.02, 0.60, 0.22, 0.92),
        "mode": "raw",
        "products": ["super-dc-120kw", "super-dc-150kw", "super-dc-180kw", "super-dc-240kw"],
    },
    23: {
        "slug": "super-dc-300-360",
        "area": (0.02, 0.60, 0.22, 0.92),
        "mode": "raw",
        "products": ["super-dc-300kw", "super-dc-360kw"],
    },
    24: {
        "slug": "ac-dc-3in1",
        "area": (0.05, 0.40, 0.23, 0.92),
        "mode": "raw",
        "products": ["ac-dc-3in1-60kw"],
    },
    26: {
        "slug": "split-dc",
        "area": (0.10, 0.26, 0.40, 0.62),
        "mode": "raw",
        "products": ["split-dc-480kw", "split-dc-600kw", "split-dc-720kw"],
    },
    27: {
        "slug": "energy-storage",
        "area": (0.02, 0.74, 0.19, 0.88),
        "mode": "raw",
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
    return page.get_pixmap(clip=clip, dpi=DPI)


def pix_to_rgb(pix):
    """Convert PyMuPDF pixmap to an RGB numpy array."""
    image = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    if pix.alpha:
        image = image[:, :, :3]
    return image.copy()


def connected_light_background(image):
    """Find border-connected light/pastel brochure background."""
    maximum = image.max(axis=2)
    minimum = image.min(axis=2)
    mean = image.mean(axis=2)

    light_candidate = ((mean > 180) & ((maximum - minimum) < 95)) | (
        (image[:, :, 0] > 180) & (image[:, :, 1] > 180) & (image[:, :, 2] > 180)
    )

    component_count, labels, _, _ = cv2.connectedComponentsWithStats(light_candidate.astype("uint8"), 8)
    background = np.zeros((image.shape[0], image.shape[1]), dtype=bool)
    border_labels = set(
        np.unique(np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]]))
    )

    for label in border_labels:
        if label and label < component_count:
            background[labels == label] = True

    return background


def extract_primary_subject(image, background_mask):
    """Keep the main product component and nearby meaningful companions."""
    mean = image.mean(axis=2)
    foreground = (~background_mask) & (mean < 248)
    component_count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground.astype("uint8"), 8)
    if component_count <= 1:
        return None

    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    keep = np.zeros_like(foreground, dtype=bool)
    lx = stats[largest_label, cv2.CC_STAT_LEFT]
    ly = stats[largest_label, cv2.CC_STAT_TOP]
    lw = stats[largest_label, cv2.CC_STAT_WIDTH]
    lh = stats[largest_label, cv2.CC_STAT_HEIGHT]
    inflate = 80
    focus_box = (lx - inflate, ly - inflate, lx + lw + inflate, ly + lh + inflate)
    largest_area = stats[largest_label, cv2.CC_STAT_AREA]

    for label in range(1, component_count):
        area = stats[label, cv2.CC_STAT_AREA]
        x = stats[label, cv2.CC_STAT_LEFT]
        y = stats[label, cv2.CC_STAT_TOP]
        width = stats[label, cv2.CC_STAT_WIDTH]
        height = stats[label, cv2.CC_STAT_HEIGHT]
        touches_border = x == 0 or y == 0 or x + width >= image.shape[1] - 1 or y + height >= image.shape[0] - 1
        intersects_focus = not (
            x + width < focus_box[0]
            or x > focus_box[2]
            or y + height < focus_box[1]
            or y > focus_box[3]
        )

        if label == largest_label or (intersects_focus and area > largest_area * 0.02 and not touches_border):
            keep[labels == label] = True

    return keep


def crop_to_mask(image, mask):
    """Crop to a mask with small padding and whiten the outside."""
    ys, xs = np.where(mask)
    if len(xs) == 0 or len(ys) == 0:
        return image

    x0 = max(0, xs.min() - 20)
    y0 = max(0, ys.min() - 20)
    x1 = min(image.shape[1], xs.max() + 21)
    y1 = min(image.shape[0], ys.max() + 21)
    crop = image[y0:y1, x0:x1].copy()
    local_mask = mask[y0:y1, x0:x1]
    crop[~local_mask] = 255
    return crop


def fit_on_canvas(image):
    """Place an image onto a centered white square canvas."""
    canvas = np.full((CANVAS_SIZE, CANVAS_SIZE, 3), 255, dtype=np.uint8)
    height, width = image.shape[:2]
    scale = min(CONTENT_SIZE / width, CONTENT_SIZE / height)
    target_width = max(1, int(width * scale))
    target_height = max(1, int(height * scale))
    resized = cv2.resize(image, (target_width, target_height), interpolation=cv2.INTER_AREA)

    x = (CANVAS_SIZE - target_width) // 2
    y = (CANVAS_SIZE - target_height) // 2
    canvas[y : y + target_height, x : x + target_width] = resized
    return canvas


def normalize_product_image(image, mode):
    """Normalize a raw crop to a consistent white-background product asset."""
    if mode == "primary":
        background_mask = connected_light_background(image)
        subject_mask = extract_primary_subject(image, background_mask)
        if subject_mask is not None and subject_mask.any():
            return fit_on_canvas(crop_to_mask(image, subject_mask))

    return fit_on_canvas(image)


def save_jpg(image, output_path):
    Image.fromarray(image).save(output_path, quality=92, optimize=True)


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
        image = pix_to_rgb(pix)
        normalized = normalize_product_image(image, config["mode"])

        filename = f"{slug}.jpg"
        output_path = OUTPUT_DIR / filename
        save_jpg(normalized, output_path)
        size_kb = output_path.stat().st_size / 1024

        print(f"  Page {page_num:2d} → {filename:30s} ({normalized.shape[1]}x{normalized.shape[0]}, {size_kb:.0f}KB)")
        print(f"           Mode: {config['mode']}")
        print(f"           Products: {', '.join(config['products'])}")
        total += 1

    doc.close()
    print(f"\n✅ Cropped and normalized {total} product images to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
