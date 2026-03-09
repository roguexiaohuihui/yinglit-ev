"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Zap } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-navy overflow-hidden">
      <Image
        src="/images/hero-home.jpg"
        alt="EV Charging Solutions"
        fill
        className="object-cover object-right opacity-30 lg:opacity-40"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-electric/10 border border-electric/20 rounded-full mb-8">
            <Zap className="w-4 h-4 text-electric" />
            <span className="text-sm font-medium text-electric">
              ODM & OEM — {locale === "zh" ? "服务全球25+国家" : "Serving 25+ Countries"}
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            {t("heroTitle")}
          </h1>

          <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/products`}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-navy font-semibold rounded-lg hover:bg-electric-light transition-colors"
            >
              {t("heroCta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              {t("heroCtaSecondary")}
            </Link>
          </div>
        </div>

        {/* Floating stats on hero */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/10">
          {[
            { value: "720KW", label: locale === "zh" ? "最大充电功率" : "Max Charging Power" },
            { value: "25+", label: locale === "zh" ? "出口国家" : "Export Countries" },
            { value: "100+", label: locale === "zh" ? "专利技术" : "Patents" },
            { value: "2017", label: locale === "zh" ? "成立年份" : "Founded" },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="font-heading text-3xl font-bold text-electric mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
