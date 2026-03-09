"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Paintbrush,
  Cpu,
  Factory,
  Shield,
  Truck,
  HeadphonesIcon,
  ArrowRight,
  Wrench,
  Package,
} from "lucide-react";

const STEPS = [
  { icon: HeadphonesIcon, key: "step1" },
  { icon: Cpu, key: "step2" },
  { icon: Wrench, key: "step3" },
  { icon: Factory, key: "step4" },
  { icon: Shield, key: "step5" },
  { icon: Truck, key: "step6" },
];

const CAPABILITIES = [
  {
    titleEn: "Custom Branding",
    titleZh: "品牌定制",
    descEn: "Logo, color, packaging, UI customization for your brand identity.",
    descZh: "Logo、颜色、包装、UI界面定制，打造您的品牌形象。",
    icon: Paintbrush,
  },
  {
    titleEn: "Hardware Modification",
    titleZh: "硬件改型",
    descEn: "Custom enclosure design, connector configuration, and power rating adjustments.",
    descZh: "定制外壳设计、接口配置和功率调整。",
    icon: Wrench,
  },
  {
    titleEn: "Software Customization",
    titleZh: "软件定制",
    descEn: "ODM of cloud platform, mobile APP, and OCPP backend with your branding.",
    descZh: "云平台、移动APP和OCPP后端的ODM定制。",
    icon: Cpu,
  },
  {
    titleEn: "Compliance Support",
    titleZh: "合规支持",
    descEn: "CE, UL, KfW, MID, and regional certification assistance for your target markets.",
    descZh: "CE、UL、KfW、MID等目标市场的认证支持。",
    icon: Shield,
  },
  {
    titleEn: "Flexible MOQ",
    titleZh: "灵活起订量",
    descEn: "Scalable production from small trial batches to large volume orders.",
    descZh: "从小批量试产到大批量订单的灵活生产。",
    icon: Package,
  },
  {
    titleEn: "After-Sales Support",
    titleZh: "售后支持",
    descEn: "Technical training, spare parts supply, and remote diagnosis support.",
    descZh: "技术培训、备件供应和远程诊断支持。",
    icon: HeadphonesIcon,
  },
];

export default function OemOdmPage() {
  const locale = useLocale();
  const t = useTranslations("oem");

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

        {/* Capabilities Grid */}
        <div className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">
            {t("capability")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.titleEn} className="p-6 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {locale === "zh" ? cap.titleZh : cap.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {locale === "zh" ? cap.descZh : cap.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">
            {t("process")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <p className="text-sm font-medium">{t(step.key)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Brands */}
        <div className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-6">
            {locale === "zh" ? "合作品牌" : "Trusted Partners"}
          </h2>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/oem/partner-logos.jpg"
              alt="Partner brands including Toyota, Tesla, Audi, Nissan, KIA and more"
              width={1200}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Factory Tour */}
        <div className="mb-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-6">
            {locale === "zh" ? "工厂实景" : "Factory Tour"}
          </h2>
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/oem/factory-tour.jpg"
              alt="Yingli Technology factory tour"
              width={1200}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-secondary rounded-2xl p-10 lg:p-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
            {locale === "zh" ? "开启您的OEM/ODM合作" : "Start Your OEM/ODM Partnership"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {locale === "zh"
              ? "告诉我们您的需求，我们的团队将在24小时内回复您。"
              : "Tell us your requirements and our team will respond within 24 hours."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {locale === "zh" ? "联系我们" : "Contact Us"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
