import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f3f0e8]">
      <header className="border-b border-brand/10 bg-brand text-background">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-background/65 uppercase">
              {siteConfig.name}
            </p>
            <p className="truncate text-sm font-medium tracking-wide">
              CLAT Live · Admin
            </p>
          </div>
          <a
            href="/clat-live"
            className="shrink-0 text-xs font-medium tracking-wide text-background/80 underline decoration-background/35 underline-offset-4 transition-colors hover:text-background"
          >
            Open form
          </a>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
