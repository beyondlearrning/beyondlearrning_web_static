import Image from "next/image";
import { ArchitectureSketch } from "@/components/sections/home/ArchitectureSketch";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { DrawPath, Reveal } from "@/components/ui/Reveal";
import {
  approachIntro,
  approachStages,
  getApproachPhoto,
} from "@/content/approach";
import { cn } from "@/lib/utils";

/**
 * Per-stage art direction. The four stages read 01 → 02 → 03 → 04 on every
 * breakpoint, but on wide desktops they alternate (text first / photo first)
 * and sit at different heights along the journey line.
 *
 * Class strings are written out in full so Tailwind can detect them.
 */
const layouts = [
  {
    // 01: text left, photograph right
    arch: "left",
    li: "",
    columns: "xl:grid-cols-[1.25fr_1fr]",
    icon: "xl:top-[22px]",
    textOrder: "",
    text: "xl:mt-[4.5rem]",
    photoOrder: "xl:order-1",
    photo: "xl:mt-[4.75rem]",
    aspect: "xl:aspect-[1/2]",
  },
  {
    // 02: photograph first, text adjacent
    arch: "right",
    li: "md:mt-12 xl:mt-0",
    columns: "xl:grid-cols-[1fr_1.25fr]",
    icon: "xl:top-[46px]",
    textOrder: "",
    text: "xl:mt-[8.25rem]",
    photoOrder: "",
    photo: "xl:mt-[6.4rem]",
    aspect: "xl:aspect-[1/2.15]",
  },
  {
    // 03: text left, shorter photograph, text dropped lower
    arch: "left",
    li: "",
    columns: "xl:grid-cols-[1.25fr_1fr]",
    icon: "xl:top-[12px]",
    textOrder: "",
    text: "xl:mt-[9rem]",
    photoOrder: "xl:order-1",
    photo: "xl:mt-[4.25rem]",
    aspect: "xl:aspect-[1/1.9]",
  },
  {
    // 04: text, then the closing photograph
    arch: "right",
    li: "md:mt-12 xl:mt-0",
    columns: "xl:grid-cols-[1.25fr_1fr]",
    icon: "xl:top-[36px]",
    textOrder: "",
    text: "xl:mt-[5.5rem]",
    photoOrder: "xl:order-1",
    photo: "xl:mt-[5.75rem]",
    aspect: "xl:aspect-[1/2.05]",
  },
] as const;

/**
 * Journey path for wide desktops, drawn in a 1000 × 128 box that stretches
 * across the four stages. It passes through each stage icon (x = 25, 275,
 * 525, 775) and eases between them with horizontal tangents, so it rises and
 * falls gently. Nodes sit at the midpoint of each rise or fall.
 */
const journeyPath =
  "M0 56C12.5 56 12.5 44 25 44C150 44 150 68 275 68C400 68 400 34 525 34C650 34 650 58 775 58C887.5 58 887.5 40 1000 40";

const journeyNodes = [
  { x: 15, y: 56 },
  { x: 40, y: 51 },
  { x: 65, y: 46 },
  { x: 88.75, y: 49 },
] as const;

const accentText = "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";

