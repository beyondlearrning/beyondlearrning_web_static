import type { Metadata } from "next";
import { ClatLivePage } from "@/components/sections/clat-live/ClatLivePage";
import { clatLive } from "@/content/clat-live";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "CLAT 2027 Live Q&A",
  description: `${clatLive.headline} ${clatLive.subline}`,
  openGraph: {
    title: clatLive.headline,
    description: clatLive.subline,
    siteName: siteConfig.name,
  },
};

export default function Page() {
  return <ClatLivePage />;
}
