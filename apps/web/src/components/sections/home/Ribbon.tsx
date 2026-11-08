const words = [
  "Focused Preparation",
  "Strategic Guidance",
  "Regular Assessment",
  "Personalised Mentorship",
  "Beyond the Exam",
];

function Row() {
  return (
    <ul className="flex shrink-0 items-center">
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="px-8 font-display text-lg tracking-[0.04em] whitespace-nowrap text-brand sm:text-xl">
            {word}
          </span>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );
}

export function Ribbon() {
  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden border-y border-border bg-surface py-5"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row />
      </div>
    </div>
  );
}
