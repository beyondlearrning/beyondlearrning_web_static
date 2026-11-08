import { findLocalPhoto } from "@/lib/photo-slot";

/**
 * Founder section content (supplied by the client) and portrait slot.
 *
 * Portrait: add ONE file to `apps/web/public/images/founder/` named
 * `nupur-dhaneriya.webp` (`.jpg`, `.jpeg`, `.avif`, `.png` are also detected).
 * The section picks it up automatically.
 *
 * Recommended asset: 4:5 portrait, 1200 × 1500 px (minimum 900 × 1125), WebP at
 * roughly 80% quality, with the face in the upper-middle of the frame (the
 * photo is cropped into an arch). Use only the portrait supplied by the client.
 *
 * IMPORTANT: update `alt` if the final photograph differs from the description.
 */
export const founder = {
  name: "Nupur Dhaneriya",
  title: "Founder & Director",
  statement: "Building futures beyond examinations.",
} as const;

export const founderPortraitSlot = {
  directory: "images/founder",
  fileName: "nupur-dhaneriya",
  extensions: ["webp", "jpg", "jpeg", "avif", "png"],
  aspectRatio: "4:5",
  recommendedSize: "1200 × 1500",
  alt: "Portrait of Nupur Dhaneriya, Founder & Director of Beyond Learrning",
  objectPosition: "50% 20%",
} as const;

export type FounderPortrait = {
  src: string;
  alt: string;
  objectPosition: string;
};

export function getFounderPortrait(): FounderPortrait | null {
  const src = findLocalPhoto(founderPortraitSlot);
  if (!src) return null;
  return {
    src,
    alt: founderPortraitSlot.alt,
    objectPosition: founderPortraitSlot.objectPosition,
  };
}

export type FounderNoteBlock = {
  /** "quote" blocks are set as pull-quotes; the wording is unchanged. */
  type: "paragraph" | "quote" | "closing";
  text: string;
};

/**
 * The Founder's Note exactly as supplied by the client. Each sentence appears
 * once: two passages are set as pull-quotes instead of body paragraphs.
 * Do not rewrite this copy.
 */
export const founderNote: readonly FounderNoteBlock[] = [
  {
    type: "paragraph",
    text: "I founded BEYOND LEARRNING with a simple yet powerful belief: every law aspirant deserves more than just preparation for an examination. They deserve the right guidance, meaningful mentorship, and the confidence to navigate their journey ahead.",
  },
  {
    type: "paragraph",
    text: "My experience in teaching and mentoring CLAT aspirants helped me understand that every student’s journey is different. While academic excellence is important, students also need direction, strategic thinking, encouragement, and someone who believes in their potential.",
  },
  {
    type: "paragraph",
    text: "This understanding became the foundation of BEYOND LEARRNING—a platform envisioned to make legal education more thoughtful, accessible, and mentorship-driven.",
  },
  {
    type: "paragraph",
    text: "Through BEYOND LEARRNING, my mission is to help students prepare for competitive examinations while developing the clarity, confidence, independent thinking, and sense of responsibility they need to build meaningful careers in law.",
  },
  {
    type: "quote",
    text: "I believe education should not simply prepare students for their next examination; it should empower them for the opportunities and challenges that lie beyond it.",
  },
  {
    type: "paragraph",
    text: "At BEYOND LEARRNING, we aspire to go beyond teaching subjects. We strive to nurture future lawyers, leaders, and changemakers.",
  },
  {
    type: "closing",
    text: "Because every great journey deserves the right beginning—and every aspiring lawyer deserves the opportunity to go beyond their potential.",
  },
];
