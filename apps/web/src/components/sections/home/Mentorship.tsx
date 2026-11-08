import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BotanicalSprig } from "@/components/sections/home/BotanicalSprig";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { enquiryHref } from "@/config/navigation";
import {
  focusAreas,
  getFocusAreaPhoto,
  getMentorPhoto,
  getMentorshipScene,
  mentorProfiles,
  mentorshipIntro,
  mentorshipJourney,
  mentorshipSceneSlot,
} from "@/content/mentorship";
import { cn } from "@/lib/utils";

const accentText =
  "text-[color-mix(in_srgb,var(--color-accent)_80%,var(--color-brand))]";
const sand = "bg-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-background))]";

/** Thin gold line between two journey figures, with a small node at its midpoint. */
function Connector({ delay }: { delay: number }) {
  return (
    <Reveal
      variant="line-x"
      duration={1200}
      delay={delay}
      className="relative -mx-3 mt-7 h-px flex-1 bg-accent/70 sm:-mx-5 sm:mt-9 xl:mt-10"
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
    </Reveal>
  );
}

export function Mentorship() {
  const scene = getMentorshipScene();

  return (
    <section
      id="mentorship"
      data-motion
      aria-labelledby="mentorship-heading"
      className="relative isolate overflow-clip pt-20 pb-64 lg:pt-20 lg:pb-80"
    >
      {/* Scene photograph: a bottom band on mobile, the whole section on desktop */}
      <div
        aria-hidden={scene ? undefined : "true"}
        className="absolute inset-x-0 bottom-0 -z-10 h-80 [mask-image:linear-gradient(to_bottom,transparent,#000_30%)] lg:-bottom-12 lg:mx-auto lg:aspect-[4/3] lg:h-auto lg:max-w-[90rem] lg:[mask-image:linear-gradient(to_bottom,transparent,#000_14%)] min-[1441px]:[mask-composite:intersect]! min-[1441px]:[mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent),linear-gradient(to_bottom,transparent,#000_14%)]! min-[1441px]:[-webkit-mask-composite:source-in]!"
      >
        {scene ? (
          <Image
            src={scene.src}
            alt={scene.alt}
            fill
            sizes="100vw"
            className="object-cover [object-position:var(--mentorship-pos-mobile)] lg:[object-position:var(--mentorship-pos-desktop)]"
            style={
              {
                "--mentorship-pos-mobile": scene.objectPosition.mobile,
                "--mentorship-pos-desktop": scene.objectPosition.desktop,
              } as CSSProperties
            }
          />
        ) : (
          <div className={cn("absolute inset-0", sand)}>
            <p className="absolute right-6 bottom-5 max-w-[18rem] text-right text-[0.65rem] leading-relaxed tracking-[0.08em] text-brand/55">
              Mentorship photography placeholder
              <br />
              Add public/{mentorshipSceneSlot.directory}/
              {mentorshipSceneSlot.fileName}.webp
              <br />
              {mentorshipSceneSlot.aspectRatio} ·{" "}
              {mentorshipSceneSlot.recommendedSize} px
            </p>
          </div>
        )}
      </div>

      {/* Ivory wash keeps the headline legible over any photograph (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[52%] bg-[linear-gradient(to_right,var(--color-background)_38%,transparent)] [mask-image:linear-gradient(to_bottom,#000_52%,transparent_80%)] lg:block"
      />

      <BotanicalSprig className="pointer-events-none absolute top-[26rem] left-0 hidden w-28 -translate-x-[42%] opacity-30 lg:block" />

      <div className="relative mx-auto grid w-full max-w-[84rem] gap-y-12 px-6 lg:grid-cols-[38fr_62fr] lg:px-10">
        {/* Left: heading, supporting copy and quote */}
        <div className="lg:pr-4">
          <Reveal>
            <Eyebrow className="text-brand">Mentorship</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <h2
              id="mentorship-heading"
              className="font-display text-[2.4rem] leading-[1.08] font-medium tracking-[-0.01em] text-brand sm:text-5xl lg:text-[2.4rem] xl:text-[3.2rem]"
            >
              <span className="block lg:whitespace-nowrap">
                {mentorshipIntro.heading.first}
              </span>{" "}
              <span className="block">{mentorshipIntro.heading.second}</span>
              <span className={cn("block", accentText)}>
                {mentorshipIntro.heading.accent}.
              </span>
            </h2>
          </Reveal>
          <Reveal
            as="p"
            delay={200}
            className="mt-7 max-w-[26rem] text-[0.95rem] leading-relaxed lg:max-w-[18.5rem] text-[#4a4640] xl:max-w-[24.5rem]"
          >
            {mentorshipIntro.description}
          </Reveal>

          <Reveal
            delay={300}
            className="mt-10 bg-brand px-8 py-9 text-background sm:max-w-md lg:w-[90%] lg:max-w-none xl:px-10 xl:py-11"
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

          {/* Real mentor profiles. Renders nothing until the client supplies them. */}
          {mentorProfiles.length > 0 && (
            <div className="mt-10 lg:w-[90%]">
              <p className="text-[0.7rem] font-semibold tracking-[0.28em] text-[#4a4640] uppercase">
                Your mentor
              </p>
              <ul className="mt-5 space-y-5">
                {mentorProfiles.map((mentor) => {
                  const photo = getMentorPhoto(mentor);
                  return (
                    <Reveal as="li" key={mentor.name} className="flex items-center gap-5">
                      <div
                        className={cn(
                          "relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-tl-[2.5rem] rounded-tr-sm rounded-b-sm",
                          sand,
                        )}
                      >
                        {photo && (
                          <Image
                            src={photo}
                            alt={mentor.photoAlt ?? mentor.name}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-display text-xl text-brand">{mentor.name}</p>
                        <p className={cn("mt-1 text-[0.7rem] font-semibold tracking-[0.22em] uppercase", accentText)}>
                          {mentor.role}
                        </p>
                        {mentor.note && (
                          <p className="mt-2 max-w-[18rem] text-[0.85rem] leading-snug text-[#4a4640]">
                            {mentor.note}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Right: journey panel with the four focus areas overlapping its base */}
        <div className="relative lg:-ml-8 lg:w-[calc(100%+2rem)]">
          <Reveal
            delay={150}
            className={cn(
              "flex items-start justify-between rounded-tl-3xl rounded-tr-sm rounded-b-sm px-4 pt-12 pb-20 text-background sm:px-8 lg:ml-[9%] lg:mr-[6%] lg:px-6 lg:pt-14 xl:min-h-[21rem] xl:px-10 xl:pt-[4.5rem]",
              scene ? "bg-brand/85" : "bg-brand",
            )}
          >
            {mentorshipJourney.map((figure, index) => (
              <div key={figure.label} className="contents">
                {index > 0 && <Connector delay={500 + index * 300} />}
                <Reveal
                  variant="fade"
                  duration={1000}
                  delay={250 + index * 300}
                  className="flex w-[5.5rem] shrink-0 flex-col items-center text-center sm:w-[7.5rem]"
                >
                  <span className="relative">
                    {figure.highlight && (
                      <span
                        aria-hidden="true"
                        className="absolute -inset-2.5 animate-breathe rounded-full bg-accent/25"
                      />
                    )}
                    <span
                      className={cn(
                        "relative flex size-14 items-center justify-center rounded-full sm:size-[4.5rem] xl:size-20",
                        figure.highlight
                          ? "bg-accent text-brand"
                          : "border border-accent bg-brand/40 text-accent",
                      )}
                    >
                      <Icon
                        name={figure.icon}
                        className="size-6 sm:size-8 xl:size-9"
                        strokeWidth={1.25}
                      />
                    </span>
                  </span>
                  <p className="mt-4 text-[0.62rem] font-semibold tracking-[0.2em] uppercase sm:text-[0.7rem] sm:tracking-[0.25em]">
                    {figure.label}
                  </p>
                  <p className="mt-2 text-[0.72rem] leading-snug text-background/90 sm:text-[0.8rem]">
                    {figure.caption}
                  </p>
                </Reveal>
              </div>
            ))}
          </Reveal>

          <ul className="relative -mt-10 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area, index) => {
              const src = getFocusAreaPhoto(area);
              return (
                <Reveal
                  as="li"
                  key={area.title}
                  delay={200 + index * 120}
                  className="group relative grid grid-cols-[5.25rem_1fr_auto] items-center gap-3.5 rounded-sm bg-surface p-3.5 shadow-[0_18px_40px_-26px_rgb(30_58_43/0.4)] sm:gap-4 xl:grid-cols-[6.5rem_1fr_auto] xl:gap-5 xl:p-4"
                >
                  <div
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-sm",
                      sand,
                    )}
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={area.photo.alt}
                        fill
                        sizes="(min-width: 1280px) 104px, 84px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        title={`Add public/${area.photo.directory}/${area.photo.fileName}.webp`}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="h-px w-5 bg-accent" />
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-brand text-accent xl:size-9">
                        <Icon
                          name={area.icon}
                          className="size-4 xl:size-[1.15rem]"
                          strokeWidth={1.25}
                        />
                      </span>
                      <h3 className="font-display text-[0.95rem] leading-tight text-brand xl:text-[1.1rem]">
                        {area.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[0.75rem] leading-snug text-[#4a4640] xl:text-[0.82rem]">
                      {area.description}
                    </p>
                  </div>

                  <Link
                    href={enquiryHref}
                    aria-label={`Ask a mentor about ${area.title}`}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border border-accent/70 transition-colors duration-300 after:absolute after:inset-0 group-hover:border-brand group-hover:bg-brand group-hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent xl:size-9",
                      accentText,
                    )}
                  >
                    <Icon name="arrow" className="size-4" strokeWidth={1.5} />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
