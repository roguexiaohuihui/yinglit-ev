"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Search, ArrowRight, Zap } from "lucide-react";
import type { Product, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductsPageClient({
  products,
  categories,
  activeCategory,
}: {
  products: Product[];
  categories: Category[];
  activeCategory: string;
}) {
  const locale = useLocale();
  const t = useTranslations("products");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name[locale]?.toLowerCase().includes(q) ||
      p.name.en?.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  return (
    <section className="pt-24 lg:pt-28 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={locale === "zh" ? "搜索产品或型号..." : "Search products or SKU..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/${locale}/products`}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                !activeCategory
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30"
              )}
            >
              {locale === "zh" ? "全部" : "All"}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/products?category=${cat.slug}`}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/30"
                )}
              >
                {cat.name[locale] || cat.name.en}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
            <p className="text-muted-foreground">{t("noResults")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations("products");
  const maxPower = product.specifications["Max Power"] || product.specifications["Max Input Power"] || "";
  const certsList = product.certifications.slice(0, 3).join(" · ");
  const listingImage = product.media?.listing || product.images[0];

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
    >
      <div className="aspect-[6/5] bg-[linear-gradient(180deg,rgba(244,250,255,0.92)_0%,#ffffff_62%)] relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(19,160,255,0.16),transparent_72%)]" />
        <div className="absolute left-1/2 bottom-5 h-5 w-32 -translate-x-1/2 rounded-full bg-navy/10 blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-16 h-16 text-primary/10" />
        </div>
        {listingImage && (
          <Image
            src={listingImage.src}
            alt={listingImage.alt}
            fill
            className="object-contain p-2 sm:p-3 group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {maxPower && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-navy/80 backdrop-blur-sm text-electric text-xs font-semibold rounded-md">
            {maxPower}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs text-muted-foreground font-mono mb-1.5">
          {product.sku}
        </div>
        <h3 className="font-heading text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name[locale] || product.name.en}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description[locale] || product.description.en}
        </p>

        {certsList && (
          <div className="text-xs text-muted-foreground/70 mb-3">
            {certsList}
          </div>
        )}

        <div className="flex items-center gap-1 text-sm font-medium text-primary">
          {t("viewDetails")}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
