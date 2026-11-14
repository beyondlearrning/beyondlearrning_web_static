import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/about/AboutPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

export default function About() {
  return <AboutPage />;
}
