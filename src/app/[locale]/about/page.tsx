"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Cpu, Factory, Globe, Calendar } from "lucide-react";

const MILESTONES = [
  { year: "2017", en: "Company founded in Shenzhen", zh: "在深圳成立" },
  { year: "2018", en: "First export to European market", zh: "首次出口欧洲市场" },
  { year: "2019", en: "KfW eligibility achieved", zh: "获得德国KfW补贴资质" },
  { year: "2020", en: "UK EVHS approved", zh: "获英国EVHS认证" },
  { year: "2021", en: "DC fast charger line launched", zh: "直流快充产品线上市" },
  { year: "2022", en: "Exported to 20+ countries", zh: "出口超过20个国家" },
  { year: "2023", en: "720KW split DC system released", zh: "720KW分体式超充发布" },
  { year: "2024", en: "Energy storage solutions launched", zh: "储能解决方案上市" },
  { year: "2025", en: "100+ patents milestone", zh: "突破100+项专利" },
];

export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations("about");

  return (
    <section className="pt-24 lg:pt-28 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Story + Factory Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("story")}
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-[16/10]">
              <Image
                src="/images/about/factory.jpg"
                alt="Yingli Technology Headquarters"
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about/production.jpg"
                  alt="Production Line"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about/warehouse.jpg"
                  alt="Warehouse & Testing"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { key: "innovation", icon: Cpu },
            { key: "capacity", icon: Factory },
            { key: "global", icon: Globe },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="p-8 bg-card border border-border rounded-xl">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {t(item.key)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`${item.key}Desc`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">
            {locale === "zh" ? "发展历程" : "Our Journey"}
          </h2>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-0.5" />
            <div className="space-y-8">
              {MILESTONES.map((ms, i) => (
                <div key={ms.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : ""} hidden lg:block`} />
                  <div className="relative z-10 w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="font-heading text-lg font-bold text-primary">{ms.year}</div>
                    <div className="text-muted-foreground text-sm">
                      {locale === "zh" ? ms.zh : ms.en}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
