import { findLocalPhoto } from "@/lib/photo-slot";

/**
 * Courses-section photography slot.
 *
 * Add ONE file to `apps/web/public/images/home/` named
 * `beyond-learning-courses.webp` (`.jpg`, `.jpeg`, `.avif`, `.png` also work).
 * The section detects it automatically; no layout change is needed.
 *
 * Recommended asset: 1:1 square, 2000 × 2000 px (minimum 1400 × 1400), WebP.
 * Keep the scene (books on a wooden desk, pen/notebook, window light and
 * plants) in the RIGHT 60% of the frame and the lower half: the left edge
 * blends into the forest-green panel, and the copy sits over the upper left.
 *
 * IMPORTANT: update `alt` to describe the real photograph once it is added.
 */
export const coursesPhotoSlot = {
  directory: "images/home",
  fileName: "beyond-learning-courses",
  extensions: ["webp", "jpg", "jpeg", "avif", "png"],
  aspectRatio: "1:1",
  recommendedSize: "2000 × 2000",
  alt: "A stack of law books beside a pen holder and an open notebook on a sunlit wooden desk, framed by plants",
  /** CSS object-position per breakpoint. */
  objectPosition: {
    desktop: "100% 100%",
    mobile: "100% 100%",
  },
} as const;

export type CoursesPhoto = {
  src: string;
  alt: string;
  objectPosition: { desktop: string; mobile: string };
};

/** Returns the approved local photograph if one exists, otherwise null. */
export function getCoursesPhoto(): CoursesPhoto | null {
  const src = findLocalPhoto(coursesPhotoSlot);
  if (!src) return null;

  return {
    src,
    alt: coursesPhotoSlot.alt,
    objectPosition: coursesPhotoSlot.objectPosition,
  };
}
