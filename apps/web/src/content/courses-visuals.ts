import { findLocalPhoto } from "@/lib/photo-slot";
import type { Course } from "@/content/courses";

/**
 * Photography for the Courses overview canvas (one image per course).
 *
 * The client has not supplied dedicated course photography, so each course
 * currently reuses an approved local academic/law photograph from
 * `public/images/home/`. To give a course its own image, add a file to the
 * same folder named `course-<slug>.webp` (for example `course-clat-pg.webp`;
 * `.jpg`, `.jpeg`, `.avif`, `.png` also work). It is picked up automatically
 * and takes priority over the fallback. Recommended: 4:5 or 1:1, at least
 * 1400 px on the long edge, with the subject in the upper two thirds because
 * the course details sit over the lower-left of the canvas.
 *
 * IMPORTANT: update `alt` when a real photograph replaces a fallback.
 */
const directory = "images/home";
const extensions = ["webp", "jpg", "jpeg", "avif", "png"] as const;

type CourseVisualSlot = {
  /** Existing approved image used until a dedicated one is added. */
  fallbackFileName: string;
  alt: string;
  objectPosition: { desktop: string; mobile: string };
};

const slots: Record<string, CourseVisualSlot> = {
  "clat-ug": {
    fallbackFileName: "approach-focused",
    alt: "A student writing notes at a library desk among open law books, with tall bookshelves and a sunlit window behind",
    objectPosition: { desktop: "50% 62%", mobile: "50% 30%" },
  },
  ailet: {
    fallbackFileName: "approach-assessment",
    alt: "A student concentrating on practice papers in a quiet study hall, with other students and bookshelves behind",
    objectPosition: { desktop: "50% 55%", mobile: "50% 35%" },
  },
  "clat-pg": {
    fallbackFileName: "approach-guidance",
    alt: "A student and a mentor reviewing notes together over open books and a laptop at a library table",
    objectPosition: { desktop: "50% 55%", mobile: "50% 32%" },
  },
  judiciary: {
    fallbackFileName: "beyond-learning-hero",
    alt: "A domed court-style building seen through trees in warm morning light, with law books and a notebook on a wooden desk in the foreground",
    objectPosition: { desktop: "34% 40%", mobile: "36% 40%" },
  },
};

export type CourseVisual = {
  src: string;
  alt: string;
  objectPosition: { desktop: string; mobile: string };
};

/** Returns the approved local photograph for a course, or null if none exists. */
export function getCourseVisual(course: Course): CourseVisual | null {
  const slot = slots[course.slug];
  if (!slot) return null;

  const src =
    findLocalPhoto({
      directory,
      fileName: `course-${course.slug}`,
      extensions,
    }) ??
    findLocalPhoto({ directory, fileName: slot.fallbackFileName, extensions });

  if (!src) return null;
  return { src, alt: slot.alt, objectPosition: slot.objectPosition };
}
