import { findLocalPhoto } from "@/lib/photo-slot";

/**
 * Hero photography slot.
 *
 * To publish the approved hero photograph, add ONE file to
 * `apps/web/public/images/home/` named `beyond-learning-hero.webp`
 * (`.jpg`, `.jpeg`, `.avif` and `.png` are also detected). No component or
 * layout change is required: the hero finds the file at build/render time and
 * replaces the placeholder with it.
 *
 * Recommended asset: 3:2 landscape, 2400 × 1600 px (minimum 1800 × 1200),
 * WebP at roughly 80% quality. The scene (books, desk, notebook) should sit in
 * the RIGHT-CENTRE of the frame, because the left edge fades into the ivory
 * page on desktop and the top/bottom edges fade on tablet and mobile.
 *
 * IMPORTANT: update `alt` to describe the real photograph once it is added.
 */
export const heroPhotoSlot = {
  directory: "images/home",
  fileName: "beyond-learning-hero",
  extensions: ["webp", "jpg", "jpeg", "avif", "png"],
  aspectRatio: "3:2",
  recommendedSize: "2400 × 1600",
  alt: "A sunlit study desk with law books, an open notebook and a pen, with a domed government building beyond the garden",
  /**
   * CSS object-position per breakpoint, used to keep the scene framed when the
   * photograph is cropped. The book stack (lower right) and the domed building
   * behind it must stay visible, so both anchor to the right edge.
   * - desktop (lg and up): the photo fills the right ~58% of the hero.
   * - mobile / tablet: a full-width band with a fixed aspect ratio.
   */
  objectPosition: {
    desktop: "100% 62%",
    mobile: "100% 58%",
  },
} as const;

export type HeroPhoto = {
  src: string;
  alt: string;
  objectPosition: { desktop: string; mobile: string };
};

/** Returns the approved local photograph if one exists, otherwise null. */
export function getHeroPhoto(): HeroPhoto | null {
  const src = findLocalPhoto(heroPhotoSlot);
  if (!src) return null;

  return {
    src,
    alt: heroPhotoSlot.alt,
    objectPosition: heroPhotoSlot.objectPosition,
  };
}
