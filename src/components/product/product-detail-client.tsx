"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  MessageSquare,
} from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const locale = useLocale();
  const t = useTranslations("products");
  const tCommon = useTranslations("common");
  const primaryImage = product.media?.pdp || product.images[0];

  return (
    <section className="pt-24 lg:pt-28 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {tCommon("backToProducts")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square bg-[linear-gradient(180deg,rgba(244,250,255,0.92)_0%,#ffffff_62%)] border border-border/70 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(19,160,255,0.16),transparent_72%)]" />
            <div className="absolute left-1/2 bottom-8 h-6 w-40 -translate-x-1/2 rounded-full bg-navy/10 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-24 h-24 text-primary/10" />
            </div>
            {primaryImage && (
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </div>

          {/* Info */}
          <div>
            <div className="text-sm font-mono text-muted-foreground mb-2">
              {product.sku}
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              {product.name[locale] || product.name.en}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description[locale] || product.description.en}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h2 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {tCommon("features")}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            {product.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {tCommon("certifications")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/contact?product=${product.sku}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                {t("inquireNow")}
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {Object.keys(product.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              {tCommon("specifications")}
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value], i) => (
                      <tr
                        key={key}
                        className={i % 2 === 0 ? "bg-secondary/50" : ""}
                      >
                        <td className="px-6 py-3.5 text-sm font-medium text-foreground w-1/3 lg:w-1/4">
                          {key}
                        </td>
                        <td className="px-6 py-3.5 text-sm text-muted-foreground">
                          {value}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name.en || Object.values(product.name)[0],
              description: product.description.en || product.features.join(". "),
              sku: product.sku,
              image: product.images.map((img) => img.src),
              brand: { "@type": "Brand", name: "YINGLITECH" },
            }),
          }}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6">
              {t("relatedProducts")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${locale}/products/${rp.slug}`}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="text-xs font-mono text-muted-foreground mb-1">
                    {rp.sku}
                  </div>
                  <h3 className="font-heading text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                    {rp.name[locale] || rp.name.en}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    {t("viewDetails")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
