import type { IconName } from "@/components/ui/Icon";
import { findLocalPhoto } from "@/lib/photo-slot";

/**
 * "The Beyond Learrning Approach" content and photography slots.
 *
 * To publish the photographs, add these files to `apps/web/public/images/home/`
 * (`.jpg`, `.jpeg`, `.avif`, `.png` are also detected). The section picks them
 * up automatically; no layout change is needed:
 *
 *   approach-focused.webp      (Focused Preparation)
 *   approach-guidance.webp     (Strategic Guidance)
 *   approach-assessment.webp   (Regular Assessment)
 *   approach-mentorship.webp   (Personalised Mentorship)
 *
 * Recommended: vertical 4:5 portrait, 1200 × 1500 px (minimum 900 × 1125),
 * WebP at roughly 80% quality. The photographs are cropped into tall arched
 * panels (roughly 1:2 on wide desktops), so keep the subject in the CENTRE of
 * the frame and let the edges carry soft background.
 *
 * IMPORTANT: update each `alt` to describe the real photograph once added.
 */
export const approachIntro = {
  heading: { first: "The Beyond Learrning", second: "Approach" },
  description:
    "A structured and holistic approach to help you build concepts, develop the right strategy and stay on track until exam day.",
} as const;

export type ApproachStage = {
  /** Words are split so the title can break across two lines. */
  title: { first: string; rest: string };
  description: string;
  icon: IconName;
  photo: {
    directory: string;
    fileName: string;
    extensions: readonly string[];
    alt: string;
    /** CSS object-position used when the photograph is cropped. */
    objectPosition: string;
  };
};

const directory = "images/home";
const extensions = ["webp", "jpg", "jpeg", "avif", "png"] as const;

export const approachStages: readonly ApproachStage[] = [
  {
    title: { first: "Focused", rest: "Preparation" },
    description:
      "Concept-first learning with a clear, structured plan for every subject.",
    icon: "target",
    photo: {
      directory,
      fileName: "approach-focused",
      extensions,
      alt: "Stacked law books on a wooden study desk in soft natural light, with a pen holder against a deep green wall",
      objectPosition: "50% 60%",
    },
  },
  {
    title: { first: "Strategic", rest: "Guidance" },
    description:
      "Personalised study plans, time management and expert guidance to keep you on track.",
    icon: "compass",
    photo: {
      directory,
      fileName: "approach-guidance",
      extensions,
      alt: "An open study planner with a pen on a sunlit desk, with soft greenery behind",
      objectPosition: "50% 55%",
    },
  },
  {
    title: { first: "Regular", rest: "Assessment" },
    description:
      "Regular assessment and practice.",
    icon: "bars",
    photo: {
      directory,
      fileName: "approach-assessment",
      extensions,
      alt: "A minimal laptop and notes on a study desk in warm sunlight, with a plant in the background",
      objectPosition: "50% 55%",
    },
  },
  {
    title: { first: "Personalised", rest: "Mentorship" },
    description:
      "Individual mentorship and continuous support from mentors who understand your goals.",
    icon: "mentor",
    photo: {
      directory,
      fileName: "approach-mentorship",
      extensions,
      alt: "A comfortable academic armchair beside a stack of books and greenery against a deep green wall",
      objectPosition: "50% 55%",
    },
  },
];

/** Returns the public URL of a stage photograph, or null if not added yet. */
export function getApproachPhoto(stage: ApproachStage): string | null {
  return findLocalPhoto(stage.photo);
}
