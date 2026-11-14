import { getStore } from "@netlify/blobs";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function isValidWhatsAppGroupUrl(value) {
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

async function readSettings(store) {
  const existing = (await store.get("settings", { type: "json" })) ?? {};
  return {
    whatsappGroupHref:
      typeof existing.whatsappGroupHref === "string"
        ? existing.whatsappGroupHref
        : "",
  };
}

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const store = getStore("clat-live-registrations");

  if (request.method === "GET") {
    const settings = await readSettings(store);
    return json(200, settings);
  }

  if (request.method === "PUT") {
    const expected = process.env.CLAT_ADMIN_PASSWORD || "beyond2027";
    const provided = request.headers.get("x-admin-password") ?? "";
    if (!provided || provided !== expected) {
      return json(401, { error: "Unauthorized" });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json(400, { error: "Invalid JSON" });
    }

    const whatsappGroupHref = String(payload.whatsappGroupHref ?? "").trim();
    if (!whatsappGroupHref) {
      return json(400, { error: "WhatsApp group link is required" });
    }
    if (!isValidWhatsAppGroupUrl(whatsappGroupHref)) {
      return json(400, {
        error: "Use a valid WhatsApp invite link (chat.whatsapp.com)",
      });
    }

    const next = { whatsappGroupHref };
    await store.setJSON("settings", next);
    return json(200, next);
  }

  return json(405, { error: "Method not allowed" });
};

export const config = {
  path: "/api/clat-settings",
};
