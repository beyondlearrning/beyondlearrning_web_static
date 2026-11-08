import {
  CourseExplorer,
  type ExplorerCourse,
} from "@/components/sections/home/CourseExplorer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { courseHref } from "@/config/navigation";
import { courses } from "@/content/courses";
import { getCourseVisual } from "@/content/courses-visuals";

/**
 * /courses discovery page: editorial explorer with full approved descriptions.
 * Each course CTA leads to its detail route.
 */
export function CoursesIndex() {
  const explorerCourses: ExplorerCourse[] = courses.map((course) => ({
    slug: course.slug,
    name: course.name,
    fullName: course.fullName,
    description: course.description,
    href: courseHref(course.slug),
    ctaLabel: `Explore ${course.name}`,
    visual: getCourseVisual(course),
  }));

  return (
    <section className="relative overflow-x-clip bg-[color-mix(in_srgb,var(--color-background)_55%,var(--color-border))] pt-16 pb-24 lg:pt-24 lg:pb-32">
      <CourseExplorer
        courses={explorerCourses}
        intro={
          <>
            <Reveal>
              <Eyebrow className="text-brand">Courses</Eyebrow>
            </Reveal>
            <Reveal
              as="h1"
              delay={100}
              className="mt-6 font-display text-[2.4rem] leading-[1.08] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[2.75rem] xl:text-[3.4rem]"
            >
              Preparation built for your path in law
              <span className="text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]">
                .
              </span>
            </Reveal>
            <Reveal
              as="p"
              delay={200}
              className="mt-6 max-w-[22rem] border-l border-accent/50 pl-5 text-sm leading-relaxed text-[#4a4640]"
            >
              Four course areas. Choose a path to read the full programme
              overview.
            </Reveal>
          </>
        }
      />
    </section>
  );
}
