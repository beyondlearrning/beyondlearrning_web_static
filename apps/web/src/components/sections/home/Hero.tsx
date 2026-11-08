import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { HeroVisual } from "@/components/sections/home/HeroVisual";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { enquiryHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const enter =
  "transition duration-700 ease-out starting:translate-y-3 starting:opacity-0 motion-reduce:transition-none";

/** Headline lines slide up from behind a clipping mask. */
const lineReveal =
  "block transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] starting:translate-y-full motion-reduce:transition-none";

const delay = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms` });

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const benefits: { icon: IconName; title: string; line: string }[] = [
  {
    icon: "mentor",
    title: "Personalised Mentorship",
    line: "Guidance shaped around your goals",
  },
  {
    icon: "book",
    title: "Structured Preparation",
    line: "A focused approach for every stage",
  },
  {
    icon: "scales",
    title: "Law-focused Education",
    line: "Built around law examinations",
  },
];

/**
 * Hero layout notes
 * - The <section> is the positioning context for the photograph on desktop,
 *   so none of the wrappers below are `relative`.
 * - DOM order is the mobile order: copy → CTAs → photograph → benefits.
 *   On desktop the photograph is lifted out of flow to the right.
 */
const taglineBreak = siteConfig.tagline.lastIndexOf(" ");
const taglineFirst = siteConfig.tagline.slice(0, taglineBreak);
const taglineSecond = siteConfig.tagline.slice(taglineBreak + 1);

export function Hero() {
  return (
    <section
      data-motion
      className="relative isolate overflow-x-clip lg:min-h-[43rem]"
    >
      <BotanicalSprig className="pointer-events-none absolute -bottom-10 -left-12 z-0 hidden w-44 origin-bottom animate-sway opacity-40 transition-opacity duration-[2000ms] [transition-delay:900ms] starting:opacity-0 motion-reduce:transition-none xl:block" />

      <Container className="pt-10 pb-14 sm:pt-14 lg:py-16">
        <div className="lg:max-w-[48%]">
          <div className="relative z-10">
            <div
              className={`${enter} [&_span]:origin-left [&_span]:transition-transform [&_span]:delay-300 [&_span]:duration-[1000ms] [&_span]:ease-out [&_span]:starting:scale-x-0`}
            >
              <Eyebrow className="text-brand">
                {siteConfig.strapline}
              </Eyebrow>
            </div>

            <h1 className="mt-7 font-display text-[3.6rem] leading-[1.02] font-medium tracking-[-0.01em] text-brand sm:text-7xl lg:text-[4.75rem] xl:text-[5.75rem]">
              <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
                <span
                  style={delay(120)}
                  className={`${lineReveal} whitespace-nowrap`}
                >
                  {taglineFirst}
                </span>
              </span>
              <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
                <span
                  style={delay(320)}
                  className={`${lineReveal} text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]`}
                >
                  {taglineSecond}
                </span>
              </span>
            </h1>

            <p
              style={delay(200)}
              className={`${enter} mt-7 max-w-[28rem] text-base leading-[1.75] text-[#4a4640] lg:text-[1.0625rem]`}
            >
              {siteConfig.message}
            </p>
            <p
              style={delay(260)}
              className={`${enter} mt-5 text-[0.7rem] font-semibold tracking-[0.3em] text-brand/70 uppercase`}
            >
              {siteConfig.signature}
            </p>

            <div
              style={delay(300)}
              className={`${enter} mt-9 flex flex-col gap-3 sm:flex-row sm:items-center`}
            >
              <Link
                href="/courses"
                className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-brand bg-brand px-7 py-4 text-xs font-medium tracking-[0.2em] whitespace-nowrap text-background uppercase transition-colors hover:bg-brand/90 ${focusRing}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-[18deg] bg-white/15 transition-transform duration-[900ms] ease-out group-hover:translate-x-[560%] motion-reduce:hidden"
                />
                <span className="relative">Explore Courses</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="relative size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href={enquiryHref}
                className={`inline-flex items-center justify-center border border-accent/80 px-7 py-4 text-xs font-medium tracking-[0.2em] whitespace-nowrap text-brand uppercase transition-colors hover:border-brand hover:bg-brand/5 ${focusRing}`}
              >
                Talk to a Mentor
              </Link>
            </div>
          </div>

          <HeroVisual />

          <ul className="relative z-10 mt-10 grid gap-6 sm:grid-cols-3 sm:gap-0 lg:mt-12">
            {benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                style={delay(480 + index * 140)}
                className={`${enter} group flex items-start gap-4 sm:block sm:border-l sm:border-accent/35 sm:px-5 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors duration-300 group-hover:border-brand group-hover:bg-brand motion-reduce:transition-none">
                  <Icon name={benefit.icon} className="size-5" strokeWidth={1.25} />
                </span>
                <div className="sm:mt-4">
                  <p className="text-sm font-semibold text-brand">
                    {benefit.title}
                  </p>
                  <p className="mt-1 text-[0.8rem] leading-snug text-[#4a4640]">
                    {benefit.line}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
