import type { Metadata } from "next";
import { Mentorship } from "@/components/sections/home/Mentorship";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentorship",
  description: `Personalised mentorship at ${siteConfig.name}.`,
};

export default function MentorshipPage() {
  return <Mentorship />;
}
