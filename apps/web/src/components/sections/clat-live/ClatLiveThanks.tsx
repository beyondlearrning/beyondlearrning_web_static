"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { clatLive } from "@/content/clat-live";
import { getClatLiveSettings } from "@/lib/clat-live-api";

export function ClatLiveThanks() {
  const [groupHref, setGroupHref] = useState<string>(clatLive.whatsappGroupHref);

  useEffect(() => {
    let cancelled = false;
    void getClatLiveSettings().then(({ settings }) => {
      if (cancelled) return;
      if (settings.whatsappGroupHref) {
        setGroupHref(settings.whatsappGroupHref);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.16),transparent_60%)]"
      />
      <Container className="relative flex min-h-[70vh] items-center py-20">
        <div className="mx-auto max-w-lg text-center">
          <Reveal>
            <Eyebrow className="justify-center text-brand">
              {clatLive.brand}
            </Eyebrow>
          </Reveal>
          <Reveal
            as="h1"
            delay={80}
            className="mt-8 font-display text-4xl font-medium text-brand sm:text-5xl"
          >
            {clatLive.thanks.title}{" "}
            <span aria-hidden="true" className="inline-block">
              🎉
            </span>
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            className="mt-5 text-[1rem] leading-relaxed text-muted"
          >
            {clatLive.thanks.body}
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <a
              href={groupHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-[filter,transform] duration-300 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
            >
              <Icon name="whatsapp" className="size-5" />
              {clatLive.thanks.cta}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
