/**
 * Team Lead–approved brand copy. Single source of truth: sections read from
 * here and never retype these strings.
 *
 * Brand spelling: BEYOND LEARRNING (double "rr") is intentional. Keep it in
 * these strings. The ordinary English word "learning" is unaffected.
 */

/** Brand signature, used in the hero, About and footer. */
export const signature = "Mentorship. Guidance. Success.";

/**
 * Website introduction. Each part is used once, in the section it suits:
 * - `lead` + `support` → site meta description
 * - `statement` → About section quote
 * - `closing` → closing call-to-action heading
 */
export const introduction = {
  lead: "BEYOND LEARRNING is where education meets mentorship.",
  statement:
    "We don't just prepare students for examinations; we prepare them for the journey beyond them.",
  support:
    "With expert guidance, strategic learning and personalised mentorship, we help students discover their potential and build the confidence to pursue a career in law.",
  closing:
    "Because getting selected is just the beginning — becoming capable is the real goal.",
} as const;

export const about = {
  heading: "About BEYOND LEARRNING",
  tagline: signature,
  paragraphs: [
    "BEYOND LEARRNING is a law-focused educational and mentorship platform committed to shaping the next generation of legal professionals. We go beyond conventional exam preparation by combining structured learning with personalised mentorship, strategic guidance and continuous support. Whether you are aspiring to enter a premier law school, pursue postgraduate legal education or build a career in the judiciary, we are here to guide you at every step.",
  ],
} as const;

export const differentiator = {
  heading: "What Makes Us Different",
  lead: "We don't believe education ends with a classroom or a test.",
  body: "At BEYOND LEARRNING, mentorship lies at the heart of everything we do. We understand that every student has a different starting point, learning style and career aspiration. Our approach combines learning, strategy, guidance and personal mentorship to ensure that students don't simply prepare for an examination — they prepare for the career that comes after it.",
} as const;
