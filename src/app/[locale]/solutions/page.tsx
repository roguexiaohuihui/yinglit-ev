"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import {
  Home,
  Building2,
  Zap,
  ArrowRight,
  Battery,
  Wifi,
  Shield,
  BarChart3,
  Smartphone,
  Server,
} from "lucide-react";
import { SolutionVisual } from "@/components/solution/solution-visual";

const SOLUTIONS = [
  {
    key: "home" as const,
    icon: Home,
    products: ["YLEV7K-Y1", "YLEV11K-Y2", "YLEV22K-Y3", "YLEV32A-L1", "YLEV48A-L3"],
    features: [
      { icon: Smartphone, label: { en: "Bluetooth APP Control", zh: "蓝牙APP控制" } },
      { icon: BarChart3, label: { en: "Dynamic Load Balance", zh: "动态负载均衡" } },
      { icon: Shield, label: { en: "Type A+DC6mA RCD", zh: "Type A+DC6mA漏电保护" } },
      { icon: Battery, label: { en: "7-22KW Flexible Power", zh: "7-22KW灵活功率" } },
    ],
  },
  {
    key: "commercial" as const,
    icon: Building2,
    products: ["YLEV7K-S1", "YLEV22K-S3", "YLEV44K-T3", "YLEV44K-AD3"],
    features: [
      { icon: Server, label: { en: "OCPP 1.6J / 2.0", zh: "OCPP 1.6J / 2.0" } },
      { icon: Wifi, label: { en: "WiFi/Ethernet/4G", zh: "WiFi/以太网/4G" } },
      { icon: BarChart3, label: { en: "MID Certified Meter", zh: "MID认证计量" } },
      { icon: Shield, label: { en: "RFID + Credit Card", zh: "RFID + 银行卡支付" } },
    ],
  },
  {
    key: "public" as const,
    icon: Zap,
    products: ["YLEV30K-D1", "YLEV120K-D5", "YLEV240K-D8", "YLEV480K-D11", "YLEV720K-D13"],
    features: [
      { icon: Zap, label: { en: "30-720KW DC Power", zh: "30-720KW直流功率" } },
      { icon: Battery, label: { en: "CCS2/CCS1/NACS/GB/T", zh: "CCS2/CCS1/NACS/GB/T" } },
      { icon: Server, label: { en: "Split Design + Liquid Cooling", zh: "分体式 + 液冷" } },
      { icon: Shield, label: { en: "ISO15118 Plug&Charge", zh: "ISO15118 即插即充" } },
    ],
  },
];

export default function SolutionsPage() {
  const locale = useLocale();
  const t = useTranslations("solutions");

  return (
    <section className="pt-24 lg:pt-28 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-20">
          {SOLUTIONS.map((sol, idx) => {
            const Icon = sol.icon;
            const isEven = idx % 2 === 1;

            return (
              <div key={sol.key} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={isEven ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-6">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {t(`${sol.key}Title`)}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                    {t(`${sol.key}Title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {t(`${sol.key}Desc`)}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {sol.features.map((f) => {
                      const FIcon = f.icon;
                      return (
                        <div key={f.label.en} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                          <FIcon className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-sm font-medium">
                            {f.label[locale as keyof typeof f.label] || f.label.en}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {sol.products.map((sku) => (
                      <span key={sku} className="px-2.5 py-1 bg-navy/5 text-navy text-xs font-mono rounded">
                        {sku}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/products`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {locale === "zh" ? "查看相关产品" : "View Related Products"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className={`aspect-[4/3] ${isEven ? "lg:order-1" : ""}`}>
                  <SolutionVisual variant={sol.key} locale={locale} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
