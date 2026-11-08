"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { courseNav, enquiryHref, mainNav } from "@/config/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setCoursesOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-10 items-center justify-center text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background"
        >
          <Container className="py-6">
            <nav aria-label="Main">
              <ul className="flex flex-col">
                {mainNav.map((item) => {
                  if (item.href === "/courses") {
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          aria-expanded={coursesOpen}
                          onClick={() => setCoursesOpen((value) => !value)}
                          className="flex w-full items-center justify-between border-b border-border/70 py-4 font-display text-xl text-brand"
                        >
                          {item.label}
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 12 12"
                            className={`size-3.5 transition-transform ${coursesOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M2 4l4 4 4-4" />
                          </svg>
                        </button>
                        {coursesOpen && (
                          <ul className="border-b border-border/70 pb-3">
                            <li>
                              <Link
                                href="/courses"
                                onClick={close}
                                className="block py-2.5 pl-4 text-sm text-brand/80"
                              >
                                All courses
                              </Link>
                            </li>
                            {courseNav.map((course) => (
                              <li key={course.href}>
                                <Link
                                  href={course.href}
                                  onClick={close}
                                  className="block py-2.5 pl-4 text-sm text-brand/80"
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
                        onClick={close}
                        className="block border-b border-border/70 py-4 font-display text-xl text-brand"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <ButtonLink href={enquiryHref} onClick={close} className="mt-6 w-full">
              Enquire Now
            </ButtonLink>
          </Container>
        </div>
      )}
    </div>
  );
}
