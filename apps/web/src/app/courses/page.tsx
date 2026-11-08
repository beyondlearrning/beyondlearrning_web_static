import type { Metadata } from "next";
import { CoursesIndex } from "@/components/sections/courses/CoursesIndex";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Courses",
  description: `Explore CLAT UG, AILET, CLAT PG and Judiciary programmes at ${siteConfig.name}.`,
};

export default function Courses() {
  return <CoursesIndex />;
}
