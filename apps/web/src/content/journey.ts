import type { IconName } from "@/components/ui/Icon";
import { findLocalPhoto } from "@/lib/photo-slot";

/**
 * "The Journey" section content and photography slot.
 *
 * Add ONE file to `apps/web/public/images/home/` named
 * `beyond-learning-journey.webp` (`.jpg`, `.jpeg`, `.avif`, `.png` are also
 * detected). The section picks it up automatically.
 *
 * Recommended asset: 4:3, 2400 × 1800 px (minimum 1600 × 1200).
 * Art direction: the LEFT 60% and the whole upper half are soft cream-ivory
 * wall (the headline and timeline sit there). A tall window and a leafy plant
 * on the far right, a warm wooden desk across the bottom, a stack of dark green
 * law books at the right and an open notebook with a pen in front of them.
 *
 * IMPORTANT: update `alt` to describe the real photograph once it is added.
 */
export const journeyIntro = {
  headingFirst: "Clearing CLAT is a",
  headingAccent: "milestone",
  headingRest: ", not the finish line.",
  description:
    "A strong foundation today supports the journey towards law school and a meaningful career.",
} as const;

export const journeySceneSlot = {
  directory: "images/home",
  fileName: "beyond-learning-journey",
  extensions: ["webp", "jpg", "jpeg", "avif", "png"],
  aspectRatio: "4:3",
  recommendedSize: "2400 × 1800",
  alt: "A sunlit wooden desk with a stack of dark green law books, an open notebook and a pen, beside a window and a leafy plant",
  objectPosition: { desktop: "50% 100%", mobile: "75% 100%" },
} as const;

export type JourneyPhoto = {
  src: string;
  alt: string;
  objectPosition: { desktop: string; mobile: string };
};

export function getJourneyScene(): JourneyPhoto | null {
  const src = findLocalPhoto(journeySceneSlot);
  if (!src) return null;
  return {
    src,
    alt: journeySceneSlot.alt,
    objectPosition: journeySceneSlot.objectPosition,
  };
}

export const journeyStages: readonly {
  title: string;
  caption: string;
  icon: IconName;
}[] = [
  {
    title: "Preparation",
    caption: "Knowledge. Skill. Discipline.",
    icon: "book",
  },
  { title: "Purpose", caption: "Why law. Which path.", icon: "compass" },
  { title: "Career", caption: "Law school and beyond.", icon: "columns" },
];
