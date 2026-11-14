import { Approach } from "@/components/sections/home/Approach";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { CoursesOverview } from "@/components/sections/home/CoursesOverview";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { FounderPreview } from "@/components/sections/home/FounderPreview";
import { Hero } from "@/components/sections/home/Hero";
import { MentorshipPreview } from "@/components/sections/home/MentorshipPreview";
import { Ribbon } from "@/components/sections/home/Ribbon";

export default function Home() {
  return (
    <>
      <Hero />
      <Ribbon />
      <AboutPreview />
      <CoursesOverview />
      <Approach />
      <MentorshipPreview />
      <FounderPreview />
      <FinalCta />
    </>
  );
}
