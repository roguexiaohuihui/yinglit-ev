"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "products", href: "/products" },
  { key: "solutions", href: "/solutions" },
  { key: "oemOdm", href: "/oem-odm" },
  { key: "certifications", href: "/certifications" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = locale === "en" ? "zh" : "en";
  const switchLabel = locale === "en" ? "中文" : "English";
  const localeSwitchHref = pathname.replace(`/${locale}`, `/${switchLocale}`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <Image
              src="/logo-yingli.jpg"
              alt="Yingli Technology"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={localeSwitchHref}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
            >
              <Globe className="w-4 h-4" />
              {switchLabel}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("contact") === "联系我们" ? "获取报价" : "Get a Quote"}
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-base font-medium rounded-md transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
              <Link
                href={localeSwitchHref}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground"
              >
                <Globe className="w-4 h-4" />
                {switchLabel}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg"
              >
                {t("contact") === "联系我们" ? "获取报价" : "Get a Quote"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
