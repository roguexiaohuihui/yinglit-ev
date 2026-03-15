"""
Crop brochure scenes into website-ready assets.

This script now supports two output styles:
- raw scene crops for large hero/background sections
- tile crops that isolate a single certificate/photo block and trim away
  neighboring brochure fragments
"""

from pathlib import Path

import cv2
import fitz
import numpy as np
from PIL import Image

PDF_PATH = "/data/workspace/Yinglit EV Charger 2026.pdf"
DPI = 300
PROJECT_ROOT = Path("/data/workspace/yinglit-ev")

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
        "desc": "Production line photo grid (reference only)",
    },
    {
        "page": 3,
        "area": (0.53, 0.55, 0.95, 0.92),
        "output": "public/images/about/warehouse.jpg",
        "desc": "Warehouse + testing equipment (reference only)",
    },
    {
        "page": 3,
        "area": (0.525, 0.115, 0.68, 0.335),
        "output": "public/images/about/evidence/assembly-line.jpg",
        "desc": "Automated assembly line",
        "postprocess": "main_component",
    },
    {
        "page": 3,
        "area": (0.815, 0.115, 0.955, 0.335),
        "output": "public/images/about/evidence/electronics-assembly.jpg",
        "desc": "Electronics assembly station",
        "postprocess": "main_component",
    },
    {
        "page": 3,
        "area": (0.525, 0.335, 0.68, 0.56),
        "output": "public/images/about/evidence/testing-workstation.jpg",
        "desc": "Testing workstation",
        "postprocess": "main_component",
    },
    {
        "page": 3,
        "area": (0.68, 0.335, 0.82, 0.56),
        "output": "public/images/about/evidence/production-floor.jpg",
        "desc": "Production floor inspection",
        "postprocess": "main_component",
    },
    {
        "page": 3,
        "area": (0.525, 0.555, 0.68, 0.78),
        "output": "public/images/about/evidence/high-power-cabinets.jpg",
        "desc": "High-power cabinet testing area",
        "postprocess": "main_component",
    },
    {
        "page": 3,
        "area": (0.68, 0.775, 0.82, 0.97),
        "output": "public/images/about/evidence/charger-line.jpg",
        "desc": "Charger line output",
        "postprocess": "main_component",
    },
    # --- Certifications ---
    {
        "page": 4,
        "area": (0.15, 0.14, 0.95, 0.89),
        "output": "public/images/certs/certificates.jpg",
        "desc": "Enterprise qualification certificates grid (reference only)",
    },
    {
        "page": 4,
        "area": (0.145, 0.165, 0.275, 0.435),
        "output": "public/images/certs/evidence/eu-type-examination.jpg",
        "desc": "EU type examination certificate",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.275, 0.165, 0.405, 0.435),
        "output": "public/images/certs/evidence/eu-type-matrix.jpg",
        "desc": "EU type examination model matrix",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.545, 0.165, 0.665, 0.435),
        "output": "public/images/certs/evidence/low-voltage-certificate.jpg",
        "desc": "Low-voltage compliance certificate",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.805, 0.165, 0.955, 0.435),
        "output": "public/images/certs/evidence/high-tech-enterprise.jpg",
        "desc": "National high-tech enterprise certificate",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.145, 0.445, 0.275, 0.705),
        "output": "public/images/certs/evidence/ce-attestation-a.jpg",
        "desc": "CE attestation of conformity",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.275, 0.445, 0.405, 0.705),
        "output": "public/images/certs/evidence/ce-attestation-b.jpg",
        "desc": "CE conformity declaration",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.545, 0.445, 0.665, 0.705),
        "output": "public/images/certs/evidence/low-voltage-certificate-b.jpg",
        "desc": "Secondary low-voltage certificate",
        "postprocess": "main_component",
    },
    {
        "page": 4,
        "area": (0.275, 0.715, 0.405, 0.98),
        "output": "public/images/certs/evidence/utility-patent.jpg",
        "desc": "Utility model patent certificate",
        "postprocess": "main_component",
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


def pix_to_rgb(pix: fitz.Pixmap) -> np.ndarray:
    image = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    if pix.alpha:
        image = image[:, :, :3]
    return image.copy()


def trim_to_main_component(image: np.ndarray, padding: int = 12) -> np.ndarray:
    mean = image.mean(axis=2)
    variation = image.max(axis=2) - image.min(axis=2)
    foreground = (mean < 248) | (variation > 18)

    component_count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground.astype("uint8"), 8)
    if component_count <= 1:
        return image

    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    x = stats[largest_label, cv2.CC_STAT_LEFT]
    y = stats[largest_label, cv2.CC_STAT_TOP]
    width = stats[largest_label, cv2.CC_STAT_WIDTH]
    height = stats[largest_label, cv2.CC_STAT_HEIGHT]

    x0 = max(0, x - padding)
    y0 = max(0, y - padding)
    x1 = min(image.shape[1], x + width + padding)
    y1 = min(image.shape[0], y + height + padding)
    return image[y0:y1, x0:x1]


def postprocess_crop(image: np.ndarray, mode: str | None) -> np.ndarray:
    if mode == "main_component":
        return trim_to_main_component(image)
    return image


def save_image(image: np.ndarray, output_path: Path) -> None:
    Image.fromarray(image).save(output_path, quality=90, optimize=True)


def main() -> None:
    doc = fitz.open(PDF_PATH)
    print(f"PDF: {PDF_PATH} ({len(doc)} pages)")
    print(f"Cropping {len(CROPS)} scene images at {DPI} DPI\n")

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
        image = postprocess_crop(pix_to_rgb(pix), crop.get("postprocess"))

        out_path = PROJECT_ROOT / crop["output"]
        out_path.parent.mkdir(parents=True, exist_ok=True)
        save_image(image, out_path)

        size_kb = out_path.stat().st_size / 1024
        print(
            f"  Page {crop['page']:2d} → {crop['output']:45s} "
            f"({image.shape[1]}x{image.shape[0]}, {size_kb:.0f}KB)"
        )
        print(f"           {crop['desc']}")

    doc.close()
    print(f"\nOK: {len(CROPS)} scene assets generated.")


if __name__ == "__main__":
    main()
