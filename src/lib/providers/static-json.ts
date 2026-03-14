import productsData from "@/data/products.json";
import mediaManifestData from "@/data/media-manifest.json";
import categoriesData from "@/data/categories.json";
import settingsData from "@/data/settings.json";
import type {
  DataProvider,
  Product,
  Category,
  SiteSettings,
  MediaAsset,
  ProductMedia,
} from "../types";

type RawProduct = Omit<Product, "images" | "media"> & { images: string[] };

type RawMediaValue =
  | string
  | {
      src: string;
      alt?: string | Record<string, string>;
    };

type RawMediaEntry = {
  listing?: RawMediaValue;
  pdp?: RawMediaValue;
  gallery?: RawMediaValue[];
  variants?: Record<string, RawMediaValue>;
};

type RawMediaManifest = {
  version: number;
  products: Record<string, RawMediaEntry>;
};

const mediaManifest =
  (mediaManifestData as RawMediaManifest | undefined)?.products || {};

function fallbackAlt(raw: RawProduct) {
  return raw.name.en || Object.values(raw.name)[0] || "";
}

function normalizeMediaAsset(
  value: RawMediaValue | undefined,
  role: MediaAsset["role"],
  raw: RawProduct
): MediaAsset | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    return { src: value, alt: fallbackAlt(raw), role };
  }

  const alt =
    typeof value.alt === "string"
      ? value.alt
      : value.alt?.en || (value.alt ? Object.values(value.alt)[0] : undefined) || fallbackAlt(raw);

  return {
    src: value.src,
    alt,
    role,
  };
}

function normalizeMedia(raw: RawProduct, entry?: RawMediaEntry): ProductMedia | undefined {
  if (!entry) return undefined;

  const gallery = (entry.gallery || [])
    .map((asset) => normalizeMediaAsset(asset, "gallery", raw))
    .filter(Boolean) as MediaAsset[];

  const variants = Object.fromEntries(
    Object.entries(entry.variants || {})
      .map(([key, asset]) => [key, normalizeMediaAsset(asset, "variant", raw)])
      .filter(([, asset]) => Boolean(asset))
  ) as Record<string, MediaAsset>;

  return {
    listing: normalizeMediaAsset(entry.listing, "listing", raw),
    pdp: normalizeMediaAsset(entry.pdp, "pdp", raw),
    gallery,
    variants: Object.keys(variants).length ? variants : undefined,
  };
}

function normalizeProduct(raw: RawProduct): Product {
  const media = normalizeMedia(raw, mediaManifest[raw.slug] || mediaManifest[raw.sku]);
  const derivedImages = [
    ...(media?.pdp ? [media.pdp] : []),
    ...(media?.gallery || []),
  ];

  return {
    ...raw,
    media,
    images: derivedImages.length
      ? derivedImages
      : raw.images.map((src) => ({
          src,
          alt: fallbackAlt(raw),
        })),
  };
}

function normalizeAll(rawProducts: RawProduct[]): Product[] {
  return rawProducts.map(normalizeProduct);
}

const provider: DataProvider = {
  async getProducts(options) {
    let products = normalizeAll(productsData as unknown as RawProduct[]);
    if (options?.category) {
      products = products.filter((p) => p.category === options.category);
    }
    if (options?.status) {
      products = products.filter((p) => p.status === options.status);
    } else {
      products = products.filter((p) => p.status === "active");
    }
    if (options?.limit) {
      products = products.slice(0, options.limit);
    }
    return products;
  },

  async getProductBySlug(slug) {
    const raw = (productsData as unknown as RawProduct[]).find(
      (p) => p.slug === slug
    );
    return raw ? normalizeProduct(raw) : null;
  },

  async getCategories() {
    const categories = categoriesData as unknown as Category[];
    const products = productsData as unknown as Product[];
    return categories
      .map((cat) => ({
        ...cat,
        productCount: products.filter(
          (p) => p.category === cat.slug && p.status === "active"
        ).length,
      }))
      .sort((a, b) => a.order - b.order);
  },

  async getSiteSettings() {
    return settingsData as unknown as SiteSettings;
  },
};

export default provider;