export function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative overflow-x-clip py-16 lg:py-[5.5rem]"
    >
      {/* Faint line artwork on the outer edges (desktop only) */}
      <ArchitectureSketch className="pointer-events-none absolute top-6 left-0 hidden w-60 -translate-x-[42%] opacity-30 xl:block" />
      <BotanicalSprig className="pointer-events-none absolute top-0 right-0 hidden w-40 translate-x-[12%] -rotate-12 opacity-30 xl:block" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-56 hidden size-[34rem] rounded-full border border-accent/20 xl:block"
      />

      <div className="relative mx-auto w-full max-w-[88rem] px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center text-brand">Our Approach</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="mt-5">
            <h2
              id="approach-heading"
              className="font-display text-[2.15rem] leading-[1.08] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[3.4rem]"
            >
              {approachIntro.heading.first}{" "}
              <span className={cn("block", accentText)}>
                {approachIntro.heading.second}
              </span>
            </h2>
          </Reveal>
          <Reveal
            as="p"
            delay={200}
            className="mx-auto mt-6 max-w-[34rem] text-[0.95rem] leading-relaxed text-[#4a4640]"
          >
            {approachIntro.description}
          </Reveal>
        </div>

        <ol className="relative mt-12 grid gap-y-14 md:grid-cols-2 md:gap-x-14 lg:mt-14 xl:mt-10 xl:grid-cols-4 xl:gap-0">
          {/* Journey line: vertical on mobile and tablet, a flowing curve on wide desktops */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-5 left-5 h-[calc(100%-1.25rem)] w-px overflow-visible fill-none stroke-accent/50 [mask-image:linear-gradient(to_bottom,#000_calc(100%-14rem),transparent)] md:top-[3.875rem] md:left-1/2 md:h-[calc(100%-3.875rem)] xl:hidden"
          >
            <DrawPath d="M0.5 0V100" strokeWidth={1} delay={200} duration={2200} />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 128"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 w-full overflow-visible fill-none stroke-accent/60 xl:block"
          >
            <DrawPath d={journeyPath} strokeWidth={1.25} delay={300} duration={2400} />
          </svg>
          {journeyNodes.map((node, index) => (
            <span
              key={node.x}
              aria-hidden="true"
              className="pointer-events-none absolute hidden xl:block"
              style={{ left: `${node.x}%`, top: node.y }}
            >
              <Reveal
                variant="scale"
                duration={900}
                delay={900 + index * 350}
                className="block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
              />
            </span>
          ))}

          {approachStages.map((stage, index) => {
            const layout = layouts[index];
            const src = getApproachPhoto(stage);
            const isLeftArch = layout.arch === "left";
            const fileLabel = `${stage.photo.fileName}.webp`;

            return (
              <li
                key={stage.photo.fileName}
                className={cn(
                  "relative flex flex-col gap-6 pl-16 md:pl-0 xl:grid xl:gap-x-4 xl:gap-y-0 xl:px-3",
                  layout.columns,
                  layout.li,
                )}
              >
                {/* Thin-line icon, sitting on the journey line */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 z-10 md:top-10 xl:right-auto xl:left-[10%] xl:-translate-x-1/2",
                    isLeftArch
                      ? "md:right-[-3.375rem] md:left-auto"
                      : "md:-left-[3.375rem]",
                    layout.icon,
                  )}
                >
                  <Reveal
                    variant="fade"
                    duration={1000}
                    delay={400 + index * 250}
                    className="flex size-10 items-center justify-center rounded-full border border-accent/60 bg-background text-brand md:size-11"
                  >
                    <Icon name={stage.icon} className="size-[1.15rem] md:size-5" strokeWidth={1.25} />
                  </Reveal>
                </div>

                {/* Number, title and copy */}
                <Reveal
                  delay={150}
                  className={cn("md:pr-2 xl:pr-0", layout.textOrder, layout.text)}
                >
                  <p
                    aria-hidden="true"
                    className="font-display text-[3.75rem] leading-none font-light text-accent xl:text-[3.4rem] 2xl:text-[4rem]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span aria-hidden="true" className="mt-4 block h-px w-8 bg-accent" />
                  <h3 className="mt-5 font-display text-[1.7rem] leading-[1.15] font-medium text-brand xl:text-[1.3rem] 2xl:text-[1.6rem]">
                    {stage.title.first}{" "}
                    <span className="block">{stage.title.rest}</span>
                  </h3>
                  <p className="mt-4 max-w-[22rem] text-[0.9rem] leading-relaxed text-[#4a4640] xl:text-[0.8rem] 2xl:text-[0.88rem]">
                    {stage.description}
                  </p>
                </Reveal>

                {/* Arched photograph (or a named placeholder) */}
                <Reveal
                  variant="fade"
                  duration={1400}
                  delay={250}
                  className={cn("relative md:-order-1 xl:self-start", layout.photoOrder, layout.photo)}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 translate-y-2 border border-accent/40 [--arch:5.5rem] md:[--arch:11rem] xl:[--arch:7rem] 2xl:[--arch:8.5rem]",
                      isLeftArch
                        ? "translate-x-1.5 rounded-tl-(--arch) rounded-tr-sm rounded-b-sm"
                        : "-translate-x-1.5 rounded-tr-(--arch) rounded-tl-sm rounded-b-sm",
                    )}
                  />
                  <div
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden md:aspect-[5/6] bg-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-background))] [--arch:5.5rem] md:[--arch:11rem] xl:[--arch:7rem] 2xl:[--arch:8.5rem]",
                      isLeftArch
                        ? "rounded-tl-(--arch) rounded-tr-sm rounded-b-sm"
                        : "rounded-tr-(--arch) rounded-tl-sm rounded-b-sm",
                      layout.aspect,
                    )}
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={stage.photo.alt}
                        fill
                        sizes="(min-width: 1280px) 12vw, (min-width: 768px) 40vw, 70vw"
                        className="object-cover"
                        style={{ objectPosition: stage.photo.objectPosition }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex flex-col items-center justify-end gap-2 px-3 pb-6 text-center text-brand/60"
                      >
                        <span className="h-px w-6 bg-accent" />
                        <span className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase">
                          Photography
                        </span>
                        <span className="text-[0.6rem] leading-snug tracking-[0.04em] [overflow-wrap:anywhere]">
                          Add public/{stage.photo.directory}/{fileLabel}
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
