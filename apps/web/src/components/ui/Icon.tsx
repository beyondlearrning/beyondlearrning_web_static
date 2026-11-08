import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const paths = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" className="fill-current" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  bars: <path d="M5 20v-8M12 20V5M19 20v-6M3 20h18" />,
  mentor: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M18 14.5c1.8.8 3 2.5 3 5.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6" />
    </>
  ),
  columns: <path d="M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18" />,
  signpost: <path d="M12 21V3M12 8h6l2 2-2 2h-6M12 13H6l-2 2 2 2h6" />,
  book: <path d="M4 5q4-2 8 0q4-2 8 0v13q-4-2-8 0q-4-2-8 0zM12 5v13" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </>
  ),
  scales: (
    <path d="M12 4v16M7 20h10M5 8h14M5 8l-3 6a3.5 3.5 0 0 0 6 0zM19 8l-3 6a3.5 3.5 0 0 0 6 0z" />
  ),
  branch: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7v10M18 11c0 4-6 3-12 6" />
    </>
  ),
  calc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" />
    </>
  ),
  door: <path d="M6 21V9a6 6 0 0 1 12 0v12M3 21h18M10 21v-6a2 2 0 0 1 4 0v6" />,
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" className="fill-current" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5l5 2.5-5 2.5z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M21 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.7-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3.1 5 1.8 1.8 0 0 1 4.9 3h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.4 1.8.7 2.6a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.7.6 2.6.7a1.8 1.8 0 0 1 1.5 1.8z" />
  ),
  quote: (
    <path
      d="M9 7H5.5A1.5 1.5 0 0 0 4 8.5V13a1.5 1.5 0 0 0 1.5 1.5H8V16a3 3 0 0 1-3 3M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V13a1.5 1.5 0 0 0 1.5 1.5H18V16a3 3 0 0 1-3 3"
    />
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<ComponentProps<"svg">, "name"> & { name: IconName };

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
