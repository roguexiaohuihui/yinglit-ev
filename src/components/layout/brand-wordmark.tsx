import { cn } from "@/lib/utils";

export function BrandWordmark({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-heading text-base font-bold uppercase tracking-[0.18em] sm:text-lg sm:tracking-[0.22em]",
          inverted ? "text-white" : "text-navy"
        )}
      >
        YINGLITECH
      </span>
      <span
        className={cn(
          "mt-1 text-[10px] font-medium uppercase tracking-[0.32em]",
          inverted ? "text-electric/80" : "text-primary/70"
        )}
      >
        EV Charging
      </span>
    </div>
  );
}
