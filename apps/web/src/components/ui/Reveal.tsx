"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/lib/utils";

/** Becomes true once the referenced element scrolls into view. */
export function useInView<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, shown];
}

const variants = {
  up: ["translate-y-6 opacity-0", "translate-y-0 opacity-100"],
  fade: ["opacity-0", "opacity-100"],
  scale: ["scale-90 opacity-0", "scale-100 opacity-100"],
  "line-x": ["origin-left scale-x-0", "origin-left scale-x-100"],
  "line-y": ["origin-top scale-y-0", "origin-top scale-y-100"],
} as const;

type RevealProps = {
  as?: ElementType;
  variant?: keyof typeof variants;
  /** Delay in milliseconds, useful for staggering siblings. */
  delay?: number;
  /** Duration in milliseconds. */
  duration?: number;
  className?: string;
  children?: ReactNode;
};

/**
 * Fades/slides content in once it scrolls into view.
 * Reduced-motion users get the final state immediately (see globals.css).
 */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration = 800,
  className,
  children,
}: RevealProps) {
  const [ref, shown] = useInView<HTMLElement>();
  const [hidden, visible] = variants[variant];

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn("transition ease-out", shown ? visible : hidden, className)}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

type DrawPathProps = {
  d: string;
  className?: string;
  strokeWidth?: number;
  /** Render as a dashed line (drawn left to right via a mask-free reveal). */
  dashed?: boolean;
  delay?: number;
  duration?: number;
};

/** An SVG path that draws itself when scrolled into view. */
export function DrawPath({
  d,
  className,
  strokeWidth = 2,
  dashed = false,
  delay = 0,
  duration = 1800,
}: DrawPathProps) {
  const [ref, shown] = useInView<SVGPathElement>();

  return (
    <>
      {dashed && (
        <path
          d={d}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray="2 7"
          strokeLinecap="round"
          className={cn("opacity-40", className)}
        />
      )}
      <path
        ref={ref}
        data-reveal=""
        d={d}
        fill="none"
        pathLength={1}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={shown ? 0 : 1}
        className={cn("transition-[stroke-dashoffset] ease-out", className)}
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
        }}
      />
    </>
  );
}
