import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { ArchitectureSketch } from "@/components/sections/home/ArchitectureSketch";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { enquiryHref } from "@/config/navigation";
import type { Course } from "@/content/courses";
import { courses } from "@/content/courses";
import { getCourseVisual } from "@/content/courses-visuals";

const coverageIcons: IconName[] = ["book", "globe", "scales", "branch", "calc"];

type CourseDetailProps = {
  course: Course;
};

/**
 * Individual course page. Shows only approved copy (and coverage when supplied).
 * Does not invent syllabus, fees, dates or outcomes.
 */
export function CourseDetail({ course }: CourseDetailProps) {
  const index = courses.findIndex((item) => item.slug === course.slug);
  const number = String(index + 1).padStart(2, "0");
  const visual = getCourseVisual(course);
  const coverage = course.coverage ?? [];

  return (
    <article className="relative overflow-x-clip">
      <ArchitectureSketch className="pointer-events-none absolute right-0 bottom-24 hidden w-72 translate-x-[38%] opacity-30 xl:block" />

      <Container className="relative py-16 lg:py-24">
        <Reveal>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.22em] text-brand/70 uppercase transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Icon name="arrow" className="size-3.5 rotate-180" strokeWidth={1.5} />
            All courses
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow className="text-brand">Course</Eyebrow>
            </Reveal>
            <Reveal delay={80} className="mt-6">
              <p className="font-display text-4xl leading-none font-light text-accent">
                {number}
              </p>
              <h1 className="mt-4 font-display text-[2.8rem] leading-[1.05] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[3.4rem]">
                {course.name}
              </h1>
              <p className="mt-4 text-[0.7rem] font-semibold tracking-[0.22em] text-[#4a4640] uppercase">
                {course.fullName}
              </p>
            </Reveal>
            <Reveal
              as="p"
              delay={160}
              className="mt-8 max-w-[36rem] text-[1.02rem] leading-[1.85] text-[#3f3b36]"
            >
              {course.description}
            </Reveal>
            <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={enquiryHref} className="group">
                Enquire about {course.name}
                <Icon
                  name="arrow"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </ButtonLink>
              <ButtonLink href="/courses" variant="outline">
                View all courses
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal
            delay={120}
            className="relative aspect-[4/5] overflow-hidden bg-brand sm:aspect-[4/3] lg:col-span-6 lg:aspect-auto lg:min-h-[28rem]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-accent/70"
            />
            {visual && (
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover [object-position:var(--pos-mobile)] lg:[object-position:var(--pos-desktop)]"
                style={
                  {
                    "--pos-mobile": visual.objectPosition.mobile,
                    "--pos-desktop": visual.objectPosition.desktop,
                  } as CSSProperties
                }
              />
            )}
          </Reveal>
        </div>

        {coverage.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.3em] text-[#4a4640] uppercase">
              What {course.name} covers
            </h2>
            <ol className="mt-5 border-t border-accent/30">
              {coverage.map((area, areaIndex) => (
                <Reveal
                  as="li"
                  key={area.title}
                  delay={200 + areaIndex * 80}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-accent/30 py-[1.15rem] sm:gap-5"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent/50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-accent sm:size-14">
                    <Icon
                      name={coverageIcons[areaIndex] ?? "book"}
                      className="size-5 sm:size-6"
                      strokeWidth={1.25}
                    />
                  </span>
                  <div>
                    <p className="font-display text-[1.1rem] leading-snug text-brand sm:text-[1.2rem]">
                      {area.title}
                    </p>
                    <p className="mt-1 max-w-[24rem] text-[0.8rem] leading-snug text-[#4a4640]">
                      {area.description}
                    </p>
                  </div>
                  <span className="font-display text-lg text-accent">
                    {String(areaIndex + 1).padStart(2, "0")}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </article>
  );
}
