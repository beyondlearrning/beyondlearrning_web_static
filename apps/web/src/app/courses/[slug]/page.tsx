import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/sections/courses/CourseDetail";
import { courses, getCourseBySlug } from "@/content/courses";
import { siteConfig } from "@/config/site";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: course.name,
    description: course.summary,
    openGraph: {
      title: `${course.name} | ${siteConfig.name}`,
      description: course.summary,
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return <CourseDetail course={course} />;
}
