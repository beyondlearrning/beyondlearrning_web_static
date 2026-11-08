import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { contact, emailHref, phoneHref } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { introduction } from "@/content/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} in Indore for law education and mentorship enquiries.`,
};

const contactLabel =
  "text-[0.68rem] font-semibold tracking-[0.28em] text-accent uppercase";
const contactLink =
  "underline decoration-accent/60 decoration-1 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-brand text-background">
      <Container className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow className="justify-center text-background/70">
              Contact
            </Eyebrow>
          </Reveal>
          <Reveal
            as="h1"
            delay={100}
            className="mt-8 font-display text-4xl leading-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {introduction.closing}
          </Reveal>
          <Reveal
            as="p"
            delay={180}
            className="mx-auto mt-6 max-w-[28rem] text-[0.95rem] leading-relaxed text-background/80"
          >
            Reach the Beyond Learrning team for course and mentorship enquiries.
          </Reveal>
        </div>

        <Reveal
          as="address"
          delay={260}
          className="mx-auto mt-16 max-w-4xl border-t border-background/15 pt-12 not-italic"
        >
          <p className="text-center text-xs font-semibold tracking-[0.3em] text-background/70 uppercase">
            {contact.brand}
          </p>
          <div className="mt-10 grid gap-10 text-sm leading-relaxed text-background/85 sm:grid-cols-3">
            <div>
              <p className={contactLabel}>Office</p>
              <p className="mt-3">
                {contact.office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className={contactLabel}>Email</p>
              <p className="mt-3 break-words">
                <a href={emailHref} className={contactLink}>
                  {contact.email}
                </a>
              </p>
            </div>
            <div>
              <p className={contactLabel}>Phone</p>
              <p className="mt-3">
                <a href={phoneHref} className={contactLink}>
                  {contact.phone}
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={340} className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={emailHref}
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-background px-6 py-3 text-sm font-medium tracking-wide text-brand transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Email us
            <Icon
              name="arrow"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
          <ButtonLink href="/courses" variant="outline-light">
            Explore Courses
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
