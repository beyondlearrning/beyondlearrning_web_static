export type CourseArea = {
  title: string;
  description: string;
};

export type Course = {
  slug: string;
  /** Short label used for headings, rows and navigation. */
  name: string;
  /** Full approved title, shown as the sub-label. */
  fullName: string;
  /** First sentence of the approved description, for compact placements. */
  summary: string;
  /** Full Team Lead–approved description. */
  description: string;
  /**
   * Subject coverage. Only add this once the client supplies it: do not
   * invent syllabus details. Courses without it are shown without a coverage list.
   */
  coverage?: CourseArea[];
};

// Course copy below is the Team Lead's approved wording. No fees, durations,
// batch dates, eligibility, results, ranks, guarantees or extra syllabus have
// been supplied: do not add any.

export const clatUg: Course = {
  slug: "clat-ug",
  name: "CLAT UG",
  fullName: "Common Law Admission Test — Undergraduate",
  summary:
    "A comprehensive preparation programme for students aspiring to pursue undergraduate law at leading National Law Universities and other premier institutions.",
  description:
    "A comprehensive preparation programme for students aspiring to pursue undergraduate law at leading National Law Universities and other premier institutions. The programme combines focused preparation, strategic exam guidance, regular assessment and personalised mentorship to help students approach the examination with clarity and confidence.",
  coverage: [
    {
      title: "English Language",
      description:
        "Reading comprehension, vocabulary, grammar and critical reasoning.",
    },
    {
      title: "Current Affairs, including General Knowledge",
      description:
        "National, international, legal and static GK with conceptual clarity.",
    },
    {
      title: "Legal Reasoning",
      description:
        "Understand legal principles and apply them to real-world scenarios.",
    },
    {
      title: "Logical Reasoning",
      description:
        "Develop analytical and problem-solving skills with varied question types.",
    },
    {
      title: "Quantitative Techniques",
      description:
        "Build accuracy and speed with fundamental mathematical concepts.",
    },
  ],
};

export const ailet: Course = {
  slug: "ailet",
  name: "AILET",
  fullName: "AILET & Other Law Entrance Examinations",
  summary:
    "A dedicated programme for aspirants preparing for AILET and other undergraduate law entrance examinations.",
  description:
    "A dedicated programme for aspirants preparing for AILET and other undergraduate law entrance examinations. With structured preparation, exam-oriented strategies, regular practice and individual mentorship, students are guided to navigate different entrance examinations effectively.",
};

export const clatPg: Course = {
  slug: "clat-pg",
  name: "CLAT PG",
  fullName: "Common Law Admission Test — Postgraduate",
  summary:
    "A specialised programme for law graduates preparing for CLAT PG and postgraduate law entrance examinations.",
  description:
    "A specialised programme for law graduates preparing for CLAT PG and postgraduate law entrance examinations. The course focuses on systematic preparation, conceptual understanding, examination strategy, regular evaluation and personalised mentorship to help aspirants achieve their postgraduate goals.",
};

export const judiciary: Course = {
  slug: "judiciary",
  name: "Judiciary",
  fullName: "State Judicial Service Examinations",
  summary:
    "A comprehensive and mentorship-driven programme for aspirants preparing for State Judicial Service examinations.",
  description:
    "A comprehensive and mentorship-driven programme for aspirants preparing for State Judicial Service examinations. Beyond examination preparation, the programme aims to develop the discipline, legal understanding, consistency and strategic approach required for a career in the judiciary.",
};

/** The four course areas offered, in display order. */
export const courses: readonly Course[] = [clatUg, ailet, clatPg, judiciary];

/** Look up a course by its URL slug, or return undefined. */
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
