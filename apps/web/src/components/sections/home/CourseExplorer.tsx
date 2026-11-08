"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type ExplorerCourse = {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  /** Destination for the plate CTA (usually the course detail page). */
  href: string;
  ctaLabel: string;
  visual: {
    src: string;
    alt: string;
    objectPosition: { desktop: string; mobile: string };
  } | null;
};

type CourseExplorerProps = {
  courses: readonly ExplorerCourse[];
  /** Eyebrow, heading and intro line, rendered on the server. */
  intro: ReactNode;
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Courses overview: a programme directory (left) that drives one large photo
 * canvas (right). The user chooses the course; nothing auto-rotates.
 *
 * Semantics: a vertical tablist with a roving tabindex. Arrow keys, Home and
 * End move focus and select. Mouse hover also selects; touch uses tap.
 */
export function CourseExplorer({
  courses,
  intro,
}: CourseExplorerProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;

  function select(index: number, moveFocus = false) {
    setActive(index);
    if (moveFocus) tabs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = courses.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next !== null) {
      event.preventDefault();
      select(next, true);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-[84rem] gap-14 px-6 lg:grid-cols-[42fr_58fr] lg:gap-16 lg:px-10 xl:gap-24">
      {/* Left: heading and programme directory */}
      <div className="flex flex-col lg:min-h-[40rem] lg:justify-between xl:min-h-[46rem]">
        <div>{intro}</div>

        <Reveal delay={250} className="mt-10 lg:mt-12">
          <div
            role="tablist"
            aria-label="Courses"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="border-t border-accent/45"
          >
            {courses.map((course, index) => {
              const selected = index === active;
              return (
                <button
                  key={course.slug}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") select(index);
                  }}
                  className={cn(
                    "group relative grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-accent/35 px-4 py-6 text-left transition-colors duration-500 motion-reduce:transition-none sm:px-6 lg:py-7 xl:py-8",
                    "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent",
                    selected ? "bg-background/80" : "hover:bg-background/40",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-0 left-0 w-[3px] origin-top bg-accent transition-transform duration-500 motion-reduce:transition-none",
                      selected ? "scale-y-100" : "scale-y-0",
                    )}
                  />
                  <span className="font-display text-base text-accent">
                    {pad(index)}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[2.1rem] leading-none font-medium transition-colors duration-500 motion-reduce:transition-none sm:text-[2.6rem] xl:text-[3.2rem]",
                      selected
                        ? "text-brand"
                        : "text-brand/55 group-hover:text-brand",
                    )}
                  >
                    {course.name}
                  </span>
                  <Icon
                    name="arrow"
                    strokeWidth={1.25}
                    className={cn(
                      "size-6 transition-all duration-500 motion-reduce:transition-none",
                      selected
                        ? "translate-x-0 text-accent"
                        : "-translate-x-1.5 text-brand/35 group-hover:translate-x-0 group-hover:text-accent",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Right: photograph canvas with the active course's details */}
      <Reveal
        delay={200}
        className="relative lg:h-full lg:min-h-[40rem] xl:min-h-[46rem]"
      >
        <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
          {/* Offset gold frame: the one distinctive crop on this canvas */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-accent/70 lg:translate-x-5 lg:translate-y-5"
          />
          <div className="absolute inset-0 overflow-hidden bg-brand">
            {courses.map((course, index) => {
              const selected = index === active;
              if (!course.visual) return null;
              return (
                <Image
                  key={course.slug}
                  src={course.visual.src}
                  alt={course.visual.alt}
                  aria-hidden={!selected}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className={cn(
                    "object-cover [object-position:var(--visual-pos-mobile)] transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none lg:[object-position:var(--visual-pos-desktop)]",
                    selected ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                  style={
                    {
                      "--visual-pos-mobile": course.visual.objectPosition.mobile,
                      "--visual-pos-desktop": course.visual.objectPosition.desktop,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Course plate: overlaps the lower-left of the photograph */}
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          className="relative z-10 mx-4 -mt-16 grid bg-brand px-7 py-8 text-background sm:mx-8 sm:-mt-20 sm:px-9 lg:absolute lg:bottom-0 lg:left-0 lg:mx-0 lg:mt-0 lg:w-[27rem] lg:-translate-x-10 lg:translate-y-8 lg:px-9 lg:py-9"
        >
          {courses.map((course, index) => {
            const selected = index === active;
            return (
              <div
                key={course.slug}
                aria-hidden={!selected}
                inert={!selected}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,transform] duration-500 motion-reduce:transition-none",
                  selected
                    ? "translate-y-0 opacity-100 delay-150"
                    : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <p className="flex items-center gap-4 font-display text-3xl leading-none font-light text-accent">
                  {pad(index)}
                  <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
                </p>
                <h3 className="mt-4 font-display text-[2.4rem] leading-none font-medium text-background">
                  {course.name}
                </h3>
                <p className="mt-3 text-[0.66rem] font-semibold tracking-[0.2em] text-background/70 uppercase">
                  {course.fullName}
                </p>
                <p className="mt-4 max-w-[22rem] text-[0.85rem] leading-relaxed text-background/85">
                  {course.description}
                </p>
                <Link
                  href={course.href}
                  className={cn(
                    "group/cta mt-6 inline-flex items-center gap-3 border border-accent/70 px-4 py-3 text-[0.68rem] font-semibold tracking-[0.14em] max-sm:gap-2 max-sm:px-3 max-sm:tracking-[0.08em] text-background uppercase transition-colors duration-300 hover:bg-accent hover:text-brand motion-reduce:transition-none",
                    focusRing,
                  )}
                >
                  {course.ctaLabel}
                  <Icon
                    name="arrow"
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
