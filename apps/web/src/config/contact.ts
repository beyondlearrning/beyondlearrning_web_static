/**
 * Central contact details, as supplied by the Team Lead. Components read from
 * here; never retype these values.
 *
 * No website/domain URL is listed because none has been confirmed.
 */
const phone = "7898228178";

export const contact = {
  brand: "BEYOND LEARRNING",
  office: {
    lines: [
      "421, Vikram Tower,",
      "Sapna Sangeeta Road,",
      "Indore, Madhya Pradesh, India",
    ],
  },
  email: "beyondlearrning@gmail.com",
  /** Shown exactly as supplied. */
  phone,
} as const;

export const emailHref = `mailto:${contact.email}`;
/**
 * Uses the number exactly as supplied. Do not add a country code unless the
 * client explicitly confirms one.
 */
export const phoneHref = `tel:${phone}`;
