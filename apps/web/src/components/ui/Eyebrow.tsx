import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}
