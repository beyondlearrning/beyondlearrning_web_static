"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { HeaderFrame } from "@/components/layout/HeaderFrame";
import { MobileNav } from "@/components/layout/MobileNav";
import { courseNav, enquiryHref, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function SiteHeader() {
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <HeaderFrame>
      <Container className="grid h-20 grid-cols-[auto_1fr] items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className={`block w-fit ${focusRing}`}
        >
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.name}
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            preload
            sizes="150px"
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {mainNav.map((item) => {
              if (item.href === "/courses") {
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setCoursesOpen(true)}
                    onMouseLeave={() => setCoursesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={coursesOpen}
                      aria-haspopup="true"
                      onClick={() => setCoursesOpen((open) => !open)}
                      onBlur={(event) => {
                        if (
                          !event.currentTarget.parentElement?.contains(
                            event.relatedTarget as Node,
                          )
                        ) {
                          setCoursesOpen(false);
                        }
                      }}
                      className={cn(
                        "group relative inline-flex items-center gap-1.5 py-2 text-sm whitespace-nowrap text-brand/75 transition-colors hover:text-brand",
                        focusRing,
                      )}
                    >
                      {item.label}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 12 12"
                        className={cn(
                          "size-3 transition-transform duration-300 motion-reduce:transition-none",
                          coursesOpen && "rotate-180",
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M2 4l4 4 4-4" />
                      </svg>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                      />
                    </button>
                    {coursesOpen && (
                      <ul
                        role="menu"
                        className="absolute top-full left-0 z-20 min-w-[14rem] border border-border bg-background py-2 shadow-[0_12px_40px_-20px_rgba(30,58,43,0.35)]"
                      >
                        <li role="none">
                          <Link
                            role="menuitem"
                            href="/courses"
                            className="block px-4 py-2.5 text-sm text-brand/80 transition-colors hover:bg-brand/5 hover:text-brand"
                            onClick={() => setCoursesOpen(false)}
                          >
                            All courses
                          </Link>
                        </li>
                        {courseNav.map((course) => (
                          <li key={course.href} role="none">
                            <Link
                              role="menuitem"
                              href={course.href}
                              className="block px-4 py-2.5 text-sm text-brand/80 transition-colors hover:bg-brand/5 hover:text-brand"
                              onClick={() => setCoursesOpen(false)}
                            >
                              {course.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative block py-2 text-sm whitespace-nowrap text-brand/75 transition-colors hover:text-brand ${focusRing}`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            href={enquiryHref}
            className={`group hidden items-center gap-2.5 bg-brand px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.2em] whitespace-nowrap text-background uppercase transition-colors hover:bg-brand/90 md:inline-flex ${focusRing}`}
          >
            Enquire Now
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <MobileNav />
        </div>
      </Container>
    </HeaderFrame>
  );
}
