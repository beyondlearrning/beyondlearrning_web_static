/**
 * CLAT live Q&A session — registration landing copy and form options.
 * Update times, WhatsApp group link, and video when the client confirms them.
 *
 * Keep this file free of Node/fs imports — the registration form is a client
 * component and must be able to import this module in the browser.
 */

export const clatLive = {
  brand: "Beyond Learrning",
  headline: "CLAT 2027: Your Questions, Answered. Live.",
  subline:
    "A free live session with Nupur Dhaneriya, Founder, Beyond Learrning.",
  /** Exact clock times TBA — update when confirmed. */
  schedule: "21 & 22 Nov · Time shared on WhatsApp · Google Meet",
  videoPrompt:
    "Bring your biggest CLAT question. Get a straight answer in 2 minutes.",
  submitLabel: "Save My Seat",
  thanks: {
    title: "You’re in!",
    body: "Join the WhatsApp group for the session link and reminders.",
    cta: "Join group",
  },
  /**
   * WhatsApp community / group invite for session link + reminders.
   * Replace with the live invite URL before promoting the page.
   */
  whatsappGroupHref: "https://chat.whatsapp.com/",
} as const;

export const mockScoreOptions = [
  { value: "below-50", label: "Below 50" },
  { value: "50-70", label: "50–70" },
  { value: "70-90", label: "70–90" },
  { value: "90-plus", label: "90+" },
] as const;

export type MockScoreValue = (typeof mockScoreOptions)[number]["value"];

export const questionOptions = [
  {
    value: "mock-score",
    label: "How do I raise my mock score in the next few weeks?",
  },
  {
    value: "revision",
    label: "What should my last-month revision plan look like?",
  },
  {
    value: "legal-gk",
    label: "How do I get better at Legal Reasoning and current affairs?",
  },
  { value: "other", label: "Other" },
] as const;

export type QuestionValue = (typeof questionOptions)[number]["value"];

/** Slot for the ~30s promo clip under `public/videos/clat-live/`. */
export const clatLiveVideoSlot = {
  directory: "videos/clat-live",
  fileName: "promo",
  extensions: ["mp4", "webm"] as const,
} as const;
