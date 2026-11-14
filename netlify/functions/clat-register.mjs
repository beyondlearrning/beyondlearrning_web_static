import { getStore } from "@netlify/blobs";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function normalize(input) {
  const name = String(input.name ?? "").trim();
  const whatsapp = String(input.whatsapp ?? "").trim();
  const city = String(input.city ?? "").trim();
  const mockScore = String(input.mockScore ?? "").trim();
  const question = String(input.question ?? "").trim();
  const questionOther = String(input.questionOther ?? "").trim();

  if (!name || !whatsapp || !city || !mockScore || !question) {
    return null;
  }
  if (question === "other" && !questionOther) {
    return null;
  }

  return { name, whatsapp, city, mockScore, question, questionOther };
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const fields = normalize(payload);
  if (!fields) {
    return json(400, { error: "Missing required fields" });
  }

  const entry = {
    id: crypto.randomUUID(),
    ...fields,
    createdAt: new Date().toISOString(),
  };

  const store = getStore("clat-live-registrations");
  const existing = (await store.get("submissions", { type: "json" })) ?? [];
  const items = Array.isArray(existing) ? existing : [];
  items.unshift(entry);
  await store.setJSON("submissions", items);

  return json(201, { ok: true, id: entry.id });
};

export const config = {
  path: "/api/clat-register",
};
