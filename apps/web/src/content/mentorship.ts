import type { IconName } from "@/components/ui/Icon";
import { findLocalPhoto } from "@/lib/photo-slot";

/**
 * Mentorship section content and photography slots.
 *
 * Add these files to `apps/web/public/images/home/` (`.jpg`, `.jpeg`, `.avif`,
 * `.png` are also detected). The section picks them up automatically:
 *
 *   beyond-learning-mentorship.webp   background scene, 3:2, 2400 × 1600 px
 *   mentorship-exam-strategy.webp     card thumbnail, 1:1, 800 × 800 px
 *   mentorship-law-school.webp        card thumbnail, 1:1, 800 × 800 px
 *   mentorship-paths-in-law.webp      card thumbnail, 1:1, 800 × 800 px
 *   mentorship-habits.webp            card thumbnail, 1:1, 800 × 800 px
 *
 * Scene art direction: the UPPER-LEFT of the frame should be soft ivory (the
 * headline sits there), a deep-green wall with leaf shadows, a wooden chair and
 * a pencil cup in the upper right, a warm wooden desk across the bottom, a
 * stack of dark green law books entering from the lower left and an open
 * notebook with a pen at the lower right, framed by blurred foreground leaves.
 *
 * IMPORTANT: update each `alt` to describe the real photograph once added.
 */
const directory = "images/home";
const extensions = ["webp", "jpg", "jpeg", "avif", "png"] as const;

export const mentorshipIntro = {
  heading: {
    first: "Guidance that goes",
    second: "beyond the",
    accent: "syllabus",
  },
  description:
    "Personalised mentorship from our mentors, to help you plan better, make informed decisions and stay motivated through every stage of your law entrance journey.",
  quote:
    "Clearing an exam is an achievement. Knowing where you are headed is an advantage.",
} as const;

export const mentorshipSceneSlot = {
  directory,
  fileName: "beyond-learning-mentorship",
  extensions,
  aspectRatio: "3:2",
  recommendedSize: "2400 × 1600",
  alt: "A warm wooden study desk with dark green law books and an open notebook with a pen, in front of a deep green wall, a wooden chair and a pencil cup, framed by leaves",
  objectPosition: { desktop: "50% 100%", mobile: "50% 100%" },
} as const;

export type MentorshipPhoto = {
  src: string;
  alt: string;
  objectPosition: { desktop: string; mobile: string };
};

export function getMentorshipScene(): MentorshipPhoto | null {
  const src = findLocalPhoto(mentorshipSceneSlot);
  if (!src) return null;
  return {
    src,
    alt: mentorshipSceneSlot.alt,
    objectPosition: mentorshipSceneSlot.objectPosition,
  };
}

export const mentorshipJourney: readonly {
  label: string;
  caption: string;
  icon: IconName;
  highlight?: boolean;
}[] = [
  { label: "Mentor", caption: "Guided by our mentors, step by step", icon: "person" },
  { label: "You", caption: "Your goals, our focus", icon: "person", highlight: true },
  { label: "Beyond", caption: "A brighter future in law", icon: "columns" },
];

/**
 * Real mentor profiles. The client has not supplied any mentor names,
 * qualifications or photographs yet, so this list is intentionally empty and
 * the section shows no mentor card. Do not invent entries.
 *
 * To introduce a mentor, add an object below. The section then shows a "Your
 * mentor" card (portrait, name, role, optional note) with no other change.
 * Portrait: add `public/images/mentors/<photoFileName>.webp` (4:5, 900 × 1125
 * px minimum; `.jpg`, `.jpeg`, `.avif`, `.png` also work).
 */
export type MentorProfile = {
  name: string;
  /** Role or title exactly as supplied by the client. */
  role: string;
  /** Optional short note in the client's own words. */
  note?: string;
  /** File name (without extension) inside `public/images/mentors/`. */
  photoFileName?: string;
  /** Describe the real photograph. */
  photoAlt?: string;
};

export const mentorProfiles: readonly MentorProfile[] = [];

/** Public URL of a mentor portrait, or null when none has been added. */
export function getMentorPhoto(mentor: MentorProfile): string | null {
  if (!mentor.photoFileName) return null;
  return findLocalPhoto({
    directory: "images/mentors",
    fileName: mentor.photoFileName,
    extensions,
  });
}

export type FocusArea = {
  title: string;
  description: string;
  icon: IconName;
  photo: {
    directory: string;
    fileName: string;
    extensions: readonly string[];
    alt: string;
  };
};

export const focusAreas: readonly FocusArea[] = [
  {
    title: "Exam strategy",
    description: "Personalised plans to improve performance and confidence.",
    icon: "route",
    photo: {
      directory,
      fileName: "mentorship-exam-strategy",
      extensions,
      alt: "An open notebook with a handwritten strategy plan on a wooden desk",
    },
  },
  {
    title: "Choosing a law school",
    description:
      "Guidance on colleges, cut-offs and the right fit for your goals.",
    icon: "columns",
    photo: {
      directory,
      fileName: "mentorship-law-school",
      extensions,
      alt: "A grand domed university building in warm afternoon light",
    },
  },
  {
    title: "Paths in law",
    description:
      "Explore career options and opportunities in the legal field.",
    icon: "signpost",
    photo: {
      directory,
      fileName: "mentorship-paths-in-law",
      extensions,
      alt: "A stack of law books beside a small plant on a sunlit desk",
    },
  },
  {
    title: "Habits that last",
    description:
      "Build discipline, time management and a sustainable study routine.",
    icon: "book",
    photo: {
      directory,
      fileName: "mentorship-habits",
      extensions,
      alt: "An open book and a pen on a wooden desk in warm sunlight",
    },
  },
];

/** Public URL of a card thumbnail, or null if it has not been added yet. */
export function getFocusAreaPhoto(area: FocusArea): string | null {
  return findLocalPhoto(area.photo);
}
