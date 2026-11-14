"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  getClatLiveSettings,
  listClatRegistrations,
  LOCAL_ADMIN_PASSWORD,
  mockScoreLabel,
  questionLabel,
  saveClatLiveSettings,
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
  const [whatsappGroupHref, setWhatsappGroupHref] = useState("");
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [mockFilter, setMockFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return;
    void load(saved);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (mockFilter !== "all" && item.mockScore !== mockFilter) return false;
      if (!needle) return true;
      const haystack = [
        item.name,
        item.whatsapp,
        item.city,
        mockScoreLabel(item.mockScore),
        questionLabel(item.question, item.questionOther),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [items, mockFilter, query]);

  const selected =
    filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  const todayCount = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return items.filter((item) => new Date(item.createdAt) >= start).length;
  }, [items]);

  async function load(pass: string) {
    setLoading(true);
    setError(null);
    try {
      const [result, settingsResult] = await Promise.all([
        listClatRegistrations(pass),
        getClatLiveSettings(),
      ]);
      setItems(result.items);
      setSource(result.source);
      setWhatsappGroupHref(settingsResult.settings.whatsappGroupHref);
      setUnlocked(true);
      sessionStorage.setItem(SESSION_KEY, pass);
      if (result.items[0]) setSelectedId(result.items[0].id);
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

  async function onSaveWhatsApp(event: FormEvent) {
    event.preventDefault();
    const pass = sessionStorage.getItem(SESSION_KEY);
    if (!pass) return;

    setSettingsSaving(true);
    setSettingsMessage(null);
    setSettingsError(null);
    try {
      const result = await saveClatLiveSettings(pass, {
        whatsappGroupHref,
      });
      setWhatsappGroupHref(result.settings.whatsappGroupHref);
      setSettingsMessage(
        result.source === "local"
          ? "Saved for local preview."
          : "WhatsApp group link saved.",
      );
    } catch (saveError) {
      setSettingsError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save the link.",
      );
    } finally {
      setSettingsSaving(false);
    }
  }

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setPassword("");
    setItems([]);
    setSource(null);
    setWhatsappGroupHref("");
    setSettingsMessage(null);
    setSettingsError(null);
    setSelectedId(null);
    setQuery("");
    setMockFilter("all");
  }

  async function copyWhatsApp(item: ClatRegistration) {
    try {
      await navigator.clipboard.writeText(item.whatsapp);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // Clipboard may be blocked; ignore.
    }
  }

  function exportCsv() {
    const rows = [
      ["When", "Name", "WhatsApp", "City", "Mock score", "Question"],
      ...filtered.map((item) => [
        item.createdAt,
        item.name,
        item.whatsapp,
        item.city,
        mockScoreLabel(item.mockScore),
        questionLabel(item.question, item.questionOther),
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `clat-live-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (!unlocked) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-16">
        <div className="w-full border border-brand/10 bg-surface p-6 shadow-sm sm:p-8">
          <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted uppercase">
            Secure access
          </p>
          <h1 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-brand">
            Admin panel
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to view CLAT live leads and update the WhatsApp group link.
          </p>
          <form onSubmit={onUnlock} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
              {loading ? "Checking…" : "Sign in"}
            </button>
          </form>
          <p className="mt-5 text-xs leading-relaxed text-muted">
            Default password:{" "}
            <code className="text-brand">{LOCAL_ADMIN_PASSWORD}</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
            Leads
          </h1>
          <p className="mt-1 text-sm text-muted">
            CLAT live registrations
            {source ? (
              <>
                {" "}
                ·{" "}
                <span
                  className={cn(
                    source === "local" ? "text-amber-800" : "text-brand/70",
                  )}
                >
                  {source === "local" ? "local preview" : "live store"}
                </span>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="border border-brand/20 bg-surface px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/5 disabled:opacity-50"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => {
              const pass = sessionStorage.getItem(SESSION_KEY);
              if (pass) void load(pass);
            }}
            disabled={loading}
            className="border border-brand/20 bg-surface px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/5 disabled:opacity-70"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            type="button"
            onClick={lock}
            className="border border-brand/20 bg-surface px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/5"
          >
            Lock
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Total leads" value={String(items.length)} />
        <StatCard label="Today" value={String(todayCount)} />
        <StatCard
          label="Showing"
          value={`${filtered.length}${query || mockFilter !== "all" ? " filtered" : ""}`}
        />
      </div>

      <form
        onSubmit={onSaveWhatsApp}
        className="mt-6 border border-brand/10 bg-surface p-4 sm:p-5"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <label className="min-w-0 flex-1">
            <span className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
              WhatsApp group invite
            </span>
            <input
              type="url"
              value={whatsappGroupHref}
              onChange={(event) => setWhatsappGroupHref(event.target.value)}
              placeholder="https://chat.whatsapp.com/…"
              className="mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              required
            />
          </label>
          <button
            type="submit"
            disabled={settingsSaving}
            className="bg-brand px-4 py-2.5 text-sm font-medium tracking-wide text-background transition-colors hover:bg-brand/90 disabled:opacity-70"
          >
            {settingsSaving ? "Saving…" : "Save link"}
          </button>
        </div>
        {settingsMessage ? (
          <p className="mt-3 text-sm text-brand/80">{settingsMessage}</p>
        ) : null}
        {settingsError ? (
          <p className="mt-3 text-sm text-red-800" role="alert">
            {settingsError}
          </p>
        ) : null}
      </form>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Search leads</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, WhatsApp, city, question…"
            className="w-full border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label>
          <span className="sr-only">Filter by mock score</span>
          <select
            value={mockFilter}
            onChange={(event) => setMockFilter(event.target.value)}
            className="w-full border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent sm:w-44"
          >
            <option value="all">All mock scores</option>
            <option value="below-50">Below 50</option>
            <option value="50-70">50–70</option>
            <option value="70-90">70–90</option>
            <option value="90-plus">90+</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 border border-dashed border-brand/20 bg-surface/70 px-5 py-12 text-center">
          <p className="text-sm font-medium text-brand">No leads to show</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {items.length === 0
              ? "New registrations from /clat-live will appear here."
              : "Try clearing search or changing the mock-score filter."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div className="overflow-hidden border border-brand/10 bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <thead className="bg-brand/[0.04]">
                  <tr className="border-b border-border text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    <th className="px-3 py-3 font-semibold sm:px-4">Lead</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">City</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">Mock</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">When</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const active = selected?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        className={cn(
                          "cursor-pointer border-b border-border/70 transition-colors",
                          active ? "bg-brand/[0.06]" : "hover:bg-brand/[0.03]",
                        )}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <td className="px-3 py-3 sm:px-4">
                          <p className="font-medium text-brand">{item.name}</p>
                          <p className="mt-0.5 text-xs text-muted">
                            {item.whatsapp}
                          </p>
                        </td>
                        <td className="px-3 py-3 text-brand/90 sm:px-4">
                          {item.city}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-brand/90 sm:px-4">
                          {mockScoreLabel(item.mockScore)}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-muted sm:px-4">
                          {formatWhen(item.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {selected ? (
            <aside className="border border-brand/10 bg-surface p-5">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-muted uppercase">
                Submission detail
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand">
                {selected.name}
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <Detail
                  label="WhatsApp"
                  value={selected.whatsapp}
                  action={
                    <button
                      type="button"
                      onClick={() => void copyWhatsApp(selected)}
                      className="text-xs font-medium text-brand underline decoration-accent/60 underline-offset-4"
                    >
                      {copiedId === selected.id ? "Copied" : "Copy"}
                    </button>
                  }
                />
                <Detail label="City" value={selected.city} />
                <Detail
                  label="Latest mock score"
                  value={mockScoreLabel(selected.mockScore)}
                />
                <Detail
                  label="Biggest question"
                  value={questionLabel(
                    selected.question,
                    selected.questionOther,
                  )}
                />
                <Detail label="Submitted" value={formatFullWhen(selected.createdAt)} />
              </dl>
              <a
                href={`https://wa.me/91${selected.whatsapp.replace(/\D/g, "").replace(/^91/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center bg-[#25D366] px-4 py-2.5 text-sm font-semibold tracking-wide text-white transition-[filter] hover:brightness-95"
              >
                Message on WhatsApp
              </a>
            </aside>
          ) : null}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-brand/10 bg-surface px-4 py-3">
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-brand">
        {value}
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <dt className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted uppercase">
          {label}
        </dt>
        {action}
      </div>
      <dd className="mt-1 leading-relaxed text-brand/90">{value}</dd>
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

function formatFullWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
