export type ClatRegistration = {
  id: string;
  name: string;
  whatsapp: string;
  city: string;
  mockScore: string;
  question: string;
  questionOther: string;
  createdAt: string;
};

export type ClatRegistrationInput = Omit<ClatRegistration, "id" | "createdAt">;

const STORAGE_KEY = "beyond-clat-live-registrations";

/** Local preview password when Netlify Functions are unavailable (`pnpm dev`). */
export const LOCAL_ADMIN_PASSWORD = "beyond2027";

function readLocal(): ClatRegistration[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ClatRegistration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(items: ClatRegistration[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function toLocalEntry(input: ClatRegistrationInput): ClatRegistration {
  return {
    ...input,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `local-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
}

/** Persist a registration via Netlify Function, with localStorage fallback for `next dev`. */
export async function submitClatRegistration(
  input: ClatRegistrationInput,
): Promise<{ source: "api" | "local" }> {
  try {
    const response = await fetch("/api/clat-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (response.ok) return { source: "api" };
  } catch {
    // Fall through to local storage when functions are offline.
  }

  const items = readLocal();
  items.unshift(toLocalEntry(input));
  writeLocal(items);
  return { source: "local" };
}

export async function listClatRegistrations(
  password: string,
): Promise<{ items: ClatRegistration[]; source: "api" | "local" }> {
  try {
    const response = await fetch("/api/clat-registrations", {
      headers: { "x-admin-password": password },
    });
    if (response.ok) {
      const data = (await response.json()) as { items: ClatRegistration[] };
      return { items: data.items ?? [], source: "api" };
    }
    if (response.status === 401) {
      throw new Error("Invalid password");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid password") {
      throw error;
    }
  }

  if (password !== LOCAL_ADMIN_PASSWORD) {
    throw new Error("Invalid password");
  }

  return { items: readLocal(), source: "local" };
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
