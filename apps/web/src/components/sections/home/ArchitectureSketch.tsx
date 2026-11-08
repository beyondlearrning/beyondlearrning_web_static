import { cn } from "@/lib/utils";

const columnXs = [44, 66, 88, 110, 132, 154, 176, 198, 220];

/**
 * Faint line drawing of a domed civic building. Decorative only: it sits at
 * the outer edge of a section and is hidden from assistive technology.
 */
export function ArchitectureSketch({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 264 440"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      className={cn("stroke-accent", className)}
    >
      {/* finial and dome */}
      <path d="M132 6v24" />
      <circle cx="132" cy="5" r="2.5" />
      <path d="M78 156C78 84 104 38 132 32c28 6 54 52 54 124" />
      <path d="M132 32v124M108 44c-10 34-12 74-10 112M156 44c10 34 12 74 10 112" strokeOpacity="0.7" />
      <path d="M80 118h104M74 140h116" strokeOpacity="0.7" />

      {/* drum with windows */}
      <path d="M72 156v62M192 156v62M66 156h132" />
      {[90, 112, 140, 162].map((x) => (
        <path key={x} d={`M${x} 200v-26a7 7 0 0 1 14 0v26`} strokeOpacity="0.8" />
      ))}

      {/* entablature and pediments */}
      <path d="M36 218h192M36 230h192" />
      <path d="M36 230l30-14M228 230l-30-14" strokeOpacity="0.7" />

      {/* colonnade */}
      {columnXs.map((x) => (
        <path key={x} d={`M${x} 230v110M${x + 8} 230v110`} strokeOpacity="0.85" />
      ))}

      {/* steps */}
      <path d="M30 340h204M22 350h220M14 360h236M6 370h252" />

      {/* side pavilion and cupola */}
      <path d="M6 250h30v90M6 250c0-14 8-22 15-24 7 2 15 10 15 24" strokeOpacity="0.7" />
      <path d="M21 226v-12" strokeOpacity="0.7" />
    </svg>
  );
}
