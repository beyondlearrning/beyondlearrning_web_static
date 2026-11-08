import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import {
  founder,
  founderPortraitSlot,
  getFounderPortrait,
} from "@/content/founder";
import { cn } from "@/lib/utils";

const accentText =
  "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";
const sand =
  "bg-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-background))]";

/**
 * Homepage Founder preview. The full Founder's Note lives on /about#founder-note.
 */
export function FounderPreview() {
  const portrait = getFounderPortrait();
  const archClasses =
    "rounded-tl-(--arch) rounded-tr-sm rounded-b-sm [--arch:8rem] sm:[--arch:10rem] lg:[--arch:11rem]";

  return (
    <section
      id="founder"
      aria-labelledby="founder-preview-heading"
      className="relative overflow-x-clip py-14 lg:py-[4.5rem]"
    >
      <BotanicalSprig className="pointer-events-none absolute top-16 right-0 hidden w-28 translate-x-[30%] -rotate-12 opacity-30 xl:block" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <Reveal
            variant="fade"
            duration={1200}
            className="relative mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:mx-0 lg:w-[19rem] lg:max-w-none"
          >
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-accent/40",
                archClasses,
              )}
            />
            <div
              className={cn(
                "relative aspect-[4/5] overflow-hidden",
                sand,
                archClasses,
              )}
            >
              {portrait ? (
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 19rem, 18rem"
                  className="object-cover"
                  style={{ objectPosition: portrait.objectPosition }}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex flex-col items-center justify-end gap-2 px-6 pb-10 text-center text-brand/60"
                >
                  <Icon name="person" className="size-14 text-accent/70" strokeWidth={0.8} />
                  <span className="mt-2 h-px w-6 bg-accent" />
                  <span className="text-[0.62rem] font-semibold tracking-[0.25em] uppercase">
                    Founder portrait
                  </span>
                  <span className="max-w-[15rem] text-[0.62rem] leading-snug tracking-[0.04em] [overflow-wrap:anywhere]">
                    Add public/{founderPortraitSlot.directory}/
                    {founderPortraitSlot.fileName}.webp
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow className="text-brand">Meet Our Founder</Eyebrow>
            </Reveal>
            <Reveal delay={100} className="mt-4">
              <h2
                id="founder-preview-heading"
                className="font-display text-[2.6rem] leading-[1.05] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[3.6rem]"
              >
                {founder.name}
              </h2>
              <p className="mt-4 flex items-center gap-4 text-[0.72rem] font-semibold tracking-[0.28em] uppercase">
                <span className={accentText}>{founder.title}</span>
                <span aria-hidden="true" className="h-px w-12 bg-accent/60" />
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-7 max-w-[28rem]">
              <p
                aria-hidden="true"
                className="font-display text-[3.25rem] leading-[0.6] text-accent"
              >
                “
              </p>
              <p className="mt-2 font-display text-[1.7rem] leading-[1.2] text-brand sm:text-[1.95rem] lg:text-[2.1rem]">
                {founder.statement}
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-7">
              <Link
                href="/about#founder-note"
                className="group inline-flex items-center gap-2 text-sm font-medium text-brand underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Read Founder&apos;s Note
                <Icon
                  name="arrow"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
