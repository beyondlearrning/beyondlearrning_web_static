import { Container } from "@/components/layout/Container";
import { ClatLiveForm } from "@/components/sections/clat-live/ClatLiveForm";
import { ClatLiveVideo } from "@/components/sections/clat-live/ClatLiveVideo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { clatLive } from "@/content/clat-live";

export function ClatLivePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/80">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(176,141,87,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(30,58,43,0.08),transparent_50%)]"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow className="justify-center text-brand">
                {clatLive.brand}
              </Eyebrow>
            </Reveal>
            <Reveal
              as="h1"
              delay={80}
              className="mt-7 font-display text-4xl leading-[1.08] font-medium text-balance text-brand sm:text-5xl lg:text-[3.35rem]"
            >
              {clatLive.headline}
            </Reveal>
            <Reveal
              as="p"
              delay={150}
              className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-muted"
            >
              {clatLive.subline}
              <span className="mt-2 block text-sm font-medium tracking-wide text-brand/80">
                {clatLive.schedule}
              </span>
            </Reveal>
          </div>

          <Reveal delay={220} className="mx-auto mt-12 max-w-3xl">
            <div className="overflow-hidden border border-border bg-brand/95 shadow-[0_24px_60px_-28px_rgba(30,58,43,0.45)]">
              <ClatLiveVideo />
            </div>
            <p className="mx-auto mt-6 max-w-lg text-center text-[0.95rem] leading-relaxed text-muted">
              {clatLive.videoPrompt}
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="register" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <Reveal className="mx-auto max-w-xl">
            <h2 className="font-display text-3xl font-medium text-brand sm:text-4xl">
              Save your seat
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Takes under a minute. We’ll send the Meet link on WhatsApp.
            </p>
            <div className="mt-10">
              <ClatLiveForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
