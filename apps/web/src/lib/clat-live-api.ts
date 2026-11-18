import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import {
  firestoreCollections,
  getDb,
  settingsDocId,
} from "@/lib/firebase";

export type ClatRegistration = {
  id: string;
  name: string;
  whatsapp: string;
  /** Optional on older submissions collected before email was added. */
  email?: string;
  /** Present on older submissions; no longer collected. */
  city?: string;
  mockScore: string;
  question: string;
  questionOther: string;
  createdAt: string;
};

export type ClatRegistrationInput = Omit<
  ClatRegistration,
  "id" | "createdAt" | "city" | "email"
> & { email: string };

/** Admin panel password (UI gate). */
export const LOCAL_ADMIN_PASSWORD = "Devira@24";

export type ClatLiveSettings = {
  whatsappGroupHref: string;
};

function assertAdminPassword(password: string) {
  if (password !== LOCAL_ADMIN_PASSWORD) {
    throw new Error("Invalid password");
  }
}

function isValidWhatsAppGroupUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      (url.hostname === "chat.whatsapp.com" ||
        url.hostname === "wa.me" ||
        url.hostname.endsWith(".whatsapp.com"))
    );
  } catch {
    return false;
  }
}

function createdAtToIso(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return new Date().toISOString();
}

/** Persist a registration to Cloud Firestore. */
export async function submitClatRegistration(
  input: ClatRegistrationInput,
): Promise<{ source: "firestore" }> {
  const payload = {
    name: input.name.trim(),
    whatsapp: input.whatsapp.trim(),
    email: input.email.trim().toLowerCase(),
    mockScore: input.mockScore,
    question: input.question,
    questionOther: input.questionOther.trim(),
    createdAt: Timestamp.now(),
  };

  await addDoc(collection(getDb(), firestoreCollections.registrations), payload);
  return { source: "firestore" };
}

export async function listClatRegistrations(
  password: string,
): Promise<{ items: ClatRegistration[]; source: "firestore" }> {
  assertAdminPassword(password);

  const snapshot = await getDocs(
    query(
      collection(getDb(), firestoreCollections.registrations),
      orderBy("createdAt", "desc"),
    ),
  );

  const items: ClatRegistration[] = snapshot.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      name: String(data.name ?? ""),
      whatsapp: String(data.whatsapp ?? ""),
      email: data.email ? String(data.email) : undefined,
      city: data.city ? String(data.city) : undefined,
      mockScore: String(data.mockScore ?? ""),
      question: String(data.question ?? ""),
      questionOther: String(data.questionOther ?? ""),
      createdAt: createdAtToIso(data.createdAt),
    };
  });

  return { items, source: "firestore" };
}

/** Public settings used by the thanks page (WhatsApp group invite). */
export async function getClatLiveSettings(): Promise<{
  settings: ClatLiveSettings;
  source: "firestore";
}> {
  const snap = await getDoc(
    doc(getDb(), firestoreCollections.settings, settingsDocId),
  );
  const data = snap.exists() ? snap.data() : null;

  return {
    settings: {
      whatsappGroupHref:
        typeof data?.whatsappGroupHref === "string"
          ? data.whatsappGroupHref.trim()
          : "",
    },
    source: "firestore",
  };
}

export async function saveClatLiveSettings(
  password: string,
  settings: ClatLiveSettings,
): Promise<{ settings: ClatLiveSettings; source: "firestore" }> {
  assertAdminPassword(password);

  const whatsappGroupHref = settings.whatsappGroupHref.trim();
  if (!whatsappGroupHref) {
    throw new Error("Paste a WhatsApp group invite link.");
  }
  if (!isValidWhatsAppGroupUrl(whatsappGroupHref)) {
    throw new Error("Use a valid WhatsApp invite link (chat.whatsapp.com).");
  }

  await setDoc(
    doc(getDb(), firestoreCollections.settings, settingsDocId),
    {
      whatsappGroupHref,
      updatedAt: Timestamp.now(),
    },
    { merge: true },
  );

  return {
    settings: { whatsappGroupHref },
    source: "firestore",
  };
}

export function mockScoreLabel(value: string): string {
  const map: Record<string, string> = {
    "below-50": "Below 50",
    "50-70": "50–70",
    "70-90": "70–90",
    "90-plus": "90+",
  };
  return map[value] ?? value;
}

export function questionLabel(value: string, other: string): string {
  const map: Record<string, string> = {
    "mock-score": "How do I raise my mock score in the next few weeks?",
    revision: "What should my last-month revision plan look like?",
    "legal-gk": "How do I get better at Legal Reasoning and current affairs?",
    other: other.trim() || "Other",
  };
  return map[value] ?? value;
}
