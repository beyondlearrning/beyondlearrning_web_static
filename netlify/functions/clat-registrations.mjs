import { getStore } from "@netlify/blobs";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== "GET") {
    return json(405, { error: "Method not allowed" });
  }

  const expected = process.env.CLAT_ADMIN_PASSWORD || "beyond2027";
  const provided = request.headers.get("x-admin-password") ?? "";
  if (!provided || provided !== expected) {
    return json(401, { error: "Unauthorized" });
  }

  const store = getStore("clat-live-registrations");
  const existing = (await store.get("submissions", { type: "json" })) ?? [];
  const items = Array.isArray(existing) ? existing : [];

  return json(200, { items });
};

export const config = {
  path: "/api/clat-registrations",
};
