"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const THRESHOLD = 8;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getSnapshot = () => window.scrollY > THRESHOLD;
const getServerSnapshot = () => false;

/**
 * Sticky header shell. The ivory background is constant; a hairline border
 * appears only once the page has scrolled, so the header reads as part of the
 * hero at the top of the page.
 */
export function HeaderFrame({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background transition-colors duration-300",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      {children}
    </header>
  );
}
