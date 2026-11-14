import type { Metadata } from "next";
import { ClatLiveThanks } from "@/components/sections/clat-live/ClatLiveThanks";
import { clatLive } from "@/content/clat-live";

export const metadata: Metadata = {
  title: "You’re in — CLAT Live",
  description: clatLive.thanks.body,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ClatLiveThanks />;
}
