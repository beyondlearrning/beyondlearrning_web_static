import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { mentorshipIntro } from "@/content/mentorship";
import { cn } from "@/lib/utils";

const accentText =
  "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";

/**
 * Homepage Mentorship preview. The full Mentorship section lives on /mentorship.
 */
export function MentorshipPreview() {
  return (
    <section
      id="mentorship"
      aria-labelledby="mentorship-preview-heading"
      className="relative overflow-x-clip bg-[color-mix(in_srgb,var(--color-background)_55%,var(--color-border))] py-14 lg:py-[4.5rem]"
    >
      <Container className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow className="text-brand">Mentorship</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="mt-5">
            <h2
              id="mentorship-preview-heading"
              className="font-display text-[2.4rem] leading-[1.08] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[2.75rem] xl:text-[3.2rem]"
            >
              <span className="block">{mentorshipIntro.heading.first}</span>
              <span className="block">{mentorshipIntro.heading.second}</span>
              <span className={cn("block", accentText)}>
                {mentorshipIntro.heading.accent}.
              </span>
            </h2>
          </Reveal>
          <Reveal
            as="p"
            delay={200}
            className="mt-5 max-w-[28rem] text-[0.95rem] leading-relaxed text-[#4a4640]"
          >
            {mentorshipIntro.description}
          </Reveal>
          <Reveal delay={300} className="mt-7">
            <Link
              href="/mentorship"
              className="group inline-flex items-center gap-2 text-sm font-medium text-brand underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Explore Mentorship
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                strokeWidth={1.5}
              />
            </Link>
          </Reveal>
        </div>

        <Reveal
          delay={200}
          className="bg-brand px-8 py-8 text-background sm:px-9 lg:col-span-5 lg:col-start-8"
        >
          <p
            aria-hidden="true"
            className="font-display text-[4rem] leading-[0.7] text-accent"
          >
            “
          </p>
          <blockquote className="mt-4 font-display text-[1.3rem] leading-[1.4] xl:text-[1.5rem]">
            {mentorshipIntro.quote}
          </blockquote>
          <span aria-hidden="true" className="mt-6 block h-px w-9 bg-accent" />
        </Reveal>
      </Container>
    </section>
  );
}
