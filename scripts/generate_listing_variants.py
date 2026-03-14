"""
Generate tighter product listing images from normalized PDP assets.

The product detail page can keep square white-background assets, while the
listing grid uses a wider 6:5 canvas with a larger subject fill ratio.
"""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SOURCE_DIR = Path("/data/workspace/yinglit-ev/public/images/products")
CANVAS_WIDTH = 1440
CANVAS_HEIGHT = 1200
CONTENT_MARGIN = 56


def connected_white_background(image: np.ndarray) -> np.ndarray:
    mean = image.mean(axis=2)
    candidate = (mean > 245) & ((image.max(axis=2) - image.min(axis=2)) < 25)

    component_count, labels, _, _ = cv2.connectedComponentsWithStats(candidate.astype("uint8"), 8)
    background = np.zeros(image.shape[:2], dtype=bool)
    border_labels = set(
        np.unique(np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]]))
    )

    for label in border_labels:
        if label and label < component_count:
            background[labels == label] = True

    return background


def extract_subject_mask(image: np.ndarray) -> np.ndarray:
    background = connected_white_background(image)
    foreground = (~background) & (image.mean(axis=2) < 248)

    component_count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground.astype("uint8"), 8)
    if component_count <= 1:
        return foreground

    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    keep = np.zeros_like(foreground, dtype=bool)
    largest_area = stats[largest_label, cv2.CC_STAT_AREA]
    lx = stats[largest_label, cv2.CC_STAT_LEFT]
    ly = stats[largest_label, cv2.CC_STAT_TOP]
    lw = stats[largest_label, cv2.CC_STAT_WIDTH]
    lh = stats[largest_label, cv2.CC_STAT_HEIGHT]
    focus_box = (lx - 120, ly - 120, lx + lw + 120, ly + lh + 120)

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

        if label == largest_label or (intersects_focus and area > largest_area * 0.015 and not touches_border):
            keep[labels == label] = True

    return keep


def crop_to_subject(image: np.ndarray, mask: np.ndarray) -> np.ndarray:
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


def fit_on_listing_canvas(image: np.ndarray) -> np.ndarray:
    canvas = np.full((CANVAS_HEIGHT, CANVAS_WIDTH, 3), 255, dtype=np.uint8)
    height, width = image.shape[:2]
    available_width = CANVAS_WIDTH - CONTENT_MARGIN * 2
    available_height = CANVAS_HEIGHT - CONTENT_MARGIN * 2
    scale = min(available_width / width, available_height / height)
    target_width = max(1, int(width * scale))
    target_height = max(1, int(height * scale))
    resized = cv2.resize(image, (target_width, target_height), interpolation=cv2.INTER_AREA)

    x = (CANVAS_WIDTH - target_width) // 2
    y = (CANVAS_HEIGHT - target_height) // 2
    canvas[y : y + target_height, x : x + target_width] = resized
    return canvas


def generate_variant(source_path: Path) -> Path:
    image = np.array(Image.open(source_path).convert("RGB"))
    subject = crop_to_subject(image, extract_subject_mask(image))
    listing_image = fit_on_listing_canvas(subject)
    output_path = source_path.with_name(f"{source_path.stem}.listing.jpg")
    Image.fromarray(listing_image).save(output_path, quality=92, optimize=True)
    return output_path


def main() -> None:
    sources = sorted(
        path
        for path in SOURCE_DIR.glob("*.jpg")
        if not path.name.endswith(".listing.jpg")
    )

    print(f"Source dir: {SOURCE_DIR}")
    print(f"Generating {len(sources)} listing variants\n")

    for source in sources:
        output = generate_variant(source)
        print(f"  {source.name:24s} -> {output.name}")

    print("\nOK: product listing variants generated.")


if __name__ == "__main__":
    main()
