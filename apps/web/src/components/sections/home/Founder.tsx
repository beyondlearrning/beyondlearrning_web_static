import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import {
  founder,
  founderNote,
  founderPortraitSlot,
  getFounderPortrait,
} from "@/content/founder";
import { cn } from "@/lib/utils";

const BRAND_IN_NOTE = "BEYOND LEARRNING";
const accentText =
  "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";
const sand =
  "bg-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-background))]";

/** Sets the client's brand name, as written in the note, in a slightly heavier style. */
function NoteText({ text }: { text: string }) {
  const parts = text.split(BRAND_IN_NOTE);
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="font-semibold tracking-[0.03em] text-brand">
              {BRAND_IN_NOTE}
            </span>
          )}
        </span>
      ))}
    </>
  );
}

export function Founder() {
  const portrait = getFounderPortrait();
  const archClasses =
    "rounded-tl-(--arch) rounded-tr-sm rounded-b-sm [--arch:8rem] sm:[--arch:10rem] lg:[--arch:11rem]";

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="relative overflow-x-clip py-20 lg:py-28"
    >
      <BotanicalSprig className="pointer-events-none absolute top-16 right-0 hidden w-28 translate-x-[30%] -rotate-12 opacity-30 xl:block" />

      <Container className="relative">
        {/* Portrait with name, title and the founder's statement */}
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Reveal variant="fade" duration={1200} className="relative mx-auto w-full max-w-[18rem] sm:max-w-[21rem] lg:mx-0 lg:w-[22rem] lg:max-w-none">
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
                  sizes="(min-width: 1024px) 22rem, 21rem"
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
                    <br />
                    {founderPortraitSlot.aspectRatio} ·{" "}
                    {founderPortraitSlot.recommendedSize} px
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow className="text-brand">Meet Our Founder</Eyebrow>
            </Reveal>
            <Reveal delay={100} className="mt-6">
              <h2
                id="founder-heading"
                className="font-display text-[2.6rem] leading-[1.05] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[3.6rem]"
              >
                {founder.name}
              </h2>
              <p className="mt-4 flex items-center gap-4 text-[0.72rem] font-semibold tracking-[0.28em] uppercase">
                <span className={accentText}>{founder.title}</span>
                <span aria-hidden="true" className="h-px w-12 bg-accent/60" />
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-9 max-w-[30rem]">
              <p
                aria-hidden="true"
                className="font-display text-[4rem] leading-[0.6] text-accent"
              >
                “
              </p>
              <p className="mt-3 font-display text-[1.9rem] leading-[1.2] text-brand sm:text-[2.2rem] lg:text-[2.4rem]">
                {founder.statement}
              </p>
            </Reveal>
          </div>
        </div>

        {/* The Founder's Note: one comfortable reading column */}
        <div id="founder-note" className="mx-auto mt-16 max-w-[40rem] scroll-mt-28 lg:mt-24">
          <Reveal>
            <h3 className="flex items-center gap-4 text-[0.72rem] font-semibold tracking-[0.3em] text-[#4a4640] uppercase">
              A note from our founder
              <span aria-hidden="true" className="h-px flex-1 bg-accent/40" />
            </h3>
          </Reveal>

          <div className="mt-8">
            {founderNote.map((block, index) => {
              if (block.type === "quote") {
                return (
                  <Reveal
                    as="blockquote"
                    key={index}
                    className="my-10 border-l-2 border-accent py-1 pl-6 font-display text-[1.4rem] leading-[1.4] text-brand sm:text-[1.65rem] lg:-ml-8 lg:pl-8"
                  >
                    {block.text}
                  </Reveal>
                );
              }

              if (block.type === "closing") {
                return (
                  <Reveal key={index} className="mt-14 text-center">
                    <span aria-hidden="true" className="mx-auto block h-px w-12 bg-accent" />
                    <p className="mt-8 font-display text-[1.5rem] leading-[1.4] text-brand sm:text-[1.85rem]">
                      {block.text}
                    </p>
                    <p className="mt-10 font-display text-xl text-brand">
                      {founder.name}
                    </p>
                    <p className={cn("mt-1 text-[0.7rem] font-semibold tracking-[0.28em] uppercase", accentText)}>
                      {founder.title}
                    </p>
                  </Reveal>
                );
              }

              return (
                <Reveal
                  as="p"
                  key={index}
                  className={cn(
                    "mt-6 text-[1.02rem] leading-[1.85] text-[#3f3b36] sm:text-[1.0625rem]",
                    index === 0 &&
                      "mt-0 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.4rem] first-letter:leading-[0.78] first-letter:text-brand",
                  )}
                >
                  <NoteText text={block.text} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
