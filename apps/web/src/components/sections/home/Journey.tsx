import Image from "next/image";
import type { CSSProperties } from "react";
import { ArchitectureSketch } from "@/components/sections/home/ArchitectureSketch";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { DrawPath, Reveal } from "@/components/ui/Reveal";
import {
  getJourneyScene,
  journeyIntro,
  journeySceneSlot,
  journeyStages,
} from "@/content/journey";
import { cn } from "@/lib/utils";

const accentText =
  "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";

/**
 * Desktop timeline. The path is drawn in a 1000 × 100 box that is stretched
 * from the first stage (x = 0) to the books on the right (x = 1000). It passes
 * through the three stage nodes (x = 0, 364, 710) and one midpoint node
 * (x = 528), rising to a gentle crest before the final stage.
 */
const journeyPath =
  "M0 45C70 45 150 90 240 90C300 90 320 45 364 45C420 45 470 54 528 54C590 54 610 6 663 6C685 6 692 26 710 26C800 36 900 66 1000 75";

const nodes = [
  { x: 0, y: 45 },
  { x: 364, y: 45 },
  { x: 528, y: 54 },
  { x: 710, y: 26 },
] as const;

/** Stage centres (percent of the timeline box) and vertical offsets, per mock-up. */
const stagePlacement = [
  { left: "9.7%", top: "lg:top-[1.55rem]" },
  { left: "48%", top: "lg:top-[1.55rem]" },
  { left: "84.7%", top: "lg:top-[0.25rem]" },
] as const;

function Star({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={className}
    >
      <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11 6.4-.6 10.4-4.6 11-11z" />
    </svg>
  );
}

