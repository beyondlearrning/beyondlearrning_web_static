import { Container } from "@/components/layout/Container";
import { BeyondTheExam } from "@/components/sections/home/BeyondTheExam";
import { Founder } from "@/components/sections/home/Founder";
import { Journey } from "@/components/sections/home/Journey";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { differentiator } from "@/content/brand";

/**
 * Full About experience: brand story, differentiator, Founder's Note and Journey.
 * Course descriptions are intentionally omitted here — they live under /courses.
 */
export function AboutPage() {
  return (
    <>
      <BeyondTheExam showCourses={false} showDifferentiator={false} />

      <section
        aria-labelledby="differentiator-heading"
        className="border-t border-border bg-background py-20 lg:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow className="text-brand">
                  {differentiator.heading}
                </Eyebrow>
              </Reveal>
              <Reveal delay={100} className="mt-6">
                <h2
                  id="differentiator-heading"
                  className="font-display text-[2rem] leading-[1.15] font-medium tracking-[-0.01em] text-brand sm:text-4xl"
                >
                  {differentiator.lead}
                </h2>
              </Reveal>
            </div>
            <Reveal
              as="p"
              delay={180}
              className="text-[1.02rem] leading-[1.85] text-[#3f3b36] lg:col-span-6 lg:col-start-7 lg:pt-10"
            >
              {differentiator.body}
            </Reveal>
          </div>
        </Container>
      </section>

      <Founder />
      <Journey />
    </>
  );
}
