"use client";

import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { contact, whatsappHref } from "@/config/contact";
import { siteConfig } from "@/config/site";

export function WhatsAppFloat() {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(
      () => setOpen(true),
      reduceMotion ? 0 : 1400,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="WhatsApp chat"
          className="pointer-events-auto w-[min(18.5rem,calc(100vw-2rem))] border border-border bg-surface p-4 shadow-[0_18px_40px_rgba(30,58,43,0.16)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-brand/70 uppercase">
                WhatsApp
              </p>
              <p className="mt-1 font-display text-lg text-brand">
                Chat with {siteConfig.name}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close WhatsApp popup"
              onClick={() => setOpen(false)}
              className="flex size-8 shrink-0 items-center justify-center text-muted transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
          <p className="mt-2 text-sm text-muted">
            Message us on WhatsApp for course guidance and mentorship queries.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-semibold tracking-wide text-white transition-[filter,transform] duration-300 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98] motion-reduce:transition-none"
          >
            <Icon name="whatsapp" className="size-5" />
            Chat {contact.phone}
          </a>
        </div>
      ) : null}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp: ${contact.phone}`}
        className="pointer-events-auto relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_28px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-95 motion-reduce:transition-none"
      >
        <span
          aria-hidden="true"
          data-motion
          className="absolute inset-0 animate-ripple rounded-full bg-[#25D366]/40 motion-reduce:hidden"
        />
        <Icon name="whatsapp" className="relative size-7" />
      </a>
    </div>
  );
}