export function Journey() {
  const scene = getJourneyScene();

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative isolate overflow-clip pt-16 pb-72 lg:pt-20 lg:pb-[15rem]"
    >
      {/* Scene photograph: bottom band on mobile, anchored to the bottom on desktop */}
      <div
        aria-hidden={scene ? undefined : "true"}
        className="absolute inset-x-0 bottom-0 -z-10 h-80 [mask-image:linear-gradient(to_bottom,transparent,#000_30%)] lg:mx-auto lg:aspect-[4/3] lg:h-auto lg:max-w-[90rem] lg:[mask-image:linear-gradient(to_bottom,transparent,#000_16%)] min-[1441px]:[mask-composite:intersect]! min-[1441px]:[mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent),linear-gradient(to_bottom,transparent,#000_16%)]! min-[1441px]:[-webkit-mask-composite:source-in]!"
      >
        {scene ? (
          <Image
            src={scene.src}
            alt={scene.alt}
            fill
            sizes="100vw"
            className="object-cover [object-position:var(--journey-pos-mobile)] lg:[object-position:var(--journey-pos-desktop)]"
            style={
              {
                "--journey-pos-mobile": scene.objectPosition.mobile,
                "--journey-pos-desktop": scene.objectPosition.desktop,
              } as CSSProperties
            }
          />
        ) : (
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-background))]">
            <p className="absolute right-6 bottom-5 max-w-[18rem] text-right text-[0.65rem] leading-relaxed tracking-[0.08em] text-brand/55">
              Journey photography placeholder
              <br />
              Add public/{journeySceneSlot.directory}/{journeySceneSlot.fileName}
              .webp
              <br />
              {journeySceneSlot.aspectRatio} · {journeySceneSlot.recommendedSize}{" "}
              px
            </p>
          </div>
        )}
      </div>

      {/* Faint line artwork: arches, civic building, star and botanical (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="absolute -top-8 right-[17%] h-[26rem] w-56 rounded-t-full border border-b-0 border-accent/25" />
        <span className="absolute -top-8 right-[11%] h-[30rem] w-72 rounded-t-full border border-b-0 border-accent/15" />
        <Star className="absolute top-14 right-[16%] size-8 text-accent/70" />
        <ArchitectureSketch className="absolute top-[7rem] right-[11%] w-64 opacity-25 xl:w-72" />
        <BotanicalSprig className="absolute top-[8rem] right-[6%] hidden w-24 opacity-20 xl:block" />
      </div>

      <div className="relative mx-auto w-full max-w-[84rem] px-6 lg:px-10">
        <Reveal>
          <Eyebrow className="text-brand">The Journey</Eyebrow>
        </Reveal>
        <Reveal delay={100} className="mt-6">
          <h2
            id="journey-heading"
            className="font-display text-[2.2rem] leading-[1.1] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[2.25rem] xl:text-[3.1rem]"
          >
            <span className="block">{journeyIntro.headingFirst}</span>
            <span className="block lg:whitespace-nowrap">
              <span className={accentText}>{journeyIntro.headingAccent}</span>
              {journeyIntro.headingRest}
            </span>
          </h2>
        </Reveal>
        <Reveal
          as="p"
          delay={200}
          className="mt-5 max-w-[30rem] text-[0.95rem] leading-relaxed text-[#4a4640] xl:text-base"
        >
          {journeyIntro.description}
        </Reveal>

        <div className="relative mt-12 lg:mt-10 lg:h-[19rem] lg:w-[68%]">
          {/* Mobile: vertical gold line through the stage icons */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-6 left-6 h-[calc(100%-3rem)] w-px overflow-visible fill-none stroke-accent/50 lg:hidden"
          >
            <DrawPath d="M0.5 0V100" strokeWidth={1} delay={200} duration={2000} />
          </svg>

          {/* Desktop: flowing path with nodes */}
          <div className="pointer-events-none absolute top-12 left-[9.7%] hidden h-28 w-[106.3%] lg:block">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full overflow-visible fill-none stroke-accent/70"
            >
              <DrawPath d={journeyPath} strokeWidth={1.1} delay={300} duration={2600} />
            </svg>
            {nodes.map((node, index) => (
              <span
                key={node.x}
                aria-hidden="true"
                className="absolute"
                style={{ left: `${node.x / 10}%`, top: `${node.y}%` }}
              >
                <Reveal
                  variant="scale"
                  duration={900}
                  delay={700 + index * 450}
                  className="block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                />
              </span>
            ))}
          </div>

          <ol className="space-y-12 lg:space-y-0">
            {journeyStages.map((stage, index) => (
              <li
                key={stage.title}
                className={cn(
                  "relative lg:absolute lg:left-(--stage-left) lg:w-44 lg:-translate-x-1/2",
                  stagePlacement[index].top,
                )}
                style={{ "--stage-left": stagePlacement[index].left } as CSSProperties}
              >
                <Reveal
                  delay={150 + index * 250}
                  className="grid grid-cols-[3rem_1fr] gap-x-5 lg:block lg:text-center"
                >
                  <p
                    aria-hidden="true"
                    className="col-start-2 row-start-1 font-display text-[3.5rem] leading-[0.9] font-light text-accent/50 lining-nums lg:text-[5rem] lg:leading-[0.8] lg:text-accent/45"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span
                    aria-hidden="true"
                    className="relative z-10 col-start-1 row-start-1 flex size-12 items-center justify-center rounded-full border border-accent/70 bg-background text-brand lg:mx-auto lg:mt-[1.2rem] lg:size-[3.5rem] xl:size-[4.25rem]"
                  >
                    <Icon
                      name={stage.icon}
                      className="size-5 xl:size-7"
                      strokeWidth={1.25}
                    />
                  </span>
                  <h3 className="col-start-2 row-start-2 mt-3 font-display text-[1.6rem] leading-tight text-brand lg:mt-5 lg:text-[1.45rem] xl:text-[1.7rem]">
                    {stage.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="col-start-2 row-start-3 mt-3 block h-px w-8 bg-accent lg:mx-auto"
                  />
                  <p className="col-start-2 row-start-4 mt-3 max-w-[12rem] text-[0.88rem] leading-snug text-[#4a4640] lg:mx-auto lg:max-w-[11rem] lg:text-[0.82rem] xl:text-[0.9rem]">
                    {stage.caption}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
