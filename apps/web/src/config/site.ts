import { introduction, signature } from "@/content/brand";

export const siteConfig = {
  /** Official brand spelling. The double "rr" in "Learrning" is intentional. */
  name: "Beyond Learrning",
  /** Official logo (background removed from the supplied artwork). Original: public/images/brand/logo-original.png */
  logo: { src: "/images/brand/logo.png", width: 711, height: 315 },
  title: "Beyond Learrning | Law Education & Mentorship",
  /** Approved hero headline. */
  tagline: "Go Beyond Learrning.",
  strapline: "Where Preparation Meets Purpose.",
  /** Brand signature from the client's branding. */
  signature,
  /** Approved hero message. */
  message:
    "We don't just prepare you for an examination. We mentor you for the journey beyond it.",
  description: `${introduction.lead} ${introduction.support}`,
} as const;
