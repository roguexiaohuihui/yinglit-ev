"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Shield, Award, FileCheck, Globe, CheckCircle2 } from "lucide-react";
import { CERTIFICATION_EVIDENCE } from "@/data/visual-evidence";

const CERT_GROUPS = [
  {
    titleEn: "Safety & Product Standards",
    titleZh: "安全与产品标准",
    icon: Shield,
    certs: [
      { name: "CE Marking", region: "EU", desc: "European conformity for electrical equipment" },
      { name: "IEC 61851-1", region: "International", desc: "EV conductive charging - General requirements" },
      { name: "IEC 61851-21-2", region: "International", desc: "EMC requirements for EV charging" },
      { name: "IEC 62955", region: "International", desc: "Residual DC detecting device" },
      { name: "UL 2202 / UL 2594", region: "US/Canada", desc: "EV charging system equipment safety" },
      { name: "SAE J1772", region: "US/Canada", desc: "EV connector standard - Level 1 & 2" },
    ],
  },
  {
    titleEn: "Communication & Protocol",
    titleZh: "通信与协议",
    icon: Globe,
    certs: [
      { name: "OCPP 1.6J", region: "Global", desc: "Open Charge Point Protocol with JSON" },
      { name: "OCPP 2.0.1", region: "Global", desc: "Latest OCPP with enhanced security" },
      { name: "ISO 15118", region: "Global", desc: "Vehicle-to-Grid communication (Plug&Charge)" },
      { name: "DIN 70121", region: "Global", desc: "Digital communication DC charging" },
      { name: "CHAdeMO 1.0", region: "Japan/Global", desc: "DC fast charging protocol" },
    ],
  },
  {
    titleEn: "Measurement & EMC",
    titleZh: "计量与电磁兼容",
    icon: FileCheck,
    certs: [
      { name: "MID Certified Meter", region: "EU", desc: "Measuring Instruments Directive - energy metering" },
      { name: "PTB Certified Meter", region: "Germany", desc: "German national metrology institute certified" },
      { name: "FCC Part 15", region: "US", desc: "Radio frequency interference compliance" },
      { name: "ROHS / REACH", region: "EU", desc: "Restriction of hazardous substances" },
    ],
  },
  {
    titleEn: "Government Subsidies",
    titleZh: "政府补贴资质",
    icon: Award,
    certs: [
      { name: "KfW 440 / 441", region: "Germany", desc: "€900 subsidy per wallbox for private & commercial use" },
      { name: "UK EVHS Approved", region: "UK", desc: "Electric Vehicle Homecharge Scheme approved models" },
    ],
  },
];

export default function CertificationsPage() {
  const locale = useLocale();
  const t = useTranslations("certs");
  const isZh = locale === "zh";

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

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-8 bg-primary/5 rounded-xl border border-primary/10">
            <div className="font-heading text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm font-medium">{t("patents")}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("patentsDesc")}</p>
          </div>
          <div className="text-center p-8 bg-primary/5 rounded-xl border border-primary/10">
            <div className="font-heading text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm font-medium">{t("standards")}</div>
          </div>
          <div className="text-center p-8 bg-primary/5 rounded-xl border border-primary/10">
            <div className="font-heading text-4xl font-bold text-primary mb-2">2</div>
            <div className="text-sm font-medium">{t("subsidies")}</div>
            <p className="text-xs text-muted-foreground mt-1">{t("subsidiesDesc")}</p>
          </div>
        </div>

        {/* Certificate Evidence */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.4fr] gap-6 mb-16 items-start">
          <div className="rounded-2xl border border-border bg-secondary/30 p-6 lg:p-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              {isZh ? "原始资质样本" : "Original evidence"}
            </div>
            <h2 className="font-heading text-2xl font-bold mb-3">
              {isZh ? "资质文件可追溯" : "Certification Evidence You Can Verify"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {isZh
                ? "除了产品参数说明，我们还保留第三方测试报告、专利文件和补贴资质材料，可在 RFQ、投标和合规评估阶段按需提供。"
                : "Beyond specsheets, we maintain third-party test reports, patent records, and subsidy-eligibility documents for RFQs, tenders, and compliance review."}
            </p>
            <div className="space-y-3 text-sm">
              {[
                isZh ? "CE / IEC / EMC 相关测试资料" : "CE / IEC / EMC supporting reports",
                isZh ? "德国 KfW 与英国 EVHS 资质覆盖" : "Germany KfW and UK EVHS subsidy eligibility",
                isZh ? "专利与软件著作可配合 OEM 审核" : "Patent and software-IP evidence for OEM due diligence",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CERTIFICATION_EVIDENCE.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border/70 bg-white p-3 shadow-sm"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/20">
                  <Image
                    src={item.src}
                    alt={isZh ? item.alt.zh : item.alt.en}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 50vw, 22vw"
                  />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-medium leading-snug">
                    {isZh ? item.title.zh : item.title.en}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {isZh ? "原始资质页精选样本" : "Selected original compliance sample"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Groups */}
        <div className="space-y-10">
          {CERT_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.titleEn}>
                <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  {locale === "zh" ? group.titleZh : group.titleEn}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.certs.map((cert) => (
                    <div key={cert.name} className="p-4 bg-card border border-border rounded-lg flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{cert.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{cert.desc}</div>
                        <div className="text-xs text-primary/70 mt-1">{cert.region}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
