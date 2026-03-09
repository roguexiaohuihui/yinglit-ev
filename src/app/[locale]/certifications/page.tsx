"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Shield, Award, FileCheck, Globe, CheckCircle2 } from "lucide-react";

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

        {/* Certificate Gallery */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-border">
          <Image
            src="/images/certs/certificates.jpg"
            alt="Enterprise Qualification Certificates"
            width={1400}
            height={980}
            className="w-full h-auto"
          />
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
