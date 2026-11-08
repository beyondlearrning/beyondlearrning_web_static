import Image from "next/image";
import type { CSSProperties } from "react";
import { getHeroPhoto, heroPhotoSlot } from "@/content/hero";

/**
 * Immersive hero photograph.
 *
 * - Desktop: bleeds to the right edge of the viewport and dissolves into the
 *   ivory page on its left and bottom edges (soft mask, no rectangle).
 * - Tablet / mobile: a full-bleed band whose top and bottom edges dissolve.
 *
 * The wrapper is positioned against the hero <section> on desktop (its
 * ancestors are intentionally not `relative`), and has a fixed aspect ratio
 * below `lg`, so swapping the image never changes the layout.
 */
export function HeroVisual() {
  const photo = getHeroPhoto();

  return (
    <div
      className={[
        "relative z-0 -mx-6 aspect-[5/6] overflow-hidden sm:aspect-[16/10]",
        "[mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_84%,transparent)]",
        "lg:absolute lg:inset-y-0 lg:right-0 lg:left-[42%] lg:mx-0 lg:aspect-auto",
        "lg:[mask-image:linear-gradient(to_right,transparent,#000_38%),linear-gradient(to_top,transparent,#000_14%)]",
        "lg:[mask-composite:intersect] lg:[-webkit-mask-composite:source-in]",
      ].join(" ")}
    >
      <div className="absolute inset-0 origin-right transition-[transform,opacity] duration-[1800ms] ease-out starting:scale-[1.04] starting:opacity-0 motion-reduce:transition-none">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            preload
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="origin-[85%_60%] animate-kenburns object-cover [object-position:var(--hero-pos-mobile)] lg:[object-position:var(--hero-pos-desktop)]"
            style={
              {
                "--hero-pos-mobile": photo.objectPosition.mobile,
                "--hero-pos-desktop": photo.objectPosition.desktop,
              } as CSSProperties
            }
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-background))] px-8 text-center text-brand/60 lg:pl-[38%]"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                Hero photography
              </span>
              <span className="max-w-[18rem] text-[0.7rem] leading-relaxed tracking-[0.08em]">
                Add public/{heroPhotoSlot.directory}/{heroPhotoSlot.fileName}
                .webp
                <br />
                {heroPhotoSlot.aspectRatio} · {heroPhotoSlot.recommendedSize} px
              </span>
            </div>
          </div>
        )}
        {photo && (
          <span
            aria-hidden="true"
            data-motion
            className="pointer-events-none absolute inset-y-0 left-[30%] w-1/4 animate-glint bg-linear-to-r from-transparent via-[#fff1d0]/30 to-transparent mix-blend-soft-light"
          />
        )}
      </div>
    </div>
  );
}
