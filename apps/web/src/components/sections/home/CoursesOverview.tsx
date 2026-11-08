import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { courseHref } from "@/config/navigation";
import { courses } from "@/content/courses";
import { cn } from "@/lib/utils";

const accentText =
  "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";

/**
 * Homepage courses overview: four concise rows with approved summaries only.
 * Full descriptions live on /courses and each /courses/[slug] page.
 */
export function CoursesOverview() {
  return (
    <section
      id="courses"
      aria-labelledby="courses-overview-heading"
      className="relative overflow-x-clip py-16 lg:py-20"
    >
      <BotanicalSprig className="pointer-events-none absolute -top-2 -right-10 hidden w-44 rotate-[200deg] opacity-30 xl:block" />

      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
          <div>
            <Reveal>
              <Eyebrow className="text-brand">Courses</Eyebrow>
            </Reveal>
            <Reveal delay={100} className="mt-5">
              <h2
                id="courses-overview-heading"
                className="font-display text-[2.4rem] leading-[1.08] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[2.75rem] xl:text-[3.4rem]"
              >
                Preparation built for your path in law
                <span className={accentText}>.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal
            as="p"
            delay={200}
            className="max-w-[16rem] text-sm leading-relaxed text-[#4a4640] lg:border-l lg:border-accent/40 lg:pb-1 lg:pl-6"
          >
            Four course areas, guided by one mentorship-led approach.
          </Reveal>
        </div>

        <ol
          aria-label="Courses"
          className="mt-10 border-t border-accent/40"
        >
          {courses.map((course, index) => (
            <Reveal
              as="li"
              key={course.slug}
              delay={150 + index * 90}
              className="group border-b border-accent/30"
            >
              <Link
                href={courseHref(course.slug)}
                className="grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-4 py-5 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent sm:gap-6 lg:py-6"
              >
                <span className="font-display text-base text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.8rem] leading-none font-medium text-brand sm:text-[2.1rem]">
                    {course.name}
                  </h3>
                  <p className="mt-1.5 text-[0.64rem] font-semibold tracking-[0.2em] text-[#4a4640] uppercase">
                    {course.fullName}
                  </p>
                  <p className="mt-2 max-w-[32rem] text-[0.88rem] leading-snug text-[#4a4640]">
                    {course.summary}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 self-center text-sm font-medium text-brand",
                    accentText,
                  )}
                >
                  Explore
                  <Icon
                    name="arrow"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={500} className="mt-8">
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View all courses
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              strokeWidth={1.5}
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
