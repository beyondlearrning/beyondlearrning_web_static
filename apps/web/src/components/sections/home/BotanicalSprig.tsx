import { cn } from "@/lib/utils";

/** [x, y, rotation, scale] for each leaf along the stem. */
const leaves: [number, number, number, number][] = [
  [98, 318, -28, 0.9],
  [98, 286, 152, 0.85],
  [93, 246, -34, 1],
  [96, 214, 150, 0.95],
  [92, 172, -38, 0.95],
  [93, 142, 146, 0.85],
  [88, 100, -44, 0.8],
  [88, 70, 140, 0.7],
  [92, 34, -60, 0.55],
];

/**
 * Very faint botanical line drawing. Purely decorative: it sits near the
 * outer edge of the hero and is hidden from assistive technology.
 */
export function BotanicalSprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 360"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("stroke-accent", className)}
    >
      <path
        d="M104 360C100 290 112 230 94 160C84 118 86 66 96 8"
        strokeWidth="1"
      />
      {leaves.map(([x, y, rotation, scale]) => (
        <g
          key={`${x}-${y}`}
          transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
        >
          <path
            d="M0 0C16-16 44-18 64-6C46 10 18 12 0 0Z"
            strokeWidth="1"
          />
          <path d="M2 0C20-4 42-6 58-6" strokeWidth="0.7" strokeOpacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
