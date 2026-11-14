"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  listClatRegistrations,
  LOCAL_ADMIN_PASSWORD,
  mockScoreLabel,
  questionLabel,
  type ClatRegistration,
} from "@/lib/clat-live-api";
import { cn } from "@/lib/utils";

const SESSION_KEY = "beyond-clat-admin-ok";

export function AdminSubmissions() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<ClatRegistration[]>([]);
  const [source, setSource] = useState<"api" | "local" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return;
    void load(saved);
  }, []);

  async function load(pass: string) {
    setLoading(true);
    setError(null);
    try {
      const result = await listClatRegistrations(pass);
      setItems(result.items);
      setSource(result.source);
      setUnlocked(true);
      sessionStorage.setItem(SESSION_KEY, pass);
    } catch {
      setUnlocked(false);
      setItems([]);
      setSource(null);
      sessionStorage.removeItem(SESSION_KEY);
      setError("Invalid password.");
    } finally {
      setLoading(false);
    }
  }

  async function onUnlock(event: FormEvent) {
    event.preventDefault();
    await load(password.trim());
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setPassword("");
    setItems([]);
    setSource(null);
  }

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-sm">
        <h1 className="font-display text-3xl font-medium text-brand">
          Submissions
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter the admin password to view CLAT live registrations.
        </p>
        <form onSubmit={onUnlock} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? (
            <p className="text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand px-4 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-brand/90 disabled:opacity-70"
          >
            {loading ? "Checking…" : "Open panel"}
          </button>
        </form>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Local preview password:{" "}
          <code className="text-brand">{LOCAL_ADMIN_PASSWORD}</code>
          . On Netlify, set{" "}
          <code className="text-brand">CLAT_ADMIN_PASSWORD</code>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-brand">
            Submissions
          </h1>
          <p className="mt-2 text-sm text-muted">
            {items.length} registration{items.length === 1 ? "" : "s"}
            {source ? (
              <>
                {" "}
                ·{" "}
                <span
                  className={cn(
                    source === "local" ? "text-accent" : "text-brand/70",
                  )}
                >
                  {source === "local" ? "local preview" : "live store"}
                </span>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              const pass = sessionStorage.getItem(SESSION_KEY);
              if (pass) void load(pass);
            }}
            disabled={loading}
            className="border border-brand/25 px-4 py-2 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-brand/5 disabled:opacity-70"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={lock}
            className="border border-brand/25 px-4 py-2 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-brand/5"
          >
            Lock
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          No submissions yet. Registrations from{" "}
          <a href="/clat-live" className="underline decoration-accent underline-offset-4">
            /clat-live
          </a>{" "}
          will show up here.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs tracking-[0.16em] text-muted uppercase">
                <th className="py-3 pr-4 font-semibold">When</th>
                <th className="py-3 pr-4 font-semibold">Name</th>
                <th className="py-3 pr-4 font-semibold">WhatsApp</th>
                <th className="py-3 pr-4 font-semibold">City</th>
                <th className="py-3 pr-4 font-semibold">Mock</th>
                <th className="py-3 font-semibold">Question</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border/70 align-top">
                  <td className="py-3.5 pr-4 whitespace-nowrap text-muted">
                    {formatWhen(item.createdAt)}
                  </td>
                  <td className="py-3.5 pr-4 font-medium text-brand">
                    {item.name}
                  </td>
                  <td className="py-3.5 pr-4 text-brand/90">{item.whatsapp}</td>
                  <td className="py-3.5 pr-4 text-brand/90">{item.city}</td>
                  <td className="py-3.5 pr-4 whitespace-nowrap text-brand/90">
                    {mockScoreLabel(item.mockScore)}
                  </td>
                  <td className="py-3.5 text-brand/90">
                    {questionLabel(item.question, item.questionOther)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
