import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Portable Charger", href: "/products?category=portable-charger" },
  { label: "Home AC Charger", href: "/products?category=home-ac-charger" },
  { label: "Commercial AC Charger", href: "/products?category=commercial-ac-charger" },
  { label: "DC Fast Charger", href: "/products?category=dc-charger" },
  { label: "Energy Storage", href: "/products?category=energy-storage" },
];

const QUICK_LINKS = [
  { key: "solutions", href: "/solutions" },
  { key: "oemOdm", href: "/oem-odm" },
  { key: "certifications", href: "/certifications" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-yingli.jpg"
                alt="Yingli Technology"
                width={140}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("productCategories")}
            </h3>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/60 hover:text-electric transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-white/60 hover:text-electric transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("contactUs")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-electric shrink-0" />
                <a href="mailto:John@yinglitech.com" className="text-sm text-white/60 hover:text-electric transition-colors">
                  John@yinglitech.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-electric shrink-0" />
                <a href="tel:+8613410015126" className="text-sm text-white/60 hover:text-electric transition-colors">
                  +86 134 100 15126
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-electric shrink-0" />
                <span className="text-sm text-white/60">
                  Pingshan District, Shenzhen, China
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
