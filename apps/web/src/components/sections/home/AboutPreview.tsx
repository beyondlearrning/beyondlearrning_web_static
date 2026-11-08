import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { about, introduction } from "@/content/brand";

const statementSplit = introduction.statement.indexOf(";") + 1;
const statementLead = introduction.statement.slice(0, statementSplit);
const statementAccent = introduction.statement.slice(statementSplit).trim();

/**
 * Homepage About preview: approved statement and a short lead, with a clear
 * path to the full About page. Full paragraphs live on /about only.
 */
export function AboutPreview() {
  return (
    <section
      id="about-preview"
      data-motion
      className="relative overflow-hidden bg-brand text-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-[4%] size-96 animate-drift rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 size-72 animate-drift rounded-full bg-background/5 blur-3xl [animation-delay:-7s]"
      />
      <Container className="relative py-20 lg:py-24">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="text-background/70">{about.heading}</Eyebrow>
          </Reveal>

          <Reveal
            as="blockquote"
            delay={120}
            className="mt-10 font-display text-3xl leading-snug text-balance sm:text-4xl lg:text-[2.9rem] lg:leading-[1.2]"
          >
            {statementLead}{" "}
            <span className="text-accent">{statementAccent}</span>
          </Reveal>

          <Reveal
            as="p"
            delay={220}
            className="mt-8 max-w-[34rem] text-[0.95rem] leading-relaxed text-background/80"
          >
            {introduction.lead} {introduction.support}
          </Reveal>

          <Reveal delay={320} className="mt-10">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 border border-accent/70 px-5 py-3 text-[0.68rem] font-semibold tracking-[0.14em] text-background uppercase transition-colors hover:bg-accent hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
            >
              About Beyond Learrning
              <Icon
                name="arrow"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
