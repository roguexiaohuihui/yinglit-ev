"use client";

import {
  ArrowRight,
  BarChart3,
  Battery,
  Building2,
  Factory,
  Home,
  Server,
  Shield,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Node({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Home;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-sky-100 bg-white/90 px-4 py-4 text-center shadow-sm",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-xs font-medium text-slate-600">{label}</div>
    </div>
  );
}

function FlowLine() {
  return <div className="h-px flex-1 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200" />;
}

function ChargerColumn({
  accent = "bg-sky-500",
}: {
  accent?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-24 w-14 items-center justify-center rounded-[18px] border border-slate-200 bg-white shadow-sm">
        <div className={cn("absolute left-1/2 top-3 h-1.5 w-8 -translate-x-1/2 rounded-full", accent)} />
        <Zap className="h-5 w-5 text-primary" />
        <div className="absolute bottom-2 h-8 w-1 rounded-full bg-slate-300" />
      </div>
      <div className="h-6 w-10 rounded-full bg-sky-100" />
    </div>
  );
}

function HomeVisual({ locale }: { locale: string }) {
  return (
    <div className="relative h-full rounded-2xl border border-sky-100 bg-[linear-gradient(135deg,#f5fbff_0%,#edf7ff_48%,#ffffff_100%)] p-8 shadow-sm">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
        <Home className="h-4 w-4" />
        {locale === "zh" ? "家庭充电闭环" : "Home Charging Flow"}
      </div>

      <div className="flex items-center gap-4">
        <Node icon={Home} label={locale === "zh" ? "家庭场景" : "Home"} className="w-28" />
        <FlowLine />
        <Node icon={Battery} label={locale === "zh" ? "配电/负载" : "Load Balance"} className="w-32" />
        <FlowLine />
        <Node icon={Smartphone} label={locale === "zh" ? "APP 控制" : "Mobile APP"} className="w-28" />
      </div>

      <div className="mt-8 grid grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-[28px] border border-sky-100 bg-white p-6 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
            Wallbox
          </div>
          <div className="mx-auto flex h-52 w-40 items-center justify-center rounded-[40px] bg-[radial-gradient(circle_at_top,#0f172a_0%,#101828_58%,#1f2937_100%)] shadow-[0_30px_60px_rgba(15,23,42,0.12)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-lime-400 text-lime-400">
              <Zap className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            locale === "zh" ? "7-22KW 灵活功率" : "7-22KW Flexible Power",
            locale === "zh" ? "动态负载均衡" : "Dynamic Load Balance",
            locale === "zh" ? "蓝牙 / WiFi 控制" : "Bluetooth / WiFi Control",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommercialVisual({ locale }: { locale: string }) {
  return (
    <div className="relative h-full rounded-2xl border border-sky-100 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_45%,#ffffff_100%)] p-8 shadow-sm">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
        <Building2 className="h-4 w-4" />
        {locale === "zh" ? "商业站点架构" : "Commercial Site Stack"}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div className="flex items-end justify-center gap-4">
          <ChargerColumn accent="bg-cyan-500" />
          <ChargerColumn accent="bg-sky-500" />
          <ChargerColumn accent="bg-blue-500" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <ArrowRight className="h-5 w-5 text-sky-300" />
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Server className="h-8 w-8" />
          </div>
          <ArrowRight className="h-5 w-5 text-sky-300" />
        </div>

        <div className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary/60">
            {locale === "zh" ? "运营面板" : "Operator Panel"}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-sky-300" />
                <div className="h-2 w-2 rounded-full bg-cyan-300" />
                <div className="h-2 w-2 rounded-full bg-slate-300" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-slate-200" />
              <div className="h-2 w-4/5 rounded-full bg-sky-100" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-14 rounded-xl bg-sky-50" />
                <div className="h-14 rounded-xl bg-cyan-50" />
                <div className="h-14 rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        {[
          { icon: Server, label: locale === "zh" ? "OCPP 1.6J / 2.0" : "OCPP 1.6J / 2.0" },
          { icon: Wifi, label: locale === "zh" ? "WiFi / 以太网 / 4G" : "WiFi / Ethernet / 4G" },
          { icon: BarChart3, label: locale === "zh" ? "MID 计量" : "MID Metering" },
          { icon: Shield, label: locale === "zh" ? "RFID / 银行卡" : "RFID / Card Pay" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/90 px-4 py-3 shadow-sm">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PublicVisual({ locale }: { locale: string }) {
  return (
    <div className="relative h-full rounded-2xl border border-sky-100 bg-[linear-gradient(135deg,#f7fbff_0%,#edf5ff_52%,#ffffff_100%)] p-8 shadow-sm">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
        <Zap className="h-4 w-4" />
        {locale === "zh" ? "公共快充网络" : "Public DC Network"}
      </div>

      <div className="flex items-center gap-3">
        <Node icon={Factory} label={locale === "zh" ? "变压器" : "Transformer"} className="w-28" />
        <FlowLine />
        <Node icon={Battery} label={locale === "zh" ? "配电柜" : "Power Cabinet"} className="w-32" />
        <FlowLine />
        <Node icon={Server} label={locale === "zh" ? "云平台" : "Cloud"} className="w-24" />
        <FlowLine />
        <Node icon={BarChart3} label={locale === "zh" ? "运维系统" : "Monitoring"} className="w-28" />
      </div>

      <div className="mt-10 rounded-[28px] border border-sky-100 bg-white/90 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-700">
            {locale === "zh" ? "终端分配" : "Dispenser Network"}
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">30-720KW</div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {["bg-sky-500", "bg-cyan-500", "bg-blue-500", "bg-indigo-500"].map((tone) => (
            <div key={tone} className="flex flex-col items-center gap-3">
              <div className="h-px w-full bg-sky-200" />
              <ChargerColumn accent={tone} />
              <div className="h-6 w-12 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SolutionVisual({
  variant,
  locale,
}: {
  variant: "home" | "commercial" | "public";
  locale: string;
}) {
  if (variant === "home") return <HomeVisual locale={locale} />;
  if (variant === "commercial") return <CommercialVisual locale={locale} />;
  return <PublicVisual locale={locale} />;
}
