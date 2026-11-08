import { courses } from "@/content/courses";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Contact", href: "/contact" },
];

/** Course destinations for the Courses dropdown and mobile course list. */
export const courseNav: NavItem[] = courses.map((course) => ({
  label: course.name,
  href: `/courses/${course.slug}`,
}));

export const enquiryHref = "/contact";

export function courseHref(slug: string): string {
  return `/courses/${slug}`;
}
